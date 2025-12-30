import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Query,
	Response,
	Route,
	SuccessResponse,
	Tags,
} from "tsoa";
import { PropertyService } from "./property.service";
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

@Route("properties")
@Tags("Property")
export class PropertyController extends Controller {
	private propertyService: PropertyService;

	constructor() {
		super();
		this.propertyService = new PropertyService();
	}

	/**
	 * Browse / Search properties
	 */
	@Get("/")
	@SuccessResponse("200", "OK")
	public async list(
		@Query() search?: string,
		@Query() location?: string,
		@Query() minPrice?: number,
		@Query() maxPrice?: number,
		@Query() genderType?: 'male' | 'female' | 'mixed',
		@Query() status?: 'active' | 'inactive',
		@Query() page: number = 1,
		@Query() limit: number = 20
	): Promise<PropertyResponse[]> {
		const filters: PropertyListRequest = {
			search,
			location,
			minPrice,
			maxPrice,
			genderType,
			status,
			page,
			limit,
		};
		return await this.propertyService.listProperties(filters);
	}

	/**
	 * Get property details
	 */
	@Get("{id}")
	@SuccessResponse("200", "OK")
	@Response("404", "Not Found")
	public async getById(@Path() id: number): Promise<PropertyResponse> {
		try {
			return await this.propertyService.getPropertyById(id);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Property not found");
		}
	}

	/**
	 * Create new property
	 */
	@Post("/")
	@SuccessResponse("201", "Created")
	@Response("400", "Bad Request")
	public async create(
		@Body() body: CreatePropertyRequest
	): Promise<PropertyResponse> {
		try {
			const result = await this.propertyService.createProperty(body);
			this.setStatus(201);
			return result;
		} catch (error: any) {
			this.setStatus(400);
			throw new Error(error.message || "Failed to create property");
		}
	}

	/**
	 * Update property
	 */
	@Put("{id}")
	@SuccessResponse("200", "Updated")
	@Response("404", "Not Found")
	public async update(
		@Path() id: number,
		@Body() body: UpdatePropertyRequest
	): Promise<PropertyResponse> {
		try {
			return await this.propertyService.updateProperty(id, body);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Property not found");
		}
	}

	/**
	 * Delete property
	 */
	@Delete("{id}")
	@SuccessResponse("200", "Deleted")
	@Response("404", "Not Found")
	public async remove(@Path() id: number): Promise<{ success: boolean }> {
		try {
			await this.propertyService.deleteProperty(id);
			return { success: true };
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Property not found");
		}
	}
}

@Route("rooms")
@Tags("Room")
export class RoomController extends Controller {
	private propertyService: PropertyService;

	constructor() {
		super();
		this.propertyService = new PropertyService();
	}

	/**
	 * List rooms for a property
	 */
	@Get("/")
	@SuccessResponse("200", "OK")
	public async list(@Query() propertyId: number): Promise<RoomResponse[]> {
		return await this.propertyService.listRooms(propertyId);
	}

	/**
	 * Get room by ID
	 */
	@Get("{id}")
	@SuccessResponse("200", "OK")
	@Response("404", "Not Found")
	public async getById(@Path() id: number): Promise<RoomResponse> {
		try {
			return await this.propertyService.getRoomById(id);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Room not found");
		}
	}

	/**
	 * Create new room
	 */
	@Post("/")
	@SuccessResponse("201", "Created")
	@Response("400", "Bad Request")
	public async create(@Body() body: CreateRoomRequest): Promise<RoomResponse> {
		try {
			const result = await this.propertyService.createRoom(body);
			this.setStatus(201);
			return result;
		} catch (error: any) {
			this.setStatus(400);
			throw new Error(error.message || "Failed to create room");
		}
	}

	/**
	 * Update room
	 */
	@Put("{id}")
	@SuccessResponse("200", "Updated")
	@Response("404", "Not Found")
	public async update(
		@Path() id: number,
		@Body() body: UpdateRoomRequest
	): Promise<RoomResponse> {
		try {
			return await this.propertyService.updateRoom(id, body);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Room not found");
		}
	}

	/**
	 * Delete room
	 */
	@Delete("{id}")
	@SuccessResponse("200", "Deleted")
	@Response("404", "Not Found")
	public async remove(@Path() id: number): Promise<{ success: boolean }> {
		try {
			await this.propertyService.deleteRoom(id);
			return { success: true };
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Room not found");
		}
	}
}

@Route("facilities")
@Tags("Facility")
export class FacilityController extends Controller {
	private propertyService: PropertyService;

	constructor() {
		super();
		this.propertyService = new PropertyService();
	}

	/**
	 * List all facilities
	 */
	@Get("/")
	@SuccessResponse("200", "OK")
	public async list(): Promise<FacilityResponse[]> {
		return await this.propertyService.listFacilities();
	}

	/**
	 * Create new facility
	 */
	@Post("/")
	@SuccessResponse("201", "Created")
	public async create(
		@Body() body: CreateFacilityRequest
	): Promise<FacilityResponse> {
		const result = await this.propertyService.createFacility(body);
		this.setStatus(201);
		return result;
	}

	/**
	 * Add facility to property
	 */
	@Post("property")
	@SuccessResponse("201", "Added")
	public async addToProperty(
		@Body() body: AddPropertyFacilityRequest
	): Promise<{ success: boolean }> {
		await this.propertyService.addPropertyFacility(body);
		this.setStatus(201);
		return { success: true };
	}

	/**
	 * Remove facility from property
	 */
	@Delete("property/{propertyId}/{facilityId}")
	@SuccessResponse("200", "Removed")
	public async removeFromProperty(
		@Path() propertyId: number,
		@Path() facilityId: number
	): Promise<{ success: boolean }> {
		await this.propertyService.removePropertyFacility(propertyId, facilityId);
		return { success: true };
	}

	/**
	 * Get facilities for a property
	 */
	@Get("property/{propertyId}")
	@SuccessResponse("200", "OK")
	public async getPropertyFacilities(
		@Path() propertyId: number
	): Promise<FacilityResponse[]> {
		return await this.propertyService.getPropertyFacilities(propertyId);
	}
}
