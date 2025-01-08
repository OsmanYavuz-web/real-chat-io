# RFC 004: Cursor Kuralları

## Durum
- Durum: Kabul edildi
- Başlangıç Tarihi: 2025-01-01
- Son Güncelleme: 2025-01-01

## Özet
Bu RFC, Cursor IDE'si için özel dosya organizasyonu, kod formatı ve isimlendirme kurallarını tanımlar.

## Detaylı Tasarım

{
  "rules": [
    {
      "name": "Dosya Organizasyonu",
      "patterns": [
        {
          "description": "React bileşenleri .tsx uzantılı olmalıdır",
          "pattern": "^.*\\.tsx$",
          "message": "React bileşenleri için .tsx uzantısı kullanın"
        }
      ]
    }
  ]
}

[.cursorrules'un geri kalanı buraya eklenecek...] 