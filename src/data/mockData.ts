import { Dish, GroceryItem, TasteDuel, UserProfile, BadgeItem, ChatMessage } from '../types';
import { AUTHENTIC_TURKISH_DISHES } from './dishesData';

export const INITIAL_BADGES: BadgeItem[] = [
  {
    id: 'badge-1',
    title: 'Usta Şef',
    title_en: 'Master Chef',
    title_de: 'Meisterkoch',
    description: 'Partnerinle birlikte en az 25 ortak yemek hazırla.',
    description_en: 'Prepare at least 25 collaborative recipes with your partner.',
    description_de: 'Bereite mindestens 25 gemeinsame Rezepte mit deinem Partner zu.',
    howToUnlock: 'Birlikte Pişir (Co-Cooking) modunda 25 yemeğin tüm adımlarını tamamlayın.',
    howToUnlock_en: 'Complete all steps of 25 recipes in Co-Cooking mode.',
    howToUnlock_de: 'Schließe alle Schritte von 25 Rezepten im Co-Cooking-Modus ab.',
    icon: '👨‍🍳',
    unlocked: true,
    progress: 25,
    maxProgress: 25,
    category: 'cooking'
  },
  {
    id: 'badge-2',
    title: 'Acı Aşığı',
    title_en: 'Spice Seeker',
    title_de: 'Scharf-Liebhaber',
    description: 'Acı kategorisindeki en az 3 yemeği beğen veya pişir.',
    description_en: 'Like or cook at least 3 spicy category dishes.',
    description_de: 'Like oder koche mindestens 3 scharfe Gerichte.',
    howToUnlock: 'Acı kategorisinde yer alan 3 farklı lezzete sağa kaydırarak kalp verin.',
    howToUnlock_en: 'Swipe right on 3 different spicy dishes.',
    howToUnlock_de: 'Swipe nach rechts bei 3 verschiedenen scharfen Gerichten.',
    icon: '🌶️',
    unlocked: true,
    progress: 3,
    maxProgress: 3,
    category: 'explorer'
  },
  {
    id: 'badge-3',
    title: 'Zar Ustası',
    title_en: 'Dice Master',
    title_de: 'Würfelmeister',
    description: 'Akşam yemeği karar zarını en az 10 kez salla.',
    description_en: 'Roll the dinner decision dice at least 10 times.',
    description_de: 'Rolle den Entscheidungswürfel mindestens 10 Mal.',
    howToUnlock: 'Karar Zarı ekranında "Zarı At" butonuna basarak 10 kez karar belirleyin.',
    howToUnlock_en: 'Settle dinner debate by rolling the decision dice 10 times.',
    howToUnlock_de: 'Entscheide dein Abendessen 10 Mal mit dem Würfel.',
    icon: '🎲',
    unlocked: false,
    progress: 8,
    maxProgress: 10,
    category: 'dice'
  },
  {
    id: 'badge-4',
    title: 'Mükemmel Çift',
    title_en: 'Perfect Match Pair',
    title_de: 'Perfektes Paar',
    description: 'Partnerinle aynı yemeği beğenerek 5 ortak eşleşme yakala.',
    description_en: 'Get 5 mutual matches by liking the same dishes as your partner.',
    description_de: 'Erzielt 5 gemeinsame Matches durch Vorlieben beider Partner.',
    howToUnlock: 'Partnerinizle aynı gün içinde 5 ortak yemek eşleşmesi yakalayın.',
    howToUnlock_en: 'Achieve 5 mutual meal matches with your partner.',
    howToUnlock_de: 'Erreicht 5 gegenseitige Übereinstimmungen bei Gerichten.',
    icon: '💑',
    unlocked: true,
    progress: 5,
    maxProgress: 5,
    category: 'dating'
  },
  {
    id: 'badge-5',
    title: 'Gece Gurmesi',
    title_en: 'Midnight Foodie',
    title_de: 'Mitternachts-Gourmet',
    description: 'Gece saat 22:00 sonrasında akşam yemeği veya atıştırmalık seç.',
    description_en: 'Pick or swipe food after 22:00 at night.',
    description_de: 'Wähle Essen nach 22:00 Uhr abends aus.',
    howToUnlock: 'Gece 22:00 ile 04:00 arasında CraveMatch üzerinden yemek seçimi yapın.',
    howToUnlock_en: 'Select dinner or snacks between 22:00 and 04:00.',
    howToUnlock_de: 'Wähle Gerichte zwischen 22:00 und 04:00 Uhr.',
    icon: '🌙',
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    category: 'explorer'
  },
  {
    id: 'badge-6',
    title: 'Market Kahramanı',
    title_en: 'Pantry Pro',
    title_de: 'Einkaufs-Held',
    description: 'Zarla seçilen yemeğin tüm market malzemelerini tamamla.',
    description_en: 'Check off all grocery items from a chosen recipe.',
    description_de: 'Hake alle Zutaten eines gewählten Rezepts ab.',
    howToUnlock: 'Sepet ekranındaki tüm malzemeleri satın alıp tik işaretini tamamlayın.',
    howToUnlock_en: 'Check all ingredient checkboxes in the Grocery Cart.',
    howToUnlock_de: 'Markiere alle Zutaten im Warenkorb als erledigt.',
    icon: '🛒',
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    category: 'cooking'
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-me',
  name: '',
  birthDate: '1998-05-14',
  title: 'Gurme Şef',
  level: 1,
  matchesCount: 0,
  badgesCount: 0,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  avatarType: 'photo',
  allergies: [],
  partner: {
    id: 'usr-partner',
    name: '',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    status: 'Partner Bekleniyor',
    isConnected: false,
    pairCode: ''
  },
  isSurveyCompleted: false,
  badges: INITIAL_BADGES
};

// 110 Authentic Turkish Dishes
export const INITIAL_DISHES: Dish[] = AUTHENTIC_TURKISH_DISHES;

export const INITIAL_GROCERY_ITEMS: GroceryItem[] = [
  { id: 'g-1', name: '1.5 Su Bardağı Kırmızı Mercimek', fromRecipe: 'Geleneksel Kırmızı Mercimek Çorbası', checked: false, addedBy: '1. Şef', category: 'Pantry' },
  { id: 'g-2', name: '2 Yemek Kaşığı Köy Tereyağı', fromRecipe: 'Geleneksel Kırmızı Mercimek Çorbası', checked: true, addedBy: '1. Şef', category: 'Dairy' },
  { id: 'g-3', name: '4 Adet Kemer Patlıcan', fromRecipe: 'Fırında Klasik Karnıyarık', checked: false, addedBy: '2. Şef', category: 'Produce' },
  { id: 'g-4', name: '300g Orta Yağlı Dana Kıyma', fromRecipe: 'Fırında Klasik Karnıyarık', checked: false, addedBy: '2. Şef', category: 'Meat' },
  { id: 'g-5', name: '1 Demet Taze Maydanoz', fromRecipe: 'Fırında Klasik Karnıyarık', checked: false, addedBy: '1. Şef', category: 'Produce' }
];

export const INITIAL_TASTE_DUELS: TasteDuel[] = [
  {
    id: 'duel-1',
    title: 'Kebap Kapışması',
    title_en: 'Kebab Clash',
    title_de: 'Kebab-Duell',
    subtitle: 'Hangisine asla hayır diyemezsin?',
    subtitle_en: 'Which authentic kebab wins your soul tonight?',
    subtitle_de: 'Welcher Kebab gewinnt heute?',
    optionA: {
      name: 'Adana Kebap',
      emoji: '🌶️',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
      votesPercent: 58
    },
    optionB: {
      name: 'Bursa İskender',
      emoji: '🥩',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      votesPercent: 42
    },
    userVote: 'A'
  },
  {
    id: 'duel-2',
    title: 'Efsane Tatlı Düellosu',
    title_en: 'Dessert Duel',
    title_de: 'Dessert-Schlacht',
    subtitle: 'Akşamın tatlı finalinde favorin kim?',
    subtitle_en: 'Ultimate sweet finale showdown',
    subtitle_de: 'Das ultimative süße Duell',
    optionA: {
      name: 'Antep Baklavası',
      emoji: '🥮',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
      votesPercent: 52
    },
    optionB: {
      name: 'Hatay Künefesi',
      emoji: '🧀',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
      votesPercent: 48
    },
    userVote: 'B'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'sys-welcome',
    sender: 'system',
    text: '🎉 CraveMatch sofrasına hoş geldiniz! Partneriniz bağlandığında mesajlarınız anında iki telefonda canlı senkronize olacak.',
    timestamp: '18:00',
    type: 'text'
  }
];
