import { LucideIcon, Home, Building2, Users, DollarSign, Settings, BarChart3, MessageSquare, HelpCircle, LogOut, Menu, TrendingUp } from "lucide-react";

export interface MenuItem {
	icon: LucideIcon;
	label: string;
	href: string;
	badge?: number;
}

export interface BottomNavItem {
	icon: LucideIcon;
	label: string;
	href?: string;
	badge?: number;
	action?: string;
}

export const menuItems: MenuItem[] = [
	{ icon: Home, label: "Dashboard", href: "/owner" },
	{ icon: Building2, label: "My Properties", href: "/owner/properties" },
	{ icon: Users, label: "Clients", href: "/owner/clients" },
	{ icon: DollarSign, label: "Transaction", href: "/owner/transaction" },
	{ icon: BarChart3, label: "Analytics", href: "/owner/analytics" },
	{
		icon: MessageSquare,
		label: "Messages",
		href: "/owner/messages",
		badge: 3,
	},
	{ icon: Settings, label: "Settings", href: "/owner/settings" },
];

export const bottomNavItems: BottomNavItem[] = [
	{ icon: Home, label: "Dashboard", href: "/owner" },
	{ icon: Building2, label: "Properties", href: "/owner/properties" },
	{ icon: TrendingUp, label: "Analytics", href: "/owner/analytics" },
	{
		icon: MessageSquare,
		label: "Messages",
		href: "/owner/messages",
		badge: 3,
	},
];
