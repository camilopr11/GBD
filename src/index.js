const readline = require('readline');
const { connect, executeQuery, closeConnection } = require('./db/db.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let query = '';

rl.setPrompt('Ingrese la consulta SQL (termine con punto y coma ;):\n');
rl.prompt();

rl.on('line', (line) => {
  // Agregar la línea ingresada a la consulta
  query += line.trim();

  // Si la línea ingresada termina con punto y coma (;), ejecutar la consulta y preguntar si se desea ingresar otra
  if (line.trim().endsWith(';')) {
    executeQuery(query, () => {
      rl.question('¿Desea ingresar otra consulta? (s/n) ', (answer) => {
        if (answer.toLowerCase() === 's') {
          query = '';
          rl.setPrompt('Ingrese la consulta SQL (termine con punto y coma ;):\n');
          rl.prompt();
        } else {
          closeConnection(() => {
            console.log('Adiós!');
            process.exit(0);
          });
        }
      });
    });
  } else {
    // Si la línea ingresada no termina con punto y coma (;), agregar un espacio para separarla de la siguiente línea
    query += ' ';
  }
}).on('close', () => {
  console.log('Adiós!');
  process.exit(0);
});

connect();

