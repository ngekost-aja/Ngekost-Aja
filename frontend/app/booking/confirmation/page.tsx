'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Home, Calendar, Users, CreditCard } from "lucide-react";

export default function BookingConfirmationPage() {
  const [bookingData, setBookingData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('bookingData');
    if (!data) {
      router.push('/');
    } else {
      setBookingData(JSON.parse(data));
    }
  }, [router]);

  if (!bookingData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Pemesanan Berhasil!</h1>
          <p className="text-sm md:text-base text-gray-600">Terima kasih telah memesan kos di Ngekost Aja</p>
        </div>

        <div className="bg-linear-to-r from-[#EDCD44] to-yellow-300 rounded-xl p-6 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Detail Pemesanan</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs md:text-sm text-gray-700">Properti</p>
                <p className="font-semibold text-sm md:text-base text-gray-900">{bookingData.property}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs md:text-sm text-gray-700">Tanggal</p>
                <p className="font-semibold text-sm md:text-base text-gray-900">
                  {bookingData.checkIn} - {bookingData.checkOut}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs md:text-sm text-gray-700">Tamu</p>
                <p className="font-semibold text-sm md:text-base text-gray-900">{bookingData.guests}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs md:text-sm text-gray-700">Total Pembayaran</p>
                <p className="font-bold text-xl md:text-2xl text-gray-900">
                  Rp {bookingData.totalPayment.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-xs md:text-sm text-blue-800">
            📧 Kami telah mengirimkan konfirmasi pemesanan ke email Anda. Silakan cek email untuk detail lebih lanjut.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 bg-[#EDCD44] text-white py-3 rounded-lg font-semibold text-center hover:bg-yellow-500 transition text-sm md:text-base"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/bookings"
            className="flex-1 border-2 border-[#EDCD44] text-[#EDCD44] py-3 rounded-lg font-semibold text-center hover:bg-yellow-50 transition text-sm md:text-base"
          >
            Lihat Pesanan Saya
          </Link>
        </div>
      </div>
    </div>
  );
}