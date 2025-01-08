# Mimari Dokümantasyonu

## Genel Bakış

Proje, modern web teknolojilerini kullanarak gerçek zamanlı iletişim sağlayan bir client-server mimarisi üzerine kurulmuştur.

```
[Client (React)] <---> [WebSocket/HTTP] <---> [Server (Node.js)] <---> [MongoDB]
```

## Backend Mimarisi

### 1. Server Katmanı
- Express.js web sunucusu
- Socket.IO WebSocket sunucusu
- CORS ve güvenlik middleware'leri

### 2. Veritabanı Katmanı
- MongoDB veritabanı
- Mongoose ORM
- İki ana model:
  - Message
  - Session

### 3. WebSocket Yönetimi
- Bağlantı yönetimi
- Olay işleme (event handling)
- Durum senkronizasyonu

## Frontend Mimarisi

### 1. Uygulama Katmanı
- React bileşen hiyerarşisi
- TypeScript tip sistemi
- Context API durum yönetimi

### 2. UI Katmanı
- Tailwind CSS stil sistemi
- CSS Modules bileşen stilleri
- Responsive tasarım

### 3. İletişim Katmanı
- Socket.IO Client
- HTTP istekleri için Axios
- WebSocket olay dinleyicileri

## Veri Akışı

### 1. Gerçek Zamanlı İletişim
```
[Client] ---(socket.emit)---> [Server] ---(broadcast)---> [Other Clients]
```

### 2. Durum Yönetimi
```
[MongoDB] <---> [Server Memory] <---(sync)---> [Client State]
```

### 3. Oturum Yönetimi
```
[Client Join] ---> [Server Session Store] ---> [Broadcast Updates]
```

## Güvenlik Katmanı

### 1. İstemci Tarafı
- Girdi doğrulama
- XSS koruması
- Rate limiting

### 2. Sunucu Tarafı
- CORS yapılandırması
- Socket.IO güvenlik ayarları
- MongoDB injection koruması

## Performans Optimizasyonları

### 1. Frontend
- React memo ve useCallback kullanımı
- Lazy loading
- Tailwind CSS purge

### 2. Backend
- MongoDB indeksleri
- Socket.IO mesaj tamponlama
- Mesaj geçmişi limitleme 