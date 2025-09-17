'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  DollarSign,
  Eye,
  Calendar,
  Filter,
  Search,
  Download,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
// Auth disabled: removing Clerk usage

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: 'Total Inquiries',
      value: '156',
      change: '+12%',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'text-blue-400'
    },
    {
      title: 'Active Projects',
      value: '23',
      change: '+8%',
      icon: <Users className="w-6 h-6" />,
      color: 'text-green-400'
    },
    {
      title: 'Revenue This Month',
      value: 'Rp 45.2M',
      change: '+15%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-purple-400'
    },
    {
      title: 'Conversion Rate',
      value: '68%',
      change: '+5%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-yellow-400'
    }
  ];

  const inquiries = [
    {
      id: 1,
      name: 'Budi Santoso',
      email: 'budi@example.com',
      phone: '+62 812-3456-7890',
      service: 'Paket Business',
      budget: 'Rp 3-5 Juta',
      message: 'Saya butuh website untuk toko online makanan...',
      status: 'NEW',
      createdAt: '2024-01-15 10:30',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Sari Dewi',
      email: 'sari@boutique.com',
      phone: '+62 813-9876-5432',
      service: 'Paket Enterprise',
      budget: 'Rp 5-10 Juta',
      message: 'Butuh e-commerce untuk fashion brand...',
      status: 'CONTACTED',
      createdAt: '2024-01-14 15:45',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Ahmad Rahman',
      email: 'ahmad@konsultan.id',
      phone: '+62 814-5555-1234',
      service: 'Paket Starter',
      budget: 'Rp 1-3 Juta',
      message: 'Landing page untuk jasa konsultasi...',
      status: 'QUOTED',
      createdAt: '2024-01-13 09:15',
      priority: 'low'
    },
    {
      id: 4,
      name: 'Maya Putri',
      email: 'maya@clinic.com',
      phone: '+62 815-7777-8888',
      service: 'Custom Project',
      budget: 'Rp 10+ Juta',
      message: 'Sistem booking untuk klinik kesehatan...',
      status: 'CONVERTED',
      createdAt: '2024-01-12 14:20',
      priority: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      case 'CONTACTED':
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
      case 'QUOTED':
        return 'bg-purple-400/10 text-purple-400 border-purple-400/20';
      case 'CONVERTED':
        return 'bg-green-400/10 text-green-400 border-green-400/20';
      case 'CLOSED':
        return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
      default:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'NEW':
        return <AlertCircle className="w-4 h-4" />;
      case 'CONTACTED':
        return <Clock className="w-4 h-4" />;
      case 'QUOTED':
        return <Eye className="w-4 h-4" />;
      case 'CONVERTED':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || inquiry.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Auth disabled: unrestricted access for now

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CodingBoy Admin
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">Welcome, Admin!</span>
              <a 
                data-snappy-cta
                href="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors inline-block"
              >
                Home
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
          <p className="text-gray-300">Kelola inquiries dan monitor performa bisnis</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={stat.color}>
                  {stat.icon}
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'inquiries', label: 'Inquiries' },
              { id: 'projects', label: 'Projects' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6"
          >
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
              >
                <option value="all">All Status</option>
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUOTED">Quoted</option>
                <option value="CONVERTED">Converted</option>
                <option value="CLOSED">Closed</option>
              </select>
              
              <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>

            {/* Inquiries Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Client</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Service</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Budget</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(inquiry.priority)}`}></div>
                          <div>
                            <p className="text-white font-medium">{inquiry.name}</p>
                            <p className="text-gray-400 text-sm">{inquiry.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-300">{inquiry.service}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-300">{inquiry.budget}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(inquiry.status)}`}>
                          {getStatusIcon(inquiry.status)}
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-300 text-sm">{inquiry.createdAt}</span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredInquiries.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No inquiries found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Recent Inquiries */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Inquiries</h3>
              <div className="space-y-4">
                {inquiries.slice(0, 5).map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(inquiry.priority)}`}></div>
                      <div>
                        <p className="text-white font-medium">{inquiry.name}</p>
                        <p className="text-gray-400 text-sm">{inquiry.service}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-all text-left">
                  Create New Project
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition-all text-left">
                  Send Quote Template
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-medium transition-all text-left">
                  Generate Report
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-lg font-medium transition-all text-left">
                  Bulk Email Clients
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
