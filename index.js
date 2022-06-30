const express = require('express');
const mysql = require('mysql');
const mysql_config = require('./mysql_config');

console.log(mysql_config)

const con = mysql.createConnection(mysql_config);

const app = express();
app.listen(3000, () => console.log('Example app is listening on port 3000.'));

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {

  con.query("SELECT * FROM jeffs", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

  res.send('Successful response.');
});

