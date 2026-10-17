import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { RotateCcw, X, Heart, Star, Bell, ChefHat, Sparkles, Flame, Clock, Lock, Unlock, Settings as SettingsIcon, Filter, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Dish, UserProfile, Language } from '../../types';
import { CraveLogo } from '../CraveLogo';
import { sound } from '../../utils/sound';
import { translations, getLocalizedDish } from '../../utils/i18n';

interface SwipesScreenProps {
  dishes: Dish[];
  user: UserProfile;
  lang: Language;
  activeCategory: string;
  hiddenDueToAllergiesCount?: number;
  onSelectCategory: (cat: string) => void;
  onSelectDishForRecipe: (dish: Dish) => void;
  onNavigateToDice: (dish?: Dish) => void;
  onNavigateToProfile: () => void;
  onOpenSettings: () => void;
}

export const SwipesScreen: React.FC<SwipesScreenProps> = ({
  dishes,
  user,
  lang,
  activeCategory,
  hiddenDueToAllergiesCount = 0,
  onSelectCategory,
  onSelectDishForRecipe,
  onNavigateToDice,
  onNavigateToProfile,
  onOpenSettings
}) => {
  const t = translations[lang];
  const [deck, setDeck] = useState<Dish[]>(dishes);
  const [history, setHistory] = useState<Dish[]>([]);
  const [matchModalDish, setMatchModalDish] = useState<Dish | null>(null);
  const [biteCardId, setBiteCardId] = useState<string | null>(null);
  const [biteEffectPosition, setBiteEffectPosition] = useState<{ x: number; y: number } | null>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Mystery Countdown for Partner Reveal (Dinner decision reveal clock)
  const [partnerLikesUnlocked, setPartnerLikesUnlocked] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(3600 * 2 + 14 * 60 + 20); // 02:14:20

  // Category horizontal scroll ref
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [isDraggingCategory, setIsDraggingCategory] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Category filter synchronizer
  useEffect(() => {
    setDeck(dishes);
    setHistory([]);
  }, [dishes, activeCategory]);

  // Live countdown ticker
  useEffect(() => {
    if (partnerLikesUnlocked) return;
    const interval = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          setPartnerLikesUnlocked(true);
          sound.playSuccess();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [partnerLikesUnlocked]);

  const formatCountdown = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Current top dish
  const currentDish = deck.length > 0 ? deck[0] : null;

  // Motion drag values
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacityLike = useTransform(x, [20, 100], [0, 1]);
  const opacityNope = useTransform(x, [-20, -100], [0, 1]);

  // Mouse drag handlers for category bar
  const handleCategoryMouseDown = (e: React.MouseEvent) => {
    if (!categoryScrollRef.current) return;
    setIsDraggingCategory(true);
    setStartX(e.pageX - categoryScrollRef.current.offsetLeft);
    setScrollLeft(categoryScrollRef.current.scrollLeft);
  };

  const handleCategoryMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingCategory || !categoryScrollRef.current) return;
    e.preventDefault();
    const xCoord = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (xCoord - startX) * 1.8;
    categoryScrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleCategoryMouseUp = () => {
    setIsDraggingCategory(false);
  };

  const triggerMatchCelebration = (dish: Dish) => {
    // 1. Play realistic crunchy card bite sound ("hırt!") and show visual bite animation
    sound.playCrunchBite();
    setBiteCardId(dish.id);
    setBiteEffectPosition({ x: 260, y: 40 });

    // 2. Short delay for bite effect before showing the celebratory match modal
    setTimeout(() => {
      sound.playSuccess();
      setMatchModalDish(dish);
      setBiteCardId(null);
      setBiteEffectPosition(null);
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E05A3D', '#2B6777', '#F2A900', '#FFD166']
        });
      } catch {
        // fallback
      }
    }, 550);
  };

  const handleSwipe = (direction: 'like' | 'pass' | 'super') => {
    if (!currentDish) return;

    if (direction === 'like' || direction === 'super') {
      // Crunchy bite sound on like!
      sound.playCrunchBite();
      setBiteCardId(currentDish.id);
      setBiteEffectPosition({ x: 270, y: 50 });

      // Check mutual match
      const isMutual = currentDish.partnerLiked;

      setTimeout(() => {
        if (isMutual) {
          triggerMatchCelebration(currentDish);
        } else {
          setBiteCardId(null);
          setBiteEffectPosition(null);
        }
      }, 350);
    } else {
      sound.playSwipe('pass');
    }

    setHistory((prev) => [currentDish, ...prev]);
    setDeck((prev) => prev.slice(1));
    x.set(0);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    sound.playTap();
    const last = history[0];
    setHistory((prev) => prev.slice(1));
    setDeck((prev) => [last, ...prev]);
  };

  const resetDeck = () => {
    sound.playTap();
    setDeck(dishes);
    setHistory([]);
  };

  const categories = [
    { id: 'All', label: t.catAll },
    { id: 'Spicy', label: t.catSpicy },
    { id: 'Vegetarian', label: t.catVegetarian },
    { id: 'Sweet', label: t.catSweet },
    { id: 'Fast Food', label: t.catFastFood },
    { id: 'Healthy', label: t.catHealthy },
    { id: 'Seafood', label: t.catSeafood },
    { id: 'Italian', label: t.catItalian }
  ];

  return (
    <div className="relative w-full h-full flex-1 flex flex-col justify-between bg-[#F7F5F2] px-3 sm:px-4 pt-2 pb-1 select-none overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between pb-1 px-1">
        <button
          onClick={() => {
            sound.playTap();
            onNavigateToProfile();
          }}
          className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#2B6777] shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          title="Profil"
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </button>

        <CraveLogo size="sm" layout="horizontal" />

        <div className="flex items-center gap-1.5">
          {/* Settings / Pro Menu button */}
          <button
            onClick={() => {
              sound.playTap();
              onOpenSettings();
            }}
            className="w-9 h-9 rounded-full bg-white/90 border border-stone-200/80 shadow-xs flex items-center justify-center text-[#2B6777] hover:bg-white active:scale-95 transition-all cursor-pointer"
            title="Ayarlar & Yemek Ekle"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playTap();
                setNotificationOpen(!notificationOpen);
              }}
              className="w-9 h-9 rounded-full bg-white/90 border border-stone-200/80 shadow-xs flex items-center justify-center text-[#2B6777] hover:bg-white active:scale-95 transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#E05A3D] ring-2 ring-white" />
            </button>

            {/* Notification dropdown */}
            <AnimatePresence>
              {notificationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-11 z-50 w-64 p-3 bg-white rounded-2xl shadow-xl border border-stone-200 text-xs"
                >
                  <div className="font-bold text-[#2B6777] pb-1 flex items-center gap-1.5 border-b border-stone-100">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{user.partner.name || (lang === 'tr' ? 'Partner' : 'Partner')} {lang === 'tr' ? 'ile Senkronizasyon' : lang === 'de' ? 'Synchronisation' : 'Sync'}</span>
                  </div>
                  <div className="pt-2 text-stone-700 leading-snug space-y-1">
                    <p className="font-semibold text-stone-900">
                      {user.partner.name} {lang === 'tr' ? 'akşam yemeği için tercihlerini kilitledi!' : lang === 'de' ? 'hat die Essensauswahl gesperrt!' : 'locked in dinner picks!'}
                    </p>
                    <p className="text-[#E05A3D] font-medium text-[11px]">
                      {lang === 'tr' ? 'Karşılıklı beğeni geri sayım bitince açıklanır.' : lang === 'de' ? 'Matches werden nach Ablauf des Timers enthüllt.' : 'Mutual likes revealed when timer ends.'}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[10px] text-stone-400">
                      <span>{formatCountdown(countdownSeconds)}</span>
                      <button
                        onClick={() => {
                          sound.playSuccess();
                          setPartnerLikesUnlocked(true);
                          setNotificationOpen(false);
                        }}
                        className="text-[#2B6777] underline font-bold cursor-pointer"
                      >
                        {t.unlockNow}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Mystery Partner Reveal Countdown Banner */}
      <div className="w-full max-w-[340px] mx-auto mb-1 flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/90 border border-stone-200 shadow-2xs text-[11px]">
        <div className="flex items-center gap-1.5 truncate">
          {partnerLikesUnlocked ? (
            <Unlock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          ) : (
            <Lock className="w-3.5 h-3.5 text-amber-600 animate-pulse shrink-0" />
          )}
          <span className="font-bold text-[#1A3B44] truncate">
            {partnerLikesUnlocked
              ? `${user.partner.name} ${lang === 'tr' ? 'Tercihleri Açık!' : lang === 'de' ? 'Vorlieben offen!' : 'Picks Unlocked!'}`
              : t.partnerHiddenNotice}
          </span>
        </div>

        {!partnerLikesUnlocked ? (
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-mono font-bold text-[#E05A3D]">
              {formatCountdown(countdownSeconds)}
            </span>
            <button
              onClick={() => {
                sound.playSuccess();
                setPartnerLikesUnlocked(true);
              }}
              className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#2B6777]/10 text-[#2B6777] font-bold hover:bg-[#2B6777]/20 cursor-pointer"
              title="Test: Saat dolmuş gibi sonuçları aç"
            >
              {t.unlockNow}
            </button>
          </div>
        ) : (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
            {t.matchesActive}
          </span>
        )}
      </div>

      {/* Allergen filtering notification banner if items hidden */}
      {hiddenDueToAllergiesCount > 0 && (
        <div className="w-full max-w-[340px] mx-auto mb-1 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-[10px] text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>{hiddenDueToAllergiesCount} {t.allergenFilteredNotice}</span>
          </div>
          <span className="font-bold text-amber-700">{t.filterToggleActive}</span>
        </div>
      )}

      {/* Horizontal Draggable & Scrollable Category Filter Pills */}
      <div className="w-full max-w-[340px] mx-auto py-1 relative">
        <div
          ref={categoryScrollRef}
          onMouseDown={handleCategoryMouseDown}
          onMouseMove={handleCategoryMouseMove}
          onMouseUp={handleCategoryMouseUp}
          onMouseLeave={handleCategoryMouseUp}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing touch-pan-x select-none py-0.5"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playTap();
                  onSelectCategory(cat.id);
                }}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2B6777] text-white shadow-xs scale-105'
                    : 'bg-white/90 text-[#2B6777] border border-stone-200/80 hover:bg-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Central Swipe Card Deck */}
      <div className="relative flex-1 flex items-center justify-center py-1 min-h-[360px]">
        {currentDish ? (
          <div className="relative w-full max-w-[340px] h-[390px]">
            {/* Background stack shadow card */}
            {deck.length > 1 && (
              <div className="absolute inset-0 top-3 scale-[0.95] rounded-3xl overflow-hidden shadow-md bg-stone-300 opacity-60 pointer-events-none">
                <img
                  src={deck[1].image}
                  alt={deck[1].title}
                  className="w-full h-full object-cover filter blur-[1px]"
                />
              </div>
            )}

            {/* Top Swiping Card */}
            <motion.div
              style={{ x, rotate }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100) {
                  handleSwipe('like');
                } else if (info.offset.x < -100) {
                  handleSwipe('pass');
                }
              }}
              whileTap={{ cursor: 'grabbing' }}
              className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-black cursor-grab select-none border-2 border-white/60 transition-transform ${
                biteCardId === currentDish.id ? 'scale-98' : ''
              }`}
            >
              {/* Food Image */}
              <img
                src={currentDish.image}
                alt={currentDish.title}
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* REALISTIC BITE EFFECT ("ISIRILMA EFEKTİ & HIRTT!") - Top Right Edge with Scalloped Bite Teeth & Crumbs */}
              {biteCardId === currentDish.id && (
                <div className="absolute top-0 right-0 z-40 pointer-events-none">
                  {/* Scalloped teeth bite cutout */}
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                  >
                    <path
                      d="M120 0 L120 70 C105 68, 95 78, 88 72 C80 65, 76 50, 68 48 C58 45, 52 35, 54 24 C56 12, 68 4, 75 0 Z"
                      fill="#F7F5F2"
                    />
                    {/* Inner tooth indentation lines */}
                    <path
                      d="M120 70 C105 68, 95 78, 88 72 C80 65, 76 50, 68 48 C58 45, 52 35, 54 24 C56 12, 68 4, 75 0"
                      stroke="#E05A3D"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="85" cy="40" r="3" fill="#E05A3D" />
                    <circle cx="68" cy="22" r="2.5" fill="#F2A900" />
                    <circle cx="98" cy="55" r="2" fill="#E05A3D" />
                    <circle cx="60" cy="45" r="2" fill="#2B6777" />
                  </svg>
                  {/* Floating crunch crumbs */}
                  <div className="absolute top-12 right-12 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <div className="absolute top-6 right-20 w-1.5 h-1.5 rounded-full bg-[#E05A3D] animate-bounce" />
                </div>
              )}

              {/* Scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Swipe stamps */}
              <motion.div
                style={{ opacity: opacityLike }}
                className="absolute top-6 left-6 px-4 py-1 rounded-xl border-4 border-emerald-400 bg-emerald-500/30 text-emerald-300 font-extrabold text-2xl rotate-[-16deg] pointer-events-none"
              >
                {t.like} ❤️
              </motion.div>

              <motion.div
                style={{ opacity: opacityNope }}
                className="absolute top-6 right-6 px-4 py-1 rounded-xl border-4 border-[#E05A3D] bg-[#E05A3D]/30 text-[#E05A3D] font-extrabold text-2xl rotate-[16deg] pointer-events-none"
              >
                {t.pass} ✕
              </motion.div>

              {/* Partner Badge Indicator: Secret Lock vs Unlocked Badge */}
              {currentDish.partnerLiked && (
                <div className="absolute top-4 right-4 z-20">
                  {partnerLikesUnlocked ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md text-xs font-bold text-[#2B6777] animate-bounce">
                      <img
                        src={user.partner.avatarUrl}
                        alt={user.partner.name}
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span>{user.partner.name} {t.partnerLikedNotice}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md shadow-md text-[10px] font-bold text-amber-300 border border-amber-400/50">
                      <Lock className="w-3 h-3 text-amber-300" />
                      <span>{user.partner.name} {t.partnerSecretPick}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Card Bottom Details */}
              {(() => {
                const loc = getLocalizedDish(currentDish, lang);
                return (
                  <div className="absolute bottom-0 inset-x-0 p-4 text-white flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E05A3D] text-white">
                        ⭐ {currentDish.rating} ({currentDish.reviewCount})
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-stone-200">
                        <Clock className="w-3.5 h-3.5" />
                        {currentDish.prepTime}
                      </span>
                      <span className="text-[11px] text-amber-300 font-semibold">
                        • {currentDish.difficulty}
                      </span>
                    </div>

                    <h2 className="text-xl font-black tracking-tight leading-tight font-['Outfit',sans-serif]">
                      {loc.title}
                    </h2>

                    <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                      {loc.subtitle || loc.description}
                    </p>

                    {/* Tags and View Recipe */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        {currentDish.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm text-[10px] text-stone-100 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playTap();
                          onSelectDishForRecipe(currentDish);
                        }}
                        className="text-xs font-bold text-amber-300 hover:text-white underline underline-offset-2 cursor-pointer flex items-center gap-1"
                      >
                        {t.viewRecipe}
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        ) : (
          /* Empty Deck State */
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3.5 bg-white/80 rounded-3xl border border-stone-200 max-w-[320px]">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-3xl">
              🍽️
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2B6777]">{t.allExplored}</h3>
              <p className="text-xs text-stone-500 mt-1">
                {t.allExploredDesc}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <button
                onClick={() => {
                  sound.playTap();
                  onNavigateToDice();
                }}
                className="w-full py-2.5 rounded-xl bg-[#E05A3D] text-white font-bold text-xs shadow-md hover:bg-[#cf4e33] active:scale-95 transition-all cursor-pointer"
              >
                {t.decisionDice} 🎲
              </button>
              <button
                onClick={resetDeck}
                className="w-full py-2 rounded-xl border border-[#2B6777] text-[#2B6777] font-semibold text-xs hover:bg-[#2B6777]/5 transition-all cursor-pointer"
              >
                {t.resetDeck}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Swipe Action Buttons: Undo, Pass, Like, Favorite */}
      <div className="flex items-center justify-center gap-5 pt-1 pb-1">
        {/* Undo */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
              history.length === 0
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-[#F2A900] text-white hover:brightness-105 active:scale-90'
            }`}
            title={t.undo}
          >
            <RotateCcw className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-[10px] font-semibold text-stone-500">{t.undo}</span>
        </div>

        {/* Pass */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => handleSwipe('pass')}
            disabled={!currentDish}
            className="w-14 h-14 rounded-full bg-[#8E9B97] text-white flex items-center justify-center shadow-lg hover:brightness-105 active:scale-90 transition-all cursor-pointer disabled:opacity-50"
            title={t.pass}
          >
            <X className="w-7 h-7 stroke-[2.8]" />
          </button>
          <span className="text-[10px] font-semibold text-stone-500">{t.pass}</span>
        </div>

        {/* Like (Triggers Hırt Crunch Bite!) */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => handleSwipe('like')}
            disabled={!currentDish}
            className="w-15 h-15 rounded-full bg-[#E05A3D] text-white flex items-center justify-center shadow-xl shadow-[#E05A3D]/30 hover:brightness-105 active:scale-90 transition-all cursor-pointer disabled:opacity-50"
            title={t.like}
          >
            <Heart className="w-7 h-7 fill-white stroke-none" />
          </button>
          <span className="text-[10px] font-bold text-[#E05A3D]">{t.like}</span>
        </div>

        {/* Favorite */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => handleSwipe('super')}
            disabled={!currentDish}
            className="w-11 h-11 rounded-full bg-[#3B82F6] text-white flex items-center justify-center shadow-md hover:brightness-105 active:scale-90 transition-all cursor-pointer disabled:opacity-50"
            title={t.favorite}
          >
            <Star className="w-5 h-5 fill-white stroke-none" />
          </button>
          <span className="text-[10px] font-semibold text-stone-500">{t.favorite}</span>
        </div>
      </div>

      {/* MATCH CELEBRATION MODAL */}
      <AnimatePresence>
        {matchModalDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              className="relative w-full max-w-[340px] bg-[#F7F5F2] rounded-3xl p-5 shadow-2xl border-4 border-[#E05A3D] text-center overflow-hidden"
            >
              {/* Flame icon */}
              <div className="w-14 h-14 rounded-full bg-[#E05A3D]/15 text-[#E05A3D] mx-auto flex items-center justify-center mb-1">
                <Flame className="w-8 h-8 fill-[#E05A3D] animate-bounce" />
              </div>

              <h3 className="text-xl font-black text-[#2B6777] font-['Outfit',sans-serif]">
                {t.itsAMatch}
              </h3>
              <p className="text-[11px] font-bold text-[#E05A3D] uppercase tracking-wider mt-0.5">
                {t.mutualCrave}
              </p>

              {/* Both Partner Avatars Connected */}
              <div className="flex items-center justify-center gap-3 my-2.5">
                <div className="relative">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-13 h-13 rounded-full object-cover border-3 border-[#E05A3D] shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 text-xs">👩‍🍳</span>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="w-8 h-8 rounded-full bg-[#E05A3D] text-white flex items-center justify-center shadow-md"
                >
                  <Heart className="w-4 h-4 fill-white stroke-none" />
                </motion.div>

                <div className="relative">
                  <img
                    src={user.partner.avatarUrl}
                    alt={user.partner.name}
                    className="w-13 h-13 rounded-full object-cover border-3 border-[#2B6777] shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 text-xs">👨‍🍳</span>
                </div>
              </div>

              {/* Matched Dish Preview Card with Bite Detail */}
              {(() => {
                const locMatch = getLocalizedDish(matchModalDish, lang);
                return (
                  <div className="bg-white rounded-2xl p-2.5 shadow-inner flex items-center gap-3 text-left mb-3 border border-stone-200 relative overflow-hidden">
                    <img
                      src={matchModalDish.image}
                      alt={locMatch.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-[#1A3B44] truncate">
                        {locMatch.title}
                      </h4>
                      <p className="text-[10px] text-stone-500">
                        {matchModalDish.prepTime} • {matchModalDish.difficulty}
                      </p>
                      <span className="inline-block mt-0.5 text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full">
                        100% {t.mutualCrave} 🍽️
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    sound.playTap();
                    const d = matchModalDish;
                    setMatchModalDish(null);
                    onNavigateToDice(d);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#E05A3D] text-white font-bold text-xs shadow-md hover:bg-[#cf4e33] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{t.addToDice}</span>
                  <span>🎲</span>
                </button>

                <button
                  onClick={() => {
                    sound.playTap();
                    const d = matchModalDish;
                    setMatchModalDish(null);
                    onSelectDishForRecipe(d);
                  }}
                  className="w-full py-2.5 rounded-xl border border-[#2B6777] text-[#2B6777] font-bold text-xs hover:bg-[#2B6777]/5 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>{t.cookTogetherNow}</span>
                </button>

                <button
                  onClick={() => setMatchModalDish(null)}
                  className="text-xs text-stone-400 hover:text-stone-600 font-medium pt-1 cursor-pointer"
                >
                  {t.keepSwiping}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
