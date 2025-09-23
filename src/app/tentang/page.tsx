'use client';

import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Zap, 
  Heart, 
  Target, 
  Users, 
  Award, 
  CheckCircle, 
  Code, 
  Smartphone, 
  ShoppingCart, 
  Megaphone,
  Star,
  MessageCircle,
  Sparkles,
  Rocket,
  Shield,
  Clock,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

export default function Tentang() {
  const services = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Website UMKM",
      description: "Wujudkan impian bisnis online kamu! Website profesional yang bikin customer langsung tertarik dan percaya sama brand kamu.",
      features: ["Profil usaha menarik", "Katalog produk/jasa", "WhatsApp terintegrasi", "SEO friendly"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Portfolio Personal",
      description: "Tampil beda dari yang lain! Showcase karya dan pengalaman kamu dengan website portfolio yang bikin hiring manager terkesan.",
      features: ["Galeri karya interaktif", "CV online profesional", "Contact form", "Mobile responsive"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Toko Online",
      description: "Jualan online jadi lebih mudah dan menguntungkan! E-commerce lengkap yang bikin customer betah belanja di website kamu.",
      features: ["Katalog produk unlimited", "Sistem pembayaran", "Manajemen pesanan", "Dashboard penjualan"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: "Landing Page",
      description: "Konversi maksimal untuk campaign kamu! Landing page yang fokus pada satu tujuan: bikin visitor jadi customer.",
      features: ["Design conversion-focused", "Loading super cepat", "A/B testing ready", "Analytics terintegrasi"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Response",
      description: "Balas chat dalam hitungan menit, bukan jam!",
      color: "text-yellow-400"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Harga Bersahabat",
      description: "Kualitas premium dengan harga yang masuk akal",
      color: "text-green-400"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Revisi Unlimited",
      description: "Sampai kamu puas 100% dengan hasilnya",
      color: "text-blue-400"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Hasil Berkualitas",
      description: "Rapi, terstruktur, dan siap bersaing",
      color: "text-purple-400"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Komunikatif",
      description: "Update progress real-time, transparan 100%",
      color: "text-pink-400"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Konsultasi Gratis",
      description: "Diskusi ide dan solusi tanpa biaya",
      color: "text-red-400"
    }
  ];

  const stats = [
    { number: "500+", label: "Website Dibuat", description: "Berbagai industri & skala bisnis" },
    { number: "98%", label: "Tingkat Kepuasan", description: "Client yang puas & repeat order" },
    { number: "24/7", label: "Support Ready", description: "Siap bantu kapan aja kamu butuh" },
    { number: "3 Hari", label: "Pengerjaan Tercepat", description: "Dari konsep sampai website live" }
  ];

  const testimonials = [
    {
      name: "Sarah Entrepreneur",
      business: "Toko Kue Online",
      text: "Gila sih, dalam 3 hari website toko kue aku udah jadi dan langsung ada yang order! Tim CodingBoy emang the best! 🔥",
      rating: 5,
      avatar: "SE"
    },
    {
      name: "Andi Freelancer",
      business: "Graphic Designer",
      text: "Portfolio website yang dibuat CodingBoy bikin aku dapet klien baru terus. ROI-nya crazy banget! Worth it!",
      rating: 5,
      avatar: "AF"
    },
    {
      name: "Budi UMKM",
      business: "Jasa Service AC",
      text: "Dari yang tadinya cuma andalin mulut ke mulut, sekarang customer bisa langsung booking online. Game changer!",
      rating: 5,
      avatar: "BU"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors mr-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tentang CodingBoy
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-medium">Partner Digital Terpercaya</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CodingBoy
            </span>{" "}
            adalah Solusi
            <br />
            Website Impian Kamu! ✨
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Kami hadir untuk mengubah ide digitalmu jadi kenyataan. Dari website UMKM sampai toko online, 
            kami bikin semuanya jadi <span className="text-blue-400 font-semibold">cepat, rapi, dan bisa diandalkan</span> tanpa ribet!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/6288102574105?text=${encodeURIComponent("Halo CodingBoy! Saya mau konsultasi gratis tentang website impian saya 🚀")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Konsultasi Gratis Sekarang!
            </a>
            <Link
              href="/portfolio"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-xl text-lg font-semibold transition-all"
            >
              Lihat Hasil Karya Kami
            </Link>
          </div>
        </motion.section>

        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center">
            <Target className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-6">Misi Kami</h3>
            <blockquote className="text-2xl text-gray-300 italic leading-relaxed max-w-4xl mx-auto">
              "Membantu lebih banyak orang mewujudkan impian digital mereka dengan 
              <span className="text-blue-400 font-semibold"> cepat, praktis, dan hasil yang bikin bangga</span>. 
              Karena setiap ide berhak jadi kenyataan!"
            </blockquote>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Pencapaian yang Membanggakan</h3>
            <p className="text-gray-300 text-lg">Angka-angka yang membuktikan kepercayaan kamu pada kami</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{stat.label}</h4>
                <p className="text-gray-300 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Apa yang Bisa Kami Kerjakan?</h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Dari ide sampai website live, kami handle semuanya! Ini beberapa jenis website yang udah bikin banyak client kami sukses:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Kenapa Harus Pilih CodingBoy?</h3>
            <p className="text-gray-300 text-lg">
              Ini yang bikin kami beda dari yang lain dan jadi pilihan utama ratusan client! 🔥
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all text-center group"
              >
                <div className={`${reason.color} mb-4 group-hover:scale-110 transition-transform inline-block`}>
                  {reason.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{reason.title}</h4>
                <p className="text-gray-300">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Kata Mereka yang Udah Merasakan</h3>
            <p className="text-gray-300 text-lg">
              Real testimonials dari client yang websitenya udah bikin bisnis mereka naik level! 📈
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.business}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 italic leading-relaxed">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-3xl p-12">
            <Rocket className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-6">
              Let Us Code It For You! 🚀
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              <span className="text-blue-400 font-semibold">Kamu tinggal duduk santai, biar kami yang kerjakan.</span>
              <br />
              Dari konsep sampai website live, semuanya kami handle dengan penuh dedikasi. 
              Siap wujudkan website impian kamu?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/6288102574105?text=${encodeURIComponent("Halo CodingBoy! Saya siap wujudkan website impian saya. Let's make it happen! 🔥")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Yuk, Mulai Sekarang!
              </a>
              <Link
                href="/kontak"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-xl text-lg font-semibold transition-all"
              >
                Konsultasi Detail
              </Link>
            </div>

            <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-gray-300 text-lg">
                <Shield className="w-5 h-5 text-green-400 inline mr-2" />
                <span className="font-semibold text-white">100% Garansi Kepuasan</span> - 
                Kami percaya sama kualitas kerja kami. Kalau kamu nggak puas, kami revisi sampai perfect!
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}