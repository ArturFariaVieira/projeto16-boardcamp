import { Router } from 'express';
import { getCustomers, getCustomerbyId, postCustomer, updateCustomer } from '../controllers/clientesController.js';
import { newcustomerValidationMiddleware, editcustomerValidationMiddleware } from '../middlewares/customersMiddleware.js';


const clientesRouter = Router();

clientesRouter.get("/customers", getCustomers);
clientesRouter.get("/customers/:id", getCustomerbyId);
clientesRouter.post("/customers", newcustomerValidationMiddleware, postCustomer);
clientesRouter.put("/customers/:id", editcustomerValidationMiddleware, updateCustomer)
export default clientesRouter;
