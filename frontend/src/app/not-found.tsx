import Link from "next/link";
import { Home, Search } from "lucide-react";
import "@/app/globals.css";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="text-8xl md:text-9xl font-bold text-golden-yellow">
              4
            </div>
            <div className="text-6xl md:text-7xl">😺</div>
            <div className="text-8xl md:text-9xl font-bold text-golden-yellow">
              4
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto">
            Oops! Sepertinya halaman yang kamu cari tidak ditemukan. Mari
            kembali ke halaman utama dan temukan kos impianmu!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 bg-golden-yellow text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
          >
            <Home size={20} />
            Kembali ke beranda
          </a>
          <Link
            href="/search"
            className="flex items-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-gray-300 w-full sm:w-auto justify-center"
          >
            <Search size={20} />
            Cari Kos
          </Link>
        </div>
      </div>
    </div>
  );
}
