import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const hashedPassword = await bcrypt.hash('Test@1234', 10);

  // Seed Users (with data matching your registration form)
  const users = await prisma.user.createMany({
    data: [
      {
        firstName: 'Mohamed',
        familyName: 'Benzema',
        studentId: '202012345678',
        faculty: 'ST',
        academicYear: '3',
        major: 'Computer Science',
        email: 'mohamed.benzema@univ.edu',
        phone: '+213551234567',
        password: hashedPassword,
        role: 'STUDENT',
        isVerified: true,
        idCardUrl: '/uploads/id_cards/mohamed.jpg',
        idProfilePic: '/uploads/profiles/mohamed.jpg'
      },
      {
        firstName: 'Amina',
        familyName: 'Kadour',
        studentId: '202112345678',
        faculty: 'HSS',
        academicYear: '2',
        major: 'Psychology',
        email: 'amina.kadour@univ.edu',
        phone: '+213661234567',
        password: hashedPassword,
        role: 'STUDENT',
        isVerified: true,
        idCardUrl: '/uploads/id_cards/amina.jpg'
      },
      {
        firstName: 'Karim',
        familyName: 'Bouziane',
        studentId: 'LIB2023001',
        faculty: 'Central Library',
        academicYear: 'NA',
        major: 'Library Science',
        email: 'karim.bouziane@univ.edu',
        phone: '+213771234567',
        password: hashedPassword,
        role: 'LIBRARIAN',
        isVerified: true
      },
      {
        firstName: 'Fatima',
        familyName: 'Zohra',
        studentId: 'ADM2023001',
        faculty: 'Administration',
        academicYear: 'NA',
        major: 'Management',
        email: 'fatima.zohra@univ.edu',
        phone: '+213791234567',
        password: hashedPassword,
        role: 'ADMIN',
        isVerified: true,
        idProfilePic: '/uploads/profiles/fatima.jpg'
      },
      {
        firstName: 'Yacine',
        familyName: 'Brahimi',
        studentId: '202212345678',
        faculty: 'ECMS',
        academicYear: '1',
        major: 'Economics',
        email: 'yacine.brahimi@univ.edu',
        phone: '+213501234567',
        password: hashedPassword,
        role: 'STUDENT',
        isVerified: false
      }
    ],
    skipDuplicates: true
  });

  // Seed Books (with realistic academic books)
  const books = await prisma.book.createMany({
    data: [
      {
        isbn: '9780132350884',
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        edition: '1st',
        publisher: 'Prentice Hall',
        publicationYear: 2008,
        pageCount: 464,
        language: 'English',
        coverUrl: '/uploads/covers/clean_code.jpg',
        digitalCopyUrl: '/uploads/books/clean_code.pdf',
        keywords: ['programming', 'software engineering', 'best practices'],
        authors: ['Robert C. Martin'],
        status: 'AVAILABLE'
      },
      {
        isbn: '9780321125217',
        title: 'Domain-Driven Design: Tackling Complexity in the Heart of Software',
        edition: '1st',
        publisher: 'Addison-Wesley',
        publicationYear: 2003,
        pageCount: 560,
        language: 'English',
        coverUrl: '/uploads/covers/ddd.jpg',
        digitalCopyUrl: '/uploads/books/ddd.pdf',
        keywords: ['software design', 'architecture', 'domain modeling'],
        authors: ['Eric Evans'],
        status: 'CHECKED_OUT'
      },
      {
        isbn: '9780201633610',
        title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
        edition: '1st',
        publisher: 'Addison-Wesley',
        publicationYear: 1994,
        pageCount: 395,
        language: 'English',
        digitalCopyUrl: '/uploads/books/design_patterns.pdf',
        keywords: ['design patterns', 'object-oriented', 'software engineering'],
        authors: ['Erich Gamma', 'Richard Helm', 'Ralph Johnson', 'John Vlissides'],
        status: 'RESERVED'
      },
      {
        isbn: '9780262033848',
        title: 'Introduction to Algorithms',
        edition: '3rd',
        publisher: 'MIT Press',
        publicationYear: 2009,
        pageCount: 1312,
        language: 'English',
        coverUrl: '/uploads/covers/algorithms.jpg',
        digitalCopyUrl: '/uploads/books/algorithms.pdf',
        keywords: ['algorithms', 'computer science', 'mathematics'],
        authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'],
        status: 'AVAILABLE'
      },
      {
        isbn: '9780321573513',
        title: 'Patterns of Enterprise Application Architecture',
        edition: '1st',
        publisher: 'Addison-Wesley',
        publicationYear: 2002,
        pageCount: 533,
        language: 'English',
        digitalCopyUrl: '/uploads/books/peaa.pdf',
        keywords: ['architecture', 'enterprise', 'design patterns'],
        authors: ['Martin Fowler'],
        status: 'UNDER_MAINTENANCE'
      }
    ],
    skipDuplicates: true
  });

  // Get created users and books for relationships
  const createdUsers = await prisma.user.findMany();
  const createdBooks = await prisma.book.findMany();

  // Seed Reservations
  const reservations = await prisma.reservation.createMany({
    data: [
      {
        userId: createdUsers[0].id,
        bookId: createdBooks[1].id,
        startDate: new Date('2023-06-01'),
        returnDate: new Date('2023-06-15'),
        status: 'APPROVED'
      },
      {
        userId: createdUsers[1].id,
        bookId: createdBooks[2].id,
        startDate: new Date('2023-06-05'),
        returnDate: new Date('2023-06-19'),
        status: 'PENDING'
      },
      {
        userId: createdUsers[0].id,
        bookId: createdBooks[3].id,
        startDate: new Date('2023-05-20'),
        returnDate: new Date('2023-06-03'),
        status: 'OVERDUE'
      },
      {
        userId: createdUsers[3].id,
        bookId: createdBooks[0].id,
        startDate: new Date('2023-05-15'),
        returnDate: new Date('2023-05-29'),
        status: 'RETURNED'
      },
      {
        userId: createdUsers[2].id,
        bookId: createdBooks[4].id,
        startDate: new Date('2023-06-10'),
        returnDate: new Date('2023-06-24'),
        status: 'CANCELED'
      }
    ],
    skipDuplicates: true
  });

  // Get created reservations for fines
  const createdReservations = await prisma.reservation.findMany();

  // Seed Fines
  const fines = await prisma.fine.createMany({
    data: [
      {
        userId: createdUsers[0].id,
        reservationId: createdReservations[2].id,
        amount: 15.50,
        paid: false
      },
      {
        userId: createdUsers[3].id,
        reservationId: createdReservations[3].id,
        amount: 5.00,
        paid: true
      },
      {
        userId: createdUsers[1].id,
        reservationId: createdReservations[1].id,
        amount: 0.00,
        paid: false
      },
      {
        userId: createdUsers[0].id,
        reservationId: createdReservations[0].id,
        amount: 2.50,
        paid: true
      },
      {
        userId: createdUsers[2].id,
        reservationId: createdReservations[4].id,
        amount: 10.00,
        paid: false
      }
    ],
    skipDuplicates: true
  });

  console.log('Database seeded successfully!');
  console.log(`Created ${users.count} users`);
  console.log(`Created ${books.count} books`);
  console.log(`Created ${reservations.count} reservations`);
  console.log(`Created ${fines.count} fines`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });