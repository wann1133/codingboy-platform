'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, MessageCircle, Star, Tag } from 'lucide-react';
import Link from 'next/link';

import PrimaryNav from '@/components/PrimaryNav';
import { useLanguage } from '@/components/LanguageContext';
import { defaultPortfolioEntries } from '@/lib/default-content';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.6 } },
} as const;

const defaultCategories = ['Semua', 'F&B', 'Fashion', 'Jasa', 'E-commerce', 'Creative', 'Health'] as const;

type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string | null;
  description: string;
  duration: string;
  features: string[];
  testimonial: string | null;
  client: string | null;
  rating: number | null;
  url: string | null;
  status: 'ongoing' | 'completed';
  featured: boolean;
};

const normalizePortfolio = (raw: unknown): PortfolioItem => {
  const item = typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {};

  const title = typeof item.title === 'string' ? item.title : 'Untitled Project';
  const slug = typeof item.slug === 'string' ? item.slug : crypto.randomUUID();
  const category = typeof item.category === 'string' ? item.category : 'Lainnya';
  const image = typeof item.image === 'string' ? item.image : null;
  const description = typeof item.description === 'string' ? item.description : '';
  const duration = typeof item.duration === 'string' ? item.duration : '7 hari';
  const features = Array.isArray(item.features) ? (item.features as string[]) : [];
  const testimonial = typeof item.testimonial === 'string' ? item.testimonial : null;
  const client = typeof item.client === 'string' ? item.client : null;
  const rating =
    typeof item.rating === 'number'
      ? item.rating
      : Number.parseInt(typeof item.rating === 'string' ? item.rating : '0', 10) || null;
  const url = typeof item.url === 'string' ? item.url : null;
  const status = item.status === 'completed' ? 'completed' : 'ongoing';
  const featured = typeof item.featured === 'boolean' ? item.featured : Boolean(item.featured);

  return {
    id: typeof item.id === 'string' ? item.id : crypto.randomUUID(),
    title,
    slug,
    category,
    image,
    description,
    duration,
    features,
    testimonial,
    client,
    rating,
    url,
    status,
    featured,
  };
};

const fallbackPortfolioItems: PortfolioItem[] = defaultPortfolioEntries.map((entry, index) => ({
  id: `fallback-portfolio-${index}`,
  title: entry.title,
  slug: entry.slug,
  category: entry.category,
  image: entry.image ?? null,
  description: entry.description,
  duration: entry.duration,
  features: entry.features,
  testimonial: entry.testimonial ?? null,
  client: entry.client ?? null,
  rating: entry.rating ?? 5,
  url: entry.url ?? null,
  status: entry.status,
  featured: entry.featured,
}));

export default function Portfolio() {
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

  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([...defaultCategories]);
  const [activeFilter, setActiveFilter] = useState<string>('Semua');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPortfolio = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/portfolios', { cache: 'no-store' });
        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error ?? 'Gagal memuat data portofolio.');
        }

        const data = await response.json();
        if (!isMounted) return;

        const normalized = Array.isArray(data.portfolios)
          ? data.portfolios.map(normalizePortfolio).filter((item) => item.slug)
          : [];

        const hydratedItems = normalized.length > 0 ? normalized : fallbackPortfolioItems;

        setItems(hydratedItems);

        const dynamicCategories = Array.from(
          new Set(hydratedItems.map((item) => item.category).filter(Boolean)),
        );
        setCategoryFilters(['Semua', ...dynamicCategories.filter((cat) => cat !== 'Semua')]);
      } catch (err) {
        if (!isMounted) return;
        setItems(fallbackPortfolioItems);
        const dynamicCategories = Array.from(
          new Set(fallbackPortfolioItems.map((item) => item.category).filter(Boolean)),
        );
        setCategoryFilters(['Semua', ...dynamicCategories.filter((cat) => cat !== 'Semua')]);
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat portofolio.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPortfolio();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'Semua') {
      return items;
    }

    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter, items]);

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
            CodingBoy Showcase
          </span>
          <h1 className="relative mt-6 text-4xl font-bold text-white md:text-5xl">
            Studi kasus digital yang bantu brand naik level
          </h1>
          <p className="relative mt-4 text-lg text-slate-300 md:text-xl">
            Jelajahi projek unggulan kami di berbagai industri dengan perpaduan strategi, visual, dan performa bisnis.
          </p>
        </motion.section>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mx-auto mb-16 max-w-4xl"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categoryFilters.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                  activeFilter === category
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
        </motion.div>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mx-auto max-w-6xl"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => {
              const safeRating = Math.max(0, Math.min(5, Math.round(item.rating ?? 0)));
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.06, duration: 0.55, ease: 'easeOut' }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#1f2b42] bg-[#080f1f]/80 shadow-[0_20px_55px_rgba(5,10,25,0.45)] transition-all hover:border-[#6d6bff]"
                >
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6d6bff]/15 via-transparent to-[#a855f7]/20" />
                    <span className="relative text-5xl font-semibold text-white/70">
                      {(item.image ?? item.title.slice(0, 2)).toUpperCase()}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center bg-[#050a18]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[#273149] bg-[#0b1324]/80 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-[#6d6bff] hover:text-white"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Lihat proyek
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-[#273149] bg-[#0b1324]/70 px-4 py-2 text-sm font-medium text-slate-400">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#273149] bg-[#0b1324]/70 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#8b5cf6]">
                          <Tag className="h-3.5 w-3.5" />
                          {item.category}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] ${
                            item.status === 'completed'
                              ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
                              : 'border-amber-400/40 bg-amber-400/10 text-amber-200'
                          }`}
                        >
                          {item.status === 'completed' ? 'Selesai' : 'On going'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300">{item.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {item.features.length === 0 && (
                        <span className="rounded-full border border-dashed border-[#273149] px-3 py-1 text-xs text-slate-400">
                          Stack segera diupdate
                        </span>
                      )}
                      {item.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-[#273149] bg-[#0b1324]/60 px-3 py-1 text-xs text-slate-300"
                        >
                          {feature}
                        </span>
                      ))}
                      {item.features.length > 3 && (
                        <span className="rounded-full border border-dashed border-[#273149] px-3 py-1 text-xs text-slate-400">
                          +{item.features.length - 3} fitur lainnya
                        </span>
                      )}
                    </div>

                    <div className="grid gap-3">
                      <span className="flex items-center text-sm text-slate-400">
                        <Calendar className="mr-2 h-4 w-4" />
                        {item.status === 'completed'
                          ? `Selesai dalam ${item.duration}`
                          : `Sedang berjalan • Estimasi ${item.duration}`}
                      </span>
                      <div className="rounded-2xl border border-[#273149] bg-[#0b1324]/60 p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex text-[#facc15]">
                            {Array.from({ length: safeRating }).map((_, idx) => (
                              <Star key={idx} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-slate-400">{item.client ?? 'Klien rahasia'}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-300">
                          {item.testimonial ? `"${item.testimonial}"` : 'Testimoni akan segera ditambahkan.'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d6bff] to-[#a855f7] px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_18px_45px_rgba(104,97,255,0.45)]"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Detail proyek
                        </a>
                      ) : (
                        <span className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-[#273149] bg-[#0b1324]/70 px-6 py-3 text-sm font-semibold text-slate-400">
                          Showcase privat
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`portfolio-skeleton-${index}`}
                  className="flex h-full flex-col justify-center rounded-3xl border border-dashed border-[#273149] bg-[#080f1f]/40 p-6 text-center text-sm text-slate-400"
                >
                  Memuat portofolio...
                </div>
              ))}
          </div>

          {!isLoading && filteredItems.length === 0 && (
            <div className="mt-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-[#273149] text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">
                No
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">Portofolio tidak ditemukan</h3>
              <p className="mt-3 text-sm text-slate-400">Coba pilih kategori lain atau reset filter.</p>
              <button
                onClick={() => setActiveFilter('Semua')}
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
          className="mx-auto mt-20 max-w-5xl text-center"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#1b253a] bg-gradient-to-br from-[#0f172a]/85 to-[#050a18]/90 p-12 shadow-[0_32px_90px_rgba(5,10,25,0.55)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-32 w-[120%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#6d6bff]/15 to-transparent blur-2xl" />
              <div className="absolute bottom-0 left-1/4 h-24 w-24 rounded-full bg-[#34d399]/20 blur-3xl" />
            </div>
            <h2 className="relative text-3xl font-semibold text-white md:text-4xl">Siap bikin versi terbaik dari brand kamu?</h2>
            <p className="relative mt-4 text-lg text-slate-300">
              Konsultasikan kebutuhan website kamu dan dapatkan rekomendasi paket yang pas plus breakdown proses produksi.
            </p>
            <div className="relative mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://wa.me/6281532797240?text=Halo%20CodingBoy!%20Saya%20tertarik%20dengan%20portfolio%20Anda%20dan%20ingin%20diskusi%20proyek."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d6bff] to-[#a855f7] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(104,97,255,0.45)] transition-all hover:shadow-[0_22px_55px_rgba(104,97,255,0.55)]"
              >
                <MessageCircle className="h-4 w-4" />
                Konsultasi Gratis
              </a>
              <Link
                href="/#paket"
                className="inline-flex items-center justify-center rounded-full border border-[#273149] bg-[#0b1324]/70 px-7 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-[#6d6bff] hover:text-white"
              >
                Lihat Paket Harga
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
