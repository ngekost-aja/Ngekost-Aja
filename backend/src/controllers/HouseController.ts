import houses from "@/repositories/houses";
import House from "@/models/House";
import {
  Body,
  Controller,
  Post,
  Put,
  Route,
  Tags,
  Response,
  SuccessResponse,
  Get,
  Path,
  Query,
} from "tsoa";

/**
 * HouseController
 *
 * Endpoints to support common use cases:
 * - Students: browse, search/filter, view details, book
 * - Managers: add/edit/delete houses, view/confirm/reject bookings
 * - Owners: view reports (not implemented here)
 *
 * Note: this controller uses a simple in-memory `houses` repository imported above.
 * Adapt persistence and auth checks (role-based) in real app.
 */
@Route("houses")
@Tags("BoardingHouse")
export class HouseController extends Controller {
  /**
   * Browse / Search boarding houses
   * Example: GET /houses?location=Jakarta&minPrice=500000&maxPrice=2000000&type=kos_putri&page=1&limit=10
   */
  @Get("/")
  @SuccessResponse("200", "OK")
  @Response("400", "Bad Request")
  public async list(
    @Query() search?: string,
    @Query() location?: string,
    @Query() minPrice?: number,
    @Query() maxPrice?: number,
    @Query() type?: string,
    @Query() page: number = 1,
    @Query() limit: number = 20
  ): Promise<House[]> {
    let result = houses.slice();

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          (h.name && h.name.toLowerCase().includes(q)) ||
          (h.description && h.description.toLowerCase().includes(q))
      );
    }

    if (location) {
      const loc = location.toLowerCase();
      result = result.filter(
        (h) => h.location && h.location.toLowerCase().includes(loc)
      );
    }

    if (minPrice != null) {
      result = result.filter(
        (h) => typeof h.pricePerMonth === "number" && h.pricePerMonth >= minPrice
      );
    }

    if (maxPrice != null) {
      result = result.filter(
        (h) => typeof h.pricePerMonth === "number" && h.pricePerMonth <= maxPrice
      );
    }

    if (type) {
      result = result.filter((h) => h.type === type);
    }

    // simple pagination
    const start = (page - 1) * limit;
    const paged = result.slice(start, start + limit);
    return paged;
  }

  /**
   * Get boarding house details
   */
  @Get("{id}")
  @SuccessResponse("200", "OK")
  @Response("404", "Not Found")
  public async getById(@Path() id: string): Promise<House> {
    const house = houses.find((h) => String(h.id) === String(id));
    if (!house) {
      this.setStatus(404);
      throw new Error("House not found");
    }
    return house;
  }

  /**
   * Manager: Add new boarding house
   */
  @Post("/")
  @SuccessResponse("201", "Created")
  @Response("400", "Bad Request")
  public async create(@Body() payload: Partial<House>): Promise<House> {
    // simple validation
    if (!payload.name || !payload.location) {
      this.setStatus(400);
      throw new Error("title and location are required");
    }

    const newHouse: House = {
      id: (Date.now() + Math.floor(Math.random() * 1000)).toString(),
      name: payload.name,
      description: payload.description || "",
      location: payload.location,
      pricePerMonth: payload.pricePerMonth || 0,
      type: payload.type || "kos",
      facilities: payload.facilities || [],
      images: payload.images || [],
      bookings: [], // start empty
      ...payload,
    } as House;

    houses.push(newHouse);
    this.setStatus(201);
    return newHouse;
  }

  /**
   * Manager: Update boarding house
   */
  @Put("{id}")
  @SuccessResponse("200", "Updated")
  @Response("404", "Not Found")
  public async update(
    @Path() id: string,
    @Body() payload: Partial<House>
  ): Promise<House> {
    const idx = houses.findIndex((h) => String(h.id) === String(id));
    if (idx === -1) {
      this.setStatus(404);
      throw new Error("House not found");
    }
    const updated = { ...houses[idx], ...payload };
    houses[idx] = updated;
    return updated;
  }

  /**
   * Manager: Delete boarding house
   */
  @Post("{id}/delete")
  @SuccessResponse("200", "Deleted")
  @Response("404", "Not Found")
  public async remove(@Path() id: string): Promise<{ success: boolean }> {
    const idx = houses.findIndex((h) => String(h.id) === String(id));
    if (idx === -1) {
      this.setStatus(404);
      throw new Error("House not found");
    }
    houses.splice(idx, 1);
    return { success: true };
  }
}
