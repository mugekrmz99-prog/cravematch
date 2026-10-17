// scripts/generateDishes.cjs
const fs = require('fs');
const path = require('path');

const dishesRaw = [
  // 1. ÇORBALAR (1-15)
  {
    id: 'dish-1',
    title: 'Geleneksel Kırmızı Mercimek Çorbası',
    title_en: 'Traditional Red Lentil Soup',
    title_de: 'Traditionelle rote Linsensuppe',
    subtitle: 'Tereyağlı nane ve pul biber sosu ile süzme mercimek',
    description: 'Kırmızı mercimek, havuç, patates ve soğanın tereyağında kavrulup pürüzsüz kıvama getirilmesiyle hazırlanan klasik şifa kaynağı.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Easy', rating: 4.9, reviewCount: 420,
    tags: ['Çorba', 'Sağlıklı', 'Ev Yemeği', 'Vejetaryen'],
    allergens: ['Süt & Laktoz'],
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
    description: 'Kırmızı mercimek, pilavlık bulgur ve pirincin domates salçası, sarımsak ve nane ile harmanlandığı doyurucu Anadolu efsanesi.',
    image: 'https://images.unsplash.com/photo-1607528971899-2e89e6c0ec69?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Easy', rating: 4.8, reviewCount: 310,
    tags: ['Çorba', 'Sağlıklı', 'Ev Yemeği'],
    allergens: ['Glüten', 'Süt & Laktoz'],
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
    description: 'İpeksi süzme yoğurt terbiyesi, pirinç ve üzerine cızırdayan naneli tereyağı ile mideyi rahatlatan ferahlatıcı lezzet.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Medium', rating: 4.8, reviewCount: 280,
    tags: ['Çorba', 'Sağlıklı', 'Vejetaryen'],
    allergens: ['Süt & Laktoz', 'Yumurta'],
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
    description: 'Güneşte kurutulmuş sebzeler ve yoğurtla fermante edilmiş Uşak tarhanası, sarımsak ve tereyağının sıcak dokunuşu.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.7, reviewCount: 195,
    tags: ['Çorba', 'Ev Yemeği', 'Sağlıklı'],
    allergens: ['Glüten', 'Süt & Laktoz'],
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
    description: 'Fırında közlenen mis kokulu domatesler, tereyağı, un ve sütün mükemmel uyumu. Üzerinde eriyen kaşar peyniriyle servis edilir.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Easy', rating: 4.8, reviewCount: 340,
    tags: ['Çorba', 'Vejetaryen', 'Sağlıklı'],
    allergens: ['Süt & Laktoz', 'Glüten'],
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
    description: 'Doğal tavuk suyu, havuç küpleri, arpa şehriye ve bol maydanozla hazırlanan bağışıklık dostu nefis çorba.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Easy', rating: 4.9, reviewCount: 260,
    tags: ['Çorba', 'Sağlıklı', 'Ev Yemeği'],
    allergens: ['Glüten'],
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
    description: 'Gaziantep’in tescilli efsanesi: Saatlerce haşlanmış kuzu gerdan eti, pirinç, iç yağı, sarımsak ve acı biberin bakır sahanda alevlenmesi.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '40 dk', prepTimeMinutes: 40, difficulty: 'Hard', rating: 4.9, reviewCount: 450,
    tags: ['Çorba', 'Et', 'Acılı'],
    allergens: ['Aşırı Acı'],
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
    description: 'Ağır ateşte pişmiş etler, yoğun kemik iliği suyu, keskin sarımsaklı sirke ve sumak ekşisi ile gerçek bir lezzet bombası.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Medium', rating: 4.8, reviewCount: 380,
    tags: ['Çorba', 'Et', 'Sağlıklı'],
    allergens: ['Sarımsak'],
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
    description: 'Saray mutfağından günümüze uzanan; lokum gibi kuzu eti ve yumurtalı limonlu yoğurt terbiyesiyle hazırlanan asil bir lezzet.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Medium', rating: 4.8, reviewCount: 220,
    tags: ['Çorba', 'Et', 'Ev Yemeği'],
    allergens: ['Süt & Laktoz', 'Glüten', 'Yumurta'],
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
    description: 'Antep bayramlarının baş tacı: Pirinç ve kıymadan yuvarlanan minik köfteler, nohut ve sıcak yoğurt sosunun enfes buluşması.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    prepTime: '45 dk', prepTimeMinutes: 45, difficulty: 'Hard', rating: 5.0, reviewCount: 520,
    tags: ['Çorba', 'Et', 'Ev Yemeği'],
    allergens: ['Süt & Laktoz', 'Yumurta'],
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
    description: 'Kış gecelerinin vazgeçilmezi: Unun tereyağında kokusu çıkana dek kavrulması, tavuk suyu ve acı biberle kaynatılan sıcacık çorba.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Medium', rating: 4.7, reviewCount: 160,
    tags: ['Çorba', 'Et', 'Acılı'],
    allergens: ['Glüten', 'Süt & Laktoz'],
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
    description: 'Anadolu mutfağının başyapıtı: İçi kıymalı analar ve minik kızlar bulgur köftelerinin salçalı et suyunda nohutla dansı.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    prepTime: '45 dk', prepTimeMinutes: 45, difficulty: 'Hard', rating: 4.9, reviewCount: 390,
    tags: ['Çorba', 'Et', 'Ev Yemeği'],
    allergens: ['Glüten'],
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
    description: 'İnce dilimlenmiş mantarların tereyağında karamelize edilip taze krema ve taze kekikle buluştuğu ipeksi lezzet.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.8, reviewCount: 230,
    tags: ['Çorba', 'Vejetaryen', 'Sağlıklı'],
    allergens: ['Süt & Laktoz', 'Glüten', 'Mantar'],
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
    description: 'Yeşilin en sağlıklı tonu: Brokoli ve patatesin sebze suyunda yumuşatılıp krema ile pürüzsüz kadife kıvama getirilmesi.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.7, reviewCount: 180,
    tags: ['Çorba', 'Vejetaryen', 'Sağlıklı'],
    allergens: ['Süt & Laktoz'],
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
    description: 'Kemiklerinden süzülen aromatik balık suyu, taze levrek parçaları ve sebzelerin limonlu terbiye ile taçlandırıldığı enfes lezzet.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Medium', rating: 4.8, reviewCount: 210,
    tags: ['Çorba', 'Deniz Ürünleri', 'Sağlıklı'],
    allergens: ['Balık', 'Yumurta'],
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
  }
];

console.log('Base dishes ready:', dishesRaw.length);
