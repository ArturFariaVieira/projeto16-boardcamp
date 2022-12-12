import { Router } from 'express';
import { getGames, postGame } from '../controllers/jogosController.js';
import { newgameValidationMiddleware } from '../middlewares/jogosMiddleWare.js';

const jogosRouter = Router();

jogosRouter.get("/games", getGames);
jogosRouter.post("/games", newgameValidationMiddleware, postGame);
export default jogosRouter;

