import { MapPin, Building2, Users, Edit, Home, MoreVertical } from "lucide-react";

export default function PropertyCard({
	property,
	onEdit
}: {
	property: {
		id: number;
		name: string;
		address: string;
		location: string;
		totalUnits: number;
		occupiedUnits: number;
		availableUnits: number;
		priceRange: string;
		facilities: string[];
		image: string;
		status: string;
	};
	onEdit: (id: number) => void;
}) {
	const getStatusBadge = (status: string) => {
		if (status === "active") {
			return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Aktif</span>;
		}
		return <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">Maintenance</span>;
	};

	const getOccupancyColor = (occupied: number, total: number) => {
		const rate = (occupied / total) * 100;
		if (rate >= 85) return "text-green-600";
		if (rate >= 70) return "text-blue-600";
		return "text-yellow-600";
	};

	return (
		<div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-fit">
			{/* Property Header */}
			<div className="p-4 lg:p-6">
				<div className="flex gap-4">
					{/* Property Image */}
					<div className="w-24 h-24 lg:w-28 lg:h-28 bg-linear-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center text-5xl shrink-0">
						{property.image}
					</div>

					{/* Property Info */}
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between mb-2">
							<div className="flex-1 min-w-0">
								<h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
									{property.name}
								</h3>
								<p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
									<MapPin size={14} />
									<span className="truncate">{property.address}</span>
								</p>
							</div>
							<button className="p-2 hover:bg-gray-100 rounded-lg transition ml-2">
								<MoreVertical size={18} className="text-gray-600" />
							</button>
						</div>

						{/* Stats */}
						<div className="flex items-center gap-4 text-sm mb-3">
							<div className="flex items-center gap-1.5">
								<Building2 size={16} className="text-gray-400" />
								<span className="text-gray-600">{property.totalUnits} unit</span>
							</div>
							<div className="flex items-center gap-1.5">
								<Users size={16} className={getOccupancyColor(property.occupiedUnits, property.totalUnits)} />
								<span className={`font-medium ${getOccupancyColor(property.occupiedUnits, property.totalUnits)}`}>
									{property.occupiedUnits}/{property.totalUnits} terisi
								</span>
							</div>
						</div>

						{/* Price & Status */}
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-bold text-gray-900">{property.priceRange}</p>
								<p className="text-xs text-gray-500">per bulan</p>
							</div>
							{getStatusBadge(property.status)}
						</div>
					</div>
				</div>

				{/* Facilities */}
				<div className="mt-4 pt-4 border-t border-gray-200">
					<p className="text-xs font-semibold text-gray-500 uppercase mb-2">Fasilitas</p>
					<div className="flex flex-wrap gap-2">
						{property.facilities.map((facility, idx) => (
							<span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
								{facility}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="px-4 lg:px-6 pb-4 lg:pb-6 flex gap-2">
				<button
					onClick={() => onEdit(property.id)}
					className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
				>
					<Edit size={18} />
					<span>Edit Properti</span>
				</button>
				<a
					href={`/manager/property/${property.id}`}
					className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
				>
					<Home size={18} />
					<span className="hidden sm:inline">Detail</span>
				</a>
			</div>
		</div>
	);
}
