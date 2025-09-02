# 🚀 Panduan Menjalankan CodingBoy Platform

## 📋 Prerequisites

Pastikan Anda sudah menginstall:
- Node.js (v18 atau lebih baru)
- npm atau yarn
- PostgreSQL database
- Git

## 🛠 Setup Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Buat file `.env.local` di root project dengan isi:

```env
# Clerk Authentication (Dapatkan dari https://clerk.dev)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/codingboy_marketplace"

# Payment Gateway Midtrans (Optional)
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_IS_PRODUCTION=false

# WhatsApp Integration
WHATSAPP_PHONE_NUMBER=+6281234567890
```

### 3. Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Push schema ke database
npx prisma db push

# (Optional) Lihat database di browser
npx prisma studio
```

### 4. Run Development Server
```bash
npm run dev
```

Website akan berjalan di: http://localhost:3000

## 📱 Fitur yang Sudah Dibuat

### ✅ Homepage
- Hero section dengan CTA WhatsApp
- Value propositions (4 poin utama)
- Service packages (3 tier pricing)
- Portfolio preview
- Testimonials section
- Process steps (6 langkah)
- Contact form
- Footer lengkap

### ✅ Authentication (Clerk)
- Sign in page dengan glassmorphism theme
- Sign up page dengan glassmorphism theme
- Protected routes dengan middleware
- User session management

### ✅ Dashboard User
- Welcome section dengan greeting
- Stats cards (total proyek, progress, dll)
- Project list dengan status tracking
- Quick actions sidebar
- Account menu
- Support section

### ✅ Portfolio Page
- Filter by category
- Portfolio grid dengan hover effects
- Project details dengan testimonials
- CTA section

### ✅ About Page (Tentang)
- Company story
- Team members
- Achievements stats
- Company values
- Why choose us section

### ✅ Database Schema
- User management
- Service packages
- Project tracking
- Portfolio showcase
- Testimonials
- Blog posts
- Inquiries
- Payments

### ✅ UI/UX Design
- Glassmorphism dark theme
- Mobile-first responsive
- Smooth animations dengan Framer Motion
- Custom scrollbar
- Hover effects
- Loading states

## 🎨 Design System

### Color Scheme
- **Primary**: Blue (#3b82f6) to Purple (#8b5cf6) gradient
- **Background**: Dark gradient (slate-900 → purple-900 → slate-900)
- **Glass Effect**: `bg-white/5` dengan `backdrop-blur-md`
- **Text**: White primary, gray-300 secondary
- **Borders**: `border-white/10`

### Typography
- **Font**: Geist Sans (primary), Geist Mono (code)
- **Headings**: Bold, white color
- **Body**: Regular, gray-300 color
- **Links**: Blue-400 dengan hover effects

## 📞 WhatsApp Integration

Semua CTA button sudah terintegrasi dengan WhatsApp:
- Format: `https://wa.me/6281234567890?text=encoded_message`
- Pre-filled messages sesuai konteks
- Nomor WhatsApp bisa diubah di environment variables

## 🔧 Customization

### Mengubah Konten
- **Paket Harga**: Edit array `packages` di `src/app/page.tsx`
- **Portfolio**: Edit array `portfolioItems` di `src/app/portfolio/page.tsx`
- **Testimonials**: Edit array `testimonials` di `src/app/page.tsx`
- **Team**: Edit array `teamMembers` di `src/app/tentang/page.tsx`

### Mengubah Styling
- **Colors**: Edit di `src/app/globals.css`
- **Components**: Setiap page memiliki styling inline dengan Tailwind
- **Animations**: Menggunakan Framer Motion untuk smooth transitions

## 🚀 Production Deployment

### Build Project
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy ke Vercel
1. Push ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy!

## 📊 Performance Tips

- Semua images sudah optimized dengan Next.js Image
- Lazy loading untuk components
- Glassmorphism effects menggunakan CSS backdrop-filter
- Minimal JavaScript bundle dengan tree shaking
- SEO optimized dengan proper meta tags

## 🐛 Troubleshooting

### Error: Clerk keys not found
- Pastikan `.env.local` sudah dibuat
- Check API keys dari Clerk dashboard
- Restart development server

### Error: Database connection
- Pastikan PostgreSQL running
- Check DATABASE_URL format
- Run `npx prisma db push` lagi

### Error: Module not found
- Run `npm install` lagi
- Clear node_modules dan reinstall
- Check import paths

## 📈 Next Steps

Fitur yang bisa ditambahkan:
- [ ] Blog system dengan CMS
- [ ] Payment integration (Midtrans)
- [ ] Admin panel untuk manage projects
- [ ] Email notifications
- [ ] File upload untuk project assets
- [ ] Real-time chat system
- [ ] Analytics dashboard
- [ ] Multi-language support

## 💡 Tips Development

1. **Hot Reload**: Perubahan akan otomatis reload
2. **Database Changes**: Setelah edit schema, run `npx prisma db push`
3. **Styling**: Gunakan Tailwind classes untuk consistency
4. **Components**: Buat reusable components di folder `components/`
5. **API Routes**: Tambahkan di folder `app/api/` untuk backend logic

---

**Happy Coding! 🚀**