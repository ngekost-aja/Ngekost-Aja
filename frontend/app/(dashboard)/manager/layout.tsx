"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Settings,
  BarChart3,
  MessageSquare,
  Home,
  LogOut,
  Menu,
  X,
  Bell,
  User,
} from "lucide-react";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
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

  // Bottom nav items for mobile - Most important/frequently used items
  const bottomNavItems = [
    { icon: Calendar, label: "Bookings", href: "/manager", badge: 5 },
    { icon: MessageSquare, label: "Messages", href: "/manager/messages", badge: 3 },
    { icon: Home, label: "Listing", href: "/manager/listing" },
    { icon: BarChart3, label: "Review", href: "/manager/review" },
    { icon: Menu, label: "More", action: "menu" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200">
        {/* Logo & Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-golden-yellow rounded-full flex items-center justify-center text-2xl">
              🏠
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Ngekost Aja</h2>
              <p className="text-xs text-gray-500">Manager Panel</p>
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                        isActive
                          ? "bg-golden-yellow text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="font-medium text-sm">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-white text-golden-yellow"
                              : "bg-golden-yellow text-white"
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

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition">
            <LogOut size={20} />
            <span className="font-medium text-sm">Log Off</span>
          </button>
        </div>
      </aside>

      {/* Mobile Full Menu Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto"
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
                  <div className="w-12 h-12 bg-golden-yellow rounded-full flex items-center justify-center text-2xl">
                    🏠
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-lg">Menu</h2>
                    <p className="text-xs text-gray-500">Manager Panel</p>
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
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-2xl">
                  👨‍💼
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Manager Name</h3>
                  <p className="text-sm text-gray-500">manager@ngekostaja.com</p>
                </div>
                <Link
                  href="/manager/profile"
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition"
                >
                  <Settings size={20} className="text-gray-600" />
                </Link>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="px-4 py-6 space-y-6">
              {menuItems.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3 px-3">
                    {section.section}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item, itemIdx) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={itemIdx}
                          href={item.href}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition ${
                            isActive
                              ? "bg-golden-yellow text-white shadow-md"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                            isActive ? "bg-white/20" : "bg-gray-100"
                          }`}>
                            <item.icon size={22} />
                          </div>
                          <span className="font-medium text-base flex-1">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                isActive
                                  ? "bg-white text-golden-yellow"
                                  : "bg-golden-yellow text-white"
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

              {/* Logout Button */}
              <div className="pt-4 border-t border-gray-200">
                <button className="flex items-center gap-4 w-full px-4 py-3.5 text-red-600 hover:bg-red-50 rounded-xl transition">
                  <div className="p-2 rounded-lg bg-red-50">
                    <LogOut size={22} />
                  </div>
                  <span className="font-medium text-base">Log Out</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-golden-yellow rounded-full flex items-center justify-center text-xl">
                🏠
              </div>
              <div>
                <h1 className="font-bold text-base text-gray-900">Ngekost Aja</h1>
                <p className="text-xs text-gray-500">Manager Panel</p>
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
                href="/manager/profile"
                className="w-9 h-9 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-lg"
              >
                👨‍💼
              </Link>
            </div>
          </div>
        </header>

        {/* Content Area with padding for bottom nav */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {children}
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40 shadow-lg">
          <div className="flex items-center justify-around">
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
                  className={`flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-colors ${
                    isActive
                      ? "bg-golden-yellow/10"
                      : "hover:bg-gray-50 active:bg-gray-100"
                  }`}
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
                    className={`text-xs font-medium mt-1 ${
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