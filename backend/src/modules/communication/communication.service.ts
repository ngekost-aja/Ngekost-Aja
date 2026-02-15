import { CommunicationRepository } from "./communication.repository";
import type {
	CreateMessageRequest,
	MessageResponse,
	MessageListRequest,
	ConversationSummary,
} from "./communication.dto";

export class CommunicationService {
	private repository: CommunicationRepository;

	constructor() {
		this.repository = new CommunicationRepository();
	}

	/**
	 * List messages with filters
	 */
	async listMessages(filters: MessageListRequest): Promise<MessageResponse[]> {
		const {
			senderId,
			receiverId,
			conversationWith,
			unreadOnly,
			page = 1,
			limit = 50,
		} = filters;

		const where: any = {};

		if (senderId) where.senderId = senderId;
		if (receiverId) where.receiverId = receiverId;

		if (conversationWith && senderId) {
			// Get conversation between senderId and conversationWith
			where.OR = [
				{ senderId: senderId, receiverId: conversationWith },
				{ senderId: conversationWith, receiverId: senderId },
			];
			delete where.senderId;
			delete where.receiverId;
		}

		if (unreadOnly) where.isRead = false;

		return await this.repository.findMessages(where, (page - 1) * limit, limit);
	}

	/**
	 * Get message by ID
	 */
	async getMessageById(id: number): Promise<MessageResponse> {
		const message = await this.repository.findById(id);
		if (!message) throw new Error("Message not found");
		return message;
	}

	/**
	 * Send a message
	 */
	async createMessage(data: CreateMessageRequest): Promise<MessageResponse> {
		return await this.repository.create({
			senderId: data.senderId,
			receiverId: data.receiverId,
			message: data.message,
			isRead: false,
		});
	}

	/**
	 * Mark message as read
	 */
	async markAsRead(id: number): Promise<MessageResponse> {
		const message = await this.repository.findById(id);
		if (!message) throw new Error("Message not found");

		return await this.repository.update(id, { isRead: true });
	}

	/**
	 * Delete message
	 */
	async deleteMessage(id: number): Promise<void> {
		const message = await this.repository.findById(id);
		if (!message) throw new Error("Message not found");
		await this.repository.delete(id);
	}

	/**
	 * Get conversation summaries for a user
	 */
	async getConversations(userId: number): Promise<ConversationSummary[]> {
		// Get all messages where user is sender or receiver
		const messages = await this.repository.findByUserId(userId);

		// Group by conversation partner
		const conversationMap = new Map<number, ConversationSummary>();

		for (const msg of messages) {
			const partnerId = msg.senderId === userId ? msg.receiverId : msg.senderId;

			if (!conversationMap.has(partnerId)) {
				// Count unread messages from this partner
				const unreadCount = await this.repository.countUnreadMessages(
					partnerId,
					userId
				);

				conversationMap.set(partnerId, {
					participantId: partnerId,
					lastMessage: msg,
					unreadCount,
				});
			}
		}

		return Array.from(conversationMap.values());
	}
}
