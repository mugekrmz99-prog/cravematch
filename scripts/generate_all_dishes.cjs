// scripts/generate_all_dishes.cjs
const fs = require('fs');
const path = require('path');

const allDishes = [
  // ==========================================
  // 1. ÇORBALAR (dish-1 .. dish-15)
  // ==========================================
  {
    id: 'dish-1',
    title: 'Geleneksel Kırmızı Mercimek Çorbası',
    title_en: 'Traditional Red Lentil Soup',
    title_de: 'Traditionelle rote Linsensuppe',
    subtitle: 'Tereyağlı nane ve pul biber sosu ile süzme mercimek',
    subtitle_en: 'Creamy red lentil soup with mint butter and chili drizzle',
    subtitle_de: 'Cremige Linsensuppe mit Minzbutter und Chiliöl',
    description: 'Kırmızı mercimek, havuç, patates ve soğanın tereyağında kavrulup pürüzsüz kıvama getirilmesiyle hazırlanan klasik şifa kaynağı.',
    description_en: 'Wholesome red lentils simmered with root vegetables and finished with foaming dried-mint butter.',
    description_de: 'Klassische türkische Linsensuppe mit Wurzelgemüse und feiner Minzbutter.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Easy', rating: 4.9, reviewCount: 420,
    tags: ['Çorba', 'Sağlıklı', 'Ev Yemeği', 'Vejetaryen'],
    allergens: ['Süt & Laktoz'],
    basePortions: 2, matchScore: 98, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kırmızı Mercimek', amount: 1.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Kuru Soğan', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Havuç', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Patates', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Tereyağı', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Kuru Nane & Pul Biber', amount: 1, unit: 'tatlı kaşığı', category: 'Spices' },
      { name: 'Limon', amount: 1, unit: 'adet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Sebzeleri Doğra ve Kavur', description: 'Soğan, havuç ve patatesi küp doğrayıp tereyağında kokusu çıkana dek soteleyin.', chef: 'chef1', chefName: '1. Şef', durationMins: 6 },
      { id: 2, title: 'Mercimeği Ekle ve Kaynat', description: 'Yıkanmış mercimeği ve 6 su bardağı sıcak suyu ekleyip mercimekler yumuşayana dek 15 dakika kaynatın.', chef: 'chef2', chefName: '2. Şef', durationMins: 15 },
      { id: 3, title: 'Blenderdan Geçir & Sosla', description: 'Çorbayı blenderdan pürüzsüz geçirin. Tavada kızdırılan tereyağlı nane ve pul biberi üzerine dökün.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 4 }
    ]
  },
  {
    id: 'dish-2',
    title: 'Ezogelin Çorbası',
    title_en: 'Ezogelin Soup',
    title_de: 'Ezogelin Suppe',
    subtitle: 'Bulgur, pirinç, kırmızı mercimek ve bol naneli Gaziantep usulü',
    subtitle_en: 'Spiced red lentil, bulgur, and rice soup with dried mint',
    subtitle_de: 'Herzhafte Suppe aus Linsen, Bulgur und Reis mit Minze',
    description: 'Kırmızı mercimek, pilavlık bulgur ve pirincin domates salçası, sarımsak ve nane ile harmanlandığı doyurucu Anadolu efsanesi.',
    description_en: 'Hearty bridal soup featuring red lentils, cracked wheat bulgur, rice, and aromatic dried mint.',
    description_de: 'Traditionelle anatolische Brautsuppe mit feinen Kräutern und wärmenden Gewürzen.',
    image: 'https://images.unsplash.com/photo-1607528971899-2e89e6c0ec69?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Easy', rating: 4.8, reviewCount: 310,
    tags: ['Çorba', 'Sağlıklı', 'Ev Yemeği'],
    allergens: ['Glüten', 'Süt & Laktoz'],
    basePortions: 2, matchScore: 95, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kırmızı Mercimek', amount: 1, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Pilavlık Bulgur', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Baldo Pirinç', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Domates & Biber Salçası', amount: 1.5, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Tereyağı & Zeytinyağı', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Sarımsak', amount: 2, unit: 'diş', category: 'Produce' },
      { name: 'Kuru Nane & Pul Biber', amount: 1, unit: 'tatlı kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Bakliyatları Haşla', description: 'Mercimek, bulgur ve pirinci 6 bardak su ile bakliyatlar yumuşayana dek haşlayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 15 },
      { id: 2, title: 'Salçalı Sosu Hazırla', description: 'Ayrı tavada tereyağını eritin, sarımsak, salçalar ve naneyi kokusu çıkana kadar kavurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Birleştir ve Özdeşleştir', description: 'Salçalı sosu tencereye ekleyip 5 dakika kısık ateşte kaynatın. Sıcak servis yapın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 5 }
    ]
  },
  {
    id: 'dish-3',
    title: 'Yayla Çorbası',
    title_en: 'Turkish Yogurt & Rice Soup',
    title_de: 'Türkische Joghurtsuppe',
    subtitle: 'Süzme yoğurt, pirinç ve kızgın naneli tereyağı',
    subtitle_en: 'Silky strained yogurt soup with rice and sizzled mint butter',
    subtitle_de: 'Samtige Joghurtsuppe mit Reis und getrockneter Minze',
    description: 'İpeksi süzme yoğurt terbiyesi, pirinç ve üzerine cızırdayan naneli tereyağı ile mideyi rahatlatan ferahlatıcı lezzet.',
    description_en: 'Refreshing and comforting yogurt soup with rice, egg temper, and bubbling mint butter.',
    description_de: 'Wohltuende Suppe aus cremigem Joghurt, Reis und frischer Pfefferminze.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Medium', rating: 4.8, reviewCount: 280,
    tags: ['Çorba', 'Sağlıklı', 'Vejetaryen'],
    allergens: ['Süt & Laktoz', 'Yumurta'],
    basePortions: 2, matchScore: 92, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Süzme Yoğurt', amount: 2, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Baldo Pirinç', amount: 0.5, unit: 'çay bardağı', category: 'Pantry' },
      { name: 'Yumurta Sarısı', amount: 1, unit: 'adet', category: 'Dairy' },
      { name: 'Un', amount: 1, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Tereyağı', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Kuru Nane', amount: 1.5, unit: 'tatlı kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Pirinçleri Haşla', description: 'Pirinci 4 bardak suda yumuşayana kadar haşlayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 12 },
      { id: 2, title: 'Yoğurtlu Terbiyeyi Çırp', description: 'Yoğurt, yumurta sarısı ve unu pürüzsüz çırpın. Çorbanın suyundan azar azar ekleyip ılıtın.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Terbiyeyi Bağla ve Sosla', description: 'Ilıyan yoğurdu tencereye yavaşça döküp karıştırarak kaynatın. Üzerine naneli kızgın tereyağını dökün.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 6 }
    ]
  },
  {
    id: 'dish-4',
    title: 'Geleneksel Köy Tarhanası Çorbası',
    title_en: 'Traditional Tarhana Soup',
    title_de: 'Traditionelle Tarhana-Suppe',
    subtitle: 'Doğal fermante tarhana, sarımsak ve tereyağlı nane',
    subtitle_en: 'Sun-dried fermented grain soup with garlic butter',
    subtitle_de: 'Fermentierte Getreidesuppe mit Knoblauchbutter',
    description: 'Güneşte kurutulmuş sebzeler ve yoğurtla fermante edilmiş Uşak tarhanası, sarımsak ve tereyağının sıcak dokunuşu.',
    description_en: 'Traditional Anatolian sun-dried sourdough soup enriched with butter, garlic, and tomato paste.',
    description_de: 'Würzige probiotische Suppe aus getrocknetem Teig und Kräutern.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.7, reviewCount: 195,
    tags: ['Çorba', 'Ev Yemeği', 'Sağlıklı'],
    allergens: ['Glüten', 'Süt & Laktoz'],
    basePortions: 2, matchScore: 90, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Ev Yapımı Toz Tarhana', amount: 4, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Tereyağı', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Domates Salçası', amount: 1, unit: 'tatlı kaşığı', category: 'Pantry' },
      { name: 'Sarımsak', amount: 2, unit: 'diş', category: 'Produce' },
      { name: 'Kuru Nane & Pul Biber', amount: 1, unit: 'tatlı kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Tarhanayı Islat', description: 'Tarhanayı 1 bardak ılık su ile kasede çözdürün.', chef: 'chef1', chefName: '1. Şef', durationMins: 4 },
      { id: 2, title: 'Salça ve Sarımsağı Kavur', description: 'Tencerede tereyağını eritip ezilmiş sarımsak ve salçayı hafifçe kavurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 3 },
      { id: 3, title: 'Birleştir ve Sürekli Karıştır', description: 'Çözülmüş tarhana ve 4 bardak suyu ekleyip kaynayana kadar sürekli karıştırın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 10 }
    ]
  },
  {
    id: 'dish-5',
    title: 'Köz Domates Çorbası',
    title_en: 'Roasted Tomato Soup',
    title_de: 'Geröstete Tomatensuppe',
    subtitle: 'Fırınlanmış domates, süt ve rendelenmiş taze kaşar peyniri',
    subtitle_en: 'Flame-roasted vine tomatoes with a splash of milk and melted kashar',
    subtitle_de: 'Geröstete Strauchtomaten mit geschmolzenem Käse',
    description: 'Fırında közlenen mis kokulu domatesler, tereyağı, un ve sütün mükemmel uyumu. Üzerinde eriyen kaşar peyniriyle servis edilir.',
    description_en: 'Smoky oven-roasted tomatoes pureed with fresh cream and topped with grated Turkish Kashar cheese.',
    description_de: 'Im Ofen geröstete Tomaten, cremig püriert und mit mildem Käse serviert.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Easy', rating: 4.8, reviewCount: 340,
    tags: ['Çorba', 'Vejetaryen', 'Sağlıklı'],
    allergens: ['Süt & Laktoz', 'Glüten'],
    basePortions: 2, matchScore: 93, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Olgun Domates', amount: 5, unit: 'adet', category: 'Produce' },
      { name: 'Tereyağı', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Un', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Süt', amount: 1, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Rendelenmiş Kaşar Peyniri', amount: 1, unit: 'çay bardağı', category: 'Dairy' },
      { name: 'Taze Çekilmiş Karabiber', amount: 0.5, unit: 'çay kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Domatesleri Közle ve Püre Yap', description: 'Domatesleri fırında közleyip kabuklarını soyun ve püre haline getirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Meyaneyi Kavur', description: 'Tencerede tereyağı ve unu kokusu çıkana kadar 2 dakika kavurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 3 },
      { id: 3, title: 'Domates ve Sütü Ekle', description: 'Domates püresini ve ılık sütü azar azar ekleyip karıştırarak 8 dakika kaynatın. Kaşarla süsleyin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 8 }
    ]
  },
  {
    id: 'dish-6',
    title: 'Tavuk Suyu Şehriye Çorbası',
    title_en: 'Chicken Noodle Soup',
    title_de: 'Hühnersuppe mit Nudeln',
    subtitle: 'Didiklenmiş köy tavuğu, arpa şehriye ve taze limon suyu',
    subtitle_en: 'Shredded chicken and orzo pasta in rich bone broth',
    subtitle_de: 'Zartes Hühnerfleisch mit Orzo-Nudeln in kräftiger Brühe',
    description: 'Doğal tavuk suyu, havuç küpleri, arpa şehriye ve bol maydanozla hazırlanan bağışıklık dostu nefis çorba.',
    description_en: 'Comforting home-style chicken broth with orzo pasta, diced carrots, and fresh lemon juice.',
    description_de: 'Klassische Hühnersuppe für kalte Tage mit frischer Zitrone und Petersilie.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Easy', rating: 4.9, reviewCount: 260,
    tags: ['Çorba', 'Sağlıklı', 'Ev Yemeği'],
    allergens: ['Glüten'],
    basePortions: 2, matchScore: 94, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Haşlanmış Didiklenmiş Tavuk But', amount: 250, unit: 'g', category: 'Meat' },
      { name: 'Tavuk Suyu', amount: 5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Arpa Şehriye', amount: 0.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Havuç (Küp Doğranmış)', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Taze Maydanoz & Limon', amount: 1, unit: 'demet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Havuç ve Şehriyeyi Sotele', description: 'Zeytinyağında küp havuçları 2 dakika soteleyip şehriyeleri ekleyin.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Tavuk Suyu ve Eti Ekle', description: 'Sıcak tavuk suyunu ve didiklenmiş tavuk etlerini ekleyip şehriyeler yumuşayana dek kaynatın.', chef: 'chef2', chefName: '2. Şef', durationMins: 12 },
      { id: 3, title: 'Limon ve Maydanozla Bitir', description: 'Taze sıkılmış limon suyu ve ince kıyılmış maydanozu ekleyip ocaktan alın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 3 }
    ]
  },
  {
    id: 'dish-7',
    title: 'Gaziantep Beyran Çorbası',
    title_en: 'Gaziantep Beyran Lamb Soup',
    title_de: 'Beyran Lammfleischsuppe',
    subtitle: 'Didiklenmiş kuzu gerdan, pirinç, bol sarımsak ve acı pul biber',
    subtitle_en: 'Sizzling spicy lamb neck soup with rice and charred garlic',
    subtitle_de: 'Feurig-würzige Lammfleischsuppe mit Knoblauch',
    description: 'Gaziantep’in tescilli efsanesi: Saatlerce haşlanmış kuzu gerdan eti, pirinç, iç yağı, sarımsak ve acı biberin bakır sahanda alevlenmesi.',
    description_en: 'Legendary Antep specialty: shredded slow-cooked lamb neck, rice, and garlic seared over open fire.',
    description_de: 'Berühmte Spezialität aus Gaziantep mit zartem Lammfleisch und feuriger Schärfe.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '40 dk', prepTimeMinutes: 40, difficulty: 'Hard', rating: 4.9, reviewCount: 450,
    tags: ['Çorba', 'Et', 'Acılı'],
    allergens: ['Aşırı Acı'],
    basePortions: 2, matchScore: 97, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kuzu Gerdan (Didiklenmiş)', amount: 350, unit: 'g', category: 'Meat' },
      { name: 'Haşlanmış Pirinç', amount: 1, unit: 'çay bardağı', category: 'Pantry' },
      { name: 'Zengin Kuzu Et Suyu', amount: 4, unit: 'su bardağı', category: 'Meat' },
      { name: 'Dövülmüş Sarımsak', amount: 5, unit: 'diş', category: 'Produce' },
      { name: 'İpek Pul Biber & Kuzu Yağı', amount: 2, unit: 'yemek kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Bakır Sahanda Tabanı Kur', description: 'Kuzu iç yağını sahanda eritin, pirinç ve didiklenmiş kuzu gerdanını yerleştirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 4 },
      { id: 2, title: 'Sarımsak ve Biberi Ekle', description: 'Bol ezilmiş sarımsak ve acı pul biberi ekleyip yüksek ateşte cızırdatın.', chef: 'chef2', chefName: '2. Şef', durationMins: 3 },
      { id: 3, title: 'Kaynar Et Suyunu Ver', description: 'Fokurdayan kuzu suyunu sahana boşaltıp harlı ateşte 2 dakika alevlendirerek kaynatın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 3 }
    ]
  },
  {
    id: 'dish-8',
    title: 'Maraş Usulü Kelle Paça Çorbası',
    title_en: 'Traditional Pacha Bone Soup',
    title_de: 'Kelle Paca Suppe',
    subtitle: 'Kollajen zengini et suyu, sarımsaklı sirke ve tereyağlı pul biber',
    subtitle_en: 'Collagen-rich broth with tender meat, vinegar, and garlic sauce',
    subtitle_de: 'Kräftige Fleischbrühe mit Knoblauch-Essig-Dressing',
    description: 'Ağır ateşte pişmiş etler, yoğun kemik iliği suyu, keskin sarımsaklı sirke ve sumak ekşisi ile gerçek bir lezzet bombası.',
    description_en: 'Rich, restorative marrow broth served with tender meat, garlic-vinegar reduction, and spicy butter.',
    description_de: 'Kräftigende Fleischsuppe reich an Geschmack, verfeinert mit Knoblauchessig.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Medium', rating: 4.8, reviewCount: 380,
    tags: ['Çorba', 'Et', 'Sağlıklı'],
    allergens: ['Sarımsak'],
    basePortions: 2, matchScore: 91, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Ayıklanmış Dana/Kuzu Eti', amount: 300, unit: 'g', category: 'Meat' },
      { name: 'Yoğun İlikli Kemik Suyu', amount: 5, unit: 'su bardağı', category: 'Meat' },
      { name: 'Ezilmiş Taze Sarımsak', amount: 6, unit: 'diş', category: 'Produce' },
      { name: 'Üzüm Sirkesi', amount: 3, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Kızdırılmış Pul Biberli Tereyağı', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' }
    ],
    steps: [
      { id: 1, title: 'Et Suyunu Kaynat', description: 'İlikli kemik suyunu tencereye alıp etlerle birlikte kaynamaya bırakın.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Sirke ve Sarımsak Terbiyesi', description: 'Sirke ve dövülmüş sarımsağı bir kasede karıştırıp çorbaya ilave edin.', chef: 'chef2', chefName: '2. Şef', durationMins: 4 },
      { id: 3, title: 'Kızgın Yağı Dök ve Servis Et', description: 'Tavada kızdırılan pul biberli tereyağını çorbanın üzerine cızırdatarak dökün.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 3 }
    ]
  },
  {
    id: 'dish-9',
    title: 'Geleneksel Düğün Çorbası',
    title_en: 'Traditional Wedding Soup',
    title_de: 'Türkische Hochzeitssuppe',
    subtitle: 'Didiklenmiş kuzu gerdan, yoğurtlu un terbiyesi ve tereyağlı biber',
    subtitle_en: 'Ottoman palace soup with shredded lamb and silky yogurt liaison',
    subtitle_de: 'Festliche Suppe mit Lammfleisch und milder Joghurtlegierung',
    description: 'Saray mutfağından günümüze uzanan; lokum gibi kuzu eti ve yumurtalı limonlu yoğurt terbiyesiyle hazırlanan asil bir lezzet.',
    description_en: 'Regal Ottoman ceremonial soup with slow-simmered lamb and velvety lemon-egg-yogurt liaison.',
    description_de: 'Traditionelle Hochzeitssuppe mit feinem Fleisch und cremiger Konsistenz.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Medium', rating: 4.8, reviewCount: 220,
    tags: ['Çorba', 'Et', 'Ev Yemeği'],
    allergens: ['Süt & Laktoz', 'Glüten', 'Yumurta'],
    basePortions: 2, matchScore: 92, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Haşlanmış Kuzu Gerdan', amount: 250, unit: 'g', category: 'Meat' },
      { name: 'Et Suyu', amount: 4, unit: 'su bardağı', category: 'Meat' },
      { name: 'Süzme Yoğurt', amount: 1, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Un', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Yumurta Sarısı & Limon', amount: 1, unit: 'adet', category: 'Dairy' },
      { name: 'Kırmızı Biberli Tereyağı', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' }
    ],
    steps: [
      { id: 1, title: 'Terbiyeyi Çırp', description: 'Yoğurt, un, yumurta sarısı ve limon suyunu tencere dışında pürüzsüz kıvama getirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Et Suyuyla Ilıt', description: 'Sıcak et suyundan kepçeyle alıp terbiyeye yedirin ve tencereye ekleyin.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Etleri Ekle ve Sosla', description: 'Didiklenmiş kuzu etlerini katıp 5 dakika kaynatın, üzerine kırmızı biberli tereyağını gezdirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 5 }
    ]
  },
  {
    id: 'dish-10',
    title: 'Gaziantep Yuvalama Çorbası',
    title_en: 'Yuvalama Soup',
    title_de: 'Yuvalama Festtagssuppe',
    subtitle: 'Nohut, minik köfteler, süzme yoğurt ve naneli zeytinyağı',
    subtitle_en: 'Mini beef dumplings with chickpeas in warm yogurt broth',
    subtitle_de: 'Maultaschen-Suppe mit Kichererbsen in warmer Joghurtbrühe',
    description: 'Antep bayramlarının baş tacı: Pirinç ve kıymadan yuvarlanan minik köfteler, nohut ve sıcak yoğurt sosunun enfes buluşması.',
    description_en: 'Feast soup from Gaziantep featuring hand-rolled miniature dumplings, chickpeas, and warm yogurt sauce.',
    description_de: 'Festtagssuppe aus Gaziantep mit handgerollten Klößchen und Minzöl.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    prepTime: '45 dk', prepTimeMinutes: 45, difficulty: 'Hard', rating: 5.0, reviewCount: 520,
    tags: ['Çorba', 'Et', 'Ev Yemeği'],
    allergens: ['Süt & Laktoz', 'Yumurta'],
    basePortions: 2, matchScore: 99, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Minik Yuvalama Köftesi', amount: 200, unit: 'g', category: 'Meat' },
      { name: 'Haşlanmış Nohut', amount: 1, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Kuşbaşı Kuzu Eti', amount: 150, unit: 'g', category: 'Meat' },
      { name: 'Süzme Yoğurt', amount: 2, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Yumurta', amount: 1, unit: 'adet', category: 'Dairy' },
      { name: 'Kuru Nane & Zeytinyağı', amount: 2, unit: 'yemek kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Et ve Nohudu Pişir', description: 'Kuzu eti ve nohudu et suyunda köftelerle birlikte haşlayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 15 },
      { id: 2, title: 'Yoğurdu Pişir', description: 'Süzme yoğurt ve yumurtayı kısık ateşte kesilmemesi için sürekli karıştırarak ılıtın.', chef: 'chef2', chefName: '2. Şef', durationMins: 10 },
      { id: 3, title: 'Birleştir ve Nane Yak', description: 'Yoğurtlu karışımı çorbaya ekleyin. Üzerine zeytinyağında yakılmış bol nane gezdirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 5 }
    ]
  },
  {
    id: 'dish-11',
    title: 'İç Anadolu Usulü Arabaşı Çorbası',
    title_en: 'Arabasi Chicken Soup',
    title_de: 'Arabasi Hühnersuppe',
    subtitle: 'Kavrulmuş un meyhanesi, tavuk eti ve acı pul biber',
    subtitle_en: 'Toasted flour roux soup with fiery chili and pulled chicken',
    subtitle_de: 'Scharfe Mehlschwitze-Suppe mit zartem Huhn',
    description: 'Kış gecelerinin vazgeçilmezi: Unun tereyağında kokusu çıkana dek kavrulması, tavuk suyu ve acı biberle kaynatılan sıcacık çorba.',
    description_en: 'Hearty Central Anatolian winter soup made with roasted flour roux, shredded chicken, and piquant red peppers.',
    description_de: 'Würzige Wintersuppe aus geröstetem Mehl und Hühnerbrühe.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Medium', rating: 4.7, reviewCount: 160,
    tags: ['Çorba', 'Et', 'Acılı'],
    allergens: ['Glüten', 'Süt & Laktoz'],
    basePortions: 2, matchScore: 89, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Haşlanmış Tavuk Eti', amount: 250, unit: 'g', category: 'Meat' },
      { name: 'Un', amount: 3, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Tereyağı', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Domates & Biber Salçası', amount: 1.5, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Acı Pul Biber & Limon', amount: 1, unit: 'tatlı kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Unu Pembeleştir', description: 'Tencerede tereyağında unu kokusu çıkıp rengi dönene kadar kavurun.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Salça ve Suyu Ekle', description: 'Salçayı ekleyip karıştırın, soğuk tavuk suyunu yavaşça çırparak dökün.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Tavukları Kat ve Kaynat', description: 'Didiklenmiş tavuk etlerini ve bol acı pul biberi ekleyip 10 dakika kaynatın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 10 }
    ]
  },
  {
    id: 'dish-12',
    title: 'Malatya Analı Kızlı Çorbası',
    title_en: 'Anali Kizli Meatball Soup',
    title_de: 'Anali Kizli Klößchensuppe',
    subtitle: 'Kıymalı içli köfteler, minik bulgur köfteleri ve nohut',
    subtitle_en: 'Stuffed bulgur meatballs and pearls in tomato mint broth',
    subtitle_de: 'Gefüllte Bulgurklößchen und Perlen in Tomatenbrühe',
    description: 'Anadolu mutfağının başyapıtı: İçi kıymalı analar ve minik kızlar bulgur köftelerinin salçalı et suyunda nohutla dansı.',
    description_en: 'Spectacular soup featuring larger minced-beef stuffed dumplings alongside baby bulgur pearls in minty tomato broth.',
    description_de: 'Meisterwerk der anatolischen Küche mit gefüllten und kleinen Bulgurklößchen.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    prepTime: '45 dk', prepTimeMinutes: 45, difficulty: 'Hard', rating: 4.9, reviewCount: 390,
    tags: ['Çorba', 'Et', 'Ev Yemeği'],
    allergens: ['Glüten'],
    basePortions: 2, matchScore: 96, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kıymalı İçli Köfte (Analı)', amount: 6, unit: 'adet', category: 'Meat' },
      { name: 'Minik Bulgur Köftesi (Kızlı)', amount: 1, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Haşlanmış Nohut', amount: 1, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Dana Kuşbaşı Et', amount: 150, unit: 'g', category: 'Meat' },
      { name: 'Salça, Tereyağı & Nane', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Salçalı Et Suyunu Kaynat', description: 'Kuşbaşı et ve nohudu tereyağı ile salçalı suda kaynamaya bırakın.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Köfteleri Pişir', description: 'Kaynayan suya önce kızları ardından anaları atıp dağılmadan 8 dakika haşlayın.', chef: 'chef2', chefName: '2. Şef', durationMins: 8 },
      { id: 3, title: 'Nane Sosuyla Taçlandır', description: 'Üzerine tereyağında yakılmış mis kokulu naneyi gezdirip servis yapın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 4 }
    ]
  },
  {
    id: 'dish-13',
    title: 'Kremalı Taze Mantar Çorbası',
    title_en: 'Creamy Wild Mushroom Soup',
    title_de: 'Cremige Pilzsuppe',
    subtitle: 'Tereyağında sotelenmiş istiridye & kültür mantarı ve taze krema',
    subtitle_en: 'Sautéed forest mushrooms infused with cream and fresh thyme',
    subtitle_de: 'Gebratene Waldpilze mit Sahne und frischem Thymian',
    description: 'İnce dilimlenmiş mantarların tereyağında karamelize edilip taze krema ve taze kekikle buluştuğu ipeksi lezzet.',
    description_en: 'Earthy pan-browned mushrooms gently simmered in velvety cream and seasoned with fresh garden thyme.',
    description_de: 'Aromatische Pilzsuppe mit feiner Sahne und Gartenkräutern.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.8, reviewCount: 230,
    tags: ['Çorba', 'Vejetaryen', 'Sağlıklı'],
    allergens: ['Süt & Laktoz', 'Glüten', 'Mantar'],
    basePortions: 2, matchScore: 91, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze Kültür Mantarı', amount: 350, unit: 'g', category: 'Produce' },
      { name: 'Tereyağı', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Un', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Taze Sıvı Krema', amount: 100, unit: 'ml', category: 'Dairy' },
      { name: 'Süt', amount: 1, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Taze Kekik & Karabiber', amount: 1, unit: 'çay kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Mantarları Sotele', description: 'Mantarları ince dilimleyip tereyağında suyunu çekene kadar yüksek ateşte soteleyin.', chef: 'chef1', chefName: '1. Şef', durationMins: 6 },
      { id: 2, title: 'Meyaneyi Bağla', description: 'Unu ekleyip 1 dakika kavurun. Süt ve sıcak suyu yavaşça ekleyerek çırpın.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Kremayı Ekleyip Dinlendir', description: 'Kremayı ekleyip bir taşım kaynatın. Taze kekik ve karabiberle servis yapın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 4 }
    ]
  },
  {
    id: 'dish-14',
    title: 'Kremalı Şifalı Brokoli Çorbası',
    title_en: 'Velvety Broccoli Soup',
    title_de: 'Samtige Brokkolisuppe',
    subtitle: 'Taze brokoli, patates, krema ve muskat cevizi aroması',
    subtitle_en: 'Emerald broccoli florets pureed with cream and nutmeg',
    subtitle_de: 'Feine Brokkoliröschen mit Sahne und Muskatnuss',
    description: 'Yeşilin en sağlıklı tonu: Brokoli ve patatesin sebze suyunda yumuşatılıp krema ile pürüzsüz kadife kıvama getirilmesi.',
    description_en: 'Vibrant green soup packed with nutrients, blended smooth with cream and a hint of fragrant nutmeg.',
    description_de: 'Grüne Vitaminbombe, cremig püriert und fein abgeschmeckt.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.7, reviewCount: 180,
    tags: ['Çorba', 'Vejetaryen', 'Sağlıklı'],
    allergens: ['Süt & Laktoz'],
    basePortions: 2, matchScore: 88, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze Brokoli', amount: 500, unit: 'g', category: 'Produce' },
      { name: 'Patates', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Kuru Soğan', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Zeytinyağı & Tereyağı', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Taze Krema', amount: 100, unit: 'ml', category: 'Dairy' },
      { name: 'Muskat Cevizi Rendesi', amount: 1, unit: 'tutam', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Sebzeleri Haşla', description: 'Soğan, patates ve brokoliyi sebze suyunda yumuşayana dek 12 dakika haşlayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 12 },
      { id: 2, title: 'Pürüzsüz Çek', description: 'Sebzeleri el blenderıyla ipeksi yeşil püre olana kadar çekin.', chef: 'chef2', chefName: '2. Şef', durationMins: 3 },
      { id: 3, title: 'Krema ve Baharatları Ekle', description: 'Krema, muskat cevizi ve karabiberi ekleyip 2 dakika kısık ateşte ısıtın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 3 }
    ]
  },
  {
    id: 'dish-15',
    title: 'Karadeniz Usulü Balık Çorbası',
    title_en: 'Black Sea Fish Soup',
    title_de: 'Schwarzmeer-Fischsuppe',
    subtitle: 'Taze levrek fileto, havuç, kereviz sapı ve limonlu yumurta terbiyesi',
    subtitle_en: 'Fresh sea bass chunks with root veggies in lemon liaison',
    subtitle_de: 'Frischer Wolfsbarsch mit Wurzelgemüse in Zitronenbrühe',
    description: 'Kemiklerinden süzülen aromatik balık suyu, taze levrek parçaları ve sebzelerin limonlu terbiye ile taçlandırıldığı enfes lezzet.',
    description_en: 'Clear aromatic fish broth infused with root vegetables and finished with an egg-lemon liaison.',
    description_de: 'Würzige Fischsuppe von der Schwarzmeerküste mit Kräutern und Zitrone.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Medium', rating: 4.8, reviewCount: 210,
    tags: ['Çorba', 'Deniz Ürünleri', 'Sağlıklı'],
    allergens: ['Balık', 'Yumurta'],
    basePortions: 2, matchScore: 93, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze Levrek Fileto (Küp Doğranmış)', amount: 350, unit: 'g', category: 'Meat' },
      { name: 'Aromatik Balık Suyu', amount: 4, unit: 'su bardağı', category: 'Meat' },
      { name: 'Havuç & Kereviz Sapı', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Yumurta Sarısı & Limon', amount: 1, unit: 'adet', category: 'Dairy' },
      { name: 'Taze Dereotu', amount: 0.5, unit: 'demet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Sebzeleri Haşla', description: 'Küp doğranmış havuç ve kereviz saplarını balık suyunda yumuşayana kadar pişirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Balıkları Ekle', description: 'Küp levrek parçalarını ekleyip 5 dakika narin ateşte pişirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Terbiye ile Bağla', description: 'Limonlu yumurta terbiyesini azar azar ekleyip karıştırın, dereotu serperek sunun.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 4 }
    ]
  },

  // ==========================================
  // 2. EV & TENCERE YEMEKLERİ (dish-16 .. dish-40)
  // ==========================================
  {
    id: 'dish-16',
    title: 'Fırında Klasik Karnıyarık',
    title_en: 'Classic Stuffed Eggplant (Karniyarik)',
    title_de: 'Klassische gefüllte Auberginen (Karniyarik)',
    subtitle: 'Kıymalı, domatesli ve sivri biberli nar gibi fırın patlıcan',
    subtitle_en: 'Tender baked eggplants stuffed with seasoned minced beef',
    subtitle_de: 'Geschmorte Auberginen mit Hackfleisch und Tomaten',
    description: 'Türk mutfağının başyapıtı: Çizgili soyulup kızartılan patlıcanların lezzetli dana kıyma harcı ile doldurulup fırında pişmesi.',
    description_en: 'Iconic Turkish home-style dish: tender roasted eggplants stuffed with a savory minced beef and tomato filling.',
    description_de: 'Der Klassiker der türkischen Hausmannskost: Auberginen gefüllt mit saftigem Rinderhackfleisch.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '40 dk', prepTimeMinutes: 40, difficulty: 'Medium', rating: 5.0, reviewCount: 650,
    tags: ['Ev Yemeği', 'Tencere', 'Et'],
    allergens: [],
    basePortions: 2, matchScore: 99, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kemer Patlıcan', amount: 4, unit: 'adet', category: 'Produce' },
      { name: 'Orta Yağlı Dana Kıyma', amount: 300, unit: 'g', category: 'Meat' },
      { name: 'Kuru Soğan', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Domates & Sivri Biber', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Sarımsak', amount: 3, unit: 'diş', category: 'Produce' },
      { name: 'Salça & Zeytinyağı', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Patlıcanları Hazırla', description: 'Patlıcanları alacalı soyup tuzlu suda bekletin, kurulayıp fırında veya tavada yumuşayana kadar kızartın.', chef: 'chef1', chefName: '1. Şef', durationMins: 15 },
      { id: 2, title: 'Kıymalı Harcı Pişir', description: 'Soğan, sarımsak, kıyma ve domatesi tavada kavurup baharatlarla lezzetlendirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 12 },
      { id: 3, title: 'Doldur ve Fırınla', description: 'Patlıcanların karnını yarıp kıymalı harcı doldurun, biber ve domatesle süsleyip salçalı sosla 200°C fırında 20 dk pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 20 }
    ]
  },
  {
    id: 'dish-17',
    title: 'Toprak Güveçte Kuru Fasulye',
    title_en: 'Clay Pot White Bean Stew',
    title_de: 'Weiße Bohnen im Tontopf',
    subtitle: 'İspir kuru fasulyesi, dana kuşbaşı et ve tereyağlı salça sosu',
    subtitle_en: 'Slow-cooked white beans with tender beef chunks in rich gravy',
    subtitle_de: 'Langsam geschmorte weiße Bohnen mit zartem Rindfleisch',
    description: 'Özel İspir fasulyelerinin dana eti ve tereyağı ile toprak güveçte helmelenerek pişirilmesi. Yanında tane pirinç pilavıyla karşı konulmaz.',
    description_en: 'Melt-in-your-mouth stewed white beans with fork-tender beef chunks simmered in spiced tomato broth.',
    description_de: 'Deftiger Eintopf aus weißen Bohnen und Rindfleisch mit buttriger Tomatensauce.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '45 dk', prepTimeMinutes: 45, difficulty: 'Medium', rating: 4.9, reviewCount: 580,
    tags: ['Ev Yemeği', 'Tencere', 'Et'],
    allergens: ['Süt & Laktoz'],
    basePortions: 2, matchScore: 98, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'İspir Kuru Fasulye', amount: 2, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Dana Kuşbaşı Et', amount: 250, unit: 'g', category: 'Meat' },
      { name: 'Tereyağı', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Kuru Soğan', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Domates & Biber Salçası', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Etleri Mühürle', description: 'Güveçte dana kuşbaşı etleri suyunu salıp çekene kadar tereyağında soteleyin.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Soğan ve Salçayı Kavur', description: 'Doğranmış soğan ve salçaları ekleyip kokusu çıkana kadar kavurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Fasulyeyi Kat ve Kısık Ateşte Pişir', description: 'Haşlanmış fasulyeleri ve sıcak suyu ekleyip güvecin kapağını kapatın, kısık ateşte helmelenene dek 25 dk pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 25 }
    ]
  },
  {
    id: 'dish-18',
    title: 'Zeytinyağlı İmam Bayıldı',
    title_en: 'Imam Bayildi (Olive Oil Braised Eggplant)',
    title_de: 'Imam Bayildi (Geschmorte Auberginen)',
    subtitle: 'Bol karamelize soğan, sarımsak, domates ve sızma zeytinyağı',
    subtitle_en: 'Whole roasted eggplants brimming with sweet caramelized onions',
    subtitle_de: 'Ganze Auberginen gefüllt mit karamellisierten Zwiebeln',
    description: 'Ege’nin en sevilen zeytinyağlısı: Soğan ve sarımsakların zeytinyağında tatlanıp patlıcanların içine doldurularak soğuk servis edilmesi.',
    description_en: 'A vegetarian masterpiece: roasted eggplants stuffed with a luscious mixture of onions, garlic, and fresh tomatoes.',
    description_de: 'Legendäres vegetarisches Gericht aus geschmorten Auberginen und Zwiebeln in Olivenöl.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Easy', rating: 4.8, reviewCount: 310,
    tags: ['Ev Yemeği', 'Zeytinyağlı', 'Vejetaryen', 'Sağlıklı'],
    allergens: [],
    basePortions: 2, matchScore: 92, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kemer Patlıcan', amount: 4, unit: 'adet', category: 'Produce' },
      { name: 'Piyazlık Kuru Soğan', amount: 3, unit: 'adet', category: 'Produce' },
      { name: 'Domates', amount: 3, unit: 'adet', category: 'Produce' },
      { name: 'Sarımsak', amount: 6, unit: 'diş', category: 'Produce' },
      { name: 'Sızma Zeytinyağı', amount: 0.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Toz Şeker', amount: 1, unit: 'tatlı kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Patlıcanları Fırınla', description: 'Patlıcanları alacalı soyup zeytinyağı ile yağlayarak fırında yumuşayana dek pişirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 15 },
      { id: 2, title: 'Soğanlı Harcı Karamelize Et', description: 'Bol soğanı sarımsak, domates, zeytinyağı ve şekerle kısık ateşte karamelize edin.', chef: 'chef2', chefName: '2. Şef', durationMins: 12 },
      { id: 3, title: 'Doldur ve Demlendir', description: 'Patlıcanları harçla doldurup tencerede 15 dakika kısık ateşte pişirin. Soğuk servis yapın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 15 }
    ]
  },
  {
    id: 'dish-19',
    title: 'Zeytinyağlı Taze Çalı Fasulye',
    title_en: 'Olive Oil Braised Green Beans',
    title_de: 'Grüne Bohnen in Olivenöl',
    subtitle: 'Yaz domatesleri, zeytinyağı ve kesme şeker dokunuşu',
    subtitle_en: 'Tender flat green beans braised in fresh tomato and olive oil',
    subtitle_de: 'Zarte grüne Bohnen geschmort mit Tomaten und Olivenöl',
    description: 'Taze çıtır çalı fasulyelerinin bol domates ve sızma zeytinyağında kendi suyunda ağır ağır pişirilip dinlendirilmesi.',
    description_en: 'Crisp green beans slow-cooked with vine tomatoes and extra virgin olive oil, served chilled or warm.',
    description_de: 'Mediterraner Klassiker mit frischen Buschbohnen und fruchtigen Tomaten.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Easy', rating: 4.8, reviewCount: 290,
    tags: ['Ev Yemeği', 'Zeytinyağlı', 'Vejetaryen', 'Sağlıklı'],
    allergens: [],
    basePortions: 2, matchScore: 90, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze Çalı Fasulye', amount: 500, unit: 'g', category: 'Produce' },
      { name: 'Rendelenmiş Domates', amount: 3, unit: 'adet', category: 'Produce' },
      { name: 'Kuru Soğan', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Sızma Zeytinyağı', amount: 4, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Kesme Şeker & Tuz', amount: 1, unit: 'tatlı kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Fasulyeleri Ayıkla', description: 'Fasulyelerin kılçıklarını temizleyip boyuna ikiye bölerek doğrayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Soğan ve Domatesi Hazırla', description: 'Soğanları yemeklik doğrayıp tencerenin tabanına yayın, üzerine fasulyeleri ve domatesleri dizin.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Kendi Suyunda Pişir', description: 'Zeytinyağı, tuz ve şekeri ekleyip kapağı kapalı olarak kısık ateşte 25 dakika pişmeye bırakın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 25 }
    ]
  },
  {
    id: 'dish-20',
    title: 'Hünkar Beğendi',
    title_en: 'Hunkar Begendi (Sultan’s Delight)',
    title_de: 'Hünkâr Begendi (Des Sultans Freude)',
    subtitle: 'Köz patlıcanlı kadife beşamel püre ve lokum dana tas kebabı',
    subtitle_en: 'Tender braised lamb over velvety smoked eggplant bechamel',
    subtitle_de: 'Geschmortes Lammfleisch auf geräuchertem Auberginen-Püree',
    description: 'Sultanların sofrasına layık saray lezzeti: Köz kokulu patlıcan ve kaşarlı beşamel püresi üzerine yumuşacık et kavurması.',
    description_en: 'Fit for royalty: meltingly tender braised meat served atop smoky eggplant puree enriched with aged cheese.',
    description_de: 'Eines der feinsten osmanischen Gerichte: Butterzartes Fleisch auf cremigem Auberginenpüree.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    prepTime: '45 dk', prepTimeMinutes: 45, difficulty: 'Medium', rating: 5.0, reviewCount: 710,
    tags: ['Ev Yemeği', 'Et', 'Tencere'],
    allergens: ['Süt & Laktoz', 'Glüten'],
    basePortions: 2, matchScore: 99, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kuşbaşı Dana Eti', amount: 350, unit: 'g', category: 'Meat' },
      { name: 'Közlenmiş Patlıcan', amount: 3, unit: 'adet', category: 'Produce' },
      { name: 'Tereyağı & Un', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Süt', amount: 1.5, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Rendelenmiş Kaşar Peyniri', amount: 1, unit: 'çay bardağı', category: 'Dairy' },
      { name: 'Domates Salçası & Soğan', amount: 1, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Tas Kebabını Pişir', description: 'Dana etlerini soğan ve salça ile tencerede lokum gibi yumuşayana dek pişirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 25 },
      { id: 2, title: 'Beğendi Püresini Hazırla', description: 'Tereyağında unu kavurup süt ekleyerek beşamel sos yapın. İnce kıyılmış köz patlıcan ve kaşarı yedirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 10 },
      { id: 3, title: 'Tabakta Birleştir', description: 'Sıcak beğendi püresini servis tabağına yayın, ortasına etli tas kebabını koyup sıcak servis edin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 4 }
    ]
  },
  {
    id: 'dish-21',
    title: 'Fırında Anne Usulü İzmir Köfte',
    title_en: 'Izmir Style Meatballs & Potatoes',
    title_de: 'Izmir Köfte mit Kartoffeln aus dem Ofen',
    subtitle: 'Baharatlı parmak köfteler, elma dilim patates ve domates sosu',
    subtitle_en: 'Spiced oblong meatballs baked with potato wedges in tomato glaze',
    subtitle_de: 'Würzige Hackfleischbällchen mit Kartoffelspalten in Tomatensauce',
    description: 'Çocukluğumuzun en sevilen kokusu: İçi sulu köfteler, patates dilimleri ve tatlı sivri biberlerin salçalı fırın sosunda buluşması.',
    description_en: 'Beloved family classic: seasoned minced beef meatballs baked alongside crispy potatoes in rich herb tomato sauce.',
    description_de: 'Beliebtes Familiengericht mit herzhaften Frikadellen und gebackenen Kartoffeln.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Easy', rating: 4.9, reviewCount: 480,
    tags: ['Ev Yemeği', 'Et', 'Tencere'],
    allergens: ['Glüten', 'Yumurta'],
    basePortions: 2, matchScore: 97, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Dana Kıyma', amount: 350, unit: 'g', category: 'Meat' },
      { name: 'Patates', amount: 3, unit: 'adet', category: 'Produce' },
      { name: 'Kuru Soğan & Maydanoz', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Galeta Unu / Bayat Ekmek', amount: 0.5, unit: 'çay bardağı', category: 'Pantry' },
      { name: 'Domates & Sivri Biber', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Salçalı Sıcak Sos', amount: 1.5, unit: 'su bardağı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Köfteleri Yoğur ve Şekil Ver', description: 'Kıyma, rendelenmiş soğan, ekmek içi ve baharatları yoğurup parmak şeklinde köfteler yapın.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Patatesleri Dilimle ve Hafif Kızart', description: 'Patatesleri elma dilim doğrayıp tavada 3 dakika hafifçe mühürleyin.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Tepsiye Diz ve Fırınla', description: 'Köfte ve patatesleri fırın tepsisine sırayla dizin, salçalı sosu döküp 200°C fırında 20 dakika pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 20 }
    ]
  },
  {
    id: 'dish-22',
    title: 'Geleneksel Etli Orman Kebabı',
    title_en: 'Orman Kebabi (Forest Stew)',
    title_de: 'Orman Kebabı (Wald-Eintopf)',
    subtitle: 'Kuzu kuşbaşı et, bezelye, havuç, patates ve dağ kekiği',
    subtitle_en: 'Rustic lamb ragout with spring peas, carrots, and wild thyme',
    subtitle_de: 'Rustikaler Lammeintopf mit Erbsen, Möhren und Thymian',
    description: 'Bolu mutfağının başyapıtı: Kuşbaşı etlerin taze bezelye, havuç ve kekikle tencerede ağır ateşte lezzetlendirilmesi.',
    description_en: 'Comforting rustic stew of tender lamb braised with sweet green peas, diced carrots, and fragrant thyme.',
    description_de: 'Traditioneller Eintopf aus Bolu mit zartem Lammfleisch und Gartengemüse.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    prepTime: '40 dk', prepTimeMinutes: 40, difficulty: 'Medium', rating: 4.8, reviewCount: 270,
    tags: ['Ev Yemeği', 'Et', 'Tencere'],
    allergens: [],
    basePortions: 2, matchScore: 94, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kuzu Kuşbaşı Et', amount: 350, unit: 'g', category: 'Meat' },
      { name: 'Taze Bezelye', amount: 1, unit: 'su bardağı', category: 'Produce' },
      { name: 'Havuç & Patates', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Arpacık Soğan', amount: 8, unit: 'adet', category: 'Produce' },
      { name: 'Tereyağı & Dağ Kekiği', amount: 2, unit: 'yemek kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Etleri Sotele', description: 'Kuzu etlerini tereyağında arpacık soğanlarla birlikte rengi dönene kadar kavurun.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Sebzeleri Ekle', description: 'Küp doğranmış patates, havuç ve bezelyeleri ekleyip birkaç dakika soteleyin.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Kekikle Pişir', description: 'Sıcak su ve dağ kekiği ilave edip kısık ateşte etler lokum kıvamına gelene kadar 25 dakika pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 25 }
    ]
  },
  {
    id: 'dish-23',
    title: 'Geleneksel Tas Kebabı',
    title_en: 'Tas Kebabi (Classic Beef Stew)',
    title_de: 'Tas Kebabı (Türkisches Gulasch)',
    subtitle: 'Yumuşacık dana eti, arpacık soğan ve tereyağlı patates püresi ile',
    subtitle_en: 'Fork-tender braised beef served over buttery potato mash',
    subtitle_de: 'Zart geschmortes Rindfleisch auf buttrigem Kartoffelpüree',
    description: 'Lokanta klasiği: Ağır ateşte tereyağlı salça sosunda pişen yumuşacık dana etlerinin sıcak patates püresiyle buluşması.',
    description_en: 'Classic Turkish comfort food: slow-braised beef cubes in a rich tomato gravy served over cloud-like mashed potatoes.',
    description_de: 'Klassisches Schmorgericht mit saftigen Rindfleischwürfeln und cremigem Püree.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    prepTime: '40 dk', prepTimeMinutes: 40, difficulty: 'Medium', rating: 4.9, reviewCount: 390,
    tags: ['Ev Yemeği', 'Et', 'Tencere'],
    allergens: ['Süt & Laktoz'],
    basePortions: 2, matchScore: 96, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Dana Kuşbaşı Et', amount: 350, unit: 'g', category: 'Meat' },
      { name: 'Arpacık Soğan', amount: 10, unit: 'adet', category: 'Produce' },
      { name: 'Sarımsak', amount: 3, unit: 'diş', category: 'Produce' },
      { name: 'Tereyağı & Salça', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Patates Püresi Malzemeleri', amount: 1, unit: 'porsiyon', category: 'Dairy' }
    ],
    steps: [
      { id: 1, title: 'Etleri Mühürle', description: 'Kuşbaşı dana etlerini yüksek ateşte döküm tencerede mühürleyin.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Soğan ve Salçayı Ekle', description: 'Arpacık soğan, sarımsak ve salçayı katıp kokusu çıkana kadar kavurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Kısık Ateşte Ağır Pişir', description: 'Sıcak suyu ekleyip kısık ateşte etler yumuşayana dek 25 dk pişirin. Sıcak püre üzerinde servis edin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 25 }
    ]
  },
  {
    id: 'dish-24',
    title: 'Fırında Patlıcan Musakka',
    title_en: 'Eggplant Moussaka',
    title_de: 'Auberginen-Moussaka',
    subtitle: 'Fırınlanmış patlıcan katları, baharatlı kıyma ve domates sosu',
    subtitle_en: 'Layered roasted eggplant with spiced ground beef in tomato broth',
    subtitle_de: 'Gebackene Auberginen-Schichten mit Hackfleisch',
    description: 'Kızarmış patlıcanların fırın tepsisine dizilip üzerine leziz dana kıymalı domates sosunun yayılmasıyla pişen doyurucu lezzet.',
    description_en: 'Comforting home-style bake of layered caramelized eggplants topped with aromatic minced beef sauce.',
    description_de: 'Herzhafter Auberginen-Auflauf mit würzigem Hackfleisch und Tomaten.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Easy', rating: 4.8, reviewCount: 310,
    tags: ['Ev Yemeği', 'Et', 'Tencere'],
    allergens: [],
    basePortions: 2, matchScore: 93, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kemer Patlıcan', amount: 3, unit: 'adet', category: 'Produce' },
      { name: 'Dana Kıyma', amount: 300, unit: 'g', category: 'Meat' },
      { name: 'Kuru Soğan', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Domates & Sivri Biber', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Salça & Baharatlar', amount: 1, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Patlıcanları Dilimle ve Fırınla', description: 'Patlıcanları halka dilimleyip fırında yumuşayana kadar kızartın.', chef: 'chef1', chefName: '1. Şef', durationMins: 12 },
      { id: 2, title: 'Kıymalı Sosu Hazırla', description: 'Soğan, biber ve kıymayı salça ile kavurup domates sosunu ekleyin.', chef: 'chef2', chefName: '2. Şef', durationMins: 10 },
      { id: 3, title: 'Tepsiyi Birleştir ve Fırınla', description: 'Patlıcanların üzerine kıymalı harcı dökün, 190°C fırında 15 dakika pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 15 }
    ]
  },
  {
    id: 'dish-25',
    title: 'Gaziantep Kuru Patlıcan Dolması',
    title_en: 'Dried Stuffed Eggplants',
    title_de: 'Gefüllte getrocknete Auberginen',
    subtitle: 'Güneşte kurutulmuş patlıcan, sumak ekşili pirinç ve zırh kıyması',
    subtitle_en: 'Sun-dried baby eggplants filled with sumac-spiced rice and beef',
    subtitle_de: 'Getrocknete Auberginen gefüllt mit Sumach-Reis und Fleisch',
    description: 'Antep’in meşhur kurutulmuş patlıcanlarının nar ekşisi, sumak ve baharatlı pirinç harcı ile doldurulup tencerede demlenmesi.',
    description_en: 'Deeply flavorful sun-dried eggplants rehydrated and packed with tangy sumac, pomegranate molasses, and spiced filling.',
    description_de: 'Südostanatolische Delikatesse mit getrockneten Auberginen und feiner Säure.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '45 dk', prepTimeMinutes: 45, difficulty: 'Medium', rating: 5.0, reviewCount: 620,
    tags: ['Ev Yemeği', 'Et', 'Tencere'],
    allergens: [],
    basePortions: 2, matchScore: 98, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kuru Patlıcan', amount: 12, unit: 'adet', category: 'Pantry' },
      { name: 'Kıyma & Baldo Pirinç', amount: 150, unit: 'g', category: 'Meat' },
      { name: 'Kuru Soğan & Sarımsak', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Sumak Ekşisi & Nar Ekşisi', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Biber Salçası & Zeytinyağı', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Kuru Patlıcanları Haşla', description: 'Kuru patlıcanları kaynar suda 7-8 dakika yumuşayana kadar haşlayıp soğuk suya alın.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Dolma Harcını Yoğur', description: 'Pirinç, kıyma, soğan, sarımsak, salça, sumak ve baharatları çiğden yoğurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 8 },
      { id: 3, title: 'Doldur ve Tencereye Diz', description: 'Patlıcanları yarısına kadar doldurup tencereye sıkıca dizin, ekşili sosla kısık ateşte 35 dk pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 35 }
    ]
  },
  {
    id: 'dish-26',
    title: 'Geleneksel Etli Biber Dolması',
    title_en: 'Stuffed Bell Peppers with Meat',
    title_de: 'Gefüllte Paprikaschoten mit Fleisch',
    subtitle: 'Taze dolmalık biberler, kıymalı nane harcı ve sarımsaklı yoğurt',
    subtitle_en: 'Sweet bell peppers filled with savory ground beef and herbs',
    subtitle_de: 'Paprika gefüllt mit Hackfleisch, Kräutern und Reis',
    description: 'İnce kabuklu taze dolmalık biberlerin kıymalı pirinç harcı ile doldurulup domates kapaklarıyla pişirilmesi.',
    description_en: 'Tender bell peppers stuffed with ground beef, rice, and fresh mint, served with garlic yogurt.',
    description_de: 'Traditionell gefüllte Paprika, serviert mit frischem Knoblauchjoghurt.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Easy', rating: 4.8, reviewCount: 340,
    tags: ['Ev Yemeği', 'Et', 'Tencere'],
    allergens: [],
    basePortions: 2, matchScore: 92, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Dolmalık Biber', amount: 8, unit: 'adet', category: 'Produce' },
      { name: 'Dana Kıyma', amount: 250, unit: 'g', category: 'Meat' },
      { name: 'Baldo Pirinç', amount: 0.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Kuru Soğan & Taze Nane', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Domates (Kapak İçin)', amount: 2, unit: 'adet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Biberleri Ayıkla', description: 'Biberlerin saplarını çıkarıp iç çekirdeklerini temizleyin.', chef: 'chef1', chefName: '1. Şef', durationMins: 6 },
      { id: 2, title: 'Harcı Hazırla', description: 'Kıyma, pirinç, ince doğranmış soğan, nane ve salçayı yoğurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Doldur ve Pişir', description: 'Biberleri doldurup domates kapaklarıyla kapatın, tencerede salçalı suyla 30 dk pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 30 }
    ]
  },
  {
    id: 'dish-27',
    title: 'Zeytinyağlı Çanak Enginar',
    title_en: 'Olive Oil Braised Artichoke Hearts',
    title_de: 'Artischockenherzen in Olivenöl',
    subtitle: 'Havuç, bezelye, patates garnitürü, portakal suyu ve dereotu',
    subtitle_en: 'Tender artichoke bottoms filled with spring vegetables and orange glaze',
    subtitle_de: 'Artischockenböden gefüllt mit Gemüse in Orangensauce',
    description: 'Ege sofralarının bahar müjdesi: Çanak enginarların taze garnitür, sızma zeytinyağı ve taze portakal suyunda yumuşatılması.',
    description_en: 'Delicate artichoke bottoms crowned with peas and diced carrots, braised in a fragrant olive oil and citrus broth.',
    description_de: 'Elegantes Frühlingsgericht mit feinen Artischocken und frischem Dill.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Easy', rating: 4.8, reviewCount: 220,
    tags: ['Ev Yemeği', 'Zeytinyağlı', 'Vejetaryen', 'Sağlıklı'],
    allergens: [],
    basePortions: 2, matchScore: 91, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Çanak Enginar', amount: 4, unit: 'adet', category: 'Produce' },
      { name: 'Garnitür (Bezelye, Havuç, Patates)', amount: 1.5, unit: 'su bardağı', category: 'Produce' },
      { name: 'Taze Portakal Suyu', amount: 1, unit: 'çay bardağı', category: 'Produce' },
      { name: 'Sızma Zeytinyağı', amount: 4, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Taze Dereotu', amount: 0.5, unit: 'demet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Enginarları Diz', description: 'Çanak enginarları limonlu sudan çıkarıp tencereye dizin.', chef: 'chef1', chefName: '1. Şef', durationMins: 4 },
      { id: 2, title: 'Garnitürü Paylaştır', description: 'Enginar çanaklarının içine havuç, patates ve bezelye garnitürünü doldurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 4 },
      { id: 3, title: 'Narenciyeli Sosla Pişir', description: 'Portakal suyu, zeytinyağı ve tuzu ekleyip kısık ateşte 25 dakika pişirin. Dereotu serpin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 25 }
    ]
  },
  {
    id: 'dish-28',
    title: 'Zeytinyağlı Barbunya Pilaki',
    title_en: 'Borlotti Bean Stew (Barbunya Pilaki)',
    title_de: 'Wachtelbohnen-Eintopf (Barbunya Pilaki)',
    subtitle: 'Tatlı havuç, patates, sarımsak ve bol sızma zeytinyağı',
    subtitle_en: 'Creamy borlotti beans braised with sweet carrots and fresh parsley',
    subtitle_de: 'Cremige Wachtelbohnen geschmort mit Karotten und Petersilie',
    description: 'Lokanta vitrinlerinin kraliçesi: Taze barbunyaların havuç, sarımsak ve zeytinyağı ile pişirilip soğutulmuş enfes tadı.',
    description_en: 'Tender cranberry beans simmered with carrots, potatoes, and garlic in a silky olive oil emulsion.',
    description_de: 'Kalter Bohneneintopf in fruchtigem Olivenöl mit Zitrone und Petersilie.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Easy', rating: 4.9, reviewCount: 360,
    tags: ['Ev Yemeği', 'Zeytinyağlı', 'Vejetaryen', 'Sağlıklı'],
    allergens: [],
    basePortions: 2, matchScore: 94, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze Barbunya', amount: 500, unit: 'g', category: 'Produce' },
      { name: 'Havuç (Halka Doğranmış)', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Patates (Küp Doğranmış)', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Sarımsak', amount: 4, unit: 'diş', category: 'Produce' },
      { name: 'Sızma Zeytinyağı', amount: 0.5, unit: 'çay bardağı', category: 'Pantry' },
      { name: 'Taze Maydanoz & Limon', amount: 1, unit: 'adet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Barbunyayı Önceden Haşla', description: 'Barbunyaları 10 dakika haşlayıp kara suyunu süzün.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Sebzeleri Sotele', description: 'Zeytinyağında soğan, sarımsak ve havuçları hafifçe kavurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Birlikte Pişir ve Dinlendir', description: 'Barbunyaları ve patatesleri ekleyip 20 dakika kısık ateşte pişirin. Soğuk servis edin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 20 }
    ]
  },
  {
    id: 'dish-29',
    title: 'Kıymalı Taze Ispanak Yemeği',
    title_en: 'Minced Beef & Spinach Stew',
    title_de: 'Spinat-Hackfleisch-Pfanne',
    subtitle: 'Taze körpe ıspanak, dana kıyma, pirinç ve yanında tava yoğurdu',
    subtitle_en: 'Tender baby spinach wilted with seasoned beef and rice',
    subtitle_de: 'Frischer Spinat geschmort mit Rinderhack und Joghurt',
    description: 'Demir deposu anne yemeği: Taze ıspanakların dana kıyma ve pirinçle kavrulması, üzerine soğuk süzme yoğurt koyarak yenmesi.',
    description_en: 'Wholesome skillet of baby spinach simmered with savory ground beef and rice, served with cool yogurt.',
    description_de: 'Gesundes Hausgericht mit frischem Spinat und kühlem Joghurt.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Easy', rating: 4.8, reviewCount: 290,
    tags: ['Ev Yemeği', 'Et', 'Sağlıklı', 'Tencere'],
    allergens: ['Süt & Laktoz'],
    basePortions: 2, matchScore: 93, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze Ispanak', amount: 600, unit: 'g', category: 'Produce' },
      { name: 'Dana Kıyma', amount: 200, unit: 'g', category: 'Meat' },
      { name: 'Kuru Soğan', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Baldo Pirinç', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Tava Yoğurdu', amount: 1, unit: 'kase', category: 'Dairy' }
    ],
    steps: [
      { id: 1, title: 'Ispanakları Yıka ve Doğra', description: 'Ispanakları bol suda yıkayıp iri parçalar halinde doğrayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Kıymayı ve Soğanı Kavur', description: 'Tencerede soğanı ve dana kıymayı salça ile kavurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Ispanak ve Pirinci Kat', description: 'Ispanakları ve pirinci ekleyip kapağını kapatın, 15 dakika kısık ateşte pişirin. Yoğurtla sunun.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 15 }
    ]
  },
  {
    id: 'dish-30',
    title: 'Toprak Güveçte Etli Nohut Yemeği',
    title_en: 'Slow-Cooked Chickpea & Lamb Stew',
    title_de: 'Kichererbsen-Lammeintopf im Tontopf',
    subtitle: 'Koçbaşı nohut, kuşbaşı dana eti ve tereyağlı salça sosu',
    subtitle_en: 'Plump chickpeas and tender beef braised in spiced tomato gravy',
    subtitle_de: 'Kichererbsen mit zartem Rindfleisch langsam geschmort',
    description: 'Tane tane pirinç pilavının en iyi arkadaşı: Yumuşacık koçbaşı nohutların et suyu ve tereyağında saatlerce özleşmesi.',
    description_en: 'Satisfying Anatolian staple: hearty chickpeas braised with beef morsels in savory tomato reduction.',
    description_de: 'Herzhafter Eintopf aus Kichererbsen und saftigem Fleisch.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '40 dk', prepTimeMinutes: 40, difficulty: 'Medium', rating: 4.8, reviewCount: 380,
    tags: ['Ev Yemeği', 'Et', 'Tencere'],
    allergens: ['Süt & Laktoz'],
    basePortions: 2, matchScore: 94, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Koçbaşı Nohut (Haşlanmış)', amount: 2, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Dana Kuşbaşı Et', amount: 250, unit: 'g', category: 'Meat' },
      { name: 'Kuru Soğan', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Tereyağı & Salça', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Sivri Biber', amount: 2, unit: 'adet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Etleri Sotele', description: 'Dana etlerini tereyağında suyunu çekene kadar soteleyin.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Soğan ve Salçayı Kavur', description: 'Soğan ve salçayı ilave edip 3 dakika kokusu çıkana dek kavurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Nohutla Kaynat', description: 'Nohutları ve sıcak suyu ilave edip kısık ateşte 20 dakika özleşene kadar pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 20 }
    ]
  },
  {
    id: 'dish-31',
    title: 'Geleneksel Kıymalı Bezelye Yemeği',
    title_en: 'Sweet Pea & Ground Beef Stew',
    title_de: 'Erbseneintopf mit Hackfleisch',
    subtitle: 'Taze tatlı bezelye, küp patates, havuç ve dana kıyma',
    subtitle_en: 'Sweet green peas with diced potatoes and beef mince',
    subtitle_de: 'Süße Gartenerbsen mit Kartoffeln und Rinderhack',
    description: 'Ev sıcaklığında hafif bir akşam yemeği: Bezelye tanelerinin havuç ve patatesle salçalı suda yumuşacık pişmesi.',
    description_en: 'Vibrant spring peas braised with potatoes and seasoned ground meat in a light tomato broth.',
    description_de: 'Bunter Gemüseeintopf mit Erbsen und zartem Hackfleisch.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Easy', rating: 4.7, reviewCount: 240,
    tags: ['Ev Yemeği', 'Et', 'Tencere'],
    allergens: [],
    basePortions: 2, matchScore: 89, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze/Dondurulmuş Bezelye', amount: 400, unit: 'g', category: 'Produce' },
      { name: 'Dana Kıyma', amount: 200, unit: 'g', category: 'Meat' },
      { name: 'Patates & Havuç', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Kuru Soğan', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Domates Salçası & Zeytinyağı', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Kıymayı ve Soğanı Sotele', description: 'Tencerede kıymayı ve soğanı zeytinyağında kavurun.', chef: 'chef1', chefName: '1. Şef', durationMins: 6 },
      { id: 2, title: 'Küp Sebzeleri Ekle', description: 'Küp doğranmış patates ve havuçları ekleyip 3 dakika soteleyin.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Bezelyeleri Kat ve Pişir', description: 'Bezelyeleri ve sıcak salçalı suyu ekleyip sebzeler yumuşayana dek 18 dakika pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 18 }
    ]
  },
  {
    id: 'dish-32',
    title: 'Zeytinyağlı Havuçlu Pırasa Yemeği',
    title_en: 'Olive Oil Braised Leeks & Carrots',
    title_de: 'Lauchgemüse in Olivenöl',
    subtitle: 'Tatlı pırasa dilimleri, havuç, baldo pirinç ve taze limon suyu',
    subtitle_en: 'Tender braised leeks with sweet carrots and rice in lemon oil',
    subtitle_de: 'Zarter Lauch geschmort mit Karotten und Reis',
    description: 'Kış aylarının şifalı zeytinyağlısı: Pırasaların zeytinyağı, havuç ve limon suyuyla tatlanarak dinlendirilmesi.',
    description_en: 'Melted leeks slow-cooked with rounds of sweet carrots and rice in extra virgin olive oil and citrus juice.',
    description_de: 'Gesundes Wintergemüse aus geschmortem Lauch und Karotten mit feiner Säure.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Easy', rating: 4.7, reviewCount: 190,
    tags: ['Ev Yemeği', 'Zeytinyağlı', 'Vejetaryen', 'Sağlıklı'],
    allergens: [],
    basePortions: 2, matchScore: 88, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Pırasa', amount: 500, unit: 'g', category: 'Produce' },
      { name: 'Havuç (Verev Doğranmış)', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Baldo Pirinç', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Sızma Zeytinyağı', amount: 4, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Taze Limon Suyu & Kesme Şeker', amount: 1, unit: 'adet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Havuçları Sotele', description: 'Zeytinyağında havuçları rengi dönene kadar 3 dakika soteleyin.', chef: 'chef1', chefName: '1. Şef', durationMins: 4 },
      { id: 2, title: 'Pırasaları Ekle', description: 'Verev doğranmış pırasaları tencereye ekleyip hafifçe çevirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 4 },
      { id: 3, title: 'Pirinç ve Limonla Pişir', description: 'Yıkanmış pirinç, limon suyu ve 1 bardak sıcak su ilave ederek 20 dakika kısık ateşte pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 20 }
    ]
  },
  {
    id: 'dish-33',
    title: 'Portakal Sulu Zeytinyağlı Kereviz',
    title_en: 'Orange Braised Celeriac',
    title_de: 'Sellerie in Orangensauce',
    subtitle: 'Kereviz çanakları, havuç, patates ve taze kereviz yaprakları',
    subtitle_en: 'Silky celery root braised with fresh orange juice and dill',
    subtitle_de: 'Geschmorter Knollensellerie mit Orangensaft und Dill',
    description: 'Kerevizi sevdiren özel tarif: Taze sıkılmış portakal suyu ve sızma zeytinyağında pişen kerevizin ipeksi lezzeti.',
    description_en: 'Velvety celeriac cubes simmered with carrots in freshly squeezed orange juice reduction.',
    description_de: 'Aromatischer Knollensellerie in fruchtigem Orangensaft geschmort.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Easy', rating: 4.8, reviewCount: 210,
    tags: ['Ev Yemeği', 'Zeytinyağlı', 'Vejetaryen', 'Sağlıklı'],
    allergens: ['Kereviz'],
    basePortions: 2, matchScore: 89, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kereviz', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Taze Sıkılmış Portakal Suyu', amount: 1, unit: 'su bardağı', category: 'Produce' },
      { name: 'Havuç & Patates', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Sızma Zeytinyağı', amount: 4, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Taze Dereotu & Kereviz Yaprağı', amount: 1, unit: 'tutam', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Kerevizleri Limonlu Suya Al', description: 'Kerevizleri soyup küp doğrayın ve kararmaması için limonlu suda bekletin.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Havuçları Sotele', description: 'Zeytinyağında havuçları kavurup kereviz ve patatesleri ilave edin.', chef: 'chef2', chefName: '2. Şef', durationMins: 4 },
      { id: 3, title: 'Portakal Suyuyla Pişir', description: 'Portakal suyu ve tuz ekleyip kısık ateşte sebzeler yumuşayana dek 20 dakika pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 20 }
    ]
  },
  {
    id: 'dish-34',
    title: 'Geleneksel Ekşili Sulu Köfte',
    title_en: 'Ekşili Köfte (Meatball & Veggie Stew in Lemon Sauce)',
    title_de: 'Ekşili Köfte (Hackbällchen in Zitronensauce)',
    subtitle: 'Misket köfteler, patates, havuç ve limonlu yumurta terbiyesi',
    subtitle_en: 'Mini meatballs with root veggies in creamy lemon-egg emulsion',
    subtitle_de: 'Kleine Hackbällchen mit Gemüse in feiner Zitronenlegierung',
    description: 'Misket büyüklüğünde köftelerin havuç ve patatesle kaynatılıp limonlu yumurta terbiyesiyle taçlandırıldığı nefis sulu yemek.',
    description_en: 'Tender baby beef meatballs gently simmered with diced potatoes in a silken avgolemono-style lemon sauce.',
    description_de: 'Wärmender Eintopf aus feinen Hackbällchen mit samtiger Zitronen-Ei-Sauce.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Medium', rating: 4.9, reviewCount: 370,
    tags: ['Ev Yemeği', 'Et', 'Tencere'],
    allergens: ['Yumurta', 'Glüten'],
    basePortions: 2, matchScore: 95, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kıyma (Misket Köfte)', amount: 250, unit: 'g', category: 'Meat' },
      { name: 'Patates & Havuç', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Baldo Pirinç', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Yumurta Sarısı & Limon', amount: 1, unit: 'adet', category: 'Dairy' },
      { name: 'Un (Köfteleri Bulamak İçin)', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Köfteleri Yuvarla ve Unla', description: 'Kıyma ve pirinci yoğurup minik misket köfteler yapın, unlanmış tepsiye dizip sallayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Sebzeleri Haşla', description: 'Küp patates ve havuçları kaynar suda 8 dakika haşlayın, köfteleri ekleyip 10 dakika pişirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 12 },
      { id: 3, title: 'Terbiye ile Bağla', description: 'Limon ve yumurta sarısını çırpıp yemeğin suyuyla ılıtarak tencereye ekleyin. 2 dakika kaynatıp ocaktan alın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 5 }
    ]
  },
  {
    id: 'dish-35',
    title: 'Fırında Çanak Hasanpaşa Köftesi',
    title_en: 'Hasanpasa Meatballs with Mash',
    title_de: 'Hasanpaşa Köfte mit Püree',
    subtitle: 'Çanak köfteler, üzeri eritilmiş kaşarlı patates püresi ve domates sos',
    subtitle_en: 'Meatball bowls piled high with creamy mashed potatoes and cheese',
    subtitle_de: 'Hackfleischnester gefüllt mit Kartoffelpüree und Käse überbacken',
    description: 'Göz alıcı sunum: Çanak şeklinde şekillendirilen köftelerin içine sıkılan tereyağlı patates püresi ve fırında eriyen kaşar peyniri.',
    description_en: 'Plump meatball cups filled with piping-hot potato puree, blanketed with melted cheese and rich tomato coulis.',
    description_de: 'Köstliche Hackfleischschälchen gefüllt mit cremigem Püree und goldbraunem Käse.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
    prepTime: '40 dk', prepTimeMinutes: 40, difficulty: 'Medium', rating: 4.9, reviewCount: 410,
    tags: ['Ev Yemeği', 'Et', 'Tencere'],
    allergens: ['Süt & Laktoz', 'Glüten', 'Yumurta'],
    basePortions: 2, matchScore: 97, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Dana Kıyma', amount: 350, unit: 'g', category: 'Meat' },
      { name: 'Patates Püresi', amount: 2, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Kaşar Peyniri (Rendelenmiş)', amount: 1, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Kuru Soğan & Galeta Unu', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Domates Sosu', amount: 1, unit: 'su bardağı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Çanak Köfteleri Şekillendir', description: 'Kıymalı harcı yoğurup orta kısmı çukur çanak şeklinde köfteler yapıp fırın tepsisine dizin.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Püreyi Hazırla ve Doldur', description: 'Süt ve tereyağlı patates püresini krema torbasıyla çanak köftelerin içine tepeleme doldurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 8 },
      { id: 3, title: 'Kaşarla Fırınla', description: 'Tepsiye domates sosu dökün, pürelerin üzerine kaşar serpip 200°C fırında üzeri kızarana dek 20 dk pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 20 }
    ]
  },
  {
    id: 'dish-36',
    title: 'Geleneksel Kadınbudu Köfte',
    title_en: 'Kadinbudu Meatballs',
    title_de: 'Kadinbudu Köfte mit Reis',
    subtitle: 'Kavrulmuş kıyma, haşlanmış pirinç, yumurtaya bulanıp kızartılmış',
    subtitle_en: 'Pan-fried beef and rice croquettes coated in crispy egg batter',
    subtitle_de: 'Traditionelle Frikadellen mit Reis in goldgelber Eihülle',
    description: 'Osmanlı’dan yadigar eşsiz bir lezzet: Pişmiş ve çiğ kıymanın pirinçle yoğrulup yumurtaya bulanarak altın sarısı kızartılması.',
    description_en: 'Tender croquettes of minced beef and rice, dipped in egg and pan-fried to golden perfection.',
    description_de: 'Besondere Spezialität aus Hackfleisch und Reis, in Ei gewendet und knusprig gebraten.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Medium', rating: 4.8, reviewCount: 320,
    tags: ['Ev Yemeği', 'Et'],
    allergens: ['Yumurta', 'Glüten'],
    basePortions: 2, matchScore: 93, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Dana Kıyma', amount: 350, unit: 'g', category: 'Meat' },
      { name: 'Haşlanmış Baldo Pirinç', amount: 1, unit: 'çay bardağı', category: 'Pantry' },
      { name: 'Kuru Soğan', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Yumurta (Bulamak İçin)', amount: 2, unit: 'adet', category: 'Dairy' },
      { name: 'Un & Sıvı Yağ', amount: 0.5, unit: 'su bardağı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Kıymanın Yarısını Kavur', description: 'Kıymanın yarısını soğanla kavurup soğutun. Kalan çiğ kıyma, pirinç ve baharatlarla yoğurun.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Oval Köfteler Yap', description: 'Harcı oval yassı köfteler haline getirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Una ve Yumurtaya Bulayıp Kızart', description: 'Köfteleri önce una sonra çırpılmış yumurtaya bulayıp kızgın yağda altın sarısı kızartın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 10 }
    ]
  },
  {
    id: 'dish-37',
    title: 'Toprak Güveçte Kuzu Etli Sebzeli Güveç',
    title_en: 'Clay Pot Lamb & Vegetable Stew',
    title_de: 'Lammeintopf im Römertopf',
    subtitle: 'Kuzu kuşbaşı, patlıcan, arpacık soğan, domates ve sarımsak',
    subtitle_en: 'Slow-simmered tender lamb with summer vegetables in earthenware',
    subtitle_de: 'Geschmortes Lammfleisch mit buntem Sommergemüse im Tontopf',
    description: 'Toprak güveçte kuzu eti ve sebzelerin saatlerce kendi buharında pişerek enfes aromalarını birbirine geçirmesi.',
    description_en: 'Rustic casserole of succulent lamb baked with eggplants, sweet shallots, and garlic heads.',
    description_de: 'Wunderbar saftiges Lammfleisch im Tontopf mit Auberginen und Schalotten gegart.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    prepTime: '50 dk', prepTimeMinutes: 50, difficulty: 'Medium', rating: 4.9, reviewCount: 460,
    tags: ['Ev Yemeği', 'Et', 'Tencere'],
    allergens: [],
    basePortions: 2, matchScore: 97, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kuzu Kuşbaşı Et', amount: 350, unit: 'g', category: 'Meat' },
      { name: 'Kemer Patlıcan & Kabak', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Arpacık Soğan', amount: 10, unit: 'adet', category: 'Produce' },
      { name: 'Bütün Sarımsak Dişleri', amount: 6, unit: 'diş', category: 'Produce' },
      { name: 'Domates & Tereyağı', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' }
    ],
    steps: [
      { id: 1, title: 'Güvece Malzemeleri Diz', description: 'Toprak güvecin tabanına kuzu etlerini, üzerine arpacık soğan ve doğranmış sebzeleri kat kat dizin.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Tereyağı ve Baharatları Ekle', description: 'Üzerine sarımsaklar, tereyağı parçaları, kekik ve salçalı sıcak suyu gezdirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 4 },
      { id: 3, title: 'Fırında Ağır Ağır Pişir', description: 'Güvecin kapağını kapatıp 190°C fırında 40 dakika etler lime lime olana kadar pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 40 }
    ]
  },
  {
    id: 'dish-38',
    title: 'Kıymalı Taze Kabak Kalye',
    title_en: 'Zucchini & Minced Beef Stew',
    title_de: 'Zucchini-Pfanne mit Rinderhack',
    subtitle: 'Taze körpe kabaklar, dana kıyma, pirinç, taze dereotu ve yoğurt',
    subtitle_en: 'Braised summer zucchini with seasoned beef and fresh dill',
    subtitle_de: 'Geschmorte Zucchini mit Hackfleisch und frischem Dill',
    description: 'Hafif ve lezzetli bir yaz klasiği: Kabakların dana kıyma ve bol dereotuyla tencerede pişirilmesi.',
    description_en: 'Light and refreshing skillet meal of tender zucchini braised with lean ground meat and a crown of dill.',
    description_de: 'Leichtes Sommergericht mit Zucchini, saftigem Hackfleisch und viel frischem Dill.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Easy', rating: 4.7, reviewCount: 180,
    tags: ['Ev Yemeği', 'Et', 'Sağlıklı', 'Tencere'],
    allergens: ['Süt & Laktoz'],
    basePortions: 2, matchScore: 89, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze Kabak', amount: 4, unit: 'adet', category: 'Produce' },
      { name: 'Dana Kıyma', amount: 200, unit: 'g', category: 'Meat' },
      { name: 'Kuru Soğan', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Baldo Pirinç', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Taze Dereotu', amount: 1, unit: 'demet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Kıymayı ve Soğanı Kavur', description: 'Soğanı ve kıymayı zeytinyağında kokusu çıkana kadar kavurun.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Kabakları Halka Doğra', description: 'Kabakları halka dilimleyip tencereye ekleyin, pirinci serpin.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Pişir ve Dereotuyla Süsle', description: 'Yarım bardak sıcak suyla kısık ateşte 15 dakika pişirin. Bol kıyılmış dereotu ile servis edin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 15 }
    ]
  },
  {
    id: 'dish-39',
    title: 'Geleneksel Etli Türlü Yemeği',
    title_en: 'Summer Vegetable & Meat Casserole',
    title_de: 'Bunter Gemüse-Fleisch-Topf',
    subtitle: 'Kuzu kuşbaşı, patlıcan, kabak, taze fasulye, domates ve biber',
    subtitle_en: 'A medley of garden vegetables stewed with tender lamb bites',
    subtitle_de: 'Buntes Gartengemüse geschmort mit zartem Lammfleisch',
    description: 'Bahçeden tencereye lezzet şöleni: Patlıcan, kabak, fasulye ve kuzu etinin bir arada ağır ateşte demlenmesi.',
    description_en: 'Symphony of summer garden vegetables slowly stewed with lamb chunks in aromatic garlic broth.',
    description_de: 'Traditioneller Gemüseeintopf mit Lammfleisch, Bohnen, Zucchini und Tomaten.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Easy', rating: 4.8, reviewCount: 260,
    tags: ['Ev Yemeği', 'Et', 'Tencere', 'Sağlıklı'],
    allergens: [],
    basePortions: 2, matchScore: 92, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kuzu Kuşbaşı Et', amount: 250, unit: 'g', category: 'Meat' },
      { name: 'Patlıcan & Kabak', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Taze Fasulye', amount: 150, unit: 'g', category: 'Produce' },
      { name: 'Domates & Sivri Biber', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Sarımsak & Zeytinyağı', amount: 3, unit: 'diş', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Etleri Sotele', description: 'Tencerede kuzu etlerini suyunu çekene kadar zeytinyağında soteleyin.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Sebzeleri Kat Kat Ekle', description: 'Fasulye, patlıcan, kabak ve domatesleri sırayla etlerin üzerine dizin.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Kendi Buharında Pişir', description: 'Kapağını sıkıca kapatıp kısık ateşte 25 dakika sebzeler yumuşayana dek pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 25 }
    ]
  },
  {
    id: 'dish-40',
    title: 'Zeytinyağlı Kuru Bakla Favalı Enginar',
    title_en: 'Artichoke Hearts with Fava Puree',
    title_de: 'Artischocken mit Fava-Püree',
    subtitle: 'Karamelize soğanlı kadife fava püresi üzerinde enginar çanağı',
    subtitle_en: 'Tender artichoke bottom topped with silky broad bean puree',
    subtitle_de: 'Zarte Artischocken auf samtigem Ackerbohnenpüree',
    description: 'Ege gurmelerinin gözdesi: İpeksi fava ezmesinin taze çanak enginarla buluşup dereotu ve zeytinyağıyla taçlanması.',
    description_en: 'Sophisticated Aegean pairing of tender braised artichoke filled with creamy broad bean puree and fragrant dill.',
    description_de: 'Feine ägäische Vorspeise aus geschmorten Artischocken und Ackerbohnenpüree.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Medium', rating: 4.8, reviewCount: 190,
    tags: ['Ev Yemeği', 'Zeytinyağlı', 'Vejetaryen', 'Sağlıklı'],
    allergens: [],
    basePortions: 2, matchScore: 91, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Çanak Enginar', amount: 4, unit: 'adet', category: 'Produce' },
      { name: 'Kuru Bakla Fava Püresi', amount: 1.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Sızma Zeytinyağı', amount: 4, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Kırmızı Soğan & Taze Dereotu', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Limon Suyu', amount: 1, unit: 'adet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Enginarları Pişir', description: 'Enginarları zeytinyağı ve limonlu suda yumuşayana dek 20 dakika haşlayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 20 },
      { id: 2, title: 'Favayı Hazırla', description: 'Haşlanmış kuru baklayı zeytinyağı ile pürüzsüz püre haline getirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Birleştir ve Süsle', description: 'Soğuyan enginarların içine favayı doldurun, kırmızı soğan ve dereotuyla süsleyin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 4 }
    ]
  }
];

console.log('Dishes 1 to 40 generated:', allDishes.length);
fs.writeFileSync(path.join(__dirname, 'batch1.json'), JSON.stringify(allDishes, null, 2));
