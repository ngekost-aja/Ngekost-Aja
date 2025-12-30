export interface CreateBookingRequest {
	studentId: number;
	roomId: number;
	startDate: string; // ISO date string
	endDate: string; // ISO date string
}

export interface UpdateBookingRequest {
	startDate?: string;
	endDate?: string;
	status?: 'pending' | 'approved' | 'rejected' | 'cancelled';
}

export interface BookingResponse {
	id: number;
	studentId: number;
	roomId: number;
	startDate: Date;
	endDate: Date;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface BookingListRequest {
	studentId?: number;
	roomId?: number;
	propertyId?: number;
	status?: 'pending' | 'approved' | 'rejected' | 'cancelled';
	page?: number;
	limit?: number;
}
