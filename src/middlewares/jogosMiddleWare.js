import connection from "../database.js";
import gamesSchema from "../schemas/gamesSchemaValiddation.js";

export async function newgameValidationMiddleware(req, res, next) {
    const {name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try{
        const alreadyexists = await connection.query(`Select * FROM games WHERE name = $1`, [name])
        if(alreadyexists.rows[0]){
            console.log(alreadyexists.rows[0])
            return res.sendStatus(409);
        }
        const validation = gamesSchema.validate(req.body);
        if (validation.error) {
        return res.sendStatus(400);
  }
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
  

  next();
}


