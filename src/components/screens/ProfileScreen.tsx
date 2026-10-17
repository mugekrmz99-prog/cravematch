import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  X,
  Award,
  Flame,
  Heart,
  Sparkles,
  Check,
  ChevronRight,
  Lock,
  CheckCircle2,
  MessageCircle,
  ShieldAlert,
  FileSpreadsheet,
  Settings as SettingsIcon,
  User,
  Clock,
  Sparkle,
  Download,
  Code2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, TasteDuel, BadgeItem, Language, Dish } from '../../types';
import { CraveLogo } from '../CraveLogo';
import { sound } from '../../utils/sound';
import { translations, getLocalizedBadge } from '../../utils/i18n';

interface ProfileScreenProps {
  user: UserProfile;
  duels: TasteDuel[];
  dishes?: Dish[];
  lang?: Language;
  onUpdateUser: (user: UserProfile) => void;
  onNavigateToSwipes: () => void;
  onNavigateToChat?: () => void;
  onOpenSettings?: () => void;
  onOpenDatabaseManager?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  duels,
  dishes = [],
  lang = 'tr',
  onUpdateUser,
  onNavigateToSwipes,
  onNavigateToChat,
  onOpenSettings,
  onOpenDatabaseManager
}) => {
  const t = translations[lang];
  // Toggle between viewing Own Profile or Partner's Profile
  const [profileView, setProfileView] = useState<'me' | 'partner'>('me');
  const [currentDuelIndex, setCurrentDuelIndex] = useState(0);
  const [localDuels, setLocalDuels] = useState<TasteDuel[]>(duels);
  const [newAllergy, setNewAllergy] = useState('');
  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [selectedBadgeModal, setSelectedBadgeModal] = useState<BadgeItem | null>(null);
  const [showAllBadgesModal, setShowAllBadgesModal] = useState(false);
  const [showGitGuideModal, setShowGitGuideModal] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  const handleDownloadZip = () => {
    sound.playSuccess();
    setDownloadSuccessToast(true);
    setTimeout(() => setDownloadSuccessToast(false), 4000);
    const link = document.createElement('a');
    link.href = '/crave-couples-app.zip';
    link.download = 'crave-couples-app.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Partner Mock Data
  const partnerAllergies = ['Kabuklu Deniz Ürünü', 'Mantar'];
  const partnerFavoriteDishes = dishes.slice(0, 3);

  const activeDuel = localDuels[currentDuelIndex] || localDuels[0];

  const handleVote = (option: 'A' | 'B') => {
    sound.playTap();
    setLocalDuels((prev) =>
      prev.map((d, idx) => {
        if (idx !== currentDuelIndex) return d;
        if (d.userVote === option) return d;

        const newA = option === 'A' ? Math.min(99, d.optionA.votesPercent + 2) : Math.max(1, d.optionA.votesPercent - 2);
        const newB = 100 - newA;

        return {
          ...d,
          userVote: option,
          optionA: { ...d.optionA, votesPercent: newA },
          optionB: { ...d.optionB, votesPercent: newB }
        };
      })
    );

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E05A3D', '#2B6777', '#F2A900']
      });
    } catch {
      // fallback
    }
  };

  const handleNextDuel = () => {
    sound.playTap();
    setCurrentDuelIndex((prev) => (prev + 1) % localDuels.length);
  };

  const removeAllergy = (allergy: string) => {
    sound.playTap();
    const updated = user.allergies.filter((a) => a !== allergy);
    onUpdateUser({ ...user, allergies: updated });
  };

  const addAllergy = () => {
    if (!newAllergy.trim()) return;
    sound.playTap();
    if (!user.allergies.includes(newAllergy.trim())) {
      onUpdateUser({
        ...user,
        allergies: [...user.allergies, newAllergy.trim()]
      });
    }
    setNewAllergy('');
    setShowAddAllergy(false);
  };

  const unlockedBadges = user.badges.filter((b) => b.unlocked);

  return (
    <div className="relative w-full h-full flex-1 flex flex-col justify-between bg-[#F7F5F2] px-4 pt-3 pb-2 select-none overflow-y-auto no-scrollbar">
      {/* Top Header Logo with Settings Shortcut */}
      <div className="flex items-center justify-between pb-2 px-1">
        <div className="w-8" />
        <CraveLogo size="sm" layout="horizontal" />
        <div className="flex items-center gap-1.5">
          {onOpenSettings && (
            <button
              onClick={() => {
                sound.playTap();
                onOpenSettings();
              }}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 text-[#2B6777] flex items-center justify-center hover:bg-stone-50 cursor-pointer shadow-2xs"
              title="Ayarlar & Menü Yöneticisi"
            >
              <SettingsIcon className="w-4 h-4 text-[#2B6777]" />
            </button>
          )}
        </div>
      </div>

      {/* Segmented Persona Switcher: [ Benim Profilim ] / [ Partnerimin Profili ] */}
      <div className="w-full max-w-[340px] mx-auto mb-2.5">
        <div className="flex items-center bg-stone-200/80 p-1 rounded-2xl text-xs font-bold text-stone-600 shadow-inner">
          <button
            onClick={() => {
              sound.playTap();
              setProfileView('me');
            }}
            className={`flex-1 py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              profileView === 'me'
                ? 'bg-white text-[#2B6777] shadow-xs'
                : 'hover:text-stone-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{lang === 'tr' ? `Benim Profilim (${user.name})` : lang === 'de' ? `Mein Profil (${user.name})` : `My Profile (${user.name})`}</span>
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setProfileView('partner');
            }}
            className={`flex-1 py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              profileView === 'partner'
                ? 'bg-[#E05A3D] text-white shadow-xs'
                : 'hover:text-stone-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{lang === 'tr' ? `Partnerim (${user.partner.name})` : lang === 'de' ? `Mein Partner (${user.partner.name})` : `Partner (${user.partner.name})`}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: MY PROFILE */}
      {profileView === 'me' && (
        <div className="space-y-3">
          {/* User Identity Card */}
          <div className="w-full max-w-[340px] mx-auto flex items-center gap-3.5 bg-white p-3.5 rounded-3xl border border-stone-200 shadow-2xs">
            {/* Avatar with Master Chef Badge below */}
            <div className="relative flex flex-col items-center shrink-0">
              <div className="w-18 h-18 rounded-full overflow-hidden border-3 border-[#2B6777] shadow-md bg-stone-200">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-[#E05A3D] text-white text-[9px] font-bold shadow-xs flex items-center gap-1 whitespace-nowrap">
                <span>👨‍🍳</span>
                <span>{t.masterChef}</span>
              </div>
            </div>

            {/* User Stats & Title */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[10px] text-stone-500 font-semibold">
                <span>{user.matchesCount} {lang === 'tr' ? 'eşleşme' : lang === 'de' ? 'Matches' : 'matches'}</span>
                <span>•</span>
                <span>{user.badgesCount} {lang === 'tr' ? 'madalya' : lang === 'de' ? 'Medaillen' : 'badges'}</span>
              </div>
              <h2 className="text-xl font-black text-[#2B6777] tracking-tight font-['Outfit',sans-serif] mt-0.5 truncate">
                {user.name}
              </h2>
              <p className="text-xs font-bold text-stone-600 mt-0.5">
                {user.title} • {lang === 'tr' ? 'Seviye' : 'Level'} {user.level}
              </p>

              <button
                onClick={() => {
                  sound.playTap();
                  setProfileView('partner');
                }}
                className="flex items-center gap-1 text-[11px] font-bold text-[#E05A3D] mt-1 hover:underline cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-[#E05A3D]" />
                <span>Partner: {user.partner.name} ({lang === 'tr' ? 'Görüntüle' : lang === 'de' ? 'Ansehen' : 'View'})</span>
              </button>
            </div>
          </div>

          {/* BADGES & MEDALS SECTION */}
          <div className="w-full max-w-[340px] mx-auto">
            <div className="flex items-center justify-between pb-1.5 px-1">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-extrabold text-[#2B6777] font-['Outfit',sans-serif]">
                  {t.badgesAndAchievements}
                </h3>
              </div>
              <button
                onClick={() => {
                  sound.playTap();
                  setShowAllBadgesModal(true);
                }}
                className="text-[11px] font-bold text-[#E05A3D] hover:underline cursor-pointer"
              >
                {t.seeAll} ({unlockedBadges.length}/{user.badges.length})
              </button>
            </div>

            {/* Horizontal Scrollable Medals Row */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {user.badges.map((badge) => {
                const locB = getLocalizedBadge(badge, lang);
                return (
                  <button
                    key={badge.id}
                    onClick={() => {
                      sound.playTap();
                      setSelectedBadgeModal(badge);
                    }}
                    className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center min-w-[85px] max-w-[95px] transition-all cursor-pointer shadow-2xs relative ${
                      badge.unlocked
                        ? 'bg-gradient-to-b from-amber-50 to-orange-50/50 border-amber-300 text-amber-950'
                        : 'bg-stone-100 border-stone-200 text-stone-400 opacity-75'
                    }`}
                  >
                    <span className="text-2xl mb-1">{badge.icon}</span>
                    <span className="text-[10px] font-black leading-tight text-center truncate max-w-full">
                      {locB.title}
                    </span>
                    {badge.unlocked ? (
                      <span className="text-[9px] font-bold text-emerald-700 mt-1">{t.unlockedTag}</span>
                    ) : (
                      <span className="text-[8px] font-bold text-stone-500 mt-1 flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" />
                        <span>{badge.progress}/{badge.maxProgress}</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE ALLERGENS FILTER */}
          <div className="w-full max-w-[340px] mx-auto bg-white p-3.5 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-[#E05A3D]" />
                <h4 className="text-xs font-bold text-[#2B6777]">
                  {t.myAllergensTitle}
                </h4>
              </div>
              <button
                onClick={() => setShowAddAllergy(!showAddAllergy)}
                className="text-[11px] font-bold text-[#2B6777] hover:underline cursor-pointer"
              >
                + {t.addBtn}
              </button>
            </div>

            {showAddAllergy && (
              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addAllergy()}
                  placeholder={t.addCustomAllergyPlaceholder}
                  className="flex-1 px-2.5 py-1.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#2B6777]"
                />
                <button
                  onClick={addAllergy}
                  className="px-3 py-1.5 bg-[#2B6777] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  {t.addBtn}
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-1">
              {user.allergies.length === 0 ? (
                <span className="text-xs text-stone-400 italic">{t.noAllergensYet}</span>
              ) : (
                user.allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="px-2.5 py-1 rounded-xl bg-orange-50 border border-orange-200 text-[#E05A3D] text-[11px] font-bold flex items-center gap-1 shadow-2xs"
                  >
                    <span>{allergy}</span>
                    <button
                      onClick={() => removeAllergy(allergy)}
                      className="text-stone-400 hover:text-rose-600 ml-0.5 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: PARTNER PROFILE & CHAT CTA */}
      {profileView === 'partner' && (
        <div className="space-y-3">
          {/* Partner Identity Card */}
          <div className="w-full max-w-[340px] mx-auto flex items-center gap-3.5 bg-gradient-to-br from-white to-orange-50/40 p-3.5 rounded-3xl border-2 border-[#E05A3D]/30 shadow-2xs">
            <div className="relative flex flex-col items-center shrink-0">
              <div className="w-18 h-18 rounded-full overflow-hidden border-3 border-[#E05A3D] shadow-md bg-stone-200">
                <img
                  src={user.partner.avatarUrl}
                  alt={user.partner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-1 px-2 py-0.2 rounded-full bg-emerald-500 text-white text-[9px] font-black shadow-xs flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>{t.online || (lang === 'tr' ? 'Çevrimiçi' : 'Online')}</span>
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-xl font-black text-[#2B6777] tracking-tight font-['Outfit',sans-serif] truncate">
                  {user.partner.name}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold shrink-0">
                  {lang === 'tr' ? 'Eşin ❤️' : 'Partner ❤️'}
                </span>
              </div>
              <p className="text-xs font-semibold text-stone-600 mt-0.5">
                {user.partner.status || (lang === 'tr' ? 'Seçimlerini yapıyor...' : lang === 'de' ? 'Trifft Auswahl...' : 'Making choices...')}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded-lg bg-white border border-stone-200 text-stone-700 font-mono font-bold">
                  {lang === 'tr' ? 'Kod' : 'Code'}: {user.partner.pairCode || 'CRV-9821'}
                </span>
                <span className="text-[10px] text-emerald-700 font-extrabold">
                  {t.connectedTag || (lang === 'tr' ? 'Bağlı ✓' : lang === 'de' ? 'Verbunden ✓' : 'Connected ✓')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Chat Shortcut with Partner */}
          <div className="w-full max-w-[340px] mx-auto">
            <button
              onClick={() => {
                sound.playTap();
                if (onNavigateToChat) onNavigateToChat();
              }}
              className="w-full py-3 px-4 rounded-2xl bg-[#E05A3D] hover:bg-[#cf4e33] text-white font-black text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'tr' ? `${user.partner.name} ile Sohbete Git & Hızlı Bildirim Gönder` : lang === 'de' ? `Chatte mit ${user.partner.name} & Sende Alert` : `Chat with ${user.partner.name} & Quick Alert`}</span>
            </button>
          </div>

          {/* Partner Dietary & Allergen Profile */}
          <div className="w-full max-w-[340px] mx-auto bg-white p-3.5 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <h4 className="text-xs font-bold text-[#2B6777]">
                {lang === 'tr' ? `${user.partner.name}'ın Alerjenleri & Sevmedikleri` : lang === 'de' ? `Allergene & Abneigungen von ${user.partner.name}` : `${user.partner.name}'s Allergens & Dislikes`}
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {partnerAllergies.map((alg) => (
                <span
                  key={alg}
                  className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold"
                >
                  ⚠️ {alg}
                </span>
              ))}
            </div>
          </div>

          {/* Couple Compatibility Card */}
          <div className="w-full max-w-[340px] mx-auto bg-white p-3.5 rounded-3xl border border-stone-200 shadow-2xs flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold text-[#E05A3D] uppercase tracking-wider">
                {t.tasteSynergy || (lang === 'tr' ? 'Lezzet Uyumu' : lang === 'de' ? 'Geschmackssynergie' : 'Taste Synergy')}
              </span>
              <div className="text-lg font-black text-[#2B6777]">
                {lang === 'tr' ? '%96 Mükemmel Çift' : lang === 'de' ? '96% Perfektes Match' : '96% Perfect Match'}
              </div>
              <p className="text-[10px] text-stone-500">
                {lang === 'tr' ? '14 ortak yemek beğendiniz' : lang === 'de' ? '14 gemeinsame Gerichte gemocht' : '14 mutual dishes liked'}
              </p>
            </div>

            <div className="w-12 h-12 rounded-full bg-orange-100 text-[#E05A3D] flex items-center justify-center font-black text-sm border-2 border-[#E05A3D]">
              96%
            </div>
          </div>

          {/* Partner's Liked Dishes */}
          <div className="w-full max-w-[340px] mx-auto bg-white p-3.5 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
            <h4 className="text-xs font-bold text-[#2B6777] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-[#E05A3D] text-[#E05A3D]" />
              <span>{lang === 'tr' ? `${user.partner.name}'ın Beğendiği Yemekler` : lang === 'de' ? `Lieblingsgerichte von ${user.partner.name}` : `${user.partner.name}'s Liked Dishes`}</span>
            </h4>

            <div className="space-y-1.5 pt-0.5">
              {partnerFavoriteDishes.map((d) => (
                <div key={d.id} className="p-2 rounded-xl bg-stone-50 flex items-center justify-between border border-stone-200">
                  <div className="flex items-center gap-2 truncate">
                    <img src={d.image} alt={d.title} className="w-7 h-7 rounded-lg object-cover" />
                    <span className="text-xs font-bold text-[#1A3B44] truncate">{d.title}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                    {lang === 'tr' ? 'Ortak Beğeni' : lang === 'de' ? 'Gemeinsam' : 'Mutual Like'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CSV Database Management Banner (Always Available) */}
      <div className="w-full max-w-[340px] mx-auto mt-3">
        <button
          onClick={() => {
            sound.playTap();
            if (onOpenSettings) onOpenSettings();
          }}
          className="w-full p-3 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-[#2B6777] flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-black text-[#2B6777]">
                {lang === 'tr' ? 'Yemek & CSV Veritabanı Yöneticisi' : lang === 'de' ? 'Gerichte & CSV-Datenbank-Manager' : 'Food & CSV Database Manager'}
              </div>
              <div className="text-[10px] text-stone-500">
                {lang === 'tr' ? "Google Sheets'ten yemek yükle veya dışa aktar" : lang === 'de' ? 'Gerichte aus Google Sheets laden oder exportieren' : 'Import dishes from Google Sheets or export'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>
      </div>

      {/* TASTE DUEL VOTING CARD */}
      <div className="w-full max-w-[340px] mx-auto mt-3 bg-white p-3.5 rounded-3xl border border-stone-200 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#E05A3D]" />
            <span className="text-xs font-extrabold text-[#2B6777] font-['Outfit',sans-serif]">
              {t.tasteDuels}
            </span>
          </div>
          <span className="text-[10px] font-bold text-stone-500">
            {currentDuelIndex + 1}/{localDuels.length}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Option A */}
          <button
            onClick={() => handleVote('A')}
            className={`p-2 rounded-2xl border text-center transition-all cursor-pointer ${
              activeDuel.userVote === 'A'
                ? 'border-[#2B6777] bg-[#2B6777]/10 ring-2 ring-[#2B6777]'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50'
            }`}
          >
            <img
              src={activeDuel.optionA.image}
              alt={activeDuel.optionA.name}
              className="w-full h-14 object-cover rounded-xl mb-1"
            />
            <div className="text-[11px] font-bold text-[#1A3B44] truncate">
              {activeDuel.optionA.name}
            </div>
            <div className="text-xs font-black text-[#2B6777] mt-0.5">
              %{activeDuel.optionA.votesPercent}
            </div>
          </button>

          {/* Option B */}
          <button
            onClick={() => handleVote('B')}
            className={`p-2 rounded-2xl border text-center transition-all cursor-pointer ${
              activeDuel.userVote === 'B'
                ? 'border-[#E05A3D] bg-[#E05A3D]/10 ring-2 ring-[#E05A3D]'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50'
            }`}
          >
            <img
              src={activeDuel.optionB.image}
              alt={activeDuel.optionB.name}
              className="w-full h-14 object-cover rounded-xl mb-1"
            />
            <div className="text-[11px] font-bold text-[#1A3B44] truncate">
              {activeDuel.optionB.name}
            </div>
            <div className="text-xs font-black text-[#E05A3D] mt-0.5">
              %{activeDuel.optionB.votesPercent}
            </div>
          </button>
        </div>

        <button
          onClick={handleNextDuel}
          className="w-full py-1.5 text-center text-[11px] font-bold text-[#2B6777] hover:underline cursor-pointer"
        >
          {lang === 'tr' ? 'Sıradaki Düello →' : lang === 'de' ? 'Nächstes Duell →' : 'Next Duel →'}
        </button>
      </div>

      {/* PROJECT EXPORT & ZIP DOWNLOAD CARD (DEVELOPMENT ANYWHERE) */}
      <div className="w-full max-w-[340px] mx-auto bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-3.5 rounded-3xl border-2 border-emerald-300 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="text-xs font-black text-emerald-950 font-['Outfit',sans-serif]">
              {lang === 'tr' ? '📦 Projeyi Dışa Aktar (ZIP / Git)' : lang === 'de' ? '📦 Projekt exportieren (ZIP / Git)' : '📦 Export Project (ZIP / Git)'}
            </h4>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900 font-bold">
            126 KB ZIP
          </span>
        </div>

        <p className="text-[11px] text-emerald-900/80 leading-snug">
          {lang === 'tr' ? 'Projeyi bilgisayarınızda veya başka bir platformda geliştirmek için tüm kaynak kodları ZIP olarak anında indirin.' : lang === 'de' ? 'Laden Sie den Quellcode als ZIP herunter, um das Projekt lokal oder auf einem Server auszuführen.' : 'Download complete source code as a ZIP archive to run and develop anywhere.'}
        </p>

        {downloadSuccessToast && (
          <div className="p-2 rounded-xl bg-emerald-100 border border-emerald-300 text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{lang === 'tr' ? 'ZIP indirmesi başlatıldı: ' : lang === 'de' ? 'ZIP-Download gestartet: ' : 'ZIP download started: '}<strong>crave-couples-app.zip</strong></span>
          </div>
        )}

        <div className="space-y-1.5 pt-1">
          {/* Download ZIP Button */}
          <button
            onClick={handleDownloadZip}
            className="w-full py-2.5 px-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{lang === 'tr' ? 'Tüm Projeyi ZIP Olarak İndir' : lang === 'de' ? 'Gesamtes Projekt als ZIP herunterladen' : 'Download Complete Project as ZIP'}</span>
          </button>

          {/* Open Git & Deployment Guide */}
          <button
            onClick={() => {
              sound.playTap();
              setShowGitGuideModal(true);
            }}
            className="w-full py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-emerald-300 text-emerald-900 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'tr' ? 'GitHub Reposu & Kurulum Rehberini Aç' : lang === 'de' ? 'GitHub-Repo & Setup-Anleitung' : 'GitHub Repo & Deployment Guide'}</span>
          </button>
        </div>
      </div>

      {/* GIT REPO & DEPLOYMENT GUIDE MODAL */}
      <AnimatePresence>
        {showGitGuideModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-[340px] max-h-[85vh] bg-white rounded-3xl p-4 shadow-2xl border border-stone-200 overflow-y-auto no-scrollbar space-y-3 relative"
            >
              <button
                onClick={() => setShowGitGuideModal(false)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 cursor-pointer hover:bg-stone-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  🚀
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#2B6777] font-['Outfit',sans-serif]">
                    {lang === 'tr' ? 'GitHub & Kurulum Rehberi' : lang === 'de' ? 'GitHub & Setup-Anleitung' : 'GitHub & Deployment Guide'}
                  </h4>
                  <p className="text-[10px] text-stone-500">
                    {lang === 'tr' ? 'Başka yerde çalıştırma ve canlıya alma' : lang === 'de' ? 'Lokal ausführen & Bereitstellen' : 'Run anywhere and deploy to web'}
                  </p>
                </div>
              </div>

              {/* Step 1: ZIP Download */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5 text-left text-xs">
                <div className="font-extrabold text-[#2B6777] flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#2B6777] text-white text-[10px] flex items-center justify-center">1</span>
                  <span>{lang === 'tr' ? "ZIP'i Açın & Bağımlılıkları Kurun" : lang === 'de' ? 'ZIP entpacken & Pakete installieren' : 'Extract ZIP & Install Dependencies'}</span>
                </div>
                <div className="bg-stone-900 text-emerald-400 p-2 rounded-xl font-mono text-[11px] space-y-1">
                  <div>npm install</div>
                  <div className="text-stone-400"># {lang === 'tr' ? 'Geliştirme sunucusunu başlatın:' : 'Start dev server:'}</div>
                  <div>npm run dev</div>
                </div>
              </div>

              {/* Step 2: Push to GitHub */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5 text-left text-xs">
                <div className="font-extrabold text-[#2B6777] flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#2B6777] text-white text-[10px] flex items-center justify-center">2</span>
                  <span>{lang === 'tr' ? 'Kendi GitHub Reponuza Aktarın' : lang === 'de' ? 'In eigenes GitHub-Repo pushen' : 'Push to Your GitHub Repo'}</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  {lang === 'tr' ? 'GitHub\'da yeni bir repo oluşturun (örn: cravematch), ardından terminalde:' : 'Create a repo on GitHub, then in your terminal run:'}
                </p>
                <div className="bg-stone-900 text-emerald-400 p-2 rounded-xl font-mono text-[10px] space-y-1 overflow-x-auto">
                  <div>git init</div>
                  <div>git add .</div>
                  <div>git commit -m "CraveMatch v1"</div>
                  <div>git remote add origin https://github.com/USER/cravematch.git</div>
                  <div>git branch -M main</div>
                  <div>git push -u origin main</div>
                </div>
              </div>

              {/* Step 3: Vercel Free Deploy */}
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1.5 text-left text-xs">
                <div className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] flex items-center justify-center">3</span>
                  <span>{lang === 'tr' ? 'Vercel ile Canlıya Alın (Ücretsiz)' : lang === 'de' ? 'Kostenlos auf Vercel hosten' : 'Free Deploy on Vercel'}</span>
                </div>
                <p className="text-[11px] text-emerald-900 leading-snug">
                  {lang === 'tr' ? 'Vercel.com\'a GitHub ile giriş yapıp reponuzu bağlayın. 1 dakikada genel bir link oluşur. Her iki telefondan doğrudan QR veya 6 haneli kodla eşleşirsiniz!' : 'Import repo on Vercel.com. You will get a live URL in 1 minute. Direct instant pairing with QR and code!'}
                </p>
              </div>

              <button
                onClick={handleDownloadZip}
                className="w-full py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'tr' ? 'ZIP Dosyasını Şimdi İndir (126 KB)' : lang === 'de' ? 'ZIP jetzt herunterladen (126 KB)' : 'Download ZIP Now (126 KB)'}</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SINGLE BADGE DETAILS MODAL */}
      <AnimatePresence>
        {selectedBadgeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-[320px] bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 text-center space-y-3 relative"
            >
              <button
                onClick={() => setSelectedBadgeModal(null)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 rounded-3xl bg-amber-100 flex items-center justify-center text-4xl mx-auto shadow-inner border border-amber-300">
                {selectedBadgeModal.icon}
              </div>

              <div>
                <h3 className="text-lg font-black text-[#2B6777] font-['Outfit',sans-serif]">
                  {lang === 'tr' ? selectedBadgeModal.title : selectedBadgeModal.title_en}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {lang === 'tr' ? selectedBadgeModal.description : selectedBadgeModal.description_en}
                </p>
              </div>

              {/* Unlock Requirement / How to earn */}
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-1">
                <span className="font-extrabold text-[#E05A3D] text-[10px] uppercase tracking-wider block">
                  {lang === 'tr' ? 'Nasıl Kazanılır?' : lang === 'de' ? 'Wie freischalten?' : 'How to Unlock?'}
                </span>
                <p className="text-stone-700 leading-snug">
                  {lang === 'tr' ? selectedBadgeModal.howToUnlock : selectedBadgeModal.howToUnlock_en}
                </p>
              </div>

              {/* Progress Bar */}
              {(() => {
                const max = selectedBadgeModal.maxProgress || 1;
                const percent = Math.min(100, Math.round((selectedBadgeModal.progress / max) * 100));
                return (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-stone-600">
                      <span>{t.progress || (lang === 'tr' ? 'İlerleme' : lang === 'de' ? 'Fortschritt' : 'Progress')}</span>
                      <span>{selectedBadgeModal.progress} / {max} ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-[#E05A3D] rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })()}

              {selectedBadgeModal.unlocked ? (
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.unlockedBadge || (lang === 'tr' ? 'Bu Madalyayı Kazandınız!' : lang === 'de' ? 'Abzeichen freigeschaltet!' : 'Badge Unlocked!')}</span>
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-stone-100 text-stone-600 text-xs font-bold flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.lockedBadge || (lang === 'tr' ? 'Kilitli • Görevi tamamlayın' : lang === 'de' ? 'Gesperrt • Mission abschließen' : 'Locked • Complete quest')}</span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ALL BADGES LIST MODAL */}
      <AnimatePresence>
        {showAllBadgesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-[340px] bg-white rounded-3xl p-4 shadow-2xl border border-stone-200 space-y-3 relative max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <h3 className="font-extrabold text-sm text-[#2B6777]">
                    {lang === 'tr' ? `Tüm Madalyalar (${user.badges.length})` : lang === 'de' ? `Alle Abzeichen (${user.badges.length})` : `All Badges (${user.badges.length})`}
                  </h3>
                </div>
                <button
                  onClick={() => setShowAllBadgesModal(false)}
                  className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 overflow-y-auto no-scrollbar pr-0.5 flex-1">
                {user.badges.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      sound.playTap();
                      setSelectedBadgeModal(b);
                    }}
                    className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2.5 cursor-pointer transition-colors ${
                      b.unlocked
                        ? 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                        : 'bg-stone-50 border-stone-200 opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-2xl shrink-0">{b.icon}</span>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-[#1A3B44] truncate">
                          {lang === 'tr' ? b.title : b.title_en}
                        </div>
                        <div className="text-[10px] text-stone-500 truncate">
                          {lang === 'tr' ? b.howToUnlock : b.howToUnlock_en}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {b.unlocked ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          {t.unlockedTag || (lang === 'tr' ? 'Kazanıldı' : lang === 'de' ? 'Freigeschaltet' : 'Unlocked')}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-stone-500">
                          {b.progress}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
