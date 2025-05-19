import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRouter from './userRouter.js';
import bookRouter from './bookRouter.js';
import reservationRouter from './reservation.js';
import fineRouter from './fineRouter.js';

const prisma = new PrismaClient();
const router = express.Router();

router.use('/users', userRouter);
router.use('/books', bookRouter);
router.use('/reservations', reservationRouter);
router.use('/fines', fineRouter);

export default router;