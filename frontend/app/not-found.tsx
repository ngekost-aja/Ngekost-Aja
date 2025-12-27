import Link from "next/link";
import Image from "next/image";
import { Home, Search, MapPin } from "lucide-react";

export default function NotFound() {
  const popularLinks = [
    { name: "Kos di Jakarta", href: "/search?location=jakarta", icon: "🏙️" },
    { name: "Kos di Bandung", href: "/search?location=bandung", icon: "🏔️" },
    {
      name: "Kos di Yogyakarta",
      href: "/search?location=yogyakarta",
      icon: "🏛️",
    },
    { name: "Kos di Surabaya", href: "/search?location=surabaya", icon: "🌊" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-orange-100 flex flex-col">
      {/* Header/Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-12 h-12 p-0 lg:p-1.5 sm:w-14 sm:h-14 md:w-16 md:h-16">
                <Image
                  src="/ngekost-aja-logo.png"
                  alt="Logo"
                  width={64}
                  height={54}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <span className="font-bold text-xl text-gray-900">
                Ngekost Aja
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-golden-yellow font-medium transition"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-golden-yellow font-medium transition"
              >
                About Us
              </Link>
              <Link
                href="/search"
                className="text-gray-600 hover:text-golden-yellow font-medium transition"
              >
                Search
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-golden-yellow font-medium transition"
              >
                Contact Us
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-gray-700 hover:text-golden-yellow font-medium transition text-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-golden-yellow text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition text-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            {/* 404 Numbers with Cat */}
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {/* First 4 */}
              <div className="text-[120px] md:text-[180px] font-bold text-golden-yellow leading-none">
                4
              </div>

              {/* Sleeping Cat in the middle */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
                  <div className="text-7xl md:text-8xl">😺</div>
                </div>
                {/* Z z z for sleeping effect */}
                <div className="absolute -top-4 -right-8 text-2xl opacity-60 animate-pulse">
                  Z z z
                </div>
              </div>

              {/* Second 4 */}
              <div className="text-[120px] md:text-[180px] font-bold text-golden-yellow leading-none">
                4
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Page Not Found
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              Oops! Sepertinya halaman yang kamu cari sedang tidur atau tidak
              ditemukan. Mari kembali ke halaman utama dan temukan kos impianmu!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/"
              className="flex items-center gap-2 bg-golden-yellow text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <Home size={20} />
              Kembali ke beranda
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-gray-300 w-full sm:w-auto justify-center"
            >
              <Search size={20} />
              Cari Kos
            </Link>
          </div>

          {/* Popular Links */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <MapPin size={20} className="text-golden-yellow" />
              Lokasi Populer
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {popularLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-golden-yellow hover:text-white rounded-lg transition group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  <span className="font-medium text-sm">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Help Text */}
          <p className="mt-8 text-sm text-gray-500">
            Butuh bantuan?{" "}
            <Link
              href="/contact"
              className="text-golden-yellow hover:underline font-medium"
            >
              Hubungi kami
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            © 2024 Ngekost Aja. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
