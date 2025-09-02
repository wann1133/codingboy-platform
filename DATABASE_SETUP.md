# 🗄️ Database Setup Guide

## ❌ **Masalah yang Terjadi:**
Error `Environment variable not found: DATABASE_URL` saat menjalankan `npx prisma studio`

## ✅ **Solusi yang Sudah Diterapkan:**

### 1. **Ubah ke SQLite untuk Development**
Saya telah mengubah database dari PostgreSQL ke SQLite untuk memudahkan development:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### 2. **Tambah Scripts Database**
Saya telah menambahkan scripts di `package.json`:

```json
{
  "scripts": {
    "db:generate": "prisma generate",
    "db:push": "prisma db push", 
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "db:reset": "prisma db push --force-reset && npm run db:seed"
  }
}
```

### 3. **Buat Seed Data**
Saya telah membuat file `prisma/seed.ts` dengan data sample:
- 3 Service packages (Starter, Business, Enterprise)
- 6 Portfolio items dari berbagai kategori
- 5 Testimonials dari klien
- 3 Blog posts untuk SEO

## 🚀 **Cara Setup Database:**

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Generate Prisma Client
```bash
npm run db:generate
```

### Step 3: Create Database & Tables
```bash
npm run db:push
```

### Step 4: Seed Database dengan Sample Data
```bash
npm run db:seed
```

### Step 5: Buka Prisma Studio
```bash
npm run db:studio
```

Database akan terbuka di: **http://localhost:5555**

## 📊 **Data yang Akan Dibuat:**

### Services (3 items):
- **Paket Starter** - Rp 1.500.000 (3-5 hari)
- **Paket Business** - Rp 3.500.000 (5-7 hari) ⭐ Popular
- **Paket Enterprise** - Rp 6.500.000 (7-14 hari)

### Portfolio (6 items):
- Warung Makan Sederhana (F&B)
- Boutique Fashion Store (Fashion)
- Konsultan Bisnis Pro (Jasa)
- Toko Online Elektronik (E-commerce)
- Studio Fotografi (Creative)
- Fitness Center (Health)

### Testimonials (5 items):
- Budi Santoso - Warung Makan Sederhana ⭐⭐⭐⭐⭐
- Sari Dewi - Boutique Fashion ⭐⭐⭐⭐⭐
- Ahmad Rahman - Jasa Konsultan ⭐⭐⭐⭐⭐
- Maya Putri - Toko Online Fashion ⭐⭐⭐⭐⭐
- Andi Wijaya - Klinik Kesehatan ⭐⭐⭐⭐⭐

### Blog Posts (3 items):
- "Cara Memilih Jasa Pembuatan Website Terpercaya"
- "Website vs Media Sosial: Mana yang Lebih Penting?"
- "Berapa Biaya Pembuatan Website untuk UMKM?"

## 🔧 **Commands Berguna:**

### Reset Database (Hapus semua data & seed ulang):
```bash
npm run db:reset
```

### Lihat Database di Browser:
```bash
npm run db:studio
```

### Generate Prisma Client setelah ubah schema:
```bash
npm run db:generate
```

### Push schema changes ke database:
```bash
npm run db:push
```

## 📁 **File Database:**
- Database SQLite akan dibuat di: `prisma/dev.db`
- File ini bisa di-commit ke git untuk sharing data development

## 🔄 **Jika Ingin Kembali ke PostgreSQL:**

1. Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Setup PostgreSQL database
3. Update `.env.local`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/codingboy_marketplace"
```

4. Run migration:
```bash
npm run db:push
npm run db:seed
```

## ✅ **Sekarang Prisma Studio Bisa Dijalankan:**

```bash
npm run db:studio
```

Buka: **http://localhost:5555**

Anda akan melihat semua tabel dengan data sample yang sudah diisi! 🎉

## 🎯 **Next Steps:**

1. Jalankan development server: `npm run dev`
2. Buka Prisma Studio: `npm run db:studio`
3. Explore data di browser
4. Mulai development dengan data yang sudah ada

Database setup selesai dan siap digunakan! 🚀