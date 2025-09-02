'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Zap, 
  Shield, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  MessageCircle,
  Globe,
  Palette,
  ShoppingCart,
  Users,
  Clock,
  Award,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [activePackage, setActivePackage] = useState(1);

  const packages = [
    {
      id: 0,
      name: "Paket Starter",
      price: "Rp 1.500.000",
      duration: "3-5 hari",
      features: [
        "Landing Page Profesional",
        "Mobile Responsive",
        "Domain + Hosting 1 tahun",
        "WhatsApp Integration",
        "Basic SEO Setup",
        "1x Revisi Desain"
      ],
      popular: false
    },
    {
      id: 1,
      name: "Paket Business",
      price: "Rp 3.500.000",
      duration: "5-7 hari",
      features: [
        "Company Profile Lengkap",
        "5-7 Halaman",
        "Content Management System",
        "Gallery/Portfolio",
        "Contact Forms",
        "Social Media Integration",
        "2x Revisi Desain"
      ],
      popular: true
    },
    {
      id: 2,
      name: "Paket Enterprise",
      price: "Rp 6.500.000",
      duration: "7-14 hari",
      features: [
        "E-commerce Ready",
        "10+ Halaman Custom",
        "Admin Dashboard",
        "Payment Gateway Integration",
        "Advanced SEO",
        "Blog System",
        "3x Revisi Desain"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      company: "Warung Makan Sederhana",
      rating: 5,
      text: "Website dari CodingBoy sangat membantu bisnis saya. Pesanan online meningkat 300% dalam 2 bulan!",
      avatar: "BS"
    },
    {
      name: "Sari Dewi",
      company: "Boutique Fashion",
      rating: 5,
      text: "Desainnya modern dan profesional. Customer jadi lebih percaya dengan brand saya.",
      avatar: "SD"
    },
    {
      name: "Ahmad Rahman",
      company: "Jasa Konsultan",
      rating: 5,
      text: "Pelayanan cepat, hasil memuaskan. Highly recommended untuk UKM seperti saya!",
      avatar: "AR"
    }
  ];

  const portfolioItems = [
    { title: "Restaurant Website", category: "F&B", image: "🍽️" },
    { title: "Fashion Store", category: "Fashion", image: "👗" },
    { title: "Consulting Firm", category: "Jasa", image: "💼" },
    { title: "E-commerce Store", category: "E-commerce", image: "🛒" },
    { title: "Photography Studio", category: "Creative", image: "📸" },
    { title: "Fitness Center", category: "Health", image: "💪" }
  ];

  const whatsappMessage = encodeURIComponent(
    "Halo CodingBoy! Saya tertarik dengan jasa pembuatan website. Bisa konsultasi gratis?"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CodingBoy
                </h1>
              </div>
            </motion.div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#beranda" className="text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Beranda
                </a>
                <a href="#tentang" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Tentang
                </a>
                <a href="#portfolio" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Portfolio
                </a>
                <a href="#blog" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Blog
                </a>
                <a href="#kontak" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Kontak
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isSignedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">Halo, {user.firstName}!</span>
                  <a href="/dashboard" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Dashboard
                  </a>
                </div>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Masuk
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                      Daftar
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Jasa Pembuatan Website Profesional{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                #1
              </span>{" "}
              untuk UKM & Startup
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Website berkualitas tinggi dengan harga terjangkau. Tingkatkan kredibilitas bisnis Anda dalam 3-7 hari kerja!
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a 
                href={`https://wa.me/62881025741054?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Konsultasi Gratis
              </a>
              <a 
                href="#paket"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-3 rounded-lg text-lg font-medium transition-all"
              >
                Lihat Paket Harga
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "🚀 Cepat & Tepat",
                description: "Pengerjaan mulai 3 hari kerja"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "💰 Harga Terjangkau",
                description: "Kualitas premium, harga UMKM"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "🎯 SEO Friendly",
                description: "Website ramah mesin pencari Google"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "✅ Garansi Puas",
                description: "Revisi sampai Anda puas dengan hasilnya"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all"
              >
                <div className="text-blue-400 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section id="paket" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Paket Layanan Kami
            </h2>
            <p className="text-gray-300 text-lg">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white/5 backdrop-blur-md border rounded-xl p-8 hover:bg-white/10 transition-all ${
                  pkg.popular 
                    ? 'border-blue-400 ring-2 ring-blue-400/50' 
                    : 'border-white/10'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Paling Populer
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-1">{pkg.price}</div>
                  <p className="text-gray-300 mb-6">Pengerjaan {pkg.duration}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
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
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
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
      <section id="portfolio" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Portfolio Terbaru
            </h2>
            <p className="text-gray-300 text-lg">
              Lihat hasil karya terbaik kami untuk berbagai industri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center text-6xl">
                  {item.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <span className="text-sm text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Website profesional dengan desain modern dan fitur lengkap
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="/portfolio"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2"
            >
              Lihat Portfolio Lengkap
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Apa Kata Klien Kami
            </h2>
            <p className="text-gray-300 text-lg">
              Testimoni dari 100+ klien yang puas dengan layanan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Proses Kerja Kami
            </h2>
            <p className="text-gray-300 text-lg">
              6 langkah mudah untuk mendapatkan website impian Anda
            </p>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{process.title}</h3>
                <p className="text-gray-300">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-2xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mulai Proyek Website Anda Hari Ini
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Jangan biarkan kompetitor Anda unggul. Dapatkan website profesional sekarang juga!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/62881025741054?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                WhatsApp Kami Sekarang
              </a>
              <a
                href="#kontak"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-lg text-lg font-medium transition-all"
              >
                Konsultasi Detail
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hubungi Kami
            </h2>
            <p className="text-gray-300 text-lg">
              Respon dalam 1 jam di jam kerja • Konsultasi gratis tanpa kewajiban
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-6">Informasi Kontak</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MessageCircle className="w-6 h-6 text-green-400 mr-4" />
                    <div>
                      <p className="text-white font-medium">WhatsApp</p>
                      <p className="text-gray-300">+62 812-3456-7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-blue-400 mr-4" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-300">hello@codingboy.id</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-purple-400 mr-4" />
                    <div>
                      <p className="text-white font-medium">Telepon</p>
                      <p className="text-gray-300">(021) 1234-5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-red-400 mr-4" />
                    <div>
                      <p className="text-white font-medium">Alamat</p>
                      <p className="text-gray-300">Jakarta Selatan, Indonesia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-yellow-400 mr-4" />
                    <div>
                      <p className="text-white font-medium">Jam Kerja</p>
                      <p className="text-gray-300">Senin-Sabtu, 09:00-18:00 WIB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-6">Kirim Pesan</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                </div>
                
                <input
                  type="tel"
                  placeholder="Nomor WhatsApp"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                />
                
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400">
                  <option value="">Pilih Layanan</option>
                  <option value="starter">Paket Starter</option>
                  <option value="business">Paket Business</option>
                  <option value="enterprise">Paket Enterprise</option>
                  <option value="custom">Custom Project</option>
                </select>
                
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400">
                  <option value="">Budget Range</option>
                  <option value="1-3">Rp 1-3 Juta</option>
                  <option value="3-5">Rp 3-5 Juta</option>
                  <option value="5-10">Rp 5-10 Juta</option>
                  <option value="10+">Rp 10+ Juta</option>
                </select>
                
                <textarea
                  rows={4}
                  placeholder="Ceritakan tentang proyek Anda..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
                ></textarea>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                CodingBoy
              </h3>
              <p className="text-gray-300 mb-4">
                Jasa pembuatan website profesional untuk UKM dan Startup Indonesia. 
                Wujudkan website impian Anda dengan kualitas terbaik dan harga terjangkau.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017.017"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Website Company Profile</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Landing Page</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">E-commerce</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog & CMS</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#tentang" className="hover:text-blue-400 transition-colors">Tentang Kami</a></li>
                <li><a href="#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Karir</a></li>
                <li><a href="#kontak" className="hover:text-blue-400 transition-colors">Kontak</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CodingBoy. All rights reserved. Made with ❤️ in Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}