'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PrimaryNav from '@/components/PrimaryNav';
import { useLanguage } from '@/components/LanguageContext';
import { 
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

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
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      // You might want to show an error message to the user
    }
  };

  const contactInfo = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      value: "+62 856-0940-8506",
      description: "Chat langsung untuk konsultasi cepat",
      color: "text-green-400",
      action: () =>
        window.open(
          `https://wa.me/6285609408506?text=${encodeURIComponent("Halo CodingBoy! Saya ingin konsultasi tentang pembuatan website.")}`,
          '_blank',
        )
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "codingboy969@gmail.com",
      description: "Untuk inquiry detail dan proposal",
      color: "text-blue-400",
      action: () => window.open('mailto:codingboy969@gmail.com', '_blank')
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telepon",
      value: "+62 815-3279-7240",
      description: "Jam kerja: Senin-Sabtu 09:00-18:00",
      color: "text-purple-400",
      action: () => window.open('tel:+6285609408506', '_blank')
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "lynk.id",
      value: "lynk.id/codingboy",
      description: "Lihat semua link & profil digital kami",
      color: "text-red-400",
      action: () => window.open('https://lynk.id/codingboy', '_blank')
    }
  ];

  const workingHours = [
    { day: "Senin - Jumat", hours: "09:00 - 18:00 WIB" },
    { day: "Sabtu", hours: "09:00 - 15:00 WIB" },
    { day: "Minggu", hours: "09:00 - 15:00 WIB" }
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
    <div className="relative min-h-screen overflow-hidden bg-[#05070d] text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#6d6bff]/20 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-[420px] w-[420px] rounded-full bg-[#a855f7]/15 blur-[200px]" />
        <div className="absolute bottom-0 right-0 h-[340px] w-[340px] translate-x-1/4 translate-y-1/4 rounded-full bg-[#0ea5e9]/10 blur-[180px]" />
      </div>

      <PrimaryNav labels={navLabels} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12 overflow-hidden rounded-3xl border border-[#1b253a] bg-gradient-to-br from-[#0f172a]/85 to-[#050a18]/95 p-10 text-center shadow-[0_30px_80px_rgba(5,10,25,0.6)]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-32 w-[120%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#6d6bff]/20 to-transparent blur-2xl" />
            <div className="absolute bottom-0 right-1/3 h-24 w-24 rounded-full bg-[#a855f7]/20 blur-3xl" />
          </div>
          <span className="relative inline-flex items-center justify-center rounded-full border border-[#273149] bg-[#080f1f]/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[#8b5cf6]">
            Let&rsquo;s Talk
          </span>
          <h2 className="relative mt-6 text-4xl md:text-5xl font-bold text-white">
            Hubungi Kami
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Siap membantu mewujudkan website impian bisnis Anda. Konsultasi gratis dan respon cepat dalam 1 jam!
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={contact.action}
                className="group cursor-pointer rounded-2xl border border-[#1f2b42] bg-[#0b1424]/70 p-6 shadow-[0_18px_40px_rgba(5,10,25,0.35)] transition-all hover:border-[#6d6bff] hover:shadow-[0_22px_60px_rgba(99,102,241,0.35)]"
              >
                <div className={`${contact.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {contact.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{contact.title}</h3>
                <p className="text-[#8b5cf6] font-medium mb-2">{contact.value}</p>
                <p className="text-slate-300 text-sm">{contact.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-3xl border border-[#1f2b42] bg-[#080f1f]/75 p-8 shadow-[0_24px_70px_rgba(5,10,25,0.5)]"
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
                      className="w-full rounded-lg border border-[#1f2b42] bg-[#050c1a]/80 px-4 py-3 text-white placeholder-slate-400 transition focus:border-[#6d6bff] focus:outline-none focus:ring-1 focus:ring-[#6d6bff]"
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
                      className="w-full rounded-lg border border-[#1f2b42] bg-[#050c1a]/80 px-4 py-3 text-white placeholder-slate-400 transition focus:border-[#6d6bff] focus:outline-none focus:ring-1 focus:ring-[#6d6bff]"
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
                    className="w-full rounded-lg border border-[#1f2b42] bg-[#050c1a]/80 px-4 py-3 text-white placeholder-slate-400 transition focus:border-[#6d6bff] focus:outline-none focus:ring-1 focus:ring-[#6d6bff]"
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
                      className="w-full rounded-lg border border-[#1f2b42] bg-[#050c1a]/80 px-4 py-3 text-white transition focus:border-[#6d6bff] focus:outline-none focus:ring-1 focus:ring-[#6d6bff]"
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
                      className="w-full rounded-lg border border-[#1f2b42] bg-[#050c1a]/80 px-4 py-3 text-white transition focus:border-[#6d6bff] focus:outline-none focus:ring-1 focus:ring-[#6d6bff]"
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
                    className="w-full rounded-lg border border-[#1f2b42] bg-[#050c1a]/80 px-4 py-3 text-white transition focus:border-[#6d6bff] focus:outline-none focus:ring-1 focus:ring-[#6d6bff]"
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
                    className="w-full resize-none rounded-lg border border-[#1f2b42] bg-[#050c1a]/80 px-4 py-3 text-white placeholder-slate-400 transition focus:border-[#6d6bff] focus:outline-none focus:ring-1 focus:ring-[#6d6bff]"
                    placeholder="Jelaskan kebutuhan website Anda, fitur yang diinginkan, referensi design, dll..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d6bff] to-[#a855f7] py-4 px-6 text-base font-semibold text-white shadow-[0_18px_45px_rgba(104,97,255,0.45)] transition-all hover:shadow-[0_22px_55px_rgba(104,97,255,0.55)] disabled:from-[#1f273d] disabled:to-[#1f273d] disabled:opacity-70"
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
            <div className="rounded-2xl border border-[#1f2b42] bg-[#080f1f]/75 p-8 shadow-[0_18px_45px_rgba(5,10,25,0.45)]">
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
              <div className="mt-6 rounded-xl border border-[#1f402c] bg-[#0b2418]/70 p-4">
                <p className="text-sm text-emerald-300">
                  WhatsApp tersedia 24/7 untuk pertanyaan urgent
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="rounded-2xl border border-[#1f2b42] bg-[#080f1f]/75 p-8 shadow-[0_18px_45px_rgba(5,10,25,0.45)]">
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
            <div className="rounded-2xl border border-[#1f2b42] bg-gradient-to-br from-[#0b2418]/85 via-[#0a1624]/85 to-[#0f1a2d]/85 p-8 shadow-[0_20px_60px_rgba(4,12,30,0.5)]">
              <h3 className="text-xl font-bold text-white mb-4">Butuh Respon Cepat?</h3>
              <p className="text-gray-300 mb-6">
                Langsung chat WhatsApp untuk konsultasi gratis dan mendapatkan penawaran khusus!
              </p>
              <a
                href={`https://wa.me/6285609408506?text=${encodeURIComponent("Halo CodingBoy! Saya ingin konsultasi tentang pembuatan website.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 py-3 px-6 text-sm font-semibold text-[#04110c] transition-all hover:shadow-[0_18px_40px_rgba(16,185,129,0.45)]"
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
                className="rounded-2xl border border-[#1f2b42] bg-[#080f1f]/70 p-6 shadow-[0_16px_40px_rgba(5,10,25,0.4)] hover:border-[#6d6bff] hover:shadow-[0_20px_52px_rgba(99,102,241,0.32)]"
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


