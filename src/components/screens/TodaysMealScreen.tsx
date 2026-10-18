import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ChefHat,
  ShoppingBag,
  Sparkles,
  Camera,
  Heart,
  Share2,
  Clock,
  Flame,
  ArrowRight,
  Smile,
  Send,
  Dices,
  RefreshCw,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  Dish,
  GroceryItem,
  UserProfile,
  Language,
  DailyAdventure,
  FeastHistoryItem,
  TodaysMealState
} from '../../types';
import { CraveLogo } from '../CraveLogo';
import { sound } from '../../utils/sound';
import { translations } from '../../utils/i18n';
import { pairingSync } from '../../utils/pairingSync';

interface TodaysMealScreenProps {
  user: UserProfile;
  dish: Dish | null;
  groceries: GroceryItem[];
  adventure?: DailyAdventure;
  mealState: TodaysMealState;
  lang?: Language;
  onUpdateGroceries: (groceries: GroceryItem[]) => void;
  onUpdateMealState: (updater: Partial<TodaysMealState>) => void;
  onStartCooking: () => void;
  onPhotoUploadedAndSharedToChat: (photoUrl: string) => void;
  onSendHeartReaction: () => void;
  onNavigateToDice: () => void;
  onNavigateToSwipes: () => void;
  onCompleteFeast: (item: FeastHistoryItem) => void;
}

export const TodaysMealScreen: React.FC<TodaysMealScreenProps> = ({
  user,
  dish,
  groceries,
  adventure,
  mealState,
  lang = 'tr',
  onUpdateGroceries,
  onUpdateMealState,
  onStartCooking,
  onPhotoUploadedAndSharedToChat,
  onSendHeartReaction,
  onNavigateToDice,
  onNavigateToSwipes,
  onCompleteFeast
}) => {
  const t = translations[lang];
  const myName = user.name || (lang === 'tr' ? 'Ben' : 'Me');
  const partnerName = user.partner.name || (lang === 'tr' ? 'Partnerim' : 'Partner');

  const portions = adventure?.portions || dish?.basePortions || 2;
  const isRomantic = portions <= 2;

  // Fully Synchronized & Persistent Cooking State from App props
  const isCooking = mealState.isCooking;
  const cookingSecondsLeft = mealState.cookingSecondsLeft;
  const kitchenPhotoUrl = mealState.kitchenPhotoUrl;
  const partnerHearts = mealState.partnerHearts;
  const partnerRoses = mealState.partnerRoses;
  const isFeastCompleted = mealState.isFeastCompleted;

  // Local celebration modal trigger
  const [showCandleCelebration, setShowCandleCelebration] = useState<boolean>(false);

  // Grocery progress
  const totalItems = groceries.length;
  const completedItems = groceries.filter((g) => g.checked).length;
  const isShoppingComplete = totalItems > 0 && completedItems === totalItems;

  // Calculate overall meal preparation loading bar percentage (0% to 100%)
  const calculateProgress = (): number => {
    if (isFeastCompleted) return 100;
    if (showCandleCelebration) return 100;
    if (isCooking) {
      const totalCookingSecs = (dish?.prepTimeMinutes || 30) * 60;
      const cookingProgress = Math.min(
        50,
        Math.floor(((totalCookingSecs - cookingSecondsLeft) / totalCookingSecs) * 45) + 50
      );
      return Math.min(95, cookingProgress);
    }
    if (totalItems === 0) return 10;
    // Shopping progress accounts for first 50%
    return Math.floor((completedItems / totalItems) * 50);
  };

  const progressPercent = calculateProgress();

  // Cooking countdown timer
  useEffect(() => {
    let interval: any = null;
    if (isCooking && cookingSecondsLeft > 0) {
      interval = setInterval(() => {
        const next = Math.max(0, cookingSecondsLeft - 1);
        onUpdateMealState({ cookingSecondsLeft: next });
        if (next <= 0) {
          clearInterval(interval);
          onUpdateMealState({ isCooking: false });
          triggerCelebration();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCooking, cookingSecondsLeft]);

  const triggerCelebration = () => {
    setShowCandleCelebration(true);
    sound.playSuccess();
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F2A900', '#E05A3D', '#2B6777', '#FFFFFF']
      });
    } catch {}
  };

  const handleStartCooking = () => {
    sound.playTap();
    onStartCooking();
  };

  const handleToggleGrocery = (id: string) => {
    sound.playTap();
    const updated = groceries.map((g) =>
      g.id === id ? { ...g, checked: !g.checked } : g
    );
    onUpdateGroceries(updated);
  };

  const handleSendHeartReaction = () => {
    sound.playTap();
    onSendHeartReaction();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        onPhotoUploadedAndSharedToChat(url);
        triggerCelebration();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinishCelebration = () => {
    setShowCandleCelebration(false);
    onUpdateMealState({ isFeastCompleted: true });
    if (dish) {
      const feastItem: FeastHistoryItem = {
        id: `feast-${Date.now()}`,
        date: new Date().toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        dishId: dish.id,
        dishTitle: dish.title,
        dishImage: dish.image,
        photoUrl: kitchenPhotoUrl || dish.image,
        hearts: (partnerHearts || 0) + (partnerRoses || 0) + 5,
        adventureType: adventure?.type || 'romantic_couple',
        portions
      };
      onCompleteFeast(feastItem);
      pairingSync.broadcast('FEAST_COMPLETED', myName, feastItem);
    }
  };

  // WhatsApp share
  const handleShareListWhatsApp = () => {
    sound.playTap();
    const uncompleted = groceries.filter((g) => !g.checked);
    const completed = groceries.filter((g) => g.checked);

    const titleText =
      lang === 'tr'
        ? 'CraveMatch Akşam Yemeği Alışveriş Listesi'
        : 'CraveMatch Dinner Grocery List';
    const chosenDishText = lang === 'tr' ? 'Seçilen Yemek' : 'Selected Dish';
    const toBuyText = lang === 'tr' ? 'Alınacaklar' : 'To Buy';
    const atHomeText = lang === 'tr' ? 'Alınanlar / Evdekiler' : 'Purchased / At Home';

    let text = `🛒 *${titleText}*\n`;
    if (dish) {
      text += `🍽️ ${chosenDishText}: *${dish.title}* (${portions} ${t.servings})\n\n`;
    }
    text += `*${toBuyText} (${uncompleted.length}):*\n`;
    uncompleted.forEach((item) => {
      text += `▫️ ${item.name}\n`;
    });

    if (completed.length > 0) {
      text += `\n*${atHomeText}:*\n`;
      completed.forEach((item) => {
        text += `✅ ${item.name}\n`;
      });
    }

    text += `\nSevgiler, ${myName} ❤️`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  // Format mm:ss
  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const todayDateFormatted = new Date().toLocaleDateString(
    lang === 'tr' ? 'tr-TR' : 'en-US',
    {
      day: 'numeric',
      month: 'long',
      weekday: 'long'
    }
  );

  return (
    <div className="relative w-full h-full flex-1 flex flex-col justify-between bg-[#F7F5F2] px-4 pt-3 pb-2 select-none overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <div className="flex flex-col items-center gap-1 pb-1">
        <CraveLogo size="sm" layout="horizontal" />
        <span className="text-[11px] font-bold text-stone-500 tracking-tight capitalize">
          📅 {todayDateFormatted}
        </span>
      </div>

      {/* NO MEAL SELECTED YET - INVITATION STATE */}
      {!dish ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mb-3 shadow-md">
            🍲
          </div>
          <h3 className="text-lg font-black text-[#2B6777] font-['Outfit',sans-serif] mb-1">
            {lang === 'tr' ? 'Bugün Ne Yiyeceksiniz?' : 'What Are You Having Tonight?'}
          </h3>
          <p className="text-xs text-stone-500 max-w-[280px] mb-5 leading-relaxed">
            {lang === 'tr'
              ? 'Henüz günün yemeği belirlenmedi. Keşfet sekmesinden ortak beğeni yapabilir veya hemen Karar Zarı atarak yemeğinizi seçebilirsiniz!'
              : 'Tonight’s menu is undecided. Swipe dishes to find a match or roll the decision dice!'}
          </p>

          <div className="flex flex-col w-full max-w-[260px] gap-2.5">
            <button
              onClick={() => {
                sound.playTap();
                onNavigateToDice();
              }}
              className="w-full py-3 rounded-2xl bg-[#E05A3D] text-white font-extrabold text-xs shadow-lg hover:bg-[#cf4e33] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Dices className="w-4 h-4" />
              <span>{lang === 'tr' ? 'Karar Zarı At 🎲' : 'Roll Decision Dice 🎲'}</span>
            </button>

            <button
              onClick={() => {
                sound.playTap();
                onNavigateToSwipes();
              }}
              className="w-full py-2.5 rounded-2xl border-2 border-[#2B6777] text-[#2B6777] font-bold text-xs hover:bg-[#2B6777]/5 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{lang === 'tr' ? 'Yemekleri Keşfet 🍽️' : 'Explore Dishes 🍽️'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* MEAL SELECTED - ACTIVE LIFECYCLE */
        <div className="flex-1 flex flex-col gap-2.5 my-1">
          {/* TODAY'S CHOSEN DISH CARD */}
          <div className="w-full max-w-[340px] mx-auto bg-white rounded-3xl p-3 shadow-md border border-stone-200/90 flex items-center gap-3">
            <img
              src={dish.image}
              alt={dish.title}
              className="w-16 h-16 rounded-2xl object-cover shrink-0 shadow-xs border border-stone-100"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-black uppercase text-[#E05A3D] tracking-wider">
                  👑 {lang === 'tr' ? 'Günün Yemeği' : 'Tonight’s Menu'}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {portions} {t.servings}
                </span>
              </div>
              <h3 className="font-black text-sm text-[#1A3B44] truncate">
                {dish.title}
              </h3>
              <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-0.5">
                <span>⏱️ {dish.prepTime}</span>
                <span>⭐ {dish.rating}</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC PROGRESS LOADING BAR */}
          <div className="w-full max-w-[340px] mx-auto bg-[#2B6777] rounded-2xl p-3 text-white shadow-md">
            <div className="flex items-center justify-between text-xs font-black mb-1.5">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  {isFeastCompleted
                    ? lang === 'tr' ? 'Ziyafet Tamamlandı! ✨' : 'Feast Completed! ✨'
                    : isCooking
                    ? lang === 'tr' ? 'Mutfakta Pişiriliyor... 👩‍🍳' : 'Cooking in Progress... 👩‍🍳'
                    : lang === 'tr' ? 'Yemeğin Hazırlanması' : 'Dinner Preparation'}
                </span>
              </span>
              <span className="font-mono text-amber-300">%{progressPercent}</span>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#E05A3D]"
              />
            </div>

            {/* Stages labels */}
            <div className="flex items-center justify-between text-[9px] font-bold text-stone-200 mt-1.5 px-0.5">
              <span className={completedItems > 0 ? 'text-amber-300' : ''}>
                1. Market Alışverişi
              </span>
              <span className={isCooking ? 'text-amber-300' : ''}>
                2. Yemeği Pişir
              </span>
              <span className={isFeastCompleted ? 'text-amber-300' : ''}>
                3. Afiyet Olsun!
              </span>
            </div>
          </div>

          {/* STAGE 1: SHOPPING CHECKLIST */}
          <div className="w-full max-w-[340px] mx-auto bg-white rounded-3xl p-3 shadow-md border border-stone-200/90 flex flex-col flex-1">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-2">
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-[#2B6777]" />
                <h4 className="font-extrabold text-xs text-[#1A3B44]">
                  {lang === 'tr' ? 'Market Alışverişi' : 'Grocery Checklist'}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-stone-500">
                  {completedItems}/{totalItems} {lang === 'tr' ? 'alındı' : 'done'}
                </span>
                <button
                  onClick={handleShareListWhatsApp}
                  className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                  title="WhatsApp'tan Paylaş"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Items */}
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto no-scrollbar pr-0.5 flex-1">
              {groceries.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleGrocery(item.id)}
                  className={`flex items-center gap-2.5 p-2 rounded-xl transition-all cursor-pointer ${
                    item.checked
                      ? 'bg-stone-50 text-stone-400 line-through'
                      : 'bg-stone-50/80 hover:bg-stone-100 text-[#1A3B44]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      item.checked
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {item.checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-semibold truncate">{item.name}</span>
                </div>
              ))}
            </div>

            {/* COOK BUTTON (Unlocks when shopping done or can be clicked directly) */}
            <div className="pt-2 border-t border-stone-100 mt-2">
              {!isCooking ? (
                <button
                  onClick={handleStartCooking}
                  className={`w-full py-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isShoppingComplete
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse'
                      : 'bg-[#2B6777] hover:bg-[#235866] text-white'
                  }`}
                >
                  <ChefHat className="w-4 h-4" />
                  <span>
                    {isShoppingComplete
                      ? lang === 'tr' ? 'Alışveriş Tamamlandı! Yemeği Pişir 👩‍🍳' : 'Shopping Complete! Cook Now 👩‍🍳'
                      : lang === 'tr' ? 'Yemeği Pişirmeye Başla 👩‍🍳' : 'Start Cooking Recipe 👩‍🍳'}
                  </span>
                </button>
              ) : (
                <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#E05A3D] animate-spin" />
                    <span className="text-xs font-bold font-mono">
                      {formatTimer(cookingSecondsLeft)}
                    </span>
                  </div>

                  <label className="py-1 px-3 rounded-xl bg-[#E05A3D] text-white text-[11px] font-bold shadow-xs hover:bg-[#cf4e33] cursor-pointer flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{lang === 'tr' ? 'Fotoğraf Gönder' : 'Send Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>
              )}

              {/* Photo preview if taken */}
              {kitchenPhotoUrl && (
                <div className="mt-2 relative rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md">
                  <img
                    src={kitchenPhotoUrl}
                    alt="Mutfaktan fotoğraf"
                    className="w-full max-h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1">
                    <span>📸</span>
                    <span>{lang === 'tr' ? 'Mutfaktan Canlı Fotoğraf' : 'Live from Kitchen'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* KITCHEN CHAT & REACTION BAR */}
          <div className="w-full max-w-[340px] mx-auto bg-white/90 rounded-2xl p-2.5 shadow-xs border border-stone-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A3B44] truncate">
              <span>❤️ {lang === 'tr' ? 'Partner Sevgisi:' : 'Partner Love:'}</span>
              <span className="font-mono text-[#E05A3D] font-extrabold flex items-center gap-1.5">
                <span>{partnerHearts} ❤️</span>
                {Number(partnerRoses || 0) > 0 && <span>{partnerRoses} 🌹</span>}
              </span>
            </div>

            <button
              onClick={handleSendHeartReaction}
              className="py-1.5 px-3 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 active:scale-95 transition-all text-xs font-extrabold flex items-center gap-1.5 cursor-pointer border border-rose-200 shadow-2xs"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>{lang === 'tr' ? 'Kalp Gönder' : 'Send Love'}</span>
            </button>
          </div>
        </div>
      )}

      {/* CANDLE ANIMATION & CELEBRATION MODAL */}
      <AnimatePresence>
        {showCandleCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              className="w-full max-w-[340px] bg-[#1A3B44] text-white rounded-3xl p-5 shadow-2xl border-4 border-[#F2A900] text-center relative overflow-hidden"
            >
              {/* Candle light ambient glow */}
              <div className="absolute top-10 inset-x-0 flex justify-center">
                <div className="w-48 h-48 rounded-full bg-amber-400/20 filter blur-2xl pointer-events-none" />
              </div>

              {/* TWO CANDLES ANIMATING FROM LEFT AND RIGHT TO CENTER */}
              <div className="relative h-24 flex items-center justify-center gap-8 my-2 z-10">
                {/* Left candle */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                >
                  <div className="w-2.5 h-4 rounded-full bg-amber-300 animate-pulse shadow-[0_0_15px_#F2A900] mb-0.5" />
                  <div className="w-4 h-14 bg-stone-100 rounded-t-sm rounded-b-md shadow-inner border border-stone-300" />
                </motion.div>

                {/* Romantic Heart in center */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: 0.8, repeat: Infinity, duration: 1.5 }}
                  className="text-2xl"
                >
                  ❤️
                </motion.div>

                {/* Right candle */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                >
                  <div className="w-2.5 h-4 rounded-full bg-amber-300 animate-pulse shadow-[0_0_15px_#F2A900] mb-0.5" />
                  <div className="w-4 h-14 bg-stone-100 rounded-t-sm rounded-b-md shadow-inner border border-stone-300" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="z-10 relative"
              >
                <h3 className="text-2xl font-black text-[#F2A900] font-['Outfit',sans-serif] tracking-wider uppercase mb-1">
                  {lang === 'tr' ? 'Afiyet Olsun!' : 'Bon Appétit!'}
                </h3>

                <p className="text-xs text-stone-200 leading-relaxed mb-4 px-2">
                  {isRomantic
                    ? lang === 'tr'
                      ? 'Tebrikler! İki kişilik romantik akşam yemeğinizi beraber tamamladınız ve CraveMatch ile harika bir sofra kurdunuz. ❤️'
                      : 'Congratulations! You completed your romantic dinner for two and set a wonderful table with CraveMatch. ❤️'
                    : lang === 'tr'
                    ? 'Tebrikler! Sevdiklerinize harika ve unutulmaz bir ziyafet verdiniz, ellerinize sağlık! 🎉'
                    : 'Congratulations! You hosted an unforgettable feast for your loved ones, cheers! 🎉'}
                </p>

                {kitchenPhotoUrl && (
                  <div className="rounded-2xl overflow-hidden h-32 mb-3 shadow-md border border-white/20">
                    <img
                      src={kitchenPhotoUrl}
                      alt="Completed Dinner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <button
                  onClick={handleFinishCelebration}
                  className="w-full py-3 rounded-2xl bg-[#E05A3D] hover:bg-[#cf4e33] active:scale-95 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer uppercase tracking-wider"
                >
                  {lang === 'tr' ? 'Ziyafeti Tamamla & Kaydet ✨' : 'Complete Feast & Save ✨'}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
