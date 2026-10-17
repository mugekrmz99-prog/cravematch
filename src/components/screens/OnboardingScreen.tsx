import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CraveLogo } from '../CraveLogo';
import { ThreeDDice } from '../ThreeDDice';
import { sound } from '../../utils/sound';
import { Language } from '../../types';
import { translations } from '../../utils/i18n';
import { KeyRound, Heart, Info, X, Check, Sparkles, Smartphone, Download } from 'lucide-react';

interface OnboardingScreenProps {
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onStart: () => void;
  onSignIn: () => void;
  onPairWithCode?: (code: string, myName: string, partnerName: string) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  lang,
  onSelectLang,
  onStart,
  onSignIn,
  onPairWithCode
}) => {
  const t = translations[lang];
  const [showPairModal, setShowPairModal] = useState(false);
  const [inputCode, setInputCode] = useState('CRAVE-9821');
  const [selectedPersona, setSelectedPersona] = useState<'Cihat' | 'Müge'>('Cihat');
  const [showGoogleNotice, setShowGoogleNotice] = useState(true);

  const handleStart = () => {
    sound.playTap();
    onStart();
  };

  const handleSignIn = () => {
    sound.playTap();
    onSignIn();
  };

  const handleQuickConnect = (persona: 'Cihat' | 'Müge', code: string = 'CRAVE-9821') => {
    sound.playSuccess();
    const partner = persona === 'Cihat' ? 'Müge' : 'Cihat';
    if (onPairWithCode) {
      onPairWithCode(code, persona, partner);
    } else {
      onSignIn();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between items-center px-5 py-4 bg-[#F7F5F2] overflow-hidden select-none">
      {/* Background soft ambiance glows */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-[#E05A3D]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Language Switcher Bar & Logo */}
      <div className="w-full flex flex-col items-center gap-2 z-10">
        {/* Language selector chips */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/80 border border-stone-200/90 shadow-2xs">
          {[
            { id: 'tr' as Language, label: 'TR', flag: '🇹🇷' },
            { id: 'en' as Language, label: 'EN', flag: '🇬🇧' },
            { id: 'de' as Language, label: 'DE', flag: '🇩🇪' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playTap();
                onSelectLang(item.id);
              }}
              className={`px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                lang === item.id
                  ? 'bg-[#2B6777] text-white shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>{item.flag}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Top Logo */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <CraveLogo size="sm" layout="vertical" />
        </motion.div>
      </div>

      {/* Center 3D Floating Elements (Dice, Chef Hat, Flame) */}
      <div className="relative w-full max-w-[320px] h-[200px] flex items-center justify-center my-auto">
        {/* Mustard 3D Dice */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [-4, 6, -4],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute z-10"
        >
          <ThreeDDice size={80} isRolling={false} targetFace={5} showTrails={true} />
        </motion.div>

        {/* 3D White Chef's Hat */}
        <motion.div
          animate={{
            y: [8, -14, 8],
            rotate: [5, -8, 5],
            scale: [0.98, 1.04, 0.98]
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute -top-3 right-6 z-20"
        >
          <div className="relative p-2 filter drop-shadow-xl">
            <svg width="72" height="64" viewBox="0 0 100 88" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#F1EFEA" />
                  <stop offset="100%" stopColor="#D9D5CC" />
                </linearGradient>
                <filter id="hatShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1A3B44" floodOpacity="0.15" />
                </filter>
              </defs>
              <path
                d="M20 54 C12 44, 10 28, 26 16 C38 6, 52 10, 56 18 C64 8, 80 12, 84 26 C90 40, 80 54, 76 56 Z"
                fill="url(#hatGrad)"
                filter="url(#hatShadow)"
              />
              <path d="M34 22 C38 32, 40 45, 42 54" stroke="#E5E0D5" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M58 24 C58 34, 58 44, 58 54" stroke="#E5E0D5" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="22" y="52" width="54" height="18" rx="5" fill="#F7F5F2" stroke="#D9D5CC" strokeWidth="2" />
            </svg>
            <span className="absolute -top-1 left-2 text-xs text-amber-400 select-none">✦</span>
          </div>
        </motion.div>

        {/* 3D Terracotta Flame */}
        <motion.div
          animate={{
            y: [-12, 12, -12],
            rotate: [-6, 8, -6],
            scale: [1.02, 0.96, 1.02]
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
          className="absolute -bottom-2 right-4 z-20"
        >
          <div className="relative p-2 filter drop-shadow-xl">
            <svg width="66" height="72" viewBox="0 0 90 98" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="flameGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#FF7A59" />
                  <stop offset="50%" stopColor="#E05A3D" />
                  <stop offset="100%" stopColor="#BF3C20" />
                </linearGradient>
                <linearGradient id="innerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF3D6" />
                  <stop offset="100%" stopColor="#F2A900" />
                </linearGradient>
              </defs>
              <path
                d="M45 4 C54 18, 78 36, 78 60 C78 78, 63 92, 45 92 C27 92, 12 78, 12 60 C12 40, 32 26, 36 12 C36 12, 42 22, 38 32 C48 20, 42 12, 45 4 Z"
                fill="url(#flameGrad)"
              />
              <path
                d="M45 48 C51 48, 56 54, 56 62 C56 70, 51 76, 45 76 C39 76, 34 70, 34 62 C34 54, 40 50, 45 48 Z"
                fill="#F7F5F2"
              />
              <circle cx="45" cy="62" r="5" fill="url(#innerGlow)" opacity="0.9" />
            </svg>
            <span className="absolute -bottom-1 -right-1 text-sm text-[#E05A3D] select-none">✨</span>
          </div>
        </motion.div>
      </div>

      {/* Typography & Call to Action */}
      <div className="w-full max-w-[340px] flex flex-col items-center text-center space-y-3 pb-1 z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-black text-[#2B6777] tracking-tight font-['Outfit',sans-serif]">
            {t.tagline}
          </h1>
          <p className="text-[11px] font-medium text-[#1A3B44]/80 px-2 leading-tight">
            {t.subtagline}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="w-full space-y-2"
        >
          {/* Main Get Started Button */}
          <button
            onClick={handleStart}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#E05A3D] hover:bg-[#cf4e33] active:scale-[0.98] text-white font-extrabold text-sm shadow-md shadow-[#E05A3D]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.getStarted}</span>
            <span className="text-base">→</span>
          </button>

          {/* Quick Partner Connect Button (Specially for the spouse's phone) */}
          <button
            onClick={() => {
              sound.playTap();
              setShowPairModal(true);
            }}
            className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#2B6777] to-[#1E4B56] hover:opacity-95 active:scale-[0.98] text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
          >
            <KeyRound className="w-4 h-4 text-[#F2A900]" />
            <span>Eşimin Kodunu Gir / PIN ile Bağlan</span>
          </button>

          {/* 1-Tap Cihat Instant Connect (for spouse opening on their phone) */}
          <button
            onClick={() => handleQuickConnect('Cihat')}
            className="w-full py-2 px-3 rounded-xl bg-orange-100 hover:bg-orange-200 border border-orange-300 text-stone-800 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#E05A3D]" />
            <span>Diğer Telefon: <strong>Ben Cihat'ım (Müge'ye Bağlan)</strong></span>
          </button>

          {/* Direct ZIP Download Button */}
          <a
            href="/crave-couples-app.zip"
            download="crave-couples-app.zip"
            onClick={() => sound.playSuccess()}
            className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-[11px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>📦 Projeyi ZIP Olarak İndir (Tüm Kodlar - 126 KB)</span>
          </a>
        </motion.div>

        {/* Google Cloud Run Notice for Mobile */}
        {showGoogleNotice && (
          <div className="w-full p-2 rounded-xl bg-amber-50/90 border border-amber-200/80 text-[10px] text-amber-900 text-left flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1 leading-tight">
              <span>Telefonda <strong>"Action required to load your app"</strong> çıkarsa <strong>"Close and continue"</strong> butonuna basınız. Eşleşme anında çalışacaktır.</span>
            </div>
            <button
              onClick={() => setShowGoogleNotice(false)}
              className="text-amber-600 hover:text-amber-900 font-bold text-xs"
            >
              ×
            </button>
          </div>
        )}

        {/* Couple Info */}
        <div className="pt-0.5 flex items-center justify-center gap-2 text-[11px] font-semibold text-[#2B6777]/80">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{lang === 'tr' ? 'Çift Deneyimi: Müge 👩 & Cihat 👨' : 'Couples Experience: Müge 👩 & Cihat 👨'}</span>
        </div>
      </div>

      {/* Manual PIN / Code Entry Modal */}
      <AnimatePresence>
        {showPairModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border-2 border-[#2B6777] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#E05A3D]" />
                  <h3 className="font-extrabold text-sm text-[#2B6777]">
                    Eşleşme Kodu ile Bağlan
                  </h3>
                </div>
                <button
                  onClick={() => setShowPairModal(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-stone-600 leading-relaxed">
                  Eşinizin ekranında görünen 6 haneli kodu veya PIN'i buraya girerek iki telefonu anında bağlayabilirsiniz.
                </p>

                {/* Who am I? */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 block">
                    Bu Telefon Kimin?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPersona('Cihat')}
                      className={`p-2.5 rounded-xl border-2 flex items-center justify-center gap-2 cursor-pointer font-bold text-xs transition-all ${
                        selectedPersona === 'Cihat'
                          ? 'border-[#2B6777] bg-[#2B6777]/10 text-[#2B6777]'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span>👨</span>
                      <span>Ben Cihat'ım</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPersona('Müge')}
                      className={`p-2.5 rounded-xl border-2 flex items-center justify-center gap-2 cursor-pointer font-bold text-xs transition-all ${
                        selectedPersona === 'Müge'
                          ? 'border-[#E05A3D] bg-[#E05A3D]/10 text-[#E05A3D]'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span>👩</span>
                      <span>Ben Müge'yim</span>
                    </button>
                  </div>
                </div>

                {/* Code input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 block">
                    Eşleşme Kodu (PIN)
                  </label>
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    placeholder="Örn: CRAVE-9821"
                    className="w-full px-3.5 py-2.5 text-center font-mono font-black text-lg tracking-wider rounded-xl border-2 border-[#2B6777] bg-stone-50 text-[#1A3B44] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPairModal(false);
                    handleQuickConnect(selectedPersona, inputCode || 'CRAVE-9821');
                  }}
                  className="w-full py-3 rounded-2xl bg-[#2B6777] hover:bg-[#204e5a] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{selectedPersona === 'Cihat' ? "Müge ile Eşleş ve Başla" : "Cihat ile Eşleş ve Başla"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPairModal(false)}
                  className="w-full py-2 text-stone-500 font-bold text-xs hover:text-stone-800 cursor-pointer"
                >
                  İptal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
