import { Router } from 'express';
import { errorHandler } from '../middleware/errorHandler.js';
import isAdmin from '../middleware/isAdmin.js';
import isLibrarian from '../middleware/isLibrarian.js';
import { PrismaClient } from '@prisma/client';
import getFinesList from '../controllers/fine/getFinesList.js';
import getFine from '../controllers/fine/getSpecificFine.js';

const prisma = new PrismaClient();
const fineRouter = Router();

console.log('Registering fineRouter.get(/all)');

fineRouter.get('/all', errorHandler(isLibrarian), errorHandler(async (req, res) => {
  const fines = await prisma.fine.findMany({
    include: { user: true, reservation: {
      select : {
        book : {
          select : {
            title : true,
          }
        }
      }
    }},
  });
  res.json({ ok: true, data: fines });
}));

fineRouter.get('/all', errorHandler(isAdmin), errorHandler(getFinesList));


console.log('Registering fineRouter.get(/:id)');
fineRouter.get('/:id', errorHandler(isAdmin), errorHandler(getFine));

export default fineRouter;