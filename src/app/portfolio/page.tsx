'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, MessageCircle, Star, Tag } from 'lucide-react';
import Link from 'next/link';

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

const categories = ['Semua', 'F&B', 'Fashion', 'Jasa', 'E-commerce', 'Creative', 'Health'] as const;

type Category = (typeof categories)[number];

type PortfolioItem = {
  id: number;
  title: string;
  category: Category;
  image: string;
  description: string;
  duration: string;
  features: string[];
  testimonial: string;
  client: string;
  rating: number;
  url: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Warung Makan Sederhana',
    category: 'F&B',
    image: 'WM',
    description: 'Website company profile dengan sistem pemesanan online untuk warung makan tradisional.',
    duration: '5 hari',
    features: ['Responsive Design', 'Online Ordering', 'Integrasi WhatsApp', 'SEO Optimized'],
    testimonial: 'Pesanan online meningkat 300% dalam 2 bulan! Puas banget dengan hasilnya.',
    client: 'Budi Santoso',
    rating: 5,
    url: '#',
  },
  {
    id: 2,
    title: 'Boutique Fashion Store',
    category: 'Fashion',
    image: 'BF',
    description: 'E-commerce website untuk toko fashion dengan katalog produk dan sistem pembayaran.',
    duration: '7 hari',
    features: ['Product Catalog', 'Payment Gateway', 'Inventory Management', 'Mobile Ready'],
    testimonial: 'Desainnya modern dan profesional. Customer jadi lebih percaya beli di toko kami.',
    client: 'Sari Dewi',
    rating: 5,
    url: '#',
  },
  {
    id: 3,
    title: 'Konsultan Bisnis Pro',
    category: 'Jasa',
    image: 'KB',
    description: 'Landing page profesional untuk jasa konsultasi bisnis lengkap dengan booking system.',
    duration: '3 hari',
    features: ['Booking System', 'Client Portal', 'Blog Integration', 'Lead Generation'],
    testimonial: 'Pelayanan cepat dan hasilnya sangat membantu closing klien baru.',
    client: 'Ahmad Rahman',
    rating: 5,
    url: '#',
  },
  {
    id: 4,
    title: 'Toko Online Elektronik',
    category: 'E-commerce',
    image: 'TE',
    description: 'Platform e-commerce lengkap dengan fitur marketplace dan dukungan multi-vendor.',
    duration: '14 hari',
    features: ['Multi-vendor', 'Advanced Search', 'Review System', 'Analytics Dashboard'],
    testimonial: 'Platform yang lengkap dan mudah dipakai oleh seller maupun admin.',
    client: 'PT. Elektronik Jaya',
    rating: 5,
    url: '#',
  },
  {
    id: 5,
    title: 'Studio Fotografi',
    category: 'Creative',
    image: 'SF',
    description: 'Portfolio website untuk studio fotografi dengan galeri interaktif dan testimoni klien.',
    duration: '4 hari',
    features: ['Interactive Gallery', 'Booking Calendar', 'Client Proofing', 'Social Integration'],
    testimonial: 'Website yang sangat memukau dan berhasil menunjukkan value studio kami.',
    client: 'Creative Studio',
    rating: 5,
    url: '#',
  },
  {
    id: 6,
    title: 'Fitness Center',
    category: 'Health',
    image: 'FC',
    description: 'Website gym dengan sistem membership, jadwal kelas, dan profil trainer yang lengkap.',
    duration: '6 hari',
    features: ['Membership System', 'Class Scheduling', 'Trainer Profiles', 'Progress Tracking'],
    testimonial: 'Member baru bertambah 150% setelah website launch! Sistemnya gampang dikelola.',
    client: 'FitLife Gym',
    rating: 5,
    url: '#',
  },
  {
    id: 7,
    title: 'Kafe Modern',
    category: 'F&B',
    image: 'KM',
    description: 'Website kafe dengan menu digital, reservasi meja, dan integrasi loyalty program.',
    duration: '5 hari',
    features: ['Digital Menu', 'Table Reservation', 'Event Booking', 'Loyalty Program'],
    testimonial: 'Reservasi online bikin operasional jadi efisien dan pelanggan makin loyal.',
    client: 'Modern Cafe',
    rating: 5,
    url: '#',
  },
  {
    id: 8,
    title: 'Brand Fashion Lokal',
    category: 'Fashion',
    image: 'FL',
    description: 'E-commerce fashion brand dengan custom design tool dan panduan ukuran detail.',
    duration: '8 hari',
    features: ['Custom Design Tool', 'Size Guide', 'Wishlist', 'Social Commerce'],
    testimonial: 'Penjualan online naik 400% dengan website yang user-friendly banget.',
    client: 'Local Fashion Brand',
    rating: 5,
    url: '#',
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Category>('Semua');

  const filteredItems = useMemo(() => {
    if (activeFilter === 'Semua') return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

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
            {categories.map((category) => (
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
        </motion.div>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mx-auto max-w-6xl"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
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
                  <span className="relative text-5xl font-semibold text-white/70">{item.image}</span>
                  <div className="absolute inset-0 flex items-center justify-center bg-[#050a18]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <a
                      href={item.url}
                      className="inline-flex items-center gap-2 rounded-full border border-[#273149] bg-[#0b1324]/80 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-[#6d6bff] hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Lihat proyek
                    </a>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#273149] bg-[#0b1324]/70 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#8b5cf6]">
                      <Tag className="h-3.5 w-3.5" />
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">{item.description}</p>

                  <div className="flex flex-wrap gap-2">
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
                      Selesai dalam {item.duration}
                    </span>
                    <div className="rounded-2xl border border-[#273149] bg-[#0b1324]/60 p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex text-[#facc15]">
                          {Array.from({ length: item.rating }).map((_, idx) => (
                            <Star key={idx} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-slate-400">{item.client}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">"{item.testimonial}"</p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <a
                      href={item.url}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d6bff] to-[#a855f7] px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_18px_45px_rgba(104,97,255,0.45)]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Detail proyek
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
