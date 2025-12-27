import Link from "next/link";
import Image from "next/image";
import { Bell, User } from "lucide-react";

export default function MobileHeader({
	showNotifications,
	onToggleNotifications
}: {
	showNotifications: boolean;
	onToggleNotifications: () => void;
}) {
	return (
		<header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40 shadow-sm">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 p-0 lg:p-1.5 sm:w-14 sm:h-14 md:w-16 md:h-16">
						<Image
							src="/ngekost-aja-logo.png"
							alt="Logo"
							width={64}
							height={54}
							className="w-full h-full object-contain rounded-lg"
						/>
					</div>
					<div>
						<h1 className="font-bold text-base text-gray-900">
							Ngekost Aja
						</h1>
						<p className="text-xs text-gray-500">Owner Panel</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					{/* Notifications */}
					<button
						onClick={onToggleNotifications}
						className="relative p-2 hover:bg-gray-100 rounded-full transition"
					>
						<Bell size={22} className="text-gray-600" />
						<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
					</button>
					{/* Profile */}
					<Link
						href="/owner/profile"
						className="w-9 h-9 bg-linear-to-br from-golden-yellow to-yellow-500 rounded-full flex items-center justify-center text-lg shadow-sm"
					>
						<User size={20} />
					</Link>
				</div>
			</div>
		</header>
	);
}
