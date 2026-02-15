"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import ManagerSidebar from "./ManagerSidebar";
import MobileHeader from "./MobileHeader";
import BottomNav from "./BottomNav";
import { menuItems, bottomNavItems } from "./menuConfig";

export default function ManagerNavigation({ children }: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Desktop Sidebar */}
			<ManagerSidebar menuItems={menuItems} pathname={pathname} />

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Mobile Header */}
				<MobileHeader
					showNotifications={showNotifications}
					onToggleNotifications={() => setShowNotifications(!showNotifications)}
				/>

				{/* Content Area with padding for bottom nav */}
				<main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
					{children}
				</main>

				{/* Bottom Navigation - Mobile Only */}
				<BottomNav
					bottomNavItems={bottomNavItems}
					pathname={pathname}
					onMenuClick={() => setIsSidebarOpen(true)}
				/>
			</div>
		</div>
	);
}
