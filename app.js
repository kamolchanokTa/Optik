
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var router = express.Router();
var productServ = require("./services/product.service");
const app = express();
app.listen(3000, function () {
    console.log('Example listening on port 3000!');
});

app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// some data for the API
var foods = [
  { "id": 1, "name": "Donuts" },
  { "id": 2, "name": "Pizza" },
  { "id": 3, "name": "Tacos" }
];

var books = [
  { "title": "Hitchhiker's Guide to the Galaxy" },
  { "title": "The Fellowship of the Ring" },
  { "title": "Moby Dick" }
];

var movies = [
  { "title": "Ghostbusters" },
  { "title": "Star Wars" },
  { "title": "Batman Begins" }
];

// the "index" route, which serves the Angular app
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'/dist/index.html'))
});

// the GET "books" API endpoint
app.get('/api/books', function (req, res) {
    res.send(books);
});

// the GET "movies" API endpoint
app.get('/api/values',function(req, res){
    productServ.default.getValues(req, res);
});

// router.get('/api/values', function(req, res, next) {
//     res.send(productServ.default.getValues(req, res));
// });

// the GET "foods" API endpoint
app.get('/api/food', function (req, res) {

    console.log("GET foods");

    // This is a very simple API endpoint. It returns the current value of the "foods" array.
    res.send(foods);

});
module.exports = app;

