# Kurulum Rehberi

## Geliştirme Ortamı Kurulumu

### Gerekli Yazılımlar
1. Node.js (v14 veya üzeri)
2. MongoDB
3. Git
4. Bir kod editörü (VS Code önerilir)

### VS Code Eklentileri
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

## Proje Kurulumu

### 1. Projeyi Klonlama
```bash
git clone [repo-url]
cd real-chat-io
```

### 2. Backend Kurulumu
```bash
cd server
npm install
```

#### MongoDB Yapılandırması
1. MongoDB'yi yerel olarak kurun veya MongoDB Atlas hesabı oluşturun
2. `.env` dosyası oluşturun:
```env
MONGODB_URI=mongodb://localhost:27017/real-chat-io
PORT=3001
```

### 3. Frontend Kurulumu
```bash
cd client
npm install
```

#### Ortam Değişkenleri
`.env` dosyası oluşturun:
```env
REACT_APP_API_URL=http://localhost:3001
```

## Geliştirme Ortamını Başlatma

### Backend Geliştirme Sunucusu
```bash
cd server
npm run dev
```

### Frontend Geliştirme Sunucusu
```bash
cd client
npm start
```

## Yaygın Sorunlar ve Çözümleri

### Port Çakışması
- Backend için 3001 portu kullanılıyor
- Frontend için 3000 portu kullanılıyor
- Port çakışması durumunda `.env` dosyasından port numaralarını değiştirebilirsiniz

### MongoDB Bağlantı Sorunları
1. MongoDB servisinin çalıştığından emin olun
2. Bağlantı URL'sini kontrol edin
3. Güvenlik duvarı ayarlarını kontrol edin 