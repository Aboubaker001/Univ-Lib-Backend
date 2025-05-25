// controllers/book/searchBooks.js
import prisma from "../../services/db/prismaClient.js";

const searchBooks = async (req, res) => {
  const { q, status, language } = req.query;

  const books = await prisma.book.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: 'insensitive' } },
                { authors: { hasSome: [q] } },
                { keywords: { hasSome: [q] } }
              ]
            }
          : {},
        status ? { status: status.toUpperCase() } : {},
        language ? { language: { contains: language, mode: 'insensitive' } } : {}
      ]
    },
    orderBy: { title: 'asc' },
    take: 20
  });

  res.json({ ok: true, books });
};

export default searchBooks;