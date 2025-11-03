# 💐 Kalp Buketi - Romantik Çiçek Uygulaması

Bu proje, sevgiliniz için hazırlanmış özel bir romantik çiçek bukleti uygulamasıdır. İnteraktif animasyonlar ve güzel mesajlarla dolu bir sürpriz deneyimi sunar.

## 🌟 Özellikler

- **İnteraktif Hediye Kutusu**: Tıklayarak açabileceğiniz animasyonlu bir hediye kutusu
- **Çiçek Buketi Animasyonu**: Açılan kutudan çıkan güzel çiçek bukleti
- **Kalp Yağmuru**: Renkli kalp animasyonları
- **Özel Mesaj**: Kişiselleştirilebilir romantik mesajlar
- **Gizli Özellikler**: Sağ tıklama menüsü ve özel tıklama kombinasyonları
- **Responsive Tasarım**: Mobil ve masaüstü için optimize edilmiş

## 🚀 Nasıl Kullanılır

### Kurulum

1. **Projeyi Klonlayın**:
   ```bash
   git clone https://github.com/teymensel/heartbouquet.git
   cd heartbouquet
   ```

2. **Bağımlılıkları Yükleyin**:
   ```bash
   npm install
   # veya
   pnpm install
   ```

3. **Uygulamayı Çalıştırın**:
   ```bash
   npm run dev
   # veya
   pnpm dev
   ```

4. **Tarayıcınızda Açın**: `http://localhost:3000`

### Kullanım

1. **Hediye Kutusu**: Ana sayfada görünen hediye kutusuna tıklayın
2. **Animasyon**: Kutunun açılması ve çiçeklerin görünmesi
3. **Mesaj**: Kalp animasyonundan sonra romantik mesajınız görünecek
4. **Gizli Özellikler**:
   - **Sağ Tıklama**: Yapımcı bilgisi ve sistem bilgileri için
   - **Shift + I**: Bilgi penceresini açar
   - **Çoklu Tıklama**: Özel sürpriz mesaj için hızlı tıklayın

### Kişiselleştirme

`config.js` dosyasını düzenleyerek uygulamayı kişiselleştirebilirsiniz:

```javascript
export const config = {
  names: {
    first: "Sevgili",
    second: "Adınız"
  },
  specialMessage: {
    clickCount: 5, // Özel mesaj için gereken tıklama sayısı
    timeWindow: 2000 // Tıklama zaman aralığı (ms)
  },
  app: {
    name: "Kalp Buketi",
    version: "1.0.0",
    developer: "Teymensel"
  }
}
```

## 🛠️ Teknoloji Stack

- **Next.js 16**: React framework
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Stil sistemi
- **Radix UI**: Erişilebilir UI bileşenleri
- **Lucide React**: İkonlar
- **Vercel Analytics**: Analitik

## 📱 Özellikler

- **Tam Responsive**: Tüm cihazlarda mükemmel görünüm
- **Erişilebilir**: Klavye ve fare navigasyonu
- **Performanslı**: Optimize edilmiş animasyonlar
- **Modern UI**: Şık ve kullanıcı dostu tasarım

## 🤝 Katkıda Bulunma

Bu proje açık kaynak kodludur. Katkıda bulunmak için:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

[Teymensel](https://teymensel.com) tarafından geliştirilmiştir.

---

**Not**: Bu uygulama sevgiliniz için özel olarak hazırlanmıştır. Mesajları ve isimleri config.js'den değiştirebilirsiniz.
