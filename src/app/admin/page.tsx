import { Suspense } from 'react';
import AdminContentStudio from './AdminContentStudio';

/**
 * Halaman Admin utama.
 * Dibungkus dengan Suspense agar hook client-side (seperti useSearchParams)
 * dapat berfungsi tanpa error di Next.js 15+.
 */
export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#04060f] text-slate-300">
          <div className="text-center">
            <p className="text-sm font-medium">Memuat Admin Studio...</p>
            <p className="mt-2 text-xs text-slate-500">
              Harap tunggu sebentar, data sedang dipersiapkan.
            </p>
          </div>
        </div>
      }
    >
      <AdminContentStudio />
    </Suspense>
  );
}
