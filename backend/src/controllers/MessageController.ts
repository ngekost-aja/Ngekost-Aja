import messages from "@/repositories/messages";
import Message from "@/models/Message";
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
	Query,
} from "tsoa";

@Route("messages")
@Tags("Message")
export class MessageController extends Controller {
	/**
	 * List messages with optional filters
	 * Example: GET /messages?senderId=1&receiverId=2&unreadOnly=true&page=1&limit=20
	 */
	@Get("/")
	@SuccessResponse("200", "OK")
	@Response("400", "Bad Request")
	public async list(
		@Query() senderId?: number,
		@Query() receiverId?: number,
		@Query() conversationWith?: number, // get conversation between senderId (or user) and this participant
		@Query() unreadOnly?: boolean,
		@Query() page: number = 1,
		@Query() limit: number = 50
	): Promise<Message[]> {
		let result = messages.slice();

		if (senderId != null) {
			result = result.filter((m) => Number(m.senderId) === Number(senderId));
		}

		if (receiverId != null) {
			result = result.filter(
				(m) => Number(m.receiverId) === Number(receiverId)
			);
		}

		if (conversationWith != null) {
			// conversation between either pair (A->B or B->A)
			result = result.filter(
				(m) =>
					(Number(m.senderId) === Number(conversationWith) &&
						(senderId == null || Number(m.receiverId) === Number(senderId))) ||
					(Number(m.receiverId) === Number(conversationWith) &&
						(senderId == null || Number(m.senderId) === Number(senderId)))
			);
		}

		if (unreadOnly) {
			result = result.filter((m) => m.isRead === false);
		}

		// sort by sentAt ascending (older first). Reverse for newest first if desired.
		result.sort(
			(a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
		);

		const start = (page - 1) * limit;
		return result.slice(start, start + limit);
	}

	/**
	 * Get single message by id
	 */
	@Get("{id}")
	@SuccessResponse("200", "OK")
	@Response("404", "Not Found")
	public async getById(@Path() id: number): Promise<Message> {
		const m = messages.find((x) => Number(x.id) === Number(id));
		if (!m) {
			this.setStatus(404);
			throw new Error("Message not found");
		}
		return m;
	}

	/**
	 * Send a message (student <-> manager)
	 * Body: { senderId, receiverId, messageText, sentAt? }
	 */
	@Post("/")
	@SuccessResponse("201", "Created")
	@Response("400", "Bad Request")
	public async create(
		@Body()
		payload: {
			senderId: number;
			receiverId: number;
			messageText: string;
			sentAt?: string;
		}
	): Promise<Message> {
		if (
			!payload ||
			payload.senderId == null ||
			payload.receiverId == null ||
			!payload.messageText ||
			String(payload.messageText).trim() === ""
		) {
			this.setStatus(400);
			throw new Error("senderId, receiverId and messageText are required");
		}

		const nextId = messages.length
			? Math.max(...messages.map((m) => m.id)) + 1
			: 1;
		const now = payload.sentAt
			? new Date(payload.sentAt).toISOString()
			: new Date().toISOString();

		const newMessage: Message = {
			id: nextId,
			senderId: Number(payload.senderId),
			receiverId: Number(payload.receiverId),
			messageText: String(payload.messageText),
			sentAt: now,
			isRead: false,
		};

		messages.push(newMessage);
		this.setStatus(201);
		return newMessage;
	}

	/**
	 * Mark a message as read
	 */
	@Post("{id}/read")
	@SuccessResponse("200", "OK")
	@Response("404", "Not Found")
	public async markAsRead(
		@Path() id: number
	): Promise<{ success: boolean; message?: Message }> {
		const idx = messages.findIndex((m) => Number(m.id) === Number(id));
		if (idx === -1) {
			this.setStatus(404);
			throw new Error("Message not found");
		}
		const m = messages[idx];
		if (!m.isRead) {
			m.isRead = true;
			messages[idx] = m;
		}
		return { success: true, message: m };
	}

	/**
	 * Delete a message (soft deletion not implemented; this removes the entry)
	 */
	@Post("{id}/delete")
	@SuccessResponse("200", "Deleted")
	@Response("404", "Not Found")
	public async remove(@Path() id: number): Promise<{ success: boolean }> {
		const idx = messages.findIndex((m) => Number(m.id) === Number(id));
		if (idx === -1) {
			this.setStatus(404);
			throw new Error("Message not found");
		}
		messages.splice(idx, 1);
		return { success: true };
	}

	/**
	 * List conversation summaries for a given user
	 * Example: GET /messages/conversations?userId=2
	 * Returns: [{ participantId, lastMessage, unreadCount }]
	 */
	@Get("conversations")
	@SuccessResponse("200", "OK")
	@Response("400", "Bad Request")
	public async conversations(@Query() userId?: number): Promise<
		{
			participantId: number;
			lastMessage: Message;
			unreadCount: number;
		}[]
	> {
		if (userId == null) {
			this.setStatus(400);
			throw new Error("userId is required");
		}

		// gather conversations where user is sender or receiver
		const convMap = new Map<
			number,
			{ lastMessage: Message | null; unreadCount: number }
		>();

		for (const m of messages) {
			if (
				Number(m.senderId) !== Number(userId) &&
				Number(m.receiverId) !== Number(userId)
			) {
				continue;
			}
			const other =
				Number(m.senderId) === Number(userId)
					? Number(m.receiverId)
					: Number(m.senderId);
			const existing = convMap.get(other) || {
				lastMessage: null,
				unreadCount: 0,
			};

			// update lastMessage if newer
			if (
				!existing.lastMessage ||
				new Date(m.sentAt) > new Date(existing.lastMessage.sentAt)
			) {
				existing.lastMessage = m;
			}

			// if message is to user and unread, increment
			if (Number(m.receiverId) === Number(userId) && !m.isRead) {
				existing.unreadCount += 1;
			}

			convMap.set(other, existing);
		}

		const result = Array.from(convMap.entries()).map(
			([participantId, info]) => ({
				participantId,
				lastMessage: info.lastMessage as Message,
				unreadCount: info.unreadCount,
			})
		);

		// sort by most recent conversation
		result.sort(
			(a, b) =>
				new Date(b.lastMessage.sentAt).getTime() -
				new Date(a.lastMessage.sentAt).getTime()
		);

		return result;
	}
}
