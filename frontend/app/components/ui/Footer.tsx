import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#EDCD44] p-2 rounded-lg">
                <Image
                  src="/ngekost-aja-logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Ngekost Aja</h3>
                <p className="text-xs text-gray-400">Cari kos</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Platform pencarian kos terpercaya untuk mahasiswa di seluruh
              Indonesia.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Kategori</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/kos-putra" className="hover:text-[#EDCD44]">
                  Kos Putra
                </Link>
              </li>
              <li>
                <Link href="/kos-putri" className="hover:text-[#EDCD44]">
                  Kos Putri
                </Link>
              </li>
              <li>
                <Link href="/kos-campur" className="hover:text-[#EDCD44]">
                  Kos Campur
                </Link>
              </li>
              <li>
                <Link href="/promo" className="hover:text-[#EDCD44]">
                  Promo Spesial
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Bantuan</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/faq" className="hover:text-[#EDCD44]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/cara-pesan" className="hover:text-[#EDCD44]">
                  Cara Pesan
                </Link>
              </li>
              <li>
                <Link href="/syarat" className="hover:text-[#EDCD44]">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#EDCD44]">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Hubungi Kami</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📧 info@ngekostaja.com</li>
              <li>📱 0800 332 65-66</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Ngekost Aja - Platform Pencarian
            Kos untuk Mahasiswa Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
