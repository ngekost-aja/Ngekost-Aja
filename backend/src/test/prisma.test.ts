import { prisma } from '@/lib/prisma'

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice2',
      email: 'alice2@prisma.io',
			phone: '12345678901',
			role: 'owner',
			passwordHash: 'passwordHash12345',
    },
  })
  console.log('Created user:', user)

  // Fetch all users with their owned properties
  const allUsers = await prisma.user.findMany({
    include: {
      ownedProperties: true,
    },
  })
  console.log('All users:', JSON.stringify(allUsers, null, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })