import { PropertyRepository } from "./property.repository";
import { prisma } from "@/lib/prisma";
import type {
	PropertyListRequest,
	CreatePropertyRequest,
	UpdatePropertyRequest,
	PropertyResponse,
	CreateRoomRequest,
	UpdateRoomRequest,
	RoomResponse,
	CreateFacilityRequest,
	FacilityResponse,
	AddPropertyFacilityRequest,
} from "./property.dto";

export class PropertyService {
	private repository: PropertyRepository;

	constructor() {
		this.repository = new PropertyRepository();
	}

	/**
	 * List properties with filters
	 */
	async listProperties(filters: PropertyListRequest): Promise<PropertyResponse[]> {
		const {
			search,
			location,
			minPrice,
			maxPrice,
			genderType,
			status,
			page = 1,
			limit = 20,
		} = filters;

		const where: any = {};

		// Status filter
		if (status) {
			where.status = status;
		}

		// Gender type filter
		if (genderType) {
			where.genderType = genderType;
		}

		// Search filter (name)
		if (search) {
			where.name = {
				contains: search,
			};
		}

		const properties = await this.repository.findProperties(
			where,
			(page - 1) * limit,
			limit
		);

		return properties.map((p) => ({
			id: p.id,
			name: p.name,
			ownerId: p.ownerId,
			managerId: p.managerId,
			addressId: p.addressId,
			latitude: Number(p.latitude),
			longitude: Number(p.longitude),
			genderType: p.genderType,
			status: p.status,
			createdAt: p.createdAt,
			updatedAt: p.updatedAt,
		}));
	}

	/**
	 * Get property by ID
	 */
	async getPropertyById(id: number): Promise<PropertyResponse> {
		const property = await this.repository.findPropertyById(id);

		if (!property) {
			throw new Error("Property not found");
		}

		return {
			id: property.id,
			name: property.name,
			ownerId: property.ownerId,
			managerId: property.managerId,
			addressId: property.addressId,
			latitude: Number(property.latitude),
			longitude: Number(property.longitude),
			genderType: property.genderType,
			status: property.status,
			createdAt: property.createdAt,
			updatedAt: property.updatedAt,
		};
	}

	/**
	 * Create a new property
	 */
	async createProperty(data: CreatePropertyRequest): Promise<PropertyResponse> {
		const property = await this.repository.createProperty({
			name: data.name,
			ownerId: data.ownerId,
			managerId: data.managerId,
			addressId: data.addressId,
			latitude: data.latitude,
			longitude: data.longitude,
			genderType: data.genderType,
			status: data.status || 'active',
		});

		return {
			id: property.id,
			name: property.name,
			ownerId: property.ownerId,
			managerId: property.managerId,
			addressId: property.addressId,
			latitude: Number(property.latitude),
			longitude: Number(property.longitude),
			genderType: property.genderType,
			status: property.status,
			createdAt: property.createdAt,
			updatedAt: property.updatedAt,
		};
	}

	/**
	 * Update property
	 */
	async updateProperty(
		id: number,
		data: UpdatePropertyRequest
	): Promise<PropertyResponse> {
		const existing = await this.repository.findPropertyById(id);

		if (!existing) {
			throw new Error("Property not found");
		}

		const property = await this.repository.updateProperty(id, {
			...(data.name && { name: data.name }),
			...(data.managerId !== undefined && { managerId: data.managerId }),
			...(data.addressId && { addressId: data.addressId }),
			...(data.latitude && { latitude: data.latitude }),
			...(data.longitude && { longitude: data.longitude }),
			...(data.genderType && { genderType: data.genderType }),
			...(data.status && { status: data.status }),
		});

		return {
			id: property.id,
			name: property.name,
			ownerId: property.ownerId,
			managerId: property.managerId,
			addressId: property.addressId,
			latitude: Number(property.latitude),
			longitude: Number(property.longitude),
			genderType: property.genderType,
			status: property.status,
			createdAt: property.createdAt,
			updatedAt: property.updatedAt,
		};
	}

	/**
	 * Delete property
	 */
	async deleteProperty(id: number): Promise<void> {
		const property = await this.repository.findPropertyById(id);

		if (!property) {
			throw new Error("Property not found");
		}

		await this.repository.deleteProperty(id);
	}

	// ============ ROOM OPERATIONS ============

	/**
	 * List rooms for a property
	 */
	async listRooms(propertyId: number): Promise<RoomResponse[]> {
		const rooms = await this.repository.findRoomsByPropertyId(propertyId);

		return rooms.map((r) => ({
			id: r.id,
			propertyId: r.propertyId,
			roomNumber: r.roomNumber,
			price: Number(r.price),
			status: r.status,
			createdAt: r.createdAt,
			updatedAt: r.updatedAt,
		}));
	}

	/**
	 * Get room by ID
	 */
	async getRoomById(id: number): Promise<RoomResponse> {
		const room = await this.repository.findRoomById(id);

		if (!room) {
			throw new Error("Room not found");
		}

		return {
			id: room.id,
			propertyId: room.propertyId,
			roomNumber: room.roomNumber,
			price: Number(room.price),
			status: room.status,
			createdAt: room.createdAt,
			updatedAt: room.updatedAt,
		};
	}

	/**
	 * Create a new room
	 */
	async createRoom(data: CreateRoomRequest): Promise<RoomResponse> {
		const room = await this.repository.createRoom({
			propertyId: data.propertyId,
			roomNumber: data.roomNumber,
			price: data.price,
			status: data.status || 'available',
		});

		return {
			id: room.id,
			propertyId: room.propertyId,
			roomNumber: room.roomNumber,
			price: Number(room.price),
			status: room.status,
			createdAt: room.createdAt,
			updatedAt: room.updatedAt,
		};
	}

	/**
	 * Update room
	 */
	async updateRoom(id: number, data: UpdateRoomRequest): Promise<RoomResponse> {
		const existing = await this.repository.findRoomById(id);

		if (!existing) {
			throw new Error("Room not found");
		}

		const room = await this.repository.updateRoom(id, {
			...(data.roomNumber && { roomNumber: data.roomNumber }),
			...(data.price && { price: data.price }),
			...(data.status && { status: data.status }),
		});

		return {
			id: room.id,
			propertyId: room.propertyId,
			roomNumber: room.roomNumber,
			price: Number(room.price),
			status: room.status,
			createdAt: room.createdAt,
			updatedAt: room.updatedAt,
		};
	}

	/**
	 * Delete room
	 */
	async deleteRoom(id: number): Promise<void> {
		const room = await this.repository.findRoomById(id);

		if (!room) {
			throw new Error("Room not found");
		}

		await this.repository.deleteRoom(id);
	}

	// ============ FACILITY OPERATIONS ============

	/**
	 * List all facilities
	 */
	async listFacilities(): Promise<FacilityResponse[]> {
		return await this.repository.findAllFacilities();
	}

	/**
	 * Create a new facility
	 */
	async createFacility(data: CreateFacilityRequest): Promise<FacilityResponse> {
		return await this.repository.createFacility({
			name: data.name,
		});
	}

	/**
	 * Add facility to property
	 */
	async addPropertyFacility(data: AddPropertyFacilityRequest): Promise<void> {
		await this.repository.createPropertyFacility(data.propertyId, data.facilityId);
	}

	/**
	 * Remove facility from property
	 */
	async removePropertyFacility(propertyId: number, facilityId: number): Promise<void> {
		await this.repository.deletePropertyFacility(propertyId, facilityId);
	}

	/**
	 * Get facilities for a property
	 */
	async getPropertyFacilities(propertyId: number): Promise<FacilityResponse[]> {
		return await this.repository.findPropertyFacilities(propertyId);
	}
}
