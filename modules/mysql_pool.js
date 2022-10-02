

// LOCALHOST
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "foodsupply",
//     password: ""
// });

var mysql = require('mysql');


var pool = mysql.createPool({
    host: "212.1.211.151",
    user: "u844326969_desapp",
    database: "u844326969_desapp",
    password: "X*e1^J39"
});

pool.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Conexão com o Banco de Dados efetuada');
  connection.release();
});

module.exports = pool;