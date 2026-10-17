// scripts/generate_batch3.cjs
const fs = require('fs');
const path = require('path');

const batch3 = [
  // ==========================================
  // MEZELER & ZEYTİNYAĞLILAR (dish-76 .. dish-80)
  // ==========================================
  {
    id: 'dish-76',
    title: 'Geleneksel Urfa Etsiz Çiğ Köfte',
    title_en: 'Authentic Urfa Cig Kofte',
    title_de: 'Traditionelles Çiğ Köfte',
    subtitle: 'Urfa hakiki isot biberi, ince esmer bulgur, salça ve taze ceviz',
    subtitle_en: 'Spicy kneaded bulgur rolls served in crisp iceberg lettuce with pomegranate',
    subtitle_de: 'Würzige anatolische Bulgurröllchen im Salatblatt mit Granatapfel',
    description: 'Buz parçaları ve hakiki Urfa isotuyla saatlerce yoğrulan, nar ekşisi ve taze yeşilliklerle sarılıp yenilen lezzet bombası.',
    description_en: 'Hand-kneaded bulgur infused with dark smoky Urfa isot pepper, walnut paste, and tart pomegranate reduction.',
    description_de: 'Traditionelle feurige Spezialität aus Urfa, im Eisbergsalat mit Zitrone serviert.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Medium', rating: 5.0, reviewCount: 780,
    tags: ['Meze', 'Vejetaryen', 'Acılı'],
    allergens: ['Glüten', 'Ceviz', 'Aşırı Acı'],
    basePortions: 2, matchScore: 98, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Esmer Köftelik İnce Bulgur', amount: 1.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Hakiki Urfa İsotu', amount: 3, unit: 'yemek kaşığı', category: 'Spices' },
      { name: 'Biber & Domates Salçası', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Dövülmüş Ceviz İçi & Nar Ekşisi', amount: 3, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Taze Çıtır Marul & Limon', amount: 1, unit: 'adet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'İsotu Sıcak Yağla Aç', description: 'Urfa isotunu zeytinyağı ve az ılık suyla karıştırıp rengini ve kokusunu bırakmasını sağlayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Bulguru Buzla Yoğur', description: 'Tırtıklı çiğ köfte tepsisinde bulguru salça ve sarımsakla buz parçaları ekleyerek yumuşayana dek yoğurun.', chef: 'chef2', chefName: '2. Şef', durationMins: 15 },
      { id: 3, title: 'Cevizi Kat ve Sık', description: 'Ceviz içi ve nar ekşisini ekleyip parmak izi bırakarak sıkın, marul yaprakları üzerinde sunun.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 10 }
    ]
  },
  {
    id: 'dish-77',
    title: 'Cevizli Kabak Şayan Mezesi',
    title_en: 'Kabak Sayan (Zucchini Walnut Meze)',
    title_de: 'Kabak Şayan (Zucchini-Walnuss-Dip)',
    subtitle: 'Zeytinyağında sotelenmiş rendelenmiş kabak, süzme yoğurt ve çıtır ceviz',
    subtitle_en: 'Sautéed tender zucchini ribbons folded in creamy garlic yogurt and toasted walnuts',
    subtitle_de: 'Gebratene Zucchini-Streifen in feinem Knoblauchjoghurt mit Walnüssen',
    description: 'Hafifliğiyle büyüleyen meze: Taze kabakların zeytinyağında karamelize edilip sarımsaklı süzme yoğurt ve cevizle taçlandırılması.',
    description_en: 'Delectable meze of pan-browned shredded zucchini layered with cool garlic yogurt and golden buttered walnuts.',
    description_de: 'Herrlich frischer Dip aus goldbraun gebratenen Zucchini und cremigem Joghurt.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    prepTime: '15 dk', prepTimeMinutes: 15, difficulty: 'Easy', rating: 4.8, reviewCount: 260,
    tags: ['Meze', 'Vejetaryen', 'Sağlıklı'],
    allergens: ['Süt & Laktoz', 'Ceviz'],
    basePortions: 2, matchScore: 92, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze Yeşil Kabak (Rendelenmiş)', amount: 3, unit: 'adet', category: 'Produce' },
      { name: 'Koyu Süzme Yoğurt', amount: 1.5, unit: 'su bardağı', category: 'Dairy' },
      { name: 'İri Kırılmış Ceviz İçi', amount: 0.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Sarımsak & Sızma Zeytinyağı', amount: 2, unit: 'diş', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Kabakları Sotele', description: 'Rendelenmiş kabakları zeytinyağında suyunu çekene kadar 6 dakika soteleyip soğutun.', chef: 'chef1', chefName: '1. Şef', durationMins: 6 },
      { id: 2, title: 'Yoğurtla Harmanla', description: 'Kabakları sarımsaklı süzme yoğurtla karıştırıp servis tabağına yayın.', chef: 'chef2', chefName: '2. Şef', durationMins: 4 },
      { id: 3, title: 'Cevizleri Kızdırıp Dök', description: 'Tavada zeytinyağında hafifçe kızdırılan cevizleri yoğurdun üzerine dökün.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 3 }
    ]
  },
  {
    id: 'dish-78',
    title: 'Zeytinyağlı Lahana Sarması',
    title_en: 'Olive Oil Braised Cabbage Rolls',
    title_de: 'Kohlrouladen in Olivenöl',
    subtitle: 'Karamelize soğanlı, fıstıklı, üzümlü ve baharatlı pirinç dolgusu',
    subtitle_en: 'Delicate white cabbage leaves wrapped around spiced aromatic rice',
    subtitle_de: 'Zarte Weißkohlblätter gefüllt mit orientalischem Kräuterreis',
    description: 'Kış aylarının asil zeytinyağlısı: İnce beyaz lahana yapraklarının kuş üzümü ve tarçınlı nefis pirinç harcıyla sarılıp pişirilmesi.',
    description_en: 'Tender blanched cabbage parcels filled with sweet spiced rice, currants, pine nuts, and lemon zest.',
    description_de: 'Fein gewürzte Kohlröllchen mit süß-herzhafter Reis-Pinienkern-Füllung.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '40 dk', prepTimeMinutes: 40, difficulty: 'Medium', rating: 4.8, reviewCount: 310,
    tags: ['Meze', 'Zeytinyağlı', 'Vejetaryen'],
    allergens: ['Çam Fıstığı'],
    basePortions: 2, matchScore: 93, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Haşlanmış Beyaz Lahana Yaprakları', amount: 12, unit: 'yaprak', category: 'Produce' },
      { name: 'Baldo Pirinç', amount: 1, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Çam Fıstığı & Kuş Üzümü', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Piyazlık Soğan & Tarçın', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Sızma Zeytinyağı & Limon', amount: 4, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'İç Harcı Pişir', description: 'Soğan, fıstık, pirinç ve baharatları zeytinyağında kavurup demlendirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 12 },
      { id: 2, title: 'Sarmaları Sar', description: 'Haşlanmış lahana yapraklarının damarlarını alıp parmak kalınlığında sarın.', chef: 'chef2', chefName: '2. Şef', durationMins: 12 },
      { id: 3, title: 'Tencerede Kısık Pişir', description: 'Tencereye dizip üzerine zeytinyağı ve limon dilimleri koyarak 25 dakika kısık ateşte pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 25 }
    ]
  },
  {
    id: 'dish-79',
    title: 'Girit Usulü Peynirli Meze',
    title_en: 'Cretan Cheese & Pistachio Dip',
    title_de: 'Kretische Schafskäse-Creme',
    subtitle: 'Ezine beyaz peyniri, lor peyniri, Antep fıstığı, taze fesleğen ve zeytinyağı',
    subtitle_en: 'Whipped Aegean sheep cheese blended with pistachios, basil, and olive oil',
    subtitle_de: 'Cremiger Schafskäse mit Pistazien und frischem Basilikum',
    description: 'Ege adalarının efsanevi peynir mezesi: Olgun Ezine peyniri ve taze lorun Antep fıstığı ve fesleğenle dövülüp ezilmesi.',
    description_en: 'Decadent Aegean spread of rich aged feta and curd cheese whipped with emerald pistachios and aromatic sweet basil.',
    description_de: 'Feinste Käsecreme nach traditioneller kretischer Art mit knusprigen Pistazien.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    prepTime: '10 dk', prepTimeMinutes: 10, difficulty: 'Easy', rating: 4.9, reviewCount: 420,
    tags: ['Meze', 'Vejetaryen'],
    allergens: ['Süt & Laktoz', 'Antep Fıstığı'],
    basePortions: 2, matchScore: 96, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Ezine Sert Beyaz Peynir', amount: 150, unit: 'g', category: 'Dairy' },
      { name: 'Taze Tatlı Lor Peyniri', amount: 100, unit: 'g', category: 'Dairy' },
      { name: 'Kavrulmuş Antep Fıstığı', amount: 0.5, unit: 'çay bardağı', category: 'Pantry' },
      { name: 'Taze Fesleğen Yaprakları', amount: 1, unit: 'avuç', category: 'Produce' },
      { name: 'Sızma Zeytinyağı & Sarımsak', amount: 3, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Peynirleri Çatalla Ez', description: 'Ezine peyniri ve loru sarımsak ve zeytinyağı ile çatalla ezerek kremalaştırın.', chef: 'chef1', chefName: '1. Şef', durationMins: 4 },
      { id: 2, title: 'Fıstık ve Fesleğeni İnce Kıy', description: 'Antep fıstığı ve taze fesleğeni bıçakla kıyın.', chef: 'chef2', chefName: '2. Şef', durationMins: 3 },
      { id: 3, title: 'Harmanla ve Şekil Ver', description: 'Malzemeleri yoğurup dondurma kaşığıyla toplar halinde servis tabağına dizin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 3 }
    ]
  },
  {
    id: 'dish-80',
    title: 'Geleneksel Nuraniye Mezesi',
    title_en: 'Nuraniye Zucchini & Rice Meze',
    title_de: 'Nuraniye (Zucchini-Reis-Meze)',
    subtitle: 'Rendelenmiş kabak, baldo pirinç, sarımsaklı süzme yoğurt ve taze dereotu',
    subtitle_en: 'Refreshing chilled salad of tender zucchini, rice, garlic yogurt, and dill',
    subtitle_de: 'Erfrischende Vorspeise aus Zucchini, Reis, Joghurt und Dill',
    description: 'Osmanlı’dan yadigar ferahlatıcı lezzet: Kabak ve pirincin zeytinyağında pişirilip sarımsaklı yoğurt ve bol dereotuyla soğutulması.',
    description_en: 'Centuries-old light meze of braised grated zucchini and rice folded into chilled garlicky yogurt and fragrant dill.',
    description_de: 'Traditionelle osmanische Vorspeise mit frischen Zucchini und cremigem Joghurt.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.7, reviewCount: 190,
    tags: ['Meze', 'Vejetaryen', 'Sağlıklı'],
    allergens: ['Süt & Laktoz'],
    basePortions: 2, matchScore: 90, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Yeşil Kabak (Rendelenmiş)', amount: 3, unit: 'adet', category: 'Produce' },
      { name: 'Haşlanmış Baldo Pirinç', amount: 0.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Koyu Süzme Yoğurt', amount: 1.5, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Taze Dereotu & Sarımsak', amount: 1, unit: 'demet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Kabakları Sotele', description: 'Kabakları zeytinyağında hafifçe soteleyip pirinçle karıştırıp soğutun.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Yoğurtlu Sosu Hazırla', description: 'Süzme yoğurt, sarımsak ve kıyılmış dereotunu çırpın.', chef: 'chef2', chefName: '2. Şef', durationMins: 4 },
      { id: 3, title: 'Birleştir ve Dinlendir', description: 'Soğuyan kabaklı pirinci yoğurda katın, zeytinyağı ile servis yapın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 3 }
    ]
  },

  // ==========================================
  // BÖREK & HAMUR İŞLERİ (dish-81 .. dish-92)
  // ==========================================
  {
    id: 'dish-81',
    title: 'Geleneksel El Açması Kayseri Mantısı',
    title_en: 'Kayseri Manti (Mini Meat Dumplings)',
    title_de: 'Kayseri Manti (Kleine gefüllte Teigtaschen)',
    subtitle: 'Bir kaşığa kırk adet sığan minik mantılar, sarımsaklı yoğurt ve sumaklı tereyağı',
    subtitle_en: 'Handmade miniature beef dumplings topped with garlic yogurt and sumac butter',
    subtitle_de: 'Handgemachte Maultäschchen mit Knoblauchjoghurt und Sumach-Butter',
    description: 'Türk mutfağının başyapıtı: İncecik açılan hamurun minicik kıyma taneleriyle bohça yapılması, sarımsaklı yoğurt ve cızırdayan tereyağlı salçalı sos.',
    description_en: 'The crown jewel of Anatolian pasta craft: hundreds of miniature beef dumplings boiled tender and bathed in garlic yogurt.',
    description_de: 'Die Königin der Teigtaschen: Winzige Maultaschen mit Joghurt und schäumender Paprikabutter.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    prepTime: '45 dk', prepTimeMinutes: 45, difficulty: 'Hard', rating: 5.0, reviewCount: 920,
    tags: ['Börek', 'Hamur', 'Et'],
    allergens: ['Glüten', 'Süt & Laktoz', 'Yumurta'],
    basePortions: 2, matchScore: 99, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'El Açması Taze Mantı', amount: 350, unit: 'g', category: 'Pantry' },
      { name: 'Koyu Süzme Yoğurt', amount: 1.5, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Köy Tereyağı', amount: 3, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Domates & Biber Salçası', amount: 1, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Kuru Nane & Hakiki Sumak', amount: 1, unit: 'tatlı kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Mantıları Haşla', description: 'Mantıları bol tuzlu kaynar suda 10-12 dakika yumuşayana kadar haşlayıp süzün.', chef: 'chef1', chefName: '1. Şef', durationMins: 12 },
      { id: 2, title: 'Sarımsaklı Yoğurdu ve Yağı Hazırla', description: 'Yoğurdu sarımsakla çırpın. Küçük tavada tereyağını salça, sumak ve nane ile cızırdatın.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Tabağı Kur ve Sosla', description: 'Sıcak mantıları tabağa alın, sarımsaklı yoğurdu dökün, üzerine kaynayan tereyağlı sosu gezdirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 4 }
    ]
  },
  {
    id: 'dish-82',
    title: 'Geleneksel Kıymalı Su Böreği',
    title_en: 'Water Borek with Minced Beef',
    title_de: 'Wasserbörek mit Hackfleisch (Su Böreği)',
    subtitle: 'Haşlanmış el açması yufkalar, dana kıyma harcı ve bol saf tereyağı',
    subtitle_en: 'Layered boiled handmade phyllo pastry filled with seasoned beef and butter',
    subtitle_de: 'Geschichteter gekochter Teig mit saftigem Hackfleisch und Butter',
    description: 'Böreklerin şahı: Sıcak suda haşlanıp şoklanan tül gibi yufkaların kat kat tereyağı ve kıymayla tepsiye dizilip nar gibi kızarması.',
    description_en: 'Spectacular layered pie of boiled handmade dough leaves baked until crisp on top and meltingly tender within.',
    description_de: 'Königlicher Schichtkuchen aus gekochtem Teig und herzhafter Fleischfüllung.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    prepTime: '45 dk', prepTimeMinutes: 45, difficulty: 'Hard', rating: 5.0, reviewCount: 680,
    tags: ['Börek', 'Hamur', 'Et'],
    allergens: ['Glüten', 'Süt & Laktoz', 'Yumurta'],
    basePortions: 2, matchScore: 98, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Su Böreği Yufkası (Haşlanmış)', amount: 6, unit: 'kat', category: 'Bakery' },
      { name: 'Dana Kıyma Harcı (Kavrulmuş)', amount: 250, unit: 'g', category: 'Meat' },
      { name: 'Eritilmiş Saf Tereyağı', amount: 150, unit: 'g', category: 'Dairy' },
      { name: 'Kuru Soğan & Karabiber', amount: 1, unit: 'adet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Kıymalı Harcı Kavur', description: 'Kıymayı soğan ve karabiberle tereyağında kavurup soğumaya bırakın.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Tepsiyi Kat Kat Yağla', description: 'Tepsiye haşlanmış yufkaları aralarına eritilmiş tereyağı sürerek dizin, orta kata kıymayı yayın.', chef: 'chef2', chefName: '2. Şef', durationMins: 10 },
      { id: 3, title: 'Ocakta veya Fırında Nar Gibi Kızart', description: 'Böreği altı ve üstü nar gibi kızarana dek 200°C fırında 30 dakika pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 30 }
    ]
  },
  {
    id: 'dish-83',
    title: 'Çıtır Peynirli Sigara Böreği',
    title_en: 'Crispy Cheese Cigar Borek',
    title_de: 'Knusprige Schafskäse-Röllchen (Sigara Böreği)',
    subtitle: 'Çıtır el açması yufka, maydanozlu Ezine beyaz peynir ve taze lor',
    subtitle_en: 'Crisp hand-rolled phyllo cigars stuffed with creamy feta and parsley',
    subtitle_de: 'Goldbraun frittierte Teigröllchen gefüllt mit Schafskäse und Petersilie',
    description: 'Çıtır çıtır sesine doyum olmayan kahvaltı ve akşam lezzeti: İncecik sarılmış böreklerin nar gibi kızarıp sıcak sıcak sunulması.',
    description_en: 'Irresistibly crunchy golden rolls filled with sharp Ezine feta and chopped parsley.',
    description_de: 'Knusprige Köstlichkeit für jede Gelegenheit, frisch und heiß serviert.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.8, reviewCount: 460,
    tags: ['Börek', 'Hamur', 'Vejetaryen'],
    allergens: ['Glüten', 'Süt & Laktoz'],
    basePortions: 2, matchScore: 94, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Üçgen Böreklik Yufka', amount: 8, unit: 'adet', category: 'Bakery' },
      { name: 'Ezine Beyaz Peynir & Lor', amount: 200, unit: 'g', category: 'Dairy' },
      { name: 'İnce Kıyılmış Maydanoz', amount: 0.5, unit: 'demet', category: 'Produce' },
      { name: 'Kızartma Yağı', amount: 1, unit: 'su bardağı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Peynirli Harcı Ez', description: 'Peynirleri çatalla ezip ince kıyılmış taze maydanozla karıştırın.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Sıkıca Sar', description: 'Yufkanın geniş kısmına harcı koyup kenarlarını katlayarak sigara şeklinde sıkıca sarın.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Kızgın Yağda Çıtırdat', description: 'Kızgın yağda her tarafı altın sarısı çıtır olana dek 3-4 dakika kızartıp sıcak sunun.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 4 }
    ]
  },
  {
    id: 'dish-84',
    title: 'Geleneksel Çıtır Paçanga Böreği',
    title_en: 'Crispy Pacanga Borek',
    title_de: 'Knuspriger Paçanga-Börek mit Pastırma',
    subtitle: 'Hakiki çemenli pastırma, eriyen kaşar peyniri, domates ve sivri biber',
    subtitle_en: 'Deep-fried golden pastry pockets stuffed with cured beef, melted cheese, and tomato',
    subtitle_de: 'Knusprige Teigtaschen mit geschmolzenem Käse und herzhaftem Pastırma',
    description: 'Damakta lezzet patlaması: Çemenli pastırma dilimleri ve eriyen kaşarın domates ve biberle yufkaya sarılıp çıtır çıtır kızartılması.',
    description_en: 'Decadent fried pastry parcel packed with melting cheese, savory pastirma slices, and sweet peppers.',
    description_de: 'Heiß geliebte Vorspeise mit zart schmelzendem Käse und kräftigem Rinderschinken.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.9, reviewCount: 530,
    tags: ['Börek', 'Hamur', 'Et'],
    allergens: ['Glüten', 'Süt & Laktoz'],
    basePortions: 2, matchScore: 97, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kare Yufka Dilimleri', amount: 4, unit: 'adet', category: 'Bakery' },
      { name: 'İnce Dilim Çemenli Pastırma', amount: 100, unit: 'g', category: 'Meat' },
      { name: 'Taze Kaşar Peyniri Dilimleri', amount: 150, unit: 'g', category: 'Dairy' },
      { name: 'Küp Domates & Sivri Biber', amount: 1, unit: 'adet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Malzemeleri Doğra', description: 'Pastırma, kaşar, domates ve biberi jülyen doğrayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Zarf Gibi Katla', description: 'Yufkanın ortasına harcı koyup geniş yassı börek şeklinde sarın.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Çıtır Kızart', description: 'Kızgın yağda peynirleri eriyip yufkası çıtırlaşana dek kızartıp sıcak servis edin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 5 }
    ]
  },
  {
    id: 'dish-85',
    title: 'Çıtır Kıymalı Kol Böreği',
    title_en: 'Rolled Phyllo Coil Borek with Beef',
    title_de: 'Kıymalı Kol Böreği (Spiralbörek mit Hackfleisch)',
    subtitle: 'El açması çıtır yufka, karamelize soğanlı dana kıyma ve çörek otu',
    subtitle_en: 'Spiral phyllo pastry coil stuffed with savory minced meat and nigella seeds',
    subtitle_de: 'Knusprige Teigschnecke mit herzhaftem Hackfleisch und Schwarzkümmel',
    description: 'Pastanelerin en sevilen klasiği: İncecik açılan yufkaların kıymalı harçla rulo yapılıp spiral şeklinde tepsiye dizilip fırınlanması.',
    description_en: 'Golden spiral of flaky pastry leaves loaded with spiced ground beef and finished with nigella seeds.',
    description_de: 'Wunderbar knuspriger Blätterteigkranz mit reichhaltiger Fleischfüllung.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Medium', rating: 4.8, reviewCount: 420,
    tags: ['Börek', 'Hamur', 'Et'],
    allergens: ['Glüten', 'Süt & Laktoz', 'Yumurta'],
    basePortions: 2, matchScore: 95, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze İnce Böreklik Yufka', amount: 3, unit: 'adet', category: 'Bakery' },
      { name: 'Dana Kıyma', amount: 300, unit: 'g', category: 'Meat' },
      { name: 'Kuru Soğan', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Yumurta Sarısı & Çörek Otu', amount: 1, unit: 'adet', category: 'Dairy' },
      { name: 'Tereyağı & Zeytinyağı Sosu', amount: 0.5, unit: 'su bardağı', category: 'Dairy' }
    ],
    steps: [
      { id: 1, title: 'Kıymayı Soğanla Kavur', description: 'Bol soğanı kıymayla karamelize olana kadar kavurup karabiberle tatlandırın.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Rulo Sar ve Tepsiye Diz', description: 'Yufkaya yağ sosunu sürüp kıymayı yayın, uzun rulo yapıp tepsiye spiral şeklinde dolayın.', chef: 'chef2', chefName: '2. Şef', durationMins: 8 },
      { id: 3, title: 'Fırınla', description: 'Üzerine yumurta sarısı sürüp çörek otu serpin, 190°C fırında 25 dakika nar gibi pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 25 }
    ]
  },
  {
    id: 'dish-86',
    title: 'Fırında Ispanaklı Tepsi Böreği',
    title_en: 'Spinach & Feta Tray Borek',
    title_de: 'Spinat-Schafskäse-Börek vom Blech',
    subtitle: 'Taze körpe ıspanak, Ezine beyaz peyniri ve susamlı çıtır kabuk',
    subtitle_en: 'Flaky baked pastry layers generously filled with spiced spinach and feta',
    subtitle_de: 'Goldbraun gebackener Blechbörek mit frischem Spinat und Feta',
    description: 'Anne eli değmiş sıcacık börek: Ispanak ve beyaz peynirin enfes uyumuyla fırından yeni çıkmış çıtır dilimler.',
    description_en: 'Homestyle comfort: golden crispy phyllo layers encasing a fragrant mixture of spinach, crumbled feta, and eggs.',
    description_de: 'Klassischer Familienbörek mit saftiger Spinatfüllung und knuspriger Kruste.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Easy', rating: 4.8, reviewCount: 390,
    tags: ['Börek', 'Hamur', 'Vejetaryen'],
    allergens: ['Glüten', 'Süt & Laktoz', 'Yumurta'],
    basePortions: 2, matchScore: 93, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze Yufka', amount: 3, unit: 'adet', category: 'Bakery' },
      { name: 'Taze Ispanak', amount: 500, unit: 'g', category: 'Produce' },
      { name: 'Ezine Beyaz Peynir', amount: 150, unit: 'g', category: 'Dairy' },
      { name: 'Süt, Sıvı Yağ & Yumurta Sosu', amount: 1, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Kavrulmuş Susam', amount: 1, unit: 'tatlı kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Ispanaklı Harcı Hazırla', description: 'Ispanakları ince doğrayıp tuzla ovun, peynir ve karabiberle harmanlayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Tepsiyi Sosla Diz', description: 'Yufkaları soslayarak tepsiye yayın, orta kata ıspanaklı harcı bolca serin.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Fırında Çıtırdat', description: 'Üzerine kalan sosu döküp susam serpin, 190°C fırında 25 dakika altın sarısı olana dek pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 25 }
    ]
  },
  {
    id: 'dish-87',
    title: 'Eskişehir Usulü Çıtır Çiğ Börek',
    title_en: 'Eskisehir Crispy Cig Borek',
    title_de: 'Knuspriger Çiğ Börek aus Eskişehir',
    subtitle: 'İnce çıtır hamur, sulu kıymalı soğanlı harç ve derin yağda puf puf kızarma',
    subtitle_en: 'Crispy fried half-moon pastries bursting with juicy spiced minced meat',
    subtitle_de: 'Halbmondförmige knusprige Teigtaschen mit saftigem Hackfleisch',
    description: 'Kırım Tatar mutfağının efsanesi: Açılan ince hamurun içine çiğ kıymalı harç konulup kızgın yağda saniyeler içinde balon gibi kabarması.',
    description_en: 'Crisp half-moon pastries fried to puffy perfection, retaining a pool of savory meat juices inside.',
    description_de: 'Frisch frittierte Spezialität mit hauchdünnem Teig und unvergleichlich saftigem Kern.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Medium', rating: 4.9, reviewCount: 560,
    tags: ['Börek', 'Hamur', 'Et'],
    allergens: ['Glüten'],
    basePortions: 2, matchScore: 97, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Un, Su, Tuz Hamuru', amount: 300, unit: 'g', category: 'Pantry' },
      { name: 'Çiğ Dana Kıyma', amount: 200, unit: 'g', category: 'Meat' },
      { name: 'Rendelenmiş Kuru Soğan & Su', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Karabiber & Tuz', amount: 1, unit: 'tatlı kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Sulu Kıymalı Harcı Yap', description: 'Kıymayı soğan suyu, karabiber ve yarım çay bardağı suyla sulu kıvamda yoğurun.', chef: 'chef1', chefName: '1. Şef', durationMins: 6 },
      { id: 2, title: 'Hamuru İncecik Aç ve Kapat', description: 'Bezeleri tabak büyüklüğünde açıp yarısına harç yayın, yarım ay şeklinde kapatıp kenarını ruletle kesin.', chef: 'chef2', chefName: '2. Şef', durationMins: 8 },
      { id: 3, title: 'Balon Gibi Kızart', description: 'Derin kızgın yağda her iki yüzünü 1er dakika balon gibi kabarana dek pişirip sıcak sunun.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 4 }
    ]
  },
  {
    id: 'dish-88',
    title: 'Karadeniz Usulü Kıymalı Pide',
    title_en: 'Black Sea Minced Meat Pide',
    title_de: 'Schwarzmeer-Pide mit Hackfleisch',
    subtitle: 'Taş fırın hamuru, dana kıyma harcı ve fırından çıkar çıkmaz sürülen tereyağı',
    subtitle_en: 'Traditional boat-shaped flatbread filled with seasoned minced beef',
    subtitle_de: 'Schiffförmiges traditionelles Fladenbrot mit würzigem Hackfleisch',
    description: 'Karadeniz yaylalarının kokusu: İnce çıtır hamurun kayık şeklinde kıymalı harçla kapatılıp taş fırında pişmesi ve kenarlarına bol tereyağı sürülmesi.',
    description_en: 'Iconic Turkish boat-shaped flatbread crowned with aromatic minced meat and glistening butter crust.',
    description_de: 'Knuspriges Fladenbrot in Schiffform reich belegt und ofenfrisch mit Butter bestrichen.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Medium', rating: 5.0, reviewCount: 710,
    tags: ['Börek', 'Hamur', 'Et'],
    allergens: ['Glüten', 'Süt & Laktoz'],
    basePortions: 2, matchScore: 98, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Mayalı Pide Hamuru', amount: 2, unit: 'beze', category: 'Bakery' },
      { name: 'Dana Kıyma Harcı', amount: 250, unit: 'g', category: 'Meat' },
      { name: 'Kuru Soğan, Biber & Domates', amount: 1, unit: 'adet', category: 'Produce' },
      { name: 'Köy Tereyağı (Kenarlara)', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' }
    ],
    steps: [
      { id: 1, title: 'Hamuru Uzun Aç', description: 'Pide hamurunu oval uzun şekilde tezgâhta açın.', chef: 'chef1', chefName: '1. Şef', durationMins: 6 },
      { id: 2, title: 'Kıymalı Harcı Yay ve Kenarları Katla', description: 'Ortasına kıymalı harcı yayın, kenarlarını kayık şeklinde katlayarak uçlarını birleştirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Yüksek Isıda Fırınla & Tereyağı Sür', description: 'En yüksek derecede 8-10 dakika fırınlayın, çıkar çıkmaz kenarlarına bol tereyağı sürün.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 10 }
    ]
  },
  {
    id: 'dish-89',
    title: 'Kaşarlı Kuşbaşılı Taş Fırın Pidesi',
    title_en: 'Steak & Kashar Cheese Pide',
    title_de: 'Pide mit Rindfleischwürfeln und Käse',
    subtitle: 'Lokum gibi marine dana kuşbaşı, eriyen kaşar peyniri, domates ve biber',
    subtitle_en: 'Boat-shaped flatbread laden with succulent beef cubes and bubbling melted cheese',
    subtitle_de: 'Herzhaftes Pide-Schiffchen mit Rinderfiletstücken und geschmolzenem Käse',
    description: 'Pide severlerin favorisi: Marine edilmiş lokum dana etleri ve eriyen kaşar peynirinin çıtır hamur üzerinde nar gibi fırınlanması.',
    description_en: 'Delicious boat-shaped dough loaded with marinated tender beef chunks and a sea of molten cheese.',
    description_de: 'Kombination aus saftigem Fleisch und zart schmelzendem Käse auf knusprigem Teig.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Medium', rating: 4.9, reviewCount: 630,
    tags: ['Börek', 'Hamur', 'Et'],
    allergens: ['Glüten', 'Süt & Laktoz'],
    basePortions: 2, matchScore: 98, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Mayalı Pide Hamuru', amount: 2, unit: 'beze', category: 'Bakery' },
      { name: 'Minik Dana Kuşbaşı', amount: 250, unit: 'g', category: 'Meat' },
      { name: 'Rendelenmiş Kaşar Peyniri', amount: 1.5, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Küp Domates & Yeşil Biber', amount: 2, unit: 'adet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Etleri Sebzeyle Karıştır', description: 'Minik dana etlerini domates ve biberle harmanlayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Hamuru Doldur', description: 'Açılan pide hamuruna önce kaşarı ardından etleri yayın, kayık şekli verin.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Fırınla', description: '230°C sıcak fırında kaşarlar eriyip etler pişene dek 10 dakika pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 10 }
    ]
  },
  {
    id: 'dish-90',
    title: 'Çıtır Antep Lahmacunu',
    title_en: 'Crispy Turkish Lahmacun',
    title_de: 'Knuspriges Lahmacun (Türkische Pizza)',
    subtitle: 'İncecik çıtır hamur, baharatlı zırh kıyması, taze maydanoz ve bol limonla',
    subtitle_en: 'Ultra-thin crispy flatbread spread with spiced minced lamb, parsley, and lemon',
    subtitle_de: 'Hauchdünner knuspriger Fladen mit würzigem Hackfleisch und Zitrone',
    description: 'Dünya mutfaklarının hayran kaldığı Türk pizzası: Tül inceliğindeki hamurun üzerine zırh kıyması, domates ve sarımsak yayılıp yüksek ateşte çıtırlaşması.',
    description_en: 'Wafer-thin dough topped with a savory, spicy layer of minced lamb, herbs, and garlic, rolled with crisp parsley.',
    description_de: 'Der beliebte Klassiker: Hauchdünn gebacken, mit frischer Petersilie und Zitrone gerollt.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Medium', rating: 5.0, reviewCount: 890,
    tags: ['Börek', 'Hamur', 'Et', 'Acılı'],
    allergens: ['Glüten'],
    basePortions: 2, matchScore: 99, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'İncecik Açılmış Lahmacun Hamuru', amount: 4, unit: 'adet', category: 'Bakery' },
      { name: 'Zırhtan Kuzu & Dana Kıyma', amount: 250, unit: 'g', category: 'Meat' },
      { name: 'Kapya Biber, Domates & Sarımsak', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'Taze Maydanoz & Sulu Limon', amount: 1, unit: 'demet', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Harcı İncecik Kıy', description: 'Kıyma, biber, sarımsak ve domatesi zırhta macun kıvamına gelene kadar çekin.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Hamura İncecik Sıva', description: 'Harcı ince açılmış hamurun üzerine kenarlarına kadar parmak uçlarıyla sıvayın.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Taş Fırında / Tavada Çıtırdat', description: 'Çok sıcak fırında veya kapaklı tavada altı çıtır çıtır benekli olana kadar 4-5 dakika pişirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 5 }
    ]
  },
  {
    id: 'dish-91',
    title: 'Köy Usulü Patatesli & Peynirli Gözleme',
    title_en: 'Handmade Turkish Gozleme',
    title_de: 'Handgemachtes Gözleme mit Kartoffel und Käse',
    subtitle: 'Saçta pişirilmiş el açması yufka, baharatlı patates, tulum peyniri ve tereyağı',
    subtitle_en: 'Griddled handmade flatbread stuffed with spiced potato and aged cheese',
    subtitle_de: 'Auf der runden Platte gebackenes Fladenbrot mit Füllung',
    description: 'Anadolu köylerinin en saf lezzeti: Oklavayla açılan hamurun içine baharatlı patates ve peynir doldurulup saç üzerinde pişirilmesi.',
    description_en: 'Golden pan-crisped flatbread folded over a savory filling of spiced potato mash and crumbled goat cheese.',
    description_de: 'Frisch von der heißen Platte mit herzhafter Füllung und flüssiger Butter bestrichen.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.8, reviewCount: 410,
    tags: ['Börek', 'Hamur', 'Vejetaryen'],
    allergens: ['Glüten', 'Süt & Laktoz'],
    basePortions: 2, matchScore: 94, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'El Açması Taze Yufka', amount: 2, unit: 'adet', category: 'Bakery' },
      { name: 'Haşlanmış Baharatlı Patates', amount: 2, unit: 'adet', category: 'Produce' },
      { name: 'İzmir Tulum / Beyaz Peynir', amount: 100, unit: 'g', category: 'Dairy' },
      { name: 'Köy Tereyağı (Üzerine Sürmek İçin)', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' }
    ],
    steps: [
      { id: 1, title: 'Harcı Hazırla', description: 'Haşlanmış patatesleri ezip pul biber, soğan ve peynirle karıştırın.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Yufkayı Doldur ve Katla', description: 'Yufkanın ortasına harcı yayın, zarf şeklinde katlayın.', chef: 'chef2', chefName: '2. Şef', durationMins: 4 },
      { id: 3, title: 'Tavada Pişir ve Tereyağı Sür', description: 'Kuru tavada her iki yüzü altın rengi beneklenene dek pişirin, çıkarıp tereyağı ile yağlayın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 6 }
    ]
  },
  {
    id: 'dish-92',
    title: 'Geleneksel İzmir Boyozu & Fırın Yumurta',
    title_en: 'Izmir Boyoz Pastry with Baked Egg',
    title_de: 'Izmir Boyoz mit gebackenem Ei',
    subtitle: 'Kat kat açılmış yağlı çıtır hamur ve fırınlanmış karabiberli haşlanmış yumurta',
    subtitle_en: 'Flaky layered Sephardic-Izmir puff pastry served with slow-baked peppered egg',
    subtitle_de: 'Blättriges Gebäck aus Izmir serviert mit ofengegartem Pfefferei',
    description: 'İzmir sabahlarının efsanesi: Un ve tahinin el ustalığıyla tül gibi inceltilip fırınlanması, yanında fırın yumurtayla unutulmaz lezzet.',
    description_en: 'Quintessential Aegean breakfast: ultra-flaky unleavened pastry pairing perfectly with slow-caramelized oven eggs.',
    description_de: 'Das Wahrzeichen von Izmir: Hauchdünner Blätterteig mit traditionellem Ofenei.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Medium', rating: 4.8, reviewCount: 380,
    tags: ['Börek', 'Hamur', 'Vejetaryen'],
    allergens: ['Glüten', 'Yumurta'],
    basePortions: 2, matchScore: 93, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Çıtır Kat Kat Boyoz Hamuru', amount: 4, unit: 'adet', category: 'Bakery' },
      { name: 'Fırınlanmış Yumurta', amount: 2, unit: 'adet', category: 'Dairy' },
      { name: 'Taze Çekilmiş Karabiber & Kaya Tuzu', amount: 1, unit: 'tatlı kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Boyozları Fırınla', description: 'Boyozları 200°C sıcak fırında çıtır çıtır kabarana dek 15 dakika pişirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 15 },
      { id: 2, title: 'Fırın Yumurtayı Hazırla', description: 'Fırınlanmış yumurtaları soyup tabağa alın, karabiber ve tuz serpin.', chef: 'chef2', chefName: '2. Şef', durationMins: 3 },
      { id: 3, title: 'Sıcak Sıcak Servis Edin', description: 'Dumanı tüten çıtır boyozları yumurtayla birlikte servis edin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 2 }
    ]
  },

  // ==========================================
  // 6. TATLILAR (dish-93 .. dish-110)
  // ==========================================
  {
    id: 'dish-93',
    title: 'Gaziantep Antep Fıstıklı Baklava',
    title_en: 'Antep Pistachio Baklava',
    title_de: 'Antep Pistazien-Baklava',
    subtitle: 'Kırk kat el açması incecik yufka, boz antep fıstığı, saf sadeyağ ve altın şerbet',
    subtitle_en: 'Forty layers of wafer-thin handmade phyllo with emerald pistachios and clarified butter',
    subtitle_de: 'Vierzig hauchdünne Teigschichten mit edlen Pistazien und goldener Butter',
    description: 'Tatlıların şahı: Tül inceliğindeki yufkaların arasına serilen zümrüt yeşili boz fıstık, saf sadeyağ ile fırınlanıp sıcak şerbetle buluşması.',
    description_en: 'The pinnacle of dessert art: paper-thin pastry layers enclosing roasted emerald pistachios, finished with hot sugar syrup.',
    description_de: 'Der unbestrittene König der orientalischen Desserts, knusprig und saftig zugleich.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    prepTime: '40 dk', prepTimeMinutes: 40, difficulty: 'Hard', rating: 5.0, reviewCount: 1100,
    tags: ['Tatlı'],
    allergens: ['Antep Fıstığı', 'Glüten', 'Süt & Laktoz'],
    basePortions: 2, matchScore: 99, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Boz Antep Fıstığı İçi', amount: 200, unit: 'g', category: 'Pantry' },
      { name: 'Baklavalık İncecik Yufka', amount: 30, unit: 'kat', category: 'Bakery' },
      { name: 'Urfa Saf Sadeyağı', amount: 150, unit: 'g', category: 'Dairy' },
      { name: 'Şerbet (Şeker, Su, Limon)', amount: 1.5, unit: 'su bardağı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Katları Yağla ve Fıstığı Ser', description: 'Yufkaları aralarını sadeyağla yağlayarak dizin, orta kata bol yeşil fıstığı yayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 15 },
      { id: 2, title: 'Dilimle ve Fırınla', description: 'Baklava dilimleri kesin, kalan sadeyağı döküp 180°C fırında altın sarısı kızarana dek 30 dk pişirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 30 },
      { id: 3, title: 'Sıcak Şerbeti Ver', description: 'Fırından çıkan sıcak baklavanın üzerine ılık altın şerbeti döküp dinlendirin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 5 }
    ]
  },
  {
    id: 'dish-94',
    title: 'Hakiki Hatay Künefesi',
    title_en: 'Hatay Kunefe with Melted Cheese',
    title_de: 'Hatay Künefe mit geschmolzenem Käse',
    subtitle: 'Çıtır tel kadayıf, sünmüş özel künefe peyniri, sıcak şerbet ve antep fıstığı',
    subtitle_en: 'Crispy golden shredded phyllo filled with molten sweet cheese and pistachios',
    subtitle_de: 'Knuspriges Engelshaar mit geschmolzenem Käse und Pistazien',
    description: 'Antakya’nın ateşten gelen mucizesi: Tereyağlı çıtır tel kadayıfın arasında uzayan sıcacık peynir ve üzerine dökülen şerbet.',
    description_en: 'Sublime contrast of textures: crunchy, butter-soaked shredded pastry enclosing a molten core of unsalted cheese.',
    description_de: 'Süße Verführung aus knusprigem Kadayif und zart schmelzendem Käsekern.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Medium', rating: 5.0, reviewCount: 980,
    tags: ['Tatlı'],
    allergens: ['Süt & Laktoz', 'Glüten', 'Antep Fıstığı'],
    basePortions: 2, matchScore: 99, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze Tel Kadayıf', amount: 250, unit: 'g', category: 'Bakery' },
      { name: 'Tuzsuz Hatay Künefe Peyniri', amount: 180, unit: 'g', category: 'Dairy' },
      { name: 'Köy Tereyağı & Pekmez', amount: 3, unit: 'yemek kaşığı', category: 'Dairy' },
      { name: 'Sıcak Şerbet & Antep Fıstığı', amount: 1, unit: 'su bardağı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Kadayıfı Tereyağıyla Didikle', description: 'Kadayıfı tereyağı ile tel tel ayırıp yarısını sahana sıkıca bastırarak yerleştirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 6 },
      { id: 2, title: 'Peyniri Diz ve Kapat', description: 'Dilimlenmiş künefe peynirini yerleştirin, kalan kadayıfla kapatıp düz tabanla iyice bastırın.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Ocakta Döndürerek Kızart & Şerbetle', description: 'Kısık ateşte her iki tarafını nar gibi kızartın, ocaktan alıp sıcak şerbeti dökün ve fıstıkla süsleyin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 8 }
    ]
  },
  {
    id: 'dish-95',
    title: 'Toprak Güveçte Fırın Sütlaç',
    title_en: 'Oven-Baked Rice Pudding (Firin Sutlac)',
    title_de: 'Traditioneller Ofen-Milchreis (Fırın Sütlaç)',
    subtitle: 'Toprak güveçte üzeri nar gibi yanmış, vanilyalı geleneksel sütlaç',
    subtitle_en: 'Caramelized brulee-topped Turkish baked rice pudding',
    subtitle_de: 'Im Ofen goldbraun überbackener Milchreis im Tontopf',
    description: 'Sütlü tatlıların şahı: Doğal inek sütü ve pirincin kıvam alıp fırının üst ızgarasında üzeri karamelize olana kadar fırınlanması.',
    description_en: 'Silky, comforting rice pudding baked in clay ramekins until a gorgeous caramelized burnished skin forms on top.',
    description_de: 'Samtiger Milchreis, im Tontopf gebacken mit köstlich karamellisierter Kruste.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Easy', rating: 4.9, reviewCount: 740,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Süt & Laktoz'],
    basePortions: 2, matchScore: 98, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Tam Yağlı Çiftlik Sütü', amount: 1, unit: 'litre', category: 'Dairy' },
      { name: 'Baldo Pirinç', amount: 0.5, unit: 'çay bardağı', category: 'Pantry' },
      { name: 'Toz Şeker', amount: 1, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Buğday Nişastası', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Yumurta Sarısı & Vanilya', amount: 1, unit: 'adet', category: 'Dairy' }
    ],
    steps: [
      { id: 1, title: 'Pirinci Haşla ve Sütü Ekle', description: 'Pirinci suda yumuşayana dek haşlayın, süt ve şekeri ilave edip kaynatın.', chef: 'chef1', chefName: '1. Şef', durationMins: 15 },
      { id: 2, title: 'Nişastayla Bağla', description: 'Nişastayı az süt ve yumurta sarısıyla ezip tencereye ekleyin, kıvam alana dek 3 dakika pişirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Güveçlere Dök ve Fırında Yak', description: 'Toprak kaplara paylaştırıp su dolu fırın tepsisine dizin, 220°C fırının üst ızgarasında üzeri yanana dek 10 dk fırınlayın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 10 }
    ]
  },
  {
    id: 'dish-96',
    title: 'Geleneksel Yanık Kazandibi',
    title_en: 'Caramelized Kazandibi',
    title_de: 'Kazandibi (Karamellisierter Milchpudding)',
    subtitle: 'Dibi tavada hafif yanık kokusuyla karamelize edilmiş rulo sütlü tatlı',
    subtitle_en: 'Silky milk pudding with a deeply caramelized and charred bottom crust',
    subtitle_de: 'Geschmeidiger Milchpudding mit aromatischer dunkler Karamellkruste',
    description: 'Saray muhallebicilerinin sırrı: Nişastalı sütün tepside şekerle hafifçe yakılarak karamelize edilmesi ve rulo sarılarak sunulması.',
    description_en: 'Beloved Ottoman specialty: milk pudding cooked until the bottom layer intentionally chars into golden-brown caramel.',
    description_de: 'Traditionelles Dessert mit der perfekten Balance aus feiner Süße und feinem Röstgeschmack.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Medium', rating: 4.9, reviewCount: 620,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Süt & Laktoz'],
    basePortions: 2, matchScore: 97, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Süt', amount: 1, unit: 'litre', category: 'Dairy' },
      { name: 'Pirinç Unu & Nişasta', amount: 4, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Toz Şeker', amount: 1, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Pudra Şekeri & Tereyağı (Taban İçin)', amount: 2, unit: 'yemek kaşığı', category: 'Dairy' }
    ],
    steps: [
      { id: 1, title: 'Muhallebiyi Pişir', description: 'Süt, şeker, pirinç unu ve nişastayı tencerede koyulaşana kadar sürekli karıştırarak pişirin.', chef: 'chef1', chefName: '1. Şef', durationMins: 10 },
      { id: 2, title: 'Tepsiyi Şekerle ve Muhallebiyi Dök', description: 'Tepsinin tabanına tereyağı sürüp pudra şekeri serpin, muhallebiyi üzerine yayın.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Ocakta Tabanı Yak ve Sar', description: 'Tepsiyi ocak üzerinde çevirerek tabanını karamelize edin. Soğuyunca şerit kesip rulo sarın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 10 }
    ]
  },
  {
    id: 'dish-97',
    title: 'Hakiki Tavukgöğsü Tatlısı',
    title_en: 'Authentic Tavukgogsu Milk Pudding',
    title_de: 'Tavukgöğsü (Traditioneller Hähnchenbrust-Pudding)',
    subtitle: 'Gerçek tiftilmiş lif lif tavuk eti, süt, pirinç unu ve tarçın serpiştirilmiş',
    subtitle_en: 'Centuries-old royal dessert made with shredded chicken breast and milk',
    subtitle_de: 'Königlicher Milchpudding mit zartesten Fleischfasern und Zimt',
    description: 'Tarihi saray tatlısı: Tavuk göğüs etinin saatlerce suda lif lif ayrılıp sütün içinde eriyerek ipeksi bir kıvama dönüşmesi.',
    description_en: 'One of the culinary world’s greatest marvels: breast of chicken dissolved into a sweet, velvety milk pudding.',
    description_de: 'Einzigartiges Dessert aus dem Sultanspalast mit seidiger Textur und Zimtnote.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    prepTime: '35 dk', prepTimeMinutes: 35, difficulty: 'Hard', rating: 4.8, reviewCount: 410,
    tags: ['Tatlı', 'Et'],
    allergens: ['Süt & Laktoz'],
    basePortions: 2, matchScore: 92, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Haşlanmış Tavuk Göğsü (Lif Lif)', amount: 100, unit: 'g', category: 'Meat' },
      { name: 'Taze Süt', amount: 1, unit: 'litre', category: 'Dairy' },
      { name: 'Pirinç Unu & Nişasta', amount: 3, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Toz Şeker', amount: 1, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Toz Tarçın', amount: 1, unit: 'tatlı kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Tavuk Etini Tiftikleyin', description: 'Tavuk göğsünü suda bekletip saç teli inceliğinde lif lif tiftikleyin.', chef: 'chef1', chefName: '1. Şef', durationMins: 15 },
      { id: 2, title: 'Muhallebiyi Pişir', description: 'Süt, şeker ve unları tencerede karıştırarak pişirin, tavuk liflerini ilave edip tahta kaşıkla dövün.', chef: 'chef2', chefName: '2. Şef', durationMins: 10 },
      { id: 3, title: 'Kalıba Dök ve Tarçınla', description: 'Pürüzsüzleşen tatlıyı tepsiye döküp soğutun, üzerine bol tarçın serperek dilimleyin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 5 }
    ]
  },
  {
    id: 'dish-98',
    title: 'Tereyağlı Çam Fıstıklı İrmik Helvası',
    title_en: 'Buttery Semolina Halva with Pine Nuts',
    title_de: 'Butter-Grießhalva mit Pinienkernen',
    subtitle: 'Altın rengi kavrulmuş irmik, sütlü şerbet ve yanında Maraş dondurması',
    subtitle_en: 'Golden roasted semolina halva infused with pine nuts, served warm with ice cream',
    subtitle_de: 'Warmes Grießhalva mit gerösteten Pinienkernen und Eis',
    description: 'Sıcaklığıyla kalpleri ısıtan nostalji: İrmiğin tereyağında kokusu çıkana kadar kavrulup sütlü şerbetle demlenmesi.',
    description_en: 'Fragrant semolina slow-toasted in butter with pine nuts, steamed in hot milk syrup, and served with vanilla ice cream.',
    description_de: 'Seelenwärmendes Dessert aus geröstetem Grieß und feinem Milchsirup.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.9, reviewCount: 560,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Glüten', 'Süt & Laktoz', 'Çam Fıstığı'],
    basePortions: 2, matchScore: 96, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'İrmik', amount: 1.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Köy Tereyağı', amount: 100, unit: 'g', category: 'Dairy' },
      { name: 'Çam Fıstığı', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' },
      { name: 'Sıcak Süt & Şeker', amount: 2, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Maraş Dondurması', amount: 2, unit: 'top', category: 'Dairy' }
    ],
    steps: [
      { id: 1, title: 'Fıstık ve İrmiği Kavur', description: 'Tereyağında çam fıstığı ve irmiği altın sarısı renk alana kadar 12 dakika kısık ateşte kavurun.', chef: 'chef1', chefName: '1. Şef', durationMins: 12 },
      { id: 2, title: 'Sütlü Şerbeti Ver', description: 'Kaynar süt ve şeker karışımını dikkatlice tencereye dökün ve hızla karıştırın.', chef: 'chef2', chefName: '2. Şef', durationMins: 3 },
      { id: 3, title: 'Demlendir ve Dondurmayla Sun', description: 'Kapağını kapatıp 10 dakika demlendirin, ılık helvanın ortasına dondurma koyup servis edin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 5 }
    ]
  },
  {
    id: 'dish-99',
    title: 'Geleneksel Cevizli Un Helvası',
    title_en: 'Traditional Flour Halva with Walnuts',
    title_de: 'Traditionelles Mehlhalva mit Walnüssen',
    subtitle: 'Tereyağında pembeleşene kadar kavrulmuş un, ceviz ve ılık şerbet',
    subtitle_en: 'Velvety toasted flour halva studded with crunchy walnuts',
    subtitle_de: 'Samtiges Mehlhalva mit nussigem Aroma und Walnüssen',
    description: 'Anadolu adetlerinin baş tacı: Unun tereyağında sabırla kavrulması, ceviz ve şerbetle buluşup kaşık kaşık şekillendirilmesi.',
    description_en: 'Comforting home-style halva crafted from flour browned patiently in butter, enriched with toasted walnuts.',
    description_de: 'Klassisches Rezept mit liebevoll geröstetem Mehl und feiner Butternote.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.8, reviewCount: 390,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Glüten', 'Süt & Laktoz', 'Ceviz'],
    basePortions: 2, matchScore: 94, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Buğday Unu', amount: 1.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Tereyağı & Sıvı Yağ', amount: 100, unit: 'g', category: 'Dairy' },
      { name: 'İri Kırılmış Ceviz', amount: 0.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Ilık Su & Şeker Şerbeti', amount: 1.5, unit: 'su bardağı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Unu Sabırla Kavur', description: 'Tereyağında unu kokusu çıkıp rengi sütlü kahve olana dek 15 dakika kavurun.', chef: 'chef1', chefName: '1. Şef', durationMins: 15 },
      { id: 2, title: 'Cevizi Kat', description: 'Ceviz parçalarını ekleyip 2 dakika daha çevirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 2 },
      { id: 3, title: 'Şerbeti Yedir ve Kaşıkla Şekil Ver', description: 'Ilık şerbeti döküp helva toparlanana dek karıştırın, yemek kaşığıyla porsiyonlayın.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 3 }
    ]
  },
  {
    id: 'dish-100',
    title: 'Fındıklı Geleneksel Şekerpare',
    title_en: 'Sekerpare (Almond/Hazelnut Semolina Cakes)',
    title_de: 'Şekerpare (Getränkte Grießplätzchen)',
    subtitle: 'Ağızda dağılan kıyır irmikli hamur, ortasında çıtır fındık ve limonlu şerbet',
    subtitle_en: 'Melt-in-your-mouth semolina cookies soaked in lemon-scented syrup',
    subtitle_de: 'Mürbe Grießkekse mit Haselnuss in feinem Zitronensirup',
    description: 'Bayramların vazgeçilmez tatlısı: İrmikli yumuşacık kurabiyelerin nar gibi kızarıp limonlu ılık şerbeti sünger gibi çekmesi.',
    description_en: 'Golden baked semolina cookies crowned with a hazelnut, soaked until gorgeously soft and syrupy.',
    description_de: 'Herrlich mürbe Plätzchen, die den aromatischen Sirup perfekt aufsaugen.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Easy', rating: 4.9, reviewCount: 480,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Glüten', 'Süt & Laktoz', 'Yumurta', 'Fındık'],
    basePortions: 2, matchScore: 96, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Tereyağı (Oda Sıcaklığında)', amount: 125, unit: 'g', category: 'Dairy' },
      { name: 'İnce İrmik & Un', amount: 2, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Pudra Şekeri & Yumurta', amount: 1, unit: 'adet', category: 'Dairy' },
      { name: 'Kavrulmuş Bütün Fındık', amount: 20, unit: 'adet', category: 'Pantry' },
      { name: 'Limonlu Sıcak Şerbet', amount: 2, unit: 'su bardağı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Hamuru Yoğur', description: 'Tereyağı, pudra şekeri, yumurta, irmik ve unu yumuşak kulak memesi kıvamında yoğurun.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Yuvarla ve Fındık Batır', description: 'Ceviz büyüklüğünde yuvarlayıp tepsiye dizin, ortalarına birer fındık batırın.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Fırınla ve Şerbetle', description: '180°C fırında 25 dk nar gibi pişirin, fırından çıkar çıkmaz ılık şerbeti dökün.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 25 }
    ]
  },
  {
    id: 'dish-101',
    title: 'Geleneksel Fıstıklı Revani',
    title_en: 'Revani (Syrup Soaked Semolina Sponge Cake)',
    title_de: 'Revani (Grießkuchen in Sirup)',
    subtitle: 'Sünger dokulu irmik keki, portakal kabuğu rendesi ve Antep fıstığı',
    subtitle_en: 'Golden semolina sponge soaked in fragrant citrus syrup',
    subtitle_de: 'Saftiger Grießkuchen getränkt in Zitrussirup mit Pistazien',
    description: 'Osmanlı sarayından günümüze uzanan tatlı miras: Sünger gibi kabaran irmikli kekin şerbeti içine çekip lokum kıvamına gelmesi.',
    description_en: 'Sun-colored semolina cake perfumed with orange zest, drenched in syrup and garnished with crushed pistachios.',
    description_de: 'Herrlich saftiger Traditionskuchen mit feiner Zitrusnote.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Easy', rating: 4.8, reviewCount: 420,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Glüten', 'Süt & Laktoz', 'Yumurta', 'Antep Fıstığı'],
    basePortions: 2, matchScore: 94, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'İrmik & Un', amount: 1, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Yumurta & Toz Şeker', amount: 3, unit: 'adet', category: 'Dairy' },
      { name: 'Yoğurt & Sıvı Yağ', amount: 0.5, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Portakal Kabuğu Rendesi', amount: 1, unit: 'tatlı kaşığı', category: 'Produce' },
      { name: 'Toz Antep Fıstığı', amount: 2, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Keki Çırp', description: 'Yumurtaları şekerle köpürene dek çırpın, yoğurt, irmik, un ve portakal kabuğunu ekleyin.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Fırınla', description: 'Tepsiye yayıp 180°C fırında 25 dakika üzeri kızarana dek pişirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 25 },
      { id: 3, title: 'Şerbeti Dök ve Dilimle', description: 'Ilık keki dilimleyip soğuk şerbeti gezdirin, üzerine yeşil fıstık serpin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 5 }
    ]
  },
  {
    id: 'dish-102',
    title: 'Kaymaklı Kemalpaşa Tatlısı',
    title_en: 'Kemalpasa Cheese Cakes with Clotted Cream',
    title_de: 'Kemalpaşa-Dessert mit Kaymak',
    subtitle: 'Özel peynirli hamur topları, altın şerbet ve manda kaymağı',
    subtitle_en: 'Soft cheese-dough rounds soaked in syrup, served with rich clotted buffalo cream',
    subtitle_de: 'Saftige Teigbällchen in Sirup mit cremigem Büffel-Kaymak',
    description: 'Bursa Mustafakemalpaşa’nın ünlü tatlısı: Taze tuzsuz peynirli hamur toplarının şerbette şişerek puf gibi olması ve manda kaymağıyla yenmesi.',
    description_en: 'Tender cheese-based pastry dumplings boiled in scented syrup until plump, topped with dollops of clotted cream.',
    description_de: 'Kleine saftige Küchlein mit feiner Käsenote, gekrönt von feinstem Rahm.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.8, reviewCount: 360,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Süt & Laktoz', 'Glüten'],
    basePortions: 2, matchScore: 93, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Kuru Kemalpaşa Tatlısı', amount: 15, unit: 'adet', category: 'Pantry' },
      { name: 'Toz Şeker & Su Şerbeti', amount: 2.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Manda Kaymağı', amount: 100, unit: 'g', category: 'Dairy' },
      { name: 'Toz Antep Fıstığı', amount: 1, unit: 'yemek kaşığı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Şerbeti Kaynat', description: 'Geniş tencerede şeker ve suyu kaynatıp limon damlatın.', chef: 'chef1', chefName: '1. Şef', durationMins: 6 },
      { id: 2, title: 'Tatlıları Şerbette Şişir', description: 'Kemalpaşa toplarını şerbete atıp kısık ateşte kabarana kadar 12 dakika kaynatın.', chef: 'chef2', chefName: '2. Şef', durationMins: 12 },
      { id: 3, title: 'Kaymakla Taçlandır', description: 'Tatlıları tabağa alın, üzerlerine birer kaşık manda kaymağı ve fıstık koyun.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 3 }
    ]
  },
  {
    id: 'dish-103',
    title: 'Karamelli Balkan Trileçesi',
    title_en: 'Caramel Trilece (Three-Milk Cake)',
    title_de: 'Karamell-Trilece (Drei-Milch-Kuchen)',
    subtitle: 'Üç sütlü karışımda ıslatılmış sünger kek ve ev yapımı akışkan karamel sos',
    subtitle_en: 'Airy sponge cake saturated in three-milk cream and topped with golden caramel',
    subtitle_de: 'Luftiger Biskuit getränkt in drei Milchsorten mit Karamellspiegel',
    description: 'Balkanlardan soframıza gelen hafiflik: İnek, keçi ve manda sütünün krema ile birleşip sünger keki ıslatması ve üzeri karamel sosu.',
    description_en: 'Heavenly light dessert: aerated sponge cake drowned in a luscious three-milk bath, finished with amber caramel glaze.',
    description_de: 'Wunderbar saftiger Kuchen getränkt in einer feinen Milchmischung.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Medium', rating: 4.9, reviewCount: 650,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Süt & Laktoz', 'Glüten', 'Yumurta'],
    basePortions: 2, matchScore: 97, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Trileçe Keki (Sünger)', amount: 1, unit: 'tepsi', category: 'Bakery' },
      { name: 'Süt & Sıvı Krema Karışımı', amount: 3, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Ev Yapımı Karamel Sos', amount: 1, unit: 'su bardağı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Keki Fırınla ve Del', description: 'Yumurtalı keki pişirip soğutun, kürdanla her yerini delin.', chef: 'chef1', chefName: '1. Şef', durationMins: 15 },
      { id: 2, title: 'Süt Karışımını Çektir', description: 'Süt, krema ve şekeri çırpıp kekin üzerine yavaşça dökerek çektirin.', chef: 'chef2', chefName: '2. Şef', durationMins: 8 },
      { id: 3, title: 'Karamel Sosu Sür', description: 'Buzdolabında soğuttuktan sonra üzerine akışkan karamel sosunu yayıp dilimleyin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 5 }
    ]
  },
  {
    id: 'dish-104',
    title: 'Akışkan San Sebastian Cheesecake',
    title_en: 'San Sebastian Basque Cheesecake',
    title_de: 'San Sebastian Baskischer Käsekuchen',
    subtitle: 'Yanık karamelize kabuk, kalbinde eriyen ipeksi krema ve sıcak çikolata sosu',
    subtitle_en: 'Crustless Basque burnt cheesecake with a gooey creamy molten center',
    subtitle_de: 'Baskischer Käsekuchen mit dunkler Kruste und flüssigem Kern',
    description: 'Kahve yanı mutluluğu: Yüksek ısıda dışı karamelize yanık renge bürünürken içi krema gibi akışkan kalan İspanyol efsanesi.',
    description_en: 'Decadent crustless cheesecake baked at high heat for a dramatic burnt top and velvety molten center.',
    description_de: 'Kult-Käsekuchen ohne Boden mit cremigem, fast flüssigem Kern.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Medium', rating: 5.0, reviewCount: 840,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Süt & Laktoz', 'Yumurta'],
    basePortions: 2, matchScore: 99, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze Taze Krem Peynir', amount: 500, unit: 'g', category: 'Dairy' },
      { name: 'Taze Sıvı Krema', amount: 250, unit: 'ml', category: 'Dairy' },
      { name: 'Organik Yumurta', amount: 3, unit: 'adet', category: 'Dairy' },
      { name: 'Pudra Şekeri & Mısır Nişastası', amount: 1, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Sıcak Bitter Çikolata Sosu', amount: 0.5, unit: 'su bardağı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Krem Peynir ve Şekeri Çırp', description: 'Krem peynir ve pudra şekerini pürüzsüz ipek olana kadar mikserle çırpın.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Yumurta ve Kremayı Kat', description: 'Yumurtaları teker teker yedirin, kremayı ve nişastayı ekleyip karıştırın.', chef: 'chef2', chefName: '2. Şef', durationMins: 5 },
      { id: 3, title: 'Yüksek Isıda Fırınla', description: '220°C fırında 22-25 dakika üzeri nar gibi yanana kadar pişirin. Kalbi sallantılı kalmalıdır.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 25 }
    ]
  },
  {
    id: 'dish-105',
    title: 'Belçika Çikolatalı Sıcak Sufle',
    title_en: 'Belgian Dark Chocolate Soufflé',
    title_de: 'Belgisches Schokoladensoufflé',
    subtitle: 'Akışkan sıcak çikolata kalbi ve yanında vanilyalı Maraş dondurması',
    subtitle_en: 'Warm molten dark chocolate center dusted with powdered sugar',
    subtitle_de: 'Warmes Schokoladensoufflé mit flüssigem Kern und Eis',
    description: '%70 kakaolu bitter Belçika çikolatası ile hazırlanan, fırından çıkar çıkmaz kaşıkladığınızda kalbinden sıcacık çikolata fışkıran tatlı rüyası.',
    description_en: 'Decadent baked dessert with a melting molten heart of rich dark Belgian chocolate.',
    description_de: 'Warmes Schokoladendessert mit herrlich flüssigem Schokokern.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    prepTime: '18 dk', prepTimeMinutes: 18, difficulty: 'Medium', rating: 5.0, reviewCount: 890,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Süt & Laktoz', 'Glüten', 'Yumurta'],
    basePortions: 2, matchScore: 99, partnerLiked: false, userLiked: false,
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
  },
  {
    id: 'dish-106',
    title: 'Çikolata Soslu Klasik Profiterol',
    title_en: 'Classic Chocolate Profiteroles',
    title_de: 'Klassische Profiteroles mit Schokoladensauce',
    subtitle: 'Fırınlanmış çıtır şu hamurları, pastacı kreması ve bol bitter çikolata şelalesi',
    subtitle_en: 'Airy choux pastry balls filled with vanilla pastry cream and rich chocolate glaze',
    subtitle_de: 'Luftige Brandteigbällchen gefüllt mit Creme unter dunkler Schokolade',
    description: 'Tatlı krizlerinin ilacı: Minik puf hamurların içi vanilyalı krema ile doldurulup üzerine ılık bitter çikolata sosunun dökülmesi.',
    description_en: 'Tender choux puffs bursting with silky vanilla patisserie cream, drenched in dark chocolate sauce.',
    description_de: 'Frisch gebackene Brandteigkugeln mit cremiger Vanillefüllung und feiner Schokoglasur.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    prepTime: '30 dk', prepTimeMinutes: 30, difficulty: 'Medium', rating: 4.9, reviewCount: 520,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Glüten', 'Süt & Laktoz', 'Yumurta'],
    basePortions: 2, matchScore: 98, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Şu Hamuru Topları', amount: 10, unit: 'adet', category: 'Bakery' },
      { name: 'Vanilyalı Pastacı Kreması', amount: 1.5, unit: 'su bardağı', category: 'Dairy' },
      { name: 'Bitter Çikolata Sosu', amount: 1, unit: 'su bardağı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Kremayı Doldur', description: 'Krema torbasıyla şu hamurlarının tabanından içlerine bol krema sıkın.', chef: 'chef1', chefName: '1. Şef', durationMins: 6 },
      { id: 2, title: 'Kaseye Diz', description: 'Doldurulmuş profiterol toplarını kuplara piramit gibi dizin.', chef: 'chef2', chefName: '2. Şef', durationMins: 3 },
      { id: 3, title: 'Çikolatayı Akıt', description: 'Üzerlerine ılık bitter çikolata sosunu bolca döküp servis edin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 3 }
    ]
  },
  {
    id: 'dish-107',
    title: 'Geleneksel Nar Taneli Güllaç',
    title_en: 'Gullac with Rosewater & Pomegranate',
    title_de: 'Güllaç mit Rosenwasser und Granatapfel',
    subtitle: 'Mısır nişastalı ince tül yapraklar, ılık süt, ceviz ve taze nar taneleri',
    subtitle_en: 'Feathery starch leaves soaked in sweetened milk, rosewater, and pomegranates',
    subtitle_de: 'Hauchdünne Stärkeblätter in aromatisierter Milch mit Granatapfelkernen',
    description: 'Ramazan sofralarının zarafeti: Mısır nişastasından yapılan tül gibi yaprakların ılık şekerli süt ve gülsuyu ile ıslatılıp cevizle buluşması.',
    description_en: 'Delicate Ottoman dessert of paper-thin starch sheets soaked in sweet milk, infused with rosewater and ruby pomegranates.',
    description_de: 'Traditionelles Festtagsdessert mit feiner Rosenwassernote und frischem Granatapfel.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 dk', prepTimeMinutes: 20, difficulty: 'Easy', rating: 4.8, reviewCount: 460,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Süt & Laktoz', 'Ceviz'],
    basePortions: 2, matchScore: 95, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Güllaç Yaprakları', amount: 6, unit: 'yaprak', category: 'Pantry' },
      { name: 'Ilık Süt & Toz Şeker', amount: 1, unit: 'litre', category: 'Dairy' },
      { name: 'İnce Kırılmış Ceviz İçi', amount: 1, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Doğal Gül Suyu & Nar Taneleri', amount: 2, unit: 'yemek kaşığı', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Sütlü Şerbeti Isıt', description: 'Süt ve şekeri parmağı yakmayacak ılıklığa getirin, gülsuyunu ekleyin.', chef: 'chef1', chefName: '1. Şef', durationMins: 5 },
      { id: 2, title: 'Yaprakları Islat ve Diz', description: 'Tepsiye güllaç yapraklarını kepçeyle süt dökerek dizin, orta kata ceviz serpin.', chef: 'chef2', chefName: '2. Şef', durationMins: 8 },
      { id: 3, title: 'Nar ve Fıstıkla Süsle', description: 'Kalan yaprakları sütle ıslatıp dinlendirin, üzerini taze nar taneleri ve fıstıkla süsleyin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 4 }
    ]
  },
  {
    id: 'dish-108',
    title: 'Geleneksel Bereketli Aşure',
    title_en: 'Noah’s Pudding (Traditional Asure)',
    title_de: 'Traditionelles Aschure (Noah-Pudding)',
    subtitle: 'Aşurelik buğday, nohut, fasulye, incir, kayısı, nar taneleri ve tarçın',
    subtitle_en: 'Festive sweet wheat porridge studded with dried fruits, pulses, and pomegranate',
    subtitle_de: 'Süße Weizengrütze mit Trockenfrüchten, Hülsenfrüchten und Granatapfel',
    description: 'Anadolu’nun kardeşlik tatlısı: Buğday, nohut, fasulye ve kuru meyvelerin kazanlarda kaynayıp tarçın ve fındıkla süslenmesi.',
    description_en: 'Ancient festival pudding of slow-cooked wheat berries, chickpeas, apricots, and figs crowned with seeds and cinnamon.',
    description_de: 'Jahrtausendealte Süßspeise aus Getreide, Früchten und Nüssen.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    prepTime: '40 dk', prepTimeMinutes: 40, difficulty: 'Medium', rating: 4.9, reviewCount: 510,
    tags: ['Tatlı', 'Vejetaryen', 'Sağlıklı'],
    allergens: ['Glüten', 'Ceviz', 'Fındık'],
    basePortions: 2, matchScore: 96, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Aşurelik Buğday', amount: 1, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Haşlanmış Nohut & Kuru Fasulye', amount: 0.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Kuru Kayısı & İncir Küpleri', amount: 0.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Toz Şeker', amount: 1.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Nar Taneleri, Tarçın & Fındık', amount: 1, unit: 'porsiyon', category: 'Produce' }
    ],
    steps: [
      { id: 1, title: 'Buğdayı Helmelendir', description: 'Buğdayı suyunu çekip helmelenene kadar haşlayın.', chef: 'chef1', chefName: '1. Şef', durationMins: 20 },
      { id: 2, title: 'Meyve ve Bakliyatları Kat', description: 'Nohut, fasulye ve doğranmış kuru meyveleri ekleyip 10 dakika kaynatın.', chef: 'chef2', chefName: '2. Şef', durationMins: 10 },
      { id: 3, title: 'Şekerle ve Kaselere Al', description: 'Şekeri ekleyip bir taşım kaynatın, kaselere döküp nar taneleri ve tarçınla süsleyin.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 5 }
    ]
  },
  {
    id: 'dish-109',
    title: 'Erzurum Kadayıf Dolması',
    title_en: 'Erzurum Kadayif Dolma',
    title_de: 'Kadayif-Röllchen mit Walnuss (Erzurum)',
    subtitle: 'Cevizli tel kadayıf sarması, yumurtaya bulanıp kızartılmış ve soğuk şerbete atılmış',
    subtitle_en: 'Walnut-stuffed shredded phyllo rolls egg-battered, fried crispy, and dipped in syrup',
    subtitle_de: 'Mit Walnüssen gefüllte Teigröllchen, knusprig frittiert in Sirup getaucht',
    description: 'Erzurum mutfağının başyapıtı: Taze tel kadayıfın içine ceviz sarılıp yumurtaya batırılarak kızartılması ve şerbette çıtırlaşması.',
    description_en: 'Extraordinary technique: shredded phyllo tightly wound around walnuts, dipped in beaten eggs, fried, and plunged into cold syrup.',
    description_de: 'Besondere Spezialität: Knusprig ausgebackenes Engelshaar mit nussigem Kern in kaltem Sirup.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Medium', rating: 4.9, reviewCount: 440,
    tags: ['Tatlı'],
    allergens: ['Glüten', 'Yumurta', 'Ceviz'],
    basePortions: 2, matchScore: 96, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Taze Tel Kadayıf', amount: 300, unit: 'g', category: 'Bakery' },
      { name: 'İri Kırılmış Ceviz İçi', amount: 1.5, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Çırpılmış Yumurta', amount: 3, unit: 'adet', category: 'Dairy' },
      { name: 'Kızartma Sıvı Yağı', amount: 2, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Soğuk Şerbet', amount: 2, unit: 'su bardağı', category: 'Pantry' }
    ],
    steps: [
      { id: 1, title: 'Kadayıfı Sar', description: 'Avuç içine kadayıfı açıp bol ceviz koyarak sıkı dolma şeklinde sarın.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Yumurtaya Hafifçe Batır', description: 'Sarmaları çırpılmış yumurtaya fazla emdirmeden hızlıca bulayın.', chef: 'chef2', chefName: '2. Şef', durationMins: 4 },
      { id: 3, title: 'Kızart ve Şerbete At', description: 'Kızgın yağda altın sarısı kızartıp doğrudan soğuk şerbete atın, 2 dakika bekletip süzün.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 6 }
    ]
  },
  {
    id: 'dish-110',
    title: 'Çıtır İzmir Lokma Tatlısı',
    title_en: 'Crispy Turkish Lokma Fritters',
    title_de: 'Knusprige Lokma-Bällchen in Sirup',
    subtitle: 'Kızarmış altın lokma topları, tarçınlı sıcak şerbet ve üzeri Antep fıstığı',
    subtitle_en: 'Crispy golden fried dough spheres drenched in cinnamon spiced syrup',
    subtitle_de: 'Frittierte goldene Teigbällchen getränkt in Zimtsirup',
    description: 'Sokakların en tatlı cömertliği: Mayalı hamurdan sıkılan minik topların nar gibi kızarıp soğuk şerbetle cızırdayarak çıtırlaşması.',
    description_en: 'Crispy golden fritters with a brittle sugary shell that bursts with sweet aromatic syrup upon first bite.',
    description_de: 'Traditionelle goldene Teigkugeln, außen herrlich knusprig und innen saftig süß.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    prepTime: '25 dk', prepTimeMinutes: 25, difficulty: 'Easy', rating: 4.9, reviewCount: 520,
    tags: ['Tatlı', 'Vejetaryen'],
    allergens: ['Glüten', 'Antep Fıstığı'],
    basePortions: 2, matchScore: 97, partnerLiked: false, userLiked: false,
    ingredients: [
      { name: 'Mayalı Lokma Hamuru', amount: 350, unit: 'g', category: 'Bakery' },
      { name: 'Kızartma Sıvı Yağı', amount: 2, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Koyu Limonlu Şerbet', amount: 2, unit: 'su bardağı', category: 'Pantry' },
      { name: 'Toz Tarçın & Antep Fıstığı', amount: 1, unit: 'tatlı kaşığı', category: 'Spices' }
    ],
    steps: [
      { id: 1, title: 'Hamuru Avuçtan Sık', description: 'Mayalanmış hamuru avuç içine alıp tatlı kaşığıyla fındık büyüklüğünde kızgın yağa dökün.', chef: 'chef1', chefName: '1. Şef', durationMins: 8 },
      { id: 2, title: 'Sürekli Çevirerek Kızart', description: 'Kevgirle lokmaları sürekli yağda çevirerek her tarafını altın sarısı kızartın.', chef: 'chef2', chefName: '2. Şef', durationMins: 6 },
      { id: 3, title: 'Şerbete At ve Tarçın Serpin', description: 'Çıtır lokmaları soğuk şerbete atıp 1 dakika bekletin, üzerine tarçın ve fıstık serperek sıcak sunun.', chef: 'both', chefName: 'İki Şef Birlikte', durationMins: 4 }
    ]
  }
];

console.log('Batch 3 generated:', batch3.length);
fs.writeFileSync(path.join(__dirname, 'batch3.json'), JSON.stringify(batch3, null, 2));
