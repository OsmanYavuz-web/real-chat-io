# Gerçek Zamanlı Sohbet Uygulaması PRD

## 1. Genel Bakış

### 1.1 Amaç
Bu proje, Socket.IO ve React kullanarak gerçek zamanlı bir sohbet uygulaması sunmayı amaçlamaktadır. Kullanıcılar anlık mesajlaşabilir, çevrimiçi kullanıcıları görebilir ve yazma durumlarını takip edebilir.

### 1.2 Kapsam
- Gerçek zamanlı mesajlaşma
- Kullanıcı yönetimi
- Çevrimiçi kullanıcı listesi
- Sistem mesajları
- Yazma durumu göstergesi

## 2. Teknik Özellikler

### 2.1 Backend (server/)
- **Framework:** Express.js
- **Veritabanı:** MongoDB
- **Gerçek Zamanlı İletişim:** Socket.IO
- **Ana Özellikler:**
  - Mesaj yönetimi (Message modeli)
  - Oturum yönetimi (Session modeli)
  - Sistem mesajları
  - Kullanıcı bağlantı yönetimi

### 2.2 Frontend (client/)
- **Framework:** React + TypeScript
- **UI Framework:** Tailwind CSS
- **Bileşenler:**
  - Kullanıcı girişi
  - Mesaj listesi
  - Kullanıcı listesi
  - Mesaj gönderme formu

## 3. Kullanıcı Hikayeleri

### 3.1 Temel Özellikler
- Kullanıcı olarak, sohbete katılmak için kullanıcı adı girebilmeliyim
- Kullanıcı olarak, mesaj gönderebilmeliyim
- Kullanıcı olarak, diğer kullanıcıların mesajlarını görebilmeliyim
- Kullanıcı olarak, çevrimiçi kullanıcıları görebilmeliyim
- Kullanıcı olarak, diğer kullanıcıların yazma durumunu görebilmeliyim

### 3.2 Sistem Özellikleri
- Sistem, kullanıcı katılma/ayrılma durumlarını bildirir
- Sistem, son 50 mesajı yeni katılan kullanıcılara gösterir
- Sistem, bağlantı koptuğunda otomatik yeniden bağlanma denemesi yapar

## 4. Teknik Gereksinimler

### 4.1 Backend Gereksinimleri
- Node.js
- MongoDB
- Socket.IO
- Express.js

### 4.2 Frontend Gereksinimleri
- React 18+
- TypeScript
- Tailwind CSS
- Socket.IO Client

### 4.3 Veritabanı Şemaları

#### Message Schema
- username (String)
- message (String)
- type (String: 'user' | 'system')
- createdAt (Date)

#### Session Schema
- username (String)
- socketId (String)

## 5. Güvenlik ve Performans

### 5.1 Güvenlik Önlemleri
- Kullanıcı adı doğrulama
- Mesaj içeriği doğrulama
- Socket bağlantı güvenliği

### 5.2 Performans Optimizasyonları
- Mesaj geçmişi sınırlaması (50 mesaj)
- Verimli Socket.IO yapılandırması
- Tailwind CSS optimizasyonları

## 6. Gelecek Geliştirmeler
- Özel mesajlaşma
- Dosya paylaşımı
- Emoji desteği
- Mesaj arama
- Oda sistemi 