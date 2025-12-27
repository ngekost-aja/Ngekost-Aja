'use client'

import { useState } from "react";
import { Download, TrendingUp, TrendingDown, DollarSign, Building2, Percent, PiggyBank } from "lucide-react";

export default function OwnerFinanceReportPage() {
	const [selectedPeriod, setSelectedPeriod] = useState("month");
	const [selectedYear, setSelectedYear] = useState("2025");
	const [selectedProperty, setSelectedProperty] = useState("all");

	// Mock data - replace with real API calls
	const properties = [
		{ id: 1, name: "Kos Ganesha Premium" },
		{ id: 2, name: "Kos Dago Residence" },
		{ id: 3, name: "Kos Sukajadi Indah" },
		{ id: 4, name: "Kos Setiabudi Elite" },
	];

	const metrics = [
		{
			id: "total-revenue",
			label: "Total Pendapatan",
			value: "Rp 245.8M",
			change: "+18%",
			changeType: "increase" as const,
			icon: DollarSign,
			color: "green",
		},
		{
			id: "total-properties",
			label: "Total Properti",
			value: "6",
			change: "+1",
			changeType: "increase" as const,
			icon: Building2,
			color: "blue",
		},
		{
			id: "avg-occupancy",
			label: "Rata-rata Hunian",
			value: "87%",
			change: "+5%",
			changeType: "increase" as const,
			icon: Percent,
			color: "purple",
		},
		{
			id: "net-profit",
			label: "Keuntungan Bersih",
			value: "Rp 189.4M",
			change: "+22%",
			changeType: "increase" as const,
			icon: PiggyBank,
			color: "yellow",
		},
	];

	const monthlyData = [
		{ month: "Jan", revenue: 38.5, expenses: 12.2, profit: 26.3 },
		{ month: "Feb", revenue: 39.8, expenses: 12.8, profit: 27.0 },
		{ month: "Mar", revenue: 37.2, expenses: 11.5, profit: 25.7 },
		{ month: "Apr", revenue: 41.5, expenses: 13.2, profit: 28.3 },
		{ month: "Mei", revenue: 42.8, expenses: 13.8, profit: 29.0 },
		{ month: "Jun", revenue: 46.0, expenses: 14.5, profit: 31.5 },
	];

	const propertyPerformance = [
		{
			id: 1,
			name: "Kos Ganesha Premium",
			revenue: 52800000,
			occupancy: 92,
			units: 24,
			trend: "up",
		},
		{
			id: 2,
			name: "Kos Dago Residence",
			revenue: 42000000,
			occupancy: 78,
			units: 18,
			trend: "up",
		},
		{
			id: 3,
			name: "Kos Sukajadi Indah",
			revenue: 75000000,
			occupancy: 83,
			units: 30,
			trend: "down",
		},
		{
			id: 4,
			name: "Kos Setiabudi Elite",
			revenue: 46800000,
			occupancy: 60,
			units: 20,
			trend: "up",
		},
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

	const handleDownloadReport = () => {
		// In real app, generate and download PDF/Excel report
		alert("Download laporan keuangan untuk periode " + selectedPeriod);
	};

	return (
		<div className="h-full overflow-y-auto bg-gray-50">
			<div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Laporan Keuangan</h1>
						<p className="text-sm text-gray-500 mt-1">Ringkasan pendapatan dari semua properti Anda</p>
					</div>
					<div className="flex gap-2">
						<select
							value={selectedYear}
							onChange={(e) => setSelectedYear(e.target.value)}
							className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow"
						>
							<option value="2025">2025</option>
							<option value="2024">2024</option>
							<option value="2023">2023</option>
						</select>
						<button
							onClick={handleDownloadReport}
							className="flex items-center gap-2 px-4 py-2 bg-golden-yellow text-white rounded-lg font-medium hover:bg-yellow-500 transition"
						>
							<Download size={18} />
							<span className="hidden sm:inline">Download Laporan</span>
						</button>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-white rounded-xl p-4 shadow-sm">
					<div className="flex flex-col sm:flex-row gap-3">
						{/* Period Selector */}
						<div className="flex gap-2 overflow-x-auto">
							<button
								onClick={() => setSelectedPeriod("week")}
								className={`px-4 py-2 text-sm font-medium rounded-lg transition whitespace-nowrap ${selectedPeriod === "week"
									? "bg-gray-900 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}
							>
								Minggu Ini
							</button>
							<button
								onClick={() => setSelectedPeriod("month")}
								className={`px-4 py-2 text-sm font-medium rounded-lg transition whitespace-nowrap ${selectedPeriod === "month"
									? "bg-gray-900 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}
							>
								Bulan Ini
							</button>
							<button
								onClick={() => setSelectedPeriod("quarter")}
								className={`px-4 py-2 text-sm font-medium rounded-lg transition whitespace-nowrap ${selectedPeriod === "quarter"
									? "bg-gray-900 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}
							>
								Kuartal Ini
							</button>
							<button
								onClick={() => setSelectedPeriod("year")}
								className={`px-4 py-2 text-sm font-medium rounded-lg transition whitespace-nowrap ${selectedPeriod === "year"
									? "bg-gray-900 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}
							>
								Tahun Ini
							</button>
						</div>

						{/* Property Filter */}
						<select
							value={selectedProperty}
							onChange={(e) => setSelectedProperty(e.target.value)}
							className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow whitespace-nowrap"
						>
							<option value="all">Semua Properti</option>
							{properties.map((property) => (
								<option key={property.id} value={property.id}>
									{property.name}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Metrics Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{metrics.map((metric) => (
						<div key={metric.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
							<div className="flex items-start justify-between mb-4">
								<div className={`p-3 rounded-lg ${getColorClasses(metric.color)}`}>
									<metric.icon size={24} />
								</div>
								<div className={`flex items-center gap-1 text-sm font-medium ${metric.changeType === "increase" ? "text-green-600" : "text-red-600"
									}`}>
									{metric.changeType === "increase" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
									{metric.change}
								</div>
							</div>
							<div>
								<p className="text-sm text-gray-500 mb-1">{metric.label}</p>
								<p className="text-2xl font-bold text-gray-900">{metric.value}</p>
							</div>
						</div>
					))}
				</div>

				{/* Revenue Chart */}
				<div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
					<h3 className="text-base lg:text-lg font-bold text-gray-900 mb-4 lg:mb-6">Grafik Pendapatan, Pengeluaran & Keuntungan</h3>
					{/* Scrollable on mobile */}
					<div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
						<div className="min-w-[500px] lg:min-w-0 h-48 lg:h-64 flex items-end justify-between gap-1 lg:gap-2">
							{monthlyData.map((data, index) => {
								const maxValue = Math.max(...monthlyData.map(d => Math.max(d.revenue, d.expenses, d.profit)));
								const revenueHeight = (data.revenue / maxValue) * 100;
								const expensesHeight = (data.expenses / maxValue) * 100;
								const profitHeight = (data.profit / maxValue) * 100;

								return (
									<div key={index} className="flex-1 flex flex-col items-center gap-2">
										<div className="w-full flex gap-1 items-end justify-center">
											{/* Revenue Bar */}
											<div className="flex-1 bg-gray-100 rounded-t-lg relative group cursor-pointer hover:bg-gray-200 transition">
												<div
													className="bg-linear-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 flex items-start justify-center pt-1"
													style={{ height: `${revenueHeight * 1.8}px`, minHeight: "30px" }}
												>
													<span className="text-[10px] lg:text-xs font-bold text-white hidden sm:inline">{data.revenue}M</span>
												</div>
											</div>
											{/* Expenses Bar */}
											<div className="flex-1 bg-gray-100 rounded-t-lg relative group cursor-pointer hover:bg-gray-200 transition">
												<div
													className="bg-linear-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-500 flex items-start justify-center pt-1"
													style={{ height: `${expensesHeight * 1.8}px`, minHeight: "25px" }}
												>
													<span className="text-[10px] lg:text-xs font-bold text-white hidden sm:inline">{data.expenses}M</span>
												</div>
											</div>
											{/* Profit Bar */}
											<div className="flex-1 bg-gray-100 rounded-t-lg relative group cursor-pointer hover:bg-gray-200 transition">
												<div
													className="bg-linear-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 flex items-start justify-center pt-1"
													style={{ height: `${profitHeight * 1.8}px`, minHeight: "28px" }}
												>
													<span className="text-[10px] lg:text-xs font-bold text-white hidden sm:inline">{data.profit}M</span>
												</div>
											</div>
										</div>
										<span className="text-[10px] lg:text-xs font-medium text-gray-600">{data.month}</span>
									</div>
								);
							})}
						</div>
					</div>
					<div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6 mt-4 lg:mt-6">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded"></div>
							<span className="text-xs lg:text-sm text-gray-600">Pendapatan</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 lg:w-4 lg:h-4 bg-red-500 rounded"></div>
							<span className="text-xs lg:text-sm text-gray-600">Pengeluaran</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 lg:w-4 lg:h-4 bg-blue-500 rounded"></div>
							<span className="text-xs lg:text-sm text-gray-600">Keuntungan</span>
						</div>
					</div>
				</div>

				{/* Property Performance */}
				<div className="bg-white rounded-xl shadow-sm overflow-hidden">
					<div className="p-4 lg:p-6 border-b border-gray-200">
						<h3 className="text-base lg:text-lg font-bold text-gray-900">Performa Properti</h3>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Properti
									</th>
									<th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
										Pendapatan
									</th>
									<th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Hunian
									</th>
									<th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
										Total Unit
									</th>
									<th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
										Trend
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{propertyPerformance.map((property) => (
									<tr key={property.id} className="hover:bg-gray-50 transition">
										<td className="px-6 py-4 whitespace-nowrap">
											<p className="text-sm font-medium text-gray-900">{property.name}</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<p className="text-sm font-semibold text-gray-900">
												Rp {(property.revenue / 1000000).toFixed(1)}M
											</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-2">
													<div
														className={`h-full rounded-full ${property.occupancy >= 85 ? "bg-green-500" :
															property.occupancy >= 70 ? "bg-blue-500" : "bg-yellow-500"
															}`}
														style={{ width: `${property.occupancy}%` }}
													></div>
												</div>
												<span className="text-sm font-medium text-gray-900">{property.occupancy}%</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
											<p className="text-sm text-gray-600">{property.units} unit</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{property.trend === "up" ? (
												<span className="flex items-center gap-1 text-green-600">
													<TrendingUp size={16} />
													<span className="text-sm font-medium">Naik</span>
												</span>
											) : (
												<span className="flex items-center gap-1 text-red-600">
													<TrendingDown size={16} />
													<span className="text-sm font-medium">Turun</span>
												</span>
											)}
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
