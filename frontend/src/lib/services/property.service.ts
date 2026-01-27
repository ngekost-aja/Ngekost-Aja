/**
 * Property Service
 * Handles all property-related API operations
 * Communicates with Express.js/TSOA backend
 */

import { getToken } from './auth.service';
import type {
  Property,
  PropertyListRequest,
  CreatePropertyRequest,
  UpdatePropertyRequest,
  Room,
  CreateRoomRequest,
  UpdateRoomRequest,
  Facility,
  CreateFacilityRequest,
  AddPropertyFacilityRequest,
} from '@/lib/types/property.types';

// ============================================================================
// Constants
// ============================================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ============================================================================
// API Communication Helper
// ============================================================================

/**
 * Make authenticated API request
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error('API_URL is not configured');
  }

  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'An error occurred',
    }));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// ============================================================================
// Property Operations
// ============================================================================

/**
 * List properties with optional filters
 */
export async function listProperties(
  filters?: PropertyListRequest,
): Promise<Property[]> {
  const queryParams = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }

  const queryString = queryParams.toString();
  const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;

  return await apiRequest<Property[]>(endpoint, {
    method: 'GET',
  });
}

/**
 * Get properties by owner ID
 */
export async function getOwnerProperties(ownerId: number): Promise<Property[]> {
  return await apiRequest<Property[]>(`/properties/owner/${ownerId}`, {
    method: 'GET',
  });
}

/**
 * Get property by ID
 */
export async function getPropertyById(id: number): Promise<Property> {
  return await apiRequest<Property>(`/properties/${id}`, {
    method: 'GET',
  });
}

/**
 * Create new property
 */
export async function createProperty(
  data: CreatePropertyRequest,
): Promise<Property> {
  return await apiRequest<Property>('/properties', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Update property
 */
export async function updateProperty(
  id: number,
  data: UpdatePropertyRequest,
): Promise<Property> {
  return await apiRequest<Property>(`/properties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Delete property
 */
export async function deleteProperty(
  id: number,
): Promise<{ success: boolean }> {
  return await apiRequest<{ success: boolean }>(`/properties/${id}`, {
    method: 'DELETE',
  });
}

// ============================================================================
// Room Operations
// ============================================================================

/**
 * List rooms for a property
 */
export async function listRooms(propertyId: number): Promise<Room[]> {
  return await apiRequest<Room[]>(`/rooms?propertyId=${propertyId}`, {
    method: 'GET',
  });
}

/**
 * Get room by ID
 */
export async function getRoomById(id: number): Promise<Room> {
  return await apiRequest<Room>(`/rooms/${id}`, {
    method: 'GET',
  });
}

/**
 * Create new room
 */
export async function createRoom(data: CreateRoomRequest): Promise<Room> {
  return await apiRequest<Room>('/rooms', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Update room
 */
export async function updateRoom(
  id: number,
  data: UpdateRoomRequest,
): Promise<Room> {
  return await apiRequest<Room>(`/rooms/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Delete room
 */
export async function deleteRoom(id: number): Promise<{ success: boolean }> {
  return await apiRequest<{ success: boolean }>(`/rooms/${id}`, {
    method: 'DELETE',
  });
}

// ============================================================================
// Facility Operations
// ============================================================================

/**
 * List all facilities
 */
export async function listFacilities(): Promise<Facility[]> {
  return await apiRequest<Facility[]>('/facilities', {
    method: 'GET',
  });
}

/**
 * Create new facility
 */
export async function createFacility(
  data: CreateFacilityRequest,
): Promise<Facility> {
  return await apiRequest<Facility>('/facilities', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Get facilities for a property
 */
export async function getPropertyFacilities(
  propertyId: number,
): Promise<Facility[]> {
  return await apiRequest<Facility[]>(`/facilities/property/${propertyId}`, {
    method: 'GET',
  });
}

/**
 * Add facility to property
 */
export async function addPropertyFacility(
  data: AddPropertyFacilityRequest,
): Promise<{ success: boolean }> {
  return await apiRequest<{ success: boolean }>('/facilities/property', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Remove facility from property
 */
export async function removePropertyFacility(
  propertyId: number,
  facilityId: number,
): Promise<{ success: boolean }> {
  return await apiRequest<{ success: boolean }>(
    `/facilities/property/${propertyId}/${facilityId}`,
    {
      method: 'DELETE',
    },
  );
}

// ============================================================================
// Export default service object
// ============================================================================

const PropertyService = {
  // Property operations
  listProperties,
  getOwnerProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,

  // Room operations
  listRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,

  // Facility operations
  listFacilities,
  createFacility,
  getPropertyFacilities,
  addPropertyFacility,
  removePropertyFacility,
};

export default PropertyService;
