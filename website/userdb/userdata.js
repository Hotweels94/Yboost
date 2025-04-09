var {Client} = require('pg');
const bcrypt = require("bcrypt");

var con=new Client ({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"1234",
    database:"database"
})

con.connect().then(()=> console.log("connected"))

async function createUser(username, email, password, phone_number, age) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const request = `INSERT INTO users(username, email, password, phone_number, age, created_at) VALUES($1, $2, $3, $4, $5, NOW()) RETURNING id, username, email`;
    const values = [username, email, hashedPassword, phone_number, age];
    const result = await con.query(request, values);
    return result.rows[0];
}

async function loginUser(username, password) {
    const request = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const result = await con.query(request, values);
    const user = result.rows[0];
    const ValidPassword = await bcrypt.compare(password, user.password);
    if (!ValidPassword) {
        throw new Error('Invalid password');
    }
}

module.exports = { createUser, loginUser, con };