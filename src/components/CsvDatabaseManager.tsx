import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileSpreadsheet,
  Upload,
  Download,
  Folder,
  FolderOpen,
  Check,
  AlertCircle,
  Search,
  Sparkles,
  Layers,
  ChefHat,
  Info,
  Clock,
  Trash2,
  Plus
} from 'lucide-react';
import { Dish, Language } from '../types';
import { sound } from '../utils/sound';

interface CsvDatabaseManagerProps {
  dishes: Dish[];
  lang?: Language;
  onUpdateDishes: (dishes: Dish[]) => void;
  onClose?: () => void;
}

export const CsvDatabaseManager: React.FC<CsvDatabaseManagerProps> = ({
  dishes,
  lang = 'tr',
  onUpdateDishes,
  onClose
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [parsedPreviewDishes, setParsedPreviewDishes] = useState<Dish[] | null>(null);
  const [showFolderGuide, setShowFolderGuide] = useState(false);

  // Predefined folder categories
  const categories = [
    { id: 'all', name: lang === 'tr' ? 'Tüm Yemekler' : 'All Dishes', icon: '📂' },
    { id: 'Italian', name: lang === 'tr' ? 'İtalyan & Makarna' : 'Italian', icon: '🍝' },
    { id: 'Vegetarian', name: lang === 'tr' ? 'Vejetaryen' : 'Vegetarian', icon: '🥗' },
    { id: 'Fast Food', name: 'Fast Food & Burger', icon: '🍔' },
    { id: 'Healthy', name: lang === 'tr' ? 'Sağlıklı & Fit' : 'Healthy', icon: '🥑' },
    { id: 'Sweet', name: lang === 'tr' ? 'Tatlılar & Fırın' : 'Desserts', icon: '🍰' },
    { id: 'Spicy', name: lang === 'tr' ? 'Acı & Baharatlı' : 'Spicy', icon: '🌶️' },
    { id: 'Custom', name: lang === 'tr' ? 'Özel Tariflerim' : 'Custom', icon: '⭐' }
  ];

  const getDishesInFolder = (folderId: string) => {
    if (folderId === 'all') return dishes;
    if (folderId === 'Custom') return dishes.filter((d) => d.isCustom);
    return dishes.filter((d) => d.tags.some((t) => t.toLowerCase() === folderId.toLowerCase()));
  };

  const displayedDishes = getDishesInFolder(activeFolder).filter((d) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      (d.subtitle && d.subtitle.toLowerCase().includes(q)) ||
      d.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  // Download Google Sheets / Excel Compatible Sample CSV
  const handleDownloadTemplate = () => {
    sound.playTap();
    const csvHeader = 'id,title,subtitle,prepTime,difficulty,rating,category,allergens,ingredients,image\n';
    const sampleRows = [
      'crave-101,"Fırın Somon & Kuşkonmaz","Limon ve dereotlu fırınlanmış somon fileto","25 dk","Easy",4.9,"Healthy;Seafood","Balık","2 adet Somon fileto; 1 demet Kuşkonmaz; 1 adet Limon; 20ml Zeytinyağı","https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80"',
      'crave-102,"Ev Yapımı Truffle Burger","Karamelize soğan ve trüf mayonezli sulu köfte","20 dk","Medium",4.8,"Fast Food","Glüten;Süt & Laktoz","200g Dana Kıyma; 1 adet Brioche ekmek; 30g Trüf mayonez; 1 adet Soğan","https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"',
      'crave-103,"Kremalı Mantarlı Risotto","Arborio pirinci ve parmesanla kadife kıvam","35 dk","Medium",4.7,"Italian;Vegetarian","Süt & Laktoz;Mantar","200g Arborio pirinci; 150g Mantar; 50g Parmesan; 1lt Sebze suyu","https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80"',
      'crave-104,"San Sebastian Cheesecake","Akışkan kremamsı doku ve karamelize üst kabuk","40 dk","Easy",5.0,"Sweet;Vegetarian","Süt & Laktoz;Glüten","600g Krem Peynir; 4 adet Yumurta; 200ml Sıvı Krema; 150g Şeker","https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"'
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvHeader + sampleRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cravematch_yemek_veritabani_sablonu.csv';
    link.click();
    URL.revokeObjectURL(url);

    setStatusMessage({
      type: 'success',
      text: lang === 'tr' ? 'Örnek Google Sheets / Excel şablonu indirildi!' : 'Sample CSV template downloaded!'
    });
  };

  // Export current entire database to CSV
  const handleExportAll = () => {
    sound.playTap();
    const csvHeader = 'id,title,subtitle,prepTime,difficulty,rating,category,allergens,ingredients,image\n';
    const rows = dishes.map((d) => {
      const ingStr = (d.ingredients || []).map((i) => `${i.amount ? i.amount + (i.unit || '') + ' ' : ''}${i.name}`).join('; ');
      return [
        `"${d.id}"`,
        `"${d.title.replace(/"/g, '""')}"`,
        `"${(d.subtitle || '').replace(/"/g, '""')}"`,
        `"${d.prepTime}"`,
        `"${d.difficulty}"`,
        d.rating,
        `"${d.tags.join(';')}"`,
        `"${(d.allergens || []).join(';')}"`,
        `"${ingStr.replace(/"/g, '""')}"`,
        `"${d.image}"`
      ].join(',');
    });

    const blob = new Blob(['\uFEFF' + csvHeader + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cravematch_tum_yemekler_${dishes.length}_adet.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setStatusMessage({
      type: 'success',
      text: lang === 'tr' ? `${dishes.length} yemek CSV olarak dışa aktarıldı!` : `${dishes.length} dishes exported!`
    });
  };

  // Parse CSV File Robustly
  const parseCSV = (text: string): Dish[] => {
    // Split lines safely handling \r\n and \n
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length <= 1) return [];

    // Simple robust CSV line splitter honoring quoted commas
    const parseLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      // Handle comma or semicolon delimiter (European Excel)
      const delimiter = line.includes(';') && !line.includes(',') ? ';' : ',';

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' || char === '“' || char === '”') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === delimiter && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const header = parseLine(lines[0]).map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const parsed: Dish[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseLine(lines[i]);
      if (values.length < 2) continue;

      const row: Record<string, string> = {};
      header.forEach((h, idx) => {
        row[h] = values[idx] || '';
      });

      const title = row['title'] || values[1] || `Özel Yemek #${i}`;
      const subtitle = row['subtitle'] || row['description'] || values[2] || 'Lezzetli ev tarifi';
      const prepTime = row['preptime'] || values[3] || '25 dk';
      const difficulty = (row['difficulty'] as any) || 'Easy';
      const rating = parseFloat(row['rating']) || 4.8;
      const tagsStr = row['category'] || row['tags'] || values[6] || 'Custom';
      const tags = tagsStr.split(/[;,]/).map((t) => t.trim()).filter(Boolean);
      const allergensStr = row['allergens'] || values[7] || '';
      const allergens = allergensStr.split(/[;,]/).map((a) => a.trim()).filter(Boolean);
      const ingStr = row['ingredients'] || values[8] || 'Temel Malzeme';
      const ingredients = ingStr.split(/[;,]/).map((ing, idx) => ({
        name: ing.trim(),
        amount: 100,
        unit: 'g',
        category: 'Pantry'
      })).filter((ing) => ing.name.length > 0);

      const image = row['image'] || values[9] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';

      parsed.push({
        id: `csv-${Date.now()}-${i}`,
        title,
        subtitle,
        description: subtitle,
        image,
        prepTime,
        prepTimeMinutes: parseInt(prepTime) || 25,
        difficulty,
        rating,
        reviewCount: Math.floor(Math.random() * 40) + 12,
        tags: tags.length > 0 ? tags : ['Custom'],
        allergens,
        basePortions: 2,
        matchScore: 95,
        partnerLiked: true,
        isCustom: true,
        ingredients: ingredients.length > 0 ? ingredients : [{ name: 'Temel Malzeme', amount: 1, unit: 'adet' }],
        steps: [
          { id: 1, title: 'Hazırlık', description: 'Tüm malzemeleri yıkayın ve hazır edin.', chef: 'chef1', chefName: 'Şef 1', durationMins: 5 },
          { id: 2, title: 'Pişirme', description: 'Tarif talimatlarına göre pişirip sıcak servis edin.', chef: 'chef2', chefName: 'Şef 2', durationMins: 15 }
        ]
      });
    }

    return parsed;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playTap();
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        try {
          const parsed = parseCSV(text);
          if (parsed.length === 0) {
            setStatusMessage({
              type: 'error',
              text: lang === 'tr' ? 'CSV dosyası boş veya formatı algılanamadı.' : 'CSV file is empty or format invalid.'
            });
          } else {
            setParsedPreviewDishes(parsed);
            sound.playSuccess();
            setStatusMessage({
              type: 'success',
              text: lang === 'tr' ? `${parsed.length} adet yemek başarıyla algılandı! İçe aktarmak için onaylayın.` : `${parsed.length} dishes detected!`
            });
          }
        } catch {
          setStatusMessage({
            type: 'error',
            text: lang === 'tr' ? 'CSV okunurken hata oluştu.' : 'Error reading CSV file.'
          });
        }
      }
    };
    reader.readAsText(file, 'UTF-8');
  };

  const handleConfirmMerge = () => {
    if (!parsedPreviewDishes) return;
    sound.playSuccess();
    onUpdateDishes([...dishes, ...parsedPreviewDishes]);
    setStatusMessage({
      type: 'success',
      text: lang === 'tr' ? `${parsedPreviewDishes.length} yemek menüye başarıyla eklendi! Toplam: ${dishes.length + parsedPreviewDishes.length}` : 'Dishes merged successfully!'
    });
    setParsedPreviewDishes(null);
  };

  const handleConfirmReplace = () => {
    if (!parsedPreviewDishes) return;
    sound.playSuccess();
    onUpdateDishes(parsedPreviewDishes);
    setStatusMessage({
      type: 'success',
      text: lang === 'tr' ? `Tüm menü yenilendi! Yeni katalog: ${parsedPreviewDishes.length} yemek.` : 'Database replaced with new dishes!'
    });
    setParsedPreviewDishes(null);
  };

  return (
    <div className="w-full flex flex-col space-y-3.5 select-none text-[#1A3B44]">
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-2xs">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#2B6777] font-['Outfit',sans-serif]">
              {lang === 'tr' ? 'Yemek & Menü Veritabanı' : 'Dish & Menu Database'}
            </h3>
            <p className="text-[10px] text-stone-500">
              {lang === 'tr' ? 'Google Sheets & Excel CSV Uyumu' : 'Google Sheets & Excel CSV Sync'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowFolderGuide(!showFolderGuide)}
          className="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5 text-[#2B6777]" />
          <span>{lang === 'tr' ? 'Klasör Rehberi' : 'Folder Guide'}</span>
        </button>
      </div>

      {/* Notification Toast */}
      {statusMessage && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs ${
            statusMessage.type === 'success'
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
              : 'bg-rose-100 text-rose-900 border border-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-700 shrink-0 stroke-[3]" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 stroke-[2.5]" />
          )}
          <span>{statusMessage.text}</span>
        </motion.div>
      )}

      {/* Step-by-Step Folder & CSV Guide Dropdown */}
      <AnimatePresence>
        {showFolderGuide && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-950 space-y-2 overflow-hidden shadow-2xs"
          >
            <div className="font-extrabold text-[#2B6777] flex items-center gap-1.5 text-xs">
              <Folder className="w-4 h-4 text-amber-600" />
              <span>Klasör & Google Sheets Entegrasyon Yolu</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-stone-700 leading-relaxed font-medium">
              <li>
                <strong>1. Şablonu İndirin:</strong> Aşağıdaki <em>'Şablon İndir'</em> düğmesine basarak hazır Excel/Google Sheets dosyasını bilgisayarınıza alın.
              </li>
              <li>
                <strong>2. Google Drive / Sheets'e Yükleyin:</strong> Google Sheets'te yeni tablo açıp <em>Dosya &gt; İçe Aktar</em> ile bu şablonu yükleyin. İstediğiniz yemekleri, malzemeleri ve kategorileri ekleyin.
              </li>
              <li>
                <strong>3. CSV Olarak Kaydedin:</strong> Google Sheets'ten <em>Dosya &gt; İndir &gt; Virgülle Ayrılmış Değerler (.csv)</em> seçeneğiyle indirin.
              </li>
              <li>
                <strong>4. CraveMatch'e Yükleyin:</strong> Aşağıdaki <em>'Bilgisayardan CSV Yükle'</em> butonuna tıklayın. Yemekler otomatik olarak 📁 İtalyan, 📁 Vejetaryen, 📁 Fast Food gibi klasörlere ayrılır!
              </li>
            </ol>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons: Template Download & File Uploader */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleDownloadTemplate}
          className="py-2 px-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-stone-50 cursor-pointer shadow-2xs"
        >
          <Download className="w-3.5 h-3.5 text-emerald-600" />
          <span>Şablon İndir (.csv)</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="py-2 px-2.5 rounded-xl bg-[#2B6777] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#225360] cursor-pointer shadow-xs active:scale-95 transition-all"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Bilgisayardan CSV Yükle</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Preview Dialog if CSV was uploaded */}
      {parsedPreviewDishes && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-emerald-50 rounded-2xl border-2 border-emerald-400 space-y-2.5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span className="font-extrabold text-emerald-900 text-xs">
                {parsedPreviewDishes.length} Yeni Yemek Bulundu
              </span>
            </div>
            <button
              onClick={() => setParsedPreviewDishes(null)}
              className="text-[10px] text-stone-500 hover:text-stone-700 font-bold"
            >
              İptal
            </button>
          </div>

          <div className="max-h-28 overflow-y-auto space-y-1 pr-1 text-[11px]">
            {parsedPreviewDishes.slice(0, 4).map((d) => (
              <div key={d.id} className="p-1.5 bg-white rounded-lg flex items-center justify-between border border-stone-200">
                <span className="font-bold truncate max-w-[190px]">{d.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-600 font-semibold">{d.prepTime}</span>
              </div>
            ))}
            {parsedPreviewDishes.length > 4 && (
              <div className="text-[10px] text-center text-stone-500 font-semibold italic">
                ve {parsedPreviewDishes.length - 4} yemek daha...
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleConfirmMerge}
              className="flex-1 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer shadow-xs"
            >
              Mevcut Menüye Ekle
            </button>
            <button
              onClick={handleConfirmReplace}
              className="flex-1 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 cursor-pointer shadow-xs"
            >
              Tüm Menüyü Değiştir
            </button>
          </div>
        </motion.div>
      )}

      {/* Database Folders & Category Tabs */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-[#2B6777] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Kategori Klasörleri ({dishes.length} Toplam Yemek)</span>
          </label>

          <button
            onClick={handleExportAll}
            className="text-[11px] font-bold text-[#E05A3D] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3 h-3" />
            <span>Dışa Aktar</span>
          </button>
        </div>

        {/* Scrollable Folder Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const count = getDishesInFolder(cat.id).length;
            const isSelected = activeFolder === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playTap();
                  setActiveFolder(cat.id);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2B6777] text-white shadow-2xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${isSelected ? 'bg-white/25 text-white' : 'bg-stone-100 text-stone-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Input in Database */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Yemek veya malzeme ara..."
          className="w-full pl-8 pr-3 py-1.5 bg-white rounded-xl border border-stone-200 text-xs font-semibold focus:outline-none focus:border-[#2B6777]"
        />
      </div>

      {/* Dish List inside active folder */}
      <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar pr-0.5">
        {displayedDishes.length === 0 ? (
          <div className="p-4 text-center text-xs text-stone-400 italic">
            Bu klasörde yemek bulunamadı.
          </div>
        ) : (
          displayedDishes.map((dish) => (
            <div
              key={dish.id}
              className="p-2 bg-white rounded-xl border border-stone-200 flex items-center justify-between gap-2 shadow-2xs hover:border-stone-300 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-9 h-9 rounded-lg object-cover shrink-0 bg-stone-100"
                />
                <div className="min-w-0">
                  <div className="font-bold text-xs text-[#1A3B44] truncate">{dish.title}</div>
                  <div className="text-[10px] text-stone-500 flex items-center gap-1.5 truncate">
                    <span>⏱ {dish.prepTime}</span>
                    <span>•</span>
                    <span>⭐ {dish.rating}</span>
                    {dish.allergens && dish.allergens.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-amber-700">⚠️ {dish.allergens.join(', ')}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-bold shrink-0">
                {dish.tags[0] || 'Genel'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
