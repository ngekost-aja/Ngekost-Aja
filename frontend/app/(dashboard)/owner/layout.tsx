'use client'

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
  Bell
} from "lucide-react";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/owner" },
    { icon: Building2, label: "My Properties", href: "/owner/properties" },
    { icon: Users, label: "Clients", href: "/owner/clients" },
    { icon: DollarSign, label: "Transaction", href: "/owner/transaction" },
    { icon: BarChart3, label: "Analytics", href: "/owner/analytics" },
    { icon: MessageSquare, label: "Messages", href: "/owner/messages", badge: 3 },
    { icon: Settings, label: "Settings", href: "/owner/settings" },
  ];

  const bottomMenuItems = [
    { icon: HelpCircle, label: "Help Center", href: "/owner/help" },
    { icon: LogOut, label: "Log out", href: "/logout" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#EDCD44] rounded-lg flex items-center justify-center text-2xl">
              🏠
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
                    <span className="ml-auto bg-[#EDCD44] text-white text-xs font-bold px-2 py-0.5 rounded-full">
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

        {/* Upgrade Premium */}
        <div className="p-4 m-4 bg-linear-to-br from-[#EDCD44] to-yellow-500 rounded-xl text-white">
          <h3 className="font-bold mb-2">Upgrade to Premium</h3>
          <p className="text-xs mb-3 opacity-90">Get 1-month free trial!</p>
          <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
            Upgrade
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsSidebarOpen(false)}>
          <aside className="w-64 h-full bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#EDCD44] rounded-lg flex items-center justify-center text-2xl">
                  🏠
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">Ngekost Aja</h2>
                  <p className="text-xs text-gray-500">Owner Panel</p>
                </div>
              </div>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="p-4 space-y-1 overflow-y-auto" style={{ height: 'calc(100% - 200px)' }}>
              {menuItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-gray-900 text-white!"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-[#EDCD44] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-1">
                {bottomMenuItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    <item.icon size={20} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
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
          <h1 className="font-bold text-lg">Owner Dashboard</h1>
          <button className="relative">
            <Bell size={24} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}