export default function BannerPromo() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banner 1 */}
        <div className="bg-linear-to-r from-blue-100 to-blue-50 rounded-2xl p-8 flex items-center justify-between overflow-hidden relative">
          <div className="z-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Kos Nyaman Dekat
              <br />
              Kampus ITB
            </h2>
            <p className="text-gray-600 mb-4">
              Temukan kos idaman dengan
              <br />
              fasilitas lengkap
            </p>
            <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
              Cari Sekarang
            </button>
          </div>
          <div className="absolute right-0 top-0 w-64 h-full opacity-20">
            <div className="text-9xl transform rotate-12">🏠</div>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="bg-linear-to-r from-[#EDCD44] to-yellow-300 rounded-2xl p-8 flex items-center justify-between overflow-hidden relative">
          <div className="z-10">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-2">
              PROMO SPESIAL
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Diskon 20%
            </h2>
            <p className="text-gray-700 mb-4">
              Untuk mahasiswa baru
              <br />
              semester ini
            </p>
            <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
              Lihat Promo
            </button>
          </div>
          <div className="absolute right-0 bottom-0 text-8xl opacity-30">
            💰
          </div>
        </div>
      </div>
    </section>
  );
}
