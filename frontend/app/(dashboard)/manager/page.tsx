'use client'

import { useState } from "react";
import { Search, MoreVertical, Printer, CreditCard, MapPin, Calendar, Clock } from "lucide-react";

export default function ManagerDashboard() {
  const [selectedBooking, setSelectedBooking] = useState<number | null>(1);
  const [replyMessage, setReplyMessage] = useState("");

  const bookings = [
    {
      id: 1,
      guestName: "Aaron Taylor",
      guestAvatar: "👨",
      propertyType: "Studio Apartment",
      checkIn: "Dec 24",
      duration: "1 month",
      bookingCode: "B1950E",
      status: "active",
    },
    {
      id: 2,
      guestName: "Todd Ward",
      guestAvatar: "👨‍💼",
      propertyType: "Superior Premium",
      checkIn: "Jan 18",
      duration: "1 month",
      bookingCode: "A1453D",
      status: "active",
    },
    {
      id: 3,
      guestName: "Jessica Price",
      guestAvatar: "👩",
      propertyType: "Studio Apartment",
      checkIn: "Apr 8",
      duration: "3 months",
      bookingCode: "U224PL",
      status: "active",
    },
    {
      id: 4,
      guestName: "Anna Long",
      guestAvatar: "👩‍🦰",
      propertyType: "Deluxe Suite",
      checkIn: "May 14",
      duration: "1 month",
      bookingCode: "NR72VC",
      status: "expired",
    },
    {
      id: 5,
      guestName: "Timothy Jenkins",
      guestAvatar: "👨‍🦱",
      propertyType: "Superior Premium",
      checkIn: "Jul 7",
      duration: "1 month",
      bookingCode: "L9846Z",
      status: "active",
    },
  ];

  const selectedBookingData = bookings.find(b => b.id === selectedBooking);

  const handleNotifyGuest = () => {
    alert("Guest notified!");
  };

  const handleConfirm = () => {
    alert("Booking confirmed!");
  };

  const handleReject = () => {
    alert("Booking rejected!");
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyMessage.trim()) {
      alert(`Reply sent: ${replyMessage}`);
      setReplyMessage("");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Left Panel - Bookings List */}
      <div className="w-full lg:w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2">
              📅 Bookings
              <span className="text-sm font-normal text-gray-500">(5)</span>
            </h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <MoreVertical size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
            />
          </div>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto">
          {bookings.map((booking) => (
            <button
              key={booking.id}
              onClick={() => setSelectedBooking(booking.id)}
              className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition text-left ${
                selectedBooking === booking.id ? "bg-blue-50 border-l-4 border-l-golden-yellow" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-xl shrink-0">
                  {booking.guestAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {booking.guestName}
                    </h3>
                    <span className="text-xs text-gray-500 shrink-0">
                      {booking.bookingCode}
                    </span>
                    {booking.status === "active" && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 ml-2"></span>
                    )}
                    {booking.status === "expired" && (
                      <span className="w-2 h-2 bg-red-500 rounded-full shrink-0 ml-2"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{booking.propertyType}</p>
                  <p className="text-xs text-gray-500">
                    Check in: <span className="font-medium">{booking.checkIn}</span> — {booking.duration}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Booking Details */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        {selectedBookingData ? (
          <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Booking #{selectedBookingData.bookingCode}
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                  <Printer size={18} />
                  <span className="hidden sm:inline text-sm font-medium">Print</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleNotifyGuest}
                  className="flex-1 sm:flex-none bg-golden-yellow text-white px-6 py-2.5 rounded-lg font-medium hover:bg-yellow-500 transition"
                >
                  Notify guest
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Confirm
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 sm:flex-none bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>

            {/* Guest Info */}
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Guest Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-2xl">
                    {selectedBookingData.guestAvatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedBookingData.guestName}</h4>
                    <p className="text-sm text-gray-500">From Sydney, Australia</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">+61 (02) 4321 9876</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment</p>
                    <p className="font-medium text-gray-900 flex items-center gap-1">
                      Secured with <CreditCard size={14} className="text-blue-600" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Property Details</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-48 h-32 bg-linear-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center text-5xl">
                  🏢
                </div>
                <div className="flex-1 space-y-3">
                  <h4 className="text-lg font-bold text-gray-900">{selectedBookingData.propertyType} (84sqm)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span>Jl. Ganesha No. 10, Bandung</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span>Check-in: {selectedBookingData.checkIn}, 2018</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span>Duration: {selectedBookingData.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">THB50,000</span>
                    <span className="text-sm text-gray-500">per month</span>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">Security deposit: <span className="font-semibold text-gray-900">THB50,000</span></p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      ✓ Paid
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emails Section */}
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Emails</h3>
              <div className="space-y-4">
                {/* Email Message */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      T
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">Dear Todd,</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    Yes, the apartment includes both a desk for working and a comfortable chair.
                  </p>
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="flex gap-3">
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-golden-yellow text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition whitespace-nowrap"
                  >
                    Send reply
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-500">Select a booking to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}