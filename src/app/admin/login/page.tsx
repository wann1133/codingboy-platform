'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, LockKeyhole, Mail } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.6 } },
} as const;

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Silakan isi email dan password admin.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data?.error ?? 'Login gagal. Periksa kembali kredensial Anda.');
        return;
      }

      router.replace('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#04060f] via-[#070b1a] to-[#010104] text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-36 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#6d6bff]/15 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[460px] w-[460px] rounded-full bg-[#a855f7]/10 blur-[220px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] translate-x-1/4 translate-y-1/4 rounded-full bg-[#38bdf8]/10 blur-[200px]" />
      </div>

      <main className="flex min-h-screen items-center justify-center px-4 py-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-[#080f1f]/80 p-10 shadow-[0_32px_90px_rgba(5,10,25,0.55)] backdrop-blur"
        >
          <div className="mb-8 text-center">
            <span className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
              Admin Portal
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-white">Masuk ke studio konten</h1>
          <p className="mt-2 text-sm text-slate-400">
            Gunakan kredensial admin untuk mengelola artikel, portofolio, dan insight bisnis.
          </p>
        </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-200">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="username"
                  placeholder="admin@domain.com"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 pl-10 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-200">
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  placeholder="Password rahasia"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 pl-10 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(99,102,241,0.35)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memproses
                </>
              ) : (
                'Masuk Admin'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Login ini hanya untuk tim internal CodingBoy. Pastikan kredensial sudah dikonfigurasi di environment server.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
