import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler.js";
import isLibrarian from "../middleware/isLibrarian.js";
import isAdmin from "../middleware/isAdmin.js";
import addNewBook from "../controllers/book/addNewBook.js";
import getBooksList from "../controllers/book/getBooksList.js";
import getBook from "../controllers/book/getSpecificBook.js";
import updateBookInfo from "../controllers/book/updateBookInfo.js";
import upload from '../services/upload/multer.js';
import uploadBookImage from "../controllers/book/uploadBookImage.js";

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

bookRouter.get('/test', (req, res) => {
  res.send('Books router is working!');
});


// Public routes
bookRouter.get('/all', errorHandler(getBooksList));
bookRouter.get('/:id', errorHandler(getBook));

export default bookRouter;