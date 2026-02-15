import Link from "next/link";
import { BottomNavItem } from "./menuConfig";

export default function BottomNav({ 
	bottomNavItems, 
	pathname, 
	onMenuClick 
}: {
	bottomNavItems: BottomNavItem[];
	pathname: string;
	onMenuClick: () => void;
}) {
	return (
		<nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40 shadow-lg">
			<div className="flex items-center justify-around">
				{bottomNavItems.map((item, idx) => {
					const isActive = pathname === item.href;
					const isMenu = item.action === "menu";

					if (isMenu) {
						return (
							<button
								key={idx}
								onClick={onMenuClick}
								className="flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-colors hover:bg-gray-50 active:bg-gray-100"
							>
								<div className="relative">
									<item.icon size={24} className="text-gray-600" />
								</div>
								<span className="text-xs font-medium text-gray-600 mt-1">
									{item.label}
								</span>
							</button>
						);
					}

					return (
						<Link
							key={idx}
							href={item.href || "#"}
							className="flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-colors hover:bg-gray-50 active:bg-gray-100"
						>
							<div className="relative">
								<item.icon
									size={24}
									className={isActive ? "text-golden-yellow" : "text-gray-600"}
								/>
								{item.badge && (
									<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
										{item.badge}
									</span>
								)}
							</div>
							<span
								className={`text-xs font-medium mt-1 ${isActive ? "text-golden-yellow" : "text-gray-600"
									}`}
							>
								{item.label}
							</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
