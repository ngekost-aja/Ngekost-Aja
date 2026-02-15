import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Query,
	Response,
	Route,
	SuccessResponse,
	Tags,
} from "tsoa";
import { CommunicationService } from "./communication.service";
import type {
	CreateMessageRequest,
	MessageResponse,
	MessageListRequest,
	ConversationSummary,
} from "./communication.dto";

@Route("messages")
@Tags("Message")
export class MessageController extends Controller {
	private communicationService: CommunicationService;

	constructor() {
		super();
		this.communicationService = new CommunicationService();
	}

	/**
	 * List messages with filters
	 */
	@Get("/")
	@SuccessResponse("200", "OK")
	public async list(
		@Query() senderId?: number,
		@Query() receiverId?: number,
		@Query() conversationWith?: number,
		@Query() unreadOnly?: boolean,
		@Query() page: number = 1,
		@Query() limit: number = 50
	): Promise<MessageResponse[]> {
		const filters: MessageListRequest = {
			senderId,
			receiverId,
			conversationWith,
			unreadOnly,
			page,
			limit,
		};
		return await this.communicationService.listMessages(filters);
	}

	/**
	 * Get message by ID
	 */
	@Get("{id}")
	@SuccessResponse("200", "OK")
	@Response("404", "Not Found")
	public async getById(@Path() id: number): Promise<MessageResponse> {
		try {
			return await this.communicationService.getMessageById(id);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Message not found");
		}
	}

	/**
	 * Send a message
	 */
	@Post("/")
	@SuccessResponse("201", "Created")
	@Response("400", "Bad Request")
	public async create(
		@Body() body: CreateMessageRequest
	): Promise<MessageResponse> {
		try {
			const result = await this.communicationService.createMessage(body);
			this.setStatus(201);
			return result;
		} catch (error: any) {
			this.setStatus(400);
			throw new Error(error.message || "Failed to send message");
		}
	}

	/**
	 * Mark message as read
	 */
	@Post("{id}/read")
	@SuccessResponse("200", "OK")
	@Response("404", "Not Found")
	public async markAsRead(@Path() id: number): Promise<MessageResponse> {
		try {
			return await this.communicationService.markAsRead(id);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Message not found");
		}
	}

	/**
	 * Delete message
	 */
	@Delete("{id}")
	@SuccessResponse("200", "Deleted")
	@Response("404", "Not Found")
	public async remove(@Path() id: number): Promise<{ success: boolean }> {
		try {
			await this.communicationService.deleteMessage(id);
			return { success: true };
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Message not found");
		}
	}

	/**
	 * Get conversation summaries for a user
	 */
	@Get("conversations/{userId}")
	@SuccessResponse("200", "OK")
	public async getConversations(
		@Path() userId: number
	): Promise<ConversationSummary[]> {
		return await this.communicationService.getConversations(userId);
	}
}
