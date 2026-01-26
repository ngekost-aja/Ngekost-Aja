'use client'

import { useState } from "react";
import { Download, TrendingUp, TrendingDown, DollarSign, Calendar, FileText } from "lucide-react";

export default function FinanceReportPage() {
	const [selectedPeriod, setSelectedPeriod] = useState("month");
	const [selectedYear, setSelectedYear] = useState("2025");

	// Mock data - replace with real API calls
	const metrics = [
		{
			id: "total-revenue",
			label: "Total Pendapatan",
			value: "Rp 128.4M",
			change: "+12%",
			changeType: "increase" as const,
			icon: DollarSign,
			color: "green",
		},
		{
			id: "pending-payment",
			label: "Pembayaran Pending",
			value: "Rp 8.2M",
			change: "-5%",
			changeType: "decrease" as const,
			icon: Calendar,
			color: "yellow",
		},
		{
			id: "avg-revenue",
			label: "Rata-rata/Properti",
			value: "Rp 21.4M",
			change: "+8%",
			changeType: "increase" as const,
			icon: TrendingUp,
			color: "blue",
		},
		{
			id: "occupancy-income",
			label: "Pendapatan Hunian",
			value: "Rp 105.2M",
			change: "+15%",
			changeType: "increase" as const,
			icon: FileText,
			color: "purple",
		},
	];

	const monthlyRevenue = [
		{ month: "Jan", revenue: 18.5, expenses: 5.2 },
		{ month: "Feb", revenue: 19.2, expenses: 5.5 },
		{ month: "Mar", revenue: 17.8, expenses: 5.0 },
		{ month: "Apr", revenue: 20.5, expenses: 5.8 },
		{ month: "Mei", revenue: 21.0, expenses: 6.0 },
		{ month: "Jun", revenue: 21.4, expenses: 6.2 },
	];

	const recentTransactions = [
		{
			id: 1,
			date: "27 Des 2025",
			property: "Kos Ganesha Premium",
			tenant: "Ahmad Fauzi",
			room: "101",
			amount: 1200000,
			status: "paid",
			type: "rent",
		},
		{
			id: 2,
			date: "26 Des 2025",
			property: "Kos Dago Residence",
			tenant: "Budi Santoso",
			room: "201",
			amount: 1500000,
			status: "paid",
			type: "rent",
		},
		{
			id: 3,
			date: "25 Des 2025",
			property: "Kos Sukajadi Indah",
			tenant: "Citra Dewi",
			room: "301",
			amount: 1800000,
			status: "pending",
			type: "rent",
		},
		{
			id: 4,
			date: "24 Des 2025",
			property: "Kos Setiabudi Elite",
			tenant: "Dian Pratama",
			room: "102",
			amount: 1300000,
			status: "paid",
			type: "rent",
		},
		{
			id: 5,
			date: "23 Des 2025",
			property: "Kos Dipatiukur",
			tenant: "Eka Putri",
			room: "202",
			amount: 1600000,
			status: "paid",
			type: "rent",
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

	const getStatusBadge = (status: string) => {
		if (status === "paid") {
			return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Lunas</span>;
		}
		return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Pending</span>;
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
						<p className="text-sm text-gray-500 mt-1">Ringkasan pendapatan dan transaksi properti</p>
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

				{/* Period Selector */}
				<div className="bg-white rounded-xl p-4 shadow-sm">
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
				<div className="bg-white rounded-xl p-6 shadow-sm">
					<h3 className="text-lg font-bold text-gray-900 mb-6">Grafik Pendapatan vs Pengeluaran</h3>
					<div className="h-64 flex items-end justify-between gap-2">
						{monthlyRevenue.map((data, index) => {
							const maxValue = Math.max(...monthlyRevenue.map(d => Math.max(d.revenue, d.expenses)));
							const revenueHeight = (data.revenue / maxValue) * 100;
							const expensesHeight = (data.expenses / maxValue) * 100;

							return (
								<div key={index} className="flex-1 flex flex-col items-center gap-2">
									<div className="w-full flex gap-1 items-end">
										{/* Revenue Bar */}
										<div className="flex-1 bg-gray-100 rounded-t-lg relative group cursor-pointer hover:bg-gray-200 transition">
											<div
												className="bg-linear-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 flex items-start justify-center pt-2"
												style={{ height: `${revenueHeight * 2}px`, minHeight: "40px" }}
											>
												<span className="text-xs font-bold text-white">{data.revenue}M</span>
											</div>
										</div>
										{/* Expenses Bar */}
										<div className="flex-1 bg-gray-100 rounded-t-lg relative group cursor-pointer hover:bg-gray-200 transition">
											<div
												className="bg-linear-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-500 flex items-start justify-center pt-2"
												style={{ height: `${expensesHeight * 2}px`, minHeight: "30px" }}
											>
												<span className="text-xs font-bold text-white">{data.expenses}M</span>
											</div>
										</div>
									</div>
									<span className="text-xs font-medium text-gray-600">{data.month}</span>
								</div>
							);
						})}
					</div>
					<div className="flex items-center justify-center gap-6 mt-6">
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 bg-green-500 rounded"></div>
							<span className="text-sm text-gray-600">Pendapatan</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 bg-red-500 rounded"></div>
							<span className="text-sm text-gray-600">Pengeluaran</span>
						</div>
					</div>
				</div>

				{/* Recent Transactions */}
				<div className="bg-white rounded-xl shadow-sm overflow-hidden">
					<div className="p-6 border-b border-gray-200">
						<h3 className="text-lg font-bold text-gray-900">Transaksi Terbaru</h3>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Tanggal
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Properti
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
										Penyewa
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
										Kamar
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Jumlah
									</th>
									<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Status
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{recentTransactions.map((transaction) => (
									<tr key={transaction.id} className="hover:bg-gray-50 transition">
										<td className="px-6 py-4 whitespace-nowrap">
											<p className="text-sm text-gray-900">{transaction.date}</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<p className="text-sm font-medium text-gray-900">{transaction.property}</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
											<p className="text-sm text-gray-600">{transaction.tenant}</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
											<p className="text-sm text-gray-600">{transaction.room}</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<p className="text-sm font-semibold text-gray-900">
												Rp {(transaction.amount / 1000000).toFixed(1)}M
											</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{getStatusBadge(transaction.status)}
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
