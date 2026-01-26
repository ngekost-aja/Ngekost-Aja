'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserRole, isAuthenticated } from '@/lib/services/auth.service';
import OwnerDashboard from '@/app/(protected)/owner/dashboard/OwnerDashboard';
import ManagerDashboard from '@/app/(protected)/manager/dashboard/ManagerDashboard';

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const authenticated = await isAuthenticated();

        if (!authenticated) {
          setLoading(false); // Set loading to false before redirect
          router.replace('/login'); // Use replace instead of push
          return;
        }

        const userRole = getUserRole();
        if (!userRole) {
          setLoading(false); // Set loading to false before redirect
          router.replace('/login'); // Use replace instead of push
          return;
        }

        setRole(userRole);
        setLoading(false);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setLoading(false); // Set loading to false before redirect
        router.replace('/login'); // Use replace instead of push
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-golden-yellow"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Render role-specific dashboard
  if (role === 'owner') {
    return <OwnerDashboard />;
  }

  if (role === 'manager') {
    return <ManagerDashboard />;
  }

  // Fallback for unknown roles
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600">
          Your role does not have access to this dashboard.
        </p>
      </div>
    </div>
  );
}
