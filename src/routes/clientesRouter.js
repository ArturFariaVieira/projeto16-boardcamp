import { Router } from 'express';
import { getCustomers, getCustomerbyId, postCustomer } from '../controllers/clientesController.js';
import { newcustomerValidationMiddleware } from '../middlewares/customersMiddleware.js';


const clientesRouter = Router();

clientesRouter.get("/customers", getCustomers);
clientesRouter.get("/customers/:id", getCustomerbyId);
clientesRouter.post("/customers", newcustomerValidationMiddleware, postCustomer);
//clientesRouter.put("/customers/:id", updateCustomer)
export default clientesRouter;
