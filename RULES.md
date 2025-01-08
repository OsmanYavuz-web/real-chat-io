# Proje Kuralları

## 1. Kod Yazım Kuralları

### 1.1 Genel Kurallar
- Tüm değişken ve fonksiyon isimleri açıklayıcı olmalıdır
- Türkçe karakter kullanılmamalıdır
- Her fonksiyon tek bir sorumluluk almalıdır
- Fonksiyonlar 20 satırı geçmemelidir
- Yorum satırları gerekli yerlerde kullanılmalıdır

### 1.2 TypeScript/JavaScript Kuralları
- TypeScript için tip tanımlamaları zorunludur
- any kullanımından kaçınılmalıdır
- ES6+ özellikleri tercih edilmelidir
- Async/await yapısı kullanılmalıdır

### 1.3 React Kuralları
- Fonksiyonel bileşenler kullanılmalıdır
- useEffect dependency array'leri doğru kullanılmalıdır
- Props için tip tanımlaması yapılmalıdır
- Memoization gerektiğinde kullanılmalıdır

## 2. Socket.IO Kuralları

### 2.1 Event İsimlendirme
- chat message: Mesaj gönderme/alma
- user joined: Kullanıcı katılma
- user left: Kullanıcı ayrılma
- user typing: Yazma durumu
- active users: Aktif kullanıcılar

### 2.2 Hata Yönetimi
- Socket bağlantı hataları loglanmalıdır
- Yeniden bağlanma stratejisi uygulanmalıdır
- Timeout değerleri belirlenmelidir

## 3. Veritabanı Kuralları

### 3.1 MongoDB
- Şema validasyonları kullanılmalıdır
- İndeksler gerektiğinde eklenmelidir
- Sorgu optimizasyonu yapılmalıdır

### 3.2 Veri Tipleri
- ObjectId için tip kontrolü yapılmalıdır
- Tarih alanları UTC olarak saklanmalıdır
- String alanlar trim edilmelidir

## 4. Güvenlik Kuralları

### 4.1 Input Validasyonu
- Kullanıcı girişleri sanitize edilmelidir
- Maksimum karakter limitleri uygulanmalıdır
- XSS koruması sağlanmalıdır

### 4.2 Bağlantı Güvenliği
- CORS politikası doğru yapılandırılmalıdır
- Rate limiting uygulanmalıdır
- Socket.IO origin kontrolü yapılmalıdır

## 5. Performans Kuralları

### 5.1 Frontend
- Gereksiz render'lardan kaçınılmalıdır
- Bundle boyutu optimize edilmelidir
- Lazy loading kullanılmalıdır

### 5.2 Backend
- Mesaj geçmişi sınırlandırılmalıdır
- Veritabanı sorguları optimize edilmelidir
- Memory leak'ler önlenmelidir 