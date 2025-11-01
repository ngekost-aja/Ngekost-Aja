import Link from "next/link";
import {
  Search,
  MapPin,
  Heart,
  User,
  ShoppingCart,
  Phone,
  Menu,
} from "lucide-react";
import Footer from "./components/Footer";
import CardCategory from "./components/CardCategory";
import CardBoardingHouse from "./components/CardBoardingHouse";
import Newsletter from "./components/Newsletter";
import { Category } from "./types/category";
import { Property } from "./types/property";
import BannerPromo from "./components/BannerPromo";

export default function Home() {
  const categories: Category[] = [
    { icon: "👨‍🎓", name: "Kos Putra" },
    { icon: "👩‍🎓", name: "Kos Putri" },
    { icon: "🏠", name: "Kos Campur" },
    { icon: "🍽️", name: "Dengan Makan" },
    { icon: "🏊", name: "Ada Kolam" },
    { icon: "☕", name: "Ada Dapur" },
    { icon: "🚗", name: "Parkir Luas" },
    { icon: "📶", name: "WiFi Gratis" },
  ];

  const properties: Property[] = [
    {
      title: "Kos Ekslusif Dekat UI",
      price: "Rp 1.500.000",
      location: "Depok",
      image: "🏘️",
    },
    {
      title: "Kos Nyaman AC & WiFi",
      price: "Rp 1.200.000",
      location: "Bandung",
      image: "🏠",
      discount: "20%",
    },
    {
      title: "Kos Strategis ITB",
      price: "Rp 1.800.000",
      location: "Bandung",
      image: "🏢",
    },
    {
      title: "Kos Murah Dekat UGM",
      price: "Rp 900.000",
      location: "Yogyakarta",
      image: "🏡",
      badge: "TERMURAH",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-gray-100 py-2 px-4">
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

        {/* Main Header */}
        <div className="py-4 px-4 border-b">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-[#EDCD44] p-2 rounded-lg">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">Ngekost Aja</h1>
                <p className="text-xs text-gray-500">Cari kos</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cari kos berdasarkan lokasi, kampus, atau tipe kos..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDCD44] focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Heart size={24} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
                <ShoppingCart size={24} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-[#EDCD44] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <User size={20} />
                <span className="text-sm font-medium">Masuk</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-3 px-4 bg-white">
          <div className="max-w-7xl mx-auto flex items-center gap-6 text-sm">
            <button className="bg-[#EDCD44] text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition flex items-center gap-2">
              <Menu size={18} />
              JELAJAHI KATEGORI
            </button>
            <Link
              href="/kos-putra"
              className="text-gray-700 hover:text-[#EDCD44] transition"
            >
              Kos Putra
            </Link>
            <Link
              href="/kos-putri"
              className="text-gray-700 hover:text-[#EDCD44] transition"
            >
              Kos Putri
            </Link>
            <Link
              href="/kos-campur"
              className="text-gray-700 hover:text-[#EDCD44] transition"
            >
              Kos Campur
            </Link>
            <Link
              href="/promo"
              className="text-gray-700 hover:text-[#EDCD44] transition"
            >
              Promo
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-[#EDCD44] transition"
            >
              Blog
            </Link>
            <Link
              href="/tentang"
              className="text-gray-700 hover:text-[#EDCD44] transition"
            >
              Tentang Kami
            </Link>
            <div className="ml-auto flex items-center gap-2 text-gray-600">
              <Heart size={16} />
              <span className="text-xs">Kos Favorit</span>
            </div>
          </div>
        </nav>
      </header>

      <BannerPromo />

      {/* Browse by Category */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Cari Berdasarkan Kategori
          </h2>
          <Link
            href="/categories"
            className="text-[#EDCD44] hover:underline text-sm font-medium"
          >
            Semua Kategori →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <CardCategory key={index} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Kos Pilihan Terbaik
          </h2>
          <Link
            href="/featured"
            className="text-[#EDCD44] hover:underline text-sm font-medium"
          >
            Lihat Semua →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <CardBoardingHouse key={index} property={property} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      <Footer />
    </div>
  );
}
