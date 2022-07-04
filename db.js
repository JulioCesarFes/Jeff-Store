const mysql = require('mysql2')
const mysql_config = require('./mysql_config')
const con = mysql.createConnection(mysql_config)

con.query(`DROP DATABASE ${mysql_config.database};`, (err, result, fields) => {
  if (err) throw err
  console.log('dropped database')
})

con.query(`CREATE DATABASE ${mysql_config.database};`, (err, result, fields) => {
  if (err) throw err;
  console.log('created database')
})

con.query(`USE ${mysql_config.database};`, (err, result, fields) => {
  if (err) throw err;
  console.log('using database')
})

con.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT, 
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    PRIMARY KEY (id)
  );
`, (err, result, fields) => {
  if (err) throw err
  console.log('created table users')
})
