import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { blogSeedPayload, portfolioSeedPayload } from '@/lib/default-content';
import { prepareTagsForPersist } from '@/lib/blog-tags';
import { prepareFeaturesForPersist } from '@/lib/portfolio-features';

const prisma = new PrismaClient();

// 🧩 1. Seed Admin User
async function seedAdmin() {
  const adminEmail = 'admin@codingboy.com';
  const adminPassword = 'maman123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('  • Admin user already exists, skipping');
    return;
  }

  await prisma.user.create({
    data: {
      clerkId: 'seeded-admin',
      email: adminEmail,
      firstName: 'Admin',
      lastName: 'CodingBoy',
      phone: '08123456789',
      password: hashedPassword,
    },
  });

  console.log(`  ✅ Admin user created (${adminEmail} / ${adminPassword})`);
}

// 🧩 2. Seed Services
async function seedServices() {
  const serviceData = [
    {
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
        '1x Revisi Desain',
      ]),
      popular: false,
      active: true,
    },
    {
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
        '2x Revisi Desain',
      ]),
      popular: true,
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

// 🧩 3. Seed Portfolio
async function seedPortfolios() {
  await Promise.all(
    portfolioSeedPayload.map((entry) => {
      const { status: seedStatus, features: seedFeatures, ...rest } = entry;
      const { features } = prepareFeaturesForPersist(seedFeatures, entry.slug, seedStatus);
      const createPayload = { ...rest, features };

      return prisma.portfolio.upsert({
        where: { slug: entry.slug },
        update: {
          title: entry.title,
          description: entry.description,
          category: entry.category,
          image: entry.image ?? null,
          url: entry.url ?? null,
          features,
          duration: entry.duration,
          client: entry.client ?? null,
          testimonial: entry.testimonial ?? null,
          rating: entry.rating ?? 5,
          featured: entry.featured,
          active: entry.active ?? true,
        },
        create: createPayload,
      });
    }),
  );
  console.log('  • Portfolios ensured');
}

// 🧩 4. Seed Testimonials
async function seedTestimonials() {
  const testimonialData = [
    {
      id: 'testimonial-budi-santoso',
      name: 'Budi Santoso',
      company: 'Warung Makan Sederhana',
      rating: 5,
      text: 'Website dari CodingBoy sangat membantu bisnis saya. Pesanan online meningkat 300% dalam 2 bulan!',
      avatar: 'BS',
      featured: true,
      active: true,
    },
  ];

  await Promise.all(
    testimonialData.map((testimonial) =>
      prisma.testimonial.upsert({
        where: { id: testimonial.id },
        update: testimonial,
        create: testimonial,
      }),
    ),
  );
  console.log('  • Testimonials ensured');
}

// 🧩 5. Seed Blogs
async function seedBlogs() {
  await Promise.all(
    blogSeedPayload.map((entry) => {
      const { readTime: seedReadTime, tags: seedTags, ...rest } = entry;
      const { tags } = prepareTagsForPersist(seedTags, entry.slug, seedReadTime, entry.content);
      const createPayload = {
        ...rest,
        tags,
        published: true,
        featured: entry.featured,
        views: entry.views,
        publishedAt: entry.publishedAt,
      };

      return prisma.blogPost.upsert({
        where: { slug: entry.slug },
        update: {
          title: entry.title,
          excerpt: entry.excerpt,
          content: entry.content,
          category: entry.category,
          image: entry.image ?? null,
          tags,
          published: true,
          featured: entry.featured,
          views: entry.views,
          publishedAt: entry.publishedAt,
        },
        create: createPayload,
      });
    }),
  );
  console.log('  • Blog posts ensured');
}

// MAIN EXECUTION
async function main() {
  console.log('🌱 Seeding database...');
  await seedAdmin();
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
