import { Router } from 'express';

const alugueisRouter = Router();

alugueisRouter.get("/rentals", getRentals);
alugueisRouter.post("/rentals", postRental);
alugueisRouter.post("/rentals/:id/return", encerraRental);
alugueisRouter.delete("/rentals/:id", deleteRental)

