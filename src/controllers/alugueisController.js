import  connection  from '../database.js';
import dayjs from 'dayjs';

export async function getRentals (req, res) {
    const {customerId, gameId} = req.query;
    try {
        if(customerId){
            const rentals = await connection.query(`SELECT * FROM rentals WHERE "customerId" = $1;`, [customerId]);
            res.send(rentals.rows);
        }
        if(gameId){
            const rentals = await connection.query(`SELECT *, rentals.id AS "rentalId" FROM rentals WHERE "gameId" = $1;`, [gameId]);
            
            res.send(rentals.rows);

        }
        else{
            const alugueis = await connection.query
            (
                `SELECT     games.name  AS "game.name",
                            customers.name AS "customer.name",
                            rentals."rentDate", rentals."daysRented", rentals."returnDate", rentals."originalPrice",
                            rentals.id AS "rentalId"
                            FROM rentals 
                            JOIN games ON rentals."gameId" = games.id
                            JOIN customers ON rentals."customerId" = customers.id ;`);
            res.send(alugueis.rows);
        }
        
        }catch(err) {
        console.log(err);
        res.sendStatus(500);
        }
}


export async function postRental (req, res) {
    const {customerId, gameId, daysRented} = req.body;
    const rentDate = dayjs().format('YYYY-MM-DD');
    


    
    try{
        const game = await connection.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
        const user = await connection.query(`SELECT (id, name) FROM customers WHERE id = $1;`, [customerId]);
        const originalPrice = Number(daysRented)* game.rows[0].pricePerDay;

        const post = await connection.query
        (
            `INSERT INTO 
                rentals 
                    ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7)`,
                    [customerId, gameId, rentDate, daysRented, null , originalPrice, null])
        res.sendStatus(201);
    }catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function updateCustomer( req, res ){
    const {name, phone, cpf, birthday} = req.body;
    const {id} = req.params;
    console.log(id)
    try{
        const update = await connection.query(`UPDATE customers SET name=$1, phone= $2, cpf=$3, birthday=$4 WHERE id = $5`, [name, phone, cpf, birthday, id])
        console.log(update);
        res.sendStatus(200);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }


}

export async function deleteRental(req, res ) {
    const {id} = req.params
    console.log(id)
    try{
        const remove = await connection.query(`DELETE FROM rentals WHERE id = $1;`, [id])
        res.sendStatus(200);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
export async function returnRental(req, res ) {
    const {id} = req.params
    try{
        const returnrental = await connection.query(`SELECT * FROM rentals WHERE id = $1;`, [id]);
        const hoje = Date.now();
        const today = dayjs().format('YYYY-MM-DD');
        const returnday = (returnrental.rows[0].rentDate.getTime()) + (returnrental.rows[0].daysRented *86400000)
        const atraso = Math.ceil((hoje - returnday) / 86400000)
        const taxa = atraso * (returnrental.rows[0].originalPrice / returnrental.rows[0].daysRented);

        if (atraso > 0){
            const rental = await connection.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`, [today, taxa, id])
        }
        if(atraso < 0){
            let ok = 0;
            const rental = await connection.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`, [today, ok, id])
        }
        res.sendStatus(200);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}