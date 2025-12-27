'use client'

import { Building2, Home, CalendarCheck, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";

export default function ManagerDashboard() {
	const [selectedPeriod, setSelectedPeriod] = useState("month");

	// Mock data - replace with real API calls
	const kpis = [
		{
			id: "total-property",
			label: "Total Properti",
			value: 12,
			change: "+2",
			changeType: "increase" as const,
			icon: Building2,
			color: "blue",
		},
		{
			id: "active-kos",
			label: "Kos Aktif",
			value: 10,
			change: "+1",
			changeType: "increase" as const,
			icon: Home,
			color: "green",
		},
		{
			id: "active-booking",
			label: "Pemesanan Aktif",
			value: 24,
			change: "+5",
			changeType: "increase" as const,
			icon: CalendarCheck,
			color: "yellow",
		},
		{
			id: "occupancy-rate",
			label: "Tingkat Hunian",
			value: "78%",
			change: "+3%",
			changeType: "increase" as const,
			icon: TrendingUp,
			color: "purple",
		},
	];

	const recentBookings = [
		{
			id: 1,
			studentName: "Budi Santoso",
			propertyName: "Kos Ganesha Premium",
			status: "pending",
			date: "27 Des 2025",
			avatar: "👨",
		},
		{
			id: 2,
			studentName: "Siti Nurhaliza",
			propertyName: "Kos Dago Residence",
			status: "approved",
			date: "26 Des 2025",
			avatar: "👩",
		},
		{
			id: 3,
			studentName: "Ahmad Fauzi",
			propertyName: "Kos Sukajadi Indah",
			status: "pending",
			date: "25 Des 2025",
			avatar: "👨‍🦱",
		},
		{
			id: 4,
			studentName: "Dewi Lestari",
			propertyName: "Kos Ganesha Premium",
			status: "approved",
			date: "24 Des 2025",
			avatar: "👩‍🦰",
		},
		{
			id: 5,
			studentName: "Rudi Hermawan",
			propertyName: "Kos Setiabudi Elite",
			status: "pending",
			date: "23 Des 2025",
			avatar: "👨‍💼",
		},
	];

	// Mock chart data
	const occupancyData = [
		{ month: "Jan", rate: 65 },
		{ month: "Feb", rate: 70 },
		{ month: "Mar", rate: 68 },
		{ month: "Apr", rate: 75 },
		{ month: "Mei", rate: 72 },
		{ month: "Jun", rate: 78 },
	];

	const bookingTrendData = [
		{ month: "Jan", bookings: 15 },
		{ month: "Feb", bookings: 18 },
		{ month: "Mar", bookings: 16 },
		{ month: "Apr", bookings: 22 },
		{ month: "Mei", bookings: 20 },
		{ month: "Jun", bookings: 24 },
	];

	const getColorClasses = (color: string) => {
		const colors = {
			blue: "bg-blue-50 text-blue-600",
			green: "bg-green-50 text-green-600",
			yellow: "bg-yellow-50 text-yellow-600",
			purple: "bg-purple-50 text-purple-600",
		};
		return colors[color as keyof typeof colors] || colors.blue;
	};

	const getStatusBadge = (status: string) => {
		if (status === "approved") {
			return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Disetujui</span>;
		}
		return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Pending</span>;
	};

	return (
		<div className="h-full overflow-y-auto bg-gray-50">
			<div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
						<p className="text-sm text-gray-500 mt-1">Ringkasan performa kos-kosan Anda</p>
					</div>
					<div className="flex gap-2">
						<button
							onClick={() => setSelectedPeriod("week")}
							className={`px-4 py-2 text-sm font-medium rounded-lg transition ${selectedPeriod === "week"
								? "bg-gray-900 text-white"
								: "bg-white text-gray-700 hover:bg-gray-100"
								}`}
						>
							Minggu Ini
						</button>
						<button
							onClick={() => setSelectedPeriod("month")}
							className={`px-4 py-2 text-sm font-medium rounded-lg transition ${selectedPeriod === "month"
								? "bg-gray-900 text-white"
								: "bg-white text-gray-700 hover:bg-gray-100"
								}`}
						>
							Bulan Ini
						</button>
					</div>
				</div>

				{/* KPI Cards - Desktop Grid */}
				<div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{kpis.map((kpi) => (
						<div key={kpi.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
							<div className="flex items-start justify-between mb-4">
								<div className={`p-3 rounded-lg ${getColorClasses(kpi.color)}`}>
									<kpi.icon size={24} />
								</div>
								<div className={`flex items-center gap-1 text-sm font-medium ${kpi.changeType === "increase" ? "text-green-600" : "text-red-600"
									}`}>
									{kpi.changeType === "increase" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
									{kpi.change}
								</div>
							</div>
							<div>
								<p className="text-sm text-gray-500 mb-1">{kpi.label}</p>
								<p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
							</div>
						</div>
					))}
				</div>

				{/* KPI Cards - Mobile Grid */}
				<div className="sm:hidden grid grid-cols-2 gap-3">
					{kpis.map((kpi) => (
						<div key={kpi.id} className="bg-white rounded-xl p-4 shadow-sm">
							<div className="flex items-start justify-between mb-3">
								<div className={`p-2 rounded-lg ${getColorClasses(kpi.color)}`}>
									<kpi.icon size={20} />
								</div>
								<div className={`flex items-center gap-1 text-xs font-medium ${kpi.changeType === "increase" ? "text-green-600" : "text-red-600"
									}`}>
									{kpi.changeType === "increase" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
									{kpi.change}
								</div>
							</div>
							<div>
								<p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
								<p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
							</div>
						</div>
					))}
				</div>

				{/* Charts */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Occupancy Chart */}
					<div className="bg-white rounded-xl p-6 shadow-sm">
						<h3 className="text-lg font-bold text-gray-900 mb-4">Grafik Tingkat Hunian</h3>
						<div className="space-y-3">
							{occupancyData.map((data, index) => (
								<div key={index} className="flex items-center gap-3">
									<span className="text-sm font-medium text-gray-600 w-8">{data.month}</span>
									<div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
										<div
											className="bg-linear-to-r from-blue-500 to-blue-600 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
											style={{ width: `${data.rate}%` }}
										>
											<span className="text-xs font-bold text-white">{data.rate}%</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Booking Trend Chart */}
					<div className="bg-white rounded-xl p-6 shadow-sm">
						<h3 className="text-lg font-bold text-gray-900 mb-4">Tren Pemesanan</h3>
						<div className="h-64 flex items-end justify-between gap-2">
							{bookingTrendData.map((data, index) => {
								const maxBookings = Math.max(...bookingTrendData.map(d => d.bookings));
								const heightPercent = (data.bookings / maxBookings) * 100;
								return (
									<div key={index} className="flex-1 flex flex-col items-center gap-2">
										<div className="w-full bg-gray-100 rounded-t-lg relative group cursor-pointer hover:bg-gray-200 transition">
											<div
												className="bg-linear-to-t from-yellow-500 to-yellow-400 rounded-t-lg transition-all duration-500 flex items-start justify-center pt-2"
												style={{ height: `${heightPercent * 2}px`, minHeight: "40px" }}
											>
												<span className="text-xs font-bold text-white">{data.bookings}</span>
											</div>
										</div>
										<span className="text-xs font-medium text-gray-600">{data.month}</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Recent Bookings */}
				<div className="bg-white rounded-xl shadow-sm overflow-hidden">
					<div className="p-6 border-b border-gray-200">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-bold text-gray-900">Pemesanan Terbaru</h3>
							<a href="/manager/booking" className="text-sm font-medium text-golden-yellow hover:text-yellow-600 transition">
								Lihat Semua →
							</a>
						</div>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Mahasiswa
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
										Nama Kos
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
										Tanggal
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Status
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{recentBookings.map((booking) => (
									<tr key={booking.id} className="hover:bg-gray-50 transition cursor-pointer">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-xl shrink-0">
													{booking.avatar}
												</div>
												<div>
													<p className="font-medium text-gray-900 text-sm">{booking.studentName}</p>
													<p className="text-xs text-gray-500 md:hidden">{booking.propertyName}</p>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
											<p className="text-sm text-gray-900">{booking.propertyName}</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
											<p className="text-sm text-gray-500">{booking.date}</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{getStatusBadge(booking.status)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}