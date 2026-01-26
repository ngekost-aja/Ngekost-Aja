'use client'

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Building2, Users, Wifi, Car, Utensils, Dumbbell, Shield } from "lucide-react";

export default function PropertyDetailPage() {
	const router = useRouter();
	const params = useParams();
	const propertyId = params.propertyId as string;

	// Mock data - in real app, fetch based on propertyId
	const property = {
		id: parseInt(propertyId),
		name: "Kos Ganesha Premium",
		address: "Jl. Ganesha No. 10, Bandung",
		location: "Bandung",
		totalUnits: 24,
		occupiedUnits: 22,
		availableUnits: 2,
		priceRange: "Rp 1.2M - 1.8M",
		facilities: ["WiFi", "AC", "Kamar Mandi Dalam", "Parkir", "Security 24/7"],
		image: "🏢",
		status: "active",
		description: "Kost eksklusif dekat kampus ITB dengan fasilitas lengkap dan keamanan 24 jam. Lokasi strategis, akses mudah ke berbagai tempat penting.",
		floors: [
			{
				floor: 1,
				rooms: [
					{ number: "101", status: "occupied", tenant: "Ahmad Fauzi", price: 1200000 },
					{ number: "102", status: "occupied", tenant: "Budi Santoso", price: 1200000 },
					{ number: "103", status: "occupied", tenant: "Citra Dewi", price: 1300000 },
					{ number: "104", status: "occupied", tenant: "Dian Pratama", price: 1300000 },
					{ number: "105", status: "occupied", tenant: "Eka Putri", price: 1400000 },
					{ number: "106", status: "occupied", tenant: "Fajar Ramadan", price: 1400000 },
				],
			},
			{
				floor: 2,
				rooms: [
					{ number: "201", status: "occupied", tenant: "Gita Sari", price: 1500000 },
					{ number: "202", status: "occupied", tenant: "Hadi Wijaya", price: 1500000 },
					{ number: "203", status: "occupied", tenant: "Indah Permata", price: 1600000 },
					{ number: "204", status: "available", tenant: null, price: 1600000 },
					{ number: "205", status: "occupied", tenant: "Joko Susilo", price: 1700000 },
					{ number: "206", status: "occupied", tenant: "Kartika Sari", price: 1700000 },
				],
			},
			{
				floor: 3,
				rooms: [
					{ number: "301", status: "occupied", tenant: "Lina Marlina", price: 1600000 },
					{ number: "302", status: "occupied", tenant: "Made Wirawan", price: 1600000 },
					{ number: "303", status: "occupied", tenant: "Nina Kusuma", price: 1700000 },
					{ number: "304", status: "occupied", tenant: "Omar Bakri", price: 1700000 },
					{ number: "305", status: "occupied", tenant: "Putri Ayu", price: 1800000 },
					{ number: "306", status: "occupied", tenant: "Qori Amalia", price: 1800000 },
				],
			},
			{
				floor: 4,
				rooms: [
					{ number: "401", status: "occupied", tenant: "Rina Susanti", price: 1700000 },
					{ number: "402", status: "occupied", tenant: "Sandi Permana", price: 1700000 },
					{ number: "403", status: "occupied", tenant: "Tari Wulandari", price: 1800000 },
					{ number: "404", status: "available", tenant: null, price: 1800000 },
					{ number: "405", status: "occupied", tenant: "Umar Hadi", price: 1800000 },
					{ number: "406", status: "occupied", tenant: "Vina Melati", price: 1800000 },
				],
			},
		],
	};

	const getFacilityIcon = (facility: string) => {
		const icons: { [key: string]: any } = {
			"WiFi": Wifi,
			"Parkir": Car,
			"Dapur Bersama": Utensils,
			"Gym": Dumbbell,
			"Security 24/7": Shield,
		};
		const Icon = icons[facility];
		return Icon ? <Icon size={16} /> : null;
	};

	const occupancyRate = Math.round((property.occupiedUnits / property.totalUnits) * 100);

	return (
		<div className="h-full overflow-y-auto bg-gray-50">
			<div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex items-center gap-4">
					<button
						onClick={() => router.push('/manager/property')}
						className="p-2 hover:bg-white rounded-lg transition"
					>
						<ArrowLeft size={24} className="text-gray-700" />
					</button>
					<div className="flex-1">
						<h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{property.name}</h1>
						<p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
							<MapPin size={14} />
							{property.address}
						</p>
					</div>
				</div>

				{/* Property Overview */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Main Info */}
					<div className="lg:col-span-2 space-y-6">
						{/* Stats Cards */}
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
							<div className="bg-white rounded-xl p-4 shadow-sm">
								<div className="flex items-center gap-2 text-gray-500 mb-2">
									<Building2 size={20} />
									<span className="text-sm">Total Unit</span>
								</div>
								<p className="text-2xl font-bold text-gray-900">{property.totalUnits}</p>
							</div>
							<div className="bg-white rounded-xl p-4 shadow-sm">
								<div className="flex items-center gap-2 text-green-600 mb-2">
									<Users size={20} />
									<span className="text-sm">Terisi</span>
								</div>
								<p className="text-2xl font-bold text-green-600">{property.occupiedUnits}</p>
							</div>
							<div className="bg-white rounded-xl p-4 shadow-sm">
								<div className="flex items-center gap-2 text-blue-600 mb-2">
									<Building2 size={20} />
									<span className="text-sm">Tersedia</span>
								</div>
								<p className="text-2xl font-bold text-blue-600">{property.availableUnits}</p>
							</div>
						</div>

						{/* Description */}
						<div className="bg-white rounded-xl p-6 shadow-sm">
							<h3 className="text-lg font-bold text-gray-900 mb-3">Deskripsi</h3>
							<p className="text-gray-600 leading-relaxed">{property.description}</p>
						</div>

						{/* Room Map */}
						<div className="bg-white rounded-xl p-6 shadow-sm">
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-lg font-bold text-gray-900">Peta Kamar</h3>
								<div className="flex items-center gap-4 text-sm">
									<div className="flex items-center gap-2">
										<div className="w-4 h-4 bg-green-500 rounded"></div>
										<span className="text-gray-600">Terisi</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="w-4 h-4 bg-blue-500 rounded"></div>
										<span className="text-gray-600">Tersedia</span>
									</div>
								</div>
							</div>

							{/* Floors */}
							<div className="space-y-6">
								{property.floors.map((floor) => (
									<div key={floor.floor}>
										<h4 className="text-sm font-semibold text-gray-700 mb-3">Lantai {floor.floor}</h4>
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
											{floor.rooms.map((room) => (
												<div
													key={room.number}
													className={`p-4 rounded-lg border-2 cursor-pointer transition hover:shadow-md ${room.status === "occupied"
														? "bg-green-50 border-green-500"
														: "bg-blue-50 border-blue-500"
														}`}
												>
													<div className="text-center">
														<p className="font-bold text-gray-900 mb-1">{room.number}</p>
														<p className="text-xs text-gray-600 mb-2">
															Rp {(room.price / 1000000).toFixed(1)}M
														</p>
														{room.tenant ? (
															<p className="text-xs text-gray-700 font-medium truncate">
																{room.tenant}
															</p>
														) : (
															<p className="text-xs text-blue-600 font-medium">Kosong</p>
														)}
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Occupancy */}
						<div className="bg-white rounded-xl p-6 shadow-sm">
							<h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Tingkat Hunian</h3>
							<div className="mb-3">
								<div className="flex items-end gap-2 mb-2">
									<span className="text-4xl font-bold text-gray-900">{occupancyRate}%</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-3">
									<div
										className={`h-full rounded-full ${occupancyRate >= 85 ? "bg-green-500" : occupancyRate >= 70 ? "bg-blue-500" : "bg-yellow-500"
											}`}
										style={{ width: `${occupancyRate}%` }}
									></div>
								</div>
							</div>
							<p className="text-sm text-gray-600">
								{property.occupiedUnits} dari {property.totalUnits} kamar terisi
							</p>
						</div>

						{/* Price Range */}
						<div className="bg-white rounded-xl p-6 shadow-sm">
							<h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Rentang Harga</h3>
							<p className="text-2xl font-bold text-gray-900 mb-1">{property.priceRange}</p>
							<p className="text-sm text-gray-500">per bulan</p>
						</div>

						{/* Facilities */}
						<div className="bg-white rounded-xl p-6 shadow-sm">
							<h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Fasilitas</h3>
							<div className="space-y-2">
								{property.facilities.map((facility, idx) => (
									<div key={idx} className="flex items-center gap-2 text-gray-700">
										{getFacilityIcon(facility)}
										<span className="text-sm">{facility}</span>
									</div>
								))}
							</div>
						</div>

						{/* Actions */}
						<div className="space-y-3">
							<button className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
								Edit Properti
							</button>
							<button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
								Kelola Kamar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
