import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler.js";
import isLibrarian from "../middleware/isLibrarian.js";
import isAdmin from "../middleware/isAdmin.js";
import addNewBook from "../controllers/book/addNewBook.js";
import getBooksList from "../controllers/book/getBooksList.js";
import searchBooks from "../controllers/book/searchBooks.js";
import getBook from "../controllers/book/getSpecificBook.js";
import updateBookInfo from "../controllers/book/updateBookInfo.js";
import upload from '../services/upload/multer.js';
import uploadBookImage from "../controllers/book/uploadBookImage.js";
import userRouter from "./userRouter.js";

const bookRouter = Router();

// Combined middleware for both Admin and Librarian
const isAdminOrLibrarian = [errorHandler(isLibrarian), errorHandler(isAdmin)];

// Routes accessible to both Admin and Librarian
bookRouter.post('/', 
  errorHandler(async (req, res, next) => {
    await Promise.all([isLibrarian(req, res, () => {}), isAdmin(req, res, () => {})]);
    next();
  }), 
  errorHandler(addNewBook)
);

bookRouter.post('/image/:id', 
  upload.single("image"),
  errorHandler(async (req, res, next) => {
    await Promise.all([isLibrarian(req, res, () => {}), isAdmin(req, res, () => {})]);
    next();
  }),
  errorHandler(uploadBookImage)
);

bookRouter.put('/:id',
  errorHandler(async (req, res, next) => {
    await Promise.all([isLibrarian(req, res, () => {}), isAdmin(req, res, () => {})]);
    next();
  }),
  errorHandler(updateBookInfo)
);

// Public routes
bookRouter.get('/all', errorHandler(getBooksList));
// Public endpoint for latest books
userRouter.get('/books/latest', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' }, // Assuming a createdAt field; adjust if different
      take: limit,
      select: {
        id: true,
        title: true,
        authors: true,
        status: true,
        category: true,
        language: true,
        imageUrl: true
      }
    });
    res.json({ ok: true, data: books });
  } catch (error) {
    next(new HttpExeception("Failed to fetch latest books", 500, Exceptions.INTERNAL_ERROR));
  }
});
bookRouter.get('/search', errorHandler(searchBooks));
bookRouter.get('/:id', errorHandler(getBook));

export default bookRouter;