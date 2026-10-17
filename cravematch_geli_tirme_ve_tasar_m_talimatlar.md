# CraveMatch - Uygulama Geliştirme ve Tasarım Kılavuzu

## 1. Uygulama Vizyonu ve Konsepti

**CraveMatch**, sıradan bir yemek tarifi uygulaması değil, premium hissiyatlı ve "oyunlaştırılmış" (gamified) bir lezzet eşleştirme asistanıdır. Hedef kitleye (özellikle çiftlere veya kararsız kalanlara) eğlenceli, interaktif ve şık bir mutfak/market deneyimi sunar.

## 2. Marka Kimliği ve Renk Paleti

Tüm arayüzlerde "Fine Dining" kalitesinde, modern (dribbble/behance trendlerine uygun) ve temiz bir tasarım dili kullanılacaktır.

* **Ana Arka Plan:** Krem (Soft Cream) - `#F7F5F2`
* **Ana Vurgu Rengi 1:** Kiremit (Terracotta) - `#E05A3D` (Aksiyon butonları, alev ikonları, aktif ögeler)
* **Ana Vurgu Rengi 2:** Koyu Turkuaz (Dark Teal) - `#2B6777` (İkincil butonlar, kart çerçeveleri, metinler)
* **Yardımcı Renk:** Hardal (Mustard) - `#F2A900` (3D Karar Zarı ve özel ikonlar)
* **Logo:** Üst üste binen iki oyun kartı. Arkadaki kart koyu turkuaz (üzerinde kiremit rengi oklu kalp), öndeki kart kiremit rengi (sağ üstten ısırılmış, üzerinde turkuaz çatal bıçak ikonu). Tipografi: "Crave" kiremit, "Match" turkuaz renginde.

## 3. Ekran ve Arayüz (UI/UX) Talimatları

**Ekran 1: Açılış (Onboarding & Login)**
* **Tasarım:** Krem arka plan, üstte logo. Merkezde hareket bulanıklığı efektiyle uçuşan 3D ikonlar (hardal rengi zar, beyaz şef şapkası, kiremit alev).
* **İşlev:** En altta kiremit rengi "Giriş Yap / Başla" butonu ve koyu turkuaz çerçeveli alternatif giriş butonu.

**Ekran 2: Keşfet (Swipe Modu)**
* **Tasarım:** Tinder benzeri büyük, iştah açıcı ve yüksek çözünürlüklü yemek kartı. Üstte yatay kaydırılabilir filtreler (Acı, Tatlı, Vegan vb.).
* **İşlev:** Altta "Geri Al, Pas, Beğen, Favoriye Ekle" butonları. Sağa ve sola kaydırma mantığı ile eşleşme havuzu oluşturulur.

**Ekran 3: Karar Zarı (Dice Roll)**
* **Tasarım:** Üst kısımda dönen 3D hardal rengi zar ve "Zarı At" butonu.
* **İşlev:** Alt kısımda eşleşen yemeklerin havuzu ("Tonight's Contenders") yer alır. Kullanıcı zarı atar ve uygulama rastgele bir kazanan seçer.

**Ekran 4: Zevk Havuzu ve Market Listesi (Pleasure Pool & Cart)**
* **Tasarım:** Ekran ikiye bölünür. Üstte koyu turkuaz bir çerçeve içinde "Zevk Havuzu" (Kullanıcıların keyfi atıştırmalık eklediği alan) ve "Market Zarı". Altta şık tasarımlı "Temel Malzemeler" listesi.
* **İşlev:** Market zarı atıldığında, havuza atılan keyfi ürünlerden sadece 3 tanesi seçilerek sepete eklenir.

**Ekran 5: Birlikte Pişir (Co-Cooking & Recipe)**
* **Tasarım:** Üstte büyük yemek görseli ve porsiyon seçici. Altında adımların listelendiği kartlar.
* **İşlev:** "Tek Şef" (Solo) ve "Görev Paylaşımı" (Task Sharing) arasında geçiş (toggle) yapılabilmelidir. Görev paylaşımı modunda adımlar Şef 1 ve Şef 2 olarak renklendirilir.

**Ekran 6: Profil ve Oyunlaştırma**
* **Tasarım:** Kullanıcı avatarı ve altında kiremit rengi "Master Chef / Usta Öğretici" rozeti.
* **İşlev:** Algoritmayı eğitmek için "Damak Zevki Düelloları" (This or That) kartları. En altta ise mutfağa girmesi istenmeyen (alerji vb.) ürünlerin üzeri çizili etiketleri bulunur.

## 4. Animasyon ve Efekt Talimatları (Kritik)

Uygulamanın statik bir hissiyattan kurtulup canlı ve oyunlaştırılmış hissettirmesi için aşağıdaki animasyon kurallarına kesinlikle uyulacaktır:

* **Teknoloji:** Animasyonlar için GIF veya ağır videolar yerine, yüksek performanslı ve hafif olan **LottieFiles** (.json formatlı animasyonlar) kullanılacaktır.
* **Açılış Ekranı İkonları:** Ekrandaki 3D zar, şef şapkası ve alev ikonları sabit durmayacaktır. Sürekli olarak havada süzülme (floating/hovering) ve hafif kendi etrafında dönme (spinning) animasyonlarına sahip olmalıdır.
* **Zar Atma (Dice Roll) Efekti:** "Zarı At" butonuna basıldığında ekrandaki zar hızlıca dönmeli/yuvarlanmalı ve sonuç ekrana düştüğünde telefonda hafif bir **titreşim (Haptic Feedback)** hissedilmelidir.
* **Kaydırma (Swipe) Dinamikleri:** Yemek kartları sağa veya sola kaydırılırken kartın hafifçe eğilmesi (tilt) ve eşleşme olduğunda ekranda küçük bir konfeti veya parlama (sparkle) efekti çıkması sağlanacaktır.

## 5. Geliştirme (Development) Talimatları

* **Platform:** Uygulama "FlutterFlow" üzerinde kodsuz/az kodlu (no-code/low-code) olarak geliştirilecektir.
* **Metot:** Yukarıdaki arayüz tasarımları FlutterFlow'daki widget'lar (Container, Row, Column, Button) ile birebir aynı renk kodları kullanılarak inşa edilecektir.
* **Test:** Yayınlamadan önce FlutterFlow içindeki "Test" (Run) butonu ile tüm butonların işlevselliği mobil cihazlarda simüle edilecektir. İlk mağaza yayını için üyeliksiz giriş opsiyonu aktif tutulmalıdır.