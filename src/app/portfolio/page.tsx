'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Tag, Star } from 'lucide-react';
import Link from 'next/link';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('Semua');

  const categories = ['Semua', 'F&B', 'Fashion', 'Jasa', 'E-commerce', 'Creative', 'Health'];

  const portfolioItems = [
    {
      id: 1,
      title: "Warung Makan Sederhana",
      category: "F&B",
      image: "🍽️",
      description: "Website company profile dengan sistem pemesanan online untuk warung makan tradisional",
      duration: "5 hari",
      features: ["Responsive Design", "Online Ordering", "WhatsApp Integration", "SEO Optimized"],
      testimonial: "Pesanan online meningkat 300% dalam 2 bulan!",
      client: "Budi Santoso",
      rating: 5,
      url: "#"
    },
    {
      id: 2,
      title: "Boutique Fashion Store",
      category: "Fashion",
      image: "👗",
      description: "E-commerce website untuk toko fashion dengan katalog produk dan sistem pembayaran",
      duration: "7 hari",
      features: ["Product Catalog", "Payment Gateway", "Inventory Management", "Mobile App"],
      testimonial: "Desainnya modern dan profesional. Customer jadi lebih percaya!",
      client: "Sari Dewi",
      rating: 5,
      url: "#"
    },
    {
      id: 3,
      title: "Konsultan Bisnis Pro",
      category: "Jasa",
      image: "💼",
      description: "Landing page profesional untuk jasa konsultasi bisnis dengan booking system",
      duration: "3 hari",
      features: ["Booking System", "Client Portal", "Blog Integration", "Lead Generation"],
      testimonial: "Pelayanan cepat, hasil memuaskan. Highly recommended!",
      client: "Ahmad Rahman",
      rating: 5,
      url: "#"
    },
    {
      id: 4,
      title: "Toko Online Elektronik",
      category: "E-commerce",
      image: "🛒",
      description: "Platform e-commerce lengkap dengan fitur marketplace dan multi-vendor",
      duration: "14 hari",
      features: ["Multi-vendor", "Advanced Search", "Review System", "Analytics Dashboard"],
      testimonial: "Platform yang sangat lengkap dan mudah digunakan!",
      client: "PT. Elektronik Jaya",
      rating: 5,
      url: "#"
    },
    {
      id: 5,
      title: "Studio Fotografi",
      category: "Creative",
      image: "📸",
      description: "Portfolio website untuk studio fotografi dengan galeri interaktif",
      duration: "4 hari",
      features: ["Interactive Gallery", "Booking Calendar", "Client Proofing", "Social Integration"],
      testimonial: "Website yang sangat memukau dan fungsional!",
      client: "Creative Studio",
      rating: 5,
      url: "#"
    },
    {
      id: 6,
      title: "Fitness Center",
      category: "Health",
      image: "💪",
      description: "Website gym dengan sistem membership dan jadwal kelas online",
      duration: "6 hari",
      features: ["Membership System", "Class Scheduling", "Trainer Profiles", "Progress Tracking"],
      testimonial: "Member baru bertambah 150% setelah website launch!",
      client: "FitLife Gym",
      rating: 5,
      url: "#"
    },
    {
      id: 7,
      title: "Kafe Modern",
      category: "F&B",
      image: "☕",
      description: "Website kafe dengan menu digital dan sistem reservasi meja",
      duration: "5 hari",
      features: ["Digital Menu", "Table Reservation", "Event Booking", "Loyalty Program"],
      testimonial: "Reservasi online memudahkan customer dan meningkatkan efisiensi!",
      client: "Modern Cafe",
      rating: 5,
      url: "#"
    },
    {
      id: 8,
      title: "Brand Fashion Lokal",
      category: "Fashion",
      image: "👕",
      description: "E-commerce fashion brand dengan custom design dan size guide",
      duration: "8 hari",
      features: ["Custom Design Tool", "Size Guide", "Wishlist", "Social Commerce"],
      testimonial: "Penjualan online naik 400% dengan website yang user-friendly!",
      client: "Local Fashion Brand",
      rating: 5,
      url: "#"
    }
  ];

  const filteredItems = activeFilter === 'Semua' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors mr-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Portfolio
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Portfolio Kami
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Lihat hasil karya terbaik kami untuk berbagai industri. 
            Lebih dari 100+ website telah kami buat dengan kepuasan klien 100%.
          </p>
        </motion.div>

        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all group"
            >
              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center text-6xl relative overflow-hidden">
                {item.image}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-full hover:bg-white/30 transition-all">
                    <ExternalLink className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <span className="text-sm text-blue-400 bg-blue-400/10 px-2 py-1 rounded flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                  {item.features.length > 3 && (
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                      +{item.features.length - 3} lainnya
                    </span>
                  )}
                </div>

                {/* Duration */}
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  Selesai dalam {item.duration}
                </div>

                {/* Testimonial */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm ml-2">- {item.client}</span>
                  </div>
                  <p className="text-gray-300 text-sm italic">"{item.testimonial}"</p>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Lihat Detail
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Siap Membuat Website Seperti Ini?
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Bergabunglah dengan 100+ klien yang telah mempercayakan website mereka kepada kami
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/62881025741054?text=${encodeURIComponent(
                  "Halo CodingBoy! Saya tertarik membuat website setelah melihat portfolio Anda. Bisa konsultasi gratis?"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all inline-flex items-center justify-center gap-2"
              >
                💬 Konsultasi Gratis
              </a>
              <Link
                href="/#paket"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-lg text-lg font-medium transition-all"
              >
                Lihat Paket Harga
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}