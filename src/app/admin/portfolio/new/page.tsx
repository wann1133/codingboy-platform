'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import {
  AlertCircle,
  ArrowLeft,
  CircleCheck,
  Globe,
  Image as ImageIcon,
  Layers3,
  Link as LinkIcon,
  Sparkles,
} from 'lucide-react';

import {
  PortfolioFormState,
  ProjectStatus,
  defaultPortfolioForm,
  projectCategories,
} from '../../shared';

const CreatePortfolioPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<PortfolioFormState>(defaultPortfolioForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: keyof PortfolioFormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = form.title.trim();
    const trimmedDescription = form.description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      setErrorMessage('Nama proyek dan deskripsi wajib diisi.');
      return;
    }

    setErrorMessage(null);
    setNotice(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: trimmedTitle,
          description: trimmedDescription,
          category: form.category,
          image: form.image.trim() || null,
          url: form.url.trim() || null,
          duration: form.duration.trim() || '7 hari',
          client: form.client.trim() || null,
          testimonial: form.testimonial.trim() || null,
          rating: form.rating,
          features: form.features,
          featured: form.featured,
          active: form.active,
          status: form.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error ?? 'Gagal menyimpan portofolio.');
        return;
      }

      setNotice('Showcase baru berhasil dibuat. Mengarahkan ke daftar portofolio...');
      setTimeout(() => {
        router.push('/admin?section=portfolio');
        router.refresh();
      }, 800);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Terjadi kesalahan saat menghubungi server.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin?section=portfolio');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04060f] via-[#070b1a] to-[#010104] py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6">
        <header className="flex flex-col gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke dashboard
          </button>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              <Layers3 className="h-3.5 w-3.5" />
              Portofolio
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-white">Tambah showcase baru</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Dokumentasikan studi kasus terbaru lengkap dengan highlight stack dan status proyek.
            </p>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/12 via-white/6 to-transparent p-8 backdrop-blur"
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="project-title">
                Nama proyek
              </label>
              <input
                id="project-title"
                value={form.title}
                disabled={isSubmitting}
                onChange={(event) => handleChange('title', event.target.value)}
                placeholder="Contoh: Revamp dashboard SaaS"
                className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="project-description">
                Deskripsi proyek
              </label>
              <textarea
                id="project-description"
                value={form.description}
                disabled={isSubmitting}
                onChange={(event) => handleChange('description', event.target.value)}
                rows={4}
                placeholder="Ceritakan tujuan, solusi, dan impact proyek."
                className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="project-category">
                  Kategori proyek
                </label>
                <select
                  id="project-category"
                  value={form.category}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('category', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {projectCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="project-duration">
                  Durasi pengerjaan
                </label>
                <input
                  id="project-duration"
                  value={form.duration}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('duration', event.target.value)}
                  placeholder="Contoh: 6 minggu"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="project-client">
                  Nama klien
                </label>
                <input
                  id="project-client"
                  value={form.client}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('client', event.target.value)}
                  placeholder="Contoh: AlphaCorp"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="project-rating">
                  Rating (1-5)
                </label>
                <input
                  id="project-rating"
                  value={form.rating}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('rating', event.target.value)}
                  placeholder="5"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="project-testimonial">
                Testimoni klien
              </label>
              <textarea
                id="project-testimonial"
                value={form.testimonial}
                disabled={isSubmitting}
                onChange={(event) => handleChange('testimonial', event.target.value)}
                rows={3}
                placeholder="Komentar atau testimoni singkat dari klien."
                className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="project-image">
                  Visual preview
                </label>
                <div className="relative">
                  <ImageIcon className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    id="project-image"
                    value={form.image}
                    disabled={isSubmitting}
                    onChange={(event) => handleChange('image', event.target.value)}
                    placeholder="Contoh: dashboard-alpha.png"
                    className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 pl-10 text-sm text-white placeholder:text-slate-500 focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="project-link">
                  URL proyek
                </label>
                <div className="relative">
                  <LinkIcon className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    id="project-link"
                    value={form.url}
                    disabled={isSubmitting}
                    onChange={(event) => handleChange('url', event.target.value)}
                    placeholder="https://"
                    className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 pl-10 text-sm text-white placeholder:text-slate-500 focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="project-features">
                Highlight & stack (pisahkan dengan koma)
              </label>
              <div className="relative">
                <Globe className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  id="project-features"
                  value={form.features}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('features', event.target.value)}
                  placeholder="next.js, tailwind, cms, analytics"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 pl-10 text-sm text-white placeholder:text-slate-500 focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="project-status">
                  Status proyek
                </label>
                <select
                  id="project-status"
                  value={form.status}
                  disabled={isSubmitting}
                  onChange={(event) =>
                    handleChange('status', event.target.value as ProjectStatus)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="ongoing">Sedang berjalan</option>
                  <option value="completed">Selesai</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <label className="flex items-center gap-3 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={form.active}
                    disabled={isSubmitting}
                    onChange={(event) => handleChange('active', event.target.checked)}
                    className="h-4 w-4 rounded border border-white/10 bg-[#0b1224]/70 text-[#a855f7] focus:ring-[#a855f7]/60"
                  />
                  Tampilkan di listing publik
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.featured}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('featured', event.target.checked)}
                  className="h-4 w-4 rounded border border-white/10 bg-[#0b1224]/70 text-[#a855f7] focus:ring-[#a855f7]/60"
                />
                Tampilkan sebagai highlight homepage
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500/40 hover:text-white"
                >
                  Batalkan
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#ec4899] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(168,85,247,0.35)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Sparkles className="h-4 w-4" />
                  {isSubmitting ? 'Menyimpan...' : 'Simpan showcase'}
                </button>
              </div>
            </div>

            {notice && (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200">
                <CircleCheck className="h-4 w-4" />
                {notice}
              </div>
            )}

            {errorMessage && (
              <div className="flex items-center gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-200">
                <AlertCircle className="h-4 w-4" />
                {errorMessage}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePortfolioPage;
