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
}

export interface StoredRoom {
  pairCode: string;
  createdAt: number;
  users: Record<string, StoredProfile>;
  messages: Array<{
    id: string;
    sender: 'me' | 'partner' | 'system';
    author: string;
    text: string;
    timestamp: string;
    type?: string;
  }>;
  swipes: Record<string, Record<string, boolean>>; // dishId -> { "Müge": true, "Cihat": true }
  matches: string[]; // dishIds
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
  rooms: {
    'CRAVE-9821': {
      pairCode: 'CRAVE-9821',
      createdAt: Date.now(),
      users: {
        'Müge': {
          id: 'usr-1',
          name: 'Müge',
          birthDate: '1998-05-14',
          title: 'Master Chef',
          level: 12,
          matchesCount: 42,
          badgesCount: 15,
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
          avatarType: 'photo',
          allergies: ['Kişniş'],
          isSurveyCompleted: true
        },
        'Cihat': {
          id: 'usr-2',
          name: 'Cihat',
          birthDate: '1996-08-22',
          title: 'Sous Chef & BBQ Master',
          level: 10,
          matchesCount: 42,
          badgesCount: 12,
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          avatarType: 'photo',
          allergies: ['Aşırı Acı'],
          isSurveyCompleted: true
        }
      },
      messages: [
        {
          id: 'msg-1',
          sender: 'partner',
          author: 'Cihat',
          text: 'Aşkım menüye baktın mı? Bu akşam için harika seçenekler beğendim! 🍽️',
          timestamp: '18:15',
          type: 'text'
        },
        {
          id: 'msg-2',
          sender: 'me',
          author: 'Müge',
          text: 'Ben de baktım, özellikle sarımsaklı karidesli makarna harika görünüyor! 😍',
          timestamp: '18:18',
          type: 'text'
        },
        {
          id: 'msg-3',
          sender: 'system',
          author: 'System',
          text: '⏰ Günün Menüsü Uyarısı: Akşam yemeği karar zarını atmak için son 15 dakika!',
          timestamp: '18:30',
          type: 'timer_alert'
        }
      ],
      swipes: {
        'dish-1': { 'Müge': true, 'Cihat': true }
      },
      matches: ['dish-1'],
      cart: [
        { id: 'g-1', name: '300g Fettuccine Makarna', fromRecipe: 'Sarımsaklı Karidesli Makarna', checked: false, addedBy: 'Müge', category: 'Pantry' },
        { id: 'g-2', name: '350g Ayıklanmış Jumbo Karides', fromRecipe: 'Sarımsaklı Karidesli Makarna', checked: false, addedBy: 'Cihat', category: 'Meat' },
        { id: 'g-3', name: '1 Baş Taze Sarımsak', fromRecipe: 'Sarımsaklı Karidesli Makarna', checked: true, addedBy: 'Müge', category: 'Produce' }
      ],
      diceWinner: null
    }
  }
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

  public getRoom(pairCode: string = 'CRAVE-9821'): StoredRoom {
    if (!this.db.rooms[pairCode]) {
      this.db.rooms[pairCode] = {
        pairCode,
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
    return this.db.rooms[pairCode];
  }

  public saveProfile(pairCode: string, profile: StoredProfile): StoredRoom {
    const room = this.getRoom(pairCode);
    room.users[profile.name] = profile;
    this.save();
    return room;
  }

  public addMessage(pairCode: string, message: StoredRoom['messages'][0]): StoredRoom {
    const room = this.getRoom(pairCode);
    if (!room.messages.some(m => m.id === message.id)) {
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
