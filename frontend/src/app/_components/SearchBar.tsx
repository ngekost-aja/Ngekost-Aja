"use client";

import { Search, X, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import SuggestionSearchCard from "./SuggestionSearchCard";
import { House } from "@/lib/types";

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
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPlaceholder("Cari kos di dekatmu...");
      } else {
        setPlaceholder("Cari kos berdasarkan lokasi, kampus, atau tipe kos...");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    }, 300);

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
      // Navigate to search page with query parameter
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
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
            {suggestions.map((house, index) => (
              <SuggestionSearchCard
                key={index}
                house={house}
                setSearchQuery={setSearchQuery}
                setShowSuggestions={setShowSuggestions}
              />
            ))}
          </div>
        </div>
      )}

      {error && showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-red-200 rounded-lg shadow-lg z-50 p-4">
          <p className="text-sm text-red-600 text-center">{error}</p>
        </div>
      )}

      {showSuggestions &&
        !isLoading &&
        suggestions.length === 0 &&
        searchQuery.length >= 2 &&
        !error && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
            <p className="text-sm text-gray-500 text-center">
              Tidak ada hasil untuk "{searchQuery}"
            </p>
            <button
              onClick={handleSearch}
              className="mt-2 w-full bg-golden-yellow text-white py-2 rounded-lg text-sm font-medium hover:bg-yellow-500 transition"
            >
              Cari di semua kos
            </button>
          </div>
        )}
    </div>
  );
}
