// Real-time Pairing & Chat Synchronization Engine
// Uses Server-Sent Events (SSE) for instant cross-device live sync,
// BroadcastChannel for sub-millisecond local tabs, and persistent backend DB.

export interface SyncPayload<T = unknown> {
  id?: string;
  type:
    | 'PARTNER_CONNECTED'
    | 'PARTNER_DISCONNECTED'
    | 'CHAT_MESSAGE'
    | 'DISH_MATCH'
    | 'SWIPE_EVENT'
    | 'CART_UPDATE'
    | 'DICE_ROLL'
    | 'PROFILE_UPDATE'
    | 'INITIAL_STATE'
    | 'GROCERY_UPDATE'
    | 'ROLL_DICE';
  pairCode: string;
  sender: string;
  timestamp: number;
  data: T;
}

export interface NetworkInfo {
  localIp: string;
  port: number;
  localUrl: string;
  tunnelUrl?: string;
}

type SyncListener = (payload: SyncPayload<any>) => void;

class PairingSyncService {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<SyncListener> = new Set();
  private activePairCode: string = 'CRAVE-9821';
  private activeUser: string = 'Müge';
  private eventSource: EventSource | null = null;
  private pollingInterval: ReturnType<typeof setInterval> | null = null;
  private seenEventIds: Set<string> = new Set();
  private storageHandler: ((e: StorageEvent) => void) | null = null;
  private networkInfo: NetworkInfo | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('cravematch_pair_channel');
        this.channel.onmessage = (event) => {
          this.handleIncomingPayload(event.data);
        };
      } catch (err) {
        console.warn('BroadcastChannel not supported or blocked:', err);
      }
    }

    if (typeof window !== 'undefined') {
      this.storageHandler = (e: StorageEvent) => {
        if (e.key === 'cravematch_last_sync_event' && e.newValue) {
          try {
            const payload: SyncPayload = JSON.parse(e.newValue);
            this.handleIncomingPayload(payload);
          } catch {
            // ignore
          }
        }
      };
      window.addEventListener('storage', this.storageHandler);
    }

    // Connect real-time stream
    this.initStream();
    this.fetchNetworkInfo();
  }

  public setActiveUser(name: string) {
    if (this.activeUser === name) return;
    this.activeUser = name;
    this.initStream();
  }

  public setPairCode(code: string) {
    if (!code || this.activePairCode === code) return;
    this.activePairCode = code;
    this.initStream();
  }

  public getPairCode(): string {
    return this.activePairCode;
  }

  public getUser(): string {
    return this.activeUser;
  }

  public async fetchNetworkInfo(): Promise<NetworkInfo | null> {
    if (typeof window === 'undefined') return null;
    try {
      const res = await fetch('/api/network-info');
      if (res.ok) {
        this.networkInfo = await res.json();
        return this.networkInfo;
      }
    } catch {
      // ignore
    }
    return null;
  }

  public getCachedNetworkInfo(): NetworkInfo | null {
    return this.networkInfo;
  }

  public async getRoomState(): Promise<any> {
    if (typeof window === 'undefined') return null;
    try {
      const res = await fetch(`/api/db/state?code=${encodeURIComponent(this.activePairCode)}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // ignore
    }
    return null;
  }

  public subscribe(listener: SyncListener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private initStream() {
    if (typeof window === 'undefined') return;

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    try {
      const url = `/api/db/events?code=${encodeURIComponent(this.activePairCode)}&user=${encodeURIComponent(this.activeUser)}`;
      const es = new EventSource(url);
      this.eventSource = es;

      const handleEvent = (type: SyncPayload['type'], e: MessageEvent) => {
        try {
          const parsed = JSON.parse(e.data);
          this.handleIncomingPayload({
            id: `sse-${Date.now()}-${Math.random()}`,
            type,
            pairCode: this.activePairCode,
            sender: parsed.user || parsed.data?.author || 'server',
            timestamp: parsed.timestamp || Date.now(),
            data: parsed.data || parsed
          });
        } catch {
          // ignore
        }
      };

      es.addEventListener('INITIAL_STATE', (e) => handleEvent('INITIAL_STATE', e));
      es.addEventListener('CHAT_MESSAGE', (e) => handleEvent('CHAT_MESSAGE', e));
      es.addEventListener('PARTNER_CONNECTED', (e) => handleEvent('PARTNER_CONNECTED', e));
      es.addEventListener('PARTNER_DISCONNECTED', (e) => handleEvent('PARTNER_DISCONNECTED', e));
      es.addEventListener('DISH_MATCH', (e) => handleEvent('DISH_MATCH', e));
      es.addEventListener('SWIPE_EVENT', (e) => handleEvent('SWIPE_EVENT', e));
      es.addEventListener('CART_UPDATE', (e) => handleEvent('CART_UPDATE', e));
      es.addEventListener('DICE_ROLL', (e) => handleEvent('DICE_ROLL', e));
      es.addEventListener('PROFILE_UPDATE', (e) => handleEvent('PROFILE_UPDATE', e));

      es.onerror = () => {
        // Fallback to polling if SSE is disconnected
        if (!this.pollingInterval) {
          this.startHttpPolling();
        }
      };
    } catch (err) {
      console.warn('SSE failed to initialize, starting polling:', err);
      this.startHttpPolling();
    }
  }

  private handleIncomingPayload(payload: SyncPayload) {
    if (!payload || !payload.type) return;

    if (payload.pairCode && this.activePairCode && payload.pairCode !== this.activePairCode) {
      return;
    }

    const eventKey =
      payload.id ||
      `${payload.type}_${payload.sender}_${payload.timestamp}_${JSON.stringify(payload.data || '')}`;
    if (this.seenEventIds.has(eventKey)) {
      return;
    }
    this.seenEventIds.add(eventKey);

    if (this.seenEventIds.size > 200) {
      const first = this.seenEventIds.values().next().value;
      if (first) this.seenEventIds.delete(first);
    }

    this.notifyListeners(payload);
  }

  private notifyListeners(payload: SyncPayload) {
    this.listeners.forEach((listener) => {
      try {
        listener(payload);
      } catch (err) {
        console.error('Error in sync listener:', err);
      }
    });
  }

  public async broadcast(type: SyncPayload['type'], sender: string, data: any) {
    const eventId = `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const payload: SyncPayload = {
      id: eventId,
      type,
      pairCode: this.activePairCode,
      sender,
      timestamp: Date.now(),
      data
    };

    this.seenEventIds.add(eventId);

    // 1. BroadcastChannel
    try {
      this.channel?.postMessage(payload);
    } catch {
      // ignore
    }

    // 2. localStorage
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cravematch_last_sync_event', JSON.stringify(payload));
      }
    } catch {
      // ignore
    }

    // 3. Persistent DB Endpoint
    this.pushToDatabase(type, payload);

    // Notify local listeners
    this.notifyListeners(payload);
  }

  private async pushToDatabase(type: SyncPayload['type'], payload: SyncPayload) {
    try {
      if (typeof window === 'undefined') return;

      if (type === 'CHAT_MESSAGE') {
        await fetch('/api/db/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pairCode: this.activePairCode, message: payload.data })
        });
      } else if (type === 'PROFILE_UPDATE') {
        await fetch('/api/db/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pairCode: this.activePairCode, profile: payload.data })
        });
      } else if (type === 'CART_UPDATE' || type === 'GROCERY_UPDATE') {
        await fetch('/api/db/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pairCode: this.activePairCode, cart: payload.data })
        });
      } else if (type === 'DICE_ROLL' || type === 'ROLL_DICE') {
        await fetch('/api/db/dice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pairCode: this.activePairCode, winner: payload.data })
        });
      } else {
        // Fallback pair sync
        await fetch('/api/pair/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    } catch {
      // Offline fallback
    }
  }

  public async recordSwipe(dishId: string, liked: boolean): Promise<{ isMatch: boolean }> {
    try {
      const res = await fetch('/api/db/swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pairCode: this.activePairCode,
          user: this.activeUser,
          dishId,
          liked
        })
      });
      if (res.ok) {
        const data = await res.json();
        return { isMatch: !!data.isMatch };
      }
    } catch {
      // ignore
    }
    return { isMatch: false };
  }

  private startHttpPolling() {
    if (typeof window === 'undefined') return;
    if (this.pollingInterval) clearInterval(this.pollingInterval);

    this.pollingInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/pair/sync?code=${encodeURIComponent(this.activePairCode)}`);
        if (res.ok) {
          const events: SyncPayload[] = await res.json();
          if (Array.isArray(events)) {
            events.forEach((ev) => this.handleIncomingPayload(ev));
          }
        }
      } catch {
        // Fallback silently
      }
    }, 2500);
  }

  public destroy() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    if (typeof window !== 'undefined' && this.storageHandler) {
      window.removeEventListener('storage', this.storageHandler);
      this.storageHandler = null;
    }
    try {
      this.channel?.close();
      this.channel = null;
    } catch {
      // ignore
    }
    this.listeners.clear();
  }
}

export const pairingSync = new PairingSyncService();
