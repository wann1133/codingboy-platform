'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppFloatProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppFloat({ 
  phoneNumber = "+62881025741054",
  defaultMessage = "Halo CodingBoy! Saya tertarik dengan layanan pembuatan website. Bisa konsultasi gratis?"
}: WhatsAppFloatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Tampilkan tombol hanya setelah melewati section hero (#beranda)
  useEffect(() => {
    const hero = document.querySelector('#beranda');

    // Jika tidak ada section hero (misal bukan halaman utama), tampilkan langsung
    if (!hero) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Saat hero tidak terlihat sama sekali di viewport, tampilkan tombol
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const quickMessages = [
    "Halo! Saya ingin konsultasi tentang pembuatan website",
    "Berapa harga untuk website company profile?",
    "Saya tertarik dengan paket Business, bisa dijelaskan?",
    "Berapa lama waktu pengerjaan website?",
    "Apakah ada garansi untuk website yang dibuat?"
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* WhatsApp Float Container */}
      <div className="chaty-outer-forms chaty-popup-whatsapp-form chaty-form-0 pos-right active">
        {/* Chat Form */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="chaty-whatsapp-form fixed bottom-24 right-4 md:right-6 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#128C7E] p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">CodingBoy Support</h3>
                      <p className="text-xs text-green-100">Biasanya membalas dalam beberapa menit</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Area */}
              <div className="h-72 overflow-y-auto bg-[#efeae2] p-3 chat-messages">
                <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-sm text-gray-800 shadow">
                  👋 Halo! Selamat datang di CodingBoy.
                  <br />
                  Ada yang bisa kami bantu untuk website bisnis Anda?
                  <div className="text-[10px] text-gray-500 mt-1 text-right">Sekarang</div>
                </div>
              </div>

              {/* Quick Messages */}
              <div className="px-3 py-2 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {quickMessages.map((quickMsg, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(quickMsg)}
                      className="shrink-0 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs text-gray-700"
                    >
                      {quickMsg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-3 border-t border-gray-200 bg-white">
                <div className="flex items-end gap-2">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onInput={(e) => { const el = e.currentTarget; el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 120) + 'px'; }}
                    placeholder={defaultMessage}
                    spellCheck={false}
                    className="flex-1 max-h-28 min-h-[40px] resize-none bg-gray-100 border border-gray-200 rounded-2xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#128C7E] focus:ring-1 focus:ring-[#128C7E]/40"
                    rows={1}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`rounded-full w-10 h-10 flex items-center justify-center transition-colors ${message.trim() ? 'bg-[#25D366] hover:bg-[#1ebe57] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Float Button */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="chaty-whatsapp-btn-form fixed bottom-6 right-4 md:right-6 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="w-6 h-6" />
                {/* Notification Dot */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full notification-badge"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && isVisible && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 3 }}
              className="fixed bottom-8 right-20 md:right-24 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg z-40 whitespace-nowrap pointer-events-none"
            >
              Ada yang bisa kami bantu?
              <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Online Status Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-4 right-16 md:right-20 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-40 pointer-events-none"
        >
          Online
        </motion.div>
      </div>
    </>
  );
}