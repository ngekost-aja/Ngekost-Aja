'use client'

import { useState } from "react";
import { 
  Search, 
  ChevronDown,
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  DollarSign,
  Calendar,
	MessageSquare
} from "lucide-react";
import Link from "next/link";

export default function OwnerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setpriceFilter] = useState("Up to $35k");
  const [amenitiesFilter, setAmenitiesFilter] = useState("Amenities");
  const [typeFilter, setTypeFilter] = useState("Type");
  const [moreFilter, setMoreFilter] = useState("More");

  const properties = [
    {
      id: 1,
      name: "Sunset Paradise",
      type: "Bedroom • Center",
      bedrooms: 2,
      guests: 4,
      baths: 1,
      area: 240,
      price: 75000,
      image: "🏢",
      status: "available",
      isFavorite: false,
    },
    {
      id: 2,
      name: "Serenity Heights",
      type: "Bedroom • Gajah Mada",
      bedrooms: 2,
      guests: 4,
      baths: 1,
      area: 656,
      price: 95000,
      image: "🏠",
      status: "available",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Oakwood Manor",
      type: "Bedroom • GBU",
      bedrooms: 2,
      guests: 4,
      baths: 1,
      area: 153,
      price: 45880,
      image: "🏘️",
      status: "rented",
      isFavorite: false,
    },
    {
      id: 4,
      name: "Enchanted Gardens",
      type: "Bedroom • Janti",
      bedrooms: 2,
      guests: 4,
      baths: 1,
      area: 550,
      price: 91080,
      image: "🏛️",
      status: "available",
      isFavorite: false,
    },
    {
      id: 5,
      name: "The Haven Residences",
      type: "Bedroom • Kaliurang",
      bedrooms: 1,
      guests: 2,
      baths: 1,
      area: 450,
      price: 80500,
      image: "🏢",
      status: "available",
      isFavorite: false,
    },
    {
      id: 6,
      name: "The Manor Residences",
      type: "Bedroom • Seturan",
      bedrooms: 2,
      guests: 3,
      baths: 1,
      area: 380,
      price: 72000,
      image: "🏗️",
      status: "maintenance",
      isFavorite: false,
    },
  ];

  const stats = [
    {
      label: "Total Properties",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      label: "Active Tenants",
      value: "18",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "bg-green-500",
    },
    {
      label: "Monthly Income",
      value: "$45,380",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "bg-[#EDCD44]",
    },
    {
      label: "Occupancy Rate",
      value: "88%",
      change: "-2%",
      trend: "down",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  const recentActivities = [
    {
      type: "booking",
      property: "Sunset Paradise",
      tenant: "John Doe",
      date: "2 hours ago",
      status: "confirmed",
    },
    {
      type: "payment",
      property: "Serenity Heights",
      tenant: "Jane Smith",
      date: "5 hours ago",
      status: "completed",
    },
    {
      type: "inquiry",
      property: "Oakwood Manor",
      tenant: "Mike Johnson",
      date: "1 day ago",
      status: "pending",
    },
  ];

  const filteredProperties = properties.filter((property) => {
    if (!searchQuery) return true;
    return property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           property.type.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Good Morning, <span className="text-[#EDCD44]">Ahsan</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              📍 414 E Clark street, Vermillion
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Search size={20} className="text-gray-600" />
            </button>
            <div className="w-10 h-10 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-xl">
              👨‍💼
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">Ahsan</p>
              <button className="text-xs text-gray-500 flex items-center gap-1">
                Owner <ChevronDown size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={priceFilter}
            onChange={(e) => setpriceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDCD44] text-sm"
          >
            <option>Up to $35k</option>
            <option>$35k - $50k</option>
            <option>$50k - $75k</option>
            <option>$75k+</option>
          </select>
          <select
            value={amenitiesFilter}
            onChange={(e) => setAmenitiesFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDCD44] text-sm"
          >
            <option>Amenities</option>
            <option>WiFi</option>
            <option>AC</option>
            <option>Parking</option>
            <option>Kitchen</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDCD44] text-sm"
          >
            <option>Type</option>
            <option>Studio</option>
            <option>1 Bedroom</option>
            <option>2 Bedrooms</option>
            <option>3+ Bedrooms</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            More
          </button>
        </div>

        {/* Availability Info */}
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <span>More than 1k house available</span>
          <span className="text-gray-400">•</span>
          <button className="text-[#EDCD44] hover:underline flex items-center gap-1">
            Last added <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 lg:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Properties List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 lg:p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">My Properties</h2>
              <Link href="/owner/properties" className="text-sm text-[#EDCD44] hover:underline font-medium">
                View All
              </Link>
            </div>
            <div className="p-4 space-y-3">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition cursor-pointer"
                >
                  <div className="w-24 h-24 bg-linear-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-4xl shrink-0">
                    {property.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-base mb-1 truncate">
                          {property.name}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin size={14} />
                          {property.type}
                        </p>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded-full transition shrink-0 ml-2">
                        <Heart size={18} className="text-gray-400" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Bed size={14} />
                        {property.bedrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {property.guests}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath size={14} />
                        {property.baths}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize size={14} />
                        {property.area} m²
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          ${property.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">per month</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        property.status === 'available' 
                          ? 'bg-green-100 text-green-700'
                          : property.status === 'rented'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {property.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Property Preview */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-48 bg-linear-to-br from-orange-200 to-orange-300 flex items-center justify-center text-7xl">
              🏠
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Serenity Heights</h3>
              <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                <MapPin size={14} />
                414 E Oak street, Vermillion
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <Bed size={16} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">2</p>
                  <p className="text-xs text-gray-500">Bedroom</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <Bath size={16} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">1</p>
                  <p className="text-xs text-gray-500">Bathroom</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <Maximize size={16} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">656</p>
                  <p className="text-xs text-gray-500">m²</p>
                </div>
              </div>
              <button className="w-full bg-[#EDCD44] text-white py-2.5 rounded-lg font-semibold hover:bg-yellow-500 transition">
                Book a tour
              </button>
            </div>
          </div>

          {/* Income Chart */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Monthly Stats</h3>
              <select className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#EDCD44]">
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
            <div className="space-y-3">
              {[
                { month: 'Jan', amount: 42000, percent: 70 },
                { month: 'Feb', amount: 38000, percent: 60 },
                { month: 'Mar', amount: 45000, percent: 75 },
                { month: 'Apr', amount: 50000, percent: 85 },
              ].map((data, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">{data.month}</span>
                    <span className="font-semibold text-gray-900">${data.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#EDCD44] rounded-full transition-all"
                      style={{ width: `${data.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Income</span>
                <span className="text-lg font-bold text-gray-900">$175,000</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
                    activity.type === 'booking' ? 'bg-blue-500' :
                    activity.type === 'payment' ? 'bg-green-500' :
                    'bg-orange-500'
                  }`}>
                    {activity.type === 'booking' ? <Calendar size={16} /> :
                     activity.type === 'payment' ? <DollarSign size={16} /> :
                     <MessageSquare size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {activity.property}
                    </p>
                    <p className="text-xs text-gray-500">{activity.tenant}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full h-fit ${
                    activity.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                    activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}