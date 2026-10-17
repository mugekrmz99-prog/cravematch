import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Users, Flame, Check } from 'lucide-react';
import { DiningAdventureType, DailyAdventure, Language } from '../types';
import { sound } from '../utils/sound';

interface DiningAdventureModalProps {
  isOpen: boolean;
  onSelectAdventure: (adventure: DailyAdventure) => void;
  lang?: Language;
}

export const DiningAdventureModal: React.FC<DiningAdventureModalProps> = ({
  isOpen,
  onSelectAdventure,
  lang = 'tr'
}) => {
  const [selectedType, setSelectedType] = useState<DiningAdventureType>('romantic_couple');

  if (!isOpen) return null;

  const options: Array<{
    type: DiningAdventureType;
    icon: string;
    badge?: string;
    title: string;
    subtitle: string;
    portions: number;
    accentColor: string;
    borderColor: string;
  }> = [
    {
      type: 'romantic_couple',
      icon: '🍷',
      badge: lang === 'tr' ? 'Romantik' : 'Romantic',
      title: lang === 'tr' ? '2 Kişilik Romantik Akşam Yemeği' : 'Romantic Dinner for 2',
      subtitle: lang === 'tr' ? 'Baş başa, mum ışığında lezzetli ve tatlı bir akşam.' : 'Candlelight dinner for two with intimate ambiance.',
      portions: 2,
      accentColor: 'from-rose-500/20 to-amber-500/20',
      borderColor: 'border-[#E05A3D]'
    },
    {
      type: 'family_dinner',
      icon: '👨‍👩‍👧‍👦',
      badge: lang === 'tr' ? 'Sıcacık' : 'Cozy',
      title: lang === 'tr' ? '4 Kişilik Aile Yemeği' : 'Family Dinner for 4',
      subtitle: lang === 'tr' ? 'Sıcacık tencere ve bereketli geleneksel ev yemekleri.' : 'Comforting home-cooked traditional family pots.',
      portions: 4,
      accentColor: 'from-teal-500/20 to-emerald-500/20',
      borderColor: 'border-[#2B6777]'
    },
    {
      type: 'grand_feast',
      icon: '🎉',
      badge: lang === 'tr' ? 'Ziyafet' : 'Feast',
      title: lang === 'tr' ? '5-6 Kişilik Büyük Ziyafet' : 'Grand Feast for 5-6',
      subtitle: lang === 'tr' ? 'Mezeli, kebaplı, fırın yemekli ve tatlılı görkemli sofra.' : 'Mezes, kebabs, oven specials, and desserts galore.',
      portions: 6,
      accentColor: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-[#F2A900]'
    }
  ];

  const handleConfirm = () => {
    sound.playSuccess();
    const opt = options.find((o) => o.type === selectedType) || options[0];
    const todayStr = new Date().toISOString().split('T')[0];
    const newAdventure: DailyAdventure = {
      date: todayStr,
      type: opt.type,
      portions: opt.portions,
      status: 'deciding',
      completedIngredientsCount: 0,
      totalIngredientsCount: 0
    };
    onSelectAdventure(newAdventure);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-[360px] bg-[#F7F5F2] rounded-3xl p-5 shadow-2xl border-2 border-stone-200 flex flex-col text-stone-900"
        >
          {/* Header */}
          <div className="text-center mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-2xl mb-2 shadow-xs">
              ✨
            </div>
            <h3 className="text-lg font-black text-[#2B6777] font-['Outfit',sans-serif] leading-tight">
              {lang === 'tr'
                ? 'Bugün Seni Nasıl Bir Yemek Serüveni Bekliyor?'
                : 'What Dining Adventure Awaits You Tonight?'}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {lang === 'tr'
                ? 'Seçtiğin serüvene göre malzeme porsiyonları ve ziyafet hazırlanacak:'
                : 'Menu portions and dinner atmosphere will be tailored to your choice:'}
            </p>
          </div>

          {/* Adventure Options */}
          <div className="space-y-2.5 mb-4">
            {options.map((opt) => {
              const isSelected = selectedType === opt.type;
              return (
                <div
                  key={opt.type}
                  onClick={() => {
                    sound.playTap();
                    setSelectedType(opt.type);
                  }}
                  className={`relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? `bg-white ${opt.borderColor} shadow-md scale-[1.02]`
                      : 'bg-white/70 border-stone-200/90 hover:bg-white'
                  }`}
                >
                  <div className="text-3xl shrink-0">{opt.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="font-extrabold text-xs text-[#1A3B44] truncate">
                        {opt.title}
                      </h4>
                      {opt.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-600 shrink-0">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-stone-500 line-clamp-2 leading-tight">
                      {opt.subtitle}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-[#2B6777] bg-[#2B6777] text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full py-3 rounded-2xl bg-[#E05A3D] hover:bg-[#cf4e33] active:scale-95 text-white font-extrabold text-xs shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'tr' ? 'Serüveni Başlat' : 'Start Adventure'}</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
