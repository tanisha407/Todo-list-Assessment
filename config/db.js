


// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.message);
//     process.exit(1); // Exit the process with failure
//   }
//   else {
//     console.log('Connected to the MYSQL database');
//   }
// });

// module.exports = db;

const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit the process with failure
  }
  else {
    console.log('Connected to the MYSQL database');
    connection.release(); // Release the connection back to the pools for future use
  }
});
module.exports = promisePool;




