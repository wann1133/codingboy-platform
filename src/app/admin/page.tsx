'use client';

import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { defaultBlogEntries, defaultPortfolioEntries } from '@/lib/default-content';
import {
  Calendar,
  CircleCheck,
  Globe,
  Image as ImageIcon,
  LayoutDashboard,
  Layers3,
  Link as LinkIcon,
  NotebookPen,
  Rocket,
  Sparkles,
  Star,
  Tag,
} from 'lucide-react';

const formatDate = (value: string | null | undefined) => {
  if (!value) {
    return 'Belum ditetapkan';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return 'Belum ditetapkan';
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
};

const slugify = (raw: string) =>
  raw
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

type BlogStatus = 'draft' | 'published';
type ProjectStatus = 'ongoing' | 'completed';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  image: string | null;
  tags: string[];
  readTime: string | null;
  published: boolean;
  featured: boolean;
  views: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: string | null;
  url: string | null;
  features: string[];
  duration: string;
  client: string | null;
  testimonial: string | null;
  rating: number | null;
  featured: boolean;
  active: boolean;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

type BlogFormState = {
  title: string;
  summary: string;
  content: string;
  category: string;
  publishedAt: string;
  readTime: string;
  tags: string;
  status: BlogStatus;
  featured: boolean;
  image: string;
};

const fallbackAdminBlogPosts: BlogPost[] = defaultBlogEntries.map((entry, index) => ({
  id: `fallback-blog-${index}`,
  title: entry.title,
  slug: entry.slug,
  excerpt: entry.excerpt ?? null,
  content: entry.content,
  category: entry.category,
  image: entry.image ?? null,
  tags: entry.tags,
  readTime: entry.readTime,
  published: true,
  featured: entry.featured,
  views: entry.views,
  publishedAt: entry.publishedAt.toISOString(),
  createdAt: entry.publishedAt.toISOString(),
  updatedAt: entry.publishedAt.toISOString(),
}));

const fallbackAdminPortfolio: PortfolioItem[] = defaultPortfolioEntries.map((entry, index) => ({
  id: `fallback-portfolio-${index}`,
  title: entry.title,
  slug: entry.slug,
  description: entry.description,
  category: entry.category,
  image: entry.image ?? null,
  url: entry.url ?? null,
  features: entry.features,
  duration: entry.duration,
  client: entry.client ?? null,
  testimonial: entry.testimonial ?? null,
  rating: entry.rating ?? 5,
  featured: entry.featured,
  active: entry.active ?? true,
  status: entry.status,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

type PortfolioFormState = {
  title: string;
  description: string;
  category: string;
  image: string;
  url: string;
  duration: string;
  client: string;
  testimonial: string;
  rating: string;
  features: string;
  status: ProjectStatus;
  featured: boolean;
  active: boolean;
};

const blogCategories = [
  'Produk & Design',
  'Digital Marketing',
  'Growth & Analytics',
  'Teknologi',
  'Kisah Klien',
] as const;

const projectCategories = [
  'Web Application',
  'Corporate Website',
  'Landing Page',
  'Booking Platform',
  'E-Commerce',
  'Design System',
] as const;

const defaultBlogForm = (): BlogFormState => ({
  title: '',
  summary: '',
  content: '',
  category: blogCategories[0],
  publishedAt: new Date().toISOString().slice(0, 10),
  readTime: '5 menit',
  tags: '',
  status: 'draft',
  featured: false,
  image: '',
});

const defaultPortfolioForm = (): PortfolioFormState => ({
  title: '',
  description: '',
  category: projectCategories[0],
  image: '',
  url: '',
  duration: '7 hari',
  client: '',
  testimonial: '',
  rating: '5',
  features: '',
  status: 'ongoing',
  featured: false,
  active: true,
});

const normalizeBlogPost = (raw: unknown): BlogPost => {
  const post = typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {};

  const title = typeof post.title === 'string' ? post.title : 'Untitled';
  const slugValue = typeof post.slug === 'string' ? post.slug : slugify(title);
  const excerpt = typeof post.excerpt === 'string' ? post.excerpt : null;
  const content = typeof post.content === 'string' ? post.content : '';
  const category = typeof post.category === 'string' ? post.category : 'Lainnya';
  const image = typeof post.image === 'string' ? post.image : null;
  const tags = Array.isArray(post.tags) ? (post.tags as string[]) : [];
  const readTime = typeof post.readTime === 'string' ? post.readTime : null;
  const published = typeof post.published === 'boolean' ? post.published : Boolean(post.published);
  const featured = typeof post.featured === 'boolean' ? post.featured : Boolean(post.featured);
  const viewsValue =
    typeof post.views === 'number'
      ? post.views
      : Number.parseInt(typeof post.views === 'string' ? post.views : '0', 10) || 0;
  const publishedAt = typeof post.publishedAt === 'string' ? post.publishedAt : null;
  const createdAt = typeof post.createdAt === 'string' ? post.createdAt : new Date().toISOString();
  const updatedAt = typeof post.updatedAt === 'string' ? post.updatedAt : new Date().toISOString();

  return {
    id: typeof post.id === 'string' ? post.id : crypto.randomUUID(),
    title,
    slug: slugValue,
    excerpt,
    content,
    category,
    image,
    tags,
    readTime,
    published,
    featured,
    views: viewsValue,
    publishedAt,
    createdAt,
    updatedAt,
  };
};

const normalizePortfolioItem = (raw: unknown): PortfolioItem => {
  const item = typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {};

  const title = typeof item.title === 'string' ? item.title : 'Untitled Project';
  const slugValue = typeof item.slug === 'string' ? item.slug : slugify(title);
  const description = typeof item.description === 'string' ? item.description : '';
  const category = typeof item.category === 'string' ? item.category : 'General';
  const image = typeof item.image === 'string' ? item.image : null;
  const url = typeof item.url === 'string' ? item.url : null;
  const features = Array.isArray(item.features) ? (item.features as string[]) : [];
  const duration = typeof item.duration === 'string' ? item.duration : '7 hari';
  const client = typeof item.client === 'string' ? item.client : null;
  const testimonial = typeof item.testimonial === 'string' ? item.testimonial : null;
  const ratingValue =
    typeof item.rating === 'number'
      ? item.rating
      : Number.parseInt(typeof item.rating === 'string' ? item.rating : '0', 10) || null;
  const status = item.status === 'completed' ? 'completed' : 'ongoing';
  const featured = typeof item.featured === 'boolean' ? item.featured : Boolean(item.featured);
  const active = item.active !== false;
  const createdAt = typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString();
  const updatedAt = typeof item.updatedAt === 'string' ? item.updatedAt : new Date().toISOString();

  return {
    id: typeof item.id === 'string' ? item.id : crypto.randomUUID(),
    title,
    slug: slugValue,
    description,
    category,
    image,
    url,
    features,
    duration,
    client,
    testimonial,
    rating: ratingValue,
    featured,
    active,
    status,
    createdAt,
    updatedAt,
  };
};

export default function AdminContentStudio() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<'overview' | 'blog' | 'portfolio'>('overview');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [blogForm, setBlogForm] = useState<BlogFormState>(defaultBlogForm);
  const [portfolioForm, setPortfolioForm] = useState<PortfolioFormState>(defaultPortfolioForm);
  const [blogNotice, setBlogNotice] = useState<string | null>(null);
  const [projectNotice, setProjectNotice] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState({ blog: false, portfolio: false, logout: false });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setFetchError(null);
      try {
        const [blogRes, portfolioRes] = await Promise.all([
          fetch('/api/admin/blogs', { cache: 'no-store' }),
          fetch('/api/admin/portfolios', { cache: 'no-store' }),
        ]);

        if (blogRes.status === 401 || portfolioRes.status === 401) {
          if (!isMounted) return;
          router.replace('/admin/login');
          return;
        }

        if (!blogRes.ok) {
          const blogError = await blogRes.json().catch(() => null);
          throw new Error(blogError?.error ?? 'Gagal memuat data blog.');
        }

        if (!portfolioRes.ok) {
          const portfolioError = await portfolioRes.json().catch(() => null);
          throw new Error(portfolioError?.error ?? 'Gagal memuat data portofolio.');
        }

        const blogData = await blogRes.json();
        const portfolioData = await portfolioRes.json();

        if (!isMounted) return;

        setBlogPosts(Array.isArray(blogData.posts) ? blogData.posts.map(normalizeBlogPost) : []);
        setPortfolioItems(
          Array.isArray(portfolioData.portfolios)
            ? portfolioData.portfolios.map(normalizePortfolioItem)
            : [],
        );
      } catch (error) {
        if (!isMounted) return;
        setBlogPosts(fallbackAdminBlogPosts);
        setPortfolioItems(fallbackAdminPortfolio);
        setFetchError(error instanceof Error ? error.message : 'Gagal memuat data admin.');
      } finally {
        // no-op
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const metrics = useMemo(() => {
    const publishedBlog = blogPosts.filter((post) => post.published).length;
    const draftBlog = blogPosts.length - publishedBlog;
    const featuredPortfolio = portfolioItems.filter((item) => item.featured).length;
    const completed = portfolioItems.filter((item) => item.status === 'completed').length;
    const ongoing = portfolioItems.length - completed;
    const totalViews = blogPosts.reduce((acc, post) => acc + post.views, 0);

    return {
      publishedBlog,
      draftBlog,
      featuredPortfolio,
      completed,
      ongoing,
      totalViews,
    };
  }, [blogPosts, portfolioItems]);

  const topArticles = useMemo(
    () => blogPosts.slice().sort((a, b) => b.views - a.views).slice(0, 3),
    [blogPosts],
  );

  const activityFeed = useMemo(() => {
    const blogActivities = blogPosts.map((post) => ({
      id: `blog-${post.id}`,
      title: post.title,
      type: 'blog' as const,
      status: post.published ? 'Artikel dipublikasikan' : 'Draft disimpan',
      date: post.publishedAt ?? post.createdAt,
    }));

    const projectActivities = portfolioItems.map((item) => ({
      id: `project-${item.id}`,
      title: item.title,
      type: 'project' as const,
      status: item.status === 'completed' ? 'Proyek selesai' : 'Sedang berjalan',
      date: item.createdAt,
    }));

    return [...blogActivities, ...projectActivities]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, [blogPosts, portfolioItems]);

  const handleBlogSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!blogForm.title.trim() || !blogForm.summary.trim() || !blogForm.content.trim()) {
      setBlogNotice('Judul, ringkasan, dan konten wajib diisi.');
      return;
    }

    setBlogNotice(null);
    setIsSubmitting((prev) => ({ ...prev, blog: true }));

    try {
      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: blogForm.title.trim(),
          summary: blogForm.summary.trim(),
          content: blogForm.content.trim(),
          category: blogForm.category,
          image: blogForm.image.trim() || null,
          tags: blogForm.tags,
          readTime: blogForm.readTime.trim() || null,
          status: blogForm.status,
          featured: blogForm.featured,
          publishedAt: blogForm.publishedAt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setBlogNotice(data?.error ?? 'Gagal menyimpan artikel.');
        return;
      }

      const newPost = normalizeBlogPost(data.post);
      setBlogPosts((prev) => [newPost, ...prev]);
      setBlogForm(defaultBlogForm());
      setBlogNotice('Artikel baru berhasil masuk studio konten.');
    } catch (error) {
      setBlogNotice(
        error instanceof Error ? error.message : 'Terjadi kesalahan saat menghubungi server.',
      );
    } finally {
      setIsSubmitting((prev) => ({ ...prev, blog: false }));
    }
  };

  const handlePortfolioSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!portfolioForm.title.trim() || !portfolioForm.description.trim()) {
      setProjectNotice('Nama proyek dan deskripsi wajib diisi.');
      return;
    }

    setProjectNotice(null);
    setIsSubmitting((prev) => ({ ...prev, portfolio: true }));

    try {
      const response = await fetch('/api/admin/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: portfolioForm.title.trim(),
          description: portfolioForm.description.trim(),
          category: portfolioForm.category,
          image: portfolioForm.image.trim() || null,
          url: portfolioForm.url.trim() || null,
          duration: portfolioForm.duration.trim() || '7 hari',
          client: portfolioForm.client.trim() || null,
          testimonial: portfolioForm.testimonial.trim() || null,
          rating: portfolioForm.rating,
          features: portfolioForm.features,
          featured: portfolioForm.featured,
          active: portfolioForm.active,
          status: portfolioForm.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setProjectNotice(data?.error ?? 'Gagal menyimpan portofolio.');
        return;
      }

      const newProject = normalizePortfolioItem(data.portfolio);
      setPortfolioItems((prev) => [newProject, ...prev]);
      setPortfolioForm(defaultPortfolioForm());
      setProjectNotice('Proyek baru siap tampil di portofolio.');
    } catch (error) {
      setProjectNotice(
        error instanceof Error ? error.message : 'Terjadi kesalahan saat menghubungi server.',
      );
    } finally {
      setIsSubmitting((prev) => ({ ...prev, portfolio: false }));
    }
  };

  const handleLogout = async () => {
    setIsSubmitting((prev) => ({ ...prev, logout: true }));
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.replace('/admin/login');
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Gagal keluar dari sesi admin.');
    } finally {
      setIsSubmitting((prev) => ({ ...prev, logout: false }));
    }
  };

  const sectionTabs = [
    { key: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
    { key: 'blog' as const, label: 'Blog Studio', icon: NotebookPen },
    { key: 'portfolio' as const, label: 'Portofolio', icon: Layers3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04060f] via-[#070b1a] to-[#010104] py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              <Sparkles className="h-3.5 w-3.5" />
              Admin Studio
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              Konten & Portofolio Management
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 md:text-base">
              Atur artikel, studi kasus, dan showcase proyek Anda dengan panel modern terinspirasi
              TailAdmin. Pantau performa dan publish konten hanya dengan beberapa klik.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 self-start">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 backdrop-blur">
              <CircleCheck className="h-4 w-4 text-emerald-400" />
              Semua sistem beroperasi • Sinkronisasi Realtime
            </div>
            <button
              onClick={handleLogout}
              disabled={isSubmitting.logout}
              className="rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm font-medium text-slate-200 transition-all hover:border-[#f87171] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting.logout ? 'Keluar...' : 'Keluar'}
            </button>
          </div>
        </header>

        {fetchError && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm text-red-200">
            {fetchError}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-4"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-blue-500/10 to-transparent p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Artikel aktif</p>
                <h3 className="mt-2 text-3xl font-semibold text-white">{blogPosts.length}</h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/10 p-2 text-white">
                <NotebookPen className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-400">
              {metrics.publishedBlog} publish • {metrics.draftBlog} draft
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Portofolio</p>
                <h3 className="mt-2 text-3xl font-semibold text-white">{portfolioItems.length}</h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/10 p-2 text-white">
                <Layers3 className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-400">
              {metrics.completed} selesai • {metrics.ongoing} aktif
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-transparent p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Total views</p>
                <h3 className="mt-2 text-3xl font-semibold text-white">{metrics.totalViews.toLocaleString('id-ID')}</h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/10 p-2 text-white">
                <Rocket className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-400">30d growth • +18%</p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Highlight</p>
                <h3 className="mt-2 text-3xl font-semibold text-white">{metrics.featuredPortfolio}</h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/10 p-2 text-white">
                <Star className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-400">Proyek tampil di homepage</p>
          </div>
        </motion.div>

        <nav className="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300 backdrop-blur">
          {sectionTabs.map(({ key, label, icon: Icon }) => {
            const isActive = activeSection === key;
            return (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white shadow-[0_12px_30px_rgba(99,102,241,0.35)]'
                    : 'hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </nav>

        {activeSection === 'overview' && (
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Artikel performa terbaik</h2>
                  <p className="text-sm text-slate-400">Tiga artikel dengan engagement tertinggi minggu ini.</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                  <Rocket className="h-3.5 w-3.5" />
                  Growth
                </span>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {topArticles.map((post, index) => (
                  <div
                    key={post.id}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-6"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-semibold text-white/80">
                      #{index + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-white">{post.title}</h3>
                    <p className="mt-3 text-sm text-slate-300 line-clamp-3">{post.excerpt ?? 'Belum ada ringkasan yang ditulis.'}</p>
                    <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <Rocket className="h-4 w-4" />
                        {post.views.toLocaleString('id-ID')} views
                      </span>
                    </div>
                  </div>
                ))}

                {!topArticles.length && (
                  <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-sm text-slate-400 md:col-span-3">
                    Belum ada artikel yang dipublikasikan.
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <h2 className="text-2xl font-semibold text-white">Aktivitas terbaru</h2>
              <p className="mt-1 text-sm text-slate-400">Timeline gabungan blog & portofolio.</p>

              <div className="mt-6 space-y-5">
                {activityFeed.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-slate-400">
                    Belum ada aktivitas terbaru. Mulai dengan menambah konten baru.
                  </div>
                )}

                {activityFeed.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 border-l border-white/10 pl-4">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#a855f7]" />
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                        {item.type === 'blog' ? 'Blog' : 'Portfolio'} • {item.status}
                      </p>
                      <span className="mt-1 inline-flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {activeSection === 'blog' && (
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="xl:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Tambah artikel baru</h2>
                  <p className="text-sm text-slate-400">Siapkan konten blog dengan metadata lengkap.</p>
                </div>
                <NotebookPen className="h-6 w-6 text-indigo-300" />
              </div>

              <form className="mt-8 space-y-5" onSubmit={handleBlogSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white" htmlFor="blog-title">
                    Judul artikel
                  </label>
                  <input
                    id="blog-title"
                    value={blogForm.title}
                    disabled={isSubmitting.blog}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, title: event.target.value }))}
                    placeholder="Contoh: Blueprint strategi konten Q1"
                    className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white" htmlFor="blog-category">
                      Kategori utama
                    </label>
                    <select
                      id="blog-category"
                      value={blogForm.category}
                      disabled={isSubmitting.blog}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, category: event.target.value }))}
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
                    <label className="text-sm font-medium text-white" htmlFor="blog-date">
                      Tanggal publish
                    </label>
                    <input
                      type="date"
                      id="blog-date"
                      value={blogForm.publishedAt}
                      disabled={isSubmitting.blog}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, publishedAt: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white" htmlFor="blog-summary">
                    Ringkasan singkat
                  </label>
                  <textarea
                    id="blog-summary"
                    value={blogForm.summary}
                    disabled={isSubmitting.blog}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, summary: event.target.value }))}
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
                    value={blogForm.content}
                    disabled={isSubmitting.blog}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, content: event.target.value }))}
                    rows={6}
                    placeholder="Masukkan konten lengkap artikel (markdown/html sederhana)."
                    className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white" htmlFor="blog-readtime">
                      Estimasi baca
                    </label>
                    <input
                      id="blog-readtime"
                      value={blogForm.readTime}
                      disabled={isSubmitting.blog}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, readTime: event.target.value }))}
                      placeholder="Contoh: 6 menit"
                      className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white" htmlFor="blog-status">
                      Status konten
                    </label>
                    <select
                      id="blog-status"
                      value={blogForm.status}
                      disabled={isSubmitting.blog}
                      onChange={(event) =>
                        setBlogForm((prev) => ({ ...prev, status: event.target.value as BlogStatus }))
                      }
                      className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white" htmlFor="blog-cover">
                      Visual cover
                    </label>
                    <input
                      id="blog-cover"
                      value={blogForm.image}
                      disabled={isSubmitting.blog}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, image: event.target.value }))}
                      placeholder="Contoh: gradient-nebula.png"
                      className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white" htmlFor="blog-tags">
                    Tags (pisahkan dengan koma)
                  </label>
                  <div className="relative">
                    <Tag className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <input
                      id="blog-tags"
                      value={blogForm.tags}
                      disabled={isSubmitting.blog}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, tags: event.target.value }))}
                      placeholder="design system, onboarding, ux research"
                      className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 pl-10 text-sm text-white placeholder:text-slate-500 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-3 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={blogForm.featured}
                      disabled={isSubmitting.blog}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, featured: event.target.checked }))}
                      className="h-4 w-4 rounded border border-white/10 bg-[#0b1224]/70 text-[#6366f1] focus:ring-[#6366f1]/60"
                    />
                    Tandai sebagai artikel highlight
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting.blog}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(99,102,241,0.35)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Sparkles className="h-4 w-4" />
                    {isSubmitting.blog ? 'Menyimpan...' : 'Publish ke staging'}
                  </button>
                </div>

                {blogNotice && (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200">
                    <CircleCheck className="h-4 w-4 text-emerald-400" />
                    {blogNotice}
                  </div>
                )}
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="xl:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Pipeline artikel</h2>
                  <p className="text-sm text-slate-400">Pantau status, jadwal publish, dan highlight tag.</p>
                </div>
                <span className="rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                  {blogPosts.length} total entri
                </span>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <table className="min-w-full divide-y divide-white/10 text-sm">
                  <thead className="bg-white/5 text-left uppercase tracking-[0.3em] text-xs text-slate-400">
                    <tr>
                      <th className="px-4 py-4">Judul</th>
                      <th className="px-4 py-4">Kategori</th>
                      <th className="px-4 py-4">Status</th>
                      <th className="px-4 py-4">Schedule</th>
                      <th className="px-4 py-4">Views</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {blogPosts.map((post) => (
                      <tr key={post.id} className="bg-[#090f1f]/70 text-slate-200 hover:bg-[#101830]">
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-white">{post.title}</span>
                            <span className="text-xs text-slate-400">{post.excerpt ?? 'Belum ada ringkasan.'}</span>
                            <div className="flex flex-wrap gap-2 pt-2">
                              {post.tags.length === 0 && (
                                <span className="rounded-full border border-dashed border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">
                                  Belum ada tag
                                </span>
                              )}
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
                                >
                                  <Tag className="h-3 w-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-slate-300">{post.category}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                              post.published
                                ? 'bg-emerald-500/10 text-emerald-300'
                                : 'bg-slate-500/10 text-slate-300'
                            }`}
                          >
                            <CircleCheck className="h-3.5 w-3.5" />
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-300">{formatDate(post.publishedAt)}</td>
                        <td className="px-4 py-4 text-emerald-300">{post.views.toLocaleString('id-ID')}</td>
                      </tr>
                    ))}

                    {!blogPosts.length && (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-400">
                          Belum ada artikel yang terdaftar.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </section>
        )}

        {activeSection === 'portfolio' && (
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="xl:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-white/12 via-white/6 to-transparent p-8 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Tambah showcase baru</h2>
                  <p className="text-sm text-slate-400">Display studi kasus dan highlight proyek unggulan.</p>
                </div>
                <Layers3 className="h-6 w-6 text-fuchsia-300" />
              </div>

              <form className="mt-8 space-y-5" onSubmit={handlePortfolioSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white" htmlFor="project-title">
                    Nama proyek
                  </label>
                  <input
                    id="project-title"
                    value={portfolioForm.title}
                    disabled={isSubmitting.portfolio}
                    onChange={(event) => setPortfolioForm((prev) => ({ ...prev, title: event.target.value }))}
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
                    value={portfolioForm.description}
                    disabled={isSubmitting.portfolio}
                    onChange={(event) =>
                      setPortfolioForm((prev) => ({ ...prev, description: event.target.value }))
                    }
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
                      value={portfolioForm.category}
                      disabled={isSubmitting.portfolio}
                      onChange={(event) => setPortfolioForm((prev) => ({ ...prev, category: event.target.value }))}
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
                      value={portfolioForm.duration}
                      disabled={isSubmitting.portfolio}
                      onChange={(event) => setPortfolioForm((prev) => ({ ...prev, duration: event.target.value }))}
                      placeholder="Contoh: 6 minggu"
                      className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white" htmlFor="project-client">
                      Klien
                    </label>
                    <input
                      id="project-client"
                      value={portfolioForm.client}
                      disabled={isSubmitting.portfolio}
                      onChange={(event) => setPortfolioForm((prev) => ({ ...prev, client: event.target.value }))}
                      placeholder="Nama klien"
                      className="w-full rounded-2xl border border-white/10 bg-[#0b1224]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white" htmlFor="project-rating">
                      Rating klien (1-5)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      id="project-rating"
                      value={portfolioForm.rating}
                      disabled={isSubmitting.portfolio}
                      onChange={(event) => setPortfolioForm((prev) => ({ ...prev, rating: event.target.value }))}
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
                    value={portfolioForm.testimonial}
                    disabled={isSubmitting.portfolio}
                    onChange={(event) =>
                      setPortfolioForm((prev) => ({ ...prev, testimonial: event.target.value }))
                    }
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
                        value={portfolioForm.image}
                        disabled={isSubmitting.portfolio}
                        onChange={(event) => setPortfolioForm((prev) => ({ ...prev, image: event.target.value }))}
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
                        value={portfolioForm.url}
                        disabled={isSubmitting.portfolio}
                        onChange={(event) => setPortfolioForm((prev) => ({ ...prev, url: event.target.value }))}
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
                      value={portfolioForm.features}
                      disabled={isSubmitting.portfolio}
                      onChange={(event) => setPortfolioForm((prev) => ({ ...prev, features: event.target.value }))}
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
                      value={portfolioForm.status}
                      disabled={isSubmitting.portfolio}
                      onChange={(event) =>
                        setPortfolioForm((prev) => ({
                          ...prev,
                          status: event.target.value as ProjectStatus,
                        }))
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
                        checked={portfolioForm.active}
                        disabled={isSubmitting.portfolio}
                        onChange={(event) =>
                          setPortfolioForm((prev) => ({ ...prev, active: event.target.checked }))
                        }
                        className="h-4 w-4 rounded border border-white/10 bg-[#0b1224]/70 text-[#a855f7] focus:ring-[#a855f7]/60"
                      />
                      Tampilkan di listing publik
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-3 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={portfolioForm.featured}
                      disabled={isSubmitting.portfolio}
                      onChange={(event) =>
                        setPortfolioForm((prev) => ({ ...prev, featured: event.target.checked }))
                      }
                      className="h-4 w-4 rounded border border-white/10 bg-[#0b1224]/70 text-[#a855f7] focus:ring-[#a855f7]/60"
                    />
                    Tampilkan sebagai highlight homepage
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting.portfolio}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#ec4899] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(168,85,247,0.35)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Sparkles className="h-4 w-4" />
                    {isSubmitting.portfolio ? 'Menyimpan...' : 'Simpan showcase'}
                  </button>
                </div>

                {projectNotice && (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200">
                    <CircleCheck className="h-4 w-4 text-emerald-400" />
                    {projectNotice}
                  </div>
                )}
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="xl:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Daftar portofolio</h2>
                  <p className="text-sm text-slate-400">Semua proyek terbaru beserta stack dan statusnya.</p>
                </div>
                <span className="rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                  {portfolioItems.length} showcase aktif
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {portfolioItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-[#090f1f]/80 p-6 transition-colors hover:border-[#a855f7]/50"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                            {item.category}
                          </span>
                          {item.featured && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-200">
                              <Star className="h-3.5 w-3.5" />
                              Highlight
                            </span>
                          )}
                          {!item.active && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-200">
                              Tidak aktif
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-slate-400">{item.client ?? 'Klien internal'}</p>
                        <p className="text-sm text-slate-300">{item.description}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {item.features.length === 0 && (
                            <span className="rounded-full border border-dashed border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">
                              Belum ada highlight stack
                            </span>
                          )}
                          {item.features.map((feature) => (
                            <span
                              key={feature}
                              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
                            >
                              <Tag className="h-3 w-3" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-3 text-sm text-slate-300">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                          {item.status === 'completed' ? 'Selesai' : 'Sedang berjalan'}
                        </span>
                        <span className="inline-flex items-center gap-2 text-xs text-slate-400">
                          <Calendar className="h-3.5 w-3.5" />
                          Dibuat {formatDate(item.createdAt)}
                        </span>
                        {item.url && (
                          <a
                            href={item.url}
                            className="inline-flex items-center gap-2 text-xs font-medium text-[#a855f7] hover:text-[#f472b6]"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <LinkIcon className="h-3.5 w-3.5" />
                            Lihat proyek
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {!portfolioItems.length && (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-[#090f1f]/60 p-6 text-center text-sm text-slate-400">
                    Belum ada portofolio yang terdaftar.
                  </div>
                )}
              </div>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
