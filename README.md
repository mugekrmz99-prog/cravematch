# CraveMatch 🎲❤️
### Çiftler İçin Akşam Yemeği Karar & Lezzet Eşleştirme Uygulaması

CraveMatch, çiftlerin "Bu akşam ne yesek?" kararsızlığını eğlenceli bir oyuna dönüştüren; canlı çoklu telefon senkronizasyonu, QR & 6 haneli PIN eşleşmesi, çift sohbeti, 3D karar zarı, profil sistemi ve CSV menü yöneticisi sunan modern bir React web uygulamasıdır.

---

## 🚀 GitHub'a Gönderme ve Ücretsiz Canlıya Alma (Vercel / Netlify)

Google Cloud Run / AI Studio önizleme linkleri varsayılan olarak Google hesabı yetkisi (IAM) gerektirebilir. Projeyi GitHub'a yükleyip **Vercel** veya **Netlify** üzerinden yayınladığınızda eşiniz veya herkes herhangi bir Google girişine gerek kalmadan doğrudan erişebilir.

### 1. GitHub Reposuna Gönderme Adımları

GitHub hesabınızda yeni bir repo oluşturun (örn: `cravematch`), ardından terminalde şu komutları çalıştırın:

```bash
# 1. Kendi GitHub repo adresinizi remote olarak ekleyin:
git remote add origin https://github.com/<KULLANICI_ADINIZ>/cravematch.git

# 2. Kodları GitHub'a gönderin:
git branch -M main
git push -u origin main
```

*(Eğer token veya şifre sorarsa GitHub Settings -> Developer Settings -> Personal Access Tokens (classic) üzerinden oluşturduğunuz token'ı şifre olarak yapıştırabilirsiniz).*

### 2. Tek Tıkla Canlıya Alma (Vercel veya Netlify)

1. [vercel.com](https://vercel.com) veya [netlify.com](https://netlify.com) adresine gidin.
2. GitHub hesabınızla giriş yapın.
3. **"Add New Project"** diyerek `cravematch` reponuzu seçin.
4. **Deploy** butonuna basın.
5. 1 dakika içinde size verilen `https://cravematch.vercel.app` gibi genel bir bağlantı oluşur. Bu bağlantıyı eşinize gönderdiğinizde hiçbir Google yetkisi gerekmeden doğrudan açılır ve QR/PIN ile eşleşir!

---

## 🛠️ Yerel Geliştirme (Local Development)

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın (Port 3000)
npm run dev

# Üretim derlemesi (Production build)
npm run build
```

---

## 📱 Özellikler

1. **Çift Senkronizasyonu & Eşleşme:**
   - Canlı QR kod okuma
   - 6 haneli PIN / Kod ile tek dokunuşla eşleşme (`CRAVE-9821`)
   - Otomatik cihaz kimliği (Müge 👩 ve Cihat 👨)
   - İnternet üzerinden canlı çift senkronizasyonu (SSE / Polling / BroadcastChannel)

2. **İnteraktif Çift Sohbeti:**
   - Gerçek zamanlı mesajlaşma
   - Hızlı tepki butonları (*"❤️ Harika seçim!"*, *"🎲 Zarı atalım!"*, *"🛒 Malzemeleri aldım"*)
   - Özel bildirimler (Zaman Hatırlatması, Karar Zarı Çağrısı, Market Sepeti)

3. **Gelişmiş Profil & Alerjen Yönetimi:**
   - Seviye ve şef unvanları
   - Çift uyumu ve başarı madalyaları
   - Akıllı alerjen filtreleme (seçilen alerjenler yemek kartlarından gizlenir)
   - Partner profilini anlık görüntüleme

4. **CSV & Menü Veritabanı Yöneticisi:**
   - Google E-Tablolar / Excel uyumlu CSV şablonu indirme
   - Kendi CSV menü dosyanızı yükleyerek toplu yemek ekleme
   - Otomatik kategori klasörleme (İtalyan, Vejetaryen, Fast Food, Sağlıklı, Tatlılar, Acı)

5. **3D Karar Zarı & Market Sepeti:**
   - Fizik simülasyonlu 3D lezzet zarı
   - Ortak market listesi ve malzemeler
