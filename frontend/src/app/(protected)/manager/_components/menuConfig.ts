import {
  LucideIcon,
  CalendarCheck,
  MessageSquare,
  Home,
  ChartLine,
  Building2,
} from 'lucide-react';

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
    section: 'DASHBOARD',
    items: [{ icon: Home, label: 'Dashboard', href: '/dashboard' }],
  },
  {
    section: 'PROPERTI',
    items: [{ icon: Building2, label: 'Kost-kostan', href: '/property' }],
  },
  {
    section: 'PEMESANAN',
    items: [{ icon: CalendarCheck, label: 'Pemesanan', href: '/booking' }],
  },
  {
    section: 'CHAT',
    items: [
      {
        icon: MessageSquare,
        label: 'Chat dengan pemesan',
        href: '/chat',
      },
    ],
  },
  {
    section: 'LAPORAN',
    items: [
      {
        icon: ChartLine,
        label: 'Laporan Keuangan',
        href: '/finance-report',
      },
    ],
  },
];

export const bottomNavItems: BottomNavItem[] = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Building2, label: 'Properti', href: '/property' },
  {
    icon: CalendarCheck,
    label: 'Pemesanan',
    href: '/booking',
    badge: 5,
  },
  { icon: MessageSquare, label: 'Chat', href: '/chat', badge: 3 },
  { icon: ChartLine, label: 'Laporan', href: '/finance-report' },
];
