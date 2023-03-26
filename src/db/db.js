const dotenv = require('dotenv');
dotenv.config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

function connect(callback) {
  client.connect((err) => {
    if (err) {
      console.error('Error de conexión:', err.stack);
    } else {
      console.log('Conexión exitosa!');
    }

    if (callback) {
      callback();
    }
  });
}

function executeQuery(query, callback) {
  client.query(query, (err, res) => {
    if (err) {
      console.error('Error en la consulta:', err.stack);
    } else {
      console.log('Consulta exitosa!');
      console.table(res.rows);
    }

    if (callback) {
      callback();
    }
  });
}

function closeConnection(callback) {
  client.end(() => {
    console.log('Conexión cerrada!');
    if (callback) {
      callback();
    }
  });
}

module.exports = { connect, executeQuery, closeConnection };
