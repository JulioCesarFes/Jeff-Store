const express = require('express');
const mysql = require('mysql2');
const mysql_config = require('./mysql_config');
const con = mysql.createConnection(mysql_config);

const {cryptPassword, comparePassword} = require('./password_encryption');

const app = express();
app.use(express.json());
app.listen(3000, () => console.log('Example app is listening on port 3000.'));


app.post('/register', function (req, res) {
  let {username, password} = req.body
  
  cryptPassword(password, (err, hash) => {
    if (err) {
      res.status(500).send('num deu')
    } else {

      password = hash

      let args = [username, password]
      con.execute('INSERT INTO `users`(`username`, `password`) VALUES (?, ?);', args, (err, result, fields) => {
        if (err) {
          res.status(500).send('se vira')
        } else {
          res.status(201).send(`deu c: ... O usuário ${username} foi criado com sucesso!`)
        }
      });
    }
  })
})

app.post('/login', function (req, res) {
  let {username, password} = req.body
  
  let args = [username]
  
  con.execute('SELECT * FROM users WHERE username = ? LIMIT 1', args, (err, result, fields) => {
    if (err) {
      res.status(500).send('num deu')
    } else {
      console.log({err, result})

      let user = result[0]
      let stored_password = user.password

      comparePassword(password, stored_password, (err, correct_password) => {
        if (err) {
          res.status(500).send('se vira')
        } else {

          if (correct_password) {
            res.status(200).send(`Achei o cê e seu número é ${user.id}`)
          } else {
            res.status(404).send('User not found')
          }
        }
      })
    }
  })
})
