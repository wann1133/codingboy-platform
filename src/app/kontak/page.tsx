'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  Star,
  Users,
  Award,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function Kontak() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        timeline: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      value: "+62 881-0257-41054",
      description: "Chat langsung untuk konsultasi cepat",
      color: "text-green-400",
      action: () => window.open(`https://wa.me/6288102574105?text=${encodeURIComponent("Halo CodingBoy! Saya ingin konsultasi tentang pembuatan website.")}`, '_blank')
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "hello@codingboy.id",
      description: "Untuk inquiry detail dan proposal",
      color: "text-blue-400",
      action: () => window.open('mailto:hello@codingboy.id', '_blank')
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telepon",
      value: "(021) 1234-5678",
      description: "Jam kerja: Senin-Sabtu 09:00-18:00",
      color: "text-purple-400",
      action: () => window.open('tel:+622112345678', '_blank')
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Alamat",
      value: "Jakarta Selatan, Indonesia",
      description: "Kunjungi kantor kami (by appointment)",
      color: "text-red-400",
      action: () => window.open('https://maps.google.com/?q=Jakarta+Selatan', '_blank')
    }
  ];

  const workingHours = [
    { day: "Senin - Jumat", hours: "09:00 - 18:00 WIB" },
    { day: "Sabtu", hours: "09:00 - 15:00 WIB" },
    { day: "Minggu", hours: "Tutup" }
  ];

  const whyChooseUs = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Respon Cepat",
      description: "Balasan dalam 1 jam di jam kerja"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Tim Profesional",
      description: "Developer berpengalaman 5+ tahun"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Kualitas Terjamin",
      description: "100% kepuasan klien"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Rating 5 Bintang",
      description: "Dari 200+ klien yang puas"
    }
  ];

  const faqItems = [
    {
      question: "Berapa lama waktu pengerjaan website?",
      answer: "Tergantung paket yang dipilih: Starter (3-5 hari), Business (5-7 hari), Enterprise (7-14 hari)."
    },
    {
      question: "Apakah ada garansi untuk website yang dibuat?",
      answer: "Ya, kami memberikan garansi 30 hari untuk bug fixing dan 1 tahun untuk hosting & domain."
    },
    {
      question: "Bisakah website diubah setelah selesai?",
      answer: "Tentu! Kami menyediakan CMS yang mudah digunakan dan layanan maintenance bulanan."
    },
    {
      question: "Apakah website akan SEO-friendly?",
      answer: "Semua website kami dibuat dengan standar SEO terbaik untuk membantu ranking di Google."
    }
  ];

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
                Kontak
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
            Hubungi Kami
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Siap membantu mewujudkan website impian bisnis Anda. 
            Konsultasi gratis dan respon cepat dalam 1 jam!
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={contact.action}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className={`${contact.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {contact.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{contact.title}</h3>
                <p className="text-blue-400 font-medium mb-2">{contact.value}</p>
                <p className="text-gray-300 text-sm">{contact.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Kirim Pesan</h3>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Pesan Terkirim!</h4>
                <p className="text-gray-300">
                  Terima kasih! Kami akan menghubungi Anda dalam 1 jam.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    placeholder="+62 812-3456-7890"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Layanan yang Diinginkan
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    >
                      <option value="">Pilih layanan</option>
                      <option value="starter">Paket Starter</option>
                      <option value="business">Paket Business</option>
                      <option value="enterprise">Paket Enterprise</option>
                      <option value="custom">Custom Project</option>
                      <option value="maintenance">Website Maintenance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    >
                      <option value="">Pilih budget</option>
                      <option value="1-3">Rp 1-3 Juta</option>
                      <option value="3-5">Rp 3-5 Juta</option>
                      <option value="5-10">Rp 5-10 Juta</option>
                      <option value="10+">Rp 10+ Juta</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Timeline Pengerjaan
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  >
                    <option value="">Pilih timeline</option>
                    <option value="urgent">Urgent (1-3 hari)</option>
                    <option value="normal">Normal (1-2 minggu)</option>
                    <option value="flexible">Fleksibel (2-4 minggu)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Ceritakan tentang proyek Anda *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none"
                    placeholder="Jelaskan kebutuhan website Anda, fitur yang diinginkan, referensi design, dll..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-8"
          >
            {/* Working Hours */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-400" />
                Jam Operasional
              </h3>
              <div className="space-y-3">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300">{schedule.day}</span>
                    <span className="text-white font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-400/10 border border-green-400/20 rounded-lg">
                <p className="text-green-400 text-sm">
                  💬 WhatsApp tersedia 24/7 untuk pertanyaan urgent
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Mengapa Pilih Kami?</h3>
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-blue-400 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Butuh Respon Cepat?</h3>
              <p className="text-gray-300 mb-6">
                Langsung chat WhatsApp untuk konsultasi gratis dan mendapatkan penawaran khusus!
              </p>
              <a
                href={`https://wa.me/6288102574105?text=${encodeURIComponent("Halo CodingBoy! Saya ingin konsultasi tentang pembuatan website.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Chat WhatsApp Sekarang
              </a>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Pertanyaan yang Sering Ditanyakan
            </h3>
            <p className="text-gray-300 text-lg">
              Temukan jawaban untuk pertanyaan umum seputar layanan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6"
              >
                <h4 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}