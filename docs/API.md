# API Dokümantasyonu

## Socket.IO Olayları

### Client -> Server

#### 1. Bağlantı
```typescript
socket.emit('join', username: string)
```
- **Açıklama:** Kullanıcı sohbete katılır
- **Parametreler:**
  - username: Kullanıcı adı (2-20 karakter)

#### 2. Mesaj Gönderme
```typescript
socket.emit('message', message: string)
```
- **Açıklama:** Yeni mesaj gönderir
- **Parametreler:**
  - message: Mesaj içeriği

#### 3. Yazma Durumu
```typescript
socket.emit('typing', isTyping: boolean)
```
- **Açıklama:** Kullanıcının yazma durumunu günceller
- **Parametreler:**
  - isTyping: Yazma durumu

### Server -> Client

#### 1. Mesaj Alımı
```typescript
socket.on('message', (data: {
  username: string,
  message: string,
  type: 'user' | 'system',
  createdAt: Date
}) => void)
```
- **Açıklama:** Yeni mesaj alındığında tetiklenir

#### 2. Kullanıcı Listesi
```typescript
socket.on('userList', (users: string[]) => void)
```
- **Açıklama:** Çevrimiçi kullanıcı listesi güncellendiğinde tetiklenir

#### 3. Yazma Durumu
```typescript
socket.on('userTyping', (data: {
  username: string,
  isTyping: boolean
}) => void)
```
- **Açıklama:** Bir kullanıcının yazma durumu değiştiğinde tetiklenir

## HTTP Endpoints

### GET /api/messages
- **Açıklama:** Son mesajları getirir
- **Query Parametreleri:**
  - limit: number (varsayılan: 50)
- **Yanıt:**
```typescript
{
  messages: Array<{
    username: string,
    message: string,
    type: 'user' | 'system',
    createdAt: Date
  }>
}
```

### GET /api/users
- **Açıklama:** Çevrimiçi kullanıcıları getirir
- **Yanıt:**
```typescript
{
  users: string[]
}
``` 