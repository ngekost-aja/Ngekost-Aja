"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building2,
  Users,
  DollarSign,
  Settings,
  BarChart3,
  MessageSquare,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
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

  const bottomMenuItems = [
    { icon: HelpCircle, label: "Help Center", href: "/owner/help" },
    { icon: LogOut, label: "Log out", href: "/logout" },
  ];

  // Bottom nav items for mobile - Most important/frequently used items
  const bottomNavItems = [
    { icon: Home, label: "Dashboard", href: "/owner" },
    { icon: Building2, label: "Properties", href: "/owner/properties" },
    { icon: TrendingUp, label: "Analytics", href: "/owner/analytics" },
    {
      icon: MessageSquare,
      label: "Messages",
      href: "/owner/messages",
      badge: 3,
    },
    { icon: Menu, label: "More", action: "menu" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
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
              <p className="text-xs text-gray-500">Owner Panel</p>
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition relative ${
                    isActive
                      ? "bg-gray-900 text-white!"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-golden-yellow text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200 space-y-1">
          {bottomMenuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* Mobile Full Menu Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-golden-yellow rounded-lg flex items-center justify-center text-2xl">
                    🏠
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-lg">Menu</h2>
                    <p className="text-xs text-gray-500">Owner Panel</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Profile Section */}
            <div className="px-6 py-4 bg-linear-to-br from-golden-yellow/10w/10 to-yellow-100/50">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-linear-to-br from-golden-yellow to-yellow-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  👨‍💼
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Ahsan</h3>
                  <p className="text-sm text-gray-600">Property Owner</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    owner@ngekostaja.com
                  </p>
                </div>
                <Link
                  href="/owner/settings"
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2.5 bg-white hover:bg-gray-50 rounded-lg transition shadow-sm"
                >
                  <Settings size={20} className="text-gray-600" />
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="px-6 py-4 grid grid-cols-3 gap-3 bg-gray-50 border-b border-gray-200">
              <div className="text-center bg-white rounded-lg p-3 shadow-sm">
                <Building2
                  size={20}
                  className="mx-auto text-golden-yellow mb-1"
                />
                <p className="text-lg font-bold text-gray-900">24</p>
                <p className="text-xs text-gray-500">Properties</p>
              </div>
              <div className="text-center bg-white rounded-lg p-3 shadow-sm">
                <Users size={20} className="mx-auto text-green-500 mb-1" />
                <p className="text-lg font-bold text-gray-900">18</p>
                <p className="text-xs text-gray-500">Tenants</p>
              </div>
              <div className="text-center bg-white rounded-lg p-3 shadow-sm">
                <DollarSign size={20} className="mx-auto text-blue-500 mb-1" />
                <p className="text-lg font-bold text-gray-900">88%</p>
                <p className="text-xs text-gray-500">Occupancy</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="px-4 py-6 space-y-2">
              {menuItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition ${
                      isActive
                        ? "bg-gray-900 text-white! shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        isActive ? "bg-white/20" : "bg-gray-100"
                      }`}
                    >
                      <item.icon size={22} />
                    </div>
                    <span className="font-medium text-base flex-1">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Bottom Menu Items */}
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                {bottomMenuItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition ${
                      idx === bottomMenuItems.length - 1
                        ? "text-red-600 hover:bg-red-50"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        idx === bottomMenuItems.length - 1
                          ? "bg-red-50"
                          : "bg-gray-100"
                      }`}
                    >
                      <item.icon size={22} />
                    </div>
                    <span className="font-medium text-base">{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
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
                onClick={() => setShowNotifications(!showNotifications)}
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
                👨‍💼
              </Link>
            </div>
          </div>
        </header>

        {/* Content Area with padding for bottom nav */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">{children}</main>

        {/* Bottom Navigation - Mobile Only */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40 shadow-lg">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {bottomNavItems.map((item, idx) => {
              const isActive = pathname === item.href;
              const isMenu = item.action === "menu";

              if (isMenu) {
                return (
                  <button
                    key={idx}
                    onClick={() => setIsSidebarOpen(true)}
                    className="flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-colors hover:bg-gray-50 active:bg-gray-100"
                  >
                    <div className="relative p-1.5 rounded-lg bg-gray-100">
                      <item.icon size={24} className="text-gray-700" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 mt-1">
                      {item.label}
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={idx}
                  href={item.href || "#"}
                  className={`flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all ${
                    isActive ? "bg-golden-yellow/10" : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`relative p-1.5 rounded-lg transition-colors ${
                      isActive ? "bg-golden-yellow" : "bg-transparent"
                    }`}
                  >
                    <item.icon
                      size={24}
                      className={isActive ? "text-white!" : "text-gray-600"}
                    />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium mt-1 transition-colors ${
                      isActive ? "text-golden-yellow" : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
