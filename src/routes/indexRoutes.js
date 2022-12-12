import { Router } from "express";
import alugueisRouter from "./alugueisRouter.js";
import jogosRouter from "./jogosRouter.js";
import clientesRouter from "./clientesRouter.js";
import categoriasRouter from "./categoriasRouter.js";

const router = Router();
router.use(categoriasRouter);
export default router;