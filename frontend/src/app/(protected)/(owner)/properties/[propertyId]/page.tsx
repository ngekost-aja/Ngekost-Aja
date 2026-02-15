'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Building2,
  Users,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Shield,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPropertyById } from '@/lib/services/property.service';
import type { Property } from '@/lib/types/property.types';

export default function PropertyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.propertyId as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch property details on mount
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPropertyById(parseInt(propertyId));
        setProperty(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load property',
        );
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const getFacilityIcon = (facility: string) => {
    const icons: { [key: string]: any } = {
      WiFi: Wifi,
      Parkir: Car,
      'Dapur Bersama': Utensils,
      Gym: Dumbbell,
      'Security 24/7': Shield,
    };
    const Icon = icons[facility];
    return Icon ? <Icon size={16} /> : null;
  };

  // Group rooms by floor
  const groupRoomsByFloor = () => {
    if (!property?.rooms) return [];

    const floors: { [key: number]: typeof property.rooms } = {};
    property.rooms.forEach((room) => {
      // Extract floor number from room number (e.g., "201" -> floor 2)
      const floorNum = Math.floor(parseInt(room.roomNumber) / 100);
      if (!floors[floorNum]) {
        floors[floorNum] = [];
      }
      floors[floorNum].push(room);
    });

    return Object.entries(floors)
      .map(([floor, rooms]) => ({
        floor: parseInt(floor),
        rooms: rooms.sort((a, b) => a.roomNumber.localeCompare(b.roomNumber)),
      }))
      .sort((a, b) => a.floor - b.floor);
  };

  const occupancyRate = property
    ? Math.round(
        ((property.occupiedRooms || 0) / (property.totalRooms || 1)) * 100,
      )
    : 0;

  // Loading state
  if (loading) {
    return (
      <div className="h-full overflow-y-auto bg-gray-50">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Memuat detail properti...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <div className="h-full overflow-y-auto bg-gray-50">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-12 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-bold text-red-900 mb-2">
              Gagal memuat properti
            </h3>
            <p className="text-sm text-red-700 mb-4">
              {error || 'Property not found'}
            </p>
            <button
              onClick={() => router.push('/properties')}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Kembali ke Daftar Properti
            </button>
          </div>
        </div>
      </div>
    );
  }

  const floorData = groupRoomsByFloor();

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/properties')}
            className="p-2 hover:bg-white rounded-lg transition"
          >
            <ArrowLeft
              size={24}
              className="text-gray-700"
            />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {property.name}
            </h1>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <MapPin size={14} />
              Property ID: {property.id}
            </p>
          </div>
        </div>

        {/* Property Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Building2 size={20} />
                  <span className="text-sm">Total Unit</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {property.totalRooms || 0}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <Users size={20} />
                  <span className="text-sm">Terisi</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {property.occupiedRooms || 0}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Building2 size={20} />
                  <span className="text-sm">Tersedia</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {property.availableRooms || 0}
                </p>
              </div>
            </div>

            {/* Room Map */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Peta Kamar</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-gray-600">Terisi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-gray-600">Tersedia</span>
                  </div>
                </div>
              </div>

              {/* Floors */}
              <div className="space-y-6">
                {floorData.length > 0 ? (
                  floorData.map((floor) => (
                    <div key={floor.floor}>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Lantai {floor.floor}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        {floor.rooms.map((room) => (
                          <div
                            key={room.id}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition hover:shadow-md ${
                              room.status === 'occupied'
                                ? 'bg-green-50 border-green-500'
                                : 'bg-blue-50 border-blue-500'
                            }`}
                          >
                            <div className="text-center">
                              <p className="font-bold text-gray-900 mb-1">
                                {room.roomNumber}
                              </p>
                              <p className="text-xs text-gray-600 mb-2">
                                Rp {(room.price / 1000000).toFixed(1)}M
                              </p>
                              {room.status === 'occupied' ? (
                                <p className="text-xs text-green-700 font-medium">
                                  Terisi
                                </p>
                              ) : (
                                <p className="text-xs text-blue-600 font-medium">
                                  Kosong
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Belum ada kamar
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Occupancy */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Tingkat Hunian
              </h3>
              <div className="mb-3">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {occupancyRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-full rounded-full ${
                      occupancyRate >= 85
                        ? 'bg-green-500'
                        : occupancyRate >= 70
                          ? 'bg-blue-500'
                          : 'bg-yellow-500'
                    }`}
                    style={{ width: `${occupancyRate}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {property.occupiedRooms || 0} dari {property.totalRooms || 0}{' '}
                kamar terisi
              </p>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Rentang Harga
              </h3>
              {property.rooms && property.rooms.length > 0 ? (
                <>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    Rp{' '}
                    {(
                      Math.min(...property.rooms.map((r) => r.price)) / 1000000
                    ).toFixed(1)}
                    M - Rp{' '}
                    {(
                      Math.max(...property.rooms.map((r) => r.price)) / 1000000
                    ).toFixed(1)}
                    M
                  </p>
                  <p className="text-sm text-gray-500">per bulan</p>
                </>
              ) : (
                <p className="text-gray-500">N/A</p>
              )}
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Fasilitas
              </h3>
              <div className="space-y-2">
                {property.facilities && property.facilities.length > 0 ? (
                  property.facilities.map((facility) => (
                    <div
                      key={facility.id}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      {getFacilityIcon(facility.name)}
                      <span className="text-sm">{facility.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Tidak ada fasilitas</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
                Edit Properti
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
                Kelola Kamar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
