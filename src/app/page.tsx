'use client';
import { motion } from 'framer-motion';
import {
  Zap,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Globe,
  ShoppingCart,
  Clock,
  Phone,
  Mail,
  MapPin,
  UtensilsCrossed,
  Shirt,
  BriefcaseBusiness,
  Camera,
  Dumbbell,
} from 'lucide-react';

import PrimaryNav from '@/components/PrimaryNav';
import { useLanguage } from '@/components/LanguageContext';

export default function Home() {
  const { lang } = useLanguage();

  const t = {
    id: {
      nav: { about: 'Tentang', portfolio: 'Portfolio', blog: 'Blog', contact: 'Kontak' },
      hero: { l1: 'Jasa Pembuatan', l2: 'Website', l3: 'Profesional', l4: '' },
      heroSub:
        '#1 untuk UKM & Startup Website berkualitas tinggi dengan harga terjangkau. Tingkatkan kredibilitas bisnis Anda dalam 3-7 hari kerja!',
      cta: { primary: 'Konsultasi Gratis', secondary: 'Lihat Paket Harga' },
    },
    en: {
      nav: { about: 'About', portfolio: 'Portfolio', blog: 'Blog', contact: 'Contact' },
      hero: { l1: 'Professional', l2: 'Website', l3: 'Services', l4: '' },
      heroSub:
        '#1 for SMEs & Startups High-quality websites at affordable prices. Boost your credibility in 3–7 business days!',
      cta: { primary: 'Free Consultation', secondary: 'See Pricing Packages' },
    },
  } as const;
  const L = t[(lang as 'id' | 'en') || 'id'];
  const navLabels = {
    tentang: L.nav.about,
    portfolio: L.nav.portfolio,
    blog: L.nav.blog,
    contact: L.nav.contact,
  } as const;

  const heroContainer = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: 'easeOut', duration: 0.7, staggerChildren: 0.08 },
    },
  } as const;

  const heroLine = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.7 } },
  } as const;

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.6 } },
  } as const;

  const revealViewport = { once: true, amount: 0.3 } as const;

  const packages = [
    { id: 0, name: "Paket Starter", price: "Rp 1.500.000", duration: "3-5 hari",
      features: ["Landing Page Profesional","Mobile Responsive","Domain + Hosting 1 tahun","WhatsApp Integration","Basic SEO Setup","1x Revisi Desain"], popular: false },
    { id: 1, name: "Paket Business", price: "Rp 3.500.000", duration: "5-7 hari",
      features: ["Company Profile Lengkap","5-7 Halaman","Content Management System","Gallery/Portfolio","Contact Forms","Social Media Integration","2x Revisi Desain"], popular: true },
    { id: 2, name: "Paket Enterprise", price: "Rp 6.500.000", duration: "7-14 hari",
      features: ["E-commerce Ready","10+ Halaman Custom","Admin Dashboard","Payment Gateway Integration","Advanced SEO","Blog System","3x Revisi Desain"], popular: false }
  ];

  const testimonials = [
    { name: "Budi Santoso", company: "Warung Makan Sederhana", rating: 5, text: "Website dari CodingBoy sangat membantu bisnis saya. Pesanan online meningkat 300% dalam 2 bulan!", avatar: "BS" },
    { name: "Sari Dewi", company: "Boutique Fashion", rating: 5, text: "Desainnya modern dan profesional. Customer jadi lebih percaya dengan brand saya.", avatar: "SD" },
    { name: "Ahmad Rahman", company: "Jasa Konsultan", rating: 5, text: "Pelayanan cepat, hasil memuaskan. Highly recommended untuk UKM seperti saya!", avatar: "AR" }
  ];

  const portfolioItems = [
    { title: "Restaurant Website", category: "F&B", icon: UtensilsCrossed },
    { title: "Fashion Store", category: "Fashion", icon: Shirt },
    { title: "Consulting Firm", category: "Jasa", icon: BriefcaseBusiness },
    { title: "E-commerce Store", category: "E-commerce", icon: ShoppingCart },
    { title: "Photography Studio", category: "Creative", icon: Camera },
    { title: "Fitness Center", category: "Health", icon: Dumbbell },
  ] as const;

  const whatsappMessage = encodeURIComponent(
    "Halo CodingBoy! Saya tertarik dengan jasa pembuatan website. Bisa konsultasi gratis?"
  );

  return (
    <div className="min-h-screen text-slate-100">
      {/* Navigation */}
      <PrimaryNav labels={navLabels} />



      {/* Hero Section */}
      <section id="beranda" className="relative">
        {/* BG video */}
        <video
          className="absolute inset-0 z-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          {/* pastikan file ada di /public dengan nama tanpa spasi */}
          <source src="/vid-beranda.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 max-w-none mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100svh-64px)] mt-[64px] grid place-items-center">
          <div className="text-center w-full">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.75 }}
              variants={heroContainer}
              className="font-display font-bold uppercase leading-[0.82] tracking-tight text-white select-none"
            >
              <motion.span variants={heroLine} className="block text-[16vw] md:text-[11vw]">{L.hero.l1}</motion.span>
              <motion.span variants={heroLine} className="block text-[16vw] md:text-[11vw]">{L.hero.l2}</motion.span>
              <motion.span variants={heroLine} className="block text-[16vw] md:text-[11vw]">{L.hero.l3}</motion.span>
              {!!L.hero.l4 && (
                <motion.span variants={heroLine} className="block text-[12vw] md:text-[8vw]">
                  {L.hero.l4}
                </motion.span>
              )}
            </motion.div>

            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.7 }}
              variants={fadeUp}
              className="text-base md:text-xl text-slate-300 mt-8 mb-12 max-w-3xl mx-auto"
            >
              {L.heroSub}
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.7 }}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={`https://wa.me/62881025741054?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-[#6d6bff] to-[#a855f7] px-9 py-3 rounded-full text-lg font-semibold text-white shadow-[0_12px_40px_rgba(104,97,255,0.45)] hover:shadow-[0_16px_48px_rgba(104,97,255,0.55)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                {L.cta.primary}
              </a>
              <a
                href="#paket"
                className="px-9 py-3 rounded-full text-lg font-medium transition-all flex items-center justify-center gap-2 border border-[#273249] bg-[#0d1424] text-slate-200 hover:border-[#6d6bff] hover:text-white"
              >
                {L.cta.secondary}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-7 h-7" />,
                title: 'Eksekusi Cepat',
                description: 'Mulai live dalam 3-7 hari dengan proses terstruktur.'
              },
              {
                icon: <Shield className="w-7 h-7" />,
                title: 'Harga Transparan',
                description: 'Paket jelas dengan skema pembayaran yang fleksibel.'
              },
              {
                icon: <Globe className="w-7 h-7" />,
                title: 'Optimasi SEO',
                description: 'Siap bersaing di Google sejak hari pertama tayang.'
              },
              {
                icon: <CheckCircle className="w-7 h-7" />,
                title: 'Garansi Revisi',
                description: 'Perbaikan tanpa batas sampai Anda benar-benar puas.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
                className="rounded-2xl border border-[#1f2a3f] bg-gradient-to-b from-[#0d121f] to-[#070a13] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.5)] hover:border-[#6366f1] hover:shadow-[0_22px_60px_rgba(99,102,241,0.4)] transition-all"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#171f33] text-[#8b5cf6]">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 tracking-wide">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section id="paket" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-[0.18em] uppercase"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              Paket Layanan Kami
            </motion.h2>
            <motion.p
              className="text-slate-300 text-lg"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                className={`relative rounded-2xl border p-8 transition-all shadow-[0_22px_50px_rgba(0,0,0,0.55)] ${
                  pkg.popular
                    ? 'border-[#6366f1] bg-gradient-to-b from-[#141d34] to-[#090c16]'
                    : 'border-[#1f2a3f] bg-gradient-to-b from-[#0d121f] to-[#070a13] hover:border-[#454b7a]'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#6d6bff] to-[#a855f7] text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                      Paling Populer
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-[#8b5cf6] mb-1">{pkg.price}</div>
                  <p className="text-slate-300 mb-6">Pengerjaan {pkg.duration}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#38f594] mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href={`https://wa.me/62881025741054?text=${encodeURIComponent(
                      `Halo CodingBoy! Saya tertarik dengan ${pkg.name} (${pkg.price}). Bisa diskusi lebih lanjut?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-6 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-[#6d6bff] to-[#a855f7] text-white shadow-[0_16px_40px_rgba(104,97,255,0.45)] hover:-translate-y-0.5'
                        : 'border border-[#2b3650] text-slate-200 hover:border-[#6366f1]'
                    }`}
                  >
                    <MessageCircle size={18} />
                    Pilih Paket
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section id="portfolio" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-[0.2em] uppercase"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              Portfolio Terbaru
            </motion.h2>
            <motion.p
              className="text-slate-300 text-lg"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              Lihat hasil karya terbaik kami untuk berbagai industri
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
                className="rounded-2xl border border-[#1f2a3f] bg-gradient-to-b from-[#0d121f] to-[#070a13] overflow-hidden hover:border-[#6366f1] hover:shadow-[0_20px_55px_rgba(99,102,241,0.35)] transition-all group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-[#111a2d] to-[#0a0f1c] flex items-center justify-center">
                  <item.icon className="h-16 w-16 text-[#8b5cf6]" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <span className="text-sm text-[#8b5cf6] bg-[#8b5cf6]/10 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Website profesional dengan desain modern dan fitur lengkap
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-[#273249] px-8 py-3 text-sm font-semibold tracking-[0.18em] uppercase text-slate-200 hover:border-[#6366f1]"
            >
              Lihat Portfolio Lengkap
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-[0.2em] uppercase"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              Apa Kata Klien Kami
            </motion.h2>
            <motion.p
              className="text-slate-300 text-lg"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              Testimoni dari 100+ klien yang puas dengan layanan kami
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
                className="rounded-2xl border border-[#1f2a3f] bg-[#0a0f1c] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#6d6bff] to-[#a855f7] rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-300 italic leading-relaxed">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-[0.18em] uppercase"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              Proses Kerja Kami
            </motion.h2>
            <motion.p
              className="text-slate-300 text-lg"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              6 langkah mudah untuk mendapatkan website impian Anda
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Konsultasi Gratis",
                description: "Diskusi kebutuhan dan goals bisnis"
              },
              {
                step: "2", 
                title: "Pilih Paket",
                description: "Sesuaikan dengan budget dan kebutuhan"
              },
              {
                step: "3",
                title: "Brief & Konten", 
                description: "Kirim materi dan referensi desain"
              },
              {
                step: "4",
                title: "Desain & Development",
                description: "Tim kami kerjakan website Anda"
              },
              {
                step: "5",
                title: "Review & Revisi",
                description: "Feedback dan penyempurnaan"
              },
              {
                step: "6",
                title: "Launch & Training",
                description: "Website online + tutorial penggunaan"
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
                className="rounded-2xl border border-[#1f2a3f] bg-[#0a0f1c] p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.5)] hover:border-[#6366f1] transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#6d6bff] to-[#a855f7] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 tracking-wide">{process.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="rounded-3xl border border-[#1f2a3f] bg-gradient-to-r from-[#11182a] to-[#090d18] p-12 shadow-[0_26px_70px_rgba(0,0,0,0.55)]"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-[0.16em] uppercase">
              Mulai Proyek Website Anda Hari Ini
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Jangan biarkan kompetitor Anda unggul. Dapatkan website profesional sekarang juga!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/62881025741054?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-[#38f594] to-[#21c48c] text-black px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-[0_18px_45px_rgba(56,245,148,0.35)] hover:-translate-y-0.5"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                WhatsApp Kami Sekarang
              </a>
              <a
                href="kontak"
                className="px-8 py-4 rounded-full text-lg font-medium transition-all border border-[#273249] text-slate-200 hover:border-[#6366f1]"
              >
                Konsultasi Detail
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-[0.18em] uppercase"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              Hubungi Kami
            </motion.h2>
            <motion.p
              className="text-slate-300 text-lg"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              Respon dalam 1 jam di jam kerja • Konsultasi gratis tanpa kewajiban
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              <div className="rounded-2xl border border-[#1f2a3f] bg-[#0a0f1c] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.5)]">
                <h3 className="text-xl font-semibold text-white mb-6 tracking-wide">Informasi Kontak</h3>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 text-[#38f594] mr-4" />
                    <div>
                      <p className="text-white font-medium">WhatsApp</p>
                      <p className="text-slate-300">+62 812-3456-7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-[#6d6bff] mr-4" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-slate-300">hello@codingboy.id</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#a855f7] mr-4" />
                    <div>
                      <p className="text-white font-medium">Telepon</p>
                      <p className="text-slate-300">(021) 1234-5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-[#f97316] mr-4" />
                    <div>
                      <p className="text-white font-medium">Alamat</p>
                      <p className="text-slate-300">Jakarta Selatan, Indonesia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-[#facc15] mr-4" />
                    <div>
                      <p className="text-white font-medium">Jam Kerja</p>
                      <p className="text-slate-300">Senin-Sabtu, 09:00-18:00 WIB</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="rounded-2xl border border-[#1f2a3f] bg-[#0a0f1c] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              <h3 className="text-xl font-semibold text-white mb-6 tracking-wide">Kirim Pesan</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full rounded-lg border border-[#273249] bg-[#0f1628] px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/30"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg border border-[#273249] bg-[#0f1628] px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/30"
                  />
                </div>
                
                <input
                  type="tel"
                  placeholder="Nomor WhatsApp"
                  className="w-full rounded-lg border border-[#273249] bg-[#0f1628] px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/30"
                />
                
                <select className="w-full rounded-lg border border-[#273249] bg-[#0f1628] px-4 py-3 text-white focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/30">
                  <option value="">Pilih Layanan</option>
                  <option value="starter">Paket Starter</option>
                  <option value="business">Paket Business</option>
                  <option value="enterprise">Paket Enterprise</option>
                  <option value="custom">Custom Project</option>
                </select>
                
                <select className="w-full rounded-lg border border-[#273249] bg-[#0f1628] px-4 py-3 text-white focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/30">
                  <option value="">Budget Range</option>
                  <option value="1-3">Rp 1-3 Juta</option>
                  <option value="3-5">Rp 3-5 Juta</option>
                  <option value="5-10">Rp 5-10 Juta</option>
                  <option value="10+">Rp 10+ Juta</option>
                </select>
                
                <textarea
                  rows={4}
                  placeholder="Ceritakan tentang proyek Anda..."
                  className="w-full resize-none rounded-lg border border-[#273249] bg-[#0f1628] px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/30"
                ></textarea>
                
                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-[#6d6bff] to-[#a855f7] py-3 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_45px_rgba(104,97,255,0.4)] hover:-translate-y-0.5 transition-all"
                >
                  Kirim Pesan
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#121b2e] bg-[#05070d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-semibold tracking-[0.22em] text-white mb-4 uppercase">
                CodingBoy
              </h3>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                Jasa pembuatan website profesional untuk UKM dan Startup Indonesia. Wujudkan website impian Anda dengan kualitas terbaik dan harga terjangkau.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-500 hover:text-[#6d6bff] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-500 hover:text-[#6d6bff] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-500 hover:text-[#6d6bff] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017.017"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold tracking-[0.2em] text-white uppercase mb-4">Layanan</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-[#6d6bff] transition-colors">Website Company Profile</a></li>
                <li><a href="#" className="hover:text-[#6d6bff] transition-colors">Landing Page</a></li>
                <li><a href="#" className="hover:text-[#6d6bff] transition-colors">E-commerce</a></li>
                <li><a href="#" className="hover:text-[#6d6bff] transition-colors">Blog & CMS</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold tracking-[0.2em] text-white uppercase mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="tentang" className="hover:text-[#6d6bff] transition-colors">Tentang Kami</a></li>
                <li><a href="#portfolio" className="hover:text-[#6d6bff] transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-[#6d6bff] transition-colors">Karir</a></li>
                <li><a href="/kontak" className="hover:text-[#6d6bff] transition-colors">Kontak</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#171f33] mt-8 pt-8 text-center text-slate-500 text-xs tracking-[0.18em] uppercase">
            <p>&copy; 2025 CodingBoy. All rights reserved. Made in Indonesia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
