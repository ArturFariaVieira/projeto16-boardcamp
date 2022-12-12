import { Router } from 'express';

const categoriasRouter = Router();

categoriasRouter.get("/categorias", getCategorias);
categoriasRouter.post("/categorias", postCategoria);

