'use client';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  MessageCircle,
  FileText,
  CreditCard,
  Settings,
  BarChart3
} from 'lucide-react';

export default function Dashboard() {

  const projects = [
    {
      id: 1,
      name: "Website Warung Makan Sederhana",
      package: "Paket Business",
      status: "In Progress",
      progress: 75,
      deadline: "2024-01-15",
      color: "blue"
    },
    {
      id: 2,
      name: "Landing Page Boutique Fashion",
      package: "Paket Starter",
      status: "Completed",
      progress: 100,
      deadline: "2024-01-10",
      color: "green"
    },
    {
      id: 3,
      name: "E-commerce Toko Online",
      package: "Paket Enterprise",
      status: "Review",
      progress: 90,
      deadline: "2024-01-20",
      color: "yellow"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-400 bg-green-400/10';
      case 'In Progress':
        return 'text-blue-400 bg-blue-400/10';
      case 'Review':
        return 'text-yellow-400 bg-yellow-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      case 'Review':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CodingBoy
              </h1>
              <span className="ml-4 text-gray-400">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                data-snappy-cta
                href="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors inline-block"
              >
                Beranda
              </a>
              {/* Auth disabled */}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Selamat datang! 👋</h2>
          <p className="text-gray-300">
            Kelola proyek website Anda dan pantau progress pengerjaan
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Proyek",
              value: "3",
              icon: <Globe className="w-6 h-6" />,
              color: "blue"
            },
            {
              title: "Sedang Berjalan",
              value: "1",
              icon: <Clock className="w-6 h-6" />,
              color: "yellow"
            },
            {
              title: "Selesai",
              value: "1",
              icon: <CheckCircle className="w-6 h-6" />,
              color: "green"
            },
            {
              title: "Review",
              value: "1",
              icon: <AlertCircle className="w-6 h-6" />,
              color: "purple"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`text-${stat.color}-400`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Proyek Saya</h3>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Proyek Baru
                </button>
              </div>

              <div className="space-y-4">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-medium">{project.name}</h4>
                        <p className="text-gray-400 text-sm">{project.package}</p>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)}
                        {project.status}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r from-${project.color}-600 to-${project.color}-400 h-2 rounded-full transition-all`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Deadline: {project.deadline}</span>
                      <div className="flex items-center gap-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Aksi Cepat</h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Support
                </button>
                <button className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 p-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Order Proyek Baru
                </button>
                <button className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 p-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Download Invoice
                </button>
              </div>
            </div>

            {/* Account Menu */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Akun</h3>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
                  <Settings className="w-4 h-4" />
                  Pengaturan
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
                  <CreditCard className="w-4 h-4" />
                  Pembayaran
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
                  <BarChart3 className="w-4 h-4" />
                  Riwayat
                </a>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Butuh Bantuan?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Tim support kami siap membantu Anda 24/7
              </p>
              <a
                href="https://wa.me/62881025741054"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
