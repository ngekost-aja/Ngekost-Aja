import { MapPin } from "lucide-react";
import House from "@/models/House";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/StringFormatter";

export default function SuggestionSearchCard({
  house,
  setSearchQuery,
  setShowSuggestions,
}: {
  house: House;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setShowSuggestions: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const handleSuggestionClick = (house: House) => {
    setSearchQuery("");
    setShowSuggestions(false);
    // Navigate to specific house detail page
    router.push(`/kost/${house.id}`);
  };

  return (
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
        <p className="text-xs text-gray-500 truncate">{house.location}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-semibold text-golden-yellow">
            {formatPrice(house.pricePerMonth)}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500 capitalize">{house.type}</span>
        </div>
      </div>
    </button>
  );
}
