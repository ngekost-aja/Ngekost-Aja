'use client';

import { useEffect, useState } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import { getUserRole } from '@/lib/services/auth.service';
import OwnerNavigation from '@/app/(protected)/(owner)/_components/OwnerNavigation';
import ManagerNavigation from '@/app/(protected)/(manager)/_components/ManagerNavigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = getUserRole();
    setRole(userRole);
  }, []);

  // Show loading state while determining role
  if (!role) {
    return (
      <html lang="id">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    );
  }

  // Render appropriate navigation based on role
  const NavigationComponent =
    role === 'owner' ? OwnerNavigation : ManagerNavigation;

  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavigationComponent>{children}</NavigationComponent>
      </body>
    </html>
  );
}
