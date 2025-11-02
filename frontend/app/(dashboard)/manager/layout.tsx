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
} from "lucide-react";
import Image from "next/image";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200">
        {/* Logo & Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/ngekost-aja-logo.png"
              alt="Logo"
              width={40}
              height={40}
            />
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

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        >
          <aside
            className="w-64 h-full bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/ngekost-aja-logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <div>
                  <h2 className="font-bold text-gray-900">Ngekost Aja</h2>
                  <p className="text-xs text-gray-500">Manager Panel</p>
                </div>
              </div>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav
              className="p-4 space-y-6 overflow-y-auto"
              style={{ height: "calc(100% - 140px)" }}
            >
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
                          onClick={() => setIsSidebarOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                            isActive
                              ? "bg-golden-yellow text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <item.icon size={20} />
                          <span className="font-medium text-sm">
                            {item.label}
                          </span>
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

            <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
              <button className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                <LogOut size={20} />
                <span className="font-medium text-sm">Log Off</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg">Manager Dashboard</h1>
          <div className="w-6"></div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
