# 🚀 Setup CodingBoy Marketplace

## ✅ Fitur WhatsApp Float Button

Saya telah berhasil menambahkan floating WhatsApp button di pojok kanan bawah dengan fitur:

### 🎯 **Fitur Utama:**

- **Floating Button** - Muncul di pojok kanan bawah setelah 2 detik
- **Pulse Animation** - Efek berkedip untuk menarik perhatian
- **Notification Badge** - Dot merah dengan animasi bounce
- **Chat Form** - Pop-up form seperti live chat
- **Quick Messages** - 5 template pesan cepat
- **Custom Message** - User bisa ketik pesan sendiri
- **WhatsApp Redirect** - Langsung ke WhatsApp dengan pesan pre-filled
- **Tooltip** - "Ada yang bisa kami bantu?" muncul setelah 3 detik
- **Online Status** - Indicator "Online" di samping button
- **Mobile Responsive** - Optimized untuk mobile dan desktop

### 🎨 **Design Features:**

- **Glassmorphism Style** - Sesuai dengan theme website
- **Smooth Animations** - Menggunakan Framer Motion
- **Hover Effects** - Scale dan shadow effects
- **CSS Classes** - Menggunakan class names sesuai permintaan:
  - `chaty-outer-forms`
  - `chaty-popup-whatsapp-form`
  - `chaty-whatsapp-btn-form`
  - `chaty-form-0`
  - `pos-right`
  - `active`

### 📱 **Cara Kerja:**

1. Button muncul setelah 2 detik page load
2. User klik button → Chat form terbuka
3. User bisa pilih quick message atau ketik sendiri
4. Klik Send → Redirect ke WhatsApp dengan pesan
5. Chat form otomatis tutup setelah redirect

## 🛠 **Cara Menjalankan Project:**

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Buat file `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key

# WhatsApp Number (Format: +62xxx)
WHATSAPP_PHONE_NUMBER=+62881025741054

```

### 3. Run Development

Jalankan perintah npm run dev

Website akan berjalan di: **http://localhost:3000**

## 🎯 **Fitur Utama:**

- **Floating Button** - Muncul di pojok kanan bawah setelah 2 detik
- **Pulse Animation** - Efek berkedip untuk menarik perhatian
- **Notification Badge** - Dot merah dengan animasi bounce
- **Chat Form** - Pop-up form seperti live chat
- **Quick Messages** - 5 template pesan cepat
- **Custom Message** - User bisa ketik pesan sendiri
- **WhatsApp Redirect** - Langsung ke WhatsApp dengan pesan pre-filled
- **Tooltip** - "Ada yang bisa kami bantu?" muncul setelah 3 detik
- **Online Status** - Indicator "Online" di samping button
- **Mobile Responsive** - Optimized untuk mobile dan desktop

### 🎨 **Design Features:**

- **Glassmorphism Style** - Sesuai dengan theme website
- **Smooth Animations** - Menggunakan Framer Motion
- **Hover Effects** - Scale dan shadow effects
- **CSS Classes** - Menggunakan class names sesuai permintaan:
  - `chaty-outer-forms`
  - `chaty-popup-whatsapp-form`
  - `chaty-whatsapp-btn-form`
  - `chaty-form-0`
  - `pos-right`
  - `active`

### 📱 **Cara Kerja:**

1. Button muncul setelah 2 detik page load
2. User klik button → Chat form terbuka
3. User bisa pilih quick message atau ketik sendiri
4. Klik Send → Redirect ke WhatsApp dengan pesan
5. Chat form otomatis tutup setelah redirect

## 🛠 **Cara Menjalankan Project:**

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Buat file `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key

# WhatsApp Number (Format: +62xxx)
WHATSAPP_PHONE_NUMBER=+62881025741054

```

### 3. Run Development

``ash
npm run dev
``

Website akan berjalan di: **http://localhost:3000**

## 🎯 **WhatsApp Integration:**

### Nomor WhatsApp

- Default: `+62881025741054`
- Bisa diubah di `.env.local`
- Format: `+62` diikuti nomor tanpa 0

### Template Pesan

1. "Halo! Saya ingin konsultasi tentang pembuatan website"
2. "Berapa harga untuk website company profile?"
3. "Saya tertarik dengan paket Business, bisa dijelaskan?"
4. "Berapa lama waktu pengerjaan website?"
5. "Apakah ada garansi untuk website yang dibuat?"

### Custom Message

User bisa mengetik pesan sendiri di textarea yang disediakan.

## 🎨 **Customization:**

### Mengubah Pesan Default

Edit di `src/components/WhatsAppFloat.tsx`:

```tsx
const quickMessages = [
  "Pesan custom 1",
  "Pesan custom 2",
  // dst...
];
```

### Mengubah Styling

Edit CSS di `src/app/globals.css`:

```css
.chaty-whatsapp-btn-form {
  /* Custom styles */
}
```

### Mengubah Delay Muncul

Edit di `WhatsAppFloat.tsx`:

```tsx
setTimeout(() => {
  setIsVisible(true);
}, 2000); // 2 detik, ubah sesuai kebutuhan
```

## 📱 **Mobile Optimization:**

- **Responsive Design** - Menyesuaikan ukuran layar
- **Touch Friendly** - Button size optimal untuk touch
- **Backdrop Blur** - Overlay untuk mobile
- **Max Width** - Chat form tidak melebihi layar

## 🚀 **Production Ready:**

- **Performance Optimized** - Lazy loading dan minimal bundle
- **SEO Friendly** - Tidak mempengaruhi SEO
- **Accessibility** - Keyboard navigation support
- **Cross Browser** - Compatible dengan semua browser modern

## 🎯 **Analytics Tracking:**

Untuk tracking konversi, bisa tambahkan:

```tsx
const handleSendMessage = () => {
  // Google Analytics tracking
  gtag("event", "whatsapp_click", {
    event_category: "engagement",
    event_label: "floating_button",
  });

  // Redirect ke WhatsApp
  window.open(whatsappUrl, "_blank");
};
```

## 🔧 **Troubleshooting:**

### Button tidak muncul:

- Check console untuk error
- Pastikan Framer Motion terinstall
- Verify component di layout.tsx

### WhatsApp tidak terbuka:

- Check format nomor telepon
- Pastikan nomor aktif WhatsApp
- Test di device yang ada WhatsApp

### Styling tidak sesuai:

- Check CSS classes di globals.css
- Verify Tailwind CSS config
- Clear browser cache

---

**WhatsApp Float Button sudah siap digunakan! 🎉**

Button akan muncul di semua halaman website dan langsung redirect ke WhatsApp ketika user mengirim pesan.
