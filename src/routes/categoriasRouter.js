import { Router } from 'express';
import { getCategorias, postCategoria } from '../controllers/categoriasController.js';
import { newcategoryValidationMiddleware } from '../middlewares/categoriasMiddleware.js';

const categoriasRouter = Router();

categoriasRouter.get("/categories", getCategorias);
categoriasRouter.post("/categories", newcategoryValidationMiddleware, postCategoria);
export default categoriasRouter;

