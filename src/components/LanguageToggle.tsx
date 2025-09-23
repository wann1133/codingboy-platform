"use client";

import { useLanguage } from "@/components/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      data-snappy-cta
      className="inline-flex items-center gap-1 rounded-full border border-[#273249] bg-[#0f1628] p-1 text-[0.7rem] select-none shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      role="group"
      aria-label="Language toggle"
    >
      <button
        type="button"
        onClick={() => setLang("id")}
        className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
          lang === "id" ? "bg-[#6d6bff] text-white" : "text-slate-300 hover:text-white"
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
          lang === "en" ? "bg-[#6d6bff] text-white" : "text-slate-300 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
