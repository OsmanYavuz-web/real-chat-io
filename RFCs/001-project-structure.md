# RFC 001: Proje Yapısı

## Durum
- Durum: Kabul edildi
- Başlangıç Tarihi: 2025-01-01
- Son Güncelleme: 2025-01-01

## Özet
Bu RFC, projenin dosya ve dizin yapısını, bağımlılıklarını ve genel organizasyonunu tanımlar.

## Detaylı Tasarım

### Kök Dizin
/
├── client/                 # Frontend uygulaması
├── server/                 # Backend uygulaması
└── README.md              # Proje dokümantasyonu

### Client Dizini
client/
├── src/                   # Kaynak kodları
│   ├── App.tsx           # Ana uygulama bileşeni
│   ├── main.tsx          # Uygulama giriş noktası
│   └── index.css         # Global stiller (Tailwind)
├── index.html            # HTML giriş dosyası
├── package.json          # Bağımlılıklar ve scriptler
├── postcss.config.js     # PostCSS yapılandırması
├── tailwind.config.js    # Tailwind CSS yapılandırması
└── vite.config.ts        # Vite yapılandırması

#### Bağımlılıklar
- React 18
- TypeScript
- Socket.IO Client
- Tailwind CSS
- HeadlessUI
- HeroIcons

### Server Dizini
server/
├── models/               # Mongoose modelleri
│   ├── Message.js       # Mesaj modeli
│   └── Session.js       # Oturum modeli
├── utils.js             # Yardımcı fonksiyonlar
├── server.js            # Ana sunucu dosyası
├── package.json         # Bağımlılıklar ve scriptler
└── nodemon.json         # Nodemon yapılandırması

#### Bağımlılıklar
- Express
- Socket.IO
- Mongoose
- Nodemon (dev) 