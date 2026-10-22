import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Camera,
  Plus,
  X,
  Sparkles,
  Calendar,
  ChefHat,
  Dices,
  Settings as SettingsIcon,
  ShieldAlert,
  Flame,
  Check,
  Award
} from 'lucide-react';
import { UserProfile, TasteDuel, Dish, Language, FeastHistoryItem } from '../../types';
import { CraveLogo } from '../CraveLogo';
import { sound } from '../../utils/sound';
import { translations } from '../../utils/i18n';
import { pairingSync } from '../../utils/pairingSync';
import { compressImage } from '../../utils/imageCompressor';

interface ProfileScreenProps {
  user: UserProfile;
  duels?: TasteDuel[];
  dishes?: Dish[];
  lang?: Language;
  onUpdateUser: (user: UserProfile) => void;
  onNavigateToSwipes: () => void;
  onNavigateToChat?: () => void;
  onOpenSettings?: () => void;
  onSelectDishForRecipe?: (dish: Dish) => void;
  onNavigateToDice?: (dish?: Dish) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  duels = [],
  dishes = [],
  lang = 'tr',
  onUpdateUser,
  onNavigateToSwipes,
  onNavigateToChat,
  onOpenSettings,
  onSelectDishForRecipe,
  onNavigateToDice
}) => {
  const t = translations[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'favorites' | 'history' | 'allergies'>('favorites');
  const [newAllergy, setNewAllergy] = useState('');
  const [showAddAllergy, setShowAddAllergy] = useState(false);

  // Filter user's liked dishes (favorites)
  const myFavoriteDishes = dishes.filter((d) => d.userLiked);

  // Handle avatar photo change directly from device
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedUrl = await compressImage(file, 400, 0.7);
        sound.playSuccess();
        const updated: UserProfile = {
          ...user,
          avatarUrl: compressedUrl
        };
        onUpdateUser(updated);
        pairingSync.broadcast('PROFILE_UPDATE', user.name, {
          name: user.name,
          avatarUrl: compressedUrl
        });
      } catch (err) {
        console.error('Avatar error:', err);
      }
    }
  };

  const handleAddAllergy = () => {
    if (!newAllergy.trim()) return;
    sound.playTap();
    const updatedAllergies = [...(user.allergies || []), newAllergy.trim()];
    const updated = { ...user, allergies: updatedAllergies };
    onUpdateUser(updated);
    setNewAllergy('');
    setShowAddAllergy(false);
  };

  const handleRemoveAllergy = (allergy: string) => {
    sound.playTap();
    const updatedAllergies = (user.allergies || []).filter((a) => a !== allergy);
    const updated = { ...user, allergies: updatedAllergies };
    onUpdateUser(updated);
  };

  return (
    <div className="relative w-full h-full flex-1 flex flex-col justify-between bg-[#F7F5F2] px-4 pt-3 pb-2 select-none overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-200/80">
        <CraveLogo size="sm" layout="horizontal" />
        <button
          onClick={() => {
            sound.playTap();
            if (onOpenSettings) onOpenSettings();
          }}
          className="w-8 h-8 rounded-full bg-white shadow-2xs border border-stone-200 flex items-center justify-center text-stone-600 hover:text-[#2B6777] cursor-pointer"
          title="Ayarlar"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Identity Card */}
      <div className="my-2 p-4 rounded-3xl bg-white shadow-md border border-stone-200 flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full filter blur-xl pointer-events-none" />

        {/* Clickable Profile Photo */}
        <div className="relative mb-2 cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-[#2B6777] shadow-lg group-hover:opacity-85 transition-all"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#E05A3D] text-white flex items-center justify-center shadow-md border-2 border-white">
            <Camera className="w-3.5 h-3.5" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <h3 className="text-base font-black text-[#1A3B44] font-['Outfit',sans-serif]">
          {user.name || (lang === 'tr' ? 'İsimsiz Gurme' : 'Anonymous Foodie')}
        </h3>

        {/* Dynamic Partner Status: "Müge ile karar aşamasındasınız 💭" */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-[11px] font-bold mt-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {user.partner.isConnected && user.partner.name
              ? `${user.partner.name} ${lang === 'tr' ? 'ile karar aşamasındasınız 💭' : 'decision in progress 💭'}`
              : lang === 'tr' ? 'Partner Bekleniyor...' : 'Waiting for partner...'}
          </span>
        </div>
      </div>

      {/* Sub Tabs: Favorilerim | Ziyafet Geçmişi | Alerjiler */}
      <div className="flex rounded-2xl bg-stone-200/70 p-1 mb-2">
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('favorites');
          }}
          className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'favorites'
              ? 'bg-white text-[#2B6777] shadow-xs'
              : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-[#E05A3D] text-[#E05A3D]" />
          <span>{lang === 'tr' ? 'Favorilerim' : 'Favorites'}</span>
          <span className="text-[10px] opacity-75">({myFavoriteDishes.length})</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('history');
          }}
          className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'history'
              ? 'bg-white text-[#2B6777] shadow-xs'
              : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-[#2B6777]" />
          <span>{lang === 'tr' ? 'Ziyafetler' : 'Feasts'}</span>
          <span className="text-[10px] opacity-75">
            ({(user.feastHistory || []).length})
          </span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('allergies');
          }}
          className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'allergies'
              ? 'bg-white text-[#2B6777] shadow-xs'
              : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>{lang === 'tr' ? 'Alerjiler' : 'Allergies'}</span>
        </button>
      </div>

      {/* Tab 1: Favorites List */}
      {activeTab === 'favorites' && (
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-0.5">
          {myFavoriteDishes.length === 0 ? (
            <div className="p-6 text-center bg-white rounded-3xl border border-stone-200/80 my-2">
              <span className="text-3xl block mb-2">🍽️</span>
              <h4 className="text-xs font-black text-[#2B6777]">
                {lang === 'tr' ? 'Henüz Beğenilen Yemek Yok' : 'No Liked Dishes Yet'}
              </h4>
              <p className="text-[11px] text-stone-400 mt-1 max-w-[220px] mx-auto">
                {lang === 'tr'
                  ? 'Keşfet sekmesinde sağa kaydırdığınız lezzetler burada toplanır!'
                  : 'Dishes you swipe right on will be collected right here!'}
              </p>
              <button
                onClick={() => {
                  sound.playTap();
                  onNavigateToSwipes();
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-[#2B6777] text-white text-xs font-bold hover:bg-[#235866] cursor-pointer"
              >
                {lang === 'tr' ? 'Yemekleri Keşfet →' : 'Explore Dishes →'}
              </button>
            </div>
          ) : (
            myFavoriteDishes.map((dish) => (
              <div
                key={dish.id}
                className="p-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={dish.image}
                    alt={dish.title}
                    className="w-11 h-11 rounded-xl object-cover shrink-0"
                  />
                  <div className="truncate">
                    <h4 className="text-xs font-extrabold text-[#1A3B44] truncate">
                      {dish.title}
                    </h4>
                    <span className="text-[10px] text-stone-400">
                      ⏱️ {dish.prepTime} • ⭐ {dish.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {onNavigateToDice && (
                    <button
                      onClick={() => {
                        sound.playTap();
                        onNavigateToDice(dish);
                      }}
                      className="p-1.5 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      title="Bu Yemeği Zarda Yarıştır"
                    >
                      <Dices className="w-3.5 h-3.5 text-amber-600" />
                      <span className="hidden sm:inline">Zara Ekle</span>
                    </button>
                  )}
                  {onSelectDishForRecipe && (
                    <button
                      onClick={() => {
                        sound.playTap();
                        onSelectDishForRecipe(dish);
                      }}
                      className="p-1.5 rounded-xl bg-[#2B6777]/10 text-[#2B6777] hover:bg-[#2B6777]/20 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <ChefHat className="w-3.5 h-3.5" />
                      <span>Tarif</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Feast History */}
      {activeTab === 'history' && (
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-0.5">
          {(!user.feastHistory || user.feastHistory.length === 0) ? (
            <div className="p-6 text-center bg-white rounded-3xl border border-stone-200/80 my-2">
              <span className="text-3xl block mb-2">🎉</span>
              <h4 className="text-xs font-black text-[#2B6777]">
                {lang === 'tr' ? 'Henüz Ziyafet Tamamlanmadı' : 'No Feasts Completed Yet'}
              </h4>
              <p className="text-[11px] text-stone-400 mt-1 max-w-[220px] mx-auto">
                {lang === 'tr'
                  ? 'Günün yemeğini partnerinle pişirip tamamladığında ziyafet anınız ve aldığın kalpler burada listelenir.'
                  : 'Completed dinners and partner love reactions will be archived here as sweet memories.'}
              </p>
            </div>
          ) : (
            user.feastHistory.map((feast) => (
              <div
                key={feast.id}
                className="p-3 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between gap-3"
              >
                <img
                  src={feast.photoUrl || feast.dishImage}
                  alt={feast.dishTitle}
                  className="w-13 h-13 rounded-xl object-cover shrink-0 shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] text-stone-400 mb-0.5">
                    <span>{feast.date}</span>
                    <span className="font-bold text-[#E05A3D]">
                      {feast.portions} {t.servings}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-[#1A3B44] truncate">
                    {feast.dishTitle}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-rose-600 mt-0.5">
                    <Heart className="w-3 h-3 fill-rose-500" />
                    <span>
                      {feast.hearts} {lang === 'tr' ? 'Partner Sevgisi' : 'Partner Hearts'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Allergies */}
      {activeTab === 'allergies' && (
        <div className="flex-1 overflow-y-auto no-scrollbar pr-0.5 space-y-2">
          <div className="p-3 bg-white rounded-3xl border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-[#1A3B44]">
                {lang === 'tr' ? 'Gizlenen Alerjen & Malzemeler' : 'Hidden Allergens'}
              </span>
              <button
                onClick={() => setShowAddAllergy(true)}
                className="text-[11px] font-bold text-[#2B6777] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{lang === 'tr' ? 'Ekle' : 'Add'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(user.allergies || []).length === 0 ? (
                <span className="text-xs text-stone-400 py-1">
                  {lang === 'tr' ? 'Henüz alerjen eklenmedi.' : 'No allergens added.'}
                </span>
              ) : (
                (user.allergies || []).map((alg) => (
                  <span
                    key={alg}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold"
                  >
                    <span>{alg}</span>
                    <button
                      onClick={() => handleRemoveAllergy(alg)}
                      className="text-rose-500 hover:text-rose-700 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Add Allergy Modal */}
          <AnimatePresence>
            {showAddAllergy && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="w-full max-w-[300px] bg-white rounded-3xl p-4 shadow-xl border border-stone-200">
                  <h4 className="text-xs font-black text-[#2B6777] mb-2">
                    {lang === 'tr' ? 'Yeni Alerjen veya Sevmediğin Malzeme' : 'Add Allergy'}
                  </h4>
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    placeholder={lang === 'tr' ? 'Örn: Patlıcan, Mantar, Fıstık...' : 'e.g. Peanut...'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none mb-3"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleAddAllergy()}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAddAllergy(false)}
                      className="flex-1 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 cursor-pointer"
                    >
                      {t.cancel}
                    </button>
                    <button
                      onClick={handleAddAllergy}
                      className="flex-1 py-1.5 rounded-xl bg-[#2B6777] text-white text-xs font-bold cursor-pointer"
                    >
                      {lang === 'tr' ? 'Kaydet' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
