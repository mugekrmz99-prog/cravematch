import { Dish, GroceryItem, TasteDuel, UserProfile, BadgeItem, ChatMessage } from '../types';

export const INITIAL_BADGES: BadgeItem[] = [
  {
    id: 'badge-1',
    title: 'Usta Şef',
    title_en: 'Master Chef',
    title_de: 'Meisterkoch',
    description: 'Partnerinle birlikte en az 25 ortak yemek hazırla.',
    description_en: 'Prepare at least 25 collaborative recipes with your partner.',
    description_de: 'Bereite mindestens 25 gemeinsame Rezepte mit deinem Partner zu.',
    howToUnlock: 'Birlikte Pişir (Co-Cooking) modunda 25 yemeğin tüm adımlarını tamamlayın.',
    howToUnlock_en: 'Complete all steps of 25 recipes in Co-Cooking mode.',
    howToUnlock_de: 'Schließe alle Schritte von 25 Rezepten im Co-Cooking-Modus ab.',
    icon: '👨‍🍳',
    unlocked: true,
    progress: 25,
    maxProgress: 25,
    category: 'cooking'
  },
  {
    id: 'badge-2',
    title: 'Acı Aşığı',
    title_en: 'Spice Seeker',
    title_de: 'Scharf-Liebhaber',
    description: 'Acı kategorisindeki en az 3 yemeği beğen veya pişir.',
    description_en: 'Like or cook at least 3 spicy category dishes.',
    description_de: 'Like oder koche mindestens 3 scharfe Gerichte.',
    howToUnlock: 'Acı kategorisinde yer alan 3 farklı lezzete sağa kaydırarak kalp verin.',
    howToUnlock_en: 'Swipe right on 3 different spicy dishes.',
    howToUnlock_de: 'Swipe nach rechts bei 3 verschiedenen scharfen Gerichten.',
    icon: '🌶️',
    unlocked: true,
    progress: 3,
    maxProgress: 3,
    category: 'explorer'
  },
  {
    id: 'badge-3',
    title: 'Zar Ustası',
    title_en: 'Dice Master',
    title_de: 'Würfelmeister',
    description: 'Akşam yemeği karar zarını en az 10 kez salla.',
    description_en: 'Roll the dinner decision dice at least 10 times.',
    description_de: 'Rolle den Entscheidungswürfel mindestens 10 Mal.',
    howToUnlock: 'Karar Zarı ekranında "Zarı At" butonuna basarak 10 kez karar belirleyin.',
    howToUnlock_en: 'Settle dinner debate by rolling the decision dice 10 times.',
    howToUnlock_de: 'Entscheide dein Abendessen 10 Mal mit dem Würfel.',
    icon: '🎲',
    unlocked: false,
    progress: 8,
    maxProgress: 10,
    category: 'dice'
  },
  {
    id: 'badge-4',
    title: 'Mükemmel Çift',
    title_en: 'Perfect Match Pair',
    title_de: 'Perfektes Paar',
    description: 'Partnerinle aynı yemeği beğenerek 5 ortak eşleşme yakala.',
    description_en: 'Get 5 mutual matches by liking the same dishes as your partner.',
    description_de: 'Erzielt 5 gemeinsame Matches durch Vorlieben beider Partner.',
    howToUnlock: 'Partnerinizle aynı gün içinde 5 ortak yemek eşleşmesi yakalayın.',
    howToUnlock_en: 'Achieve 5 mutual meal matches with your partner.',
    howToUnlock_de: 'Erreicht 5 gegenseitige Übereinstimmungen bei Gerichten.',
    icon: '💑',
    unlocked: true,
    progress: 5,
    maxProgress: 5,
    category: 'dating'
  },
  {
    id: 'badge-5',
    title: 'Gece Gurmesi',
    title_en: 'Midnight Foodie',
    title_de: 'Mitternachts-Gourmet',
    description: 'Gece saat 22:00 sonrasında akşam yemeği veya atıştırmalık seç.',
    description_en: 'Pick or swipe food after 22:00 at night.',
    description_de: 'Wähle Essen nach 22:00 Uhr abends aus.',
    howToUnlock: 'Gece 22:00 ile 04:00 arasında CraveMatch üzerinden yemek seçimi yapın.',
    howToUnlock_en: 'Select dinner or snacks between 22:00 and 04:00.',
    howToUnlock_de: 'Wähle Gerichte zwischen 22:00 und 04:00 Uhr.',
    icon: '🌙',
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    category: 'explorer'
  },
  {
    id: 'badge-6',
    title: 'Market Kahramanı',
    title_en: 'Pantry Pro',
    title_de: 'Einkaufs-Held',
    description: 'Zarla seçilen yemeğin tüm market malzemelerini tamamla.',
    description_en: 'Check off all grocery items from a chosen recipe.',
    description_de: 'Hake alle Zutaten eines gewählten Rezepts ab.',
    howToUnlock: 'Sepet ekranındaki tüm malzemeleri satın alıp tik işaretini tamamlayın.',
    howToUnlock_en: 'Check all ingredient checkboxes in the Grocery Cart.',
    howToUnlock_de: 'Markiere alle Zutaten im Warenkorb als erledigt.',
    icon: '🛒',
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    category: 'cooking'
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-me',
  name: '',
  birthDate: '1998-05-14',
  title: 'Gurme Şef',
  level: 1,
  matchesCount: 0,
  badgesCount: 0,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  avatarType: 'photo',
  allergies: [],
  partner: {
    id: 'usr-partner',
    name: '',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    status: 'Partner Bekleniyor',
    isConnected: false,
    pairCode: ''
  },
  isSurveyCompleted: false,
  badges: INITIAL_BADGES
};

export const INITIAL_DISHES: Dish[] = [
  {
    id: 'dish-1',
    title: 'Sarımsaklı Karidesli Makarna',
    title_en: 'Garlic Herb Shrimp Pasta',
    title_de: 'Garnelen-Knoblauch-Pasta',
    subtitle: 'Acı pul biberli tereyağında sotelenmiş taze karides ve fettuccine',
    subtitle_en: 'Tender shrimp tossed in garlic herb butter with al dente fettuccine',
    subtitle_de: 'Zarte Garnelen in Knoblauch-Kräuter-Butter mit Fettuccine',
    description: 'Taze sarımsak, sızma zeytinyağı, maydanoz ve hafif acı pul biber ile harmanlanan karidesler enfes bir makarna ziyafeti sunar.',
    description_en: 'Fresh succulent shrimp sautéed in garlic-infused extra virgin olive oil, chili flakes, and tossed with silky fettuccine.',
    description_de: 'Frische Garnelen in Knoblauchöl mit Chili und feinen Kräutern auf Bandnudeln.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk',
    prepTimeMinutes: 25,
    difficulty: 'Easy',
    rating: 4.8,
    reviewCount: 124,
    tags: ['Italian', 'Seafood', 'Spicy'],
    allergens: ['Kabuklu Deniz Ürünü', 'Glüten', 'Süt & Laktoz'],
    basePortions: 2,
    matchScore: 98,
    partnerLiked: true,
    userLiked: true,
    ingredients: [
      { name: 'Fettuccine Makarna', amount: 300, unit: 'g', category: 'Pantry' },
      { name: 'Ayıklanmış Jumbo Karides', amount: 350, unit: 'g', category: 'Meat' },
      { name: 'Taze Sarımsak Dişi', amount: 4, unit: 'adet', category: 'Produce' },
      { name: 'Sızma Zeytinyağı', amount: 3, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Tereyağı', amount: 30, unit: 'g', category: 'Dairy' },
      { name: 'İnce Kıyılmış Taze Maydanoz', amount: 0.5, unit: 'demet', category: 'Produce' },
      { name: 'Pul Biber & Deniz Tuzu', amount: 1, unit: 'tatlı kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Makarnayı Haşla', description: 'Geniş bir tencereye bol tuzlu su koyup kaynatın, fettuccine makarnayı al dente kıvamda 8-9 dakika haşlayın.', chef: 'chef2', chefName: '2. Şef', durationMins: 9 },
      { id: 2, title: 'Sarımsak & Karidesleri Sotele', description: 'Büyük tavada zeytinyağı ve tereyağını eritin. Ezilmiş sarımsakları 1 dakika kokusu çıkana kadar çevirip karidesleri ekleyin. Her iki yüzünü 2-3 dakika pişirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 6 },
      { id: 3, title: 'Sosla Makarnayı Birleştir', description: 'Haşlanan makarnayı süzüp karides tavasına dökün. 3 kaşık makarna haşlama suyu, kıyılmış maydanoz ve pul biber ekleyip hızlıca harmanlayın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 3 }
    ]
  },
  {
    id: 'dish-2',
    title: 'Gurme Trüflü Dana Burger',
    title_en: 'Gourmet Truffle Burger',
    title_de: 'Gourmet Trüffel Burger',
    subtitle: 'Fırınlanmış brioche ekmeği, karamelize soğan ve eritilmiş cheddar peyniri',
    subtitle_en: 'Smoky grilled Angus patty with truffle aioli on a toasted brioche bun',
    subtitle_de: 'Saftiges Angus-Patty mit Trüffel-Aioli im Brioche-Brötchen',
    description: 'Özel dinlendirilmiş dana döş kıyması, karamelize mor soğan, trüf mayonezi ve tereyağlı brioche ekmeği ile hazırlanan efsanevi çift burgeri.',
    description_en: 'Aged beef patty paired with caramelized onions, aged cheddar, and house-made truffle mayonnaise.',
    description_de: 'Köstlicher Burger mit Trüffelmayo und gereiftem Cheddar.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk',
    prepTimeMinutes: 20,
    difficulty: 'Medium',
    rating: 4.9,
    reviewCount: 210,
    tags: ['Fast Food', 'Healthy', 'Italian'],
    allergens: ['Glüten', 'Süt & Laktoz', 'Mantar'],
    basePortions: 2,
    matchScore: 92,
    partnerLiked: true,
    userLiked: true,
    ingredients: [
      { name: 'Dana Döş Burger Köftesi (180g)', amount: 2, unit: 'adet', category: 'Meat' },
      { name: 'Tereyağlı Brioche Ekmeği', amount: 2, unit: 'adet', category: 'Bakery' },
      { name: 'Eski Cheddar Dilimleri', amount: 4, unit: 'dilim', category: 'Dairy' },
      { name: 'Karamelize Kırmızı Soğan', amount: 1, unit: 'kase', category: 'Produce' },
      { name: 'Trüflü Mayonez Sos', amount: 3, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Taze Çıtır Marul', amount: 4, unit: 'yaprak', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Soğanları Karamelize Et', description: 'İnce dilimlenmiş soğanları kısık ateşte esmer şeker ve zeytinyağı ile karamelize kıvama getirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Köfteleri Döküm Tavada Mühürle', description: 'Çok sıcak döküm tavada burger köftelerini 3er dakika pişirin, son dakikada üzerine cheddar peynirini koyup eritin.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Burgerleri Birleştir', description: 'Isıtılmış brioche ekmeklerine trüf sosu sürün, köfte, karamelize soğan ve çıtır marulları yerleştirip sıcak servis yapın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 2 }
    ]
  },
  {
    id: 'dish-3',
    title: 'Meksika Usulü Çıtır Taco Fiesta',
    title_en: 'Crispy Taco Fiesta',
    title_de: 'Knusprige Taco Fiesta',
    subtitle: 'Guacamole, taze kişniş, misket limonu ve baharatlı çıtır tavuk parçaları',
    subtitle_en: 'Street-style crunchy corn tortillas packed with spiced chicken and lime',
    subtitle_de: 'Knusprige Maistortillas mit gewürztem Hähnchen und Limette',
    description: 'Taze avokado ile ezilmiş guacamole, domates salsası ve özel Meksika baharatları ile marine edilmiş çıtır tavuk şöleni.',
    description_en: 'Crunchy corn shells layered with avocado crema, pico de gallo, and zesty shredded chicken.',
    description_de: 'Mexikanische Tacos mit Guacamole und Pico de Gallo.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk',
    prepTimeMinutes: 25,
    difficulty: 'Easy',
    rating: 4.7,
    reviewCount: 88,
    tags: ['Fast Food', 'Spicy'],
    allergens: ['Kişniş', 'Aşırı Acı'],
    basePortions: 2,
    matchScore: 89,
    partnerLiked: false,
    userLiked: true,
    ingredients: [
      { name: 'Çıtır Mısır Taco Kabukları', amount: 6, unit: 'adet', category: 'Pantry' },
      { name: 'Tavuk Göğsü (Küp Doğranmış)', amount: 400, unit: 'g', category: 'Meat' },
      { name: 'Olgun Avokado', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Taze Domates & Jalapeno', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Misket Limonu (Lime)', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Taze Kişniş', amount: 1, unit: 'avuç', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Tavukları Baharatla ve Pişir', description: 'Tavukları kimyon, kırmızı biber ve tuzla ovup tavada yüksek ateşte kızartın.', chef: 'chef2', chefName: '2. Şef', durationMins: 8 },
      { id: 2, title: 'Guacamole & Salsa Hazırla', description: 'Avokadoyu çatalla ezin, misket limonu suyu, küp domates ve kişnişle harmanlayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 6 },
      { id: 3, title: 'Tacoları Doldur', description: 'Isıtılmış mısır kabuklarına tavuk, guacamole ve taze salsa paylaştırın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 4 }
    ]
  },
  {
    id: 'dish-4',
    title: 'Acılı Tonkotsu Ramen',
    title_en: 'Spicy Tonkotsu Ramen',
    title_de: 'Scharfe Tonkotsu Ramen',
    subtitle: 'Zengin aromalı et suyu, marine edilmiş haşlanmış yumurta ve çıtır taze soğan',
    subtitle_en: 'Rich creamy bone broth infused with chili oil, bamboo shoots and ajitsuke tamago',
    subtitle_de: 'Würzige japanische Ramen mit mariniertem Ei und Frühlingszwiebeln',
    description: 'Saatlerce kaynamış derin lezzetli et suyu, taze ramen erişteleri, susam yağı ve acı biber infüzyonu ile sıcacık kase mutluluğu.',
    description_en: 'Silky umami-rich broth, noodles, ramen egg, and fiery chili oil.',
    description_de: 'Wärmende japanische Suppe mit feinen Nudeln.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk',
    prepTimeMinutes: 35,
    difficulty: 'Hard',
    rating: 4.9,
    reviewCount: 340,
    tags: ['Spicy', 'Healthy'],
    allergens: ['Glüten', 'Süt & Laktoz', 'Aşırı Acı'],
    basePortions: 2,
    matchScore: 94,
    partnerLiked: true,
    userLiked: true,
    ingredients: [
      { name: 'Taze Ramen Eriştesi', amount: 250, unit: 'g', category: 'Pantry' },
      { name: 'Konsantre Et/Tavuk Suyu', amount: 800, unit: 'ml', category: 'Pantry' },
      { name: 'Kırmızı Biber & Susam Yağı', amount: 2, unit: 'tatlı kaşığı', category: 'Spices' },
      { name: 'Marine Haşlanmış Yumurta', amount: 2, unit: 'adet', category: 'Dairy' },
      { name: 'Taze Yeşil Soğan', amount: 3, unit: 'sap', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Et Suyunu Kaynat ve Baharatla', description: 'Et suyuna soya sosu, zencefil ve acı susam yağını ekleyip 10 dakika kaynatın.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Erişteleri Haşla', description: 'Ayrı tencerede ramen eriştelerini 3 dakika haşlayıp derin kaselere alın.', chef: 'chef2', chefName: '2. Şef', durationMins: 4 },
      { id: 3, title: 'Kaseleri Birleştir', description: 'Sıcak aromatik suyu eriştelerin üzerine kepçeyle dökün, yumurta ve taze soğanla süsleyin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 3 }
    ]
  },
  {
    id: 'dish-5',
    title: 'Taze Fesleğenli Margherita Pizza',
    title_en: 'Fresh Basil Margherita Pizza',
    title_de: 'Frische Basilikum Margherita',
    subtitle: 'Odun fırını hamuru, San Marzano domates sosu ve manda mozzarellası',
    subtitle_en: 'Stone-baked thin crust with San Marzano sauce and fresh buffalo mozzarella',
    subtitle_de: 'Steinofenpizza mit San Marzano Sauce und Büffelmozzarella',
    description: 'Klasik İtalyan sanatının zirvesi: İncecik çıtır hamur, bol taze fesleğen yaprakları, sızma zeytinyağı ve eriyen taze mozzarella.',
    description_en: 'Authentic Neapolitan thin pizza featuring creamy buffalo mozzarella, sweet basil, and fruity olive oil.',
    description_de: 'Klassische italienische Pizza mit Mozzarella und frischem Basilikum.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk',
    prepTimeMinutes: 20,
    difficulty: 'Easy',
    rating: 4.9,
    reviewCount: 312,
    tags: ['Italian', 'Vegetarian'],
    allergens: ['Glüten', 'Süt & Laktoz'],
    basePortions: 2,
    matchScore: 97,
    partnerLiked: true,
    userLiked: true,
    ingredients: [
      { name: 'Mayalanmış Pizza Hamuru', amount: 2, unit: 'beze', category: 'Bakery' },
      { name: 'San Marzano Domates Sosu', amount: 200, unit: 'g', category: 'Pantry' },
      { name: 'Manda Mozzarella Peyniri', amount: 250, unit: 'g', category: 'Dairy' },
      { name: 'Taze Fesleğen Yaprakları', amount: 1, unit: 'demet', category: 'Produce' },
      { name: 'Sızma Zeytinyağı', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Hamuru Elle Aç', description: 'Pizza hamurlarını unlanmış tezgâhta kenarları kalın kalacak biçimde incelterek açın.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 2, title: 'Sos ve Peynirleri Ekle', description: 'Domates sosunu yayın, elle parçalanmış mozzarellaları üzerine serpiştirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 4 },
      { id: 3, title: 'Yüksek Isıda Pişir', description: 'En yüksek derecede önceden ısıtılmış fırında 7-9 dakika çıtırlaşana dek pişirin. Çıkınca taze fesleğen ekleyin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 8 }
    ]
  },
  {
    id: 'dish-6',
    title: 'Belçika Çikolatalı Sufle',
    title_en: 'Belgian Chocolate Soufflé',
    title_de: 'Belgisches Schokoladensoufflé',
    subtitle: 'Akışkan sıcak çikolata kalbi ve yanında vanilyalı dondurma',
    subtitle_en: 'Warm molten dark chocolate center dusted with powdered sugar',
    subtitle_de: 'Warmes Schokoladensoufflé mit flüssigem Kern und Vanilleeis',
    description: '%70 kakaolu bitter Belçika çikolatası ile hazırlanan, fırından çıkar çıkmaz kaşıkladığınızda kalbinden sıcacık çikolata fışkıran tatlı rüyası.',
    description_en: 'Decadent baked dessert with a melting molten heart of rich dark Belgian chocolate.',
    description_de: 'Warmes Schokoladendessert mit flüssigem Kern.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    prepTime: '18 dk',
    prepTimeMinutes: 18,
    difficulty: 'Medium',
    rating: 4.9,
    reviewCount: 165,
    tags: ['Sweet', 'Vegetarian'],
    allergens: ['Süt & Laktoz', 'Glüten'],
    basePortions: 2,
    matchScore: 99,
    partnerLiked: true,
    userLiked: true,
    ingredients: [
      { name: '%70 Bitter Belçika Çikolatası', amount: 150, unit: 'g', category: 'Pantry' },
      { name: 'Köy Tereyağı', amount: 80, unit: 'g', category: 'Dairy' },
      { name: 'Organik Yumurta', amount: 3, unit: 'adet', category: 'Dairy' },
      { name: 'Toz Şeker', amount: 60, unit: 'g', category: 'Pantry' },
      { name: 'Buğday Unu', amount: 40, unit: 'g', category: 'Pantry' },
      { name: 'Vanilyalı Maraş Dondurması', amount: 2, unit: 'top', category: 'Dairy' }
    ],
    steps: [
      { id: 1, title: 'Çikolata ve Tereyağını Erit', description: 'Bitter çikolata ve tereyağını benmari usulü pürüzsüz kıvama gelene dek eritin.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Yumurta ve Şekeri Çırp', description: 'Yumurtaları şekerle beyaz köpük olana kadar çırpıp ılık çikolataya ve una yedirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Fırınla ve Sıcak Servis Et', description: 'Yağlanmış sufle kaplarında 200°C fırında tam 8 dakika pişirin. Kalbi akışkan kalmalıdır.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 8 }
    ]
  }
];

export const INITIAL_GROCERY_ITEMS: GroceryItem[] = [
  { id: 'g-1', name: '300g Fettuccine Makarna', fromRecipe: 'Sarımsaklı Karidesli Makarna', checked: false, addedBy: '1. Şef', category: 'Pantry' },
  { id: 'g-2', name: '350g Ayıklanmış Jumbo Karides', fromRecipe: 'Sarımsaklı Karidesli Makarna', checked: false, addedBy: '2. Şef', category: 'Meat' },
  { id: 'g-3', name: '1 Baş Taze Sarımsak', fromRecipe: 'Sarımsaklı Karidesli Makarna', checked: true, addedBy: '1. Şef', category: 'Produce' },
  { id: 'g-4', name: '1 Demet Taze Fesleğen', fromRecipe: 'Margherita Pizza', checked: false, addedBy: '2. Şef', category: 'Produce' },
  { id: 'g-5', name: '250g Manda Mozzarella', fromRecipe: 'Margherita Pizza', checked: false, addedBy: '1. Şef', category: 'Dairy' }
];

export const INITIAL_TASTE_DUELS: TasteDuel[] = [
  {
    id: 'duel-1',
    title: 'Akşam Yemeği Düellosu',
    title_en: 'Dinner Duel',
    title_de: 'Abendessen-Duell',
    subtitle: 'Hangisine asla hayır diyemezsin?',
    subtitle_en: 'Which comfort food wins your soul tonight?',
    subtitle_de: 'Welches Comfort Food gewinnt heute?',
    optionA: {
      name: 'Çıtır Pizza',
      emoji: '🍕',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      votesPercent: 54
    },
    optionB: {
      name: 'Kremalı Makarna',
      emoji: '🍝',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=600&q=80',
      votesPercent: 46
    },
    userVote: 'A'
  },
  {
    id: 'duel-2',
    title: 'Burger vs Taco Kapışması',
    title_en: 'Burger vs Taco Clash',
    title_de: 'Burger vs Taco Showdown',
    subtitle: 'Sokak lezzetlerinde favorin kim?',
    subtitle_en: 'Ultimate street food battle',
    subtitle_de: 'Streetfood-Schlacht',
    optionA: {
      name: 'Trüflü Burger',
      emoji: '🍔',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      votesPercent: 62
    },
    optionB: {
      name: 'Meksika Taco',
      emoji: '🌮',
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
      votesPercent: 38
    },
    userVote: 'B'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'partner',
    text: 'Aşkım menüye baktın mı? Bu akşam için harika seçenekler beğendim! 🍽️',
    timestamp: '18:15',
    type: 'text'
  },
  {
    id: 'msg-2',
    sender: 'me',
    text: 'Ben de baktım, özellikle sarımsaklı karidesli makarna harika görünüyor! 😍',
    timestamp: '18:18',
    type: 'text'
  },
  {
    id: 'msg-3',
    sender: 'system',
    text: '⏰ Günün Menüsü Uyarısı: Akşam yemeği karar zarını atmak için son 15 dakika!',
    timestamp: '18:30',
    type: 'timer_alert'
  },
  {
    id: 'msg-4',
    sender: 'partner',
    text: 'Zar atma vakti geldiğinde bana haber ver, birlikte sallayalım! 🎲',
    timestamp: '18:32',
    type: 'dice_alert'
  }
];
