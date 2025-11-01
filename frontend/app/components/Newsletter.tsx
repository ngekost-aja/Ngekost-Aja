export default function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-linear-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Dapatkan Diskon 15%
          </h2>
          <p className="text-gray-600 mb-4">
            Daftar sekarang dan dapatkan penawaran terbaik!
          </p>
          <div className="flex gap-2 max-w-md">
            <input
              type="email"
              placeholder="email@mahasiswa.ac.id"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDCD44]"
            />
            <button className="bg-[#EDCD44] text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition whitespace-nowrap">
              Daftar Sekarang
            </button>
          </div>
        </div>
        <div className="hidden lg:block text-8xl">📧</div>
      </div>
    </section>
  );
}
