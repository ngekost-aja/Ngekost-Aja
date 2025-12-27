'use client'

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import PropertyCard from "../components/PropertyCard";

export default function PropertyManagementPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [editingProperty, setEditingProperty] = useState<number | null>(null);

	// Mock data - properties assigned to this manager
	// In real app, fetch based on logged-in manager's ID
	const properties = [
		{
			id: 1,
			name: "Kos Ganesha Premium",
			address: "Jl. Ganesha No. 10, Bandung",
			location: "Bandung",
			totalUnits: 24,
			occupiedUnits: 22,
			availableUnits: 2,
			priceRange: "Rp 1.2M - 1.8M",
			facilities: ["WiFi", "AC", "Kamar Mandi Dalam", "Parkir"],
			image: "🏢",
			status: "active",
		},
		{
			id: 2,
			name: "Kos Dago Residence",
			address: "Jl. Dago No. 45, Bandung",
			location: "Bandung",
			totalUnits: 18,
			occupiedUnits: 14,
			availableUnits: 4,
			priceRange: "Rp 1.0M - 1.5M",
			facilities: ["WiFi", "Dapur Bersama", "Laundry"],
			image: "🏠",
			status: "active",
		},
		{
			id: 3,
			name: "Kos Sukajadi Indah",
			address: "Jl. Sukajadi No. 88, Bandung",
			location: "Bandung",
			totalUnits: 30,
			occupiedUnits: 25,
			availableUnits: 5,
			priceRange: "Rp 1.5M - 2.2M",
			facilities: ["WiFi", "AC", "Gym", "Parkir", "Security 24/7"],
			image: "🏘️",
			status: "active",
		},
		{
			id: 4,
			name: "Kos Setiabudi Elite",
			address: "Jl. Setiabudi No. 12, Bandung",
			location: "Bandung",
			totalUnits: 20,
			occupiedUnits: 12,
			availableUnits: 8,
			priceRange: "Rp 1.3M - 1.9M",
			facilities: ["WiFi", "AC", "Kamar Mandi Dalam"],
			image: "🏛️",
			status: "active",
		},
		{
			id: 5,
			name: "Kos Dipatiukur",
			address: "Jl. Dipatiukur No. 25, Bandung",
			location: "Bandung",
			totalUnits: 16,
			occupiedUnits: 14,
			availableUnits: 2,
			priceRange: "Rp 1.1M - 1.6M",
			facilities: ["WiFi", "Parkir", "Dapur Bersama"],
			image: "🏗️",
			status: "active",
		},
		{
			id: 6,
			name: "Kos Ciumbuleuit",
			address: "Jl. Ciumbuleuit No. 56, Bandung",
			location: "Bandung",
			totalUnits: 12,
			occupiedUnits: 8,
			availableUnits: 4,
			priceRange: "Rp 900K - 1.4M",
			facilities: ["WiFi", "Laundry"],
			image: "🏢",
			status: "maintenance",
		},
	];

	const filteredProperties = properties.filter((property) => {
		const matchesSearch =
			property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
			property.location.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesStatus =
			selectedStatus === "all" ||
			property.status === selectedStatus;

		return matchesSearch && matchesStatus;
	});

	return (
		<div className="h-full overflow-y-auto bg-gray-50">
			<div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Properti Saya</h1>
						<p className="text-sm text-gray-500 mt-1">Kelola kost-kostan yang Anda tangani</p>
					</div>
					<button className="flex items-center gap-2 px-4 py-2.5 bg-golden-yellow text-white rounded-lg font-medium hover:bg-yellow-500 transition">
						<Plus size={20} />
						<span>Tambah Properti</span>
					</button>
				</div>

				{/* Filters */}
				<div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
					<div className="flex flex-col sm:flex-row gap-3">
						{/* Search */}
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Cari nama properti, alamat, atau lokasi..."
								className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
							/>
						</div>

						{/* Status Filter */}
						<select
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
							className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm font-medium"
						>
							<option value="all">Semua Status</option>
							<option value="active">Aktif</option>
							<option value="maintenance">Maintenance</option>
						</select>
					</div>

					{/* Results Count */}
					<div className="mt-4 text-sm text-gray-600">
						Menampilkan <span className="font-semibold text-gray-900">{filteredProperties.length}</span> properti
					</div>
				</div>

				{/* Properties Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
					{filteredProperties.map((property) => (
						<PropertyCard
							key={property.id}
							property={property}
							onEdit={setEditingProperty}
						/>
					))}
				</div>
			</div>

			{/* Empty State */}
			{filteredProperties.length === 0 && (
				<div className="bg-white rounded-xl p-12 text-center">
					<div className="text-6xl mb-4">🏢</div>
					<h3 className="text-lg font-bold text-gray-900 mb-2">Tidak ada properti ditemukan</h3>
					<p className="text-sm text-gray-500 mb-6">
						Coba ubah filter pencarian atau tambah properti baru
					</p>
					<button className="px-6 py-3 bg-golden-yellow text-white rounded-lg font-medium hover:bg-yellow-500 transition">
						Tambah Properti Baru
					</button>
				</div>
			)}

			{/* Edit Modal - Simple placeholder */}
			{editingProperty && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="p-6 border-b border-gray-200">
							<h2 className="text-xl font-bold text-gray-900">Edit Properti</h2>
						</div>
						<div className="p-6">
							<p className="text-gray-600 mb-4">Form edit properti akan ditambahkan di sini...</p>
							<div className="flex gap-3">
								<button
									onClick={() => setEditingProperty(null)}
									className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
								>
									Batal
								</button>
								<button className="flex-1 px-4 py-2.5 bg-golden-yellow text-white rounded-lg font-medium hover:bg-yellow-500 transition">
									Simpan Perubahan
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
