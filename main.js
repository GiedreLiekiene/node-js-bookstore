const express = require('express');
const bodyParser = require('body-parser');
const router = require('express').Router();
const mysql = require('mysql');
const app = express();
const data = '[{ "id": "0", "name": "harry poter"}, {"id": "1", "name" : "game of throne" }]';
const toJSobj = JSON.parse(data);

let makeConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Laime11",
    database: "my_data_books_store"
  }); 

  makeConnection.connect(error => {
      if(error) {
          throw error;
      }
      console.log('We are connected to database MYSQL')
  });

  router.get('/books', (req, res) => {
    let sqlQuery = "SELECT * FROM books_table";
    let query = makeConnection.query(sqlQuery, (err, result) => {
      if(err) throw err;
      res.send(result)
    })
  });

router.get('/books/:id', (req, res) => {
    //param value
    const { id } = req.params;
    console.log(id);
    // this param value for find() object in array
    const book = toJSobj.find(books => books.id === id);
    // send back that object to view
    res.send(book);
});

router.post('/books', (req, res) => {
    //need obj which represent book
    let book = { id: "", name: "" };
    //insert values to properties
    book.id = req.body.id;
    book.name = req.body.name;
    //need push that object to array

    const data = toJSobj.push(book);
    //send success info that object was pushed
    res.send("Data was inserted.");
})

router.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const book = toJSobj.findIndex(books => books.id === id);
    toJSobj.splice(book, 1);
    res.send("Data was deleted");
});


app.use(bodyParser.json());
app.use('/', router);

app.listen(3002, () => {
  console.log('Server is started in port 3002');
})