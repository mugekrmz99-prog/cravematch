import fs from 'fs';
import path from 'path';

export interface StoredProfile {
  id: string;
  name: string;
  birthDate?: string;
  title: string;
  level: number;
  matchesCount: number;
  badgesCount: number;
  avatarUrl: string;
  avatarType?: string;
  allergies: string[];
  isSurveyCompleted: boolean;
  joinedAt?: number;
}

export interface StoredRoom {
  pairCode: string;
  hostName?: string;
  createdAt: number;
  users: Record<string, StoredProfile>; // name -> profile
  messages: Array<{
    id: string;
    sender: 'me' | 'partner' | 'system';
    author: string;
    text: string;
    timestamp: string;
    type?: string;
  }>;
  swipes: Record<string, Record<string, boolean>>; // dishId -> { [userName]: boolean }
  matches: string[]; // dishIds liked by both
  cart: Array<{
    id: string;
    name: string;
    fromRecipe?: string;
    checked: boolean;
    addedBy?: string;
    category?: string;
  }>;
  diceWinner?: {
    dishId: string;
    dishTitle: string;
    rolledBy: string;
    timestamp: number;
  } | null;
}

export interface CraveDatabase {
  rooms: Record<string, StoredRoom>;
}

const DB_DIR = path.resolve(import.meta.dirname, '../data');
const DB_FILE = path.join(DB_DIR, 'cravematch-db.json');

const DEFAULT_DB: CraveDatabase = {
  rooms: {}
};

export class DatabaseManager {
  private db: CraveDatabase = DEFAULT_DB;

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.db = JSON.parse(raw);
      } else {
        this.save();
      }
    } catch (err) {
      console.warn('Error reading database file, using defaults:', err);
      this.db = DEFAULT_DB;
    }
  }

  private save() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.db, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save database file:', err);
    }
  }

  public getRoom(pairCode: string, hostName?: string): StoredRoom {
    if (!this.db.rooms[pairCode]) {
      this.db.rooms[pairCode] = {
        pairCode,
        hostName: hostName || '',
        createdAt: Date.now(),
        users: {},
        messages: [],
        swipes: {},
        matches: [],
        cart: [],
        diceWinner: null
      };
      this.save();
    }
    if (hostName && !this.db.rooms[pairCode].hostName) {
      this.db.rooms[pairCode].hostName = hostName;
      this.save();
    }
    return this.db.rooms[pairCode];
  }

  public saveProfile(pairCode: string, profile: StoredProfile): StoredRoom {
    const room = this.getRoom(pairCode, profile.name);
    room.users[profile.name] = {
      ...profile,
      joinedAt: profile.joinedAt || Date.now()
    };
    this.save();
    return room;
  }

  public addMessage(pairCode: string, message: StoredRoom['messages'][0]): StoredRoom {
    const room = this.getRoom(pairCode);
    if (!room.messages.some((m) => m.id === message.id)) {
      room.messages.push(message);
      // Keep last 100 messages
      if (room.messages.length > 100) {
        room.messages.shift();
      }
      this.save();
    }
    return room;
  }

  public recordSwipe(
    pairCode: string,
    userName: string,
    dishId: string,
    liked: boolean
  ): { isMatch: boolean; room: StoredRoom } {
    const room = this.getRoom(pairCode);
    if (!room.swipes[dishId]) {
      room.swipes[dishId] = {};
    }
    room.swipes[dishId][userName] = liked;

    let isMatch = false;
    if (liked) {
      // Check if another user also liked it
      const likes = Object.entries(room.swipes[dishId]).filter(([u, l]) => l && u !== userName);
      if (likes.length > 0) {
        isMatch = true;
        if (!room.matches.includes(dishId)) {
          room.matches.push(dishId);
        }
      }
    }

    this.save();
    return { isMatch, room };
  }

  public updateCart(pairCode: string, cart: StoredRoom['cart']): StoredRoom {
    const room = this.getRoom(pairCode);
    room.cart = cart;
    this.save();
    return room;
  }

  public setDiceWinner(pairCode: string, winner: StoredRoom['diceWinner']): StoredRoom {
    const room = this.getRoom(pairCode);
    room.diceWinner = winner;
    this.save();
    return room;
  }
}

export const dbManager = new DatabaseManager();
