import  connection  from '../database.js';

export async function getCustomers (req, res) {
    try {
        const customers = await connection.query(`SELECT * FROM customers;`);
        res.send(customers.rows);
    }catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getCustomerbyId (req, res) {
    const {id} = req.params;
    try{
        const customer = await connection.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
        res.send(customer.rows[0]);
    }catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}
export async function postCustomer (req, res) {
    const {name, phone, cpf, birthday} = req.body;
    try{
        const post = await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])
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