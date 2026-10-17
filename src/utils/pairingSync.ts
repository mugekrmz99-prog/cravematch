// Real-time Pairing & Chat Synchronization Engine
// Uses MQTT over Secure WebSockets (WSS) for true cross-device, cross-network mobile sync
// (works across cellular 4G/5G, separate Wi-Fi, and GitHub Pages static hosting),
// complemented with BroadcastChannel for instant local tabs and optional backend DB.

import mqtt from 'mqtt';

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
  sessionId?: string;
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
  private activeUser: string = '';
  private sessionId: string = `sess-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  private mqttClient: mqtt.MqttClient | null = null;
  private currentSubscribedTopic: string | null = null;
  private seenEventIds: Set<string> = new Set();
  private storageHandler: ((e: StorageEvent) => void) | null = null;
  private networkInfo: NetworkInfo | null = null;
  private isConnectingMqtt: boolean = false;

  constructor() {
    // 1. BroadcastChannel for zero-latency communication across tabs on the same machine
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('cravematch_pair_channel');
        this.channel.onmessage = (event) => {
          this.handleIncomingPayload(event.data);
        };
      } catch (err) {
        console.warn('BroadcastChannel unavailable:', err);
      }
    }

    // 2. LocalStorage storage event fallback
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

    // 3. Connect to MQTT Cloud Pub/Sub
    this.initMqtt();
    this.fetchNetworkInfo();
  }

  public setActiveUser(name: string) {
    const cleanName = (name || '').trim();
    if (this.activeUser === cleanName) return;
    this.activeUser = cleanName;
    if (cleanName) {
      this.announcePresence();
    }
  }

  public setPairCode(code: string) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode || this.activePairCode === cleanCode) return;
    this.activePairCode = cleanCode;
    this.resubscribeMqttTopic();
    if (this.activeUser) {
      this.announcePresence();
    }
  }

  public getPairCode(): string {
    return this.activePairCode;
  }

  public getUser(): string {
    return this.activeUser;
  }

  private getTopicForRoom(code: string): string {
    const clean = (code || 'CRAVE-9821').trim().toUpperCase();
    return `cravematch/v2/room/${encodeURIComponent(clean)}`;
  }

  // Connect to public secure WebSocket MQTT broker
  private initMqtt() {
    if (typeof window === 'undefined') return;
    if (this.mqttClient || this.isConnectingMqtt) return;
    this.isConnectingMqtt = true;

    try {
      const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
      const clientId = `crave_${this.sessionId}`;

      const client = mqtt.connect(brokerUrl, {
        clientId,
        clean: true,
        connectTimeout: 7000,
        reconnectPeriod: 2500,
        keepalive: 30
      });

      this.mqttClient = client;

      client.on('connect', () => {
        console.log('[CraveMatch Sync] Connected to Cloud MQTT broker!');
        this.isConnectingMqtt = false;
        this.resubscribeMqttTopic();
        if (this.activeUser) {
          this.announcePresence();
        }
      });

      client.on('message', (topic, messageBuffer) => {
        try {
          const str = messageBuffer.toString('utf8');
          const payload: SyncPayload = JSON.parse(str);
          this.handleIncomingPayload(payload);
        } catch (err) {
          console.warn('[CraveMatch Sync] Failed to parse message:', err);
        }
      });

      client.on('error', (err) => {
        console.warn('[CraveMatch Sync] MQTT Error:', err);
      });

      client.on('offline', () => {
        console.log('[CraveMatch Sync] MQTT client offline, reconnecting...');
      });
    } catch (err) {
      this.isConnectingMqtt = false;
      console.warn('[CraveMatch Sync] MQTT initialization failed:', err);
    }
  }

  private resubscribeMqttTopic() {
    if (!this.mqttClient || !this.mqttClient.connected) return;

    const newTopic = this.getTopicForRoom(this.activePairCode);
    if (this.currentSubscribedTopic === newTopic) return;

    if (this.currentSubscribedTopic) {
      try {
        this.mqttClient.unsubscribe(this.currentSubscribedTopic);
      } catch {
        // ignore
      }
    }

    this.mqttClient.subscribe(newTopic, { qos: 1 }, (err) => {
      if (!err) {
        this.currentSubscribedTopic = newTopic;
        console.log('[CraveMatch Sync] Subscribed to room:', newTopic);
      } else {
        console.warn('[CraveMatch Sync] Subscription error:', err);
      }
    });
  }

  // Announces user's presence to partner over MQTT
  public announcePresence(customName?: string) {
    const sender = customName || this.activeUser;
    if (!sender) return;

    this.broadcast('PARTNER_CONNECTED', sender, {
      name: sender,
      pairCode: this.activePairCode,
      timestamp: Date.now()
    });
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

  public subscribe(listener: SyncListener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private handleIncomingPayload(payload: SyncPayload) {
    if (!payload || !payload.type) return;

    // Discard messages originating from the same browser session
    if (payload.sessionId && payload.sessionId === this.sessionId) {
      return;
    }

    // Filter by pairCode if both payload and activePairCode are present
    const payloadRoom = (payload.pairCode || '').trim().toUpperCase();
    const activeRoom = (this.activePairCode || '').trim().toUpperCase();
    if (payloadRoom && activeRoom && payloadRoom !== activeRoom) {
      return;
    }

    // Deduplicate repeated event deliveries
    const eventKey =
      payload.id ||
      `${payload.type}_${payload.sender}_${payload.timestamp}_${JSON.stringify(payload.data || '')}`;
    if (this.seenEventIds.has(eventKey)) {
      return;
    }
    this.seenEventIds.add(eventKey);

    if (this.seenEventIds.size > 300) {
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
      sender: sender || this.activeUser || 'User',
      sessionId: this.sessionId,
      timestamp: Date.now(),
      data
    };

    this.seenEventIds.add(eventId);

    // 1. MQTT Cloud Publish (cross-device & cellular)
    if (this.mqttClient && this.mqttClient.connected) {
      try {
        const topic = this.getTopicForRoom(this.activePairCode);
        this.mqttClient.publish(topic, JSON.stringify(payload), { qos: 1 });
      } catch (err) {
        console.warn('[CraveMatch Sync] MQTT publish error:', err);
      }
    } else if (this.mqttClient && !this.mqttClient.connected) {
      this.resubscribeMqttTopic();
    }

    // 2. BroadcastChannel (local tabs)
    try {
      this.channel?.postMessage(payload);
    } catch {
      // ignore
    }

    // 3. localStorage (same origin tabs)
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cravematch_last_sync_event', JSON.stringify(payload));
      }
    } catch {
      // ignore
    }

    // 4. Optional backend endpoint push (silent offline fallback)
    this.pushToDatabase(type, payload);

    // Notify local subscribers
    this.notifyListeners(payload);
  }

  private async pushToDatabase(type: SyncPayload['type'], payload: SyncPayload) {
    try {
      if (typeof window === 'undefined') return;

      if (type === 'CHAT_MESSAGE') {
        fetch('/api/db/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pairCode: this.activePairCode, message: payload.data })
        }).catch(() => {});
      } else if (type === 'PROFILE_UPDATE') {
        fetch('/api/db/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pairCode: this.activePairCode, profile: payload.data })
        }).catch(() => {});
      } else if (type === 'CART_UPDATE' || type === 'GROCERY_UPDATE') {
        fetch('/api/db/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pairCode: this.activePairCode, cart: payload.data })
        }).catch(() => {});
      } else if (type === 'DICE_ROLL' || type === 'ROLL_DICE') {
        fetch('/api/db/dice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pairCode: this.activePairCode, winner: payload.data })
        }).catch(() => {});
      }
    } catch {
      // Offline fallback
    }
  }

  public destroy() {
    if (this.mqttClient) {
      try {
        if (this.currentSubscribedTopic) {
          this.mqttClient.unsubscribe(this.currentSubscribedTopic);
        }
        this.mqttClient.end(true);
      } catch {
        // ignore
      }
      this.mqttClient = null;
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
