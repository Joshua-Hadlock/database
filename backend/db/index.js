const Pool = require('pg').Pool;

let dbURL = {
    connectionString: process.env.DATABASE_URL  || 'postgres://postgres:Postgres@localhost:5432/postgres'
}

const pool = new Pool(dbURL);

pool.connect();


exports.getAllUsers = async (req, res) => {
    pool.query(`SELECT * from users limit 3`, (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            console.log(JSON.stringify(row));
        }
        res.status(200).json(results.rows);
    })
}

exports.authUserByName = async (username) => {
    const results = await
        pool.query('SELECT * from users where username = $1', [username])
    console.log(results.rows[0])
    return results.rows[0];
}

exports.getUserById = async (id) => {
    const results = await pool.query(`select * from users where id = $1`, [id])

        return results.rows[0]

}
exports.getLoginUser = async (req, res) => {
    pool.query(`select * from users where id = $1`, [res.locals.user.id], (err, results) => {
        if (err) throw err;
        res.status(200).json(results.rows[0]);
    })
}

exports.register = async (req, res) => {
    pool.query(`insert into users (username, password) values ($1, $2)`, [req.data.username, req.data.password], (err) => {
        if (err) throw err;
    })
}
