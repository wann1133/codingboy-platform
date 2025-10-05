'use client';

import type { FormEvent } from 'react';
import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { AlertCircle, ArrowLeft, CircleCheck, NotebookPen, Sparkles, Tag } from 'lucide-react';

import {
  BlogFormState,
  BlogStatus,
  blogCategories,
  defaultBlogForm,
} from '../../../shared';

const parseTagsValue = (raw: unknown): string => {
  if (Array.isArray(raw)) {
    return raw.filter((tag): tag is string => typeof tag === 'string').join(', ');
  }

  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((tag): tag is string => typeof tag === 'string').join(', ');
      }
    } catch {
      // ignore JSON parse errors and fallback to raw string
    }

    return raw;
  }

  return '';
};

const mapBlogResponseToForm = (payload: unknown): BlogFormState => {
  const fallback = defaultBlogForm();

  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  const post = payload as Record<string, unknown>;

  const initialDate =
    typeof post.publishedAt === 'string'
      ? post.publishedAt
      : typeof post.createdAt === 'string'
      ? post.createdAt
      : fallback.publishedAt;

  return {
    ...fallback,
    title: typeof post.title === 'string' ? post.title : fallback.title,
    summary: typeof post.excerpt === 'string' ? post.excerpt : fallback.summary,
    content: typeof post.content === 'string' ? post.content : fallback.content,
    category: typeof post.category === 'string' ? post.category : fallback.category,
    image: typeof post.image === 'string' ? post.image : fallback.image,
    tags: parseTagsValue(post.tags) || fallback.tags,
    readTime: typeof post.readTime === 'string' ? post.readTime : fallback.readTime,
    status:
      post.published === true
        ? 'published'
        : post.published === false
        ? 'draft'
        : fallback.status,
    featured:
      post.featured === true
        ? true
        : post.featured === false
        ? false
        : fallback.featured,
    publishedAt: initialDate.slice(0, 10),
  };
};

const EditBlogPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params);
  const [form, setForm] = useState<BlogFormState>(defaultBlogForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post.');
        }
        const data = await response.json();
        setForm(mapBlogResponseToForm(data.post));
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred.');
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleChange = (field: keyof BlogFormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = form.title.trim();
    const trimmedSummary = form.summary.trim();
    const trimmedContent = form.content.trim();

    if (!trimmedTitle || !trimmedSummary || !trimmedContent) {
      setErrorMessage('Judul, ringkasan, dan konten wajib diisi.');
      return;
    }

    setErrorMessage(null);
    setNotice(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: trimmedTitle,
          summary: trimmedSummary,
          content: trimmedContent,
          category: form.category,
          image: form.image.trim() || null,
          tags: form.tags,
          readTime: form.readTime.trim() || null,
          status: form.status,
          featured: form.featured,
          publishedAt: form.publishedAt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error ?? 'Gagal memperbarui artikel.');
        return;
      }

      setNotice('Artikel berhasil diperbarui. Mengarahkan ke daftar blog...');
      setTimeout(() => {
        router.push('/admin?section=blog');
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
    router.push('/admin?section=blog');
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
              <NotebookPen className="h-3.5 w-3.5" />
              Blog Studio
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-white">Edit artikel</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Perbarui konten blog dan metadata.
            </p>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur"
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="blog-title">
                  Judul artikel
                </label>
                <input
                  id="blog-title"
                  value={form.title}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('title', event.target.value)}
                  placeholder="Contoh: Blueprint strategi konten Q1"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="blog-date">
                  Tanggal publish
                </label>
                <input
                  type="date"
                  id="blog-date"
                  value={form.publishedAt ? new Date(form.publishedAt).toISOString().split('T')[0] : ''}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('publishedAt', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="blog-category">
                  Kategori utama
                </label>
                <select
                  id="blog-category"
                  value={form.category}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('category', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {blogCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="blog-status">
                  Status konten
                </label>
                <select
                  id="blog-status"
                  value={form.status}
                  disabled={isSubmitting}
                  onChange={(event) =>
                    handleChange('status', event.target.value as BlogStatus)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="blog-summary">
                Ringkasan singkat
              </label>
              <textarea
                id="blog-summary"
                value={form.summary}
                disabled={isSubmitting}
                onChange={(event) => handleChange('summary', event.target.value)}
                rows={3}
                placeholder="Tulis fokus utama artikel untuk membantu pembaca dan SEO."
                className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="blog-content">
                Konten utama
              </label>
              <textarea
                id="blog-content"
                value={form.content}
                disabled={isSubmitting}
                onChange={(event) => handleChange('content', event.target.value)}
                rows={8}
                placeholder="Masukkan konten lengkap artikel (markdown/html sederhana)."
                className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="blog-readTime">
                  Estimasi baca
                </label>
                <input
                  id="blog-readTime"
                  value={form.readTime}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('readTime', event.target.value)}
                  placeholder="5 menit"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="blog-cover">
                  Visual cover
                </label>
                <input
                  id="blog-cover"
                  value={form.image}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('image', event.target.value)}
                  placeholder="Contoh: gradient-nebula.png"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="blog-tags">
                  Tags (pisahkan dengan koma)
                </label>
                <div className="relative">
                  <Tag className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    id="blog-tags"
                    value={form.tags || ''}
                    disabled={isSubmitting}
                    onChange={(event) => handleChange('tags', event.target.value)}
                    placeholder="design system, onboarding, ux research"
                    className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 pl-10 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.featured}
                  disabled={isSubmitting}
                  onChange={(event) => handleChange('featured', event.target.checked)}
                  className="h-4 w-4 rounded border border-white/10 bg-[#0b1224]/70 text-[#6366f1] focus:ring-[#6366f1]/60"
                />
                Tandai sebagai artikel highlight
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
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(99,102,241,0.35)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Sparkles className="h-4 w-4" />
                  {isSubmitting ? 'Menyimpan...' : 'Simpan perubahan'}
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

export default EditBlogPage;
