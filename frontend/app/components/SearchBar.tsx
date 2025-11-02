"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Cari kos berdasarkan lokasi, kampus, atau tipe kos..."
  );
  const router = useRouter();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch(e as any);
  };

  return (
    <div className="flex-1 max-w-2xl">
      <form onSubmit={handleSearch} className="relative">
        <Search
          className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          size={20}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-4 lg:pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDCD44] focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#EDCD44] text-white p-2 rounded-lg hover:bg-yellow-500 transition"
        >
          <Search size={18} />
        </button>
      </form>
    </div>
  );
}
