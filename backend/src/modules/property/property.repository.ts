import { prisma } from "@/lib/prisma";
import type { Property, Room, Facility, PropertyFacility, Prisma } from "@/generated/prisma/client";

export class PropertyRepository {
	// ============ PROPERTY OPERATIONS ============

	/**
	 * Find properties with filters
	 */
	async findProperties(where: Prisma.PropertyWhereInput, skip: number, take: number): Promise<Property[]> {
		return await prisma.property.findMany({
			where,
			skip,
			take,
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	/**
	 * Find property by ID
	 */
	async findPropertyById(id: number): Promise<Property | null> {
		return await prisma.property.findUnique({
			where: { id },
		});
	}

	/**
	 * Create property
	 */
	async createProperty(data: {
		name: string;
		ownerId: number;
		managerId?: number | null;
		addressId: number;
		latitude: number;
		longitude: number;
		genderType: string;
		status?: string;
	}): Promise<Property> {
		return await prisma.property.create({
			data: {
				name: data.name,
				ownerId: data.ownerId,
				managerId: data.managerId,
				addressId: data.addressId,
				latitude: data.latitude,
				longitude: data.longitude,
				genderType: data.genderType as any,
				status: (data.status || 'active') as any,
			},
		});
	}

	/**
	 * Update property
	 */
	async updateProperty(id: number, data: {
		name?: string;
		managerId?: number | null;
		addressId?: number;
		latitude?: number;
		longitude?: number;
		genderType?: string;
		status?: string;
	}): Promise<Property> {
		return await prisma.property.update({
			where: { id },
			data: data as any,
		});
	}

	/**
	 * Delete property
	 */
	async deleteProperty(id: number): Promise<void> {
		await prisma.property.delete({
			where: { id },
		});
	}

	// ============ ROOM OPERATIONS ============

	/**
	 * Find rooms by property ID
	 */
	async findRoomsByPropertyId(propertyId: number): Promise<Room[]> {
		return await prisma.room.findMany({
			where: { propertyId },
			orderBy: { roomNumber: 'asc' },
		});
	}

	/**
	 * Find room by ID
	 */
	async findRoomById(id: number): Promise<Room | null> {
		return await prisma.room.findUnique({
			where: { id },
		});
	}

	/**
	 * Create room
	 */
	async createRoom(data: {
		propertyId: number;
		roomNumber: string;
		price: number;
		status?: string;
	}): Promise<Room> {
		return await prisma.room.create({
			data: {
				propertyId: data.propertyId,
				roomNumber: data.roomNumber,
				price: data.price,
				status: (data.status || 'available') as any,
			},
		});
	}

	/**
	 * Update room
	 */
	async updateRoom(id: number, data: {
		roomNumber?: string;
		price?: number;
		status?: string;
	}): Promise<Room> {
		return await prisma.room.update({
			where: { id },
			data: data as any,
		});
	}

	/**
	 * Delete room
	 */
	async deleteRoom(id: number): Promise<void> {
		await prisma.room.delete({
			where: { id },
		});
	}

	// ============ FACILITY OPERATIONS ============

	/**
	 * Find all facilities
	 */
	async findAllFacilities(): Promise<Facility[]> {
		return await prisma.facility.findMany({
			orderBy: { name: 'asc' },
		});
	}

	/**
	 * Create facility
	 */
	async createFacility(data: {
		name: string;
	}): Promise<Facility> {
		return await prisma.facility.create({
			data: {
				name: data.name,
			},
		});
	}

	/**
	 * Create property-facility relationship
	 */
	async createPropertyFacility(propertyId: number, facilityId: number): Promise<PropertyFacility> {
		return await prisma.propertyFacility.create({
			data: {
				propertyId,
				facilityId,
			},
		});
	}

	/**
	 * Delete property-facility relationship
	 */
	async deletePropertyFacility(propertyId: number, facilityId: number): Promise<void> {
		await prisma.propertyFacility.delete({
			where: {
				propertyId_facilityId: {
					propertyId,
					facilityId,
				},
			},
		});
	}

	/**
	 * Find facilities for a property
	 */
	async findPropertyFacilities(propertyId: number): Promise<Facility[]> {
		const propertyFacilities = await prisma.propertyFacility.findMany({
			where: { propertyId },
			include: {
				facility: true,
			},
		});

		return propertyFacilities.map((pf) => pf.facility);
	}
}
