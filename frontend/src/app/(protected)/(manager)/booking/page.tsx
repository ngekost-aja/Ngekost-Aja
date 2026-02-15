'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MoreVertical, Printer, CreditCard, MapPin, Calendar, Clock, Send } from "lucide-react";

export default function ManagerDashboard() {
	const router = useRouter();
	const [selectedBooking, setSelectedBooking] = useState<number | null>(1);
	const [replyMessage, setReplyMessage] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

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

	const filteredBookings = bookings.filter(booking =>
		booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
		booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
		booking.propertyType.toLowerCase().includes(searchQuery.toLowerCase())
	);

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
							<span className="text-sm font-normal text-gray-500">({filteredBookings.length})</span>
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
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search bookings..."
							className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
						/>
					</div>
				</div>

				{/* Bookings List */}
				<div className="flex-1 overflow-y-auto">
					{filteredBookings.length > 0 ? (
						filteredBookings.map((booking) => (
							<button
								key={booking.id}
								onClick={() => {
									// On mobile, navigate to detail page
									if (window.innerWidth < 1024) {
										router.push(`/manager/booking/${booking.id}`);
									} else {
										// On desktop, update state for split view
										setSelectedBooking(booking.id);
									}
								}}
								className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition text-left ${selectedBooking === booking.id ? "bg-blue-50 border-l-4 border-l-golden-yellow" : ""
									}`}
							>
								<div className="flex items-start gap-3">
									<div className="w-12 h-12 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-2xl shrink-0">
										{booking.guestAvatar}
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between mb-1">
											<h3 className="font-semibold text-gray-900 text-sm truncate">
												{booking.guestName}
											</h3>
											<div className="flex items-center gap-2 shrink-0 ml-2">
												<span className="text-xs text-gray-500">
													{booking.bookingCode}
												</span>
												{booking.status === "active" && (
													<span className="w-2 h-2 bg-green-500 rounded-full"></span>
												)}
												{booking.status === "expired" && (
													<span className="w-2 h-2 bg-red-500 rounded-full"></span>
												)}
											</div>
										</div>
										<p className="text-sm text-gray-600 mb-1 truncate">{booking.propertyType}</p>
										<p className="text-xs text-gray-500">
											Check in: <span className="font-medium">{booking.checkIn}</span> — {booking.duration}
										</p>
									</div>
								</div>
							</button>
						))
					) : (
						<div className="flex flex-col items-center justify-center h-64 text-gray-400">
							<Search size={48} className="mb-3" />
							<p className="text-sm">No bookings found</p>
						</div>
					)}
				</div>
			</div>

			{/* Right Panel - Booking Details (Hidden on Mobile) */}
			<div className="hidden lg:flex lg:flex-1 bg-gray-50 overflow-y-auto">
				{selectedBookingData ? (
					<div className="p-4 lg:p-6 w-full mx-auto space-y-4 lg:space-y-6">
						{/* Header */}
						<div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl lg:text-2xl font-bold text-gray-900">
									Booking #{selectedBookingData.bookingCode}
								</h2>
								<button className="flex items-center gap-2 px-3 lg:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
									<Printer size={18} />
									<span className="hidden sm:inline text-sm font-medium">Print</span>
								</button>
							</div>

							{/* Action Buttons */}
							<div className="grid grid-cols-3 gap-2 lg:flex lg:flex-wrap lg:gap-3">
								<button
									onClick={handleNotifyGuest}
									className="col-span-3 lg:col-span-1 lg:flex-none bg-golden-yellow text-white px-4 lg:px-6 py-3 lg:py-2.5 rounded-lg font-medium hover:bg-yellow-500 transition text-sm lg:text-base"
								>
									Notify guest
								</button>
								<button
									onClick={handleConfirm}
									className="bg-green-600 text-white px-4 lg:px-6 py-3 lg:py-2.5 rounded-lg font-medium hover:bg-green-700 transition text-sm lg:text-base"
								>
									Confirm
								</button>
								<button
									onClick={handleReject}
									className="bg-red-600 text-white px-4 lg:px-6 py-3 lg:py-2.5 rounded-lg font-medium hover:bg-red-700 transition text-sm lg:text-base"
								>
									Reject
								</button>
							</div>
						</div>

						{/* Guest Info */}
						<div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
							<h3 className="text-base lg:text-lg font-bold text-gray-900 mb-4">Guest Information</h3>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<div className="w-14 h-14 lg:w-12 lg:h-12 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-2xl shrink-0">
										{selectedBookingData.guestAvatar}
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 text-base">{selectedBookingData.guestName}</h4>
										<p className="text-sm text-gray-500">From Sydney, Australia</p>
									</div>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
									<div className="bg-gray-50 p-3 rounded-lg">
										<p className="text-gray-500 text-xs mb-1">Phone</p>
										<p className="font-medium text-gray-900">+61 (02) 4321 9876</p>
									</div>
									<div className="bg-gray-50 p-3 rounded-lg">
										<p className="text-gray-500 text-xs mb-1">Payment</p>
										<p className="font-medium text-gray-900 flex items-center gap-1">
											Secured <CreditCard size={14} className="text-blue-600" />
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Property Details */}
						<div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
							<h3 className="text-base lg:text-lg font-bold text-gray-900 mb-4">Property Details</h3>
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="w-full sm:w-48 h-40 sm:h-32 bg-linear-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center text-5xl shrink-0">
									🏢
								</div>
								<div className="flex-1 space-y-3">
									<h4 className="text-base lg:text-lg font-bold text-gray-900">{selectedBookingData.propertyType} (84sqm)</h4>
									<div className="space-y-2 text-sm">
										<div className="flex items-center gap-2 text-gray-600">
											<MapPin size={16} className="shrink-0" />
											<span>Jl. Ganesha No. 10, Bandung</span>
										</div>
										<div className="flex items-center gap-2 text-gray-600">
											<Calendar size={16} className="shrink-0" />
											<span>Check-in: {selectedBookingData.checkIn}, 2018</span>
										</div>
										<div className="flex items-center gap-2 text-gray-600">
											<Clock size={16} className="shrink-0" />
											<span>Duration: {selectedBookingData.duration}</span>
										</div>
									</div>
									<div className="flex items-baseline gap-2">
										<span className="text-xl lg:text-2xl font-bold text-gray-900">Rp 1.500.000</span>
										<span className="text-sm text-gray-500">per month</span>
									</div>
									<div className="text-sm bg-green-50 p-3 rounded-lg">
										<p className="text-gray-600">Security deposit: <span className="font-semibold text-gray-900">Rp 1.500.000</span></p>
										<span className="inline-block mt-1 px-2 py-0.5 bg-green-500 text-white rounded text-xs font-medium">
											✓ Paid
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Emails Section */}
						<div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
							<h3 className="text-base lg:text-lg font-bold text-gray-900 mb-4">Messages</h3>
							<div className="space-y-4">
								{/* Email Message */}
								<div className="bg-blue-50 rounded-xl p-4">
									<div className="flex items-start gap-3 mb-3">
										<div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
											T
										</div>
										<div className="flex-1">
											<p className="font-semibold text-gray-900 text-sm mb-1">Dear Todd,</p>
											<p className="text-sm text-gray-700 leading-relaxed">
												Yes, the apartment includes both a desk for working and a comfortable chair.
											</p>
											<p className="text-xs text-gray-500 mt-2">2 hours ago</p>
										</div>
									</div>
								</div>

								{/* Reply Form */}
								<form onSubmit={handleSendReply} className="flex gap-2">
									<input
										type="text"
										value={replyMessage}
										onChange={(e) => setReplyMessage(e.target.value)}
										placeholder="Write a reply..."
										className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
									/>
									<button
										type="submit"
										className="bg-golden-yellow text-white px-4 lg:px-6 py-3 rounded-xl font-medium hover:bg-yellow-500 transition whitespace-nowrap flex items-center gap-2"
									>
										<Send size={18} />
										<span className="hidden sm:inline">Send</span>
									</button>
								</form>
							</div>
						</div>
					</div>
				) : (
					<div className="flex items-center justify-center h-full p-8">
						<div className="text-center">
							<div className="text-6xl mb-4">📋</div>
							<p className="text-gray-500 text-lg">Select a booking to view details</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}