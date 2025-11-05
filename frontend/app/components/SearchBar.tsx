"use client";

import { Search, MapPin, X, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface House {
  id: string;
  name: string;
  location: string;
  address: string;
  price: number;
  type: string;
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Cari kos berdasarkan lokasi, kampus, atau tipe kos..."
  );
  const [suggestions, setSuggestions] = useState<House[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Run only on client side
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth < 640) {
        // mobile screen
        setPlaceholder("Cari kos di dekatmu...");
      } else {
        // desktop screen
        setPlaceholder("Cari kos berdasarkan lokasi, kampus, atau tipe kos...");
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions from API
  const fetchSuggestions = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/houses?search=${encodeURIComponent(query)}&limit=5`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      
      // Assuming the API returns an array of houses or { data: houses }
      const houses = Array.isArray(data) ? data : data.data || [];
      
      setSuggestions(houses);
      setShowSuggestions(houses.length > 0);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setError("Gagal memuat saran pencarian");
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search to avoid too many API calls
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (searchQuery) {
        fetchSuggestions(searchQuery);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // Wait 300ms after user stops typing

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (house: House) => {
    setSearchQuery(house.name);
    setShowSuggestions(false);
    router.push(`/house/${house.id}`);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e as any);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex-1 max-w-2xl relative" ref={wrapperRef}>
      <form onSubmit={handleSearch} className="relative">
        <Search
          className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10"
          size={20}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          className="w-full pl-4 lg:pl-12 pr-20 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:border-transparent"
          autoComplete="off"
        />
        
        {/* Loading or Clear button */}
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-14 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <X size={18} />
            )}
          </button>
        )}

        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-golden-yellow text-white p-2 rounded-lg hover:bg-yellow-500 transition"
        >
          <Search size={18} />
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <p className="text-xs text-gray-500 px-3 py-2 font-medium">
              Saran Pencarian
            </p>
            {suggestions.map((house) => (
              <button
                key={house.id}
                onClick={() => handleSuggestionClick(house)}
                className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-lg transition flex items-start gap-3 group"
              >
                <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-golden-yellow group-hover:text-white transition shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-golden-yellow transition">
                    {house.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {house.address || house.location}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-golden-yellow">
                      {formatPrice(house.price)}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 capitalize">
                      {house.type}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-red-200 rounded-lg shadow-lg z-50 p-4">
          <p className="text-sm text-red-600 text-center">{error}</p>
        </div>
      )}

      {/* No Results Message */}
      {showSuggestions && !isLoading && suggestions.length === 0 && searchQuery.length >= 2 && !error && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <p className="text-sm text-gray-500 text-center">
            Tidak ada hasil untuk "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}