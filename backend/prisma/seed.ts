import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (in reverse order of dependencies)
  console.log('🗑️  Clearing existing data...');
  await prisma.activityLog.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.message.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.propertyFacility.deleteMany();
  await prisma.room.deleteMany();
  await prisma.property.deleteMany();
  await prisma.facility.deleteMany();
  await prisma.user.deleteMany();
  await prisma.address.deleteMany();
  await prisma.village.deleteMany();
  await prisma.district.deleteMany();
  await prisma.city.deleteMany();
  await prisma.province.deleteMany();

  // ===========================
  // SEED REFERENCE DATA
  // ===========================
  console.log('📍 Seeding provinces, cities, districts, and villages...');

  // Provinces
  const provinces = await prisma.province.createMany({
    data: [
      { code: '31', name: 'DKI Jakarta' },
      { code: '32', name: 'Jawa Barat' },
      { code: '33', name: 'Jawa Tengah' },
      { code: '34', name: 'DI Yogyakarta' },
      { code: '35', name: 'Jawa Timur' },
    ],
  });

  const jakarta = await prisma.province.findFirst({ where: { code: '31' } });
  const jawaBarat = await prisma.province.findFirst({ where: { code: '32' } });
  const yogyakarta = await prisma.province.findFirst({ where: { code: '34' } });

  // Cities
  const jakartaSelatan = await prisma.city.create({
    data: {
      provinceId: jakarta!.id,
      name: 'Jakarta Selatan',
      type: 'kota',
    },
  });

  const bandung = await prisma.city.create({
    data: {
      provinceId: jawaBarat!.id,
      name: 'Bandung',
      type: 'kota',
    },
  });

  const sleman = await prisma.city.create({
    data: {
      provinceId: yogyakarta!.id,
      name: 'Sleman',
      type: 'kabupaten',
    },
  });

  // Districts
  const kebayoranBaru = await prisma.district.create({
    data: {
      cityId: jakartaSelatan.id,
      name: 'Kebayoran Baru',
    },
  });

  const coblong = await prisma.district.create({
    data: {
      cityId: bandung.id,
      name: 'Coblong',
    },
  });

  const depok = await prisma.district.create({
    data: {
      cityId: sleman.id,
      name: 'Depok',
    },
  });

  // Villages
  const senayan = await prisma.village.create({
    data: {
      districtId: kebayoranBaru.id,
      name: 'Senayan',
    },
  });

  const dago = await prisma.village.create({
    data: {
      districtId: coblong.id,
      name: 'Dago',
    },
  });

  const condongCatur = await prisma.village.create({
    data: {
      districtId: depok.id,
      name: 'Condongcatur',
    },
  });

  // Addresses
  const address1 = await prisma.address.create({
    data: {
      villageId: senayan.id,
      street: 'Jl. Senayan No. 12',
      postalCode: '12190',
      latitude: -6.2251,
      longitude: 106.7995,
    },
  });

  const address2 = await prisma.address.create({
    data: {
      villageId: dago.id,
      street: 'Jl. Dago No. 45',
      postalCode: '40135',
      latitude: -6.8701,
      longitude: 107.6127,
    },
  });

  const address3 = await prisma.address.create({
    data: {
      villageId: condongCatur.id,
      street: 'Jl. Affandi No. 88',
      postalCode: '55281',
      latitude: -7.7745,
      longitude: 110.4053,
    },
  });

  const address4 = await prisma.address.create({
    data: {
      villageId: condongCatur.id,
      street: 'Jl. Kaliurang KM 5',
      postalCode: '55281',
      latitude: -7.7698,
      longitude: 110.4012,
    },
  });

  // ===========================
  // SEED USERS
  // ===========================
  console.log('👥 Seeding users...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const owner1 = await prisma.user.create({
    data: {
      name: 'Budi Santoso',
      email: 'budi.santoso@example.com',
      phone: '081234567890',
      role: 'owner',
      passwordHash: hashedPassword,
    },
  });

  const owner2 = await prisma.user.create({
    data: {
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@example.com',
      phone: '081234567891',
      role: 'owner',
      passwordHash: hashedPassword,
    },
  });

  const manager1 = await prisma.user.create({
    data: {
      name: 'Ahmad Wijaya',
      email: 'ahmad.wijaya@example.com',
      phone: '081234567892',
      role: 'manager',
      passwordHash: hashedPassword,
    },
  });

  const manager2 = await prisma.user.create({
    data: {
      name: 'Dewi Lestari',
      email: 'dewi.lestari@example.com',
      phone: '081234567893',
      role: 'manager',
      passwordHash: hashedPassword,
    },
  });

  const student1 = await prisma.user.create({
    data: {
      name: 'Andi Pratama',
      email: 'andi.pratama@student.com',
      phone: '081234567894',
      role: 'user',
      passwordHash: hashedPassword,
    },
  });

  const student2 = await prisma.user.create({
    data: {
      name: 'Rina Kusuma',
      email: 'rina.kusuma@student.com',
      phone: '081234567895',
      role: 'user',
      passwordHash: hashedPassword,
    },
  });

  const student3 = await prisma.user.create({
    data: {
      name: 'Fajar Ramadhan',
      email: 'fajar.ramadhan@student.com',
      phone: '081234567896',
      role: 'user',
      passwordHash: hashedPassword,
    },
  });

  const student4 = await prisma.user.create({
    data: {
      name: 'Lisa Anggraini',
      email: 'lisa.anggraini@student.com',
      phone: '081234567897',
      role: 'user',
      passwordHash: hashedPassword,
    },
  });

  // ===========================
  // SEED FACILITIES
  // ===========================
  console.log('🏠 Seeding facilities...');

  const wifi = await prisma.facility.create({ data: { name: 'WiFi' } });
  const ac = await prisma.facility.create({ data: { name: 'AC' } });
  const kasur = await prisma.facility.create({ data: { name: 'Kasur' } });
  const lemari = await prisma.facility.create({ data: { name: 'Lemari' } });
  const mejaBelajar = await prisma.facility.create({
    data: { name: 'Meja Belajar' },
  });
  const kamarMandi = await prisma.facility.create({
    data: { name: 'Kamar Mandi Dalam' },
  });
  const dapur = await prisma.facility.create({
    data: { name: 'Dapur Bersama' },
  });
  const laundry = await prisma.facility.create({ data: { name: 'Laundry' } });
  const parkir = await prisma.facility.create({
    data: { name: 'Parkir Motor' },
  });
  const keamanan = await prisma.facility.create({
    data: { name: 'Keamanan 24 Jam' },
  });

  // ===========================
  // SEED PROPERTIES
  // ===========================
  console.log('🏢 Seeding properties...');

  const property1 = await prisma.property.create({
    data: {
      ownerId: owner1.id,
      managerId: manager1.id,
      addressId: address1.id,
      name: 'Kost Senayan Residence',
      latitude: -6.2251,
      longitude: 106.7995,
      genderType: 'mixed',
      status: 'active',
    },
  });

  const property2 = await prisma.property.create({
    data: {
      ownerId: owner1.id,
      managerId: manager1.id,
      addressId: address2.id,
      name: 'Kost Dago Premium',
      latitude: -6.8701,
      longitude: 107.6127,
      genderType: 'male',
      status: 'active',
    },
  });

  const property3 = await prisma.property.create({
    data: {
      ownerId: owner2.id,
      managerId: manager2.id,
      addressId: address3.id,
      name: 'Kost Affandi Putri',
      latitude: -7.7745,
      longitude: 110.4053,
      genderType: 'female',
      status: 'active',
    },
  });

  const property4 = await prisma.property.create({
    data: {
      ownerId: owner2.id,
      addressId: address4.id,
      name: 'Kost Kaliurang',
      latitude: -7.7698,
      longitude: 110.4012,
      genderType: 'mixed',
      status: 'active',
    },
  });

  // ===========================
  // SEED PROPERTY FACILITIES
  // ===========================
  console.log('🔧 Seeding property facilities...');

  await prisma.propertyFacility.createMany({
    data: [
      // Property 1 - Premium facilities
      { propertyId: property1.id, facilityId: wifi.id },
      { propertyId: property1.id, facilityId: ac.id },
      { propertyId: property1.id, facilityId: kasur.id },
      { propertyId: property1.id, facilityId: lemari.id },
      { propertyId: property1.id, facilityId: mejaBelajar.id },
      { propertyId: property1.id, facilityId: kamarMandi.id },
      { propertyId: property1.id, facilityId: laundry.id },
      { propertyId: property1.id, facilityId: parkir.id },
      { propertyId: property1.id, facilityId: keamanan.id },

      // Property 2 - Standard facilities
      { propertyId: property2.id, facilityId: wifi.id },
      { propertyId: property2.id, facilityId: kasur.id },
      { propertyId: property2.id, facilityId: lemari.id },
      { propertyId: property2.id, facilityId: mejaBelajar.id },
      { propertyId: property2.id, facilityId: dapur.id },
      { propertyId: property2.id, facilityId: parkir.id },
      { propertyId: property2.id, facilityId: keamanan.id },

      // Property 3 - Female only
      { propertyId: property3.id, facilityId: wifi.id },
      { propertyId: property3.id, facilityId: ac.id },
      { propertyId: property3.id, facilityId: kasur.id },
      { propertyId: property3.id, facilityId: lemari.id },
      { propertyId: property3.id, facilityId: mejaBelajar.id },
      { propertyId: property3.id, facilityId: kamarMandi.id },
      { propertyId: property3.id, facilityId: dapur.id },
      { propertyId: property3.id, facilityId: laundry.id },
      { propertyId: property3.id, facilityId: keamanan.id },

      // Property 4 - Basic facilities
      { propertyId: property4.id, facilityId: wifi.id },
      { propertyId: property4.id, facilityId: kasur.id },
      { propertyId: property4.id, facilityId: lemari.id },
      { propertyId: property4.id, facilityId: dapur.id },
      { propertyId: property4.id, facilityId: parkir.id },
    ],
  });

  // ===========================
  // SEED ROOMS
  // ===========================
  console.log('🚪 Seeding rooms...');

  // Property 1 - 8 rooms
  const p1rooms = await prisma.room.createMany({
    data: [
      {
        propertyId: property1.id,
        roomNumber: 'A1',
        price: 2500000,
        status: 'occupied',
      },
      {
        propertyId: property1.id,
        roomNumber: 'A2',
        price: 2500000,
        status: 'available',
      },
      {
        propertyId: property1.id,
        roomNumber: 'A3',
        price: 2500000,
        status: 'available',
      },
      {
        propertyId: property1.id,
        roomNumber: 'B1',
        price: 3000000,
        status: 'occupied',
      },
      {
        propertyId: property1.id,
        roomNumber: 'B2',
        price: 3000000,
        status: 'available',
      },
      {
        propertyId: property1.id,
        roomNumber: 'B3',
        price: 3000000,
        status: 'maintenance',
      },
      {
        propertyId: property1.id,
        roomNumber: 'C1',
        price: 3500000,
        status: 'available',
      },
      {
        propertyId: property1.id,
        roomNumber: 'C2',
        price: 3500000,
        status: 'available',
      },
    ],
  });

  // Property 2 - 6 rooms
  const p2rooms = await prisma.room.createMany({
    data: [
      {
        propertyId: property2.id,
        roomNumber: '101',
        price: 1500000,
        status: 'occupied',
      },
      {
        propertyId: property2.id,
        roomNumber: '102',
        price: 1500000,
        status: 'available',
      },
      {
        propertyId: property2.id,
        roomNumber: '201',
        price: 1800000,
        status: 'available',
      },
      {
        propertyId: property2.id,
        roomNumber: '202',
        price: 1800000,
        status: 'occupied',
      },
      {
        propertyId: property2.id,
        roomNumber: '301',
        price: 2000000,
        status: 'available',
      },
      {
        propertyId: property2.id,
        roomNumber: '302',
        price: 2000000,
        status: 'available',
      },
    ],
  });

  // Property 3 - 5 rooms
  const p3rooms = await prisma.room.createMany({
    data: [
      {
        propertyId: property3.id,
        roomNumber: '1A',
        price: 1200000,
        status: 'occupied',
      },
      {
        propertyId: property3.id,
        roomNumber: '1B',
        price: 1200000,
        status: 'available',
      },
      {
        propertyId: property3.id,
        roomNumber: '2A',
        price: 1400000,
        status: 'available',
      },
      {
        propertyId: property3.id,
        roomNumber: '2B',
        price: 1400000,
        status: 'occupied',
      },
      {
        propertyId: property3.id,
        roomNumber: '3A',
        price: 1600000,
        status: 'available',
      },
    ],
  });

  // Property 4 - 4 rooms
  const p4rooms = await prisma.room.createMany({
    data: [
      {
        propertyId: property4.id,
        roomNumber: 'R1',
        price: 1000000,
        status: 'available',
      },
      {
        propertyId: property4.id,
        roomNumber: 'R2',
        price: 1000000,
        status: 'available',
      },
      {
        propertyId: property4.id,
        roomNumber: 'R3',
        price: 1100000,
        status: 'available',
      },
      {
        propertyId: property4.id,
        roomNumber: 'R4',
        price: 1100000,
        status: 'available',
      },
    ],
  });

  // Get created rooms for bookings
  const room1 = await prisma.room.findFirst({
    where: { propertyId: property1.id, roomNumber: 'A1' },
  });
  const room2 = await prisma.room.findFirst({
    where: { propertyId: property1.id, roomNumber: 'B1' },
  });
  const room3 = await prisma.room.findFirst({
    where: { propertyId: property2.id, roomNumber: '101' },
  });
  const room4 = await prisma.room.findFirst({
    where: { propertyId: property2.id, roomNumber: '202' },
  });
  const room5 = await prisma.room.findFirst({
    where: { propertyId: property3.id, roomNumber: '1A' },
  });
  const room6 = await prisma.room.findFirst({
    where: { propertyId: property3.id, roomNumber: '2B' },
  });

  // ===========================
  // SEED BOOKINGS
  // ===========================
  console.log('📅 Seeding bookings...');

  const booking1 = await prisma.booking.create({
    data: {
      studentId: student1.id,
      roomId: room1!.id,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31'),
      status: 'approved',
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      studentId: student2.id,
      roomId: room2!.id,
      startDate: new Date('2026-02-01'),
      endDate: new Date('2027-01-31'),
      status: 'approved',
    },
  });

  const booking3 = await prisma.booking.create({
    data: {
      studentId: student3.id,
      roomId: room3!.id,
      startDate: new Date('2025-12-01'),
      endDate: new Date('2026-11-30'),
      status: 'approved',
    },
  });

  const booking4 = await prisma.booking.create({
    data: {
      studentId: student4.id,
      roomId: room4!.id,
      startDate: new Date('2026-01-15'),
      endDate: new Date('2027-01-14'),
      status: 'approved',
    },
  });

  const booking5 = await prisma.booking.create({
    data: {
      studentId: student2.id,
      roomId: room5!.id,
      startDate: new Date('2026-03-01'),
      endDate: new Date('2027-02-28'),
      status: 'approved',
    },
  });

  const booking6 = await prisma.booking.create({
    data: {
      studentId: student1.id,
      roomId: room6!.id,
      startDate: new Date('2026-02-15'),
      endDate: new Date('2026-08-14'),
      status: 'pending',
    },
  });

  // ===========================
  // SEED PAYMENTS
  // ===========================
  console.log('💰 Seeding payments...');

  await prisma.payment.createMany({
    data: [
      {
        bookingId: booking1.id,
        amount: 2500000,
        paymentMethod: 'Transfer Bank',
        status: 'paid',
        paidAt: new Date('2026-01-01'),
      },
      {
        bookingId: booking2.id,
        amount: 3000000,
        paymentMethod: 'Transfer Bank',
        status: 'paid',
        paidAt: new Date('2026-02-01'),
      },
      {
        bookingId: booking3.id,
        amount: 1500000,
        paymentMethod: 'E-Wallet',
        status: 'paid',
        paidAt: new Date('2025-12-01'),
      },
      {
        bookingId: booking4.id,
        amount: 1800000,
        paymentMethod: 'Transfer Bank',
        status: 'paid',
        paidAt: new Date('2026-01-15'),
      },
      {
        bookingId: booking5.id,
        amount: 1200000,
        paymentMethod: 'E-Wallet',
        status: 'paid',
        paidAt: new Date('2026-03-01'),
      },
      {
        bookingId: booking6.id,
        amount: 1400000,
        paymentMethod: 'Transfer Bank',
        status: 'pending',
        paidAt: null,
      },
    ],
  });

  // ===========================
  // SEED MESSAGES
  // ===========================
  console.log('💬 Seeding messages...');

  await prisma.message.createMany({
    data: [
      {
        senderId: student1.id,
        receiverId: manager1.id,
        message: 'Halo, saya tertarik dengan kamar A1. Apakah masih tersedia?',
        isRead: true,
        createdAt: new Date('2025-12-15T10:00:00'),
      },
      {
        senderId: manager1.id,
        receiverId: student1.id,
        message:
          'Halo! Ya, kamar A1 masih tersedia. Silakan datang untuk melihat kamarnya.',
        isRead: true,
        createdAt: new Date('2025-12-15T10:30:00'),
      },
      {
        senderId: student2.id,
        receiverId: manager1.id,
        message: 'Apakah ada diskon untuk sewa 1 tahun?',
        isRead: true,
        createdAt: new Date('2025-12-20T14:00:00'),
      },
      {
        senderId: manager1.id,
        receiverId: student2.id,
        message: 'Ada diskon 10% untuk sewa 1 tahun penuh.',
        isRead: false,
        createdAt: new Date('2025-12-20T14:15:00'),
      },
      {
        senderId: student3.id,
        receiverId: manager1.id,
        message: 'Fasilitas apa saja yang tersedia di kost ini?',
        isRead: true,
        createdAt: new Date('2026-01-05T09:00:00'),
      },
      {
        senderId: student4.id,
        receiverId: manager2.id,
        message: 'Apakah bisa bayar bulanan?',
        isRead: false,
        createdAt: new Date('2026-01-10T16:00:00'),
      },
    ],
  });

  // ===========================
  // SEED ACTIVITY LOGS
  // ===========================
  console.log('📝 Seeding activity logs...');

  await prisma.activityLog.createMany({
    data: [
      {
        userId: owner1.id,
        action: 'created',
        entityType: 'Property',
        entityId: property1.id,
        createdAt: new Date('2025-11-01T08:00:00'),
      },
      {
        userId: owner1.id,
        action: 'created',
        entityType: 'Property',
        entityId: property2.id,
        createdAt: new Date('2025-11-05T09:00:00'),
      },
      {
        userId: owner2.id,
        action: 'created',
        entityType: 'Property',
        entityId: property3.id,
        createdAt: new Date('2025-11-10T10:00:00'),
      },
      {
        userId: manager1.id,
        action: 'approved',
        entityType: 'Booking',
        entityId: booking1.id,
        createdAt: new Date('2025-12-28T11:00:00'),
      },
      {
        userId: manager1.id,
        action: 'approved',
        entityType: 'Booking',
        entityId: booking2.id,
        createdAt: new Date('2026-01-30T12:00:00'),
      },
      {
        userId: manager1.id,
        action: 'approved',
        entityType: 'Booking',
        entityId: booking3.id,
        createdAt: new Date('2025-11-28T13:00:00'),
      },
      {
        userId: student1.id,
        action: 'created',
        entityType: 'Booking',
        entityId: booking1.id,
        createdAt: new Date('2025-12-25T14:00:00'),
      },
      {
        userId: student2.id,
        action: 'created',
        entityType: 'Booking',
        entityId: booking2.id,
        createdAt: new Date('2026-01-25T15:00:00'),
      },
      {
        userId: manager1.id,
        action: 'updated',
        entityType: 'Room',
        entityId: room1!.id,
        createdAt: new Date('2026-01-01T16:00:00'),
      },
      {
        userId: manager2.id,
        action: 'updated',
        entityType: 'Room',
        entityId: room5!.id,
        createdAt: new Date('2026-03-01T17:00:00'),
      },
    ],
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Provinces: 5`);
  console.log(`   - Cities: 3`);
  console.log(`   - Districts: 3`);
  console.log(`   - Villages: 3`);
  console.log(`   - Addresses: 4`);
  console.log(`   - Users: 8 (2 owners, 2 managers, 4 students)`);
  console.log(`   - Facilities: 10`);
  console.log(`   - Properties: 4`);
  console.log(`   - Rooms: 23`);
  console.log(`   - Bookings: 6`);
  console.log(`   - Payments: 6`);
  console.log(`   - Messages: 6`);
  console.log(`   - Activity Logs: 10`);
  console.log('\n🔑 Test credentials:');
  console.log('   Email: budi.santoso@example.com (Owner)');
  console.log('   Email: ahmad.wijaya@example.com (Manager)');
  console.log('   Email: andi.pratama@student.com (Student)');
  console.log('   Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
