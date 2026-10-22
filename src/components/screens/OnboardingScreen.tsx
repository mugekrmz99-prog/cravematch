import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CraveLogo } from '../CraveLogo';
import { ThreeDDice } from '../ThreeDDice';
import { sound } from '../../utils/sound';
import { Language } from '../../types';
import { translations } from '../../utils/i18n';
import {
  KeyRound,
  Heart,
  Info,
  X,
  Check,
  Sparkles,
  Smartphone,
  Download,
  QrCode,
  Copy,
  Share2,
  Wifi
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { getBestPairingUrl } from '../../utils/pairingUrl';
import { pairingSync } from '../../utils/pairingSync';

interface OnboardingScreenProps {
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onStart: (name?: string) => void;
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
  const [showQrModal, setShowQrModal] = useState(false);
  const [inputCode, setInputCode] = useState('CRAVE-9821');
  const [inputName, setInputName] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedUserStr = localStorage.getItem('cravematch_user');
      if (savedUserStr) {
        try {
          const parsed = JSON.parse(savedUserStr);
          if (parsed?.name) return parsed.name;
        } catch {}
      }
    }
    return '';
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [preferWifi, setPreferWifi] = useState(false);

  const [networkInfo, setNetworkInfo] = useState<{ localUrl: string; tunnelUrl?: string } | null>(
    null
  );

  useEffect(() => {
    pairingSync.fetchNetworkInfo().then((info) => {
      if (info) setNetworkInfo(info);
    });
  }, []);

  const handleStart = () => {
    sound.playTap();
    const cleanName = inputName.trim();
    onStart(cleanName);
  };

  const handleJoinWithCode = () => {
    sound.playSuccess();
    const cleanCode = inputCode.trim().toUpperCase() || 'CRAVE-9821';
    const cleanName = inputName.trim() || (lang === 'tr' ? 'Misafir' : 'Guest');
    if (onPairWithCode) {
      onPairWithCode(cleanCode, cleanName, '');
    } else {
      onSignIn();
    }
    setShowPairModal(false);
  };

  const livePairUrl = getBestPairingUrl(inputCode || 'CRAVE-9821', inputName, preferWifi);

  const handleCopyLink = () => {
    sound.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(livePairUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    sound.playTap();
    const text = encodeURIComponent(
      lang === 'tr'
        ? `CraveMatch üzerinden bu akşam ne yiyeceğimizi seçelim! Bağlantıya tıkla: ${livePairUrl}`
        : lang === 'de'
        ? `Lass uns bei CraveMatch gemeinsam das Abendessen wählen! Hier klicken: ${livePairUrl}`
        : `Let's decide dinner together on CraveMatch! Connect here: ${livePairUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="relative w-full h-full flex-1 flex flex-col justify-between items-center px-4 py-3 bg-[#F7F5F2] overflow-y-auto no-scrollbar select-none">
      {/* Background soft ambiance glows */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-[#E05A3D]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Language Switcher Bar & Logo */}
      <div className="w-full flex flex-col items-center gap-1.5 z-10 shrink-0">
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center mt-0.5"
        >
          <CraveLogo size="sm" layout="vertical" />
        </motion.div>
      </div>

      {/* Center 3D Floating Elements */}
      <div className="relative w-full max-w-[280px] h-[160px] flex items-center justify-center my-auto shrink-0">
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [-4, 4, -4]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="cursor-pointer"
          onClick={() => sound.playDiceRoll()}
        >
          <ThreeDDice size={95} targetFace={5} isRolling={false} />
        </motion.div>

        {/* Floating Chef Hat */}
        <motion.div
          animate={{
            y: [5, -10, 5],
            x: [0, 5, 0]
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2
          }}
          className="absolute -top-1 left-4 p-2 bg-white/95 rounded-2xl shadow-md border border-stone-200"
        >
          <span className="text-xl">👩‍🍳</span>
        </motion.div>

        {/* Floating Flame / Sparkle badge */}
        <motion.div
          animate={{
            y: [-5, 8, -5],
            x: [0, -4, 0]
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
          className="absolute -bottom-1 right-4 p-2 bg-white/95 rounded-2xl shadow-md border border-stone-200"
        >
          <span className="text-xl">🔥</span>
        </motion.div>
      </div>

      {/* Typography & Call to Action */}
      <div className="w-full max-w-[350px] flex flex-col items-center text-center space-y-2.5 pb-2 z-10 shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-0.5"
        >
          <h1 className="text-xl sm:text-2xl font-black text-[#2B6777] tracking-tight font-['Outfit',sans-serif]">
            {t.tagline}
          </h1>
          <p className="text-[11px] font-medium text-[#1A3B44]/80 px-2 leading-tight">
            {t.subtagline}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full space-y-2"
        >
          {/* User Name Input Card */}
          <div className="w-full text-left space-y-1 bg-white/90 p-2.5 rounded-2xl border border-stone-200/90 shadow-2xs">
            <label className="text-[11px] font-black text-[#1A3B44] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="text-[#E05A3D]">👤</span>
                <span>{lang === 'tr' ? 'Adınız / Takma Adınız' : lang === 'de' ? 'Dein Name' : 'Your Name'}</span>
              </span>
              <span className="text-[10px] text-stone-400 font-bold">
                {lang === 'tr' ? 'Zorunlu' : 'Required'}
              </span>
            </label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder={lang === 'tr' ? 'Örn: Can, Deniz, Cihat, Müge...' : 'e.g. Alex, Sam...'}
              className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-stone-300 bg-stone-50 text-[#1A3B44] focus:bg-white focus:outline-none focus:border-[#2B6777] focus:ring-1 focus:ring-[#2B6777]/30 transition-all"
            />
          </div>

          {/* Main Primary CTA */}
          <button
            type="button"
            onClick={handleStart}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#E05A3D] to-[#e86c52] hover:opacity-95 active:scale-[0.98] text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🍽️</span>
            <span>{t.startDinnerTable}</span>
            <span>→</span>
          </button>

          {/* Secondary Action Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* QR Code Connect Button */}
            <button
              type="button"
              onClick={() => {
                sound.playTap();
                setShowQrModal(true);
              }}
              className="py-2.5 px-3 rounded-xl bg-white border border-stone-200 hover:border-[#2B6777] active:scale-[0.98] text-[#2B6777] font-extrabold text-[11px] shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-[#E05A3D]" />
              <span>{t.connectViaQr}</span>
            </button>

            {/* Manual PIN / Code Option */}
            <button
              type="button"
              onClick={() => {
                sound.playTap();
                setShowPairModal(true);
              }}
              className="py-2.5 px-3 rounded-xl bg-white border border-stone-200 hover:border-[#2B6777] active:scale-[0.98] text-[#2B6777] font-extrabold text-[11px] shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#E05A3D]" />
              <span>{t.enterTablePin}</span>
            </button>
          </div>
        </motion.div>

        {/* Live Status indicator */}
        <div className="pt-0.5 flex items-center justify-center gap-2 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{t.liveDbSyncActive}</span>
        </div>
      </div>

      {/* QR CODE MODAL FOR MOBILE CAMERA SCANNING */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border-2 border-[#2B6777] space-y-3.5"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-[#E05A3D]" />
                  <h3 className="font-extrabold text-sm text-[#2B6777]">
                    {t.openAndPairOnPhone}
                  </h3>
                </div>
                <button
                  onClick={() => setShowQrModal(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-center">
                <p className="text-xs text-stone-600 leading-snug">
                  {t.scanQrWithCameraDesc}
                </p>

                {/* QR Code Container */}
                <div className="mx-auto w-44 p-2.5 bg-white rounded-2xl shadow-inner border-2 border-[#2B6777] flex flex-col items-center justify-center">
                  <QRCodeSVG
                    value={livePairUrl}
                    size={155}
                    fgColor="#1A3B44"
                    bgColor="#FFFFFF"
                    level="M"
                  />
                </div>

                {/* Connection Mode Toggle */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <button
                    onClick={() => {
                      sound.playTap();
                      setPreferWifi(true);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 border cursor-pointer ${
                      preferWifi
                        ? 'bg-[#2B6777] text-white border-[#2B6777]'
                        : 'bg-stone-100 text-stone-600 border-stone-300'
                    }`}
                  >
                    <Wifi className="w-3 h-3" />
                    <span>{t.homeWifi}</span>
                  </button>
                  <button
                    onClick={() => {
                      sound.playTap();
                      setPreferWifi(false);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 border cursor-pointer ${
                      !preferWifi
                        ? 'bg-[#2B6777] text-white border-[#2B6777]'
                        : 'bg-stone-100 text-stone-600 border-stone-300'
                    }`}
                  >
                    <span>🌐 {t.internetTunnel}</span>
                  </button>
                </div>

                <div className="text-[10px] text-stone-500 font-mono break-all px-2 bg-stone-50 py-1 rounded-lg border border-stone-200">
                  {livePairUrl}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleCopyLink}
                    className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-stone-300"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedLink ? t.codeCopied : t.copyLink}</span>
                  </button>

                  <button
                    onClick={handleShareWhatsApp}
                    className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    {t.joinByCodeTitle}
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
                  {t.joinByCodeDesc}
                </p>

                {/* Name input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 block">
                    {t.yourNameLabel}
                  </label>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-stone-300 bg-white text-[#1A3B44] focus:outline-none focus:border-[#2B6777]"
                  />
                </div>

                {/* Code input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 block">
                    {t.tableCodeLabel}
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
                  onClick={handleJoinWithCode}
                  className="w-full py-3 rounded-2xl bg-[#2B6777] hover:bg-[#204e5a] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{t.joinTableAndStart}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPairModal(false)}
                  className="w-full py-2 text-stone-500 font-bold text-xs hover:text-stone-800 cursor-pointer"
                >
                  {t.cancel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
