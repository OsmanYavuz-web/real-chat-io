# RealChat.io Uygulaması

Bu proje, real-time iletişim sağlayan bir web uygulamasıdır. Socket.IO kullanılarak geliştirilmiş olup, client ve server mimarisi ile çalışmaktadır.

## 🚀 Teknolojiler

### Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB (Mesaj ve oturum yönetimi için)

### Frontend
- React
- TypeScript
- Socket.IO Client
- CSS Modules
- Tailwind CSS

## 💻 Kurulum

### Ön Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn
- MongoDB (yerel veya uzak bağlantı)

### Server Kurulumu
```bash
cd server
npm install
npm run dev
```

### Client Kurulumu
```bash
cd client
npm install
npm start
```

## 📁 Proje Yapısı

```
real-chat-io/
├── client/                 # Frontend uygulaması
│   ├── src/               # Kaynak kodları
│   ├── public/            # Statik dosyalar
│   └── package.json       # Frontend bağımlılıkları
│
├── server/                # Backend uygulaması
│   ├── models/           # Veritabanı modelleri
│   ├── server.js         # Ana sunucu dosyası
│   └── package.json      # Backend bağımlılıkları
```

## 🌟 Özellikler

### Kullanıcı Arayüzü
- Kullanıcı adı girişi (2-20 karakter)
- Gerçek zamanlı mesajlaşma
- Çevrimiçi kullanıcı listesi
- Yazma durumu göstergesi
- Karanlık/Aydınlık tema desteği
- Sistem mesajları (katılma/ayrılma bildirimleri)

### Socket.IO Yapılandırması
- Otomatik yeniden bağlanma (5 deneme)
- Bağlantı durumu kontrolü
- Yeniden bağlanma gecikmesi: 1000ms
- Maksimum gecikme: 5000ms
- Zaman aşımı: 20000ms

### Veritabanı Modelleri
- Message Schema (username, message, type, createdAt)
- Session Schema (username, socketId)

## 🔧 Geliştirme

Projeyi geliştirirken aşağıdaki kurallara dikkat edilmelidir:
- TypeScript tip tanımlamaları kullanılmalıdır
- React bileşenleri .tsx uzantılı olmalıdır
- CSS Modules ve Tailwind CSS kullanılmalıdır
- ESLint ve Prettier kurallarına uyulmalıdır

## 🔒 Güvenlik Önlemleri
- Kullanıcı adı validasyonu
- XSS koruması
- CORS yapılandırması
- Socket.IO güvenlik ayarları
- Mesaj içeriği doğrulama