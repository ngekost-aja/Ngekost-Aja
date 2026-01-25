'use client';

import { User, LogOut, Mail, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logout, getUserInfo } from '@/lib/auth';
import { useEffect, useState } from 'react';

export default function OwnerProfilePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{
    name?: string;
    email: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    const info = getUserInfo();
    if (info) {
      setUserInfo({
        name: info.name,
        email: info.email,
        role: info.role,
      });
    }
  }, []);

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      logout();
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Profil Saya
          </h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Kembali
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-linear-to-r from-golden-yellow to-yellow-500 h-24"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center -mt-12 mb-4">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white">
                <div className="w-20 h-20 bg-linear-to-br from-golden-yellow to-yellow-500 rounded-full flex items-center justify-center">
                  <User
                    size={40}
                    className="text-white"
                  />
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {userInfo?.name || 'Owner'}
              </h2>
              <p className="text-sm text-gray-500">Panel Pemilik</p>
            </div>

            {/* Info Items */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail
                    size={20}
                    className="text-blue-600"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">
                    {userInfo?.email || 'owner@example.com'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield
                    size={20}
                    className="text-purple-600"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {userInfo?.role || 'Owner'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-red-50 text-red-600 font-medium py-4 px-6 rounded-xl shadow-sm transition border border-red-200"
        >
          <LogOut size={20} />
          <span>Keluar dari Akun</span>
        </button>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Tips:</strong> Pastikan untuk logout setelah selesai
            menggunakan aplikasi untuk menjaga keamanan akun Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
