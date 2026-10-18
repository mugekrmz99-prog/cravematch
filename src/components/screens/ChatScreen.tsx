import React, { useState, useEffect, useRef } from 'react';
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
  ArrowRight,
  X,
  Share2
} from 'lucide-react';
import { UserProfile, ChatMessage, Language } from '../../types';
import { sound } from '../../utils/sound';
import { translations } from '../../utils/i18n';

interface ChatScreenProps {
  user: UserProfile;
  messages: ChatMessage[];
  lang?: Language;
  onSendMessage: (msg: ChatMessage) => void;
  onSendReaction?: (type: 'heart' | 'rose', messageId?: string) => void;
  onNavigateToTab?: (tab: 'dice' | 'todaysMeal' | 'swipes' | 'recipe' | 'profile' | 'cart') => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  user,
  messages,
  lang = 'tr',
  onSendMessage,
  onSendReaction,
  onNavigateToTab
}) => {
  const t = translations[lang];
  const [inputText, setInputText] = useState('');
  const [notificationToast, setNotificationToast] = useState<string | null>(null);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const showToast = (text: string) => {
    setNotificationToast(text);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleSendCustomText = () => {
    if (!inputText.trim()) return;
    sound.playTap();

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender: 'me',
      author: user.name || (lang === 'tr' ? 'Ben' : 'Me'),
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    onSendMessage(newMsg);
    setInputText('');
  };

  const handleSendQuickAlert = (type: 'timer_alert' | 'dice_alert' | 'cart_alert' | 'love_alert') => {
    sound.playTap();
    let text = '';
    let toast = '';

    const partnerDisplayName = user.partner.name || (lang === 'tr' ? 'Aşkım' : 'Honey');

    if (type === 'timer_alert') {
      text =
        lang === 'tr'
          ? `⏰ ${partnerDisplayName}, zamanımız doluyor! Günün menüsü seçimini yap, geri sayım bitmek üzere!`
          : lang === 'de'
          ? `⏰ ${partnerDisplayName}, die Zeit läuft ab! Schließe deine Auswahl ab!`
          : `⏰ ${partnerDisplayName}, time is running out! Lock in your dinner picks before the countdown ends!`;
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
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender: 'me',
      author: user.name || (lang === 'tr' ? 'Ben' : 'Me'),
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: type === 'love_alert' ? 'text' : type
    };

    onSendMessage(newMsg);
    showToast(toast);
  };

  const partnerHasJoined = user.partner.isConnected && Boolean(user.partner.name);

  return (
    <div className="relative w-full h-full flex-1 flex flex-col justify-between bg-[#F7F5F2] px-3 pt-2 pb-2 select-none overflow-hidden">
      {/* Top Header with Partner Profile & Online Indicator */}
      <div className="flex items-center justify-between pb-2 px-1 border-b border-stone-200/80 bg-white/70 -mx-3 px-4 pt-1 backdrop-blur-xs">
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
              alt={user.partner.name || 'Partner'}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#E05A3D] shadow-xs"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                partnerHasJoined ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-black text-[#2B6777] text-sm tracking-tight font-['Outfit',sans-serif]">
                {user.partner.name || (lang === 'tr' ? 'Partner Bekleniyor...' : 'Awaiting Partner...')}
              </h3>
              {partnerHasJoined && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                  {lang === 'tr' ? 'Canlı Bağlı' : 'Live Connected'}
                </span>
              )}
            </div>
            <div className="text-[10px] text-stone-500 flex items-center gap-1 font-semibold">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  partnerHasJoined ? 'bg-emerald-500' : 'bg-amber-400'
                }`}
              />
              <span>
                {partnerHasJoined
                  ? t.onlineBrowsing
                  : `${lang === 'tr' ? 'Masa Kodu' : 'Table Code'}: ${user.partner.pairCode || 'CRAVE-9821'}`}
              </span>
            </div>
          </div>
        </div>

        {/* Invite / Info Pill */}
        <button
          onClick={() => setShowPartnerModal(true)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold text-[#2B6777] shadow-2xs hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-[#E05A3D]" />
          <span>{lang === 'tr' ? 'QR / Davet' : 'QR / Invite'}</span>
        </button>
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
              className="text-stone-400 hover:text-white cursor-pointer"
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
            <span>{t.whatToEatAlert}</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-2.5 py-2 px-1">
        {messages.map((msg) => {
          const isSystem = msg.sender === 'system';
          const isMe = msg.sender === 'me';

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-1">
                <span className="px-3 py-1 rounded-full bg-stone-200/80 text-stone-600 text-[10px] font-medium text-center">
                  {msg.text}
                </span>
              </div>
            );
          }

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {!isMe && (
                <img
                  src={user.partner.avatarUrl}
                  alt={user.partner.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#2B6777] mb-1"
                />
              )}

              <div
                className={`max-w-[78%] rounded-2xl p-3 shadow-xs ${
                  isMe
                    ? 'bg-[#2B6777] text-white rounded-br-xs'
                    : 'bg-white text-stone-800 rounded-bl-xs border border-stone-200/80'
                }`}
              >
                {!isMe && (
                  <div className="text-[10px] font-bold text-[#E05A3D] mb-0.5">
                    {msg.author || user.partner.name || (lang === 'tr' ? 'Partner' : 'Partner')}
                  </div>
                )}

                <p className="text-xs font-medium leading-relaxed">{msg.text}</p>

                {/* Rich Kitchen Photo Preview */}
                {msg.photoUrl && (
                  <div className="relative my-2 rounded-xl overflow-hidden border border-white/20 shadow-md group">
                    <img
                      src={msg.photoUrl}
                      alt="Mutfak fotoğrafı"
                      onClick={() => {
                        sound.playSuccess();
                        if (onSendReaction) onSendReaction('heart', msg.id);
                      }}
                      className="w-full max-h-56 object-cover cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform select-none"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold flex items-center gap-1 pointer-events-none">
                      <span>📸</span>
                      <span>{lang === 'tr' ? 'Mutfaktan Canlı' : 'Live from Kitchen'}</span>
                    </div>

                    <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-white/95 text-[#E05A3D] text-[9px] font-black shadow-xs pointer-events-none animate-pulse">
                      {lang === 'tr' ? 'Dokun & Kalp Gönder ❤️' : 'Tap to send love ❤️'}
                    </div>
                  </div>
                )}

                {/* Reaction buttons for photo message */}
                {msg.photoUrl && (
                  <div className="flex items-center gap-2 pt-1 pb-1">
                    <button
                      onClick={() => {
                        sound.playSuccess();
                        if (onSendReaction) onSendReaction('heart', msg.id);
                      }}
                      className="flex-1 py-1 px-2 rounded-xl bg-white/25 hover:bg-white/40 active:scale-95 text-white font-black text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/30 shadow-2xs"
                    >
                      <span className="text-sm">❤️</span>
                      <span>{lang === 'tr' ? 'Kalp' : 'Heart'}</span>
                      {Number(msg.heartsCount || 0) > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                          {msg.heartsCount}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        sound.playSuccess();
                        if (onSendReaction) onSendReaction('rose', msg.id);
                      }}
                      className="flex-1 py-1 px-2 rounded-xl bg-white/25 hover:bg-white/40 active:scale-95 text-white font-black text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/30 shadow-2xs"
                    >
                      <span className="text-sm">🌹</span>
                      <span>{lang === 'tr' ? 'Gül' : 'Rose'}</span>
                      {Number(msg.rosesCount || 0) > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-bold">
                          {msg.rosesCount}
                        </span>
                      )}
                    </button>
                  </div>
                )}

                {msg.type === 'dice_alert' && onNavigateToTab && (
                  <button
                    onClick={() => onNavigateToTab('dice')}
                    className="mt-2 w-full py-1.5 px-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-[10px] font-black flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{t.decisionDice || 'Karar Zarı'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                {msg.type === 'cart_alert' && onNavigateToTab && (
                  <button
                    onClick={() => onNavigateToTab('todaysMeal')}
                    className="mt-2 w-full py-1.5 px-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-[10px] font-black flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{lang === 'tr' ? 'Bugün Ne Yiyeceğiz?' : "Today's Meal"}</span>
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
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input Bar */}
      <div className="pt-1 border-t border-stone-200/80 bg-white/70 -mx-3 px-3 pt-1 space-y-1 backdrop-blur-xs">
        {/* Quick Reaction Pills */}
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
                  id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                  sender: 'me',
                  author: user.name || (lang === 'tr' ? 'Ben' : 'Me'),
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
            placeholder={t.typeMessagePlaceholder || 'Partnerine bir mesaj yaz...'}
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

      {/* PARTNER PROFILE / INVITE MODAL */}
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
                  alt={user.partner.name || 'Partner'}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-black text-[#2B6777] font-['Outfit',sans-serif]">
                  {user.partner.name || (lang === 'tr' ? 'Partner Bekleniyor' : 'Awaiting Partner')}
                </h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold inline-block mt-0.5 ${
                    partnerHasJoined
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {partnerHasJoined ? 'Çevrimiçi • Bağlı ✓' : 'Bağlantı Bekleniyor'}
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-1.5">
                <div className="flex justify-between font-bold text-stone-600 text-[11px]">
                  <span>{lang === 'tr' ? 'Masa Kodu (PIN):' : 'Table PIN:'}</span>
                  <span className="font-mono text-[#2B6777] font-black">{user.partner.pairCode || 'CRAVE-9821'}</span>
                </div>
                <div className="text-[10px] text-stone-500 leading-tight">
                  {lang === 'tr'
                    ? 'Eşiniz bu kodu girerek veya WhatsApp bağlantısını açarak doğrudan masaya bağlanabilir.'
                    : 'Your partner can join directly by entering this code or opening the invite link.'}
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playSuccess();
                  const shareUrl = `${window.location.origin}${window.location.pathname}?pair=${encodeURIComponent(
                    user.partner.pairCode || 'CRAVE-9821'
                  )}&inviter=${encodeURIComponent(user.name || 'Partner')}`;
                  navigator.clipboard?.writeText(shareUrl);
                  showToast(lang === 'tr' ? 'Davet bağlantısı kopyalandı! 📋' : 'Invite link copied! 📋');
                  setShowPartnerModal(false);
                }}
                className="w-full py-2 bg-[#2B6777] text-white rounded-xl text-xs font-bold hover:bg-[#235866] cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{lang === 'tr' ? 'Davet Bağlantısını Kopyala' : 'Copy Invite Link'}</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
