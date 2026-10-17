export type Language = 'tr' | 'en' | 'de';

export type ScreenTab = 'onboarding' | 'survey' | 'swipes' | 'dice' | 'cart' | 'chat' | 'profile' | 'recipe';

export interface CookingStep {
  id: number;
  title: string;
  description: string;
  chef: 'chef1' | 'chef2' | 'both';
  chefName?: string;
  durationMins?: number;
  completed?: boolean;
}

export interface DishIngredient {
  name: string;
  amount: number;
  unit: string;
  category?: 'Produce' | 'Dairy' | 'Pantry' | 'Meat' | 'Bakery' | 'Spices' | string;
}

export interface Dish {
  id: string;
  title: string;
  title_en?: string;
  title_de?: string;
  subtitle?: string;
  subtitle_en?: string;
  subtitle_de?: string;
  description: string;
  description_en?: string;
  description_de?: string;
  image: string;
  prepTime: string;
  prepTimeMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  reviewCount: number;
  tags: string[];
  allergens: string[]; // e.g. ['Gluten', 'Dairy', 'Shellfish', 'Nuts', 'Mushrooms', 'Cilantro', 'Spicy']
  basePortions: number;
  matchScore?: number;
  partnerLiked?: boolean;
  userLiked?: boolean;
  isCustom?: boolean;
  ingredients: DishIngredient[];
  steps: CookingStep[];
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity?: string;
  fromRecipe?: string;
  checked: boolean;
  addedBy?: string;
  category?: string;
}

export interface TasteDuel {
  id: string;
  title: string;
  title_en?: string;
  title_de?: string;
  subtitle: string;
  subtitle_en?: string;
  subtitle_de?: string;
  optionA: {
    name: string;
    emoji: string;
    image: string;
    votesPercent: number;
  };
  optionB: {
    name: string;
    emoji: string;
    image: string;
    votesPercent: number;
  };
  userVote?: 'A' | 'B';
}

export interface PartnerInfo {
  id: string;
  name: string;
  avatarUrl: string;
  status: string;
  isConnected: boolean;
  pairCode: string;
}

export interface BadgeItem {
  id: string;
  title: string;
  title_en?: string;
  title_de?: string;
  description: string;
  description_en?: string;
  description_de?: string;
  howToUnlock: string;
  howToUnlock_en?: string;
  howToUnlock_de?: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  category: 'cooking' | 'dating' | 'dice' | 'explorer';
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'partner' | 'system';
  text: string;
  timestamp: string;
  author?: string;
  type?: 'text' | 'action_prompt' | 'dice_alert' | 'cart_alert' | 'timer_alert';
}

export interface UserProfile {
  id: string;
  name: string;
  birthDate?: string;
  title: string;
  level: number;
  matchesCount: number;
  badgesCount: number;
  avatarUrl: string;
  avatarType?: 'custom' | 'animal' | 'game' | 'photo';
  allergies: string[];
  partner: PartnerInfo;
  isSurveyCompleted: boolean;
  badges: BadgeItem[];
}
