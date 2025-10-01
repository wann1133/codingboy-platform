import { PrismaClient } from '@prisma/client';

import { blogSeedPayload, portfolioSeedPayload } from '../src/lib/default-content';

const prisma = new PrismaClient();

async function seedServices() {
  const serviceData = [
    {
      name: 'Paket Starter',
      slug: 'paket-starter',
      description: 'Landing Page Profesional untuk bisnis kecil',
      price: 1_500_000,
      duration: '3-5 hari',
      features: JSON.stringify([
        'Landing Page Profesional',
        'Mobile Responsive',
        'Domain + Hosting 1 tahun',
        'WhatsApp Integration',
        'Basic SEO Setup',
        '1x Revisi Desain',
      ]),
      popular: false,
      active: true,
    },
    {
      name: 'Paket Business',
      slug: 'paket-business',
      description: 'Company Profile Lengkap untuk bisnis menengah',
      price: 3_500_000,
      duration: '5-7 hari',
      features: JSON.stringify([
        'Company Profile Lengkap',
        '5-7 Halaman',
        'Content Management System',
        'Gallery/Portfolio',
        'Contact Forms',
        'Social Media Integration',
        '2x Revisi Desain',
      ]),
      popular: true,
      active: true,
    },
    {
      name: 'Paket Enterprise',
      slug: 'paket-enterprise',
      description: 'E-commerce Ready untuk bisnis besar',
      price: 6_500_000,
      duration: '7-14 hari',
      features: JSON.stringify([
        'E-commerce Ready',
        '10+ Halaman Custom',
        'Admin Dashboard',
        'Payment Gateway Integration',
        'Advanced SEO',
        'Blog System',
        '3x Revisi Desain',
      ]),
      popular: false,
      active: true,
    },
  ];

  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({ data: serviceData });
    console.log('  • Services added');
  } else {
    console.log('  • Services already exist, skipping');
  }
}

async function seedPortfolios() {
  await Promise.all(
    portfolioSeedPayload.map((entry) =>
      prisma.portfolio.upsert({
        where: { slug: entry.slug },
        update: {
          description: entry.description,
          category: entry.category,
          image: entry.image ?? null,
          url: entry.url ?? null,
          features: entry.features,
          duration: entry.duration,
          client: entry.client ?? null,
          testimonial: entry.testimonial ?? null,
          rating: entry.rating ?? 5,
          status: entry.status,
          featured: entry.featured,
          active: entry.active ?? true,
        },
        create: entry,
      }),
    ),
  );
  console.log('  • Portfolio items ensured');
}

async function seedTestimonials() {
  const testimonialData = [
    {
      name: 'Budi Santoso',
      company: 'Warung Makan Sederhana',
      rating: 5,
      text: 'Website dari CodingBoy sangat membantu bisnis saya. Pesanan online meningkat 300% dalam 2 bulan!',
      avatar: 'BS',
      featured: true,
      active: true,
    },
    {
      name: 'Sari Dewi',
      company: 'Boutique Fashion',
      rating: 5,
      text: 'Desainnya modern dan profesional. Customer jadi lebih percaya dengan brand saya.',
      avatar: 'SD',
      featured: true,
      active: true,
    },
    {
      name: 'Ahmad Rahman',
      company: 'Jasa Konsultan',
      rating: 5,
      text: 'Pelayanan cepat, hasil memuaskan. Highly recommended untuk UKM seperti saya!',
      avatar: 'AR',
      featured: true,
      active: true,
    },
    {
      name: 'Maya Putri',
      company: 'Toko Online Fashion',
      rating: 5,
      text: 'Tim CodingBoy sangat profesional dan responsif. Website e-commerce kami jadi lebih user-friendly!',
      avatar: 'MP',
      featured: false,
      active: true,
    },
    {
      name: 'Andi Wijaya',
      company: 'Klinik Kesehatan',
      rating: 5,
      text: 'Sistem booking online memudahkan pasien untuk membuat janji. Terima kasih CodingBoy!',
      avatar: 'AW',
      featured: false,
      active: true,
    },
  ];

  await Promise.all(
    testimonialData.map((testimonial) =>
      prisma.testimonial.upsert({
        where: { name: testimonial.name },
        update: testimonial,
        create: testimonial,
      }),
    ),
  );
  console.log('  • Testimonials ensured');
}

async function seedBlogs() {
  await Promise.all(
    blogSeedPayload.map((entry) =>
      prisma.blogPost.upsert({
        where: { slug: entry.slug },
        update: {
          title: entry.title,
          excerpt: entry.excerpt,
          content: entry.content,
          category: entry.category,
          image: entry.image ?? null,
          tags: entry.tags,
          readTime: entry.readTime,
          published: true,
          featured: entry.featured,
          views: entry.views,
          publishedAt: entry.publishedAt,
        },
        create: entry,
      }),
    ),
  );
  console.log('  • Blog posts ensured');
}

async function main() {
  console.log('🌱 Seeding database...');
  await seedServices();
  await seedPortfolios();
  await seedTestimonials();
  await seedBlogs();
  console.log('✅ Seeding completed');
}

main()
  .catch((error) => {
    console.error('❌ Seeding failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
