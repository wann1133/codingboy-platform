'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Users, Award, Clock, Shield, Target, Heart, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Tentang() {
  const teamMembers = [
    {
      name: "Andi Pratama",
      role: "Founder & Lead Developer",
      experience: "8+ tahun",
      skills: ["Full-stack Development", "UI/UX Design", "Project Management"],
      avatar: "AP",
      description: "Berpengalaman dalam mengembangkan 200+ website untuk berbagai industri"
    },
    {
      name: "Sari Indah",
      role: "UI/UX Designer",
      experience: "6+ tahun",
      skills: ["User Interface Design", "User Experience", "Prototyping"],
      avatar: "SI",
      description: "Spesialis dalam menciptakan desain yang user-friendly dan conversion-focused"
    },
    {
      name: "Budi Setiawan",
      role: "Backend Developer",
      experience: "7+ tahun",
      skills: ["Database Design", "API Development", "System Architecture"],
      avatar: "BS",
      description: "Expert dalam membangun sistem backend yang scalable dan secure"
    },
    {
      name: "Maya Putri",
      role: "Digital Marketing Specialist",
      experience: "5+ tahun",
      skills: ["SEO Optimization", "Content Strategy", "Analytics"],
      avatar: "MP",
      description: "Membantu website klien mencapai ranking #1 di Google untuk keyword target"
    }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Transparansi",
      description: "Harga jelas, tidak ada biaya tersembunyi. Semua proses dikomunikasikan dengan transparan."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Kualitas Tanpa Kompromi",
      description: "Setiap website dibuat dengan standar kualitas tinggi menggunakan teknologi terdepan."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer Success Focus",
      description: "Kesuksesan bisnis klien adalah prioritas utama kami. Kami tidak hanya membuat website, tapi solusi bisnis."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Inovasi Berkelanjutan",
      description: "Selalu mengikuti perkembangan teknologi terbaru untuk memberikan solusi terbaik."
    }
  ];

  const achievements = [
    {
      number: "200+",
      label: "Website Selesai",
      description: "Berbagai industri dan skala bisnis"
    },
    {
      number: "100%",
      label: "Kepuasan Klien",
      description: "Semua klien puas dengan hasil akhir"
    },
    {
      number: "5+",
      label: "Tahun Pengalaman",
      description: "Melayani UKM dan startup Indonesia"
    },
    {
      number: "24/7",
      label: "Support",
      description: "Tim support siap membantu kapan saja"
    }
  ];

  const whyChooseUs = [
    "Perusahaan lokal Indonesia yang memahami kebutuhan bisnis lokal",
    "Tim berpengalaman dengan track record 200+ website sukses",
    "Harga terjangkau khusus untuk UKM dan startup Indonesia",
    "Garansi revisi sampai puas dan support berkelanjutan",
    "Proses kerja yang transparan dengan update progress real-time",
    "Menggunakan teknologi terdepan untuk performa optimal",
    "SEO-friendly untuk membantu bisnis Anda ditemukan di Google",
    "Mobile-first design untuk pengalaman user terbaik"
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
                Tentang Kami
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tentang CodingBoy
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Kami adalah tim developer Indonesia yang berdedikasi membantu UKM dan startup 
            memiliki website profesional dengan harga terjangkau. Sejak 2019, kami telah 
            membantu 200+ bisnis meningkatkan kredibilitas dan penjualan melalui website berkualitas.
          </p>
        </motion.div>

        {/* Company Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Cerita Kami</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    CodingBoy didirikan pada tahun 2019 dengan misi sederhana: membuat website 
                    berkualitas tinggi dapat diakses oleh semua kalangan, terutama UKM dan startup 
                    yang memiliki budget terbatas.
                  </p>
                  <p>
                    Kami melihat banyak bisnis kecil yang kesulitan bersaing di era digital karena 
                    tidak memiliki website profesional. Sementara itu, jasa pembuatan website 
                    berkualitas seringkali terlalu mahal untuk mereka.
                  </p>
                  <p>
                    Dari sinilah kami berkomitmen untuk memberikan solusi website profesional 
                    dengan harga yang terjangkau, tanpa mengorbankan kualitas. Hingga kini, 
                    kami telah membantu ratusan bisnis tumbuh dan berkembang melalui kehadiran 
                    digital yang kuat.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h4 className="text-xl font-semibold text-white mb-2">Misi Kami</h4>
                <p className="text-gray-300">
                  Memberdayakan UKM dan startup Indonesia dengan website profesional 
                  yang meningkatkan kredibilitas dan penjualan bisnis mereka.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Pencapaian Kami</h3>
            <p className="text-gray-300 text-lg">
              Angka-angka yang membuktikan dedikasi kami untuk klien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {achievement.number}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{achievement.label}</h4>
                <p className="text-gray-300 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Tim Ahli Kami</h3>
            <p className="text-gray-300 text-lg">
              Bertemu dengan para profesional di balik kesuksesan proyek Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {member.avatar}
                </div>
                <h4 className="text-xl font-semibold text-white mb-1">{member.name}</h4>
                <p className="text-blue-400 text-sm mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm mb-3">{member.experience} pengalaman</p>
                <p className="text-gray-300 text-sm mb-4">{member.description}</p>
                
                <div className="space-y-1">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-block text-xs bg-white/10 text-gray-300 px-2 py-1 rounded mr-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Nilai-Nilai Kami</h3>
            <p className="text-gray-300 text-lg">
              Prinsip yang memandu setiap keputusan dan tindakan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex items-start gap-4"
              >
                <div className="text-blue-400 flex-shrink-0">
                  {value.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">{value.title}</h4>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Mengapa Memilih CodingBoy?</h3>
              <p className="text-gray-300 text-lg">
                8 alasan mengapa kami menjadi pilihan #1 untuk website bisnis Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyChooseUs.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">{reason}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Siap Berkolaborasi dengan Kami?
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Mari wujudkan website impian bisnis Anda bersama tim profesional CodingBoy
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  "Halo CodingBoy! Saya tertarik untuk konsultasi tentang pembuatan website. Bisa kita diskusi?"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all inline-flex items-center justify-center gap-2"
              >
                💬 Konsultasi Gratis
              </a>
              <Link
                href="/portfolio"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-lg text-lg font-medium transition-all"
              >
                Lihat Portfolio
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}