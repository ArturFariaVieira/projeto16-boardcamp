import  connection  from '../database.js';

export async function getCategorias (req, res) {
    try {
        const categorias = await connection.query(`SELECT * FROM categories;`);
        res.send(categorias.rows);
    }catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postCategoria (req, res) {
    const novacategoria = req.body.name;
    try{
        const post = await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [novacategoria])
        res.sendStatus(201);
    }catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}