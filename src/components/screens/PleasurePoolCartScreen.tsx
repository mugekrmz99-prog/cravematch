import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Trash2, Share2, Plus, ShoppingCart, Dices, ChevronRight, Sparkles } from 'lucide-react';
import { GroceryItem, UserProfile, Dish, Language } from '../../types';
import { CraveLogo } from '../CraveLogo';
import { sound } from '../../utils/sound';
import { translations } from '../../utils/i18n';

interface PleasurePoolCartScreenProps {
  user: UserProfile;
  groceries: GroceryItem[];
  selectedDish?: Dish | null;
  lang?: Language;
  onUpdateGroceries: (groceries: GroceryItem[]) => void;
  onNavigateToDice?: () => void;
  onNavigateToRecipe?: (dish: Dish) => void;
}

export const PleasurePoolCartScreen: React.FC<PleasurePoolCartScreenProps> = ({
  user,
  groceries,
  selectedDish,
  lang = 'tr',
  onUpdateGroceries,
  onNavigateToDice,
  onNavigateToRecipe
}) => {
  const t = translations[lang];
  const [newGroceryText, setNewGroceryText] = useState('');
  const [portions, setPortions] = useState(2);

  // Toggle grocery checked
  const toggleGrocery = (id: string) => {
    sound.playTap();
    const updated = groceries.map((g) =>
      g.id === id ? { ...g, checked: !g.checked } : g
    );
    onUpdateGroceries(updated);
  };

  // Add custom grocery item
  const handleAddGrocery = () => {
    if (!newGroceryText.trim()) return;
    sound.playTap();
    const item: GroceryItem = {
      id: `g-${Date.now()}`,
      name: newGroceryText.trim(),
      checked: false,
      addedBy: user.name,
      category: 'Pantry'
    };
    onUpdateGroceries([item, ...groceries]);
    setNewGroceryText('');
  };

  // Delete grocery item
  const handleDeleteGrocery = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playTap();
    onUpdateGroceries(groceries.filter((g) => g.id !== id));
  };

  // Share shopping list on WhatsApp
  const handleShareListWhatsApp = () => {
    sound.playTap();
    const uncompleted = groceries.filter((g) => !g.checked);
    const completed = groceries.filter((g) => g.checked);

    let text = `🛒 *CraveMatch Akşam Yemeği Alışveriş Listesi*\n`;
    if (selectedDish) {
      text += `🍽️ Seçilen Yemek: *${selectedDish.title}* (${portions} kişilik)\n\n`;
    }
    text += `*Alınacaklar (${uncompleted.length}):*\n`;
    uncompleted.forEach((item) => {
      text += `▫️ ${item.name}\n`;
    });

    if (completed.length > 0) {
      text += `\n*Evde Olanlar / Alınanlar:*\n`;
      completed.forEach((item) => {
        text += `✅ ${item.name}\n`;
      });
    }

    text += `\nSevgiler, ${user.name} ❤️`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const completedCount = groceries.filter((g) => g.checked).length;
  const remainingCount = groceries.filter((g) => !g.checked).length;

  return (
    <div className="relative w-full h-full flex-1 flex flex-col justify-between bg-[#F7F5F2] px-4 pt-3 pb-2 select-none overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <div className="flex flex-col items-center gap-1.5 pb-2">
        <CraveLogo size="sm" layout="horizontal" />

        {/* Couple Cart Status Header */}
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-stone-200 shadow-xs text-xs font-bold text-[#2B6777]">
          <div className="flex items-center gap-1">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-5 h-5 rounded-full object-cover border border-[#E05A3D]"
            />
            <span>{user.name}</span>
          </div>

          <div className="flex items-center text-[#E05A3D]">
            <ShoppingCart className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center gap-1">
            <img
              src={user.partner.avatarUrl}
              alt={user.partner.name}
              className="w-5 h-5 rounded-full object-cover border border-[#2B6777]"
            />
            <span>{user.partner.name}</span>
          </div>
        </div>
      </div>

      {/* TOP SECTION: ACTIVE CHOSEN RECIPE BANNER */}
      {selectedDish ? (
        <div className="w-full max-w-[340px] mx-auto bg-[#2B6777] rounded-3xl p-3.5 text-white shadow-lg relative overflow-hidden border-2 border-[#377A8C]">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/15">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Dices className="w-4 h-4" />
              <span>{lang === 'tr' ? 'Zarla Belirlenen Menü' : 'Dice Winner Menu'}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 font-extrabold text-[10px]">
              {portions} {lang === 'tr' ? 'Kişilik' : 'Servings'}
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2.5">
            <img
              src={selectedDish.image}
              alt={selectedDish.title}
              className="w-14 h-14 rounded-2xl object-cover border border-white/30 shadow-md shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-sm text-white truncate">
                {selectedDish.title}
              </h4>
              <p className="text-[11px] text-stone-200 line-clamp-1 mt-0.5">
                {selectedDish.subtitle || selectedDish.description}
              </p>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-amber-200">
                <span>⏱️ {selectedDish.prepTime}</span>
                <span>• {selectedDish.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Portion Stepper */}
          <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-stone-200">
              Porsiyonu Ayarla:
            </span>
            <div className="flex items-center gap-1.5">
              {[2, 4, 6].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    sound.playTap();
                    setPortions(p);
                  }}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    portions === p
                      ? 'bg-amber-400 text-slate-900 shadow-xs'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* If no dish chosen yet, show prompt to roll dice */
        <div className="w-full max-w-[340px] mx-auto bg-white rounded-3xl p-4 border border-stone-200 shadow-xs text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-xl">
            🎲
          </div>
          <h4 className="font-extrabold text-[#2B6777] text-sm">
            {lang === 'tr' ? 'Henüz Bir Yemek Belirlenmedi' : 'No Dish Chosen Yet'}
          </h4>
          <p className="text-xs text-stone-500 leading-snug">
            {t.cartEmptyNotice}
          </p>
          {onNavigateToDice && (
            <button
              onClick={() => {
                sound.playTap();
                onNavigateToDice();
              }}
              className="py-2 px-4 rounded-xl bg-[#E05A3D] text-white font-bold text-xs shadow-xs hover:bg-[#cf4e33] active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{t.decisionDice}</span>
              <span>🎲</span>
            </button>
          )}
        </div>
      )}

      {/* LOWER SECTION: CLEAN GROCERY CHECKLIST */}
      <div className="w-full max-w-[340px] mx-auto flex-1 mt-3 flex flex-col">
        <div className="flex items-center justify-between pb-1.5 px-1">
          <div>
            <h3 className="text-sm font-extrabold text-[#2B6777] uppercase font-['Outfit',sans-serif]">
              {t.groceryList}
            </h3>
            <p className="text-[10px] text-stone-500 font-semibold">
              {remainingCount} {t.itemsRemaining} ({completedCount} tamamlandı)
            </p>
          </div>

          <button
            onClick={handleShareListWhatsApp}
            className="px-2.5 py-1 rounded-xl bg-[#25D366] text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs hover:bg-[#20ba59] active:scale-95 transition-all cursor-pointer"
            title="Listeyi WhatsApp ile Gönder"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Grocery items list */}
        <div className="space-y-1.5 max-h-[260px] overflow-y-auto no-scrollbar pr-0.5">
          {groceries.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleGrocery(item.id)}
              className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all cursor-pointer ${
                item.checked
                  ? 'bg-stone-100/70 border-stone-200 text-stone-400'
                  : 'bg-white border-stone-200 text-[#1A3B44] shadow-2xs hover:border-[#2B6777]/50'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    item.checked
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-stone-300 bg-white'
                  }`}
                >
                  {item.checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="truncate">
                  <span
                    className={`font-semibold text-xs ${
                      item.checked ? 'line-through text-stone-400' : 'text-[#1A3B44]'
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.fromRecipe && (
                    <span className="text-[10px] text-stone-400 ml-1.5">
                      ({item.fromRecipe})
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => handleDeleteGrocery(item.id, e)}
                className="text-stone-300 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                title="Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {groceries.length === 0 && (
            <div className="p-6 text-center text-xs text-stone-400 bg-white/70 rounded-2xl border border-stone-200">
              Sepetinizde henüz ürün bulunmuyor.
            </div>
          )}
        </div>

        {/* Add custom item input row */}
        <div className="mt-2 flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-2xs">
          <input
            type="text"
            value={newGroceryText}
            onChange={(e) => setNewGroceryText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddGrocery()}
            placeholder={t.addItemPlaceholder}
            className="flex-1 text-xs px-2.5 py-1 text-[#1A3B44] placeholder-stone-400 focus:outline-none"
          />
          <button
            onClick={handleAddGrocery}
            className="px-3 py-1.5 rounded-xl bg-[#2B6777] text-white text-xs font-bold hover:bg-[#235866] active:scale-95 transition-all cursor-pointer"
          >
            {t.addBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
