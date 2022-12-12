import connection from '../database.js';

export async function getCategorias (req, res) {
    try {
        const categorias = await connection.query(`SELECET * FROM categorias;`);
        res.send(categorias.rows);
    }catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}
