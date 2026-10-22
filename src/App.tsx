import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenTab, Dish, GroceryItem, TasteDuel, UserProfile, Language, ChatMessage, DailyAdventure, FeastHistoryItem, TodaysMealState } from './types';
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
import { TodaysMealScreen } from './components/screens/TodaysMealScreen';
import { CoCookingScreen } from './components/screens/CoCookingScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ChatScreen } from './components/screens/ChatScreen';
import { DiningAdventureModal } from './components/DiningAdventureModal';
import { SettingsModal } from './components/SettingsModal';
import { sound } from './utils/sound';
import confetti from 'canvas-confetti';
import { pairingSync } from './utils/pairingSync';
import { translations } from './utils/i18n';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cravematch_lang');
      if (saved === 'tr' || saved === 'en' || saved === 'de') return saved;
    }
    return 'tr'; // Default Turkish
  });

  const [currentTab, setCurrentTab] = useState<ScreenTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('pair')) {
        // If arriving via pairing link, route to survey so partner can set their name/allergies
        return 'survey';
      }
      const savedUser = localStorage.getItem('cravematch_user');
      if (savedUser) {
        try {
          const u = JSON.parse(savedUser);
          if (u.isSurveyCompleted && u.name) return 'swipes';
        } catch {}
      }
    }
    return 'onboarding';
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Persistent User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cravematch_user');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') return parsed;
        } catch {
          // fallback
        }
      }
    }
    return {
      ...INITIAL_USER,
      id: `usr-${Date.now()}`,
      name: '',
      birthDate: '1998-05-14',
      isSurveyCompleted: false,
      badges: INITIAL_BADGES,
      partner: {
        id: `partner-${Date.now()}`,
        name: '',
        avatarUrl: INITIAL_USER.partner.avatarUrl,
        status: 'Partner Bekleniyor',
        isConnected: false,
        pairCode: 'CRAVE-9821'
      }
    };
  });

  // Persistent Dishes (Clean 110 authentic dishes with 0 likes initially)
  const [dishes, setDishes] = useState<Dish[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cravematch_dishes_v4');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= 100) {
            return parsed;
          }
        } catch {
          // fallback
        }
      }
    }
    const cleanCatalog = INITIAL_DISHES.map((d) => ({
      ...d,
      userLiked: false,
      partnerLiked: false
    }));
    if (typeof window !== 'undefined') {
      localStorage.setItem('cravematch_dishes_v4', JSON.stringify(cleanCatalog));
    }
    return cleanCatalog;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [groceries, setGroceries] = useState<GroceryItem[]>(INITIAL_GROCERY_ITEMS);
  const [duels, setDuels] = useState<TasteDuel[]>(INITIAL_TASTE_DUELS);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cravematch_chat_messages_v2');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {}
      }
    }
    return INITIAL_CHAT_MESSAGES;
  });
  const [unreadChatCount, setUnreadChatCount] = useState<number>(1);

  // Selected dish for today's meal (null initially until matched or rolled)
  const [selectedRecipeDish, setSelectedRecipeDish] = useState<Dish | null>(null);

  // Dish passed into dice roll
  const [diceContenderDish, setDiceContenderDish] = useState<Dish | null>(null);

  // Fully synchronized & persistent meal state for "Bugün Ne Yiyeceğiz?"
  const [todaysMealState, setTodaysMealState] = useState<TodaysMealState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cravematch_todays_meal_v3');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') return parsed;
        } catch {}
      }
    }
    return {
      dish: null,
      adventure: null,
      isCooking: false,
      cookingStartedAt: null,
      cookingSecondsLeft: 25 * 60,
      kitchenPhotoUrl: null,
      partnerHearts: 0,
      partnerRoses: 0,
      isFeastCompleted: false
    };
  });

  // Daily Dining Adventure modal state (romantic, family, feast)
  const [isAdventureModalOpen, setIsAdventureModalOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cravematch_user');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const todayStr = new Date().toISOString().split('T')[0];
          if (parsed?.todayAdventure?.date === todayStr) {
            return false;
          }
        } catch {}
      }
    }
    return true;
  });

  // Partner Welcome Banner state
  const [partnerWelcomeBanner, setPartnerWelcomeBanner] = useState<{
    partnerName: string;
    pairCode: string;
  } | null>(null);

  // Auto-detect QR pair code and inviter in URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pairCode = params.get('pair');
      const inviterParam = params.get('inviter') || params.get('partner');

      if (pairCode) {
        pairingSync.setPairCode(pairCode);

        // Update partner info dynamically based on inviter in the link
        setUser((prev) => {
          const updatedPartnerName = inviterParam && inviterParam.trim() ? inviterParam.trim() : prev.partner.name;
          const updated: UserProfile = {
            ...prev,
            partner: {
              ...prev.partner,
              name: updatedPartnerName,
              isConnected: Boolean(updatedPartnerName),
              status: updatedPartnerName ? 'Masa Kuruldu!' : 'Partner Bekleniyor',
              pairCode
            }
          };
          return updated;
        });

        // Check if local user already has a saved name
        const savedUserStr = localStorage.getItem('cravematch_user');
        let mySavedName = '';
        if (savedUserStr) {
          try {
            const parsed = JSON.parse(savedUserStr);
            if (parsed.name) mySavedName = parsed.name;
          } catch {}
        }

        if (mySavedName) {
          pairingSync.setActiveUser(mySavedName);
          pairingSync.broadcast('PARTNER_CONNECTED', mySavedName, {
            name: mySavedName,
            pairCode
          });
          setCurrentTab('swipes');
        } else {
          // If local user has no name yet, prompt them to complete their survey
          setCurrentTab('survey');
        }

        if (inviterParam) {
          setPartnerWelcomeBanner({
            partnerName: inviterParam,
            pairCode
          });
          sound.playSuccess();
          try {
            confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
          } catch {
            // ignore
          }
        }
      }
    }
  }, []);

  const currentTabRef = useRef<ScreenTab>(currentTab);
  useEffect(() => {
    currentTabRef.current = currentTab;
  }, [currentTab]);

  // Auto-dismiss partner welcome banner after 4 seconds
  useEffect(() => {
    if (partnerWelcomeBanner) {
      const timer = setTimeout(() => {
        setPartnerWelcomeBanner(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [partnerWelcomeBanner]);

  // Cleanup pairingSync on component unmount
  useEffect(() => {
    return () => {
      pairingSync.destroy();
    };
  }, []);

  // Fetch initial room state from persistent DB
  useEffect(() => {
    const code = user.partner.pairCode || 'CRAVE-9821';
    fetch(`/api/db/state?code=${encodeURIComponent(code)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((room) => {
        if (!room) return;
        if (Array.isArray(room.messages) && room.messages.length > 0) {
          setMessages(
            room.messages.map((m: any) => ({
              ...m,
              sender: (m.author || m.sender) === user.name ? 'me' : 'partner'
            }))
          );
        }
        if (Array.isArray(room.cart) && room.cart.length > 0) {
          setGroceries(room.cart);
        }
        const partnerProfile = room.users?.[user.partner.name];
        if (partnerProfile) {
          setUser((prev) => ({
            ...prev,
            partner: {
              ...prev.partner,
              avatarUrl: partnerProfile.avatarUrl || prev.partner.avatarUrl,
              isConnected: true,
              status: 'Choosing Together!'
            }
          }));
        }
      })
      .catch(() => {});
  }, [user.name, user.partner.pairCode]);

  // Grocery cart state updater with real-time MQTT broadcast
  const handleUpdateGroceries = (updatedGroceries: GroceryItem[]) => {
    setGroceries(updatedGroceries);
    pairingSync.broadcast('CART_UPDATE', user.name || 'User', updatedGroceries);
  };

  // Handle daily dining adventure selection (Romantic / Family / Grand Feast)
  const handleSelectAdventure = (adventure: DailyAdventure) => {
    setUser((prev) => ({
      ...prev,
      todayAdventure: adventure
    }));
    setIsAdventureModalOpen(false);
    pairingSync.broadcast('ADVENTURE_SELECT', user.name || 'User', adventure);
    sound.playSuccess();
  };

  // Handle adding recipe ingredients to grocery cart automatically with MQTT broadcast
  const handleAddIngredientsToGrocery = (dish: Dish, portions?: number) => {
    const p = portions || user.todayAdventure?.portions || 2;
    const ratio = p / (dish.basePortions || 2);
    setGroceries((prev) => {
      const existingNames = new Set(prev.map((item) => item.name.toLowerCase().trim()));
      const newItems: GroceryItem[] = (dish.ingredients || [])
        .map((ing, idx) => ({
          id: `recipe-item-${Date.now()}-${idx}`,
          name: `${Math.round(ing.amount * ratio * 10) / 10} ${ing.unit} ${ing.name}`,
          fromRecipe: dish.title,
          checked: false,
          addedBy: user.name,
          category: ing.category || 'Pantry'
        }))
        .filter((item) => !existingNames.has(item.name.toLowerCase().trim()));

      if (newItems.length === 0) {
        return prev;
      }
      const combined = [...newItems, ...prev];
      pairingSync.broadcast('CART_UPDATE', user.name || 'User', combined);
      return combined;
    });
    setSelectedRecipeDish(dish);
    sound.playSuccess();
  };

  // Real-time synchronization listener (SSE, cross-device & cross-tab)
  useEffect(() => {
    pairingSync.setPairCode(user.partner.pairCode || 'CRAVE-9821');
    pairingSync.setActiveUser(user.name);

    const unsub = pairingSync.subscribe((payload) => {
      if (payload.type === 'INITIAL_STATE') {
        const room = payload.data as any;
        if (room) {
          if (Array.isArray(room.messages) && room.messages.length > 0) {
            setMessages(
              room.messages.map((m: any) => ({
                ...m,
                sender: (m.author || m.sender) === user.name ? 'me' : 'partner'
              }))
            );
          }
          if (Array.isArray(room.cart) && room.cart.length > 0) {
            setGroceries(room.cart);
          }
        }
      } else if (payload.type === 'PARTNER_CONNECTED') {
        const incomingName = (payload.data as any)?.name || (payload.data as any)?.user || payload.sender;
        if (incomingName && incomingName !== user.name) {
          setUser((prev) => ({
            ...prev,
            partner: {
              ...prev.partner,
              name: incomingName,
              isConnected: true,
              status: 'Choosing Together!'
            }
          }));
          setPartnerWelcomeBanner({
            partnerName: incomingName,
            pairCode: user.partner.pairCode
          });
          sound.playSuccess();
          try {
            confetti({ particleCount: 60, spread: 75, origin: { y: 0.5 } });
          } catch {
            // ignore
          }
        }
      } else if (payload.type === 'CHAT_MESSAGE') {
        const incoming = payload.data as any;
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
            if (currentTabRef.current !== 'chat') {
              setUnreadChatCount((c) => c + 1);
            }
            sound.playNotification();
          }
        }
      } else if (payload.type === 'CART_UPDATE' || payload.type === 'GROCERY_UPDATE') {
        const items = payload.data as any;
        if (Array.isArray(items)) {
          setGroceries(items);
        }
      } else if (payload.type === 'SWIPE_EVENT') {
        const swipeData = payload.data as any;
        if (swipeData && swipeData.dishId) {
          const { dishId, direction } = swipeData;
          if (direction === 'like' || direction === 'super') {
            setDishes((prev) =>
              prev.map((d) => {
                if (d.id === dishId) {
                  const wasUserLiked = d.userLiked;
                  const updated = { ...d, partnerLiked: true };
                  if (wasUserLiked) {
                    sound.playSuccess();
                    try {
                      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
                    } catch {}
                  }
                  return updated;
                }
                return d;
              })
            );
          }
        }
      } else if (payload.type === 'ADVENTURE_SELECT') {
        const incomingAdv = payload.data as DailyAdventure;
        if (incomingAdv) {
          setUser((prev) => ({
            ...prev,
            todayAdventure: incomingAdv
          }));
          setIsAdventureModalOpen(false);
          sound.playSuccess();
        }
      } else if (payload.type === 'DICE_ROLL') {
        const rollData = payload.data as any;
        if (rollData && rollData.winnerDish) {
          setSelectedRecipeDish(rollData.winnerDish);
          handleAddIngredientsToGrocery(rollData.winnerDish, user.todayAdventure?.portions || 2);
        }
      } else if (payload.type === 'DISH_MATCH') {
        const matchData = payload.data as any;
        if (matchData && matchData.dishId) {
          setDishes((prev) =>
            prev.map((d) => (d.id === matchData.dishId ? { ...d, partnerLiked: true } : d))
          );
        }
        sound.playSuccess();
        try {
          confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
        } catch {
          // ignore
        }
      } else if (payload.type === 'COOK_START') {
        const cData = payload.data as any;
        setTodaysMealState((prev) => ({
          ...prev,
          isCooking: true,
          cookingStartedAt: cData?.startedAt || Date.now()
        }));
        sound.playSuccess();
      } else if (payload.type === 'KITCHEN_PHOTO') {
        const photoData = payload.data as any;
        if (photoData?.photoUrl) {
          setTodaysMealState((prev) => ({
            ...prev,
            kitchenPhotoUrl: photoData.photoUrl,
            lastPhotoAuthor: payload.sender
          }));
          const incomingPhotoMsg: ChatMessage = {
            id: `photo-msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            sender: 'partner',
            author: payload.sender || user.partner.name || (lang === 'tr' ? 'Partner' : 'Partner'),
            text: lang === 'tr' ? '📸 Mutfaktan ilk kare! Yemeğimizi hazırlıyoruz 👩‍🍳' : '📸 Fresh from the kitchen! Cooking our meal 👩‍🍳',
            timestamp: new Date().toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            type: 'photo',
            photoUrl: photoData.photoUrl,
            heartsCount: 0,
            rosesCount: 0
          };
          setMessages((prev) => {
            if (prev.some((m) => m.photoUrl === photoData.photoUrl)) return prev;
            return [...prev, incomingPhotoMsg];
          });
          sound.playSuccess();
        }
      } else if (payload.type === 'SEND_REACTION' || payload.type === 'SEND_HEARTS') {
        const rData = payload.data as any;
        const reactionType = rData?.reactionType || 'heart';
        const msgId = rData?.messageId;

        if (reactionType === 'heart') {
          setTodaysMealState((prev) => ({
            ...prev,
            partnerHearts: (prev.partnerHearts || 0) + 1
          }));
        } else {
          setTodaysMealState((prev) => ({
            ...prev,
            partnerRoses: (prev.partnerRoses || 0) + 1
          }));
        }

        if (msgId) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msgId
                ? {
                    ...m,
                    heartsCount: reactionType === 'heart' ? (m.heartsCount || 0) + 1 : m.heartsCount,
                    rosesCount: reactionType === 'rose' ? (m.rosesCount || 0) + 1 : m.rosesCount
                  }
                : m
            )
          );
        }

        sound.playSuccess();
        try {
          confetti({
            particleCount: 50,
            spread: 75,
            origin: { y: 0.5 },
            colors: reactionType === 'heart' ? ['#FF4D6D', '#E05A3D'] : ['#E63946', '#D62828']
          });
        } catch {}
      } else if (payload.type === 'FEAST_COMPLETED') {
        const feast = payload.data as any;
        setTodaysMealState((prev) => ({
          ...prev,
          isFeastCompleted: true
        }));
        if (feast && feast.dishTitle) {
          setUser((prev) => ({
            ...prev,
            feastHistory: [feast, ...(prev.feastHistory || [])]
          }));
        }
        sound.playSuccess();
      } else if (payload.type === 'MEAL_STATE_UPDATE') {
        const updatedState = payload.data as TodaysMealState;
        if (updatedState) {
          setTodaysMealState((prev) => ({
            ...prev,
            ...updatedState
          }));
        }
      } else if (payload.type === 'PROFILE_UPDATE') {
        const profile = payload.data as any;
        const senderName = payload.sender || profile?.name;
        if (senderName && senderName !== user.name) {
          setUser((prev) => ({
            ...prev,
            partner: {
              ...prev.partner,
              name: profile.name || prev.partner.name || senderName,
              avatarUrl: profile.avatarUrl || prev.partner.avatarUrl,
              isConnected: true
            }
          }));
        }
      }
    });

    return unsub;
  }, [user.name, user.partner.pairCode, user.todayAdventure?.portions]);

  // Save changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('cravematch_lang', lang);
        localStorage.setItem('cravematch_user', JSON.stringify(user));
        localStorage.setItem('cravematch_dishes_v4', JSON.stringify(dishes));
        localStorage.setItem('cravematch_todays_meal_v3', JSON.stringify(todaysMealState));
        localStorage.setItem('cravematch_chat_messages_v2', JSON.stringify(messages));
      } catch (err) {
        console.warn('Could not persist state to localStorage', err);
      }
    }
  }, [lang, user, dishes, todaysMealState, messages]);

  // Robust Allergen & Category Filter
  // When user has allergies or dislikes selected, dishes containing matching allergens or ingredients are genuinely HIDDEN!
  const userAllergiesLower = useMemo(() => {
    return (user.allergies || []).map((a) => a.toLowerCase().trim()).filter(Boolean);
  }, [user.allergies]);

  const dishesWithoutAllergens = useMemo(() => {
    if (userAllergiesLower.length === 0) return dishes;

    return dishes.filter((dish) => {
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
  }, [dishes, userAllergiesLower]);

  const hiddenDueToAllergiesCount = dishes.length - dishesWithoutAllergens.length;

  const filteredDishes = useMemo(() => {
    return dishesWithoutAllergens.filter((dish) => {
      if (activeCategory === 'All') return true;
      const catLower = activeCategory.toLowerCase();
      return (
        dish.tags.some((t) => t.toLowerCase() === catLower) ||
        dish.tags.some((t) => t.toLowerCase().includes(catLower)) ||
        dish.title.toLowerCase().includes(catLower)
      );
    });
  }, [dishesWithoutAllergens, activeCategory]);

  // Handle adding custom dish (Pro feature)
  const handleAddCustomDish = (newDish: Dish) => {
    setDishes((prev) => [newDish, ...prev]);
  };

  // Handle importing dishes from CSV
  const handleImportDishesFromCSV = (imported: Dish[]) => {
    setDishes((prev) => [...imported, ...prev]);
  };

  // Handle dish swipe with real-time MQTT broadcasting and mutual match detection
  const handleSwipe = (dish: Dish, direction: 'like' | 'pass' | 'super') => {
    const isLike = direction === 'like' || direction === 'super';

    setDishes((prev) =>
      prev.map((d) => (d.id === dish.id ? { ...d, userLiked: isLike } : d))
    );

    pairingSync.broadcast('SWIPE_EVENT', user.name || 'User', {
      dishId: dish.id,
      dishTitle: dish.title,
      direction,
      timestamp: Date.now()
    });

    if (isLike && dish.partnerLiked) {
      pairingSync.broadcast('DISH_MATCH', user.name || 'User', {
        dishId: dish.id,
        dishTitle: dish.title,
        dish
      });
    }
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
      id: `usr-${Date.now()}`,
      name: '',
      isSurveyCompleted: false,
      allergies: [],
      badges: INITIAL_BADGES,
      partner: {
        id: `partner-${Date.now()}`,
        name: '',
        avatarUrl: INITIAL_USER.partner.avatarUrl,
        status: 'Partner Bekleniyor',
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
      author: user.name || (lang === 'tr' ? 'Ben' : 'Me')
    };
    setMessages((prev) => [...prev, outboundMsg]);
    pairingSync.broadcast('CHAT_MESSAGE', user.name || 'User', outboundMsg);
  };

  // Update meal state helper
  const handleUpdateMealState = (updater: Partial<TodaysMealState>) => {
    setTodaysMealState((prev) => {
      const next = { ...prev, ...updater };
      pairingSync.broadcast('MEAL_STATE_UPDATE', user.name || 'User', next);
      return next;
    });
  };

  // Start cooking handler with broadcast
  const handleStartCooking = () => {
    setTodaysMealState((prev) => ({
      ...prev,
      isCooking: true,
      cookingStartedAt: Date.now()
    }));
    pairingSync.broadcast('COOK_START', user.name || 'User', { startedAt: Date.now() });
    sound.playSuccess();
  };

  // Photo upload and automatic chat sharing
  const handlePhotoUploadAndShareToChat = (photoUrl: string) => {
    setTodaysMealState((prev) => ({
      ...prev,
      kitchenPhotoUrl: photoUrl,
      lastPhotoAuthor: user.name
    }));

    pairingSync.broadcast('KITCHEN_PHOTO', user.name || 'User', {
      photoUrl,
      author: user.name
    });

    const photoMsg: ChatMessage = {
      id: `photo-msg-${Date.now()}`,
      sender: 'me',
      author: user.name || (lang === 'tr' ? 'Ben' : 'Me'),
      text: lang === 'tr' ? '📸 Mutfaktan ilk kare! Yemeğimizi hazırlıyoruz 👩‍🍳' : '📸 Fresh from the kitchen! Cooking our meal 👩‍🍳',
      timestamp: new Date().toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'photo',
      photoUrl,
      heartsCount: 0,
      rosesCount: 0
    };
    handleSendMessage(photoMsg);
    sound.playSuccess();
  };

  // Love / Rose reaction handler
  const handleSendReaction = (type: 'heart' | 'rose', messageId?: string) => {
    sound.playSuccess();
    if (type === 'heart') {
      setTodaysMealState((prev) => ({
        ...prev,
        partnerHearts: (prev.partnerHearts || 0) + 1
      }));
    } else {
      setTodaysMealState((prev) => ({
        ...prev,
        partnerRoses: (prev.partnerRoses || 0) + 1
      }));
    }

    if (messageId) {
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === messageId) {
            return {
              ...m,
              heartsCount: type === 'heart' ? (m.heartsCount || 0) + 1 : m.heartsCount,
              rosesCount: type === 'rose' ? (m.rosesCount || 0) + 1 : m.rosesCount
            };
          }
          return m;
        })
      );
    }

    pairingSync.broadcast('SEND_REACTION', user.name || 'User', {
      reactionType: type,
      messageId
    });

    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: type === 'heart' ? ['#FF4D6D', '#E05A3D', '#FF758F'] : ['#E63946', '#D62828', '#007f5f']
      });
    } catch {}
  };

  // Pair with PIN / Code handler (universal code join for any couple)
  const handlePairWithCode = (code: string, myName: string, partnerName: string) => {
    const cleanCode = code.trim().toUpperCase();
    const cleanName = myName.trim();
    pairingSync.setPairCode(cleanCode);
    pairingSync.setActiveUser(cleanName);

    setUser((prev) => ({
      ...prev,
      name: cleanName || prev.name,
      isSurveyCompleted: true,
      partner: {
        ...prev.partner,
        name: partnerName || prev.partner.name,
        isConnected: Boolean(partnerName || prev.partner.name),
        status: 'Choosing Together!',
        pairCode: cleanCode
      }
    }));

    pairingSync.broadcast('PARTNER_CONNECTED', cleanName, { name: cleanName, pairCode: cleanCode });

    if (partnerName) {
      setPartnerWelcomeBanner({
        partnerName,
        pairCode: cleanCode
      });
    }

    setCurrentTab('swipes');
    sound.playSuccess();
    try {
      confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });
    } catch {
      // ignore
    }
  };

  // Cart total badge
  const uncompletedGroceryCount = groceries.filter((g) => !g.checked).length;
  const t = translations[lang];

  return (
    <DeviceFrame activeTabTitle={currentTab} lang={lang}>
      <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#F7F5F2]">
        {/* Device Status Bar */}
        <div className="bg-[#2B6777] text-white px-3 py-1 flex items-center justify-between text-[10px] font-bold shadow-2xs select-none z-30">
          <div className="flex items-center gap-1.5 truncate">
            <span className={`w-2 h-2 rounded-full shrink-0 ${user.partner.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="truncate">
              👤 <strong>{user.name || t.createProfilePrompt}</strong>
            </span>
            {user.partner.isConnected && user.partner.name ? (
              <span className="text-emerald-200 ml-1 truncate">
                💑 {user.partner.name} {t.atTableWith}
              </span>
            ) : (
              <span className="text-amber-200 ml-1 truncate">({user.partner.pairCode || t.tableCodeLabelShort})</span>
            )}
          </div>
          {user.partner.pairCode && (
            <span className="px-2 py-0.5 rounded-full bg-white/15 text-white/90 text-[9px] font-mono shrink-0 ml-1">
              {user.partner.pairCode}
            </span>
          )}
        </div>

        {/* Partner Connection Welcome Banner */}
        {partnerWelcomeBanner && (
          <div className="absolute top-8 left-3 right-3 z-50 p-2.5 rounded-2xl bg-[#2B6777] text-white shadow-xl flex items-center justify-between border border-emerald-400/50 animate-bounce">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎉</span>
              <div className="text-left">
                <div className="text-xs font-black">
                  {partnerWelcomeBanner.partnerName} {t.pairedSuccessNotification}
                </div>
                <div className="text-[10px] text-emerald-200">
                  {user.name ? `${user.name} • ${t.mysteryChoice}` : t.invitedDesc}
                </div>
              </div>
            </div>
            <button
              onClick={() => setPartnerWelcomeBanner(null)}
              className="text-white/90 hover:text-white text-[11px] font-bold px-2 py-1 bg-white/20 hover:bg-white/30 rounded-lg cursor-pointer ml-1"
            >
              {t.ok}
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
                  onStart={(enteredName) => {
                    const cleanName = enteredName?.trim() || user.name;
                    if (cleanName) {
                      setUser((prev) => ({ ...prev, name: cleanName }));
                      pairingSync.setActiveUser(cleanName);
                    }
                    setCurrentTab('survey');
                  }}
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
                  onSwipe={handleSwipe}
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
                  onCookRecipe={(dish) => {
                    setSelectedRecipeDish(dish);
                    setTodaysMealState((prev) => ({ ...prev, dish }));
                    handleAddIngredientsToGrocery(dish, user.todayAdventure?.portions || 2);
                    setCurrentTab('todaysMeal');
                  }}
                  onAddToCart={(dish) => {
                    setSelectedRecipeDish(dish);
                    setTodaysMealState((prev) => ({ ...prev, dish }));
                    handleAddIngredientsToGrocery(dish, user.todayAdventure?.portions || 2);
                    setCurrentTab('todaysMeal');
                  }}
                  onNavigateToSwipes={() => setCurrentTab('swipes')}
                />
              </motion.div>
            )}

            {currentTab === 'todaysMeal' && (
              <motion.div
                key="todaysMeal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <TodaysMealScreen
                  user={user}
                  dish={selectedRecipeDish || todaysMealState.dish}
                  groceries={groceries}
                  adventure={user.todayAdventure || todaysMealState.adventure || undefined}
                  mealState={todaysMealState}
                  lang={lang}
                  onUpdateGroceries={handleUpdateGroceries}
                  onUpdateMealState={handleUpdateMealState}
                  onStartCooking={handleStartCooking}
                  onPhotoUploadedAndSharedToChat={handlePhotoUploadAndShareToChat}
                  onSendHeartReaction={() => handleSendReaction('heart')}
                  onNavigateToDice={() => setCurrentTab('dice')}
                  onNavigateToSwipes={() => setCurrentTab('swipes')}
                  onCompleteFeast={(item) => {
                    setUser((prev) => ({
                      ...prev,
                      feastHistory: [item, ...(prev.feastHistory || [])]
                    }));
                  }}
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
                  onSendReaction={handleSendReaction}
                  onNavigateToTab={(tab) => setCurrentTab(tab as ScreenTab)}
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
                  onSelectDishForRecipe={(dish) => {
                    setSelectedRecipeDish(dish);
                    handleAddIngredientsToGrocery(dish, user.todayAdventure?.portions || 2);
                    setCurrentTab('todaysMeal');
                  }}
                  onNavigateToDice={handleNavigateToDice}
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

        {/* Daily Dining Adventure Modal (Romantic / Family / Feast) */}
        <DiningAdventureModal
          isOpen={isAdventureModalOpen && currentTab !== 'onboarding' && currentTab !== 'survey'}
          onSelectAdventure={handleSelectAdventure}
          lang={lang}
        />

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
