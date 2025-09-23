'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PrimaryNav from '@/components/PrimaryNav';
import {
  ArrowRight,
  MessageCircle,
  Users,
  Star,
  ShoppingCart,
  Megaphone,
  CheckCircle,
  Zap,
  Shield,
  Heart,
  Clock,
  Award,
  Rocket,
  Phone,
  Linkedin,
} from 'lucide-react';

const stats = [
  { number: '120+', label: 'Project Selesai', description: 'Website untuk UKM, startup, dan korporasi' },
  { number: '98%', label: 'Kepuasan Klien', description: 'Klien puas dengan komunikasi dan hasil' },
  { number: '3-7', label: 'Hari Produksi', description: 'Durasi rata-rata website live' },
  { number: '24/7', label: 'Dukungan', description: 'Tim siap bantu kapan pun dibutuhkan' },
] as const;

const services = [
  {
    title: 'Website UMKM',
    description:
      'Bangun kepercayaan pelanggan dengan website profesional yang siap menampilkan produk dan layanan bisnis kamu.',
    icon: Users,
    accent: 'from-[#6366f1] to-[#8b5cf6]',
    features: ['Profil usaha modern', 'Integrasi WhatsApp', 'SEO dasar', 'Optimasi mobile'],
  },
  {
    title: 'Landing Page Kampanye',
    description:
      'Landing page fokus konversi untuk promo, event, atau produk spesifik dengan struktur copywriting yang rapi.',
    icon: Megaphone,
    accent: 'from-[#f59e0b] to-[#f97316]',
    features: ['Section storytelling', 'Form lead generation', 'Integrasi pixel & analytics', 'A/B testing ready'],
  },
  {
    title: 'Portfolio & Personal Branding',
    description:
      'Tingkatkan kredibilitas profesional kamu dengan portofolio interaktif yang mudah di-update.',
    icon: Star,
    accent: 'from-[#8b5cf6] to-[#ec4899]',
    features: ['Galeri karya responsif', 'CMS sederhana', 'Optimasi share sosial', 'Halaman testimoni'],
  },
  {
    title: 'Catalog & Online Store',
    description:
      'Tampilkan produk lengkap dengan katalog, sistem pemesanan, dan integrasi pembayaran pilihan.',
    icon: ShoppingCart,
    accent: 'from-[#34d399] to-[#10b981]',
    features: ['Manajemen produk mudah', 'Keranjang & checkout', 'Pilihan pembayaran fleksibel', 'Dashboard penjualan'],
  },
] as const;

const values = [
  {
    title: 'Respons Cepat',
    description: 'Feedback dan update harian lewat WhatsApp atau Notion progress board.',
    icon: Zap,
  },
  {
    title: 'Riset & Strategi',
    description: 'Setiap desain berangkat dari riset kompetitor dan target audience.',
    icon: Shield,
  },
  {
    title: 'Desain Human-Centered',
    description: 'Fokus pada flow pengguna yang intuitif supaya visitor nyaman.',
    icon: Heart,
  },
  {
    title: 'Timeline Terukur',
    description: 'Jadwal produksi jelas dengan milestone yang bisa kamu monitor.',
    icon: Clock,
  },
  {
    title: 'Quality Assurance',
    description: 'Multi-round checking sebelum website go-live untuk pastikan semuanya mulus.',
    icon: Award,
  },
  {
    title: 'Dukungan Aftercare',
    description: 'Garansi revisi minor dan panduan penggunaan setelah handover.',
    icon: CheckCircle,
  },
] as const;

const teamMembers = [
  {
    initials: 'LM',
    name: 'Luthfi Mirza',
    role: 'Co-Founder & Fullstack Developer',
    phoneDisplay: '+62 856-0940-8506',
    phoneLink: 'tel:+6285609408506',
    linkedin: 'https://www.linkedin.com/in/luthfi-mirza-darsono-675663242/',
  },
  {
    initials: 'AF',
    name: 'Alwan Farras',
    role: 'Co-Founder & UI/UX Specialist',
    phoneDisplay: '+62 881-0257-41054',
    phoneLink: 'tel:+62881025741054',
    linkedin: 'https://www.linkedin.com/in/muhammad-alwan-farras-76829728b/',
  },
] as const;

const testimonials = [
  {
    name: 'Sarah Entrepreneur',
    business: 'Owner, Rumah Kue Laris',
    text: 'Dalam 4 hari website toko kue saya sudah live dan langsung mendongkrak pesanan online. Workflow-nya rapi banget.',
    avatar: 'SE',
  },
  {
    name: 'Andi Freelancer',
    business: 'Graphic Designer',
    text: 'Portfolio baru bikin saya lebih gampang dipercaya klien agency. Struktur kontennya dibantu sampai tuntas.',
    avatar: 'AF',
  },
  {
    name: 'Budi Pratama',
    business: 'Founder, ServicePro',
    text: 'Tim CodingBoy bantu mapping fitur booking dan integrasi WhatsApp. Customer langsung ngerti alur pesanan.',
    avatar: 'BP',
  },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.6 } },
} as const;

export default function Tentang() {
  const navLabels = {
    tentang: 'Tentang',
    portfolio: 'Portfolio',
    blog: 'Blog',
    contact: 'Kontak',
  } as const;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070d] text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-36 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#6d6bff]/15 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[460px] w-[460px] rounded-full bg-[#a855f7]/10 blur-[220px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] translate-x-1/4 translate-y-1/4 rounded-full bg-[#38bdf8]/10 blur-[200px]" />
      </div>
      <PrimaryNav labels={navLabels} />

      <main className="pt-28">
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="relative mx-auto mb-20 max-w-5xl rounded-3xl border border-[#1b253a] bg-gradient-to-br from-[#0f172a]/80 to-[#050a18]/90 p-10 text-center shadow-[0_32px_90px_rgba(5,10,25,0.55)]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-32 w-[120%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#6d6bff]/20 to-transparent blur-2xl" />
            <div className="absolute bottom-0 right-1/3 h-24 w-24 rounded-full bg-[#a855f7]/25 blur-3xl" />
          </div>
          <span className="relative inline-flex items-center justify-center rounded-full border border-[#273149] bg-[#080f1f]/80 px-5 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[#8b5cf6]">
            CodingBoy Inside Story
          </span>
          <h1 className="relative mt-6 text-4xl font-bold text-white md:text-5xl">
            Kami bantu brand tumbuh lewat pengalaman digital yang berarti
          </h1>
          <p className="relative mt-4 text-lg text-slate-300 md:text-xl">
            Dari riset, desain, sampai development, kami super fokus bikin website yang bukan cuma cantik, tapi juga efektif membawa hasil bisnis.
          </p>
          <div className="relative mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://wa.me/6281532797240?text=Halo%20CodingBoy!%20Saya%20ingin%20mendiskusikan%20project%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d6bff] to-[#a855f7] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(104,97,255,0.45)] transition-all hover:shadow-[0_22px_55px_rgba(104,97,255,0.55)]"
            >
              <MessageCircle className="h-4 w-4" />
              Jadwalkan Konsultasi
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#273149] bg-[#0b1324]/70 px-6 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-[#6d6bff] hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
              Lihat Studi Kasus
            </Link>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto mb-20 max-w-6xl"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
                className="rounded-2xl border border-[#1f2b42] bg-[#080f1f]/75 p-6 text-center shadow-[0_18px_45px_rgba(5,10,25,0.4)]"
              >
                <div className="text-3xl font-semibold text-white">{stat.number}</div>
                <p className="mt-1 text-sm uppercase tracking-[0.24em] text-[#8b5cf6]">{stat.label}</p>
                <p className="mt-3 text-sm text-slate-300">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mx-auto mb-20 max-w-6xl"
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-white">Solusi yang kami bangun</h2>
            <p className="mt-3 text-lg text-slate-300">
              Fleksibel untuk UKM, startup, sampai brand korporasi yang butuh identitas digital kuat.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
                className="rounded-3xl border border-[#1f2b42] bg-[#080f1f]/75 p-8 shadow-[0_20px_55px_rgba(5,10,25,0.45)]"
              >
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} text-white shadow-[0_12px_30px_rgba(99,102,241,0.4)]`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-slate-300">{service.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto mb-20 max-w-6xl"
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-white">Kenapa brand memilih CodingBoy</h2>
            <p className="mt-3 text-lg text-slate-300">
              Nilai yang selalu kami pegang di setiap proses pengerjaan proyek digital.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ delay: index * 0.06, duration: 0.55, ease: 'easeOut' }}
                className="rounded-2xl border border-[#1f2b42] bg-[#080f1f]/70 p-6 shadow-[0_16px_40px_rgba(5,10,25,0.38)]"
              >
                <value.icon className="h-6 w-6 text-[#8b5cf6]" />
                <h3 className="mt-4 text-lg font-semibold text-white">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto mb-20 max-w-6xl"
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-white">Meet the team</h2>
            <p className="mt-3 text-lg text-slate-300">
              Dua orang di balik layar yang memastikan website kamu tampil maksimal.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-3xl border border-[#1f2b42] bg-[#080f1f]/75 p-8 shadow-[0_22px_60px_rgba(5,10,25,0.45)]"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#6d6bff]/15 via-transparent to-[#a855f7]/15 opacity-0 transition-opacity duration-300 hover:opacity-100" />
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6d6bff] to-[#a855f7] text-xl font-semibold text-white shadow-[0_12px_32px_rgba(104,97,255,0.45)]">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{member.name}</h3>
                    <p className="text-xs uppercase tracking-[0.32em] text-[#8b5cf6]">{member.role}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#6d6bff]" />
                    <a href={member.phoneLink} className="text-white transition-colors hover:text-[#a855f7]">
                      {member.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-[#6d6bff]" />
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white transition-colors hover:text-[#a855f7]"
                    >
                      LinkedIn Profile
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
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto mb-20 max-w-6xl"
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-white">Apa kata klien</h2>
            <p className="mt-3 text-lg text-slate-300">Cerita singkat dari brand yang sudah kami bantu transformasi digitalnya.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
                className="flex h-full flex-col justify-between rounded-2xl border border-[#1f2b42] bg-[#080f1f]/75 p-6 shadow-[0_18px_45px_rgba(5,10,25,0.4)]"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#6d6bff] to-[#a855f7] text-sm font-semibold text-white">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{testimonial.business}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm text-slate-300">“{testimonial.text}”</p>
                </div>
                <div className="mt-6 flex gap-1 text-[#facc15]">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star key={starIdx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto mb-24 max-w-5xl text-center"
        >
          <div className="rounded-3xl border border-[#1b253a] bg-gradient-to-br from-[#0f172a]/80 to-[#050a18]/90 p-12 shadow-[0_32px_90px_rgba(5,10,25,0.55)]">
            <Rocket className="mx-auto h-14 w-14 text-[#6d6bff]" />
            <h2 className="mt-6 text-3xl font-semibold text-white md:text-4xl">Siap bawa website kamu ke level berikutnya?</h2>
            <p className="mt-4 text-lg text-slate-300">
              Kami bantu dari strategi konten sampai launch day. Diskusikan kebutuhan kamu dan dapatkan rekomendasi paket terbaik.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://wa.me/6281532797240?text=Halo%20CodingBoy!%20Saya%20ingin%20mendiskusikan%20project%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d6bff] to-[#a855f7] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(104,97,255,0.45)] transition-all hover:shadow-[0_22px_55px_rgba(104,97,255,0.55)]"
              >
                <MessageCircle className="h-4 w-4" />
                Konsultasi Sekarang
              </a>
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#273149] bg-[#0b1324]/70 px-7 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-[#6d6bff] hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
                Informasi Kontak Lengkap
              </Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.32em] text-slate-400">
              Garansi revisi sampai kamu benar-benar puas
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
