const mysql = require('mysql2/promise');
require('dotenv').config();


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('✅ Ligação à base de dados MySQL estabelecida com sucesso!');
        connection.release(); 
    })
    .catch(err => {
        console.error('❌ Erro fatal ao ligar à base de dados. O servidor será encerrado.', err);
        process.exit(1); 
    });

module.exports = pool;