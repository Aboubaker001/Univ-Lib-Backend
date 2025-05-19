import { Router } from 'express';
import { errorHandler } from '../middleware/errorHandler.js';
import isLibrarian from '../middleware/isLibrarian.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const fineRouter = Router();

console.log('Registering fineRouter.get(/all)');
fineRouter.get('/all', errorHandler(isLibrarian), errorHandler(async (req, res) => {
  const fines = await prisma.fine.findMany({
    include: { user: true, reservation: true },
  });
  res.json({ ok: true, data: fines });
}));

console.log('Registering fineRouter.get(/:id)');
fineRouter.get('/:id', errorHandler(isLibrarian), errorHandler(async (req, res) => {
  const fine = await prisma.fine.findUnique({
    where: { id: req.params.id },
    include: { user: true, reservation: true },
  });
  if (!fine) return res.status(404).json({ ok: false, msg: 'Fine not found' });
  res.json({ ok: true, data: fine });
}));

export default fineRouter;