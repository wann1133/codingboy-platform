"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Globe,
  MessageCircle,
  Palette,
  ShoppingCart,
} from "lucide-react";

import LanguageToggle from "@/components/LanguageToggle";

type NavLabels = {
  tentang: string;
  portfolio: string;
  blog: string;
  contact: string;
};

type PrimaryNavProps = {
  labels: NavLabels;
};

type NavItemId = "tentang" | "portfolio" | "blog" | "contact";

const portfolioSolutionColumns = [
  [
    "Company Profile Premium",
    "Landing Page Interaktif",
    "Microsite Kampanye",
    "Portal Edukasi & Kursus",
  ],
  [
    "E-Commerce Showcase",
    "Dashboard & Admin UI",
    "Brand Storytelling Site",
    "Product Design Case Study",
  ],
] as const;

const portfolioSpotlight = [
  {
    title: "Rebranding Tech Startup",
    category: "UI/UX - Website Development",
    description:
      "Transformasi landing page SaaS dengan fokus pada konversi demo 3x lebih tinggi.",
    icon: Globe,
    accent: "from-[#4f46e5] to-[#7c3aed]",
  },
  {
    title: "Marketplace UMKM Lokal",
    category: "E-Commerce - Product Strategy",
    description:
      "Desain katalog dan checkout ringan untuk mengangkat brand UKM ke ranah digital.",
    icon: ShoppingCart,
    accent: "from-[#38bdf8] to-[#6366f1]",
  },
  {
    title: "Corporate Portfolio Suite",
    category: "Creative - Motion & Visual",
    description:
      "Presentasi interaktif dengan video hero dan animasi smooth untuk brand enterprise.",
    icon: Palette,
    accent: "from-[#f97316] to-[#ec4899]",
  },
] as const;

const NAV_LINKS: Array<{ id: NavItemId; href: string }> = [
  { id: "tentang", href: "/tentang" },
  { id: "portfolio", href: "/portfolio" },
  { id: "blog", href: "/blog" },
  { id: "contact", href: "/kontak" },
];

export default function PrimaryNav({ labels }: PrimaryNavProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [openMega, setOpenMega] = useState(false);
  const [hoveredId, setHoveredId] = useState<NavItemId | null>(null);

  const activeId: NavItemId | null = useMemo(() => {
    if (openMega) return "portfolio";
    if (pathname.startsWith("/portfolio")) return "portfolio";
    if (pathname.startsWith("/blog")) return "blog";
    if (pathname.startsWith("/kontak")) return "contact";
    if (pathname.startsWith("/tentang")) return "tentang";
    return null;
  }, [openMega, pathname]);

  const clearHoverTimeout = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const scheduleMegaClose = () => {
    clearHoverTimeout();
    hoverTimeout.current = setTimeout(() => {
      setOpenMega(false);
    }, 180);
  };

  useEffect(() => {
    if (!openMega) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMega(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMega(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMega]);

  useEffect(() => {
    setOpenMega(false);
    setHoveredId(null);
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050915]/80 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-4 sm:py-5">
          <Link href="/" aria-label="CodingBoy" className="flex items-center">
            <div className="flex h-12 w-auto items-center overflow-hidden sm:h-14">
              <img
                src="/logo.png"
                alt="CodingBoy"
                className="h-full w-auto"
                loading="eager"
              />
            </div>
            <span className="sr-only">CodingBoy</span>
          </Link>

          <div className="relative hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1 py-1">
              {NAV_LINKS.map(({ id, href }) => {
                const label = labels[id];
                const isPortfolio = id === "portfolio";
                const isActive = (hoveredId ?? activeId) === id;

                return (
                  <Link
                    key={id}
                    href={href}
                    onMouseEnter={() => {
                      setHoveredId(id);
                      if (isPortfolio) {
                        clearHoverTimeout();
                        setOpenMega(true);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredId(null);
                      if (isPortfolio) {
                        scheduleMegaClose();
                      }
                    }}
                    onFocus={() => {
                      setHoveredId(id);
                      if (isPortfolio) {
                        clearHoverTimeout();
                        setOpenMega(true);
                      }
                    }}
                    onBlur={() => {
                      setHoveredId(null);
                      if (isPortfolio) {
                        scheduleMegaClose();
                      }
                    }}
                    onClick={() => {
                      if (isPortfolio) {
                        setOpenMega(false);
                      }
                    }}
                    aria-haspopup={isPortfolio ? "true" : undefined}
                    aria-expanded={isPortfolio ? openMega : undefined}
                    className={`relative isolate inline-flex items-center gap-1 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "text-white"
                        : "text-slate-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#6d6bff] via-[#8b5cf6] to-[#6d6bff] opacity-90 shadow-[0_18px_45px_rgba(104,97,255,0.35)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="flex items-center gap-1">
                      {label}
                      {isPortfolio && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openMega || hoveredId === id ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>

            <AnimatePresence>
              {openMega && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  onMouseEnter={clearHoverTimeout}
                  onMouseLeave={scheduleMegaClose}
                  className="absolute left-1/2 top-full z-40 mt-6 w-[min(860px,90vw)] -translate-x-1/2 rounded-3xl border border-[#1b253a] bg-[#030817]/95 p-8 shadow-[0_28px_80px_rgba(8,12,24,0.75)] backdrop-blur-xl"
                  role="menu"
                >
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6d6bff]">
                        Portfolio Highlights
                      </span>
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <h3 className="text-2xl font-semibold tracking-wide text-white">
                          Kreasi terbaik kami dalam desain & pengembangan digital
                        </h3>
                        <Link
                          href="/portfolio"
                          onClick={() => setOpenMega(false)}
                          className="inline-flex items-center gap-2 rounded-full border border-[#273149] bg-[#0b1324]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-200 transition-colors hover:border-[#6d6bff] hover:text-white"
                        >
                          Lihat Portfolio
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                      <p className="max-w-3xl text-sm text-slate-300">
                        Jelajahi studi kasus yang menampilkan perpaduan riset, visual storytelling, dan performa bisnis.
                      </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-[1.45fr,1fr]">
                      <div className="grid gap-6 sm:grid-cols-2">
                        {portfolioSolutionColumns.map((column, columnIndex) => (
                          <ul key={columnIndex} className="space-y-3">
                            {column.map((item) => (
                              <li key={item} className="group flex items-center gap-3 text-sm text-slate-200">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#6d6bff] transition-transform group-hover:scale-125" />
                                <span className="leading-relaxed group-hover:text-white">{item}</span>
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>

                      <div className="flex flex-col gap-4">
                        {portfolioSpotlight.map(({ title, description, category, icon: Icon, accent }) => (
                          <div
                            key={title}
                            className="flex items-start gap-4 rounded-2xl border border-[#1f2b42] bg-gradient-to-br from-[#0f172a]/80 to-[#050a18]/80 p-4 shadow-[0_14px_35px_rgba(4,10,24,0.45)]"
                          >
                            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accent}`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8b5cf6]">{category}</p>
                              <h4 className="text-base font-semibold text-white">{title}</h4>
                              <p className="text-sm text-slate-300">{description}</p>
                            </div>
                          </div>
                        ))}
                        <Link
                          href="/portfolio"
                          onClick={() => setOpenMega(false)}
                          className="group inline-flex items-center justify-between rounded-2xl border border-dashed border-[#273149] bg-[#080f1f]/60 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-[#6d6bff] hover:text-white"
                        >
                          <span>Butuh versi kustom untuk brand Anda?</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 rounded-2xl border border-[#1b253a] bg-[#040a1a]/80 p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-300">Siap diskusi?</p>
                        <p className="max-w-xl text-sm text-slate-400">
                          Tim kreatif kami siap bantu audit brand dan merancang website yang mencuri perhatian.
                        </p>
                      </div>
                      <a
                        href="https://wa.me/6281532797240?text=Halo%20CodingBoy!%20Saya%20ingin%20diskusi%20tentang%20portfolio%20dan%20layanan%20Anda."
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpenMega(false)}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6d6bff] to-[#a855f7] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(104,97,255,0.45)] transition-all hover:shadow-[0_22px_55px_rgba(104,97,255,0.55)]"
                      >
                        Konsultasi Project
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link
              href="/kontak"
              className="hidden rounded-full border border-[#273149] bg-[#0b1324]/70 px-4 py-2 text-sm font-medium text-slate-200 transition-all hover:border-[#6d6bff] hover:text-white sm:inline-flex"
            >
              {labels.contact}
            </Link>
            <a
              href="https://wa.me/6281532797240?text=Halo%20CodingBoy!%20Saya%20ingin%20mendiskusikan%20project%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6d6bff] to-[#a855f7] px-5 py-2 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(104,97,255,0.45)] transition-all hover:shadow-[0_18px_45px_rgba(104,97,255,0.55)]"
            >
              <MessageCircle className="h-4 w-4" />
              Konsultasi
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
