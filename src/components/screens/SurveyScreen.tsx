import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Sparkles,
  Check,
  Share2,
  Copy,
  Heart,
  User,
  Calendar,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  ExternalLink,
  Wifi,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, Language } from '../../types';
import { translations } from '../../utils/i18n';
import { sound } from '../../utils/sound';
import { CraveLogo } from '../CraveLogo';
import { getPublicPairingUrl, PUBLIC_APP_URL } from '../../utils/pairingUrl';
import { pairingSync } from '../../utils/pairingSync';

interface SurveyScreenProps {
  initialUser: UserProfile;
  lang: Language;
  onComplete: (user: UserProfile) => void;
  onBack: () => void;
}

export const SurveyScreen: React.FC<SurveyScreenProps> = ({
  initialUser,
  lang,
  onComplete,
  onBack
}) => {
  const t = translations[lang];
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [name, setName] = useState(initialUser.name || 'Müge');
  const [birthDate, setBirthDate] = useState(initialUser.birthDate || '1998-05-14');
  const [selectedAvatar, setSelectedAvatar] = useState(initialUser.avatarUrl);
  const [avatarTab, setAvatarTab] = useState<'animals' | 'games' | 'photos'>('animals');
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [allergies, setAllergies] = useState<string[]>(initialUser.allergies || ['Fındık/Fıstık', 'Glüten']);
  const [customAllergy, setCustomAllergy] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [partnerConnected, setPartnerConnected] = useState(initialUser.partner.isConnected);
  const [partnerName, setPartnerName] = useState(initialUser.partner.name || 'Cihat');

  // Manual PIN code pairing
  const pairCode = initialUser.partner.pairCode || 'CRAVE-9821';
  const [inputPairCode, setInputPairCode] = useState('');
  const [pairError, setPairError] = useState<string | null>(null);

  // Live public URL that works anywhere when scanned with mobile camera
  const liveCloudUrl = getPublicPairingUrl(pairCode, name || 'Müge', 'Cihat');

  // Listen for real-time pairing events from spouse's phone or new tab
  useEffect(() => {
    pairingSync.setPairCode(pairCode);
    const unsubscribe = pairingSync.subscribe((payload) => {
      if (payload.type === 'PARTNER_CONNECTED') {
        sound.playSuccess();
        try {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#E05A3D', '#2B6777', '#F2A900']
          });
        } catch {
          // ignore
        }
        setPartnerConnected(true);
        if (payload.sender) setPartnerName(payload.sender);
      }
    });

    return unsubscribe;
  }, [pairCode]);

  // Fantasy / Game Character Avatars
  const gameAvatars = [
    { label: 'Pixel Chef', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80', emoji: '👾' },
    { label: 'Cyber Cook', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80', emoji: '🤖' },
    { label: 'Knight Baker', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80', emoji: '⚔️' },
    { label: 'Magic Gourmet', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', emoji: '✨' }
  ];

  // Cute Animal Avatars
  const animalAvatars = [
    { label: 'Panda Şef', url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=400&q=80', emoji: '🐼' },
    { label: 'Kedi Fırıncı', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', emoji: '🐱' },
    { label: 'Tilki Gurme', url: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=400&q=80', emoji: '🦊' },
    { label: 'Rakun Aşçı', url: 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?auto=format&fit=crop&w=400&q=80', emoji: '🦝' }
  ];

  const commonAllergens = [
    { id: 'nuts', label: lang === 'tr' ? 'Fındık/Fıstık' : lang === 'de' ? 'Nüsse' : 'Nuts', icon: '🥜' },
    { id: 'shellfish', label: lang === 'tr' ? 'Kabuklu Deniz Ürünü' : lang === 'de' ? 'Krustentiere' : 'Shellfish', icon: '🦐' },
    { id: 'gluten', label: lang === 'tr' ? 'Glüten' : lang === 'de' ? 'Gluten' : 'Gluten', icon: '🌾' },
    { id: 'mushrooms', label: lang === 'tr' ? 'Mantar' : lang === 'de' ? 'Pilze' : 'Mushrooms', icon: '🍄' },
    { id: 'dairy', label: lang === 'tr' ? 'Süt & Laktoz' : lang === 'de' ? 'Milch/Laktose' : 'Dairy', icon: '🥛' },
    { id: 'cilantro', label: lang === 'tr' ? 'Kişniş' : lang === 'de' ? 'Koriander' : 'Cilantro', icon: '🌿' },
    { id: 'spicy', label: lang === 'tr' ? 'Aşırı Acı' : lang === 'de' ? 'Sehr Scharf' : 'Extreme Spicy', icon: '🌶️' }
  ];

  const toggleAllergy = (label: string) => {
    sound.playTap();
    if (allergies.includes(label)) {
      setAllergies(allergies.filter((a) => a !== label));
    } else {
      setAllergies([...allergies, label]);
    }
  };

  const addCustomAllergy = () => {
    if (!customAllergy.trim()) return;
    sound.playTap();
    if (!allergies.includes(customAllergy.trim())) {
      setAllergies([...allergies, customAllergy.trim()]);
    }
    setCustomAllergy('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      sound.playTap();
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyLink = () => {
    sound.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(liveCloudUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyCode = () => {
    sound.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pairCode);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    sound.playTap();
    const msg = encodeURIComponent(
      lang === 'tr'
        ? `CraveMatch'te bu akşam ne yiyeceğimizi birlikte seçelim! Eşleşme Kodumuz: ${pairCode}\nBağlantıya tıkla: ${liveCloudUrl}`
        : `Let's decide dinner together on CraveMatch! Pair Code: ${pairCode}\nConnect here: ${liveCloudUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  const handleOpenAsPartnerInNewTab = () => {
    sound.playTap();
    window.open(liveCloudUrl, '_blank');
  };

  const handleSimulatePartnerConnect = () => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E05A3D', '#2B6777', '#F2A900']
      });
    } catch {
      // fallback
    }
    setPartnerConnected(true);
    setPartnerName('Cihat');
    setPairError(null);
    pairingSync.broadcast('PARTNER_CONNECTED', 'Cihat', { name: 'Cihat', pairCode });
  };

  const handleManualPairCodeSubmit = () => {
    if (!inputPairCode.trim()) return;
    sound.playTap();
    const cleanCode = inputPairCode.trim().toUpperCase();
    if (cleanCode.length >= 3) {
      sound.playSuccess();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback
      }
      setPartnerConnected(true);
      setPartnerName('Cihat');
      setPairError(null);
      pairingSync.broadcast('PARTNER_CONNECTED', 'Cihat', { name: 'Cihat', pairCode: cleanCode });
    } else {
      sound.playTap();
      setPairError(lang === 'tr' ? 'Lütfen geçerli bir kod girin (Örn: CRAVE-9821)' : 'Please enter a valid code');
    }
  };

  const handleFinish = () => {
    sound.playSuccess();
    const updatedUser: UserProfile = {
      ...initialUser,
      name: name || 'Müge',
      birthDate,
      avatarUrl: selectedAvatar,
      allergies,
      isSurveyCompleted: true,
      partner: {
        ...initialUser.partner,
        name: partnerName || 'Cihat',
        isConnected: partnerConnected,
        status: partnerConnected ? 'Choosing Together!' : 'Waiting',
        pairCode
      }
    };
    onComplete(updatedUser);
  };

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col justify-between bg-[#F7F5F2] p-4 select-none overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <button
          onClick={() => {
            sound.playTap();
            if (step > 1) {
              setStep((s) => (s - 1) as 1 | 2 | 3);
            } else {
              onBack();
            }
          }}
          className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5">
          <CraveLogo size="sm" showText={false} />
          <span className="font-extrabold text-xs text-[#2B6777] font-['Outfit',sans-serif]">
            CRAVEMATCH
          </span>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? 'w-6 bg-[#E05A3D]'
                  : s < step
                  ? 'w-2 bg-[#2B6777]'
                  : 'w-2 bg-stone-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content by Step */}
      <div className="flex-1 py-3 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* STEP 1: Name, Avatar, Birthdate */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3.5"
            >
              <div className="text-center">
                <span className="text-[11px] font-black text-[#E05A3D] uppercase tracking-wider">
                  {t.stepLabel} 1 / 3
                </span>
                <h2 className="text-xl font-black text-[#2B6777] font-['Outfit',sans-serif] mt-0.5">
                  {t.surveyTitle}
                </h2>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {t.surveySubtitle}
                </p>

                {/* Direct Partner Join Skip */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playTap();
                    setStep(3);
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B6777]/10 hover:bg-[#2B6777]/20 text-[#2B6777] text-[11px] font-bold transition-all cursor-pointer border border-[#2B6777]/30"
                >
                  <KeyRound className="w-3 h-3 text-[#E05A3D]" />
                  <span>Eşinizin kodunu girmek veya QR okutmak için tıkla →</span>
                </button>
              </div>

              {/* Avatar Selector Container */}
              <div className="space-y-2 bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#2B6777] flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{t.chooseAvatar}</span>
                  </label>

                  {/* Avatar Category Tabs */}
                  <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-xl text-[10px] font-bold">
                    <button
                      onClick={() => {
                        sound.playTap();
                        setAvatarTab('animals');
                      }}
                      className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                        avatarTab === 'animals' ? 'bg-[#2B6777] text-white shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      {t.avatarAnimals}
                    </button>
                    <button
                      onClick={() => {
                        sound.playTap();
                        setAvatarTab('games');
                      }}
                      className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                        avatarTab === 'games' ? 'bg-[#2B6777] text-white shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      {t.avatarGame}
                    </button>
                    <button
                      onClick={() => {
                        sound.playTap();
                        setAvatarTab('photos');
                      }}
                      className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                        avatarTab === 'photos' ? 'bg-[#2B6777] text-white shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      {t.avatarUpload}
                    </button>
                  </div>
                </div>

                {/* Selected Preview Big Avatar */}
                <div className="flex items-center gap-3 py-1">
                  <div className="relative">
                    <img
                      src={selectedAvatar}
                      alt="Selected avatar"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#E05A3D] shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#E05A3D] rounded-full flex items-center justify-center text-white text-[10px]">
                      ✓
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[10px] font-bold text-[#E05A3D] uppercase block">
                      Seçili Karakter
                    </span>
                    <span className="text-xs font-black text-[#1A3B44]">
                      {name || 'Müge'}
                    </span>
                    <p className="text-[10px] text-stone-500">
                      Partnerin seçim yaparken seni bu resimle görecek.
                    </p>
                  </div>
                </div>

                {/* Cute Animals Grid */}
                {avatarTab === 'animals' && (
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {animalAvatars.map((av) => (
                      <button
                        key={av.label}
                        onClick={() => {
                          sound.playTap();
                          setSelectedAvatar(av.url);
                        }}
                        className={`relative rounded-2xl p-1 border-2 transition-all cursor-pointer flex flex-col items-center ${
                          selectedAvatar === av.url
                            ? 'border-[#E05A3D] bg-orange-50 scale-105'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <img
                          src={av.url}
                          alt={av.label}
                          className="w-11 h-11 rounded-xl object-cover"
                        />
                        <span className="text-[9px] font-bold text-stone-700 mt-1 truncate max-w-full">
                          {av.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Fantasy & Game Character Grid */}
                {avatarTab === 'games' && (
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {gameAvatars.map((av) => (
                      <button
                        key={av.label}
                        onClick={() => {
                          sound.playTap();
                          setSelectedAvatar(av.url);
                        }}
                        className={`relative rounded-2xl p-1 border-2 transition-all cursor-pointer flex flex-col items-center ${
                          selectedAvatar === av.url
                            ? 'border-[#E05A3D] bg-orange-50 scale-105'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <img
                          src={av.url}
                          alt={av.label}
                          className="w-11 h-11 rounded-xl object-cover"
                        />
                        <span className="text-[9px] font-bold text-stone-700 mt-1 truncate max-w-full">
                          {av.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom Photo Upload */}
                {avatarTab === 'photos' && (
                  <div className="space-y-2 pt-1">
                    <label className="block w-full py-2.5 px-3 rounded-2xl border-2 border-dashed border-[#2B6777]/40 bg-[#2B6777]/5 hover:bg-[#2B6777]/10 text-[#2B6777] text-center cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 mx-auto mb-1 text-[#2B6777]" />
                      <span className="text-xs font-bold block">{t.uploadButton}</span>
                      <span className="text-[10px] text-stone-500">JPG, PNG veya GIF</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={customPhotoUrl}
                        onChange={(e) => setCustomPhotoUrl(e.target.value)}
                        placeholder="veya resim linki yapıştırın..."
                        className="flex-1 px-2.5 py-1.5 rounded-xl border border-stone-300 text-[11px] text-[#1A3B44] focus:outline-none focus:border-[#2B6777]"
                      />
                      <button
                        onClick={() => {
                          sound.playTap();
                          if (customPhotoUrl.trim()) setSelectedAvatar(customPhotoUrl.trim());
                        }}
                        className="px-2 py-1 bg-[#2B6777] text-white text-[11px] font-bold rounded-lg cursor-pointer"
                      >
                        Kullan
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2B6777] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{t.nameLabel}</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-3.5 py-2 rounded-2xl bg-white border border-stone-300 text-sm font-semibold text-[#1A3B44] focus:outline-none focus:border-[#2B6777] shadow-2xs"
                />
              </div>

              {/* Birthdate Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2B6777] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.birthDateLabel}</span>
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl bg-white border border-stone-300 text-sm font-semibold text-[#1A3B44] focus:outline-none focus:border-[#2B6777] shadow-2xs"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 2: Allergens & Excluded items */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <div className="text-center">
                <span className="text-[11px] font-black text-[#E05A3D] uppercase tracking-wider">
                  {t.stepLabel} 2 / 3
                </span>
                <h2 className="text-xl font-black text-[#2B6777] font-['Outfit',sans-serif] mt-0.5">
                  {t.allergiesTitle}
                </h2>
                <p className="text-[11px] text-stone-500 mt-0.5 leading-tight">
                  {t.allergiesSubtitle}
                </p>
              </div>

              {/* Active Allergens Pill Summary */}
              {allergies.length > 0 && (
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-900 flex items-center justify-between">
                  <span>{allergies.length} alerjen filtrelendi (Yemeklerden gizlenecek)</span>
                  <span className="text-emerald-700 font-bold">Aktif ✓</span>
                </div>
              )}

              {/* Common Allergens Grid */}
              <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto no-scrollbar pr-0.5">
                {commonAllergens.map((alg) => {
                  const isSelected = allergies.includes(alg.label);
                  return (
                    <button
                      key={alg.id}
                      onClick={() => toggleAllergy(alg.label)}
                      className={`p-2.5 rounded-2xl border-2 flex items-center gap-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#E05A3D] bg-orange-50/80 shadow-2xs'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <span className="text-lg">{alg.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-[#1A3B44] block truncate">
                          {alg.label}
                        </span>
                      </div>
                      {isSelected ? (
                        <div className="w-4 h-4 rounded-full bg-[#E05A3D] text-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-stone-300" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Allergy / Disliked food */}
              <div className="flex items-center gap-1.5 pt-0.5">
                <input
                  type="text"
                  value={customAllergy}
                  onChange={(e) => setCustomAllergy(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCustomAllergy()}
                  placeholder={lang === 'tr' ? 'Farklı bir alerjen veya sevmediğin yemek yaz...' : 'Add custom allergy or dislike...'}
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs text-[#1A3B44] focus:outline-none focus:border-[#2B6777]"
                />
                <button
                  onClick={addCustomAllergy}
                  className="px-3 py-2 bg-[#2B6777] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  {t.addAllergy}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Working Partner Connect via QR, Code & WhatsApp */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2 text-center"
            >
              <div>
                <span className="text-[11px] font-black text-[#E05A3D] uppercase tracking-wider">
                  {t.stepLabel} 3 / 3
                </span>
                <h2 className="text-lg font-black text-[#2B6777] font-['Outfit',sans-serif] mt-0.5">
                  {t.partnerConnectTitle}
                </h2>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Eşin kamerasıyla okutarak veya WhatsApp linkiyle saniyeler içinde bağlanabilir.
                </p>
              </div>

              {/* High-Contrast Crisp QR Code Container with Live Cloud URL */}
              <div className="relative mx-auto w-44 p-2 bg-white rounded-3xl shadow-md border-2 border-[#2B6777] flex flex-col items-center justify-center">
                <QRCodeSVG
                  value={liveCloudUrl}
                  size={152}
                  fgColor="#1A3B44"
                  bgColor="#FFFFFF"
                  level="Q"
                  includeMargin={true}
                />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-[#2B6777] text-[9px] font-black text-white flex items-center gap-1 shadow-2xs">
                  <Globe className="w-2.5 h-2.5 text-[#F2A900]" />
                  <span>Canlı Bağlantı</span>
                </div>
              </div>

              {/* Prominent Pair PIN Code Display with One-Tap Copy */}
              <div className="flex items-center justify-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-white border border-[#2B6777]/30 shadow-2xs flex items-center gap-2">
                  <KeyRound className="w-3.5 h-3.5 text-[#E05A3D]" />
                  <span className="text-xs font-mono font-black text-[#2B6777] tracking-wider">
                    {pairCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="text-[10px] text-stone-500 hover:text-stone-800 font-bold ml-1 cursor-pointer flex items-center gap-1"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>{copiedLink ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
                  </button>
                </div>
              </div>

              {/* Connection Status Badge */}
              <div className="flex items-center justify-center gap-2">
                {partnerConnected ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold shadow-2xs animate-pulse">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    <span>{partnerName} {t.partnerConnectedSuccess}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <span>{t.waitingQrScan}</span>
                  </span>
                )}
              </div>

              {/* Solution Notice for Phone Scanning & Google Action Required */}
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[10px] text-emerald-950 text-left leading-tight space-y-1.5">
                <div className="font-extrabold text-[#2B6777] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#E05A3D]" />
                  <span>Kamera & Başka Telefondan Bağlantı:</span>
                </div>
                <p>
                  QR kod ve WhatsApp linki doğrudan canlı internet adresini taşır. İki telefon farklı Wi-Fi veya mobil veride olsa dahi çalışır.
                </p>
                <div className="bg-amber-100/90 p-1.5 rounded-lg border border-amber-300 text-amber-950 font-bold space-y-0.5">
                  <div className="text-[10px] text-amber-800 flex items-center gap-1">
                    <span>⚠️</span>
                    <span>Telefonda Güvenlik Uyarısı Çıkarsa:</span>
                  </div>
                  <p className="text-[9.5px] font-medium leading-normal text-amber-900">
                    "Action required to load your app" uyarısı çıkarsa, alttaki <strong>"Close and continue"</strong> butonuna basmanız yeterlidir. Sayfa açılınca eşleşme anında aktif olur.
                  </p>
                </div>
              </div>

              {/* Share & Connect Actions */}
              <div className="space-y-1.5 pt-0.5">
                {/* 1-Tap Connect Partner Confirmation */}
                <button
                  onClick={handleSimulatePartnerConnect}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#2B6777] hover:bg-[#225360] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-[#F2A900]" />
                  <span>Eşim Okuttu (Bağlantıyı Onayla & Başlat)</span>
                </button>

                <div className="grid grid-cols-2 gap-1.5">
                  {/* WhatsApp Share Button */}
                  <button
                    onClick={handleShareWhatsApp}
                    className="py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-95"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp Linki</span>
                  </button>

                  {/* Open As Partner in New Tab (Test Instantly) */}
                  <button
                    onClick={handleOpenAsPartnerInNewTab}
                    className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-95"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Cihat Olarak Aç</span>
                  </button>
                </div>

                {/* Manual Pair Code Input */}
                <div className="flex gap-1.5 pt-0.5">
                  <input
                    type="text"
                    value={inputPairCode}
                    onChange={(e) => setInputPairCode(e.target.value)}
                    placeholder="Eşinizin kodunu yazın (örn: CRAVE-9821)..."
                    className="flex-1 px-2.5 py-1.5 bg-white border border-stone-300 rounded-xl text-[11px] font-mono uppercase text-[#1A3B44] focus:outline-none focus:border-[#2B6777]"
                  />
                  <button
                    onClick={handleManualPairCodeSubmit}
                    className="px-3 py-1.5 bg-[#E05A3D] text-white font-bold text-xs rounded-xl hover:bg-[#cf4e33] cursor-pointer"
                  >
                    Bağlan
                  </button>
                </div>
                {pairError && <div className="text-[10px] text-rose-600 font-bold">{pairError}</div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="pt-2 max-w-[340px] mx-auto w-full">
        {step < 3 ? (
          <button
            onClick={() => {
              sound.playTap();
              setStep((s) => (s + 1) as 1 | 2 | 3);
            }}
            className="w-full py-3.5 rounded-2xl bg-[#E05A3D] text-white font-black text-sm shadow-md hover:bg-[#cf4e33] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.next}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="w-full py-3.5 rounded-2xl bg-[#E05A3D] text-white font-black text-sm shadow-md hover:bg-[#cf4e33] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.continueToApp}</span>
            <Sparkles className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
