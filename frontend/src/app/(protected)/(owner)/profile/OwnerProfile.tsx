'use client';

import { User, LogOut, Mail, Shield, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logout, getUserInfo } from '@/lib/services/auth.service';
import { useEffect, useState } from 'react';

export default function OwnerProfile() {
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
      <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Profil Saya
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola informasi akun Anda
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-4 py-2 hover:bg-white rounded-lg transition"
          >
            <ArrowLeft size={16} />
            <span className="hidden lg:inline">Kembali</span>
          </button>
        </div>

        {/* Main Content - Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card - Takes 1 column on desktop */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
              {/* Header with gradient */}
              <div className="bg-linear-to-r from-golden-yellow to-yellow-500 h-24 lg:h-32"></div>

              {/* Profile Info */}
              <div className="px-6 pb-6">
                {/* Avatar */}
                <div className="flex justify-center -mt-12 lg:-mt-16 mb-4">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white">
                    <div className="w-20 h-20 lg:w-28 lg:h-28 bg-linear-to-br from-golden-yellow to-yellow-500 rounded-full flex items-center justify-center">
                      <User
                        size={48}
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="text-center">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                    {userInfo?.name || 'Owner'}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">Panel Pemilik</p>

                  {/* Logout Button - Inside card on desktop */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-red-50 text-red-600 font-medium py-3 px-4 rounded-lg shadow-sm transition border border-red-200 mt-6"
                  >
                    <LogOut size={18} />
                    <span>Keluar dari Akun</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information - Takes 2 columns on desktop */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Details Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Informasi Akun
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <Mail
                      size={24}
                      className="text-blue-600"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Email
                    </p>
                    <p className="text-base font-medium text-gray-900 break-all">
                      {userInfo?.email || 'owner@example.com'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <Shield
                      size={24}
                      className="text-purple-600"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Role
                    </p>
                    <p className="text-base font-medium text-gray-900 capitalize">
                      {userInfo?.role || 'Owner'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Tips Card */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">
                    Tips Keamanan
                  </h4>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Pastikan untuk logout setelah selesai menggunakan aplikasi
                    untuk menjaga keamanan akun Anda. Jangan bagikan kredensial
                    login Anda kepada siapapun.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
