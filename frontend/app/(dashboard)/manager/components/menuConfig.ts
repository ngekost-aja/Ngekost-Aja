import { LucideIcon, Calendar, Settings, BarChart3, MessageSquare, Home, Menu } from "lucide-react";

export interface MenuItem {
	icon: LucideIcon;
	label: string;
	href: string;
	badge?: number;
}

export interface MenuSection {
	section: string;
	items: MenuItem[];
}

export interface BottomNavItem {
	icon: LucideIcon;
	label: string;
	href?: string;
	badge?: number;
	action?: string;
}

export const menuItems: MenuSection[] = [
	{
		section: "BOOKINGS",
		items: [
			{ icon: Calendar, label: "Bookings", href: "/manager", badge: 5 },
			{ icon: Calendar, label: "Calendar", href: "/manager/calendar" },
		],
	},
	{
		section: "MANAGEMENT",
		items: [
			{ icon: Home, label: "Listing", href: "/manager/listing" },
			{ icon: Settings, label: "Settings", href: "/manager/settings" },
			{ icon: BarChart3, label: "Review", href: "/manager/review" },
		],
	},
	{
		section: "SUPPORT",
		items: [
			{ icon: MessageSquare, label: "Contact us", href: "/manager/contact" },
			{ icon: Home, label: "View Listing", href: "/manager/view-listing" },
		],
	},
];

export const bottomNavItems: BottomNavItem[] = [
	{ icon: Calendar, label: "Bookings", href: "/manager", badge: 5 },
	{ icon: MessageSquare, label: "Messages", href: "/manager/messages", badge: 3 },
	{ icon: Home, label: "Listing", href: "/manager/listing" },
	{ icon: BarChart3, label: "Review", href: "/manager/review" },
];
