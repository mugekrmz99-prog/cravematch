import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import {
  X,
  Globe,
  PlusCircle,
  FileSpreadsheet,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Share2,
  Check,
  AlertTriangle,
  KeyRound,
  CheckCircle2,
  Folder
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, UserProfile, Dish } from '../types';
import { translations } from '../utils/i18n';
import { sound } from '../utils/sound';
import { CsvDatabaseManager } from './CsvDatabaseManager';
import { getPublicPairingUrl } from '../utils/pairingUrl';
import { pairingSync } from '../utils/pairingSync';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  user: UserProfile;
  dishes: Dish[];
  onAddCustomDish: (dish: Dish) => void;
  onImportDishesFromCSV: (dishes: Dish[]) => void;
  onResetAllData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectLang,
  user,
  dishes,
  onAddCustomDish,
  onImportDishesFromCSV,
  onResetAllData
}) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'general' | 'addDish' | 'sheets' | 'qr'>('sheets');
  const [showResetConfirmDialog, setShowResetConfirmDialog] = useState(false);
  const [partnerConnectedInModal, setPartnerConnectedInModal] = useState(user.partner.isConnected);

  // Custom Dish Form
  const [dishTitle, setDishTitle] = useState('');
  const [dishSubtitle, setDishSubtitle] = useState('');
  const [dishPrepTime, setDishPrepTime] = useState('25 dk');
  const [dishCategory, setDishCategory] = useState('Vegetarian');
  const [dishImage, setDishImage] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80');
  const [dishIngredientsText, setDishIngredientsText] = useState('200g Domates, 100g Peynir, 1 demet Fesleğen');
  const [dishAddedNotification, setDishAddedNotification] = useState(false);

  const handleCreateDish = () => {
    if (!dishTitle.trim()) return;
    sound.playSuccess();

    const ingredients = dishIngredientsText.split(',').map((item) => ({
      name: item.trim(),
      amount: 100,
      unit: 'g',
      category: 'Pantry'
    }));

    const newDish: Dish = {
      id: `custom-${Date.now()}`,
      title: dishTitle.trim(),
      subtitle: dishSubtitle.trim() || 'Özel mutfak tarifi',
      description: dishSubtitle.trim() || 'Ev yapımı nefis lezzet.',
      image: dishImage,
      prepTime: dishPrepTime,
      prepTimeMinutes: 25,
      difficulty: 'Easy',
      rating: 5.0,
      reviewCount: 1,
      tags: [dishCategory, 'Custom Recipe'],
      allergens: [],
      basePortions: 2,
      matchScore: 100,
      partnerLiked: true,
      isCustom: true,
      ingredients: ingredients.length > 0 ? ingredients : [{ name: 'Temel Malzeme', amount: 1, unit: 'adet' }],
      steps: [
        { id: 1, title: 'Malzemeleri Hazırla', description: 'Tüm malzemeleri yıkayıp doğrayın.', chef: 'chef1', chefName: user.name, durationMins: 5 },
        { id: 2, title: 'Pişir ve Servis Et', description: 'Birlikte tavada pişirip taze servis yapın.', chef: 'chef2', chefName: user.partner.name, durationMins: 15 }
      ]
    };

    onAddCustomDish(newDish);
    setDishAddedNotification(true);
    setTimeout(() => setDishAddedNotification(false), 2500);
    setDishTitle('');
    setDishSubtitle('');
  };

  const pairCode = user.partner.pairCode || 'CRAVE-9821';
  const inviteUrl = getPublicPairingUrl(pairCode, user.name || 'Müge', 'Cihat');

  const handleShareWhatsApp = () => {
    sound.playTap();
    const msg = encodeURIComponent(
      lang === 'tr'
        ? `CraveMatch'te bu akşam ne yiyeceğimizi birlikte seçelim! Eşleşme Kodumuz: ${pairCode}\nBağlantıya tıkla: ${inviteUrl}`
        : `Let's decide dinner together on CraveMatch! Pair Code: ${pairCode}\nConnect here: ${inviteUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  const handleOpenAsPartnerInNewTab = () => {
    sound.playTap();
    window.open(inviteUrl, '_blank');
  };

  const handleSimulatePartnerConnect = () => {
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
    setPartnerConnectedInModal(true);
    pairingSync.broadcast('PARTNER_CONNECTED', 'Cihat', { name: 'Cihat', pairCode });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs select-none">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-[360px] bg-[#F7F5F2] rounded-3xl shadow-2xl border-2 border-[#2B6777]/30 flex flex-col overflow-hidden max-h-[88vh]"
      >
        {/* Modal Header */}
        <div className="px-4 py-3 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E05A3D]" />
            <h3 className="font-extrabold text-[#2B6777] text-sm font-['Outfit',sans-serif]">
              {t.settings}
            </h3>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex items-center bg-stone-100/90 border-b border-stone-200 p-1 text-[11px] font-bold">
          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('sheets');
            }}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'sheets' ? 'bg-white text-[#2B6777] shadow-2xs' : 'text-stone-500'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>CSV / Menü</span>
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('qr');
            }}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'qr' ? 'bg-white text-[#2B6777] shadow-2xs' : 'text-stone-500'
            }`}
          >
            QR & Eşleşme
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('addDish');
            }}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'addDish' ? 'bg-white text-[#2B6777] shadow-2xs' : 'text-stone-500'
            }`}
          >
            + Tek Yemek
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('general');
            }}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'general' ? 'bg-white text-[#2B6777] shadow-2xs' : 'text-stone-500'
            }`}
          >
            {lang === 'tr' ? 'Genel' : 'General'}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-3.5 overflow-y-auto no-scrollbar space-y-3 flex-1">
          {/* TAB 1: CSV DATABASE & GOOGLE SHEETS & FOLDER SYSTEM */}
          {activeTab === 'sheets' && (
            <CsvDatabaseManager
              dishes={dishes}
              lang={lang}
              onUpdateDishes={(newDishes) => {
                onImportDishesFromCSV(newDishes);
              }}
            />
          )}

          {/* TAB 2: QR & PAIRING CODE WITH RELIABLE LOCALHOST FIX */}
          {activeTab === 'qr' && (
            <div className="space-y-3 text-center">
              <div>
                <h4 className="font-extrabold text-[#2B6777] text-sm">
                  Partner QR & Eşleşme
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Eşinizle aynı hesapta bağlanmak için QR veya kodu kullanın
                </p>
              </div>

              {/* High Contrast Crisp QR Code */}
              <div className="relative w-40 h-40 mx-auto p-2 bg-white rounded-2xl shadow-sm border-2 border-[#2B6777] flex items-center justify-center">
                <QRCodeSVG
                  value={inviteUrl}
                  size={140}
                  fgColor="#1A3B44"
                  bgColor="#FFFFFF"
                  level="Q"
                  includeMargin={true}
                />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-[#2B6777] text-[8px] font-black text-white flex items-center gap-1 shadow-2xs">
                  <span>Bulut Canlı</span>
                </div>
              </div>

              {/* Prominent Pair PIN Code */}
              <div className="flex items-center justify-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-white border border-[#2B6777]/30 shadow-2xs flex items-center gap-2">
                  <KeyRound className="w-3.5 h-3.5 text-[#E05A3D]" />
                  <span className="text-xs font-mono font-black text-[#2B6777] tracking-wider">
                    {pairCode}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-center">
                {partnerConnectedInModal ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    <span>{user.partner.name} Bağlandı! ✓</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <span>Bağlantı Bekleniyor</span>
                  </span>
                )}
              </div>

              {/* Explanatory Callout */}
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[10px] text-emerald-950 text-left leading-tight space-y-1">
                <div className="font-extrabold text-[#2B6777] flex items-center gap-1">
                  <span>✨</span>
                  <span>Canlı Bağlantı Hazır:</span>
                </div>
                <p>
                  QR kod artık doğrudan internet bulut bağlantısını taşır. Eşiniz iPhone veya Android kamerasıyla okuttuğunda telefon hata vermeden anında açılır!
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-1.5">
                <button
                  onClick={handleSimulatePartnerConnect}
                  className="w-full py-2.5 rounded-xl bg-[#2B6777] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer hover:bg-[#235866]"
                >
                  <Sparkles className="w-4 h-4 text-[#F2A900]" />
                  <span>Eşim Okuttu (Bağlantıyı Onayla)</span>
                </button>

                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={handleShareWhatsApp}
                    className="py-2 px-2.5 rounded-xl bg-[#25D366] text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer hover:bg-[#20ba59]"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp Linki</span>
                  </button>

                  <button
                    onClick={handleOpenAsPartnerInNewTab}
                    className="py-2 px-2.5 rounded-xl bg-stone-800 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer hover:bg-stone-900"
                  >
                    <span>Cihat Olarak Aç</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADD SINGLE CUSTOM DISH (PRO) */}
          {activeTab === 'addDish' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-[#2B6777] text-sm">
                  {t.addCustomDish}
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                  Pro Sürüm
                </span>
              </div>

              {dishAddedNotification && (
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Yeni yemek başarıyla menüye eklendi!</span>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-stone-600 block mb-1">
                  Yemek Adı
                </label>
                <input
                  type="text"
                  value={dishTitle}
                  onChange={(e) => setDishTitle(e.target.value)}
                  placeholder="Örn: Ev Yapımı Fırın Lazanya..."
                  className="w-full px-3 py-1.5 bg-white rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:border-[#2B6777]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-600 block mb-1">
                  Kısa Açıklama / İştah Açıcı Not
                </label>
                <input
                  type="text"
                  value={dishSubtitle}
                  onChange={(e) => setDishSubtitle(e.target.value)}
                  placeholder="Örn: Bolonez sos ve fırınlanmış beşamel..."
                  className="w-full px-3 py-1.5 bg-white rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:border-[#2B6777]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">
                    Hazırlık Süresi
                  </label>
                  <input
                    type="text"
                    value={dishPrepTime}
                    onChange={(e) => setDishPrepTime(e.target.value)}
                    placeholder="25 dk"
                    className="w-full px-3 py-1.5 bg-white rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:border-[#2B6777]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">
                    Kategori
                  </label>
                  <select
                    value={dishCategory}
                    onChange={(e) => setDishCategory(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:border-[#2B6777]"
                  >
                    <option value="Italian">İtalyan</option>
                    <option value="Vegetarian">Vejetaryen</option>
                    <option value="Spicy">Acı</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Healthy">Sağlıklı</option>
                    <option value="Sweet">Tatlı</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-600 block mb-1">
                  Malzemeler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={dishIngredientsText}
                  onChange={(e) => setDishIngredientsText(e.target.value)}
                  placeholder="250g Kıyma, 400g Lazanya yaprağı, Kaşar"
                  className="w-full px-3 py-1.5 bg-white rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:border-[#2B6777]"
                />
              </div>

              <button
                onClick={handleCreateDish}
                className="w-full py-2.5 rounded-xl bg-[#2B6777] text-white font-bold text-xs hover:bg-[#235866] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Yemeği Desteye Ekle</span>
              </button>
            </div>
          )}

          {/* TAB 4: GENERAL & LANGUAGE & RESET DATA */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              {/* Language Selection */}
              <div>
                <label className="text-xs font-bold text-[#2B6777] flex items-center gap-1.5 mb-2">
                  <Globe className="w-4 h-4" />
                  <span>{t.languageOption}</span>
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'tr' as Language, label: 'Türkçe', flag: '🇹🇷' },
                    { id: 'en' as Language, label: 'English', flag: '🇬🇧' },
                    { id: 'de' as Language, label: 'Deutsch', flag: '🇩🇪' }
                  ].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        sound.playTap();
                        onSelectLang(l.id);
                      }}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        lang === l.id
                          ? 'bg-[#2B6777] text-white border-[#2B6777] shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-lg">{l.flag}</div>
                      <div className="text-xs font-black mt-1">{l.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset App Data Danger Zone */}
              <div className="pt-2 border-t border-stone-200">
                <label className="text-xs font-bold text-rose-700 block mb-1.5">
                  {lang === 'tr' ? 'Verileri Sıfırlama (Test Modu)' : 'Reset App (Testing)'}
                </label>
                <p className="text-[11px] text-stone-500 mb-2 leading-tight">
                  Tüm eşleşmeleri, seçilen yemekleri ve anket tercihlerini sıfırlayarak baştan test edin.
                </p>

                <button
                  onClick={() => {
                    sound.playTap();
                    setShowResetConfirmDialog(true);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>Tüm Uygulamayı Sıfırla (Reset Data)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* IN-APP RESET CONFIRMATION MODAL */}
        <AnimatePresence>
          {showResetConfirmDialog && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-[300px] bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-base font-black text-rose-950 font-['Outfit',sans-serif]">
                    Uygulama Sıfırlansın mı?
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-snug">
                    Tüm anket cevapları, tercihler ve eşleşmeler temizlenip giriş ekranına dönülecektir.
                  </p>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setShowResetConfirmDialog(false)}
                    className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer"
                  >
                    İptal
                  </button>
                  <button
                    onClick={() => {
                      sound.playSuccess();
                      setShowResetConfirmDialog(false);
                      onClose();
                      onResetAllData();
                    }}
                    className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs cursor-pointer shadow-xs"
                  >
                    Evet, Sıfırla
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
