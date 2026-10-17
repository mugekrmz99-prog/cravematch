import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenTab, Dish, GroceryItem, TasteDuel, UserProfile, Language, ChatMessage } from './types';
import {
  INITIAL_USER,
  INITIAL_DISHES,
  INITIAL_GROCERY_ITEMS,
  INITIAL_TASTE_DUELS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_BADGES
} from './data/mockData';
import { DeviceFrame } from './components/DeviceFrame';
import { BottomNavBar } from './components/BottomNavBar';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { SurveyScreen } from './components/screens/SurveyScreen';
import { SwipesScreen } from './components/screens/SwipesScreen';
import { DiceScreen } from './components/screens/DiceScreen';
import { PleasurePoolCartScreen } from './components/screens/PleasurePoolCartScreen';
import { CoCookingScreen } from './components/screens/CoCookingScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ChatScreen } from './components/screens/ChatScreen';
import { SettingsModal } from './components/SettingsModal';
import { sound } from './utils/sound';
import confetti from 'canvas-confetti';
import { pairingSync } from './utils/pairingSync';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cravematch_lang');
      if (saved === 'tr' || saved === 'en' || saved === 'de') return saved;
    }
    return 'tr'; // Default Turkish
  });

  const [currentTab, setCurrentTab] = useState<ScreenTab>('onboarding');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Persistent User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cravematch_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return {
      ...INITIAL_USER,
      id: 'usr-1',
      name: 'Müge',
      birthDate: '1998-05-14',
      isSurveyCompleted: false,
      badges: INITIAL_BADGES,
      partner: {
        id: 'usr-2',
        name: 'Cihat',
        avatarUrl: INITIAL_USER.partner.avatarUrl,
        status: 'Choosing Together!',
        isConnected: true,
        pairCode: 'CRAVE-9821'
      }
    };
  });

  // Persistent Dishes
  const [dishes, setDishes] = useState<Dish[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cravematch_dishes');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_DISHES;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [groceries, setGroceries] = useState<GroceryItem[]>(INITIAL_GROCERY_ITEMS);
  const [duels, setDuels] = useState<TasteDuel[]>(INITIAL_TASTE_DUELS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [unreadChatCount, setUnreadChatCount] = useState<number>(1);

  // Selected dish for Co-Cooking recipe & Cart
  const [selectedRecipeDish, setSelectedRecipeDish] = useState<Dish | null>(
    INITIAL_DISHES.find((d) => d.id === 'dish-1') || INITIAL_DISHES[0]
  );

  // Dish passed into dice roll
  const [diceContenderDish, setDiceContenderDish] = useState<Dish | null>(null);

  // Partner Welcome Banner state
  const [partnerWelcomeBanner, setPartnerWelcomeBanner] = useState<{
    partnerName: string;
    pairCode: string;
    persona: string;
  } | null>(null);

  // Auto-detect QR pair code in URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pairCode = params.get('pair');
      const partnerParam = params.get('partner') || 'Müge';
      const asParam = params.get('as') || 'Cihat';

      if (pairCode) {
        pairingSync.setPairCode(pairCode);

        // If opened as Cihat (e.g. spouse opened via QR link)
        if (asParam.toLowerCase() === 'cihat') {
          setUser((prev) => ({
            ...prev,
            id: 'usr-2',
            name: 'Cihat',
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
            isSurveyCompleted: true,
            partner: {
              ...prev.partner,
              id: 'usr-1',
              name: partnerParam,
              isConnected: true,
              status: 'Choosing Together!',
              pairCode
            }
          }));
        } else {
          setUser((prev) => ({
            ...prev,
            partner: {
              ...prev.partner,
              name: partnerParam,
              isConnected: true,
              status: 'Choosing Together!',
              pairCode
            }
          }));
        }

        // Notify other devices / tabs that partner connected!
        pairingSync.broadcast('PARTNER_CONNECTED', asParam, { name: asParam, pairCode });

        // Show welcome banner and go directly to swipes!
        setPartnerWelcomeBanner({
          partnerName: partnerParam,
          pairCode,
          persona: asParam
        });
        setCurrentTab('swipes');
        sound.playSuccess();
        try {
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
        } catch {
          // ignore
        }
      }
    }
  }, []);

  // Real-time synchronization listener (cross-device & cross-tab)
  useEffect(() => {
    pairingSync.setPairCode(user.partner.pairCode || 'CRAVE-9821');
    pairingSync.setActiveUser(user.name);

    const unsub = pairingSync.subscribe((payload) => {
      if (payload.type === 'PARTNER_CONNECTED') {
        const incomingName = payload.data?.name || payload.sender;
        const otherPersonName = incomingName && incomingName !== user.name
          ? incomingName
          : (user.name === 'Cihat' ? 'Müge' : 'Cihat');

        setUser((prev) => ({
          ...prev,
          partner: {
            ...prev.partner,
            name: otherPersonName,
            isConnected: true,
            status: 'Choosing Together!'
          }
        }));
        sound.playSuccess();
        try {
          confetti({ particleCount: 60, spread: 75, origin: { y: 0.5 } });
        } catch {
          // ignore
        }
      } else if (payload.type === 'CHAT_MESSAGE') {
        const incoming = payload.data;
        if (incoming && incoming.id) {
          const isFromMe = (incoming.author || payload.sender) === user.name;
          const normalizedMsg: ChatMessage = {
            ...incoming,
            sender: isFromMe ? 'me' : 'partner'
          };
          setMessages((prev) => {
            if (prev.some((m) => m.id === incoming.id)) return prev;
            return [...prev, normalizedMsg];
          });
          if (!isFromMe) {
            if (currentTab !== 'chat') {
              setUnreadChatCount((c) => c + 1);
            }
            sound.playNotification();
          }
        }
      }
    });

    return unsub;
  }, [user.name, user.partner.pairCode, currentTab]);

  // Save changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cravematch_lang', lang);
      localStorage.setItem('cravematch_user', JSON.stringify(user));
      localStorage.setItem('cravematch_dishes', JSON.stringify(dishes));
    }
  }, [lang, user, dishes]);

  // Robust Allergen & Category Filter
  // When user has allergies or dislikes selected, dishes containing matching allergens or ingredients are genuinely HIDDEN!
  const userAllergiesLower = (user.allergies || []).map((a) => a.toLowerCase().trim()).filter(Boolean);

  const dishesWithoutAllergens = dishes.filter((dish) => {
    if (userAllergiesLower.length === 0) return true;

    // Check allergen tags
    const hasAllergen = (dish.allergens || []).some((alg) =>
      userAllergiesLower.some((ua) =>
        alg.toLowerCase().includes(ua) || ua.includes(alg.toLowerCase())
      )
    );

    // Check ingredients
    const hasDislikedIngredient = (dish.ingredients || []).some((ing) =>
      userAllergiesLower.some((ua) =>
        ing.name.toLowerCase().includes(ua) || ua.includes(ing.name.toLowerCase())
      )
    );

    // Check title keywords
    const hasDislikedTitle = userAllergiesLower.some((ua) =>
      dish.title.toLowerCase().includes(ua) ||
      (dish.title_en && dish.title_en.toLowerCase().includes(ua))
    );

    return !hasAllergen && !hasDislikedIngredient && !hasDislikedTitle;
  });

  const hiddenDueToAllergiesCount = dishes.length - dishesWithoutAllergens.length;

  const filteredDishes = dishesWithoutAllergens.filter((dish) => {
    if (activeCategory === 'All') return true;
    const catLower = activeCategory.toLowerCase();
    return (
      dish.tags.some((t) => t.toLowerCase() === catLower) ||
      dish.tags.some((t) => t.toLowerCase().includes(catLower)) ||
      dish.title.toLowerCase().includes(catLower)
    );
  });

  // Handle adding custom dish (Pro feature)
  const handleAddCustomDish = (newDish: Dish) => {
    setDishes((prev) => [newDish, ...prev]);
  };

  // Handle importing dishes from CSV
  const handleImportDishesFromCSV = (imported: Dish[]) => {
    setDishes((prev) => [...imported, ...prev]);
  };

  // Handle adding recipe ingredients to grocery cart automatically
  const handleAddIngredientsToGrocery = (dish: Dish, portions: number = 2) => {
    const ratio = portions / (dish.basePortions || 2);
    const newItems: GroceryItem[] = dish.ingredients.map((ing, idx) => ({
      id: `recipe-item-${Date.now()}-${idx}`,
      name: `${Math.round(ing.amount * ratio * 10) / 10} ${ing.unit} ${ing.name}`,
      fromRecipe: dish.title,
      checked: false,
      addedBy: user.name,
      category: ing.category || 'Pantry'
    }));

    setGroceries((prev) => [...newItems, ...prev]);
    setSelectedRecipeDish(dish);
    sound.playSuccess();
  };

  // Switch to recipe screen
  const handleOpenRecipe = (dish: Dish) => {
    setSelectedRecipeDish(dish);
    setCurrentTab('recipe');
  };

  // Switch to dice roll screen with pre-selected dish
  const handleNavigateToDice = (dish?: Dish) => {
    if (dish) {
      setDiceContenderDish(dish);
    }
    setCurrentTab('dice');
  };

  // Survey completion
  const handleCompleteSurvey = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    setCurrentTab('swipes');
  };

  // Full reset (for test verification from scratch as requested)
  const handleResetAllData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cravematch_user');
      localStorage.removeItem('cravematch_dishes');
    }
    setUser({
      ...INITIAL_USER,
      id: 'usr-1',
      name: '',
      isSurveyCompleted: false,
      allergies: [],
      badges: INITIAL_BADGES,
      partner: {
        id: 'usr-2',
        name: 'Cihat',
        avatarUrl: INITIAL_USER.partner.avatarUrl,
        status: 'Waiting',
        isConnected: false,
        pairCode: 'CRAVE-9821'
      }
    });
    setDishes(INITIAL_DISHES);
    setGroceries(INITIAL_GROCERY_ITEMS);
    setMessages(INITIAL_CHAT_MESSAGES);
    setSelectedRecipeDish(INITIAL_DISHES[0]);
    setCurrentTab('onboarding');
  };

  // Chat message send handler with author tracking for multi-phone chat
  const handleSendMessage = (msg: ChatMessage) => {
    const outboundMsg: ChatMessage = {
      ...msg,
      author: user.name
    };
    setMessages((prev) => [...prev, outboundMsg]);
    pairingSync.broadcast('CHAT_MESSAGE', user.name, outboundMsg);
  };

  // Pair with PIN / Code handler (instant sync for spouse's phone)
  const handlePairWithCode = (code: string, myName: string, partnerName: string) => {
    pairingSync.setPairCode(code);
    pairingSync.setActiveUser(myName);

    if (myName.toLowerCase() === 'cihat') {
      setUser((prev) => ({
        ...prev,
        id: 'usr-2',
        name: 'Cihat',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        isSurveyCompleted: true,
        partner: {
          ...prev.partner,
          id: 'usr-1',
          name: partnerName || 'Müge',
          isConnected: true,
          status: 'Choosing Together!',
          pairCode: code
        }
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        id: 'usr-1',
        name: 'Müge',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        isSurveyCompleted: true,
        partner: {
          ...prev.partner,
          id: 'usr-2',
          name: partnerName || 'Cihat',
          isConnected: true,
          status: 'Choosing Together!',
          pairCode: code
        }
      }));
    }

    pairingSync.broadcast('PARTNER_CONNECTED', myName, { name: myName, pairCode: code });
    setPartnerWelcomeBanner({
      partnerName: partnerName || (myName === 'Cihat' ? 'Müge' : 'Cihat'),
      pairCode: code,
      persona: myName
    });
    setCurrentTab('swipes');
    sound.playSuccess();
    try {
      confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });
    } catch {
      // ignore
    }
  };

  // Toggle Persona (switch between viewing phone as Müge or Cihat)
  const handleSwitchPersona = () => {
    sound.playTap();
    const isCurrentlyMuge = user.name === 'Müge';
    const nextName = isCurrentlyMuge ? 'Cihat' : 'Müge';
    const nextPartner = isCurrentlyMuge ? 'Müge' : 'Cihat';

    setUser((prev) => ({
      ...prev,
      id: isCurrentlyMuge ? 'usr-2' : 'usr-1',
      name: nextName,
      avatarUrl: isCurrentlyMuge
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      partner: {
        ...prev.partner,
        id: isCurrentlyMuge ? 'usr-1' : 'usr-2',
        name: nextPartner,
        isConnected: true
      }
    }));
    pairingSync.setActiveUser(nextName);
  };

  // Cart total badge
  const uncompletedGroceryCount = groceries.filter((g) => !g.checked).length;

  return (
    <DeviceFrame activeTabTitle={currentTab}>
      <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#F7F5F2]">
        {/* Device Persona Indicator & Quick Switch */}
        <div className="bg-[#2B6777] text-white px-3 py-1 flex items-center justify-between text-[10px] font-bold shadow-2xs select-none z-30">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">Cihaz: <strong className="text-[#F2A900]">{user.name}</strong></span>
            {user.partner.isConnected && (
              <span className="text-emerald-200 ml-1 truncate">💑 {user.partner.name} ile Bağlı</span>
            )}
          </div>
          <button
            onClick={handleSwitchPersona}
            className="px-2 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-[9px] font-extrabold cursor-pointer transition-all shrink-0 ml-1"
            title="Telefon kimliğini değiştir"
          >
            {user.name === 'Müge' ? '👨 Cihat Ol' : '👩 Müge Ol'}
          </button>
        </div>

        {/* Partner Connection Welcome Banner */}
        {partnerWelcomeBanner && (
          <div className="absolute top-8 left-3 right-3 z-50 p-2.5 rounded-2xl bg-[#2B6777] text-white shadow-xl flex items-center justify-between border border-emerald-400/50 animate-bounce">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎉</span>
              <div className="text-left">
                <div className="text-xs font-black">
                  {partnerWelcomeBanner.partnerName} ile Eşleşildi!
                </div>
                <div className="text-[10px] text-emerald-200">
                  {partnerWelcomeBanner.persona} olarak ortak yemek havuzuna bağlandınız!
                </div>
              </div>
            </div>
            <button
              onClick={() => setPartnerWelcomeBanner(null)}
              className="text-white/90 hover:text-white text-[11px] font-bold px-2 py-1 bg-white/20 hover:bg-white/30 rounded-lg cursor-pointer ml-1"
            >
              Tamam
            </button>
          </div>
        )}

        {/* Screen Content Switcher */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {currentTab === 'onboarding' && (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <OnboardingScreen
                  lang={lang}
                  onSelectLang={setLang}
                  onStart={() => setCurrentTab('survey')}
                  onSignIn={() => {
                    if (user.isSurveyCompleted) {
                      setCurrentTab('swipes');
                    } else {
                      setCurrentTab('survey');
                    }
                  }}
                  onPairWithCode={handlePairWithCode}
                />
              </motion.div>
            )}

            {currentTab === 'survey' && (
              <motion.div
                key="survey"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full h-full"
              >
                <SurveyScreen
                  initialUser={user}
                  lang={lang}
                  onComplete={handleCompleteSurvey}
                  onBack={() => setCurrentTab('onboarding')}
                />
              </motion.div>
            )}

            {currentTab === 'swipes' && (
              <motion.div
                key="swipes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <SwipesScreen
                  dishes={filteredDishes}
                  user={user}
                  lang={lang}
                  activeCategory={activeCategory}
                  hiddenDueToAllergiesCount={hiddenDueToAllergiesCount}
                  onSelectCategory={setActiveCategory}
                  onSelectDishForRecipe={handleOpenRecipe}
                  onNavigateToDice={handleNavigateToDice}
                  onNavigateToProfile={() => setCurrentTab('profile')}
                  onOpenSettings={() => setIsSettingsOpen(true)}
                />
              </motion.div>
            )}

            {currentTab === 'dice' && (
              <motion.div
                key="dice"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <DiceScreen
                  user={user}
                  dishes={dishes}
                  lang={lang}
                  initialSelectedDish={diceContenderDish}
                  onCookRecipe={handleOpenRecipe}
                  onAddToCart={(dish) => {
                    handleAddIngredientsToGrocery(dish, 2);
                  }}
                />
              </motion.div>
            )}

            {currentTab === 'cart' && (
              <motion.div
                key="cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <PleasurePoolCartScreen
                  user={user}
                  groceries={groceries}
                  selectedDish={selectedRecipeDish}
                  lang={lang}
                  onUpdateGroceries={setGroceries}
                  onNavigateToDice={() => setCurrentTab('dice')}
                  onNavigateToRecipe={handleOpenRecipe}
                />
              </motion.div>
            )}

            {currentTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <ChatScreen
                  user={user}
                  messages={messages}
                  lang={lang}
                  onSendMessage={handleSendMessage}
                  onNavigateToTab={(tab) => setCurrentTab(tab)}
                />
              </motion.div>
            )}

            {currentTab === 'recipe' && selectedRecipeDish && (
              <motion.div
                key="recipe"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full h-full"
              >
                <CoCookingScreen
                  dish={selectedRecipeDish}
                  user={user}
                  lang={lang}
                  onBack={() => setCurrentTab('swipes')}
                  onAddIngredientsToGrocery={handleAddIngredientsToGrocery}
                />
              </motion.div>
            )}

            {currentTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <ProfileScreen
                  user={user}
                  duels={duels}
                  dishes={dishes}
                  lang={lang}
                  onUpdateUser={setUser}
                  onNavigateToSwipes={() => setCurrentTab('swipes')}
                  onNavigateToChat={() => setCurrentTab('chat')}
                  onOpenSettings={() => setIsSettingsOpen(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Persistent Bottom Nav Bar (hidden on onboarding, survey, & full recipe view) */}
        {currentTab !== 'onboarding' && currentTab !== 'survey' && currentTab !== 'recipe' && (
          <BottomNavBar
            currentTab={currentTab}
            lang={lang}
            onTabChange={(tab) => {
              if (tab !== currentTab) {
                if (tab === 'chat') {
                  setUnreadChatCount(0);
                }
                setCurrentTab(tab);
              }
            }}
            cartCount={uncompletedGroceryCount}
            unreadChatCount={unreadChatCount}
          />
        )}

        {/* Settings & Pro Menu Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          lang={lang}
          onSelectLang={setLang}
          user={user}
          dishes={dishes}
          onAddCustomDish={handleAddCustomDish}
          onImportDishesFromCSV={handleImportDishesFromCSV}
          onResetAllData={handleResetAllData}
        />
      </div>
    </DeviceFrame>
  );
}
