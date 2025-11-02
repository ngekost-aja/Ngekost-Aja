"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Heart,
  User,
  ShoppingCart,
  Phone,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import SearchBar from "../SearchBar";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar({
  showBackButton = false,
  showTopBar = true,
  showNavigation = true,
  showSearch = true,
}: {
  showBackButton?: boolean;
  showTopBar?: boolean;
  showNavigation?: boolean;
  showSearch?: boolean;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar - Hidden on mobile */}
      {showTopBar && (
        <div className="hidden md:block bg-gray-100 py-2 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                Lokasi Kos
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <Phone size={16} />
                0800 332 65-66
              </span>
              <span className="text-xs">Butuh bantuan?</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="py-3 md:py-4 px-4 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-4">
          {/* Back Button (for detail pages) */}
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition shrink-0"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
          )}

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-12 h-12 p-0 lg:p-1.5 sm:w-14 sm:h-14 md:w-16 md:h-16">
              <Image
                src="/ngekost-aja-logo.png"
                alt="Logo"
                width={64}
                height={54}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-black">
                Ngekost Aja!
              </h1>
            </div>
          </Link>

          {/* Search Bar */}
          {showSearch && (
            <div className="flex flex-1">
              <SearchBar />
            </div>
          )}

          {/* Right Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition hidden md:block">
              <Heart size={24} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
              <ShoppingCart size={20} className="md:w-6 md:h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-golden-yellow text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs">
                0
              </span>
            </button>
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <User size={18} className="md:w-5 md:h-5" />
              <span className="text-sm font-medium">Masuk</span>
            </Link>
            {/* Mobile Menu Button */}
            {showNavigation && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation - Desktop */}
      {showNavigation && (
        <nav className="hidden lg:block py-3 px-4 bg-white border-b">
          <div className="max-w-7xl mx-auto flex items-center gap-6 text-sm">
            <button className="bg-golden-yellow text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition flex items-center gap-2">
              <Menu size={18} />
              JELAJAHI KATEGORI
            </button>
            <Link
              href="/kos-putra"
              className="text-gray-700 hover:text-golden-yellow transition"
            >
              Kos Putra
            </Link>
            <Link
              href="/kos-putri"
              className="text-gray-700 hover:text-golden-yellow transition"
            >
              Kos Putri
            </Link>
            <Link
              href="/kos-campur"
              className="text-gray-700 hover:text-golden-yellow transition"
            >
              Kos Campur
            </Link>
            <Link
              href="/promo"
              className="text-gray-700 hover:text-golden-yellow transition"
            >
              Promo
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-golden-yellow transition"
            >
              Blog
            </Link>
            <Link
              href="/tentang"
              className="text-gray-700 hover:text-golden-yellow transition"
            >
              Tentang Kami
            </Link>
            <div className="ml-auto flex items-center gap-2 text-gray-600">
              <Heart size={16} />
              <span className="text-xs">Kos Favorit</span>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Navigation Menu */}
      {showNavigation && isMobileMenuOpen && (
        <nav className="lg:hidden bg-white border-t border-b">
          <div className="px-4 py-3 space-y-2">
            <Link
              href="/kos-putra"
              className="flex py-2 text-gray-700 hover:text-golden-yellow transition"
            >
              Kos Putra
            </Link>
            <Link
              href="/kos-putri"
              className="flex py-2 text-gray-700 hover:text-golden-yellow transition"
            >
              Kos Putri
            </Link>
            <Link
              href="/kos-campur"
              className="flex py-2 text-gray-700 hover:text-golden-yellow transition"
            >
              Kos Campur
            </Link>
            <Link
              href="/promo"
              className="flex py-2 text-gray-700 hover:text-golden-yellow transition"
            >
              Promo
            </Link>
            <Link
              href="/blog"
              className="flex py-2 text-gray-700 hover:text-golden-yellow transition"
            >
              Blog
            </Link>
            <Link
              href="/tentang"
              className="flex py-2 text-gray-700 hover:text-golden-yellow transition"
            >
              Tentang Kami
            </Link>
            <Link
              href="/favorit"
              className="flex py-2 text-gray-700 hover:text-golden-yellow transition items-center gap-2"
            >
              <Heart size={16} />
              Kos Favorit
            </Link>
            <Link
              href="/login"
              className="block py-3 mt-2 bg-golden-yellow text-black rounded-lg text-center font-medium hover:bg-yellow-500 transition"
            >
              Masuk / Daftar
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
