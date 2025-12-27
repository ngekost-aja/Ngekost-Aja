import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { MenuSection } from "./menuConfig";
import Image from "next/image";

export default function ManagerSidebar({
	menuItems,
	pathname
}: {
	menuItems: MenuSection[];
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
						<p className="text-xs text-gray-500">Panel Manajer</p>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 overflow-y-auto p-4 space-y-6">
				{menuItems.map((section, idx) => (
					<div key={idx}>
						<h3 className="text-xs font-semibold text-gray-400 uppercase mb-3 px-3">
							{section.section}
						</h3>
						<div className="space-y-1">
							{section.items.map((item, itemIdx) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={itemIdx}
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
					</div>
				))}
			</nav>

			{/* Account & Logout */}
			<div className="p-4 border-t border-gray-200 space-y-1">
				<Link
					href="/manager/account"
					className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition"
				>
					<User size={20} />
					<span className="font-medium text-sm">Akun</span>
				</Link>
				<button className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition">
					<LogOut size={20} />
					<span className="font-medium text-sm">Log Out</span>
				</button>
			</div>
		</aside>
	);
}
