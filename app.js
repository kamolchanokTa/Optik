
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var router = express.Router();
var productServ = require("./services/product.service");
var userServ = require("./services/user.service");
const app = express();
app.listen(3000, function () {
    console.log('Example listening on port 3000!');
});

app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.post('/api/user/save', function (req, res) {
    userServ.default.create(req, res);
});

app.post('/api/user/login', function (req, res) {
    userServ.default.login(req, res);
});

// the GET "movies" API endpoint
app.get('/api/values',function(req, res){
    productServ.default.getValues(req, res);
});
module.exports = app;

