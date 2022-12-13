import { Router } from 'express';
import { getRentals, postRental, deleteRental, returnRental } from '../controllers/alugueisController.js';
import { newrentalValidationMiddleware, deleteValiddationMiddlaware  } from '../middlewares/rentalsMiddleware.js';

const alugueisRouter = Router();

alugueisRouter.get("/rentals", getRentals);
alugueisRouter.post("/rentals", newrentalValidationMiddleware, postRental);
alugueisRouter.post("/rentals/:id/return", returnRental);
alugueisRouter.delete("/rentals/:id",deleteValiddationMiddlaware, deleteRental)
export default alugueisRouter;

