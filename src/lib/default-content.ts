export type DefaultBlogEntry = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: Date;
  featured: boolean;
  views: number;
  image?: string | null;
};

export type DefaultPortfolioEntry = {
  title: string;
  slug: string;
  description: string;
  category: string;
  image?: string | null;
  url?: string | null;
  features: string[];
  duration: string;
  client?: string | null;
  testimonial?: string | null;
  rating?: number | null;
  status: 'ongoing' | 'completed';
  featured: boolean;
  active?: boolean;
};

export const defaultBlogEntries: DefaultBlogEntry[] = [
  {
    title: 'Cara Memilih Jasa Pembuatan Website Terpercaya',
    slug: 'cara-memilih-jasa-pembuatan-website-terpercaya',
    excerpt:
      'Tips memilih jasa pembuatan website yang tepat untuk bisnis Anda. Pelajari kriteria penting yang harus diperhatikan.',
    content:
      'Memilih jasa pembuatan website yang tepat adalah keputusan penting untuk bisnis Anda. Artikel ini membahas pengalaman vendor, proses produksi, estimasi biaya, hingga dukungan purna jual.',
    category: 'Digital Marketing',
    tags: ['website', 'bisnis', 'tips', 'pemilihan'],
    readTime: '5 menit',
    publishedAt: new Date('2024-01-15T00:00:00.000Z'),
    featured: true,
    views: 1250,
  },
  {
    title: 'Website vs Media Sosial: Mana yang Lebih Penting?',
    slug: 'website-vs-media-sosial',
    excerpt:
      'Perbandingan strategi antara website dan media sosial untuk keberhasilan digital marketing jangka panjang.',
    content:
      'Website dan media sosial memiliki peran berbeda dalam funnel marketing. Kami mengurai cara memaksimalkan keduanya agar saling melengkapi dan menaikkan conversion rate bisnis.',
    category: 'Digital Marketing',
    tags: ['digital marketing', 'strategy', 'website', 'social media'],
    readTime: '7 menit',
    publishedAt: new Date('2024-01-10T00:00:00.000Z'),
    featured: true,
    views: 980,
  },
  {
    title: 'Checklist Landing Page UMKM 2024',
    slug: 'checklist-landing-page-umkm-2024',
    excerpt:
      'Checklist praktis agar landing page penjualan Anda siap scale campaign digital dan memaksimalkan leads.',
    content:
      'Mulai dari headline, copywriting, CTA, hingga trust element. Ikuti checklist ini agar landing page UMKM Anda siap menghadapi traffic besar.',
    category: 'Bisnis Online',
    tags: ['landing page', 'umkm', 'conversion'],
    readTime: '6 menit',
    publishedAt: new Date('2024-01-05T00:00:00.000Z'),
    featured: false,
    views: 640,
  },
];

export const defaultPortfolioEntries: DefaultPortfolioEntry[] = [
  {
    title: 'Warung Makan Sederhana',
    slug: 'warung-makan-sederhana',
    description:
      'Website company profile dengan sistem pemesanan online untuk warung makan tradisional.',
    category: 'F&B',
    image: null,
    url: 'https://codingboy.id/portfolio/warung-makan-sederhana',
    features: ['Responsive Design', 'Online Ordering', 'WhatsApp Integration', 'SEO Optimized'],
    duration: '5 hari',
    client: 'Budi Santoso',
    testimonial: 'Pesanan online meningkat 300% dalam 2 bulan! Puas banget dengan hasilnya.',
    rating: 5,
    status: 'completed',
    featured: true,
    active: true,
  },
  {
    title: 'Boutique Fashion Store',
    slug: 'boutique-fashion-store',
    description: 'E-commerce website untuk toko fashion dengan katalog produk dan sistem pembayaran.',
    category: 'Fashion',
    image: null,
    url: 'https://codingboy.id/portfolio/boutique-fashion-store',
    features: ['Product Catalog', 'Payment Gateway', 'Inventory Management', 'Mobile Ready'],
    duration: '7 hari',
    client: 'Sari Dewi',
    testimonial: 'Desainnya modern dan profesional. Customer jadi lebih percaya beli di toko kami.',
    rating: 5,
    status: 'completed',
    featured: true,
    active: true,
  },
  {
    title: 'Konsultan Bisnis Pro',
    slug: 'konsultan-bisnis-pro',
    description: 'Landing page profesional untuk jasa konsultasi bisnis lengkap dengan booking system.',
    category: 'Jasa',
    image: null,
    url: 'https://codingboy.id/portfolio/konsultan-bisnis-pro',
    features: ['Booking System', 'Client Portal', 'Blog Integration', 'Lead Generation'],
    duration: '3 hari',
    client: 'Ahmad Rahman',
    testimonial: 'Pelayanan cepat dan hasilnya sangat membantu closing klien baru.',
    rating: 5,
    status: 'ongoing',
    featured: false,
    active: true,
  },
];

export const blogSeedPayload = defaultBlogEntries.map((entry) => ({
  title: entry.title,
  slug: entry.slug,
  excerpt: entry.excerpt,
  content: entry.content,
  image: entry.image ?? null,
  category: entry.category,
  tags: entry.tags,
  readTime: entry.readTime,
  published: true,
  featured: entry.featured,
  views: entry.views,
  publishedAt: entry.publishedAt,
}));

export const portfolioSeedPayload = defaultPortfolioEntries.map((entry) => ({
  title: entry.title,
  slug: entry.slug,
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
}));


