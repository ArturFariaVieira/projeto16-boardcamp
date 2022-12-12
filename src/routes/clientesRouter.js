import { Router } from 'express';
import { getCustomers, getCustomerbyId, postCustomer } from '../controllers/clientesController.js';


const clientesRouter = Router();

clientesRouter.get("/customers", getCustomers);
clientesRouter.get("/customers/:id", getCustomerbyId);
clientesRouter.post("/customers", postCustomer);
//clientesRouter.put("/customers/:id", updateCustomer)
export default clientesRouter;
