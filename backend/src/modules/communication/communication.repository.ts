import { prisma } from "@/lib/prisma";
import type { Message, Prisma } from "@/generated/prisma/client";

export class CommunicationRepository {
	/**
	 * Find messages with filters
	 */
	async findMessages(where: Prisma.MessageWhereInput, skip: number, take: number): Promise<Message[]> {
		return await prisma.message.findMany({
			where,
			skip,
			take,
			orderBy: {
				createdAt: 'asc',
			},
		});
	}

	/**
	 * Find message by ID
	 */
	async findById(id: number): Promise<Message | null> {
		return await prisma.message.findUnique({
			where: { id },
		});
	}

	/**
	 * Find messages where user is sender or receiver
	 */
	async findByUserId(userId: number): Promise<Message[]> {
		return await prisma.message.findMany({
			where: {
				OR: [{ senderId: userId }, { receiverId: userId }],
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	/**
	 * Count unread messages from a specific sender to a receiver
	 */
	async countUnreadMessages(senderId: number, receiverId: number): Promise<number> {
		return await prisma.message.count({
			where: {
				senderId,
				receiverId,
				isRead: false,
			},
		});
	}

	/**
	 * Create message
	 */
	async create(data: {
		senderId: number;
		receiverId: number;
		message: string;
		isRead?: boolean;
	}): Promise<Message> {
		return await prisma.message.create({
			data: {
				senderId: data.senderId,
				receiverId: data.receiverId,
				message: data.message,
				isRead: data.isRead ?? false,
			},
		});
	}

	/**
	 * Update message
	 */
	async update(id: number, data: {
		isRead?: boolean;
		message?: string;
	}): Promise<Message> {
		return await prisma.message.update({
			where: { id },
			data,
		});
	}

	/**
	 * Delete message
	 */
	async delete(id: number): Promise<void> {
		await prisma.message.delete({
			where: { id },
		});
	}
}
