## Google Analytics (GA4) Entegrasyonu ve Event Takibi

Bu proje, Google Analytics 4 ile kullanıcı etkileşimlerini izlemek için yapılandırıldı. Aşağıda eklenen event'ler, nerede tetiklendikleri ve Google Analytics'te nasıl görüntülenecekleri anlatılmaktadır.

### 1) Kurulum Durumu
- GA4 kodu `index.html` içinde `<head>` bölümüne eklendi ve `G-TY50K29PJB` ölçüm kimliği ile çalışıyor.
- Ek olaylar (events) `index.html`'de tanımlanan `trackEvent(...)` yardımcı fonksiyonu ile gönderiliyor.

### 2) Gönderilen Event'ler
Aşağıdaki event'ler siteye eklendi. Parametreleri GA4'te raporlarda kullanabilmek için 4. adımda anlatılan şekilde Custom dimensions olarak tanımlayın.

- page_view
  - Ne zaman: Sayfa yüklendiğinde.
  - Parametreler: `page_title`, `page_location`, `page_referrer`.

- navigation_click
  - Ne zaman: Üst menüden bir bölüme tıklandığında (smooth scroll öncesi).
  - Parametreler: `section`, `page_location`.

- cta_click
  - Ne zaman: Hero bölümündeki CTA butonlarına tıklandığında.
  - Parametreler: `button_text`, `button_location`.

- contact_click
  - Ne zaman: Telefon, e‑posta veya harita bağlantılarına tıklandığında (hem içerikte hem footer'da).
  - Parametreler: `contact_method`, `page_location`.

- product_click
  - Ne zaman: Ürün kartlarına tıklandığında.
  - Parametreler: `product_name`, `product_category`.

- section_view
  - Ne zaman: Bir bölümün en az %50'i ilk kez görünür olduğunda (IntersectionObserver ile).
  - Parametreler: `section_name`, `page_location`.

- video_interaction
  - Ne zaman: Video kartlarıyla etkileşimde.
  - Aksiyonlar: `hover_start`, `hover_end`, `modal_open`, `modal_close`.
  - Parametreler: `action`, `video_name`, `content_type` ("video").

### 3) Kod Nerede?
- GA yerleştirme ve event yardımcıları: `index.html` `<head>` içinde GA script; gövde sonundaki `<script>` bloğunda `trackEvent`, `trackVideoEvent`, `trackNavigation`, `trackContact`, `trackCTA`, `trackSectionView` fonksiyonları.
- Event tetiklemeleri:
  - CTA butonları: `#home` içindeki buton `onclick` ile.
  - Contact linkleri: `#contact` ve footer bölümünde `onclick` ile.
  - Ürün kartları: `#products` içindeki kartlarda `onclick` ile.
  - Navigation: Tüm anchor'lar için scroll öncesi `trackNavigation`.
  - Section view: IntersectionObserver ile tüm `section[id]` öğeleri.
  - Video galerisi: `#portfolio` içinde video kartı hover/click ve modal aç/kapat.

### 4) Google Analytics 4'te Görüntüleme ve Yapılandırma

1. Realtime / DebugView ile doğrula
   - GA4 arayüzünde: Reports → Realtime bölümünde canlı gelen event'leri görün.
   - Alternatif olarak Configure → DebugView ile debug akışını izleyin.
   - Gerekirse geçici debug modu: Tarayıcıda Google Analytics Debugger uzantısını etkinleştirin ya da `window.dataLayer.push({debug_mode: true})` kullanın.

2. Events ekranında event adlarını doğrula
   - Reports → Engagement → Events altında `page_view`, `navigation_click`, `cta_click`, `contact_click`, `product_click`, `section_view`, `video_interaction` görünüyor olmalı.

3. Conversion tanımlama (opsiyonel ama önerilir)
   - Önemli event'leri dönüşüm olarak işaretleyin: Configure → Events → Listedeki event'i bulun → Mark as conversion.
   - Öneri: `contact_click`, `cta_click`, `product_click`.

4. Custom dimensions ekle (event parametrelerini raporlarda kullanmak için)
   - Configure → Custom definitions → Create custom dimensions.
   - Aşağıdaki event parametrelerini tek tek tanımlayın:
     - page_location, page_referrer
     - section, section_name
     - button_text, button_location
     - contact_method
     - product_name, product_category
     - action, video_name, content_type
   - Scope: Event. Dimension name'leri raporlayacağınız şekilde okunaklı adlandırın.
   - Not: Tanımladıktan sonra verilerin raporlara akması birkaç saat sürebilir.

5. Keşif (Explore) raporları oluştur
   - Explore → Blank.
   - Dimensions olarak (4. adımda ekledikleriniz) ve Metrics olarak `Event count`, `Users` ekleyin.
   - Örnek analizler:
     - Hangi `product_name` en çok tıklanmış?
     - Hangi `section_name` en çok görüntülenmiş?
     - `video_interaction` için en çok `action` hangisi ve hangi `video_name` ile?

### 5) Test Check-list
- Siteyi aç → Realtime'da `page_view` görünüyor mu?
- Menüden bölümlere tıkla → `navigation_click` geliyor mu?
- Hero CTA'lara tıkla → `cta_click` geliyor mu?
- Telefon/E‑posta/Harita linklerine tıkla → `contact_click` geliyor mu?
- Ürün kartına tıkla → `product_click` geliyor mu?
- Aşağı kaydır → ilgili `section_view` event'leri tetikleniyor mu?
- Video kartında hover ve modal aç/kapat → `video_interaction` action'ları geliyor mu?

### 6) Ortam Notları
- Geliştirme ortamında bazı tarayıcı gizlilik/uzantı ayarları tracking'i engelleyebilir. Mümkünse gerçek domain üzerinde test edin.
- GA ölçüm kimliği: `G-TY50K29PJB`. Değişmesi gerekirse `index.html` içindeki `<head>` bölümünde güncelleyin.

---

Sorularınız veya yeni event ihtiyaçları için: CTA tıklamalarına varyant, form gönderimleri, scroll derinliği, outbound link tıklamaları eklenebilir.


