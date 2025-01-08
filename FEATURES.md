# Sohbet Uygulaması Özellikleri

## 1. Kullanıcı Arayüzü Özellikleri

### 1.1 Giriş Ekranı
- Kullanıcı adı girişi (2-20 karakter)
- Form validasyonu ve hata gösterimi
- Giriş butonu (disabled/enabled durumları)

### 1.2 Ana Sohbet Ekranı
- Mesaj listesi
- Mesaj gönderme formu
- Kullanıcı listesi (toggle özelliği)
- Çıkış butonu
- Karanlık/Aydınlık tema (sistem temasına uyumlu)

### 1.3 Mesaj Özellikleri
- Kullanıcı mesajları (sağ/sol hizalama)
- Sistem mesajları (ortalı gösterim)
- Zaman damgaları
- Yazma durumu göstergesi

## 2. Socket.IO Özellikleri

### 2.1 Bağlantı Yönetimi
- Otomatik yeniden bağlanma
- Bağlantı durumu kontrolü
- Socket yapılandırması
  - Reconnection attempts: 5
  - Reconnection delay: 1000ms
  - Max delay: 5000ms
  - Timeout: 20000ms

### 2.2 Mesajlaşma
- Anlık mesaj gönderme/alma
- Son 50 mesaj geçmişi
- Yazma durumu bildirimi
- Sistem mesajları

### 2.3 Kullanıcı Yönetimi
- Kullanıcı katılma/ayrılma bildirimleri
- Aktif kullanıcı listesi
- Oturum yönetimi
- Çoklu oturum kontrolü

## 3. Veritabanı Özellikleri

### 3.1 Message Modeli
- username (String)
- message (String)
- type (user/system)
- createdAt (Date)

### 3.2 Session Modeli
- username (String, 2-20 karakter)
- socketId (String)

## 4. Güvenlik Özellikleri

### 4.1 Giriş Güvenliği
- Kullanıcı adı validasyonu
- Minimum/maksimum karakter kontrolü
- XSS koruması

### 4.2 Bağlantı Güvenliği
- CORS yapılandırması
- Socket.IO güvenlik ayarları 