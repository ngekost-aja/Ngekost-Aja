export interface CreatePaymentRequest {
	bookingId: number;
	amount: number;
	paymentMethod: string;
}

export interface UpdatePaymentRequest {
	status?: 'pending' | 'paid' | 'failed';
	paidAt?: string;
}

export interface PaymentResponse {
	id: number;
	bookingId: number;
	amount: number;
	paymentMethod: string;
	status: string;
	paidAt: Date | null;
}

export interface PaymentListRequest {
	bookingId?: number;
	status?: 'pending' | 'paid' | 'failed';
	paymentMethod?: string;
	page?: number;
	limit?: number;
}

export interface CreateActivityLogRequest {
	userId: number;
	action: string;
	entityType: string;
	entityId: number;
}

export interface ActivityLogResponse {
	id: number;
	userId: number;
	action: string;
	entityType: string;
	entityId: number;
	createdAt: Date;
}

export interface ActivityLogListRequest {
	userId?: number;
	entityType?: string;
	entityId?: number;
	page?: number;
	limit?: number;
}
