import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Bookmark, Clock, Star, Play, Pause, RotateCcw, Check, Sparkles, ChefHat } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Dish, CookingStep, UserProfile, Language } from '../../types';
import { sound } from '../../utils/sound';
import { translations } from '../../utils/i18n';

interface CoCookingScreenProps {
  dish: Dish;
  user: UserProfile;
  lang?: Language;
  onBack: () => void;
  onAddIngredientsToGrocery: (dish: Dish, portions: number) => void;
}

export const CoCookingScreen: React.FC<CoCookingScreenProps> = ({
  dish,
  user,
  lang = 'tr',
  onBack,
  onAddIngredientsToGrocery
}) => {
  const t = translations[lang];
  const [portions, setPortions] = useState<number>(dish.basePortions || 2);
  const [isTaskSharing, setIsTaskSharing] = useState<boolean>(true);
  const [bookmarked, setBookmarked] = useState<boolean>(true);
  const [steps, setSteps] = useState<CookingStep[]>(dish.steps);
  const [activeTimerStepId, setActiveTimerStepId] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showIngredientsModal, setShowIngredientsModal] = useState<boolean>(false);

  // Sync state when dish prop changes
  useEffect(() => {
    setSteps(dish.steps);
    setPortions(dish.basePortions || 2);
  }, [dish.id]);

  // Timer tick
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            sound.playSuccess();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const toggleStepCompleted = (stepId: number) => {
    sound.playTap();
    setSteps((prev) => {
      const updated = prev.map((s) =>
        s.id === stepId ? { ...s, completed: !s.completed } : s
      );
      // Check if all steps done
      const allDone = updated.every((s) => s.completed);
      if (allDone) {
        sound.playSuccess();
        try {
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#E05A3D', '#2B6777', '#F2A900', '#10B981']
          });
        } catch {
          // fallback
        }
      }
      return updated;
    });
  };

  const startTimerForStep = (step: CookingStep) => {
    sound.playTap();
    const duration = (step.durationMins || 5) * 60;
    setActiveTimerStepId(step.id);
    setTimerSeconds(duration);
    setIsTimerRunning(true);
  };

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  // Portion multiplier
  const portionRatio = portions / (dish.basePortions || 2);

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between bg-[#F7F5F2] select-none overflow-y-auto no-scrollbar">
      {/* Top Hero Image with Navigation Overlay */}
      <div className="relative w-full h-64 shrink-0 overflow-hidden bg-black">
        <img
          src={dish.image}
          alt={dish.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F5F2] via-transparent to-black/40" />

        {/* Floating Top Nav Bar */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          <button
            onClick={() => {
              sound.playTap();
              onBack();
            }}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-[#2B6777] hover:bg-white active:scale-90 transition-all cursor-pointer"
            title="Back to Swipes"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={() => {
              sound.playTap();
              setBookmarked(!bookmarked);
            }}
            className={`w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center transition-all cursor-pointer ${
              bookmarked ? 'text-[#E05A3D]' : 'text-stone-500 hover:text-[#E05A3D]'
            }`}
            title="Save Recipe"
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-[#E05A3D]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="relative -mt-6 px-4 pb-6 flex-1 flex flex-col z-10">
        {/* Title and Ratings */}
        <div className="text-center pt-2 pb-3">
          <h1 className="text-2xl font-black text-[#2B6777] tracking-tight leading-tight font-['Outfit',sans-serif]">
            {dish.title}
          </h1>

          <div className="flex items-center justify-center gap-3 text-xs font-semibold text-stone-600 mt-1">
            <span className="flex items-center gap-1 text-[#1A3B44]">
              <Clock className="w-3.5 h-3.5 text-[#2B6777]" />
              {dish.prepTime}
            </span>
            <span>•</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              🥗 {dish.difficulty}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
              {dish.rating} ({dish.reviewCount})
            </span>
          </div>
        </div>

        {/* Portions Stepper */}
        <div className="flex items-center justify-center pb-4">
          <div className="inline-flex items-center gap-4 px-4 py-1.5 rounded-full border-2 border-[#2B6777] bg-white shadow-xs">
            <span className="text-xs font-extrabold text-[#2B6777]">{t.portions}:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.playTap();
                  if (portions > 1) setPortions(portions - 1);
                }}
                className="w-6 h-6 rounded-md bg-[#2B6777]/10 text-[#2B6777] flex items-center justify-center text-sm font-black hover:bg-[#2B6777]/20 active:scale-90 cursor-pointer"
              >
                −
              </button>
              <span className="w-4 text-center font-black text-sm text-[#1A3B44]">
                {portions}
              </span>
              <button
                onClick={() => {
                  sound.playTap();
                  if (portions < 8) setPortions(portions + 1);
                }}
                className="w-6 h-6 rounded-md bg-[#2B6777] text-white flex items-center justify-center text-sm font-black hover:bg-[#235866] active:scale-90 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Cook Together Header & Solo / Task Sharing Toggle */}
        <div className="text-center pt-1 pb-3">
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-lg font-black text-[#2B6777] font-['Outfit',sans-serif]">
              {t.cookTogether}
            </h2>
            <span className="text-base">🍳</span>
          </div>
          <p className="text-xs text-stone-500 font-medium">
            {t.cookTogetherSubtitle}
          </p>

          {/* Toggle pill */}
          <div className="flex items-center justify-center gap-3 mt-2.5">
            <span
              className={`text-xs font-bold transition-colors cursor-pointer ${
                !isTaskSharing ? 'text-[#2B6777]' : 'text-stone-400'
              }`}
              onClick={() => setIsTaskSharing(false)}
            >
              {t.soloChef}
            </span>

            {/* Switch slider */}
            <div
              onClick={() => {
                sound.playTap();
                setIsTaskSharing(!isTaskSharing);
              }}
              className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 relative ${
                isTaskSharing ? 'bg-[#2B6777]' : 'bg-stone-300'
              }`}
            >
              <motion.div
                animate={{ x: isTaskSharing ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 rounded-full bg-white shadow-md"
              />
            </div>

            <span
              className={`text-xs font-bold transition-colors cursor-pointer ${
                isTaskSharing ? 'text-[#2B6777]' : 'text-stone-400'
              }`}
              onClick={() => setIsTaskSharing(true)}
            >
              {t.taskSharing}
            </span>
          </div>
        </div>

        {/* Active Timer Pill if running */}
        <AnimatePresence>
          {isTimerRunning && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-3 p-3 rounded-2xl bg-amber-500 text-slate-900 shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 animate-spin" />
                <span className="text-xs font-bold">Step Timer:</span>
                <span className="font-mono text-base font-black">
                  {Math.floor(timerSeconds / 60)}:
                  {String(timerSeconds % 60).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(false)}
                  className="px-2 py-1 rounded-lg bg-black/20 text-xs font-bold"
                >
                  <Pause className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setTimerSeconds(0);
                    setIsTimerRunning(false);
                  }}
                  className="px-2 py-1 rounded-lg bg-black/20 text-xs font-bold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((step) => {
            const isChef1 = step.chef === 'chef1';
            const isChef2 = step.chef === 'chef2';
            const isBoth = step.chef === 'both';

            return (
              <motion.div
                key={step.id}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggleStepCompleted(step.id)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer relative ${
                  step.completed
                    ? 'bg-stone-50 border-stone-200 opacity-60'
                    : 'bg-white border-stone-200/80 shadow-sm hover:border-[#2B6777]/50'
                }`}
              >
                {/* Header row: Step Title & Checkbox */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3
                      className={`text-sm font-extrabold font-['Outfit',sans-serif] ${
                        step.completed
                          ? 'line-through text-stone-400'
                          : 'text-[#1A3B44]'
                      }`}
                    >
                      Step {step.id}: {step.title}
                    </h3>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        step.completed ? 'text-stone-400' : 'text-stone-600'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Circular step completion checkbox */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      step.completed
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {step.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Bottom Row: Chef Assignment Badge & Step Timer trigger */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                  {isTaskSharing ? (
                    <div className="flex items-center gap-1.5">
                      {isChef1 && (
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#E05A3D] text-white flex items-center gap-1 shadow-2xs">
                          <span>Chef 1</span>
                          <span>👩</span>
                          <span className="font-normal text-[10px] opacity-90">({user.name})</span>
                        </span>
                      )}

                      {isChef2 && (
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#2B6777] text-white flex items-center gap-1 shadow-2xs">
                          <span>Chef 2</span>
                          <span>👨</span>
                          <span className="font-normal text-[10px] opacity-90">({user.partner.name})</span>
                        </span>
                      )}

                      {isBoth && (
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-900 flex items-center gap-1 shadow-2xs">
                          <span>Both Chefs</span>
                          <span>👩‍🍳👨‍🍳</span>
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-[11px] font-semibold text-stone-400">
                      Solo Prep
                    </span>
                  )}

                  {/* Quick Timer button if duration exists */}
                  {step.durationMins && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startTimerForStep(step);
                      }}
                      className="flex items-center gap-1 text-[11px] font-bold text-[#2B6777] hover:text-[#E05A3D] bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-xl cursor-pointer transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{step.durationMins}m Timer</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scaled Ingredients Pill & Grocery Export Button */}
        <div className="mt-4 p-4 rounded-3xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#2B6777]">
              Ingredients ({dish.ingredients.length} items)
            </h4>
            <p className="text-[11px] text-stone-500">
              Scaled for {portions} servings
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                sound.playTap();
                setShowIngredientsModal(true);
              }}
              className="px-3 py-1.5 rounded-xl border border-[#2B6777] text-[#2B6777] text-xs font-bold hover:bg-[#2B6777]/5 cursor-pointer"
            >
              View List
            </button>
            <button
              onClick={() => {
                sound.playTap();
                onAddIngredientsToGrocery(dish, portions);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#2B6777] text-white text-xs font-bold hover:bg-[#235866] cursor-pointer"
            >
              + Send to Cart
            </button>
          </div>
        </div>

        {/* Bottom Recipe Progress Bar */}
        <div className="mt-4 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500 pb-1">
            <span>Progress: {completedCount} / {steps.length} steps</span>
            <span className="text-[#2B6777]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
            <motion.div
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-[#2B6777] rounded-full transition-all"
            />
          </div>
        </div>
      </div>

      {/* Ingredients Modal */}
      <AnimatePresence>
        {showIngredientsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-[340px] bg-white rounded-3xl p-5 shadow-2xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h3 className="font-extrabold text-[#2B6777] text-base">
                    Recipe Ingredients
                  </h3>
                  <p className="text-xs text-stone-400">
                    Portions: {portions} people
                  </p>
                </div>
                <button
                  onClick={() => setShowIngredientsModal(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="py-3 space-y-2 max-h-60 overflow-y-auto no-scrollbar">
                {dish.ingredients.map((ing, idx) => {
                  const scaledAmount = Math.round(ing.amount * portionRatio * 10) / 10;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1.5 px-2 rounded-xl bg-stone-50 text-xs"
                    >
                      <span className="font-semibold text-stone-800">{ing.name}</span>
                      <span className="font-bold text-[#E05A3D]">
                        {scaledAmount} {ing.unit}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  sound.playTap();
                  onAddIngredientsToGrocery(dish, portions);
                  setShowIngredientsModal(false);
                }}
                className="w-full mt-2 py-2.5 rounded-xl bg-[#2B6777] text-white font-bold text-xs hover:bg-[#235866] cursor-pointer"
              >
                Add All Ingredients to Grocery List 🛒
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
