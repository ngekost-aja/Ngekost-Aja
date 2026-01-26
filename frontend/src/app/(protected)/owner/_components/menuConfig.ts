import { LucideIcon, Home, Building2, Users, ChartLine } from "lucide-react";

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
		section: "DASHBOARD",
		items: [
			{ icon: Home, label: "Dashboard", href: "/dashboard" },
		],
	},
	{
		section: "PROPERTI",
		items: [
			{ icon: Building2, label: "Kost-kostan", href: "/owner/properties" },
		],
	},
	{
		section: "MANAJER",
		items: [
			{ icon: Users, label: "Manajer", href: "/owner/manager" },
		],
	},
	{
		section: "LAPORAN",
		items: [
			{ icon: ChartLine, label: "Laporan Keuangan", href: "/owner/finance-report" },
		],
	},
];


export const bottomNavItems: BottomNavItem[] = [
	{ icon: Home, label: "Dashboard", href: "/owner" },
	{ icon: Building2, label: "Properties", href: "/owner/properties" },
	{ icon: Users, label: "Manajer", href: "/owner/manager" },
	{
		icon: ChartLine,
		label: "Laporan",
		href: "/owner/finance-report",
	},
];
