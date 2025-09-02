'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Eye, Tag, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Tutorial Web', 'Digital Marketing', 'Bisnis Online', 'Tren Design', 'Studi Kasus'];

  const blogPosts = [
    {
      id: 1,
      title: "Cara Memilih Jasa Pembuatan Website Terpercaya",
      slug: "cara-memilih-jasa-pembuatan-website-terpercaya",
      excerpt: "Tips memilih jasa pembuatan website yang tepat untuk bisnis Anda. Pelajari kriteria penting yang harus diperhatikan.",
      content: "Memilih jasa pembuatan website yang tepat adalah keputusan penting untuk bisnis Anda...",
      category: "Tutorial Web",
      tags: ["website", "bisnis", "tips", "pemilihan"],
      image: "📝",
      published: true,
      featured: true,
      views: 1250,
      publishedAt: "2024-01-15",
      readTime: "5 menit"
    },
    {
      id: 2,
      title: "Website vs Media Sosial: Mana yang Lebih Penting untuk Bisnis?",
      slug: "website-vs-media-sosial-mana-yang-lebih-penting",
      excerpt: "Perbandingan antara website dan media sosial untuk strategi digital marketing yang efektif.",
      content: "Dalam era digital ini, banyak bisnis yang bingung memilih antara website atau media sosial...",
      category: "Digital Marketing",
      tags: ["website", "social media", "digital marketing", "strategi"],
      image: "📱",
      published: true,
      featured: true,
      views: 980,
      publishedAt: "2024-01-12",
      readTime: "7 menit"
    },
    {
      id: 3,
      title: "Berapa Biaya Pembuatan Website untuk UMKM?",
      slug: "berapa-biaya-pembuatan-website-untuk-umkm",
      excerpt: "Panduan lengkap estimasi biaya pembuatan website untuk UMKM dengan berbagai pilihan paket.",
      content: "Salah satu pertanyaan yang paling sering ditanyakan oleh pemilik UMKM adalah berapa biaya...",
      category: "Bisnis Online",
      tags: ["biaya", "UMKM", "website", "budget"],
      image: "💰",
      published: true,
      featured: false,
      views: 1500,
      publishedAt: "2024-01-10",
      readTime: "6 menit"
    },
    {
      id: 4,
      title: "10 Tren Design Website 2024 yang Wajib Anda Ketahui",
      slug: "10-tren-design-website-2024",
      excerpt: "Tren design website terbaru yang akan mendominasi tahun 2024. Dari glassmorphism hingga dark mode.",
      content: "Design website terus berkembang setiap tahunnya. Berikut adalah 10 tren design yang akan populer...",
      category: "Tren Design",
      tags: ["design", "tren", "2024", "UI/UX"],
      image: "🎨",
      published: true,
      featured: true,
      views: 850,
      publishedAt: "2024-01-08",
      readTime: "8 menit"
    },
    {
      id: 5,
      title: "Studi Kasus: Bagaimana Website Meningkatkan Penjualan Toko Online 400%",
      slug: "studi-kasus-website-meningkatkan-penjualan-400-persen",
      excerpt: "Kisah nyata bagaimana redesign website membantu klien kami meningkatkan penjualan hingga 400%.",
      content: "Klien kami, sebuah toko fashion online, mengalami peningkatan penjualan yang luar biasa...",
      category: "Studi Kasus",
      tags: ["studi kasus", "e-commerce", "penjualan", "success story"],
      image: "📈",
      published: true,
      featured: false,
      views: 1100,
      publishedAt: "2024-01-05",
      readTime: "10 menit"
    },
    {
      id: 6,
      title: "SEO untuk Website Bisnis: Panduan Lengkap untuk Pemula",
      slug: "seo-untuk-website-bisnis-panduan-lengkap",
      excerpt: "Pelajari dasar-dasar SEO untuk meningkatkan ranking website bisnis Anda di Google.",
      content: "SEO (Search Engine Optimization) adalah kunci untuk membuat website Anda ditemukan...",
      category: "Digital Marketing",
      tags: ["SEO", "Google", "ranking", "traffic"],
      image: "🔍",
      published: true,
      featured: false,
      views: 750,
      publishedAt: "2024-01-03",
      readTime: "12 menit"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'Semua' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

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
                Blog
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
            Blog CodingBoy
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tips, tutorial, dan insight terbaru seputar website, digital marketing, dan bisnis online
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Posts */}
        {activeCategory === 'Semua' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Artikel Pilihan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center text-6xl">
                    {post.image}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.publishedAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <span className="inline-block text-xs bg-blue-400/10 text-blue-400 px-2 py-1 rounded mb-3">
                      {post.category}
                    </span>
                    
                    <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h4>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-2 group">
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Posts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">
              {activeCategory === 'Semua' ? 'Semua Artikel' : `Kategori: ${activeCategory}`}
            </h3>
            <span className="text-gray-400">
              {filteredPosts.length} artikel ditemukan
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center text-4xl">
                  {post.image}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views}
                    </span>
                  </div>
                  
                  <span className="inline-block text-xs bg-blue-400/10 text-blue-400 px-2 py-1 rounded mb-3">
                    {post.category}
                  </span>
                  
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <button className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-2 group">
                    Baca Artikel
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Artikel Tidak Ditemukan</h3>
              <p className="text-gray-300 mb-6">
                Coba ubah kata kunci pencarian atau pilih kategori lain
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('Semua');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                Reset Filter
              </button>
            </div>
          )}
        </motion.section>

        {/* Newsletter Subscription */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Dapatkan Update Artikel Terbaru
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe newsletter kami untuk mendapatkan tips, tutorial, dan insight terbaru 
              seputar website dan digital marketing langsung di inbox Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
            
            <p className="text-gray-400 text-sm mt-4">
              Gratis dan bisa unsubscribe kapan saja
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}