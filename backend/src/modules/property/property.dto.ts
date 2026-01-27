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

export interface PropertyResponse {
  id: number;
  name: string;
  ownerId: number;
  managerId?: number | null;
  addressId: number;
  latitude: number;
  longitude: number;
  genderType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  // Extended fields for frontend
  totalRooms?: number;
  occupiedRooms?: number;
  availableRooms?: number;
  facilities?: FacilityResponse[];
  rooms?: RoomResponse[];
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

export interface RoomResponse {
  id: number;
  propertyId: number;
  roomNumber: string;
  price: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFacilityRequest {
  name: string;
}

export interface FacilityResponse {
  id: number;
  name: string;
}

export interface AddPropertyFacilityRequest {
  propertyId: number;
  facilityId: number;
}
