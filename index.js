const express = require('express');
const mysql = require('mysql');
const mysql_config = require('./mysql_config');
const con = mysql.createConnection(mysql_config);

const {cryptPassword, comparePassword} = require('./password_encryption');

const app = express();
app.use(express.json());
app.listen(3000, () => console.log('Example app is listening on port 3000.'));


app.post('/register', function (req, res) {
  console.log(req.body)
  res.send('hi')
})



cryptPassword('123456', (err, hash) => {
  console.log(err, hash)

  comparePassword('123456', hash, (err, a2) => {
    console.log('123456', err, a2)
  })

  comparePassword('111111', hash, (err, a2) => {
    console.log('111111', err, a2)
  })

  comparePassword('', hash, (err, a2) => {
    console.log('', err, a2)
  })

})