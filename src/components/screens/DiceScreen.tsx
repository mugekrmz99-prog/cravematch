import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, Sparkles, ChefHat, ShoppingBag, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Dish, UserProfile, Language } from '../../types';
import { CraveLogo } from '../CraveLogo';
import { ThreeDDice } from '../ThreeDDice';
import { sound } from '../../utils/sound';
import { translations } from '../../utils/i18n';
import { pairingSync } from '../../utils/pairingSync';

interface ContenderItem {
  id: string;
  name: string;
  matchScore: number;
  selected: boolean;
  dishRef?: Dish;
  image: string;
  partners: string[];
}

interface DiceScreenProps {
  user: UserProfile;
  dishes: Dish[];
  lang?: Language;
  initialSelectedDish?: Dish | null;
  onCookRecipe: (dish: Dish) => void;
  onAddToCart: (dish: Dish) => void;
}

export const DiceScreen: React.FC<DiceScreenProps> = ({
  user,
  dishes,
  lang = 'tr',
  initialSelectedDish,
  onCookRecipe,
  onAddToCart
}) => {
  const t = translations[lang];
  const myName = user.name || (lang === 'tr' ? 'Ben' : 'Me');
  const partnerName = user.partner.name || (lang === 'tr' ? 'Partnerim' : 'Partner');

  // Helper to build initial contenders dynamically from authentic dishes
  const buildInitialContenders = (): ContenderItem[] => {
    const list: ContenderItem[] = [];
    const addedIds = new Set<string>();

    if (initialSelectedDish) {
      list.push({
        id: initialSelectedDish.id,
        name: initialSelectedDish.title,
        matchScore: initialSelectedDish.matchScore || 100,
        selected: true,
        dishRef: initialSelectedDish,
        image: initialSelectedDish.image,
        partners: [myName, partnerName]
      });
      addedIds.add(initialSelectedDish.id);
    }

    // 1. Prioritize dishes liked by user or partner
    const likedDishes = (dishes || []).filter(
      (d) => (d.userLiked || d.partnerLiked) && !addedIds.has(d.id)
    );
    for (const d of likedDishes) {
      list.push({
        id: d.id,
        name: d.title,
        matchScore: d.matchScore || (d.userLiked && d.partnerLiked ? 100 : 88),
        selected: true,
        dishRef: d,
        image: d.image,
        partners: [
          ...(d.userLiked ? [myName] : []),
          ...(d.partnerLiked ? [partnerName] : [])
        ]
      });
      addedIds.add(d.id);
      if (list.length >= 6) break;
    }

    // 2. If fewer than 4 contenders, supplement with popular authentic Turkish recipes
    const popularTitles = [
      'Karnıyarık',
      'Kayseri Mantısı',
      'Bursa İskender Kebabı',
      'Süzme Kırmızı Mercimek Çorbası',
      'Gaziantep Baklavası',
      'Hünkar Beğendi'
    ];

    for (const popTitle of popularTitles) {
      if (list.length >= 4) break;
      const found = (dishes || []).find(
        (d) => !addedIds.has(d.id) && d.title.toLowerCase().includes(popTitle.toLowerCase())
      );
      if (found) {
        list.push({
          id: found.id,
          name: found.title,
          matchScore: found.matchScore || 90,
          selected: true,
          dishRef: found,
          image: found.image,
          partners: [myName, partnerName]
        });
        addedIds.add(found.id);
      }
    }

    // 3. Fallback: take first available dishes if still < 4
    for (const d of dishes || []) {
      if (list.length >= 4) break;
      if (!addedIds.has(d.id)) {
        list.push({
          id: d.id,
          name: d.title,
          matchScore: d.matchScore || 85,
          selected: true,
          dishRef: d,
          image: d.image,
          partners: [myName, partnerName]
        });
        addedIds.add(d.id);
      }
    }

    return list;
  };

  const [contenders, setContenders] = useState<ContenderItem[]>(buildInitialContenders);
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState<ContenderItem | null>(null);
  const [cartAdded, setCartAdded] = useState(false);
  const [diceFace, setDiceFace] = useState<number>(5);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDishName, setNewDishName] = useState('');
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  // If initial dish provided and not present, select or prepend it
  useEffect(() => {
    if (initialSelectedDish) {
      setContenders((prev) => {
        const exists = prev.find(
          (c) => c.dishRef?.id === initialSelectedDish.id || c.name === initialSelectedDish.title
        );
        if (exists) {
          return prev.map((c) => (c.id === exists.id ? { ...c, selected: true } : c));
        }
        return [
          {
            id: initialSelectedDish.id,
            name: initialSelectedDish.title,
            matchScore: initialSelectedDish.matchScore || 100,
            selected: true,
            dishRef: initialSelectedDish,
            image: initialSelectedDish.image,
            partners: [myName, partnerName]
          },
          ...prev
        ];
      });
    }
  }, [initialSelectedDish, myName, partnerName]);

  // Synchronize incoming roll events across devices
  useEffect(() => {
    const unsub = pairingSync.subscribe((payload) => {
      if (payload.type === 'DICE_ROLL') {
        const data = payload.data as any;
        if (!data) return;

        setIsRolling(true);
        setWinner(null);
        setCartAdded(false);
        sound.playDiceRoll();

        setTimeout(() => {
          setIsRolling(false);
          const targetFace = data.face || Math.floor(Math.random() * 6) + 1;
          setDiceFace(targetFace);

          // Find winner dish in contenders or global dishes
          const foundInContenders = contenders.find(
            (c) => c.id === data.winnerId || c.name === data.winnerName
          );
          const foundDish =
            data.winnerDish ||
            dishes.find((d) => d.id === data.winnerId || d.title === data.winnerName);

          const winnerItem: ContenderItem = foundInContenders || {
            id: data.winnerId || `dish-${Date.now()}`,
            name: data.winnerName || foundDish?.title || 'Seçilen Yemek',
            matchScore: 100,
            selected: true,
            dishRef: foundDish,
            image:
              foundDish?.image ||
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
            partners: [myName, partnerName]
          };

          setWinner(winnerItem);
          sound.playSuccess();

          if (winnerItem.dishRef) {
            onAddToCart(winnerItem.dishRef);
            setCartAdded(true);
          }

          try {
            confetti({
              particleCount: 75,
              spread: 80,
              origin: { y: 0.4 },
              colors: ['#F2A900', '#E05A3D', '#2B6777', '#FFFFFF']
            });
          } catch {
            // fallback
          }
        }, 1250);
      }
    });

    return unsub;
  }, [contenders, dishes, myName, partnerName, onAddToCart]);

  const handleToggleSelect = (id: string) => {
    sound.playTap();
    setContenders((prev) =>
      prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  const handleRoll = () => {
    const active = contenders.filter((c) => c.selected);
    if (active.length === 0) {
      setWarningMessage(t.chooseAtLeastOneDish);
      setTimeout(() => setWarningMessage(null), 2500);
      return;
    }

    setIsRolling(true);
    setWinner(null);
    setCartAdded(false);
    sound.playDiceRoll();

    // Pick random winner from active contenders
    const picked = active[Math.floor(Math.random() * active.length)];
    const randomFace = Math.floor(Math.random() * 6) + 1;
    setDiceFace(randomFace);

    // Broadcast DICE_ROLL event to partner's phone in real-time
    pairingSync.broadcast('DICE_ROLL', user.name || 'User', {
      winnerId: picked.id,
      winnerName: picked.name,
      winnerDish: picked.dishRef,
      face: randomFace
    });

    setTimeout(() => {
      setIsRolling(false);
      setWinner(picked);
      sound.playSuccess();

      // Automatically add winner ingredients to cart as requested by user
      if (picked.dishRef) {
        onAddToCart(picked.dishRef);
        setCartAdded(true);
      }

      try {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.4 },
          colors: ['#F2A900', '#E05A3D', '#2B6777', '#FFFFFF']
        });
      } catch {
        // fallback
      }
    }, 1250);
  };

  const handleAddCustomContender = () => {
    if (!newDishName.trim()) return;
    sound.playTap();
    const newContender: ContenderItem = {
      id: `custom-${Date.now()}`,
      name: newDishName.trim(),
      matchScore: 100,
      selected: true,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
      partners: [myName, partnerName]
    };
    setContenders((prev) => [newContender, ...prev]);
    setNewDishName('');
    setShowAddModal(false);
  };

  return (
    <div className="relative w-full h-full flex-1 flex flex-col justify-between bg-[#F7F5F2] px-4 pt-3 pb-2 select-none overflow-y-auto no-scrollbar">
      {/* Top Header with CraveMatch Logo & Couple Sync Indicator */}
      <div className="flex flex-col items-center gap-1.5 pb-2">
        <CraveLogo size="sm" layout="horizontal" />

        {/* Couple avatars & sync indicator */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-stone-200 shadow-xs">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-5 h-5 rounded-full object-cover border-2 border-[#E05A3D]"
              />
            </div>
            <div className="text-[#E05A3D] text-xs font-bold animate-pulse">
              ❤️
            </div>
            <div className="relative">
              <img
                src={user.partner.avatarUrl}
                alt={user.partner.name}
                className="w-5 h-5 rounded-full object-cover border-2 border-[#2B6777]"
              />
            </div>
          </div>
          <span className="text-[10px] font-bold text-stone-500 tracking-tight">
            Choosing Together!
          </span>
        </div>
      </div>

      {/* Warning toast banner */}
      <AnimatePresence>
        {warningMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-[340px] mx-auto mb-1 p-2 bg-rose-100 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{warningMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main 3D Decision Dice Card */}
      <div className="w-full max-w-[340px] mx-auto bg-[#2B6777] rounded-3xl p-4 text-white shadow-xl relative overflow-hidden flex flex-col items-center my-1 border-2 border-[#377A8C]">
        {/* Glow corners */}
        <div className="absolute top-2 left-2 w-8 h-8 rounded-tl-2xl border-t-2 border-l-2 border-emerald-300/40 pointer-events-none" />
        <div className="absolute top-2 right-2 w-8 h-8 rounded-tr-2xl border-t-2 border-r-2 border-emerald-300/40 pointer-events-none" />

        <div className="text-center mb-1 z-10">
          <h2 className="text-lg font-black tracking-wider text-[#F2A900] uppercase font-['Outfit',sans-serif]">
            {t.decisionDice}
          </h2>
          <p className="text-[11px] text-stone-200 font-medium">
            {t.rollToSettle}
          </p>
        </div>

        {/* 3D Dice Component */}
        <div className="my-2 py-1 z-10 cursor-pointer" onClick={!isRolling ? handleRoll : undefined}>
          <ThreeDDice
            size={84}
            isRolling={isRolling}
            targetFace={diceFace}
            showTrails={true}
          />
        </div>

        {/* TAP TO ROLL BUTTON */}
        <button
          onClick={handleRoll}
          disabled={isRolling}
          className="mt-1 w-full max-w-[210px] py-2.5 px-5 rounded-2xl bg-[#E05A3D] hover:bg-[#cf4e33] active:scale-95 text-white font-extrabold text-xs shadow-lg shadow-black/25 transition-all flex items-center justify-center gap-2 cursor-pointer z-10 disabled:opacity-75 uppercase tracking-wide"
        >
          <span>{isRolling ? t.rolling : t.tapToRoll}</span>
          <span>🎲</span>
        </button>
      </div>

      {/* TONIGHT'S CONTENDERS LIST */}
      <div className="w-full max-w-[340px] mx-auto flex-1 mt-2.5 flex flex-col">
        <div className="flex items-center justify-between pb-1.5 px-1">
          <h3 className="text-sm font-extrabold text-[#2B6777] tracking-tight uppercase font-['Outfit',sans-serif]">
            {t.tonightContenders}
          </h3>
          <span className="text-[11px] font-semibold text-stone-500">
            {contenders.filter(c => c.selected).length} {t.inPool}
          </span>
        </div>

        {/* Contender Rows */}
        <div className="space-y-1.5 max-h-[220px] overflow-y-auto no-scrollbar pr-0.5">
          {contenders.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleSelect(item.id)}
              className={`flex items-center justify-between p-2 rounded-2xl border transition-all cursor-pointer ${
                item.selected
                  ? 'bg-white border-[#2B6777]/30 shadow-xs'
                  : 'bg-white/50 border-stone-200 opacity-60'
              }`}
            >
              {/* Checkbox and Food preview */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    item.selected
                      ? 'border-[#2B6777] bg-[#2B6777] text-white'
                      : 'border-stone-300 bg-white'
                  }`}
                >
                  {item.selected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-9 h-9 rounded-xl object-cover shrink-0"
                />

                <div className="truncate">
                  <h4 className="font-bold text-xs text-[#1A3B44] truncate">
                    {item.name}
                  </h4>
                  {item.dishRef && (
                    <span className="text-[10px] text-stone-400">
                      ⏱️ {item.dishRef.prepTime}
                    </span>
                  )}
                </div>
              </div>

              {/* Match tag & avatars */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex -space-x-1.5 items-center">
                  {(item.partners.includes(myName) || item.partners.length >= 1) && (
                    <img
                      src={user.avatarUrl}
                      alt={myName}
                      className="w-5 h-5 rounded-full object-cover border border-white"
                      title={myName}
                    />
                  )}
                  {(item.partners.includes(partnerName) || item.partners.length >= 2) && (
                    <img
                      src={user.partner.avatarUrl}
                      alt={partnerName}
                      className="w-5 h-5 rounded-full object-cover border border-white"
                      title={partnerName}
                    />
                  )}
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.matchScore >= 90
                      ? 'bg-[#2B6777] text-white'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  %{item.matchScore}
                </span>
              </div>
            </div>
          ))}

          {/* Add Contender Button */}
          <button
            onClick={() => {
              sound.playTap();
              setShowAddModal(true);
            }}
            className="w-full py-2 px-3 rounded-2xl border-2 border-dashed border-[#2B6777]/40 text-[#2B6777] hover:bg-[#2B6777]/5 transition-all text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addContender}</span>
          </button>
        </div>
      </div>

      {/* Winner Modal Announcement */}
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="w-full max-w-[340px] bg-[#F7F5F2] rounded-3xl p-5 shadow-2xl border-4 border-[#F2A900] text-center"
            >
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-3xl mb-1 animate-bounce">
                👑
              </div>

              <span className="text-[11px] font-black text-[#E05A3D] uppercase tracking-wider">
                {t.diceDecided}
              </span>

              <h3 className="text-xl font-black text-[#2B6777] font-['Outfit',sans-serif] mt-0.5 mb-2">
                {winner.name}
              </h3>

              <div className="rounded-2xl overflow-hidden shadow-md mb-3 border border-stone-200 h-32">
                <img
                  src={winner.image}
                  alt={winner.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Automatic Cart Notice */}
              <div className="mb-3 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>{t.ingredientsAutoAdded}</span>
              </div>

              <div className="space-y-2">
                {winner.dishRef && (
                  <button
                    onClick={() => {
                      sound.playTap();
                      const d = winner.dishRef!;
                      setWinner(null);
                      onCookRecipe(d);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#E05A3D] text-white font-bold text-xs shadow-md hover:bg-[#cf4e33] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ChefHat className="w-4 h-4" />
                    <span>{t.cookThisRecipe}</span>
                  </button>
                )}

                {winner.dishRef && (
                  <button
                    onClick={() => {
                      if (!cartAdded) {
                        sound.playTap();
                        onAddToCart(winner.dishRef!);
                        setCartAdded(true);
                      }
                      setWinner(null);
                    }}
                    className={`w-full py-2 rounded-xl text-white font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      cartAdded ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#2B6777] hover:bg-[#235866]'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{cartAdded ? t.ingredientsInCart : t.sendIngredientsToCart}</span>
                  </button>
                )}

                <button
                  onClick={() => setWinner(null)}
                  className="text-xs text-stone-500 hover:text-stone-700 font-semibold pt-1 cursor-pointer"
                >
                  {t.rollAgain}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Contender Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <div className="w-full max-w-[320px] bg-white rounded-3xl p-5 shadow-2xl border border-stone-200">
              <h4 className="font-bold text-[#2B6777] text-base mb-1">
                {t.addContender}
              </h4>
              <p className="text-xs text-stone-500 mb-3">
                {t.cravingInputPrompt}
              </p>
              <input
                type="text"
                value={newDishName}
                onChange={(e) => setNewDishName(e.target.value)}
                placeholder={t.cravingInputPlaceholder}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#2B6777] mb-3"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustomContender()}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleAddCustomContender}
                  className="flex-1 py-2 rounded-xl bg-[#2B6777] text-white text-xs font-bold hover:bg-[#235866] cursor-pointer"
                >
                  {t.addToRoll}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
