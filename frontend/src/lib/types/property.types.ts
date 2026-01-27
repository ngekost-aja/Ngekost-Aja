/**
 * Property Management Types
 * TypeScript interfaces for property-related data structures
 * Matching backend DTOs from Express.js/TSOA API
 */

// ============================================================================
// Property Types
// ============================================================================

export interface Property {
  id: number;
  name: string;
  ownerId: number;
  managerId?: number | null;
  addressId: number;
  latitude: number;
  longitude: number;
  genderType: 'male' | 'female' | 'mixed';
  status: 'active' | 'inactive';
  createdAt: Date | string;
  updatedAt: Date | string;

  // Extended fields (from enhanced backend response)
  totalRooms?: number;
  occupiedRooms?: number;
  availableRooms?: number;
  facilities?: Facility[];
  rooms?: Room[];
  manager?: Manager;
  address?: Address;
}

export interface PropertyListRequest {
  search?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  genderType?: 'male' | 'female' | 'mixed';
  status?: 'active' | 'inactive';
  page?: number;
  limit?: number;
}

export interface CreatePropertyRequest {
  name: string;
  ownerId: number;
  managerId?: number;
  addressId: number;
  latitude: number;
  longitude: number;
  genderType: 'male' | 'female' | 'mixed';
  status?: 'active' | 'inactive';
}

export interface UpdatePropertyRequest {
  name?: string;
  managerId?: number;
  addressId?: number;
  latitude?: number;
  longitude?: number;
  genderType?: 'male' | 'female' | 'mixed';
  status?: 'active' | 'inactive';
}

// ============================================================================
// Room Types
// ============================================================================

export interface Room {
  id: number;
  propertyId: number;
  roomNumber: string;
  price: number;
  status: 'available' | 'occupied' | 'maintenance';
  createdAt: Date | string;
  updatedAt: Date | string;

  // Extended fields
  tenant?: Tenant;
  floor?: number;
}

export interface CreateRoomRequest {
  propertyId: number;
  roomNumber: string;
  price: number;
  status?: 'available' | 'occupied' | 'maintenance';
}

export interface UpdateRoomRequest {
  roomNumber?: string;
  price?: number;
  status?: 'available' | 'occupied' | 'maintenance';
}

// ============================================================================
// Facility Types
// ============================================================================

export interface Facility {
  id: number;
  name: string;
}

export interface CreateFacilityRequest {
  name: string;
}

export interface AddPropertyFacilityRequest {
  propertyId: number;
  facilityId: number;
}

// ============================================================================
// Related Types
// ============================================================================

export interface Manager {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  avatar?: string;
}

export interface Tenant {
  id: number;
  name: string;
  phone?: string;
  email?: string;
}

export interface Address {
  id: number;
  street: string;
  city: string;
  province: string;
  postalCode?: string;
  country: string;
}

// ============================================================================
// UI Helper Types
// ============================================================================

export interface PropertyWithStats extends Property {
  priceRange?: string;
  occupancyRate?: number;
  image?: string;
}
