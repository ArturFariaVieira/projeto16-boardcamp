import connection from "../database.js";
import customerSchema from "../schemas/customerSchemaValiddation.js";
import dayjs from "dayjs";

export async function newrentalValidationMiddleware(req, res, next) {
    const {customerId, gameId, daysRented} = req.body;

    try{
        const userexists = await connection.query(`Select * FROM customers WHERE id = $1`, [customerId])
        if(!userexists){
            return res.sendStatus(400);
        }
        const gameexists = await connection.query(`Select * FROM games WHERE id = $1`, [gameId])
        if(!gameexists){
            return res.sendStatus(400);
        }
        const validation = daysRented>0;
        if (!validation) {
            return res.sendStatus(400);
        }
        const gameamount = await connection.query(`Select games."stockTotal" from games WHERE id = $1`, [gameId])
        const gamerented = await connection.query(`Select rentals. FROM rentals WHERE 'returnDate' = 'null' ;`)
        console.log(gameamount.rows[0].stockTotal)
        console.log(gamerented)
        if(gamerented.rows.length >= gameamount.rows[0].stockTotal){
            return res.sendStatus(400)
        }
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
  

  next();
}

export async function deleteValiddationMiddlaware(req, res) {
    const {id} = req.params
    try{
        const remove = await connection.query(`SELECT * FROM rentals WHERE id = $1;`, [id])
        if(remove.rows< 1){
            return res.sendStatus(404);
        }
        if(remove.rows[0].returnDate != null){
            return res.sendStatus(400);
        }
        res.sendStatus(200);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }}

    export async function returnrentalValiddationMiddlaware(req, res) {
        const {id} = req.params
        try{
            const returnrental = await connection.query(`SELECT * FROM rentals WHERE id = $1;`, [id])
            if(returnrental.rows< 1){
                return res.sendStatus(404);
            }
            if(remove.rows[0].returnDate != null){
                return res.sendStatus(400);
            }
            res.sendStatus(200);
    
        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }}