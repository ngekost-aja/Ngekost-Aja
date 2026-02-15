import { Heart, MapPin } from 'lucide-react';
import { Property } from '../../lib/types/property';
import Link from 'next/link';

export default function CardBoardingHouse({
  property,
}: {
  property: Property;
}) {
  // Generate slug from title
  const slug = property.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return (
    <Link
      href={`/kost/${slug}`}
      className="bg-white rounded-lg md:rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100"
    >
      <div className="relative h-32 md:h-48 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <span className="text-4xl md:text-6xl">{property.image}</span>
        {property.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-bold">
            {property.discount} OFF
          </div>
        )}
        {property.badge && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-bold">
            {property.badge}
          </div>
        )}
        <button className="absolute top-2 right-2 bg-white p-1.5 md:p-2 rounded-full shadow-md hover:bg-gray-100 transition">
          <Heart
            size={14}
            className="md:w-[18px] md:h-[18px] text-gray-600"
          />
        </button>
      </div>
      <div className="p-3 md:p-4">
        <div className="flex items-center gap-1 text-[10px] md:text-xs text-gray-500 mb-1">
          <MapPin
            size={10}
            className="md:w-3 md:h-3"
          />
          <span>{property.location}</span>
        </div>
        <h3 className="text-xs md:text-base font-semibold text-gray-800 mb-2 line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-yellow-400 text-xs md:text-sm">★★★★★</span>
              <span className="text-[10px] md:text-xs text-gray-500">
                (4.8)
              </span>
            </div>
            <p className="text-sm md:text-lg font-bold text-golden-yellow">
              {property.price}
            </p>
            <p className="text-[10px] md:text-xs text-gray-500">per bulan</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
