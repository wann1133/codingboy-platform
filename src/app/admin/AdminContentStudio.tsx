'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  AlertTriangle,
  Calendar,
  CircleCheck,
  EllipsisVertical,
  LayoutDashboard,
  Layers3,
  Link as LinkIcon,
  NotebookPen,
  Pencil,
  Plus,
  Rocket,
  Sparkles,
  Star,
  Tag,
  Trash2,
} from 'lucide-react';

import {
  BlogPost,
  PortfolioItem,
  fallbackAdminBlogPosts,
  fallbackAdminPortfolio,
  normalizeBlogPost,
  normalizePortfolioItem,
} from './shared';

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

type SectionKey = 'overview' | 'blog' | 'portfolio';
type DeleteTarget = { type: 'blog' | 'portfolio'; id: string; label: string };

export default function AdminContentStudio() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<SectionKey>(() => {
    const section = searchParams.get('section');
    return section === 'blog' || section === 'portfolio' ? section : 'overview';
  });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [actionMenu, setActionMenu] = useState<{ type: 'blog' | 'portfolio'; id: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

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
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    const section = searchParams.get('section');
    if (section === 'blog' || section === 'portfolio' || section === 'overview') {
      setActiveSection(section);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!actionMenu) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }
      if (event.target.closest('[data-menu-container="true"]')) {
        return;
      }
      setActionMenu(null);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActionMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [actionMenu]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

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

  const highlightedProjects = useMemo(
    () => portfolioItems.filter((item) => item.featured).slice(0, 3),
    [portfolioItems],
  );

  const scheduledPosts = useMemo(() => {
    return blogPosts
      .filter((post) => !post.published)
      .slice()
      .sort((a, b) => {
        const timeA = new Date(a.publishedAt ?? a.createdAt).getTime();
        const timeB = new Date(b.publishedAt ?? b.createdAt).getTime();
        const safeA = Number.isNaN(timeA) ? Number.POSITIVE_INFINITY : timeA;
        const safeB = Number.isNaN(timeB) ? Number.POSITIVE_INFINITY : timeB;
        return safeA - safeB;
      })
      .slice(0, 3);
  }, [blogPosts]);

  const activeProjects = useMemo(
    () => portfolioItems.filter((item) => item.status !== 'completed').slice(0, 3),
    [portfolioItems],
  );

  const handleBlogAddClick = () => {
    router.push('/admin/blog/new');
  };

  const handleBlogEdit = (postId: string) => {
    router.push(`/admin/blog/${postId}/edit`);
    setActionMenu(null);
  };

  const handlePortfolioAddClick = () => {
    router.push('/admin/portfolio/new');
  };

  const handlePortfolioEdit = (projectId: string) => {
    router.push(`/admin/portfolio/${projectId}/edit`);
    setActionMenu(null);
  };

  const toggleActionMenu = (type: 'blog' | 'portfolio', id: string) => {
    setActionMenu((current) => (current?.type === type && current.id === id ? null : { type, id }));
  };

  const handleDeleteRequest = (type: 'blog' | 'portfolio', id: string, label: string) => {
    setDeleteTarget({ type, id, label });
    setActionMenu(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    const endpoint =
      deleteTarget.type === 'blog'
        ? `/api/admin/blogs/${deleteTarget.id}`
        : `/api/admin/portfolios/${deleteTarget.id}`;

    try {
      const response = await fetch(endpoint, { method: 'DELETE' });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error ?? 'Gagal menghapus data.');
      }

      if (deleteTarget.type === 'blog') {
        setBlogPosts((prev) => prev.filter((post) => post.id !== deleteTarget.id));
      } else {
        setPortfolioItems((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      }

      setNotification(`${deleteTarget.type === 'blog' ? 'Artikel' : 'Portofolio'} "${deleteTarget.label}" berhasil dihapus.`);
      setDeleteTarget(null);
      setActionMenu(null);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Gagal menghapus data.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
    setDeleteError(null);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.replace('/admin/login');
    } catch (error) {
      setFetchError(error instanceof Error ? error.message : 'Gagal keluar dari sesi admin.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const sectionTabs: { key: SectionKey; label: string; icon: typeof LayoutDashboard }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'blog', label: 'Blog Studio', icon: NotebookPen },
    { key: 'portfolio', label: 'Portofolio', icon: Layers3 },
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
              Konten &amp; Portofolio Management
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 md:text-base">
              Atur artikel, studi kasus, dan showcase proyek Anda dengan panel modern terinspirasi TailAdmin. Pantau performa dan publish konten hanya dengan beberapa klik.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 self-start">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 backdrop-blur">
              <CircleCheck className="h-4 w-4 text-emerald-400" />
              Semua sistem beroperasi - Sinkronisasi Realtime
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm font-medium text-slate-200 transition-all hover:border-[#f87171] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? 'Keluar...' : 'Keluar'}
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
              {metrics.publishedBlog} publish - {metrics.draftBlog} draft
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
              {metrics.completed} selesai - {metrics.ongoing} aktif
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
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-400">30d growth - +18%</p>
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

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          {activeSection === 'overview' && (
            <motion.section
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6 lg:grid-cols-[1.4fr,1fr]"
            >
              <div className="space-y-6">
                <section className="rounded-2xl border border-white/10 bg-[#0c1224]/80 p-6 shadow-inner shadow-black/40">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-white">Performa Artikel</h2>
                      <p className="mt-1 text-sm text-slate-400">Tiga artikel terpopuler berdasarkan jumlah views.</p>
                    </div>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                      {metrics.totalViews.toLocaleString('id-ID')} total views
                    </span>
                  </div>
                  <div className="mt-5 space-y-4">
                    {topArticles.length > 0 ? (
                      topArticles.map((post) => (
                        <div
                          key={post.id}
                          className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#6366f1]/60"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-semibold text-white">{post.title}</p>
                            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                              {post.views.toLocaleString('id-ID')} views
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{post.excerpt ?? 'Belum ada ringkasan singkat.'}</p>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wide text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {post.category}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.publishedAt ?? post.createdAt)}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-sm text-slate-400">
                        Belum ada data performa artikel.
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-[#0c1224]/80 p-6 shadow-inner shadow-black/40">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-white">Antrian Publikasi</h2>
                      <p className="mt-1 text-sm text-slate-400">Draft yang siap dipoles sebelum tayang.</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                      {metrics.draftBlog} draft
                    </span>
                  </div>
                  <div className="mt-5 space-y-4">
                    {scheduledPosts.length > 0 ? (
                      scheduledPosts.map((post) => (
                        <div
                          key={post.id}
                          className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.05] p-4"
                        >
                          <div>
                            <p className="text-sm font-semibold text-white">{post.title}</p>
                            <p className="text-xs text-slate-400">Target terbit {formatDate(post.publishedAt ?? post.createdAt)}</p>
                          </div>
                          <button
                            onClick={() => handleBlogEdit(post.id)}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-[#6366f1] hover:text-white"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Selesaikan
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-sm text-slate-400">
                        Semua artikel sudah terbit. Gunakan tombol Tambahkan untuk membuat konten baru.
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-2xl border border-white/10 bg-[#0c1224]/80 p-6 shadow-inner shadow-black/40">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-white">Aktivitas Terbaru</h2>
                      <p className="mt-1 text-sm text-slate-400">Rekap singkat perpindahan status konten.</p>
                    </div>
                    <span className="rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-3 py-1 text-xs font-semibold text-[#bae6fd]">
                      {activityFeed.length} aktivitas
                    </span>
                  </div>
                  <div className="mt-5 space-y-4">
                    {activityFeed.length > 0 ? (
                      activityFeed.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                        >
                          <div
                            className={`mt-1 h-2.5 w-2.5 rounded-full ${activity.type === 'blog' ? 'bg-[#6366f1]' : 'bg-[#22d3ee]'}`}
                          />
                          <div>
                            <p className="text-sm font-semibold text-white">{activity.title}</p>
                            <p className="text-xs text-slate-400">{activity.status} - {formatDate(activity.date)}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-sm text-slate-400">
                        Belum ada aktivitas terbaru.
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-[#0c1224]/80 p-6 shadow-inner shadow-black/40">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-white">Portofolio Unggulan</h2>
                      <p className="mt-1 text-sm text-slate-400">Highlight dan proyek yang masih berjalan.</p>
                    </div>
                    <span className="rounded-full border border-[#facc15]/30 bg-[#facc15]/10 px-3 py-1 text-xs font-semibold text-[#fde68a]">
                      {metrics.featuredPortfolio} highlight
                    </span>
                  </div>
                  <div className="mt-5 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200">Highlight</h3>
                      <div className="mt-3 space-y-4">
                        {highlightedProjects.length > 0 ? (
                          highlightedProjects.map((project) => (
                            <div
                              key={project.id}
                              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-semibold text-white">{project.title}</p>
                                {project.url && (
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-sky-300 transition hover:text-white"
                                  >
                                    <LinkIcon className="h-3.5 w-3.5" />
                                    Kunjungi
                                  </a>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                                <span className="inline-flex items-center gap-1">
                                  <Layers3 className="h-3 w-3" />
                                  {project.category}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(project.updatedAt)}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-2">{project.description}</p>
                            </div>
                          ))
                        ) : (
                          <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-sm text-slate-400">
                            Tandai proyek sebagai highlight untuk ditampilkan di sini.
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-200">Sedang berjalan</h3>
                      <div className="mt-3 space-y-4">
                        {activeProjects.length > 0 ? (
                          activeProjects.map((project) => (
                            <div
                              key={`active-${project.id}`}
                              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                            >
                              <div>
                                <p className="text-sm font-semibold text-white">{project.title}</p>
                                <p className="text-xs text-slate-400">Durasi {project.duration}</p>
                              </div>
                              <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-200">
                                {project.status === 'completed' ? 'Selesai' : 'On-going'}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-sm text-slate-400">
                            Belum ada proyek aktif saat ini.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.section>
          )}

                  {activeSection === 'blog' && (
            <motion.section
              key="blog"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Blog Studio</h2>
                  <p className="text-sm text-slate-400">Kelola artikel, publish insight, dan pantau performanya.</p>
                </div>
                <button
                  onClick={handleBlogAddClick}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#7c3aed] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(94,97,255,0.35)] transition hover:brightness-110"
                >
                  <Plus className="h-4 w-4" />
                  Tambahkan artikel
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c1224]/80 shadow-inner shadow-black/40">
                {blogPosts.length > 0 ? (
                  <table className="min-w-full divide-y divide-white/10 text-sm text-slate-200">
                    <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-slate-400">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Judul &amp; Ringkasan</th>
                        <th className="px-6 py-4 text-left font-semibold">Kategori</th>
                        <th className="px-6 py-4 text-left font-semibold">Status</th>
                        <th className="px-6 py-4 text-left font-semibold">Views</th>
                        <th className="px-6 py-4 text-left font-semibold">Terbit</th>
                        <th className="px-6 py-4 text-right font-semibold">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {blogPosts.map((post) => {
                        const isMenuOpen = actionMenu?.type === 'blog' && actionMenu.id === post.id;
                        return (
                          <tr key={post.id} className="transition hover:bg-white/[0.03]">
                            <td className="px-6 py-5 align-top">
                              <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold text-white">{post.title}</span>
                                <span className="text-xs text-slate-400 line-clamp-2">{post.excerpt ?? 'Belum ada ringkasan singkat.'}</span>
                                {post.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {post.tags.slice(0, 3).map((tag) => (
                                      <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-300"
                                      >
                                        <Tag className="h-3 w-3" />
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-5 align-top text-sm text-slate-300">{post.category}</td>
                            <td className="px-6 py-5 align-top">
                              <span
                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                                  post.published
                                    ? 'border border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
                                    : 'border border-amber-400/40 bg-amber-400/10 text-amber-200'
                                }`}
                              >
                                <span className="h-2 w-2 rounded-full bg-current" />
                                {post.published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td className="px-6 py-5 align-top text-sm text-slate-300">{post.views.toLocaleString('id-ID')}</td>
                            <td className="px-6 py-5 align-top text-sm text-slate-300">{formatDate(post.publishedAt ?? post.createdAt)}</td>
                            <td className="relative px-6 py-5 align-top text-right" data-menu-container="true">
                              <div className="flex justify-end">
                                <button
                                  onClick={() => toggleActionMenu('blog', post.id)}
                                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-2 text-slate-200 transition hover:border-[#6366f1] hover:text-white"
                                  aria-label={`Aksi untuk ${post.title}`}
                                >
                                  <EllipsisVertical className="h-4 w-4" />
                                </button>
                              </div>
                              {isMenuOpen && (
                                <div className="absolute right-6 top-16 z-20 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#0c1224] shadow-lg shadow-black/40">
                                  <button
                                    onClick={() => handleBlogEdit(post.id)}
                                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/5"
                                  >
                                    <Pencil className="h-4 w-4" />
                                    Edit konten
                                  </button>
                                  <button
                                    onClick={() => handleDeleteRequest('blog', post.id, post.title)}
                                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-300 transition hover:bg-red-500/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    Hapus
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 px-10 py-16 text-center">
                    <NotebookPen className="h-10 w-10 text-slate-400" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">Belum ada artikel</p>
                      <p className="text-sm text-slate-400">Mulai bagikan cerita dan insight terbaru Anda.</p>
                    </div>
                    <button
                      onClick={handleBlogAddClick}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#7c3aed] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(94,97,255,0.35)] transition hover:brightness-110"
                    >
                      <Plus className="h-4 w-4" />
                      Tambahkan artikel
                    </button>
                  </div>
                )}
              </div>
            </motion.section>
          )}

        </div>

        {activeSection === 'portfolio' && (
            <motion.section
              key="portfolio"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Portofolio</h2>
                  <p className="text-sm text-slate-400">Kurasi studi kasus dan showcase proyek terbaik Anda.</p>
                </div>
                <button
                  onClick={handlePortfolioAddClick}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(14,165,233,0.35)] transition hover:brightness-110"
                >
                  <Plus className="h-4 w-4" />
                  Tambahkan portofolio
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c1224]/80 shadow-inner shadow-black/40">
                {portfolioItems.length > 0 ? (
                  <table className="min-w-full divide-y divide-white/10 text-sm text-slate-200">
                    <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-slate-400">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Proyek</th>
                        <th className="px-6 py-4 text-left font-semibold">Kategori</th>
                        <th className="px-6 py-4 text-left font-semibold">Status</th>
                        <th className="px-6 py-4 text-left font-semibold">Durasi</th>
                        <th className="px-6 py-4 text-left font-semibold">Aktif</th>
                        <th className="px-6 py-4 text-right font-semibold">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {portfolioItems.map((item) => {
                        const isMenuOpen = actionMenu?.type === 'portfolio' && actionMenu.id === item.id;
                        return (
                          <tr key={item.id} className="transition hover:bg-white/[0.03]">
                            <td className="px-6 py-5 align-top">
                              <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold text-white">{item.title}</span>
                                <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                                {item.features.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {item.features.slice(0, 3).map((feature) => (
                                      <span
                                        key={feature}
                                        className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-300"
                                      >
                                        <Sparkles className="h-3 w-3 text-sky-300" />
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                {item.client && <span className="text-[11px] text-slate-400">Klien: {item.client}</span>}
                                {item.url && (
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-sky-300 transition hover:text-white"
                                  >
                                    <LinkIcon className="h-3.5 w-3.5" />
                                    Lihat preview
                                  </a>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-5 align-top text-sm text-slate-300">{item.category}</td>
                            <td className="px-6 py-5 align-top">
                              <span
                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                                  item.status === 'completed'
                                    ? 'border border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
                                    : 'border border-sky-400/40 bg-sky-400/10 text-sky-200'
                                }`}
                              >
                                <span className="h-2 w-2 rounded-full bg-current" />
                                {item.status === 'completed' ? 'Selesai' : 'Sedang berjalan'}
                              </span>
                            </td>
                            <td className="px-6 py-5 align-top text-sm text-slate-300">{item.duration}</td>
                            <td className="px-6 py-5 align-top">
                              <span
                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                                  item.active
                                    ? 'border border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
                                    : 'border border-red-400/40 bg-red-400/10 text-red-200'
                                }`}
                              >
                                <span className="h-2 w-2 rounded-full bg-current" />
                                {item.active ? 'Aktif' : 'Nonaktif'}
                              </span>
                            </td>
                            <td className="relative px-6 py-5 align-top text-right" data-menu-container="true">
                              <div className="flex justify-end">
                                <button
                                  onClick={() => toggleActionMenu('portfolio', item.id)}
                                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-2 text-slate-200 transition hover:border-[#6366f1] hover:text-white"
                                  aria-label={`Aksi untuk ${item.title}`}
                                >
                                  <EllipsisVertical className="h-4 w-4" />
                                </button>
                              </div>
                              {isMenuOpen && (
                                <div className="absolute right-6 top-16 z-20 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#0c1224] shadow-lg shadow-black/40">
                                  <button
                                    onClick={() => handlePortfolioEdit(item.id)}
                                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/5"
                                  >
                                    <Pencil className="h-4 w-4" />
                                    Edit portofolio
                                  </button>
                                  <button
                                    onClick={() => handleDeleteRequest('portfolio', item.id, item.title)}
                                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-300 transition hover:bg-red-500/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    Hapus
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 px-10 py-16 text-center">
                    <Layers3 className="h-10 w-10 text-slate-400" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">Belum ada portofolio</p>
                      <p className="text-sm text-slate-400">Bagikan karya terbaik Anda melalui studi kasus.</p>
                    </div>
                    <button
                      onClick={handlePortfolioAddClick}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#2563eb] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(14,165,233,0.35)] transition hover:brightness-110"
                    >
                      <Plus className="h-4 w-4" />
                      Tambahkan portofolio
                    </button>
                  </div>
                )}
              </div>
            </motion.section>
          )}

                {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#0c1224] to-[#070a13] p-4 text-sm text-emerald-200 shadow-2xl shadow-emerald-500/10"
          >
            <CircleCheck className="h-5 w-5" />
            {notification}
          </motion.div>
        )}

        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
            <div className="w-full max-w-md space-y-6 rounded-3xl border border-red-500/20 bg-[#0c090d] p-8 shadow-2xl shadow-red-500/10">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-3 text-red-300">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Konfirmasi penghapusan</h2>
                  <p className="text-sm text-slate-400">
                    Anda akan menghapus {deleteTarget.type === 'blog' ? 'artikel blog' : 'item portofolio'}
                    <span className="font-semibold text-white"> {deleteTarget.label}</span>. Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
              </div>

              {deleteError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {deleteError}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleDeleteCancel}
                  disabled={isDeleting}
                  className="rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(239,68,68,0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? (
                    <>
                      <motion.span
                        className="h-2 w-2 rounded-full bg-white"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                      />
                      Menghapus...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Ya, hapus
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}