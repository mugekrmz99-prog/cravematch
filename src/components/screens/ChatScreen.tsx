import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Clock,
  Dices,
  ShoppingCart,
  Heart,
  Bell,
  CheckCheck,
  Sparkles,
  ChefHat,
  User,
  ArrowRight,
  Info,
  X
} from 'lucide-react';
import { UserProfile, ChatMessage, Language } from '../../types';
import { CraveLogo } from '../CraveLogo';
import { sound } from '../../utils/sound';
import { translations } from '../../utils/i18n';

interface ChatScreenProps {
  user: UserProfile;
  messages: ChatMessage[];
  lang?: Language;
  onSendMessage: (msg: ChatMessage) => void;
  onNavigateToTab?: (tab: 'dice' | 'cart' | 'swipes' | 'recipe' | 'profile') => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  user,
  messages,
  lang = 'tr',
  onSendMessage,
  onNavigateToTab
}) => {
  const t = translations[lang];
  const [inputText, setInputText] = useState('');
  const [activeSender, setActiveSender] = useState<'me' | 'partner'>('me');
  const [notificationToast, setNotificationToast] = useState<string | null>(null);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  const showToast = (text: string) => {
    setNotificationToast(text);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  const handleSendCustomText = () => {
    if (!inputText.trim()) return;
    sound.playTap();

    const senderRole = activeSender;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: senderRole,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    onSendMessage(newMsg);
    setInputText('');

    // If partner is not connected yet, show a gentle toast suggesting sharing the code
    if (!user.partner.isConnected && senderRole === 'me') {
      setTimeout(() => {
        showToast(
          lang === 'tr'
            ? `${user.partner.name} henüz bağlanmadı. QR veya PIN ile bağlanınca burada canlı sohbet edeceksiniz!`
            : lang === 'de'
            ? `${user.partner.name} ist noch nicht verbunden. Verbindet euch per QR oder PIN!`
            : `${user.partner.name} is not connected yet. Connect via QR or PIN!`
        );
      }, 1500);
    }
  };

  const handleSendQuickAlert = (type: 'timer_alert' | 'dice_alert' | 'cart_alert' | 'love_alert') => {
    sound.playTap();
    let text = '';
    let toast = '';

    if (type === 'timer_alert') {
      text =
        lang === 'tr'
          ? `⏰ ${user.partner.name}, zamanımız doluyor! Günün menüsü seçimini yap, geri sayım bitmek üzere!`
          : lang === 'de'
          ? `⏰ ${user.partner.name}, die Zeit läuft ab! Schließe deine Auswahl ab!`
          : `⏰ ${user.partner.name}, time is running out! Lock in your dinner picks before the countdown ends!`;
      toast = lang === 'tr' ? 'Zaman Doluyor bildirimi gönderildi ⏰' : lang === 'de' ? 'Timer-Benachrichtigung gesendet ⏰' : 'Timer alert sent ⏰';
    } else if (type === 'dice_alert') {
      text =
        lang === 'tr'
          ? `🎲 İkimiz de seçimlerimizi yaptık! Şimdi Karar Zarını atma zamanı, gel birlikte sallayalım!`
          : lang === 'de'
          ? `🎲 Beide Auswahlen stehen fest! Zeit, den Entscheidungswürfel zu rollen!`
          : `🎲 Both choices locked in! It’s time to roll the Decision Dice together!`;
      toast = lang === 'tr' ? 'Zar Zamanı bildirimi gönderildi 🎲' : lang === 'de' ? 'Würfel-Benachrichtigung gesendet 🎲' : 'Dice roll alert sent 🎲';
    } else if (type === 'cart_alert') {
      text =
        lang === 'tr'
          ? `🛒 Market sepetinde eksik malzemeler var! Yemeğin hazırlanması için alınması gerekiyor.`
          : lang === 'de'
          ? `🛒 Der Warenkorb hat noch offene Zutaten! Wir müssen sie einkaufen.`
          : `🛒 Grocery cart has pending items! We need to pick them up for dinner.`;
      toast = lang === 'tr' ? 'Sepet bildirimi gönderildi 🛒' : lang === 'de' ? 'Warenkorb-Benachrichtigung gesendet 🛒' : 'Cart alert sent 🛒';
    } else {
      text =
        lang === 'tr'
          ? `❤️ Akşam için nefis bir tarif seçtim, birlikte pişirelim mi?`
          : lang === 'de'
          ? `❤️ Ich habe ein leckeres Rezept ausgesucht, kochen wir zusammen?`
          : `❤️ Craving a delicious dinner together tonight! Ready to cook?`;
      toast = lang === 'tr' ? 'Lezzet çağrısı gönderildi ❤️' : lang === 'de' ? 'Kochen-Benachrichtigung gesendet ❤️' : 'Love alert sent ❤️';
    }

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: activeSender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: type === 'love_alert' ? 'text' : type
    };

    onSendMessage(newMsg);
    showToast(toast);

    // Partner acknowledgment
    setTimeout(() => {
      sound.playNotification();
      let partnerReply = '';
      if (type === 'timer_alert') {
        partnerReply =
          lang === 'tr'
            ? 'Hemen girip son seçimimi yapıyorum! 🏃‍♂️'
            : lang === 'de'
            ? 'Ich treffe sofort meine letzte Auswahl! 🏃‍♂️'
            : 'Jumping in right now! 🏃‍♂️';
      } else if (type === 'dice_alert') {
        partnerReply =
          lang === 'tr'
            ? 'Hazırım! Zar ekranını açıyorum, hadi atalım! 🎲✨'
            : lang === 'de'
            ? 'Ich bin bereit! Öffne den Würfel, los geht’s! 🎲✨'
            : 'Ready! Opening dice screen, let’s roll! 🎲✨';
      } else if (type === 'cart_alert') {
        partnerReply =
          lang === 'tr'
            ? 'Gördüm listeyi, eksikleri alıp hemen geliyorum! 🥦🛒'
            : lang === 'de'
            ? 'Habe die Liste gesehen, ich kaufe die Zutaten ein! 🥦🛒'
            : 'Checked the list, grabbing them on the way! 🥦🛒';
      } else {
        partnerReply =
          lang === 'tr'
            ? 'Tabii ki! Mutfakta şef yardımcın olmaya hazırım 👩‍🍳'
            : lang === 'de'
            ? 'Sehr gerne! Ich bin dein Beikoch in der Küche 👩‍🍳'
            : 'Always! Ready to be your sous-chef 👩‍🍳';
      }

      onSendMessage({
        id: `msg-${Date.now() + 1}`,
        sender: 'partner',
        text: partnerReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      });
      showToast(`${user.partner.name}: "${partnerReply}"`);
    }, 1300);
  };

  return (
    <div className="relative w-full h-full flex-1 flex flex-col justify-between bg-[#F7F5F2] px-3 pt-2 pb-2 select-none overflow-hidden">
      {/* Top Header with Partner Profile & Online Indicator */}
      <div className="flex items-center justify-between pb-2 px-1 border-b border-stone-200/80 bg-white/60 -mx-3 px-4 pt-1 backdrop-blur-xs">
        <div
          onClick={() => {
            sound.playTap();
            setShowPartnerModal(true);
          }}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <div className="relative">
            <img
              src={user.partner.avatarUrl}
              alt={user.partner.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#E05A3D] shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-black text-[#2B6777] text-sm tracking-tight font-['Outfit',sans-serif]">
                {user.partner.name}
              </h3>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-rose-100 text-rose-800 font-bold">
                {t.matchedTag}
              </span>
            </div>
            <div className="text-[10px] text-stone-500 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>{t.onlineBrowsing}</span>
            </div>
          </div>
        </div>

        {/* Sender Role Toggle for Real 2-Way Testing */}
        <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-[10px] font-bold">
          <button
            onClick={() => {
              sound.playTap();
              setActiveSender('me');
            }}
            className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
              activeSender === 'me' ? 'bg-[#2B6777] text-white shadow-2xs' : 'text-stone-600'
            }`}
            title="Benim kimliğimle yaz"
          >
            {user.name} {t.mePill}
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setActiveSender('partner');
            }}
            className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
              activeSender === 'partner' ? 'bg-[#E05A3D] text-white shadow-2xs' : 'text-stone-600'
            }`}
            title="Partnerim olarak yanıtla"
          >
            {user.partner.name}
          </button>
        </div>
      </div>

      {/* Floating Alert Toast */}
      <AnimatePresence>
        {notificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-14 left-4 right-4 z-40 p-2.5 rounded-2xl bg-[#1A3B44] text-white text-xs font-bold shadow-lg flex items-center justify-between border border-white/20"
          >
            <div className="flex items-center gap-2 truncate">
              <Bell className="w-4 h-4 text-[#F2A900] shrink-0" />
              <span className="truncate">{notificationToast}</span>
            </div>
            <button
              onClick={() => setNotificationToast(null)}
              className="text-stone-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUICK NOTIFICATION ACTION PILLS */}
      <div className="py-1.5 -mx-1 px-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => handleSendQuickAlert('timer_alert')}
            className="px-2.5 py-1.5 rounded-xl bg-orange-100/80 hover:bg-orange-200 text-orange-950 text-[11px] font-bold flex items-center gap-1.5 whitespace-nowrap shadow-2xs cursor-pointer border border-orange-200 active:scale-95 transition-all"
          >
            <Clock className="w-3.5 h-3.5 text-orange-600" />
            <span>{t.quickAlertTimeOut}</span>
          </button>

          <button
            onClick={() => handleSendQuickAlert('dice_alert')}
            className="px-2.5 py-1.5 rounded-xl bg-purple-100/80 hover:bg-purple-200 text-purple-950 text-[11px] font-bold flex items-center gap-1.5 whitespace-nowrap shadow-2xs cursor-pointer border border-purple-200 active:scale-95 transition-all"
          >
            <Dices className="w-3.5 h-3.5 text-purple-600" />
            <span>{t.quickAlertDiceTime}</span>
          </button>

          <button
            onClick={() => handleSendQuickAlert('cart_alert')}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-100/80 hover:bg-emerald-200 text-emerald-950 text-[11px] font-bold flex items-center gap-1.5 whitespace-nowrap shadow-2xs cursor-pointer border border-emerald-200 active:scale-95 transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.cartReadyAlert}</span>
          </button>

          <button
            onClick={() => handleSendQuickAlert('love_alert')}
            className="px-2.5 py-1.5 rounded-xl bg-rose-100/80 hover:bg-rose-200 text-rose-950 text-[11px] font-bold flex items-center gap-1.5 whitespace-nowrap shadow-2xs cursor-pointer border border-rose-200 active:scale-95 transition-all"
          >
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>{t.cookTogether}</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Scrollable Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-2.5 py-1.5 pr-0.5">
        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl shadow-xs text-xs font-semibold leading-relaxed relative ${
                  isMe
                    ? 'bg-[#2B6777] text-white rounded-tr-xs'
                    : 'bg-white text-[#1A3B44] border border-stone-200/90 rounded-tl-xs'
                }`}
              >
                {/* Special alert styling */}
                {msg.type === 'timer_alert' && (
                  <div className="flex items-center gap-1 text-[10px] font-extrabold text-amber-300 pb-1 border-b border-white/20 mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{t.quickAlertTimeOut}</span>
                  </div>
                )}
                {msg.type === 'dice_alert' && (
                  <div className="flex items-center gap-1 text-[10px] font-extrabold text-purple-200 pb-1 border-b border-white/20 mb-1">
                    <Dices className="w-3 h-3" />
                    <span>{t.decisionDice}</span>
                  </div>
                )}
                {msg.type === 'cart_alert' && (
                  <div className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-300 pb-1 border-b border-white/20 mb-1">
                    <ShoppingCart className="w-3 h-3" />
                    <span>{t.groceryList}</span>
                  </div>
                )}

                <p>{msg.text}</p>

                {/* Direct Action Link inside Alert */}
                {msg.type === 'dice_alert' && onNavigateToTab && (
                  <button
                    onClick={() => onNavigateToTab('dice')}
                    className="mt-2 w-full py-1.5 px-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-[10px] font-black flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Zarı Birlikte At</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                {msg.type === 'cart_alert' && onNavigateToTab && (
                  <button
                    onClick={() => onNavigateToTab('cart')}
                    className="mt-2 w-full py-1.5 px-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-[10px] font-black flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Sepeti Görüntüle</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                <div
                  className={`flex items-center justify-end gap-1 text-[9px] mt-1 ${
                    isMe ? 'text-white/70' : 'text-stone-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-[#F2A900]" />}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Message Input Bar */}
      <div className="pt-1 border-t border-stone-200/80 bg-white/60 -mx-3 px-3 pt-1 space-y-1">
        {/* Quick Romantic / Food Reaction Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {[
            '❤️ Harika seçim!',
            '🎲 Zarı atalım!',
            '🍕 Bu akşam pizza mı?',
            '🛒 Malzemeleri aldım',
            '👩‍🍳 Şef sensin!',
            '⏰ Yetişiyorum!'
          ].map((quick) => (
            <button
              key={quick}
              onClick={() => {
                sound.playTap();
                const newMsg: ChatMessage = {
                  id: `msg-${Date.now()}`,
                  sender: 'me',
                  text: quick,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  type: 'text'
                };
                onSendMessage(newMsg);
              }}
              className="px-2.5 py-0.5 rounded-full bg-white border border-stone-200 hover:border-[#2B6777] text-[10px] font-bold text-stone-700 whitespace-nowrap shadow-2xs cursor-pointer active:scale-95 transition-all"
            >
              {quick}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendCustomText()}
            placeholder={`${activeSender === 'me' ? user.name : user.partner.name} olarak yaz...`}
            className="flex-1 px-3 py-2 bg-white rounded-2xl border border-stone-300 text-xs font-semibold text-[#1A3B44] focus:outline-none focus:border-[#2B6777] shadow-2xs"
          />

          <button
            onClick={handleSendCustomText}
            className="w-9 h-9 rounded-2xl bg-[#E05A3D] text-white flex items-center justify-center shadow-xs hover:bg-[#cf4e33] active:scale-95 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PARTNER PROFILE POPUP MODAL */}
      <AnimatePresence>
        {showPartnerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-[320px] bg-white rounded-3xl p-4 shadow-2xl border border-stone-200 space-y-3 relative text-center"
            >
              <button
                onClick={() => setShowPartnerModal(false)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-18 h-18 rounded-full overflow-hidden border-3 border-[#E05A3D] shadow-md mx-auto">
                <img
                  src={user.partner.avatarUrl}
                  alt={user.partner.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-black text-[#2B6777] font-['Outfit',sans-serif]">
                  {user.partner.name}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold inline-block mt-0.5">
                  Çevrimiçi • Bağlı ✓
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-1">
                <div className="flex justify-between font-bold text-stone-600 text-[11px]">
                  <span>Eşleşme Kodu:</span>
                  <span className="font-mono text-[#2B6777]">{user.partner.pairCode || 'CRV-9821'}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-600 text-[11px]">
                  <span>Lezzet Uyumu:</span>
                  <span className="text-[#E05A3D]">%96 Mükemmel</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowPartnerModal(false);
                  if (onNavigateToTab) onNavigateToTab('profile');
                }}
                className="w-full py-2 bg-[#2B6777] text-white rounded-xl text-xs font-bold hover:bg-[#235866] cursor-pointer"
              >
                Profil Sayfasında İncele
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
