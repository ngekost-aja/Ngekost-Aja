export interface CreateMessageRequest {
	senderId: number;
	receiverId: number;
	message: string;
}

export interface MessageResponse {
	id: number;
	senderId: number;
	receiverId: number;
	message: string;
	isRead: boolean;
	createdAt: Date;
}

export interface MessageListRequest {
	senderId?: number;
	receiverId?: number;
	conversationWith?: number;
	unreadOnly?: boolean;
	page?: number;
	limit?: number;
}

export interface ConversationSummary {
	participantId: number;
	lastMessage: MessageResponse;
	unreadCount: number;
}
