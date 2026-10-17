import React from 'react';
import { Dices, ShoppingCart, User, MessageCircle } from 'lucide-react';
import { ScreenTab, Language } from '../types';
import { sound } from '../utils/sound';
import { translations } from '../utils/i18n';

interface BottomNavBarProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  cartCount?: number;
  unreadChatCount?: number;
  lang?: Language;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onTabChange,
  cartCount = 0,
  unreadChatCount = 1,
  lang = 'tr'
}) => {
  const t = translations[lang];

  const tabs = [
    {
      id: 'swipes' as ScreenTab,
      label: t.swipesTab,
      icon: (active: boolean) => (
        <div className="relative w-5 h-5 flex items-center justify-center">
          <div
            className={`absolute w-3 h-4 rounded-[2.5px] -rotate-12 transition-all ${
              active ? 'bg-[#2B6777]' : 'bg-stone-400'
            }`}
          />
          <div
            className={`absolute w-3 h-4 rounded-[2.5px] rotate-12 transition-all ${
              active ? 'bg-[#E05A3D]' : 'bg-stone-500'
            }`}
          />
        </div>
      )
    },
    {
      id: 'dice' as ScreenTab,
      label: t.diceTab,
      icon: (active: boolean) => (
        <Dices
          className={`w-5 h-5 transition-all ${
            active ? 'text-[#2B6777] stroke-[2.5]' : 'text-stone-400 stroke-[1.8]'
          }`}
        />
      )
    },
    {
      id: 'cart' as ScreenTab,
      label: t.cartTab,
      badge: cartCount > 0 ? cartCount : undefined,
      icon: (active: boolean) => (
        <ShoppingCart
          className={`w-5 h-5 transition-all ${
            active ? 'text-[#2B6777] stroke-[2.5]' : 'text-stone-400 stroke-[1.8]'
          }`}
        />
      )
    },
    {
      id: 'chat' as ScreenTab,
      label: t.chatTab,
      badge: unreadChatCount > 0 ? unreadChatCount : undefined,
      icon: (active: boolean) => (
        <MessageCircle
          className={`w-5 h-5 transition-all ${
            active ? 'text-[#2B6777] stroke-[2.5]' : 'text-stone-400 stroke-[1.8]'
          }`}
        />
      )
    },
    {
      id: 'profile' as ScreenTab,
      label: t.profileTab,
      icon: (active: boolean) => (
        <User
          className={`w-5 h-5 transition-all ${
            active ? 'text-[#2B6777] stroke-[2.5]' : 'text-stone-400 stroke-[1.8]'
          }`}
        />
      )
    }
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="w-full bg-[#F7F5F2] border-t border-stone-200/90 px-3 py-1.5 flex items-center justify-between select-none z-30"
    >
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              sound.playTap();
              onTabChange(tab.id);
            }}
            className="flex-1 flex flex-col items-center justify-center py-0.5 relative group cursor-pointer"
          >
            <div className="relative">
              {tab.icon(isActive)}
              {tab.badge !== undefined && (
                <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-[#E05A3D] text-white text-[9px] font-black leading-tight shadow-2xs">
                  {tab.badge}
                </span>
              )}
            </div>

            <span
              className={`text-[10px] font-bold mt-0.5 transition-colors ${
                isActive ? 'text-[#2B6777]' : 'text-stone-400 group-hover:text-stone-600'
              }`}
            >
              {tab.label}
            </span>

            {/* Active indicator dot */}
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-[#2B6777] mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
