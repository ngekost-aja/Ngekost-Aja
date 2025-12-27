import { LucideIcon, CalendarCheck, MessageSquare, Home, ChartLine, Building2 } from "lucide-react";

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
}

export const menuItems: MenuSection[] = [
	{
		section: "DASHBOARD",
		items: [
			{ icon: Home, label: "Dashboard", href: "/manager" },
		],
	},
	{
		section: "PROPERTI",
		items: [
			{ icon: Building2, label: "Kost-kostan", href: "/manager/property" },
		],
	},
	{
		section: "PEMESANAN",
		items: [
			{ icon: CalendarCheck, label: "Pemesanan", href: "/manager/booking" },
		],
	},
	{
		section: "CHAT",
		items: [
			{ icon: MessageSquare, label: "Chat dengan pemesan", href: "/manager/chat" },
		],
	},
	{
		section: "LAPORAN",
		items: [
			{ icon: ChartLine, label: "Laporan Keuangan", href: "/manager/finance-report" },
		],
	},
];

export const bottomNavItems: BottomNavItem[] = [
	{ icon: Home, label: "Dashboard", href: "/manager" },
	{ icon: Building2, label: "Properti", href: "/manager/property" },
	{ icon: CalendarCheck, label: "Pemesanan", href: "/manager/booking", badge: 5 },
	{ icon: MessageSquare, label: "Chat", href: "/manager/chat", badge: 3 },
	{ icon: ChartLine, label: "Laporan", href: "/manager/finance-report" },
];
