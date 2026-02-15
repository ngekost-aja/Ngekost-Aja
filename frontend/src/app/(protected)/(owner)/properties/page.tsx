'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  MapPin,
  Building2,
  Users,
  Edit,
  UserPlus,
  MoreVertical,
} from 'lucide-react';
import Link from 'next/link';
import { getOwnerProperties } from '@/lib/services/property.service';
import { getUserId } from '@/lib/services/auth.service';
import type { Property } from '@/lib/types/property.types';

export default function OwnerPropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [assigningManager, setAssigningManager] = useState<number | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch properties on mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const userId = getUserId();
        if (!userId) {
          throw new Error('User not authenticated');
        }
        const data = await getOwnerProperties(userId);
        setProperties(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load properties',
        );
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Available managers - in real app, fetch from API
  const availableManagers = [
    {
      id: 1,
      name: 'Budi Santoso',
      phone: '081234567890',
      avatar: '👨‍💼',
      properties: 1,
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      phone: '081234567891',
      avatar: '👩‍💼',
      properties: 1,
    },
    {
      id: 3,
      name: 'Ahmad Fauzi',
      phone: '081234567892',
      avatar: '👨‍💼',
      properties: 1,
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      phone: '081234567893',
      avatar: '👩‍💼',
      properties: 0,
    },
    {
      id: 5,
      name: 'Rudi Hermawan',
      phone: '081234567894',
      avatar: '👨‍💼',
      properties: 0,
    },
  ];

  // Helper function to calculate price range from rooms
  const getPriceRange = (property: Property): string => {
    if (!property.rooms || property.rooms.length === 0) {
      return 'N/A';
    }
    const prices = property.rooms.map((r) => r.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const formatPrice = (price: number) =>
      `Rp ${(price / 1000000).toFixed(1)}M`;
    return minPrice === maxPrice
      ? formatPrice(minPrice)
      : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === 'all' || property.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
          Aktif
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
        Maintenance
      </span>
    );
  };

  const getOccupancyColor = (occupied: number, total: number) => {
    const rate = (occupied / total) * 100;
    if (rate >= 85) return 'text-green-600';
    if (rate >= 70) return 'text-blue-600';
    return 'text-yellow-600';
  };

  const handleAssignManager = (propertyId: number, managerId: number) => {
    // In real app, call API to assign manager
    console.log(`Assigning manager ${managerId} to property ${propertyId}`);
    setAssigningManager(null);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Properti Saya
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola semua properti kost-kostan Anda
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-golden-yellow text-white rounded-lg font-medium hover:bg-yellow-500 transition">
            <Plus size={20} />
            <span>Tambah Properti</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama properti..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow text-sm font-medium"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Menampilkan{' '}
            <span className="font-semibold text-gray-900">
              {filteredProperties.length}
            </span>{' '}
            properti
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Memuat properti...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-bold text-red-900 mb-2">
              Gagal memuat properti
            </h3>
            <p className="text-sm text-red-700 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-fit"
              >
                {/* Property Header */}
                <div className="p-4 lg:p-6">
                  <div className="flex gap-4">
                    {/* Property Image */}
                    <div className="w-24 h-24 lg:w-28 lg:h-28 bg-linear-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center text-5xl shrink-0">
                      🏢
                    </div>

                    {/* Property Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
                            {property.name}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                            <MapPin size={14} />
                            <span className="truncate">
                              Property ID: {property.id}
                            </span>
                          </p>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition ml-2">
                          <MoreVertical
                            size={18}
                            className="text-gray-600"
                          />
                        </button>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div className="flex items-center gap-1.5">
                          <Building2
                            size={16}
                            className="text-gray-400"
                          />
                          <span className="text-gray-600">
                            {property.totalRooms || 0} unit
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users
                            size={16}
                            className={getOccupancyColor(
                              property.occupiedRooms || 0,
                              property.totalRooms || 1,
                            )}
                          />
                          <span
                            className={`font-medium ${getOccupancyColor(property.occupiedRooms || 0, property.totalRooms || 1)}`}
                          >
                            {property.occupiedRooms || 0}/
                            {property.totalRooms || 0} terisi
                          </span>
                        </div>
                      </div>

                      {/* Price & Status */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {getPriceRange(property)}
                          </p>
                          <p className="text-xs text-gray-500">per bulan</p>
                        </div>
                        {getStatusBadge(property.status)}
                      </div>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Fasilitas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {property.facilities && property.facilities.length > 0 ? (
                        property.facilities.map((facility) => (
                          <span
                            key={facility.id}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                          >
                            {facility.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">
                          Tidak ada fasilitas
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Manager */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Manajer
                    </p>
                    {property.managerId ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-linear-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-sm">
                            👨‍💼
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Manager ID: {property.managerId}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setAssigningManager(property.id)}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Ganti
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAssigningManager(property.id)}
                        className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-golden-yellow hover:bg-yellow-50 transition w-full justify-center"
                      >
                        <UserPlus
                          size={16}
                          className="text-gray-600"
                        />
                        <span className="text-sm font-medium text-gray-600">
                          Tugaskan Manajer
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 lg:px-6 pb-4 lg:pb-6 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
                    <Edit size={18} />
                    <span>Edit Properti</span>
                  </button>
                  <Link
                    href={`/properties/${property.id}`}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    <Building2 size={18} />
                    <span className="hidden sm:inline">Detail</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProperties.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Tidak ada properti ditemukan
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Coba ubah filter pencarian atau tambah properti baru
            </p>
            <button className="px-6 py-3 bg-golden-yellow text-white rounded-lg font-medium hover:bg-yellow-500 transition">
              Tambah Properti Baru
            </button>
          </div>
        )}
      </div>

      {/* Assign Manager Modal */}
      {assigningManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Pilih Manajer</h2>
              <p className="text-sm text-gray-500 mt-1">
                Pilih manajer untuk mengelola properti ini
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {availableManagers.map((manager) => (
                  <button
                    key={manager.id}
                    onClick={() =>
                      handleAssignManager(assigningManager, manager.id)
                    }
                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-golden-yellow hover:bg-yellow-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-lg">
                        {manager.avatar}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">
                          {manager.name}
                        </p>
                        <p className="text-xs text-gray-500">{manager.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {manager.properties} properti
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setAssigningManager(null)}
                className="w-full mt-4 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
