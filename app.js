
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var router = express.Router();
var productServ = require("./services/product.service");
var cartServ = require("./services/cart.service");
var userServ = require("./services/user.service");
const app = express();
app.listen(3000, function () {
    console.log('Example listening on port 3000!');
});

app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.post('/api/user/login', function (req, res) {
    userServ.default.login(req, res);
});

app.post('/api/user/save', function (req, res) {
    userServ.default.create(req, res);
});

app.post('/api/user/create', function (req, res) {
    userServ.default.createUser(req, res);
});

app.post('/api/user/update-address', function (req, res) {
    console.log("update address");
    console.log(req.body.id);
    userServ.default.updateAddress(req, res);
});

app.post('/api/user/update-credit', function (req, res) {
    console.log(req.body.id);
    userServ.default.updateCredit(req, res);
});
// the GET "movies" API endpoint
app.get('/api/product-overview',function(req, res){
    productServ.default.getProducts(req, res);
});

app.post('/api/product/get',function(req, res){
    productServ.default.getProduct(req, res);
});

app.post('/api/product/save',function(req, res){
    productServ.default.saveProduct(req, res);
});

app.post('/api/cart/save',function(req, res){
    cartServ.default.saveCart(req, res);
});

app.post('/api/cart/get/user',function(req, res){
    cartServ.default.getCartsByCustomer(req, res);
});
module.exports = app;

