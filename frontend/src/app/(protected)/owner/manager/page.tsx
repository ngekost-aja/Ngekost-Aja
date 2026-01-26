'use client'

import { useState } from "react";
import { Search, Plus, Mail, Phone, Building2, Edit, Trash2, MoreVertical } from "lucide-react";

export default function OwnerManagerPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [addingManager, setAddingManager] = useState(false);

	// Mock data - replace with real API calls
	const managers = [
		{
			id: 1,
			name: "Budi Santoso",
			email: "budi.santoso@email.com",
			phone: "081234567890",
			avatar: "👨‍💼",
			properties: [
				{ id: 1, name: "Kos Ganesha Premium" },
			],
			joinDate: "Jan 2024",
			status: "active",
		},
		{
			id: 2,
			name: "Siti Nurhaliza",
			email: "siti.nurhaliza@email.com",
			phone: "081234567891",
			avatar: "👩‍💼",
			properties: [
				{ id: 2, name: "Kos Dago Residence" },
			],
			joinDate: "Feb 2024",
			status: "active",
		},
		{
			id: 3,
			name: "Ahmad Fauzi",
			email: "ahmad.fauzi@email.com",
			phone: "081234567892",
			avatar: "👨‍💼",
			properties: [
				{ id: 4, name: "Kos Setiabudi Elite" },
			],
			joinDate: "Mar 2024",
			status: "active",
		},
		{
			id: 4,
			name: "Dewi Lestari",
			email: "dewi.lestari@email.com",
			phone: "081234567893",
			avatar: "👩‍💼",
			properties: [],
			joinDate: "Apr 2024",
			status: "active",
		},
		{
			id: 5,
			name: "Rudi Hermawan",
			email: "rudi.hermawan@email.com",
			phone: "081234567894",
			avatar: "👨‍💼",
			properties: [],
			joinDate: "Mei 2024",
			status: "inactive",
		},
	];

	const filteredManagers = managers.filter((manager) =>
		manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		manager.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
		manager.phone.includes(searchQuery)
	);

	const getStatusBadge = (status: string) => {
		if (status === "active") {
			return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Aktif</span>;
		}
		return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Tidak Aktif</span>;
	};

	return (
		<div className="h-full overflow-y-auto bg-gray-50">
			<div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Manajemen Manajer</h1>
						<p className="text-sm text-gray-500 mt-1">Kelola manajer yang menangani properti Anda</p>
					</div>
					<button
						onClick={() => setAddingManager(true)}
						className="flex items-center gap-2 px-4 py-2.5 bg-golden-yellow text-white rounded-lg font-medium hover:bg-yellow-500 transition"
					>
						<Plus size={20} />
						<span>Tambah Manajer</span>
					</button>
				</div>

				{/* Search */}
				<div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Cari nama, email, atau nomor telepon..."
							className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
						/>
					</div>
					<div className="mt-4 text-sm text-gray-600">
						Menampilkan <span className="font-semibold text-gray-900">{filteredManagers.length}</span> manajer
					</div>
				</div>

				{/* Managers Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
					{filteredManagers.map((manager) => (
						<div key={manager.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
							<div className="p-6">
								{/* Header */}
								<div className="flex items-start justify-between mb-4">
									<div className="flex items-center gap-3">
										<div className="w-14 h-14 bg-linear-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-3xl">
											{manager.avatar}
										</div>
										<div>
											<h3 className="font-bold text-gray-900 text-lg">{manager.name}</h3>
											<p className="text-xs text-gray-500">Bergabung {manager.joinDate}</p>
										</div>
									</div>
									<button className="p-2 hover:bg-gray-100 rounded-lg transition">
										<MoreVertical size={18} className="text-gray-600" />
									</button>
								</div>

								{/* Contact Info */}
								<div className="space-y-2 mb-4">
									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Mail size={16} className="text-gray-400" />
										<span className="truncate">{manager.email}</span>
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Phone size={16} className="text-gray-400" />
										<span>{manager.phone}</span>
									</div>
								</div>

								{/* Properties */}
								<div className="mb-4">
									<div className="flex items-center justify-between mb-2">
										<p className="text-xs font-semibold text-gray-500 uppercase">Properti</p>
										<span className="text-xs font-bold text-gray-900">{manager.properties.length}</span>
									</div>
									{manager.properties.length > 0 ? (
										<div className="space-y-1">
											{manager.properties.map((property) => (
												<div key={property.id} className="flex items-center gap-2 text-sm">
													<Building2 size={14} className="text-gray-400" />
													<span className="text-gray-700 truncate">{property.name}</span>
												</div>
											))}
										</div>
									) : (
										<p className="text-sm text-gray-500 italic">Belum ada properti</p>
									)}
								</div>

								{/* Status */}
								<div className="mb-4">
									{getStatusBadge(manager.status)}
								</div>

								{/* Actions */}
								<div className="flex gap-2">
									<button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition">
										<Edit size={16} />
										<span>Edit</span>
									</button>
									<button className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition">
										<Trash2 size={16} />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{filteredManagers.length === 0 && (
					<div className="bg-white rounded-xl p-12 text-center">
						<div className="text-6xl mb-4">👨‍💼</div>
						<h3 className="text-lg font-bold text-gray-900 mb-2">Tidak ada manajer ditemukan</h3>
						<p className="text-sm text-gray-500 mb-6">
							Coba ubah pencarian atau tambah manajer baru
						</p>
						<button
							onClick={() => setAddingManager(true)}
							className="px-6 py-3 bg-golden-yellow text-white rounded-lg font-medium hover:bg-yellow-500 transition"
						>
							Tambah Manajer Baru
						</button>
					</div>
				)}
			</div>

			{/* Add Manager Modal */}
			{addingManager && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-xl max-w-md w-full">
						<div className="p-6 border-b border-gray-200">
							<h2 className="text-xl font-bold text-gray-900">Tambah Manajer Baru</h2>
							<p className="text-sm text-gray-500 mt-1">Masukkan informasi manajer</p>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
								<input
									type="text"
									placeholder="Masukkan nama lengkap"
									className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
								<input
									type="email"
									placeholder="email@example.com"
									className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
								<input
									type="tel"
									placeholder="08123456789"
									className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
								/>
							</div>
							<div className="flex gap-3 pt-4">
								<button
									onClick={() => setAddingManager(false)}
									className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
								>
									Batal
								</button>
								<button className="flex-1 px-4 py-2.5 bg-golden-yellow text-white rounded-lg font-medium hover:bg-yellow-500 transition">
									Tambah Manajer
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
