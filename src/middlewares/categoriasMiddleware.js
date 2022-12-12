import connection from "../database.js";
import categoriesSchema from "../schemas/categoriesSchemaValiddation.js";

export async function newcategoryValidationMiddleware(req, res, next) {
    const newcategory = req.body.name;
    try{
        const alreadyexists = await connection.query(`Select * FROM categories WHERE name = $1`, [newcategory])
        if(alreadyexists.rows[0]){
            console.log(alreadyexists.rows[0])
            return res.sendStatus(409);
        }
        const validation = categoriesSchema.validate(req.body);
        if (validation.error) {
        return res.sendStatus(400);
  }
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
  

  next();
}


