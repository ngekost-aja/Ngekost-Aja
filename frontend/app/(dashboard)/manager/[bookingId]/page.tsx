'use client'

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Printer, CreditCard, MapPin, Calendar, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function BookingDetailPage() {
	const router = useRouter();
	const params = useParams();
	const bookingId = params.bookingId as string;
	const [replyMessage, setReplyMessage] = useState("");

	// Mock data - in real app, fetch based on bookingId
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

	const booking = bookings.find(b => b.id === parseInt(bookingId));

	if (!booking) {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-50">
				<div className="text-center">
					<div className="text-6xl mb-4">❌</div>
					<p className="text-gray-500 text-lg mb-4">Booking not found</p>
					<button
						onClick={() => router.push('/manager/booking')}
						className="px-6 py-3 bg-golden-yellow text-white rounded-lg font-medium hover:bg-yellow-500 transition"
					>
						Back to Bookings
					</button>
				</div>
			</div>
		);
	}

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
		<div className="min-h-screen bg-gray-50">
			{/* Mobile Header with Back Button */}
			<div className="sticky top-0 z-10 bg-white border-b border-gray-200 lg:hidden">
				<div className="flex items-center gap-3 p-4">
					<button
						onClick={() => router.push('/manager/booking')}
						className="p-2 hover:bg-gray-100 rounded-lg transition"
					>
						<ArrowLeft size={24} className="text-gray-700" />
					</button>
					<div className="flex-1">
						<h1 className="text-lg font-bold text-gray-900">Booking Details</h1>
						<p className="text-sm text-gray-500">#{booking.bookingCode}</p>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-4 lg:space-y-6">
				{/* Header - Desktop */}
				<div className="hidden lg:block bg-white rounded-xl p-6 shadow-sm">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-4">
							<button
								onClick={() => router.push('/manager/booking')}
								className="p-2 hover:bg-gray-100 rounded-lg transition"
							>
								<ArrowLeft size={24} className="text-gray-700" />
							</button>
							<h2 className="text-2xl font-bold text-gray-900">
								Booking #{booking.bookingCode}
							</h2>
						</div>
						<button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
							<Printer size={18} />
							<span className="text-sm font-medium">Print</span>
						</button>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-wrap gap-3">
						<button
							onClick={handleNotifyGuest}
							className="bg-golden-yellow text-white px-6 py-2.5 rounded-lg font-medium hover:bg-yellow-500 transition"
						>
							Notify guest
						</button>
						<button
							onClick={handleConfirm}
							className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
						>
							Confirm
						</button>
						<button
							onClick={handleReject}
							className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition"
						>
							Reject
						</button>
					</div>
				</div>

				{/* Mobile Action Buttons */}
				<div className="lg:hidden bg-white rounded-xl p-4 shadow-sm">
					<div className="grid grid-cols-3 gap-2">
						<button
							onClick={handleNotifyGuest}
							className="col-span-3 bg-golden-yellow text-white px-4 py-3 rounded-lg font-medium hover:bg-yellow-500 transition text-sm"
						>
							Notify guest
						</button>
						<button
							onClick={handleConfirm}
							className="bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition text-sm"
						>
							Confirm
						</button>
						<button
							onClick={handleReject}
							className="bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition text-sm"
						>
							Reject
						</button>
						<button className="flex items-center justify-center gap-2 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm font-medium">
							<Printer size={16} />
							Print
						</button>
					</div>
				</div>

				{/* Guest Info */}
				<div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
					<h3 className="text-base lg:text-lg font-bold text-gray-900 mb-4">Guest Information</h3>
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="w-14 h-14 lg:w-12 lg:h-12 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-2xl shrink-0">
								{booking.guestAvatar}
							</div>
							<div>
								<h4 className="font-semibold text-gray-900 text-base">{booking.guestName}</h4>
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
							<h4 className="text-base lg:text-lg font-bold text-gray-900">{booking.propertyType} (84sqm)</h4>
							<div className="space-y-2 text-sm">
								<div className="flex items-center gap-2 text-gray-600">
									<MapPin size={16} className="shrink-0" />
									<span>Jl. Ganesha No. 10, Bandung</span>
								</div>
								<div className="flex items-center gap-2 text-gray-600">
									<Calendar size={16} className="shrink-0" />
									<span>Check-in: {booking.checkIn}, 2018</span>
								</div>
								<div className="flex items-center gap-2 text-gray-600">
									<Clock size={16} className="shrink-0" />
									<span>Duration: {booking.duration}</span>
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

				{/* Messages Section */}
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
		</div>
	);
}
