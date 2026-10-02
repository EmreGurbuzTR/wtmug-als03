# 🌤️ Hava Durumu PWA

Web Tabanlı Mobil Uygulama Geliştirme dersinde **ücretsiz API kullanımını**
öğretmek için hazırlanmış örnek PWA.

## Kullanılan Ücretsiz API'ler
- **Open-Meteo Geocoding** — `https://geocoding-api.open-meteo.com/v1/search`
  Şehir adı → enlem/boylam
- **Open-Meteo Forecast** — `https://api.open-meteo.com/v1/forecast`
  Koordinat → güncel + 7 günlük tahmin

**API key GEREKMEZ. Kayıt GEREKMEZ. CORS açıktır.**

## Öğretilen Kavramlar
1. `fetch()` ile GET isteği ve `URL` + `searchParams` kullanımı
2. JSON yanıtı işleme (`await res.json()`)
3. Hata yönetimi (`try/catch`, `res.ok` kontrolü)
4. `localStorage` ile çevrimdışı son sonuç
5. Service Worker ile uygulama kabuğu önbelleği
6. Geolocation API entegrasyonu
7. PWA manifest + ana ekrana ekleme

## GitHub Pages'e Yayınlama
1. Repo oluştur: `hava-durumu-pwa`
2. Tüm dosyaları yükle
3. **Settings → Pages → Source: main / (root)**
4. Adres: `https://<kullanıcı>.github.io/hava-durumu-pwa/`

## Ders İçin Öneriler
- `sw.js` içindeki API cache kuralını değiştirip ne olduğunu gözlemleyin
- `forecast_days` parametresini 7 → 14 yapıp yanıt boyutunu karşılaştırın
- Rate limit testi: aynı saniyede 20 istek atıp yanıt sürelerini ölçün
- `localStorage` yerine `Cache API` veya `IndexedDB` kullanmayı deneyin