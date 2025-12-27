import Link from "next/link";
import Image from "next/image";
import { MenuItem } from "./menuConfig";
import { LogOut } from "lucide-react";

export default function OwnerSidebar({
	menuItems,
	pathname
}: {
	menuItems: MenuItem[];
	pathname: string;
}) {
	return (
		<aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200">
			{/* Logo */}
			<div className="p-6 border-b border-gray-200">
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
						<h2 className="font-bold text-gray-900 text-lg">Ngekost Aja</h2>
						<p className="text-xs text-gray-500">Panel Pemilik</p>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 overflow-y-auto p-4">
				<div className="space-y-1">
					{menuItems.map((item, idx) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={idx}
								href={item.href}
								className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${isActive
									? "bg-gray-900 text-white!"
									: "text-gray-700 hover:bg-gray-100"
									}`}
							>
								<item.icon size={20} />
								<span className="font-medium text-sm">{item.label}</span>
								{item.badge && (
									<span
										className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${isActive
											? "bg-white text-gray-900"
											: "bg-gray-900 text-white"
											}`}
									>
										{item.badge}
									</span>
								)}
							</Link>
						);
					})}
				</div>
			</nav>

			{/* Logout */}
			<div className="p-4 border-t border-gray-200">
				<button className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition">
					<LogOut size={20} />
					<span className="font-medium text-sm">Log Off</span>
				</button>
			</div>
		</aside>
	);
}
