"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  MapPin,
  SlidersHorizontal,
  Grid3x3,
  List,
  Heart,
  Bed,
  Users,
  X,
  Loader2,
  Search,
} from "lucide-react";
import Navbar from "../components/ui/Navbar";

interface Property {
  id: string;
  name: string;
  address: string;
  location: string;
  price: number;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images?: string[];
  rating?: number;
  isFavorite?: boolean;
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q");
  const locationParam = searchParams.get("location");

  const [searchQuery, setSearchQuery] = useState(queryParam || locationParam || "");
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [category, setCategory] = useState("house");
  const [priceRange, setPriceRange] = useState([500000, 3000000]);
  const [propertySize, setPropertySize] = useState([500, 2000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [parking, setParking] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch properties from API
  const fetchProperties = async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      
      if (searchQuery) params.append("search", searchQuery);
      if (category && category !== "house") params.append("type", category);
      params.append("minPrice", priceRange[0].toString());
      params.append("maxPrice", priceRange[1].toString());
      if (bedrooms > 0) params.append("bedrooms", bedrooms.toString());
      if (bathrooms > 0) params.append("bathrooms", bathrooms.toString());
      params.append("page", page.toString());
      params.append("limit", "12");

      // Sort
      if (sortBy === "price-low") params.append("sort", "price:asc");
      if (sortBy === "price-high") params.append("sort", "price:desc");
      if (sortBy === "newest") params.append("sort", "createdAt:desc");
      if (sortBy === "rating") params.append("sort", "rating:desc");

      const response = await fetch(`${apiUrl}/houses?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      
      // Adjust based on your API response structure
      const propertiesData = Array.isArray(data) ? data : data.data || [];
      const total = data.total || data.meta?.total || propertiesData.length;
      const pages = data.totalPages || data.meta?.totalPages || Math.ceil(total / 12);

      setProperties(propertiesData);
      setTotalResults(total);
      setTotalPages(pages);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Gagal memuat data properti. Silakan coba lagi.");
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch and when search query changes
  useEffect(() => {
    if (queryParam || locationParam) {
      setSearchQuery(queryParam || locationParam || "");
      fetchProperties(1);
    }
  }, [queryParam, locationParam]);

  // Apply filters
  const handleApplyFilters = () => {
    setShowFilters(false);
    fetchProperties(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    fetchProperties(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle search from the page
  const handleLocalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      fetchProperties(1);
    }
  };

  const categories = [
    { id: "house", icon: "🏠", name: "Kos" },
    { id: "putra", icon: "👨", name: "Kos Putra" },
    { id: "putri", icon: "👩", name: "Kos Putri" },
    { id: "campur", icon: "🏡", name: "Kos Campur" },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

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
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
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
                      <option value={0}>Semua</option>
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
                      <option value={0}>Semua</option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Apply Filter Button */}
              <button
                onClick={handleApplyFilters}
                className="w-full bg-golden-yellow text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
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
                    {isLoading ? (
                      "Mencari..."
                    ) : (
                      <>
                        {totalResults} Hasil
                        {searchQuery && (
                          <>
                            {" "}untuk{" "}
                            <span className="text-golden-yellow">
                              {searchQuery}
                            </span>
                          </>
                        )}
                      </>
                    )}
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
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      fetchProperties(1);
                    }}
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
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleApplyFilters}
                      className="w-full bg-golden-yellow text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                    >
                      Terapkan Filter
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 size={48} className="animate-spin text-golden-yellow mb-4" />
                <p className="text-gray-600">Memuat hasil pencarian...</p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => fetchProperties(currentPage)}
                  className="bg-golden-yellow text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition"
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {/* No Results */}
            {!isLoading && !error && properties.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Tidak ada hasil ditemukan
                </h3>
                <p className="text-gray-600 mb-6">
                  Coba ubah filter pencarian atau kata kunci Anda
                </p>
                <Link
                  href="/"
                  className="inline-block bg-golden-yellow text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            )}

            {/* Property Grid/List */}
            {!isLoading && !error && properties.length > 0 && (
              <>
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
                      <div className="relative h-48 md:h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0]}
                            alt={property.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-6xl md:text-7xl">🏠</span>
                        )}
                        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                          <Heart size={18} className="text-gray-600" />
                        </button>
                      </div>
                      <div className="p-4 md:p-5">
                        <h3 className="font-bold text-gray-900 mb-1 text-base md:text-lg line-clamp-1">
                          {property.name}
                        </h3>
                        <div className="flex items-start gap-1 text-gray-600 mb-3 text-xs md:text-sm">
                          <MapPin size={14} className="shrink-0 mt-0.5" />
                          <span className="line-clamp-1">
                            {property.address || property.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4 mb-3 text-xs md:text-sm text-gray-600">
                          {property.bedrooms && (
                            <div className="flex items-center gap-1">
                              <Bed size={16} />
                              <span>{property.bedrooms} Kamar</span>
                            </div>
                          )}
                          {property.bathrooms && (
                            <div className="flex items-center gap-1">
                              <Users size={16} />
                              <span>{property.bathrooms} Mandi</span>
                            </div>
                          )}
                          {property.area && (
                            <div className="flex items-center gap-1">
                              <span>{property.area} m²</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-lg md:text-xl font-bold text-golden-yellow">
                              {formatPrice(property.price)}
                            </p>
                            <p className="text-xs text-gray-500">/bulan</p>
                          </div>
                          <Link
                            href={`/kost/${property.id}`}
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
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                      const page = idx + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg transition text-sm ${
                            page === currentPage
                              ? "bg-golden-yellow text-white"
                              : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}