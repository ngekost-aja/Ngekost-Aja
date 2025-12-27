'use client'

import { Building2, Home, TrendingUp, DollarSign, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";

export default function OwnerDashboard() {
	const [selectedPeriod, setSelectedPeriod] = useState("month");

	// Mock data - replace with real API calls
	const kpis = [
		{
			id: "total-properties",
			label: "Total Properti",
			value: 12,
			change: "+2",
			changeType: "increase" as const,
			icon: Building2,
			color: "blue",
		},
		{
			id: "total-units",
			label: "Total Unit",
			value: 156,
			change: "+8",
			changeType: "increase" as const,
			icon: Home,
			color: "green",
		},
		{
			id: "occupancy-rate",
			label: "Tingkat Hunian",
			value: "82%",
			change: "+5%",
			changeType: "increase" as const,
			icon: TrendingUp,
			color: "purple",
		},
		{
			id: "estimated-revenue",
			label: "Estimasi Pendapatan",
			value: "Rp 128.4M",
			change: "+12%",
			changeType: "increase" as const,
			icon: DollarSign,
			color: "yellow",
		},
	];

	// Property performance data
	const propertyPerformance = [
		{
			id: 1,
			name: "Kos Ganesha Premium",
			location: "Bandung",
			totalUnits: 24,
			occupiedUnits: 22,
			occupancyRate: 92,
			monthlyRevenue: 33000000,
			status: "excellent",
		},
		{
			id: 2,
			name: "Kos Dago Residence",
			location: "Bandung",
			totalUnits: 18,
			occupiedUnits: 14,
			occupancyRate: 78,
			monthlyRevenue: 21000000,
			status: "good",
		},
		{
			id: 3,
			name: "Kos Sukajadi Indah",
			location: "Bandung",
			totalUnits: 30,
			occupiedUnits: 25,
			occupancyRate: 83,
			monthlyRevenue: 37500000,
			status: "good",
		},
		{
			id: 4,
			name: "Kos Setiabudi Elite",
			location: "Bandung",
			totalUnits: 20,
			occupiedUnits: 12,
			occupancyRate: 60,
			monthlyRevenue: 18000000,
			status: "average",
		},
		{
			id: 5,
			name: "Kos Dipatiukur",
			location: "Bandung",
			totalUnits: 16,
			occupiedUnits: 14,
			occupancyRate: 88,
			monthlyRevenue: 21000000,
			status: "excellent",
		},
	];

	// Mock chart data
	const revenueData = [
		{ month: "Jan", revenue: 110 },
		{ month: "Feb", revenue: 115 },
		{ month: "Mar", revenue: 108 },
		{ month: "Apr", revenue: 120 },
		{ month: "Mei", revenue: 118 },
		{ month: "Jun", revenue: 128 },
	];

	const occupancyTrendData = [
		{ month: "Jan", rate: 75 },
		{ month: "Feb", rate: 78 },
		{ month: "Mar", rate: 76 },
		{ month: "Apr", rate: 80 },
		{ month: "Mei", rate: 79 },
		{ month: "Jun", rate: 82 },
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
		if (status === "excellent") {
			return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Sangat Baik</span>;
		}
		if (status === "good") {
			return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Baik</span>;
		}
		return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Cukup</span>;
	};

	return (
		<div className="h-full overflow-y-auto bg-gray-50">
			<div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard Owner</h1>
						<p className="text-sm text-gray-500 mt-1">Ringkasan performa seluruh properti Anda</p>
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
								<p className="text-xl font-bold text-gray-900">{typeof kpi.value === 'string' ? kpi.value : kpi.value}</p>
							</div>
						</div>
					))}
				</div>

				{/* Charts */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Revenue Chart */}
					<div className="bg-white rounded-xl p-6 shadow-sm">
						<h3 className="text-lg font-bold text-gray-900 mb-4">Tren Pendapatan (Juta)</h3>
						<div className="h-64 flex items-end justify-between gap-2">
							{revenueData.map((data, index) => {
								const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
								const heightPercent = (data.revenue / maxRevenue) * 100;
								return (
									<div key={index} className="flex-1 flex flex-col items-center gap-2">
										<div className="w-full bg-gray-100 rounded-t-lg relative group cursor-pointer hover:bg-gray-200 transition">
											<div
												className="bg-linear-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 flex items-start justify-center pt-2"
												style={{ height: `${heightPercent * 2}px`, minHeight: "40px" }}
											>
												<span className="text-xs font-bold text-white">{data.revenue}</span>
											</div>
										</div>
										<span className="text-xs font-medium text-gray-600">{data.month}</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* Occupancy Trend Chart */}
					<div className="bg-white rounded-xl p-6 shadow-sm">
						<h3 className="text-lg font-bold text-gray-900 mb-4">Tren Tingkat Hunian</h3>
						<div className="space-y-3">
							{occupancyTrendData.map((data, index) => (
								<div key={index} className="flex items-center gap-3">
									<span className="text-sm font-medium text-gray-600 w-8">{data.month}</span>
									<div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
										<div
											className="bg-linear-to-r from-purple-500 to-purple-600 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
											style={{ width: `${data.rate}%` }}
										>
											<span className="text-xs font-bold text-white">{data.rate}%</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Property Performance Table */}
				<div className="bg-white rounded-xl shadow-sm overflow-hidden">
					<div className="p-6 border-b border-gray-200">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-bold text-gray-900">Performa Properti</h3>
							<a href="/owner/properties" className="text-sm font-medium text-golden-yellow hover:text-yellow-600 transition">
								Lihat Semua →
							</a>
						</div>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Nama Properti
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
										Lokasi
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
										Unit Terisi/Total
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Hunian
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
										Pendapatan/Bulan
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Status
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{propertyPerformance.map((property) => (
									<tr key={property.id} className="hover:bg-gray-50 transition cursor-pointer">
										<td className="px-6 py-4 whitespace-nowrap">
											<div>
												<p className="font-medium text-gray-900 text-sm">{property.name}</p>
												<p className="text-xs text-gray-500 md:hidden">{property.location}</p>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
											<p className="text-sm text-gray-600">{property.location}</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
											<p className="text-sm text-gray-900">
												{property.occupiedUnits}/{property.totalUnits}
											</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
													<div
														className={`h-full rounded-full ${property.occupancyRate >= 85 ? "bg-green-500" :
															property.occupancyRate >= 70 ? "bg-blue-500" :
																"bg-yellow-500"
															}`}
														style={{ width: `${property.occupancyRate}%` }}
													></div>
												</div>
												<span className="text-sm font-medium text-gray-900">{property.occupancyRate}%</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
											<p className="text-sm font-medium text-gray-900">
												Rp {(property.monthlyRevenue / 1000000).toFixed(1)}M
											</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{getStatusBadge(property.status)}
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