import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Smartphone, Monitor } from 'lucide-react';
import { sound } from '../utils/sound';
import { Language } from '../types';
import { translations } from '../utils/i18n';

interface DeviceFrameProps {
  children: React.ReactNode;
  activeTabTitle?: string;
  lang?: Language;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, activeTabTitle, lang = 'tr' }) => {
  const t = translations[lang];
  // Check if we are on a mobile device or screen width < 500
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isFrameMode, setIsFrameMode] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      const mobile = window.innerWidth <= 480;
      setIsMobileScreen(mobile);
      if (mobile) {
        setIsFrameMode(false); // natively fill screen on mobile devices
      }
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const toggleMute = () => {
    sound.enabled = !sound.enabled;
    setIsMuted(!sound.enabled);
  };

  return (
    <div className={`w-full min-h-[100dvh] h-[100dvh] flex flex-col items-center justify-start select-none overflow-hidden ${
      isFrameMode && !isMobileScreen ? 'bg-[#EAE7E1] py-3 px-2' : 'bg-[#F7F5F2] p-0'
    }`}>
      {/* Top Controls Bar (shown on desktop or frame mode for easy testing) */}
      {!isMobileScreen && (
        <header className="w-full max-w-sm mb-2 flex items-center justify-between px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-stone-300 shadow-2xs text-xs shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[#2B6777] font-['Outfit',sans-serif]">
              CraveMatch
            </span>
            <span className="text-[10px] bg-[#E05A3D]/10 text-[#E05A3D] font-bold px-2 py-0.5 rounded-full">
              Mobile App
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              onClick={toggleMute}
              className={`p-1 rounded-xl border transition-colors cursor-pointer ${
                isMuted
                  ? 'bg-rose-50 border-rose-200 text-rose-500'
                  : 'bg-white border-stone-200 text-[#2B6777]'
              }`}
              title={isMuted ? t.soundOn : t.soundOff}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Frame Switcher */}
            <button
              onClick={() => setIsFrameMode(!isFrameMode)}
              className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white border border-stone-200 text-[#2B6777] font-bold hover:bg-stone-50 transition-all cursor-pointer text-[10px]"
              title={t.toggleView}
            >
              {isFrameMode ? (
                <>
                  <Monitor className="w-3 h-3" />
                  <span>{t.fullScreen}</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3 h-3" />
                  <span>{t.deviceFrame}</span>
                </>
              )}
            </button>
          </div>
        </header>
      )}

      {/* Main Container - iPhone Mockup or Native Mobile Full Screen */}
      <main
        className={`transition-all duration-300 relative flex flex-col overflow-hidden ${
          isFrameMode && !isMobileScreen
            ? 'w-full max-w-[390px] h-[844px] max-h-[92vh] rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-[10px] border-[#252528] ring-1 ring-black/40 bg-[#F7F5F2]'
            : 'w-full max-w-md md:max-w-none h-[100dvh] min-h-[100dvh] bg-[#F7F5F2]'
        }`}
      >
        {/* Dynamic Island & Status Bar (in Frame mode) */}
        {isFrameMode && !isMobileScreen && (
          <div className="w-full h-10 shrink-0 px-7 flex items-center justify-between text-black text-xs font-bold pt-1.5 select-none z-40 bg-[#F7F5F2]">
            <span className="text-[13px] font-semibold tracking-tight">9:41</span>

            {/* Dynamic Island pill */}
            <div className="w-24 h-5.5 bg-black rounded-full mx-auto flex items-center justify-between px-2.5">
              <span className="w-2 h-2 rounded-full bg-stone-900 border border-stone-800" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Status Icons: Cellular, WiFi, Battery */}
            <div className="flex items-center gap-1 text-stone-900">
              <svg className="w-3 h-2.5" viewBox="0 0 16 12" fill="currentColor">
                <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
                <rect x="4.5" y="5.5" width="2.5" height="6.5" rx="0.5" />
                <rect x="9" y="3" width="2.5" height="9" rx="0.5" />
                <rect x="13.5" y="0.5" width="2.5" height="11.5" rx="0.5" />
              </svg>
              <div className="w-4.5 h-2 rounded-sm border border-black p-0.5 flex items-center">
                <div className="w-full h-full bg-black rounded-[1px]" />
              </div>
            </div>
          </div>
        )}

        {/* Inner App Content Screen */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>

        {/* iPhone Home Indicator bar at bottom in Frame mode */}
        {isFrameMode && !isMobileScreen && (
          <div className="w-full h-4 shrink-0 flex items-center justify-center bg-[#F7F5F2] select-none pointer-events-none pb-1">
            <div className="w-28 h-1 bg-black/80 rounded-full" />
          </div>
        )}
      </main>
    </div>
  );
};
