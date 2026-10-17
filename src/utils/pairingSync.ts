// Lightweight Real-time Pairing & Chat Synchronization Engine
// Uses BroadcastChannel for instant local multi-tab/multi-window synchronization,
// localStorage event listeners, and HTTP polling for cross-device synchronization over the internet.

import { ChatMessage, Dish } from '../types';

export interface SyncPayload {
  id?: string;
  type: 'PARTNER_CONNECTED' | 'CHAT_MESSAGE' | 'DISH_MATCH' | 'ROLL_DICE' | 'GROCERY_UPDATE';
  pairCode: string;
  sender: string;
  timestamp: number;
  data: any;
}

type SyncListener = (payload: SyncPayload) => void;

class PairingSyncService {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<SyncListener> = new Set();
  private activePairCode: string = 'CRAVE-9821';
  private activeUser: string = 'Müge';
  private pollingInterval: any = null;
  private seenEventIds: Set<string> = new Set();

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

    // Also listen to storage events across tabs
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === 'cravematch_last_sync_event' && e.newValue) {
          try {
            const payload: SyncPayload = JSON.parse(e.newValue);
            this.handleIncomingPayload(payload);
          } catch {
            // ignore
          }
        }
      });
    }

    // Start HTTP polling right away so any device immediately listens for cross-device events
    this.startHttpPolling();
  }

  public setActiveUser(name: string) {
    this.activeUser = name;
  }

  public setPairCode(code: string) {
    if (!code) return;
    this.activePairCode = code;
    this.startHttpPolling();
  }

  public getPairCode(): string {
    return this.activePairCode;
  }

  public subscribe(listener: SyncListener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private handleIncomingPayload(payload: SyncPayload) {
    if (!payload || !payload.type) return;

    // Filter by pairCode if both specify one
    if (payload.pairCode && this.activePairCode && payload.pairCode !== this.activePairCode) {
      return;
    }

    const eventKey = payload.id || `${payload.type}_${payload.sender}_${payload.timestamp}_${JSON.stringify(payload.data || '')}`;
    if (this.seenEventIds.has(eventKey)) {
      return;
    }
    this.seenEventIds.add(eventKey);

    // Limit memory size of seenEventIds
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

  public broadcast(type: SyncPayload['type'], sender: string, data: any) {
    const eventId = `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const payload: SyncPayload = {
      id: eventId,
      type,
      pairCode: this.activePairCode,
      sender,
      timestamp: Date.now(),
      data
    };

    // Mark as seen locally to prevent processing echo
    this.seenEventIds.add(eventId);

    // 1. BroadcastChannel (sub-millisecond for same-browser windows/tabs)
    try {
      this.channel?.postMessage(payload);
    } catch {
      // ignore
    }

    // 2. localStorage event
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cravematch_last_sync_event', JSON.stringify(payload));
      }
    } catch {
      // ignore
    }

    // 3. HTTP API push to dev server middleware for cross-phone sync over internet
    this.pushToServer(payload);

    // Notify local listeners
    this.notifyListeners(payload);
  }

  private async pushToServer(payload: SyncPayload) {
    try {
      if (typeof window !== 'undefined') {
        await fetch('/api/pair/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      }
    } catch {
      // Offline or network error, ignore
    }
  }

  private startHttpPolling() {
    if (typeof window === 'undefined') return;
    if (this.pollingInterval) clearInterval(this.pollingInterval);

    // Poll every 2 seconds for cross-device updates from the partner's phone
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
    }, 2000);
  }

  public destroy() {
    if (this.pollingInterval) clearInterval(this.pollingInterval);
    try {
      this.channel?.close();
    } catch {
      // ignore
    }
    this.listeners.clear();
  }
}

export const pairingSync = new PairingSyncService();
