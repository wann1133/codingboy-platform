'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Eye, Search, Tag } from 'lucide-react';

import PrimaryNav from '@/components/PrimaryNav';
import { useLanguage } from '@/components/LanguageContext';
import { defaultBlogEntries } from '@/lib/default-content';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.6 } },
} as const;

const defaultCategories = [
  'Semua',
  'Tutorial Web',
  'Digital Marketing',
  'Bisnis Online',
  'Tren Design',
  'Studi Kasus',
] as const;

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  tags: string[];
  image: string | null;
  featured: boolean;
  views: number;
  publishedAt: string | null;
  readTime: string | null;
};

const normalizePost = (raw: unknown): BlogPost => {
  const post = typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {};

  const title = typeof post.title === 'string' ? post.title : 'Untitled';
  const slug = typeof post.slug === 'string' ? post.slug : crypto.randomUUID();
  const excerpt = typeof post.excerpt === 'string' ? post.excerpt : null;
  const content = typeof post.content === 'string' ? post.content : '';
  const category = typeof post.category === 'string' ? post.category : 'Lainnya';
  const image = typeof post.image === 'string' ? post.image : null;
  const tags = Array.isArray(post.tags) ? (post.tags as string[]) : [];
  const featured = typeof post.featured === 'boolean' ? post.featured : Boolean(post.featured);
  const views =
    typeof post.views === 'number'
      ? post.views
      : Number.parseInt(typeof post.views === 'string' ? post.views : '0', 10) || 0;
  const publishedAt = typeof post.publishedAt === 'string' ? post.publishedAt : null;
  const readTime = typeof post.readTime === 'string' ? post.readTime : null;

  return {
    id: typeof post.id === 'string' ? post.id : crypto.randomUUID(),
    title,
    slug,
    excerpt,
    content,
    category,
    tags,
    image,
    featured,
    views,
    publishedAt,
    readTime,
  };
};

const fallbackBlogPosts: BlogPost[] = defaultBlogEntries.map((entry, index) => ({
  id: `fallback-${index}`,
  title: entry.title,
  slug: entry.slug,
  excerpt: entry.excerpt,
  content: entry.content,
  category: entry.category,
  tags: entry.tags,
  image: entry.image ?? null,
  featured: entry.featured,
  views: entry.views,
  publishedAt: entry.publishedAt.toISOString().slice(0, 10),
  readTime: entry.readTime,
}));

const formatDate = (value: string | null) => {
  if (!value) {
    return 'Belum dijadwalkan';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return 'Belum dijadwalkan';
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
};

export default function Blog() {
  const { lang } = useLanguage();
  const navCopy = {
    id: {
      tentang: 'Tentang',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Kontak',
    },
    en: {
      tentang: 'About',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact',
    },
  } as const;
  const navLabels = navCopy[(lang as 'id' | 'en') || 'id'];

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([...defaultCategories]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/blogs', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Gagal memuat artikel blog.');
        }

        const data = await response.json();
        if (!isMounted) return;

        const normalized = Array.isArray(data.posts)
          ? data.posts.map(normalizePost).filter((post) => post.slug)
          : [];

        const hydratedPosts = normalized.length > 0 ? normalized : fallbackBlogPosts;

        setPosts(hydratedPosts);

        const dynamicCategories = Array.from(
          new Set(hydratedPosts.map((post) => post.category).filter(Boolean)),
        );

        setCategories(['Semua', ...dynamicCategories.filter((cat) => cat !== 'Semua')]);
      } catch (err) {
        if (!isMounted) return;
        setPosts(fallbackBlogPosts);
        const dynamicCategories = Array.from(
          new Set(fallbackBlogPosts.map((post) => post.category).filter(Boolean)),
        );
        setCategories(['Semua', ...dynamicCategories.filter((cat) => cat !== 'Semua')]);
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat artikel.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredPosts = useMemo(
    () => posts.filter((post) => post.featured).slice(0, 3),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'Semua' || post.category === activeCategory;
      if (!matchesCategory) {
        return false;
      }

      if (!term) {
        return true;
      }

      const excerpt = post.excerpt ?? '';

      return (
        post.title.toLowerCase().includes(term) ||
        excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    });
  }, [activeCategory, posts, searchTerm]);

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
            {isLoading ? 'Memuat artikel...' : `${posts.length} artikel tersedia`}
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
          {error && !isLoading && (
            <p className="mt-4 text-center text-sm text-red-300">{error}</p>
          )}
        </motion.section>

        {(featuredPosts.length > 0 || isLoading) && (
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
                    <span className="relative text-4xl font-semibold text-white/70">
                      {(post.image ?? post.title.slice(0, 3)).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#273149] bg-[#0b1324]/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#8b5cf6]">
                      <Tag className="h-3.5 w-3.5" />
                      {post.category}
                    </span>
                    <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-[#8b5cf6]">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-300 line-clamp-3">{post.excerpt ?? 'Belum ada ringkasan.'}</p>
                    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-slate-500">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>{post.readTime ?? '—'}</span>
                    </div>
                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b5cf6] transition-transform hover:translate-x-1">
                      Baca selengkapnya
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.article>
              ))}

              {!featuredPosts.length && !isLoading && (
                <div className="col-span-1 flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#1f2b42] bg-[#080f1f]/60 p-10 text-center text-sm text-slate-400 lg:col-span-3">
                  Belum ada artikel highlight yang dipublikasikan.
                </div>
              )}

              {isLoading && (
                <div className="col-span-1 flex flex-col items-center justify-center rounded-3xl border border-[#1f2b42] bg-[#080f1f]/60 p-10 text-center text-sm text-slate-400 lg:col-span-3">
                  Memuat artikel unggulan...
                </div>
              )}
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
            <span className="text-sm text-slate-500">
              {isLoading ? 'Memuat artikel...' : `${filteredPosts.length} artikel ditemukan`}
            </span>
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
                  <span className="relative text-3xl font-semibold text-white/70">
                    {(post.image ?? post.title.slice(0, 2)).toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.views.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-white transition-colors group-hover:text-[#8b5cf6]">
                    {post.title}
                  </h4>
                  <p className="text-sm text-slate-300 line-clamp-2">{post.excerpt ?? 'Belum ada ringkasan artikel.'}</p>
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-[#8b5cf6] transition-transform hover:translate-x-1">
                    Baca Artikel
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}

            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-dashed border-[#1f2b42] bg-[#080f1f]/40 p-6 text-sm text-slate-500"
                >
                  Memuat artikel...
                </div>
              ))}
          </div>

          {filteredPosts.length === 0 && !isLoading && (
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
