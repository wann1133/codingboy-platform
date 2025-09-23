'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Eye, Search, Tag } from 'lucide-react';

import PrimaryNav from '@/components/PrimaryNav';

const navLabels = {
  tentang: 'Tentang',
  portfolio: 'Portfolio',
  blog: 'Blog',
  contact: 'Kontak',
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.6 } },
} as const;

const categories = ['Semua', 'Tutorial Web', 'Digital Marketing', 'Bisnis Online', 'Tren Design', 'Studi Kasus'] as const;

type Category = (typeof categories)[number];

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Exclude<Category, 'Semua'>;
  tags: string[];
  image: string;
  published: boolean;
  featured: boolean;
  views: number;
  publishedAt: string;
  readTime: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Cara Memilih Jasa Pembuatan Website Terpercaya',
    slug: 'cara-memilih-jasa-pembuatan-website-terpercaya',
    excerpt: 'Tips memilih jasa pembuatan website yang tepat untuk bisnis Anda. Pelajari kriteria penting yang harus diperhatikan.',
    content: 'Memilih jasa pembuatan website yang tepat adalah keputusan penting untuk bisnis Anda...',
    category: 'Tutorial Web',
    tags: ['website', 'bisnis', 'tips', 'pemilihan'],
    image: 'ART01',
    published: true,
    featured: true,
    views: 1250,
    publishedAt: '2024-01-15',
    readTime: '5 menit',
  },
  {
    id: 2,
    title: 'Website vs Media Sosial: Mana yang Lebih Penting untuk Bisnis?',
    slug: 'website-vs-media-sosial-mana-yang-lebih-penting',
    excerpt: 'Perbandingan antara website dan media sosial untuk strategi digital marketing yang efektif.',
    content: 'Dalam era digital ini, banyak bisnis yang bingung memilih antara website atau media sosial...',
    category: 'Digital Marketing',
    tags: ['website', 'social media', 'digital marketing', 'strategi'],
    image: 'ART02',
    published: true,
    featured: true,
    views: 980,
    publishedAt: '2024-01-12',
    readTime: '7 menit',
  },
  {
    id: 3,
    title: 'Berapa Biaya Pembuatan Website untuk UMKM?',
    slug: 'berapa-biaya-pembuatan-website-untuk-umkm',
    excerpt: 'Panduan lengkap estimasi biaya pembuatan website untuk UMKM dengan berbagai pilihan paket.',
    content: 'Salah satu pertanyaan yang paling sering ditanyakan oleh pemilik UMKM adalah berapa biaya...',
    category: 'Bisnis Online',
    tags: ['biaya', 'UMKM', 'website', 'budget'],
    image: 'ART03',
    published: true,
    featured: false,
    views: 1500,
    publishedAt: '2024-01-10',
    readTime: '6 menit',
  },
  {
    id: 4,
    title: '10 Tren Design Website 2024 yang Wajib Anda Ketahui',
    slug: '10-tren-design-website-2024',
    excerpt: 'Tren design website terbaru yang akan mendominasi tahun 2024. Dari glassmorphism hingga dark mode.',
    content: 'Design website terus berkembang setiap tahunnya. Berikut adalah 10 tren design yang akan populer...',
    category: 'Tren Design',
    tags: ['design', 'tren', '2024', 'UI/UX'],
    image: 'ART04',
    published: true,
    featured: true,
    views: 850,
    publishedAt: '2024-01-08',
    readTime: '8 menit',
  },
  {
    id: 5,
    title: 'Studi Kasus: Bagaimana Website Meningkatkan Penjualan Toko Online 400%',
    slug: 'studi-kasus-website-meningkatkan-penjualan-400-persen',
    excerpt: 'Kisah nyata bagaimana redesign website membantu klien kami meningkatkan penjualan hingga 400%.',
    content: 'Klien kami, sebuah toko fashion online, mengalami peningkatan penjualan yang luar biasa...',
    category: 'Studi Kasus',
    tags: ['studi kasus', 'e-commerce', 'penjualan', 'success story'],
    image: 'ART05',
    published: true,
    featured: false,
    views: 1100,
    publishedAt: '2024-01-05',
    readTime: '10 menit',
  },
  {
    id: 6,
    title: 'SEO untuk Website Bisnis: Panduan Lengkap untuk Pemula',
    slug: 'seo-untuk-website-bisnis-panduan-lengkap',
    excerpt: 'Pelajari dasar-dasar SEO untuk meningkatkan ranking website bisnis Anda di Google.',
    content: 'SEO (Search Engine Optimization) adalah kunci untuk membuat website Anda ditemukan...',
    category: 'Digital Marketing',
    tags: ['SEO', 'Google', 'ranking', 'traffic'],
    image: 'ART06',
    published: true,
    featured: false,
    views: 750,
    publishedAt: '2024-01-03',
    readTime: '12 menit',
  },
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('Semua');

  const featuredPosts = useMemo(() => blogPosts.filter((post) => post.featured && post.published), []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (!post.published) return false;
      const matchesCategory = activeCategory === 'Semua' || post.category === activeCategory;
      const term = searchTerm.trim().toLowerCase();
      if (!term) return matchesCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070d] text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-36 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#6d6bff]/15 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[460px] w-[460px] rounded-full bg-[#a855f7]/10 blur-[220px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] translate-x-1/4 translate-y-1/4 rounded-full bg-[#38bdf8]/10 blur-[200px]" />
      </div>

      <PrimaryNav labels={navLabels} />

      <main className="pt-28 pb-24">
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="relative mx-auto mb-16 max-w-5xl overflow-hidden rounded-3xl border border-[#1b253a] bg-gradient-to-br from-[#0f172a]/85 to-[#050a18]/90 p-12 text-center shadow-[0_32px_90px_rgba(5,10,25,0.55)]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-32 w-[120%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#6d6bff]/20 to-transparent blur-2xl" />
            <div className="absolute bottom-0 right-1/3 h-24 w-24 rounded-full bg-[#a855f7]/25 blur-3xl" />
          </div>
          <span className="relative inline-flex items-center justify-center rounded-full border border-[#273149] bg-[#080f1f]/80 px-5 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[#8b5cf6]">
            Insight & Resources
          </span>
          <h1 className="relative mt-6 text-4xl font-bold text-white md:text-5xl">
            Ilmu digital marketing & website untuk bantu bisnis tumbuh
          </h1>
          <p className="relative mt-4 text-lg text-slate-300 md:text-xl">
            Artikel, studi kasus, dan strategi praktis dari tim CodingBoy untuk bantu kamu ambil keputusan digital dengan percaya diri.
          </p>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto mb-12 flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex w-full items-center gap-3 rounded-2xl border border-[#273149] bg-[#0b1324]/70 px-5 py-3">
            <Search className="h-4 w-4 text-[#8b5cf6]" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Cari artikel, topik, atau kata kunci..."
              className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
            />
          </div>
          <div className="text-sm text-slate-400">
            {filteredPosts.length} artikel tersedia
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto mb-12 max-w-5xl"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'border-[#6d6bff] bg-gradient-to-r from-[#6d6bff] to-[#a855f7] text-white shadow-[0_18px_45px_rgba(104,97,255,0.45)]'
                    : 'border-[#273149] bg-[#0b1324]/70 text-slate-300 hover:border-[#6d6bff] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.section>

        {featuredPosts.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
            className="mx-auto mb-16 max-w-6xl"
          >
            <div className="mb-6 flex flex-col gap-2 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b5cf6]">Featured insight</span>
              <h2 className="text-2xl font-semibold text-white">Pilihan editor minggu ini</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#1f2b42] bg-[#080f1f]/80 shadow-[0_22px_60px_rgba(5,10,25,0.45)] transition-all hover:border-[#6d6bff]"
                >
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6d6bff]/15 via-transparent to-[#a855f7]/20" />
                    <span className="relative text-4xl font-semibold text-white/70">{post.image}</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#273149] bg-[#0b1324]/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#8b5cf6]">
                      <Tag className="h-3.5 w-3.5" />
                      {post.category}
                    </span>
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#8b5cf6] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-300 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-slate-500">
                      <span>{post.publishedAt}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b5cf6] transition-transform hover:translate-x-1">
                      Baca selengkapnya
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-white">Semua artikel</h3>
              <p className="text-sm text-slate-400">Kurasi mingguan tentang strategi web, growth, dan praktik terbaik digital.</p>
            </div>
            <span className="text-sm text-slate-500">{filteredPosts.length} artikel ditemukan</span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.06, duration: 0.55, ease: 'easeOut' }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#1f2b42] bg-[#080f1f]/75 shadow-[0_18px_45px_rgba(5,10,25,0.4)] transition-all hover:border-[#6d6bff]"
              >
                <div className="relative flex aspect-video items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1f2b42]/40 via-transparent to-[#6d6bff]/25" />
                  <span className="relative text-3xl font-semibold text-white/70">{post.image}</span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.views}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-white transition-colors group-hover:text-[#8b5cf6]">
                    {post.title}
                  </h4>
                  <p className="text-sm text-slate-300 line-clamp-2">{post.excerpt}</p>
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-[#8b5cf6] transition-transform hover:translate-x-1">
                    Baca Artikel
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="mt-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-[#273149] text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">
                No
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">Artikel tidak ditemukan</h3>
              <p className="mt-3 text-sm text-slate-400">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('Semua');
                }}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d6bff] to-[#a855f7] px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_18px_45px_rgba(104,97,255,0.45)]"
              >
                Reset filter
              </button>
            </div>
          )}
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mx-auto mt-20 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#1b253a] bg-gradient-to-br from-[#0f172a]/85 to-[#050a18]/90 p-12 text-center shadow-[0_32px_90px_rgba(5,10,25,0.55)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-32 w-[120%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#6d6bff]/15 to-transparent blur-2xl" />
              <div className="absolute bottom-0 right-1/3 h-24 w-24 rounded-full bg-[#38bdf8]/20 blur-3xl" />
            </div>
            <h2 className="relative text-3xl font-semibold text-white md:text-4xl">Dapatkan insight terbaru langsung ke inbox</h2>
            <p className="relative mt-4 text-lg text-slate-300">
              Subscribe newsletter kami untuk mendapatkan tips, tutorial, dan update tren seputar website & digital marketing.
            </p>
            <div className="relative mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="w-full rounded-full border border-[#273149] bg-[#0b1324]/70 px-5 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-[#6d6bff] focus:outline-none focus:ring-2 focus:ring-[#6d6bff]/40 sm:w-72"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d6bff] to-[#a855f7] px-7 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_18px_45px_rgba(104,97,255,0.45)]">
                Subscribe
              </button>
            </div>
            <p className="relative mt-4 text-xs uppercase tracking-[0.28em] text-slate-500">Gratis dan bisa unsubscribe kapan saja</p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
