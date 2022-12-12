import connection from "../database.js";
import customerSchema from "../schemas/customerSchemaValiddation.js";

export async function newcustomerValidationMiddleware(req, res, next) {
    const {name, phone, cpf, birthday} = req.body;
    try{
        const alreadyexists = await connection.query(`Select * FROM customers WHERE cpf = $1`, [cpf])
        if(alreadyexists.rows[0]){
            console.log(alreadyexists.rows[0])
            return res.sendStatus(409);
        }
        const validation = customerSchema.validate(req.body);
        if (validation.error) {
        return res.sendStatus(400);
  }
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
  

  next();
}


