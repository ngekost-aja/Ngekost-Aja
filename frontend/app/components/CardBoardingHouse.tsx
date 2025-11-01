import { Heart, MapPin } from "lucide-react";
import { Property } from "../types/property";

export default function CardBoardingHouse({ property } : { property: Property}) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100"
    >
      <div className="relative h-48 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <span className="text-6xl">{property.image}</span>
        {property.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            {property.discount} OFF
          </div>
        )}
        {property.badge && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
            {property.badge}
          </div>
        )}
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
          <Heart size={18} className="text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
          <MapPin size={12} />
          <span>{property.location}</span>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">{property.title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-xs text-gray-500">(4.8)</span>
            </div>
            <p className="text-lg font-bold text-[#EDCD44]">{property.price}</p>
            <p className="text-xs text-gray-500">per bulan</p>
          </div>
          <button className="bg-[#EDCD44] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-500 transition">
            Lihat
          </button>
        </div>
      </div>
    </div>
  );
}
