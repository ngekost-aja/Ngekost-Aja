"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  SlidersHorizontal,
  Grid3x3,
  List,
  Heart,
  Bed,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../components/ui/Navbar";

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("Bandung");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [category, setCategory] = useState("house");
  const [priceRange, setPriceRange] = useState([500000, 3000000]);
  const [propertySize, setPropertySize] = useState([500, 2000]);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [parking, setParking] = useState(false);

  const properties = [
    {
      id: 1,
      title: "Kos St. Joseph Apartments",
      address: "2821 Lake Sevilla, New York, 4167 Eagle Drive",
      beds: 2,
      baths: 3,
      sqft: 2510,
      price: 450000,
      pricePerMonth: true,
      image: "🏠",
      badge: "NEWINDING",
      rating: 4.8,
      isFavorite: false,
    },
    {
      id: 2,
      title: "Mitchell Park Plaza Apartments",
      address: "2899 Rues Lane",
      beds: 1,
      baths: 3,
      sqft: 1750,
      price: 440000,
      pricePerMonth: true,
      discountedPrice: 366000,
      image: "🏢",
      badge: "FOR SALE",
      rating: 4.9,
      isFavorite: false,
    },
    {
      id: 3,
      title: "Arlo Apartment",
      address: "New York, 4167 Eagle Drive",
      beds: 3,
      baths: 6,
      sqft: 2460,
      price: 438000,
      pricePerMonth: true,
      discountedPrice: 241000,
      image: "🏘️",
      badge: "HOT OFFER",
      rating: 4.7,
      isFavorite: false,
    },
    {
      id: 4,
      title: "Mitchell Park Plaza Apartments",
      address: "2899 Rues Lane",
      beds: 3,
      baths: 6,
      sqft: 3680,
      price: 450000,
      pricePerMonth: true,
      discountedPrice: 366000,
      image: "🏡",
      badge: "HOT OFFER",
      rating: 4.6,
      isFavorite: false,
    },
  ];

  const categories = [
    { id: "house", icon: "🏠", name: "Kos" },
    { id: "apartment", icon: "🏢", name: "Apartment" },
    { id: "office", icon: "🏢", name: "Kantor" },
    { id: "land", icon: "🌳", name: "Tanah" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        showBackButton={false}
        showTopBar={false}
        showNavigation={true}
        showSearch={true}
      />

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Filter</h2>

              {/* Category */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Kategori
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`p-3 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                        category === cat.id
                          ? "border-golden-yellow bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-xs font-medium">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Rentang Harga
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="500000"
                    max="5000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-golden-yellow"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Rp {priceRange[0].toLocaleString()}</span>
                    <span>Rp {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Property Size */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Ukuran Properti
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="100"
                    value={propertySize[1]}
                    onChange={(e) =>
                      setPropertySize([
                        propertySize[0],
                        parseInt(e.target.value),
                      ])
                    }
                    className="w-full accent-golden-yellow"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{propertySize[0]} sqft</span>
                    <span>{propertySize[1]} sqft</span>
                  </div>
                </div>
              </div>

              {/* Rooms */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Kamar
                </h3>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-600 mb-1 block">
                      Kamar Tidur
                    </label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-600 mb-1 block">
                      Kamar Mandi
                    </label>
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Tambahan
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={petsAllowed}
                      onChange={(e) => setPetsAllowed(e.target.checked)}
                      className="rounded accent-golden-yellow"
                    />
                    <span className="text-sm text-gray-700">Boleh Hewan</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={furnished}
                      onChange={(e) => setFurnished(e.target.checked)}
                      className="rounded accent-golden-yellow"
                    />
                    <span className="text-sm text-gray-700">Furnished</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={parking}
                      onChange={(e) => setParking(e.target.checked)}
                      className="rounded accent-golden-yellow"
                    />
                    <span className="text-sm text-gray-700">Parkir</span>
                  </label>
                </div>
              </div>

              {/* Apply Filter Button */}
              <button className="w-full bg-golden-yellow text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
                Terapkan Filter
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    114 Hasil untuk{" "}
                    <span className="text-golden-yellow">{searchQuery}</span>
                  </h2>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                  >
                    <SlidersHorizontal size={18} />
                    Filter
                  </button>

                  {/* Sort By */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
                  >
                    <option value="default">Urutkan: Default</option>
                    <option value="price-low">Harga: Rendah ke Tinggi</option>
                    <option value="price-high">Harga: Tinggi ke Rendah</option>
                    <option value="newest">Terbaru</option>
                    <option value="rating">Rating Tertinggi</option>
                  </select>

                  {/* View Mode */}
                  <div className="hidden md:flex items-center gap-1 border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded ${
                        viewMode === "grid"
                          ? "bg-golden-yellow text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Grid3x3 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${
                        viewMode === "list"
                          ? "bg-golden-yellow text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filter Panel */}
            {showFilters && (
              <div
                className="lg:hidden fixed inset-0 bg-black/50 z-50"
                onClick={() => setShowFilters(false)}
              >
                <div
                  className="absolute right-0 top-0 h-full w-full max-w-sm bg-white p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Filter</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Same filter content as desktop */}
                  <div className="space-y-6">
                    {/* Category */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        Kategori
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`p-3 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                              category === cat.id
                                ? "border-golden-yellow bg-yellow-50"
                                : "border-gray-200"
                            }`}
                          >
                            <span className="text-2xl">{cat.icon}</span>
                            <span className="text-xs font-medium">
                              {cat.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        Rentang Harga
                      </h3>
                      <input
                        type="range"
                        min="500000"
                        max="5000000"
                        step="100000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full accent-golden-yellow"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>Rp {priceRange[0].toLocaleString()}</span>
                        <span>Rp {priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowFilters(false)}
                      className="w-full bg-golden-yellow text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                    >
                      Terapkan Filter
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Property Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                  : "space-y-4"
              }
            >
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100"
                >
                  <div className="relative h-48 md:h-56 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-6xl md:text-7xl">
                      {property.image}
                    </span>
                    {property.badge && (
                      <div
                        className={`absolute top-3 left-3 px-3 py-1 rounded text-xs font-bold text-white ${
                          property.badge === "NEW INDING"
                            ? "bg-blue-600"
                            : property.badge === "FOR SALE"
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}
                      >
                        {property.badge}
                      </div>
                    )}
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                      <Heart size={18} className="text-gray-600" />
                    </button>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="font-bold text-gray-900 mb-1 text-base md:text-lg">
                      {property.title}
                    </h3>
                    <div className="flex items-start gap-1 text-gray-600 mb-3 text-xs md:text-sm">
                      <MapPin size={14} className="shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{property.address}</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 mb-3 text-xs md:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Bed size={16} />
                        <span>{property.beds} Kamar</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{property.baths} Mandi</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        {property.discountedPrice && (
                          <p className="text-xs text-gray-400 line-through">
                            Rp {property.price.toLocaleString()}/bulan
                          </p>
                        )}
                        <p className="text-lg md:text-xl font-bold text-golden-yellow">
                          Rp{" "}
                          {(
                            property.discountedPrice || property.price
                          ).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">/bulan</p>
                      </div>
                      <Link
                        href={`/kost/${property.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="bg-golden-yellow text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-500 transition"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-lg transition text-sm ${
                    page === 1
                      ? "bg-golden-yellow text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
