import houses from "@/repositories/houses";
import {
  Body,
  Controller,
  Post,
  Route,
  Tags,
  Response,
  SuccessResponse,
  Get,
  Path,
} from "tsoa";

@Route("booking")
@Tags("Booking")
export class BookingController extends Controller {
  /**
   * Student: Book a boarding house
   * Body: { userId, startDate, endDate, note }
   */
  @Post("{id}/book")
  @SuccessResponse("201", "Booking Requested")
  @Response("404", "Not Found")
  public async book(
    @Path() id: string,
    @Body()
    payload: {
      userId: string;
      startDate: string;
      endDate?: string;
      note?: string;
    }
  ): Promise<{ bookingId: string; status: string }> {
    const house = houses.find((h) => String(h.id) === String(id));
    if (!house) {
      this.setStatus(404);
      throw new Error("House not found");
    }

    const bookingId = (
      Date.now() + Math.floor(Math.random() * 1000)
    ).toString();
    const booking = {
      id: bookingId,
      userId: payload.userId,
      startDate: payload.startDate,
      endDate: payload.endDate || null,
      note: payload.note || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // ensure bookings array exists
    if (!Array.isArray((house as any).bookings)) {
      (house as any).bookings = [];
    }
    (house as any).bookings.push(booking);

    this.setStatus(201);
    return { bookingId, status: "pending" };
  }

  /**
   * Manager: View bookings for a house
   */
  @Get("{id}/bookings")
  @SuccessResponse("200", "OK")
  @Response("404", "Not Found")
  public async bookings(@Path() id: string): Promise<any[]> {
    const house = houses.find((h) => String(h.id) === String(id));
    if (!house) {
      this.setStatus(404);
      throw new Error("House not found");
    }
    return (house as any).bookings || [];
  }

  /**
   * Manager: Confirm a booking
   */
  @Post("{id}/bookings/{bookingId}/confirm")
  @SuccessResponse("200", "Confirmed")
  @Response("404", "Not Found")
  public async confirmBooking(
    @Path() id: string,
    @Path() bookingId: string
  ): Promise<{ success: boolean }> {
    const house = houses.find((h) => String(h.id) === String(id));
    if (!house) {
      this.setStatus(404);
      throw new Error("House not found");
    }
    const bookings = (house as any).bookings || [];
    const b = bookings.find((bk: any) => String(bk.id) === String(bookingId));
    if (!b) {
      this.setStatus(404);
      throw new Error("Booking not found");
    }
    b.status = "confirmed";
    return { success: true };
  }

  /**
   * Manager: Reject a booking
   */
  @Post("{id}/bookings/{bookingId}/reject")
  @SuccessResponse("200", "Rejected")
  @Response("404", "Not Found")
  public async rejectBooking(
    @Path() id: string,
    @Path() bookingId: string
  ): Promise<{ success: boolean }> {
    const house = houses.find((h) => String(h.id) === String(id));
    if (!house) {
      this.setStatus(404);
      throw new Error("House not found");
    }
    const bookings = (house as any).bookings || [];
    const b = bookings.find((bk: any) => String(bk.id) === String(bookingId));
    if (!b) {
      this.setStatus(404);
      throw new Error("Booking not found");
    }
    b.status = "rejected";
    return { success: true };
  }
}
