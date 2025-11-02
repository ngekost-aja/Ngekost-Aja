"use client";

import { useState } from "react";
import {
  MapPin,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Wind,
  Bed,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/ui/Navbar";

export default function KostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState("2021-10-07");
  const [checkOutDate, setCheckOutDate] = useState("2021-10-08");
  const [guests, setGuests] = useState("2 Dewasa, 1 Anak");
  const [activeTab, setActiveTab] = useState("description");

  // Mock data - in real app, fetch based on params.id
  const property = {
    title: "Kos Eksklusif Dekat Kampus ITB",
    subtitle: "Jl. Ganesha No. 10, Kec. Coblong, Kota Bandung, Jawa Barat",
    rating: 5.0,
    reviews: 245,
    badges: ["Perfect", "Terverifikasi", "Top Value"],
    stars: 5,
    pricePerNight: 50000,
    images: ["🏠", "🛏️", "🍽️", "🚿", "🏊"],
    description:
      "Kos apartemen di lokasi strategis di Bandung. Terletak dekat Universitas Muhammadiyah Malang, Univ Negeri Malang dan Univ Brawijaya, this is perfect for students and academics. This is in the main road to Batu, the main tourist attractions in East Java. So, it is well suited for tourists. This has a stunning Arguna Mountain view with misty ambiance in morning. It has kitchen, rest easy sofa and bunk bed & it caters up 3 guests. It has two pools, gym, futsal field, minimarket and coffee shop.",
    features: [
      { icon: <Wifi size={20} />, name: "Wi-Fi" },
      { icon: <Bed size={20} />, name: "King Bed" },
      { icon: <Utensils size={20} />, name: "Dapur" },
      { icon: <Coffee size={20} />, name: "Sarapan" },
      { icon: <Wind size={20} />, name: "AC" },
      { icon: <Car size={20} />, name: "Parkir" },
    ],
    extraFacilities: [
      { name: "Sarapan setiap hari", price: 10000, included: false },
      { name: "Parkiran sepeda motor per orang", price: 10000, included: true },
      { name: "Bantal tambahan", price: 0, included: false },
    ],
  };

  const totalNights = 1;
  const roomPrice = property.pricePerNight * totalNights;
  const discount = roomPrice * 0.2;
  const breakfastPrice = 10000;
  const serviceFee = 5000;
  const totalPayment = roomPrice - discount + breakfastPrice + serviceFee;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  const handleBookNow = () => {
    // Store booking data in localStorage (frontend only)
    const bookingData = {
      property: property.title,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests,
      totalPayment: totalPayment,
    };
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    router.push("/booking/confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        showBackButton={true}
        showTopBar={false}
        showNavigation={false}
        showSearch={true}
      />

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative">
                <div className="relative h-64 md:h-96 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-8xl md:text-9xl">
                    {property.images[currentImageIndex]}
                  </span>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition"
                  >
                    <ChevronLeft size={20} className="md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition"
                  >
                    <ChevronRight size={20} className="md:w-6 md:h-6" />
                  </button>
                  <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 bg-black/60 text-white px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm">
                    +{property.images.length} Foto
                  </div>
                </div>
                <div className="flex gap-2 p-3 md:p-4 overflow-x-auto">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition ${
                        currentImageIndex === idx
                          ? "border-[#EDCD44]"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl md:text-3xl">
                        {img}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                <span className="bg-green-100 text-green-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                  {property.badges[0]}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                  {property.badges[1]}
                </span>
                <span className="bg-orange-100 text-orange-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                  {property.badges[2]}
                </span>
                <div className="flex items-center gap-1 ml-auto">
                  <span className="text-yellow-400 text-sm md:text-base">
                    {"★".repeat(property.stars)}
                  </span>
                </div>
              </div>

              <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-start gap-2 text-gray-600 text-sm md:text-base mb-4">
                <MapPin size={18} className="shrink-0 mt-0.5 md:w-5 md:h-5" />
                <span>{property.subtitle}</span>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-4 md:mb-6">
                <div className="flex gap-4 md:gap-8 overflow-x-auto">
                  {["description", "features", "virtual", "price"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 md:pb-4 text-sm md:text-base font-medium whitespace-nowrap transition ${
                          activeTab === tab
                            ? "text-[#EDCD44] border-b-2 border-[#EDCD44]"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab === "description" && "Deskripsi"}
                        {tab === "features" && "Fasilitas"}
                        {tab === "virtual" && "Virtual Tour"}
                        {tab === "price" && "Harga"}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Description Tab */}
              {activeTab === "description" && (
                <div className="text-gray-600 text-sm md:text-base leading-relaxed">
                  <p>{property.description}</p>
                </div>
              )}

              {/* Features Tab */}
              {activeTab === "features" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {property.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="text-[#EDCD44]">{feature.icon}</div>
                      <span className="text-sm md:text-base font-medium text-gray-700">
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Virtual Tour Tab */}
              {activeTab === "virtual" && (
                <div className="text-center py-8 md:py-12">
                  <div className="text-6xl md:text-8xl mb-4">🏠</div>
                  <p className="text-gray-600 text-sm md:text-base">
                    Virtual tour akan segera hadir
                  </p>
                </div>
              )}

              {/* Price Tab */}
              {activeTab === "price" && (
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm md:text-base">
                      Harga per malam
                    </span>
                    <span className="font-bold text-base md:text-lg">
                      Rp {property.pricePerNight.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-sm md:text-base">Diskon 20%</span>
                    <span className="font-bold text-base md:text-lg">
                      -Rp {discount.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg sticky top-24">
              <div className="flex items-baseline gap-2 mb-4 md:mb-6">
                <span className="text-2xl md:text-3xl font-bold text-gray-900">
                  Rp {property.pricePerNight.toLocaleString()}
                </span>
                <span className="text-sm md:text-base text-gray-500">
                  /malam
                </span>
                {discount > 0 && (
                  <span className="bg-[#EDCD44] text-white px-2 py-0.5 rounded text-xs font-bold ml-auto">
                    -20%
                  </span>
                )}
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                <div>
                  <label className="text-xs md:text-sm text-gray-600 mb-1 block">
                    Check In
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-2 md:px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDCD44] text-xs md:text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs md:text-sm text-gray-600 mb-1 block">
                    Check Out
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-2 md:px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDCD44] text-xs md:text-sm"
                  />
                </div>
              </div>

              {/* Guest Selection */}
              <div className="mb-4 md:mb-6">
                <label className="text-xs md:text-sm text-gray-600 mb-1 block">
                  Tamu
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-2 md:px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDCD44] text-xs md:text-sm"
                >
                  <option>1 Dewasa</option>
                  <option>2 Dewasa</option>
                  <option>2 Dewasa, 1 Anak</option>
                  <option>3 Dewasa</option>
                </select>
              </div>

              {/* Extra Facilities */}
              <div className="mb-4 md:mb-6 space-y-2 md:space-y-3">
                <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                  Fasilitas Tambahan
                </h3>
                {property.extraFacilities.map((facility, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs md:text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={facility.included}
                        className="rounded"
                      />
                      <span className="text-gray-700">{facility.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {facility.price === 0
                        ? "Gratis"
                        : `Rp ${facility.price.toLocaleString()}`}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2 md:space-y-3 mb-4 md:mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
                  Rincian Harga
                </h3>
                <div className="flex justify-between text-xs md:text-sm text-gray-600">
                  <span>{totalNights} malam</span>
                  <span>Rp {roomPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm text-green-600">
                  <span>Diskon 20%</span>
                  <span>-Rp {discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm text-gray-600">
                  <span>Sarapan setiap hari per orang</span>
                  <span>Rp {breakfastPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm text-gray-600">
                  <span>Biaya layanan</span>
                  <span>Rp {serviceFee.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4 mb-4 md:mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-base md:text-lg text-gray-900">
                    Total Pembayaran
                  </span>
                  <span className="font-bold text-xl md:text-2xl text-[#EDCD44]">
                    Rp {totalPayment.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                className="w-full bg-[#EDCD44] text-white py-3 md:py-4 rounded-lg font-bold text-sm md:text-base hover:bg-yellow-500 transition shadow-lg hover:shadow-xl"
              >
                Pesan Sekarang
              </button>
              <p className="text-center text-xs md:text-sm text-gray-500 mt-3">
                Anda tidak akan dikenakan biaya apapun
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
