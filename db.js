import mysql from 'mysql2/promise'

const db = await mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Penki@123",
    database:"testdb"
})



export default db;