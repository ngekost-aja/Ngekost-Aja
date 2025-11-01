import Link from "next/link";
import Footer from "./components/Footer";
import CardCategory from "./components/CardCategory";
import CardBoardingHouse from "./components/CardBoardingHouse";
import Newsletter from "./components/Newsletter";
import { Category } from "./types/category";
import { Property } from "./types/property";
import BannerPromo from "./components/BannerPromo";
import Navbar from "./components/ui/Navbar";

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
      <Navbar
        showBackButton={false}
        showTopBar={true}
        showNavigation={true}
        showSearch={true}
      />

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
