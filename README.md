# 🚀 CodingBoy - Marketplace Jasa Pembuatan Website

Marketplace platform untuk jasa pembuatan website yang menargetkan UKM dan Startup di Indonesia. Dibangun dengan Next.js 15, Clerk Authentication, dan Glassmorphism Dark UI.

## ✨ Fitur Utama

- 🎨 **Glassmorphism Dark UI** - Modern dark theme dengan efek glass blur
- 🔐 **Authentication** - Clerk untuk login/register yang aman
- 📱 **Mobile-First Design** - Responsive untuk semua device
- 💰 **Paket Layanan** - 3 tier pricing (Starter, Business, Enterprise)
- 📊 **Dashboard User** - Tracking progress proyek real-time
- 🎯 **Portfolio Gallery** - Showcase hasil karya dengan filter kategori
- 💬 **WhatsApp Integration** - Direct chat untuk konsultasi
- 🔍 **SEO Optimized** - Meta tags dan struktur SEO-friendly
- 📝 **Contact Forms** - Form inquiry dengan validasi
- ⭐ **Testimonials** - Review dan rating dari klien

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Custom Glassmorphism
- **Authentication**: Clerk
- **Data Layer**: Prisma ORM + Neon Postgres
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel Ready

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/wann1133/CodingBoy.git
cd codingboy-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Isi nilai berikut di `.env.local`:

- `DATABASE_URL` & `DIRECT_DATABASE_URL` → connection string Postgres (Neon disarankan, gunakan string pooling).
- `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_TOKEN_SECRET` → kredensial panel admin (hash default di contoh bisa diganti dengan milikmu sendiri).
- Keys Clerk (`NEXT_PUBLIC_CLERK_*`, `CLERK_SECRET_KEY`).
- Midtrans & WhatsApp terkait.

### 4. Siapkan Database & Seed

```bash
npx prisma migrate deploy
npx prisma db seed
```

Perintah di atas akan membangun skema di database Postgres dan mengisi data awal (blog & portofolio dummy).

### 5. Jalankan Development Server

```bash
npm run dev
```

## 🗄️ Database & Seeding

1. **Buat database Postgres** (mis. Neon). Gunakan connection string pooling (`postgresql://.../dbname?sslmode=require`).
2. **Set variabel lingkungan lokal** pada `.env.local` (`DATABASE_URL`, `DIRECT_DATABASE_URL`).
3. **Migrasi skema**:
   ```bash
   npx prisma migrate deploy
   ```
4. **Seed konten awal** (blog, portofolio, layanan, testimonial):
   ```bash
   npx prisma db seed
   ```
5. Aplikasi akan otomatis menjaga dummy data tetap tersedia via API admin/public bila tabel kosong.
6. Kredensial default admin pada `.env.example` (`admin@codingboy.dev` / hash `admin123`) hanya untuk pengembangan—ganti hash menggunakan `node -e "console.log(require('bcryptjs').hashSync('passwordBaru', 12))"` sebelum production.

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Project

```
src/
├── app/
│   ├── dashboard/          # User dashboard
│   ├── portfolio/          # Portfolio gallery
│   ├── tentang/           # About page
│   ├── sign-in/           # Clerk sign in
│   ├── sign-up/           # Clerk sign up
│   ├── globals.css        # Global styles + glassmorphism
│   ├── layout.tsx         # Root layout dengan Clerk
│   └── page.tsx           # Homepage marketplace
├── middleware.ts          # Clerk middleware
└──     └── ```

## 🎨 Design System

### Glassmorphism Dark Theme

- **Background**: Gradient dari slate-900 via purple-900 ke slate-900
- **Glass Cards**: `bg-white/5` dengan `backdrop-blur-md`
- **Borders**: `border-white/10` untuk subtle outline
- **Text**: White primary, gray-300 secondary
- **Accents**: Blue-400 dan purple-400 gradients

### Color Palette

```css
Primary: #3b82f6 (Blue-500)
Secondary: #8b5cf6 (Purple-500)
Background: Linear gradient slate-900 → purple-900 → slate-900
Glass: rgba(255, 255, 255, 0.05)
Border: rgba(255, 255, 255, 0.1)
Text Primary: #ffffff
Text Secondary: #d1d5db (gray-300)
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Konfigurasi Clerk

1. Buat akun di [Clerk.dev](https://clerk.dev)
2. Buat aplikasi baru
3. Copy API keys ke `.env.local`
4. Setup redirect URLs:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

## 💾 Database Schema

### Key Models:

- **User** - Data user dari Clerk
- **Service** - Paket layanan (Starter, Business, Enterprise)
- **Project** - Proyek client dengan status tracking
- **Portfolio** - Showcase hasil karya
- **Testimonial** - Review dan rating client
- **Inquiry** - Form kontak dan inquiry
- **BlogPost** - Content marketing
- **Payment** - Tracking pembayaran

## 🚀 Deployment

### Vercel + Neon (Recommended)

1. **Buat database** di [Neon](https://neon.tech/):
   - Salin connection string pooling (`DATABASE_URL`).
   - Opsional: salin juga direct connection (`DIRECT_DATABASE_URL`) untuk migrasi & seed.
2. **Seed database** sekali menggunakan Neon connection:
   ```bash
   # lokal
   DATABASE_URL="postgresql://..." npx prisma migrate deploy
   DATABASE_URL="postgresql://..." npx prisma db seed
   ```
3. **Hubungkan repo ke Vercel** (Import Project → pilih repository ini).
4. **Set environment variables** di Vercel Project Settings → Environment Variables:
   - `DATABASE_URL`
   - `DIRECT_DATABASE_URL` (opsional tetapi dianjurkan untuk Prisma Accelerate/pooling)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH`
   - `ADMIN_TOKEN_SECRET`
   - `NEXT_PUBLIC_CLERK_*`, `CLERK_SECRET_KEY`
   - `MIDTRANS_*`, `WHATSAPP_PHONE_NUMBER`
5. Trigger deploy (`npm run build` + `next start` otomatis ditangani Vercel).
6. Setelah deploy, akses `/admin/login` dengan kredensial yang ditetapkan.

### Manual Deployment

```bash
npm run build
npm start
```

Pastikan variabel lingkungan (`DATABASE_URL`, `ADMIN_*`, `CLERK_*`, dsb.) tersedia di proses runtime sebelum menjalankan `npm start`.

## 📊 SEO & Performance

- ✅ Meta tags optimized untuk keyword Indonesia
- ✅ Structured data untuk rich snippets
- ✅ Image optimization dengan Next.js Image
- ✅ Lazy loading untuk performance
- ✅ Mobile-first responsive design
- ✅ Core Web Vitals optimized

## 🎯 Target Keywords

- "jasa pembuatan website"
- "bikin website murah"
- "website company profile"
- "jasa web design Jakarta"
- "pembuatan website UMKM"

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

- **WhatsApp**: +62 812-3456-7890
- **Email**: hello@codingboy.id
- **Website**: [codingboy.id](https://codingboy.id)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.dev/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide](https://lucide.dev/) - Icons

---

**Made with ❤️ in Indonesia for Indonesian UKM & Startups**
# force redeploy
