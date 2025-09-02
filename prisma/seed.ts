import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Services
  const starterService = await prisma.service.create({
    data: {
      name: 'Paket Starter',
      slug: 'paket-starter',
      description: 'Landing Page Profesional untuk bisnis kecil',
      price: 1500000,
      duration: '3-5 hari',
      features: JSON.stringify([
        'Landing Page Profesional',
        'Mobile Responsive',
        'Domain + Hosting 1 tahun',
        'WhatsApp Integration',
        'Basic SEO Setup',
        '1x Revisi Desain'
      ]),
      popular: false,
      active: true
    }
  })

  const businessService = await prisma.service.create({
    data: {
      name: 'Paket Business',
      slug: 'paket-business',
      description: 'Company Profile Lengkap untuk bisnis menengah',
      price: 3500000,
      duration: '5-7 hari',
      features: JSON.stringify([
        'Company Profile Lengkap',
        '5-7 Halaman',
        'Content Management System',
        'Gallery/Portfolio',
        'Contact Forms',
        'Social Media Integration',
        '2x Revisi Desain'
      ]),
      popular: true,
      active: true
    }
  })

  const enterpriseService = await prisma.service.create({
    data: {
      name: 'Paket Enterprise',
      slug: 'paket-enterprise',
      description: 'E-commerce Ready untuk bisnis besar',
      price: 6500000,
      duration: '7-14 hari',
      features: JSON.stringify([
        'E-commerce Ready',
        '10+ Halaman Custom',
        'Admin Dashboard',
        'Payment Gateway Integration',
        'Advanced SEO',
        'Blog System',
        '3x Revisi Desain'
      ]),
      popular: false,
      active: true
    }
  })

  // Create Portfolio Items
  await prisma.portfolio.createMany({
    data: [
      {
        title: 'Warung Makan Sederhana',
        slug: 'warung-makan-sederhana',
        description: 'Website company profile dengan sistem pemesanan online untuk warung makan tradisional',
        category: 'F&B',
        features: JSON.stringify(['Responsive Design', 'Online Ordering', 'WhatsApp Integration', 'SEO Optimized']),
        duration: '5 hari',
        client: 'Budi Santoso',
        testimonial: 'Pesanan online meningkat 300% dalam 2 bulan!',
        rating: 5,
        featured: true,
        active: true
      },
      {
        title: 'Boutique Fashion Store',
        slug: 'boutique-fashion-store',
        description: 'E-commerce website untuk toko fashion dengan katalog produk dan sistem pembayaran',
        category: 'Fashion',
        features: JSON.stringify(['Product Catalog', 'Payment Gateway', 'Inventory Management', 'Mobile App']),
        duration: '7 hari',
        client: 'Sari Dewi',
        testimonial: 'Desainnya modern dan profesional. Customer jadi lebih percaya!',
        rating: 5,
        featured: true,
        active: true
      },
      {
        title: 'Konsultan Bisnis Pro',
        slug: 'konsultan-bisnis-pro',
        description: 'Landing page profesional untuk jasa konsultasi bisnis dengan booking system',
        category: 'Jasa',
        features: JSON.stringify(['Booking System', 'Client Portal', 'Blog Integration', 'Lead Generation']),
        duration: '3 hari',
        client: 'Ahmad Rahman',
        testimonial: 'Pelayanan cepat, hasil memuaskan. Highly recommended!',
        rating: 5,
        featured: false,
        active: true
      },
      {
        title: 'Toko Online Elektronik',
        slug: 'toko-online-elektronik',
        description: 'Platform e-commerce lengkap dengan fitur marketplace dan multi-vendor',
        category: 'E-commerce',
        features: JSON.stringify(['Multi-vendor', 'Advanced Search', 'Review System', 'Analytics Dashboard']),
        duration: '14 hari',
        client: 'PT. Elektronik Jaya',
        testimonial: 'Platform yang sangat lengkap dan mudah digunakan!',
        rating: 5,
        featured: true,
        active: true
      },
      {
        title: 'Studio Fotografi',
        slug: 'studio-fotografi',
        description: 'Portfolio website untuk studio fotografi dengan galeri interaktif',
        category: 'Creative',
        features: JSON.stringify(['Interactive Gallery', 'Booking Calendar', 'Client Proofing', 'Social Integration']),
        duration: '4 hari',
        client: 'Creative Studio',
        testimonial: 'Website yang sangat memukau dan fungsional!',
        rating: 5,
        featured: false,
        active: true
      },
      {
        title: 'Fitness Center',
        slug: 'fitness-center',
        description: 'Website gym dengan sistem membership dan jadwal kelas online',
        category: 'Health',
        features: JSON.stringify(['Membership System', 'Class Scheduling', 'Trainer Profiles', 'Progress Tracking']),
        duration: '6 hari',
        client: 'FitLife Gym',
        testimonial: 'Member baru bertambah 150% setelah website launch!',
        rating: 5,
        featured: false,
        active: true
      }
    ]
  })

  // Create Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Budi Santoso',
        company: 'Warung Makan Sederhana',
        rating: 5,
        text: 'Website dari CodingBoy sangat membantu bisnis saya. Pesanan online meningkat 300% dalam 2 bulan!',
        avatar: 'BS',
        featured: true,
        active: true
      },
      {
        name: 'Sari Dewi',
        company: 'Boutique Fashion',
        rating: 5,
        text: 'Desainnya modern dan profesional. Customer jadi lebih percaya dengan brand saya.',
        avatar: 'SD',
        featured: true,
        active: true
      },
      {
        name: 'Ahmad Rahman',
        company: 'Jasa Konsultan',
        rating: 5,
        text: 'Pelayanan cepat, hasil memuaskan. Highly recommended untuk UKM seperti saya!',
        avatar: 'AR',
        featured: true,
        active: true
      },
      {
        name: 'Maya Putri',
        company: 'Toko Online Fashion',
        rating: 5,
        text: 'Tim CodingBoy sangat profesional dan responsif. Website e-commerce kami jadi lebih user-friendly!',
        avatar: 'MP',
        featured: false,
        active: true
      },
      {
        name: 'Andi Wijaya',
        company: 'Klinik Kesehatan',
        rating: 5,
        text: 'Sistem booking online memudahkan pasien untuk membuat janji. Terima kasih CodingBoy!',
        avatar: 'AW',
        featured: false,
        active: true
      }
    ]
  })

  // Create Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Cara Memilih Jasa Pembuatan Website Terpercaya',
        slug: 'cara-memilih-jasa-pembuatan-website-terpercaya',
        excerpt: 'Tips memilih jasa pembuatan website yang tepat untuk bisnis Anda',
        content: 'Memilih jasa pembuatan website yang tepat adalah keputusan penting untuk bisnis Anda...',
        category: 'Tutorial Web',
        tags: JSON.stringify(['website', 'bisnis', 'tips', 'pemilihan']),
        published: true,
        featured: true,
        views: 1250,
        publishedAt: new Date('2024-01-01')
      },
      {
        title: 'Website vs Media Sosial: Mana yang Lebih Penting untuk Bisnis?',
        slug: 'website-vs-media-sosial-mana-yang-lebih-penting',
        excerpt: 'Perbandingan antara website dan media sosial untuk strategi digital marketing',
        content: 'Dalam era digital ini, banyak bisnis yang bingung memilih antara website atau media sosial...',
        category: 'Digital Marketing',
        tags: JSON.stringify(['website', 'social media', 'digital marketing', 'strategi']),
        published: true,
        featured: true,
        views: 980,
        publishedAt: new Date('2024-01-05')
      },
      {
        title: 'Berapa Biaya Pembuatan Website untuk UMKM?',
        slug: 'berapa-biaya-pembuatan-website-untuk-umkm',
        excerpt: 'Panduan lengkap estimasi biaya pembuatan website untuk UMKM',
        content: 'Salah satu pertanyaan yang paling sering ditanyakan oleh pemilik UMKM adalah berapa biaya...',
        category: 'Bisnis Online',
        tags: JSON.stringify(['biaya', 'UMKM', 'website', 'budget']),
        published: true,
        featured: false,
        views: 1500,
        publishedAt: new Date('2024-01-10')
      }
    ]
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created:`)
  console.log(`   - 3 Services`)
  console.log(`   - 6 Portfolio items`)
  console.log(`   - 5 Testimonials`)
  console.log(`   - 3 Blog posts`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })