import { prisma } from "@/lib/prisma";
import type { User, Prisma } from "@/generated/prisma/client";

export class IdentityRepository {
	/**
	 * Find user by email
	 */
	async findByEmail(email: string): Promise<User | null> {
		return await prisma.user.findUnique({
			where: { email },
		});
	}

	/**
	 * Find user by ID
	 */
	async findById(id: number): Promise<User | null> {
		return await prisma.user.findUnique({
			where: { id },
		});
	}

	/**
	 * Find user by email or phone
	 */
	async findByEmailOrPhone(email: string, phone: string): Promise<User | null> {
		return await prisma.user.findFirst({
			where: {
				OR: [{ email }, { phone }],
			},
		});
	}

	/**
	 * Find users by email or phone excluding a specific ID
	 */
	async findByEmailOrPhoneExcludingId(
		email: string | undefined,
		phone: string | undefined,
		excludeId: number
	): Promise<User | null> {
		if (!email && !phone) return null;

		const orConditions: any[] = [];
		if (email) orConditions.push({ email });
		if (phone) orConditions.push({ phone });

		return await prisma.user.findFirst({
			where: {
				AND: [{ id: { not: excludeId } }, { OR: orConditions }],
			},
		});
	}

	/**
	 * Get all users
	 */
	async findAll(): Promise<User[]> {
		return await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				role: true,
				createdAt: true,
				updatedAt: true,
				passwordHash: false,
			},
		}) as User[];
	}

	/**
	 * Create a new user
	 */
	async create(data: {
		name: string;
		email: string;
		phone: string;
		role: string;
		passwordHash: string;
	}): Promise<User> {
		return await prisma.user.create({
			data: data as any,
		});
	}

	/**
	 * Update user
	 */
	async update(id: number, data: {
		name?: string;
		email?: string;
		phone?: string;
		role?: string;
		passwordHash?: string;
	}): Promise<User> {
		return await prisma.user.update({
			where: { id },
			data: data as any,
		});
	}

	/**
	 * Delete user
	 */
	async delete(id: number): Promise<void> {
		await prisma.user.delete({
			where: { id },
		});
	}
}
