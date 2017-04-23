'use strict';
const PORT = 5000;
// simple express server
console.log("starting server...");
console.info("http://localhost:" + PORT);
var express = require('express');
var app = express();
var router = express.Router();

app.use('/static', express.static('public'));

app.get('/', function(req, res) {
    res.sendfile('main.html');
});
 app.get('/type', function(req, res) {
     res.sendfile('type.html');
});
app.get('/structure', function(req, res) {
    res.sendfile('structure.html');
});
app.get('/history', function(req, res) {
    res.sendfile('history.html');
});
app.get('/main', function(req, res) {
    res.sendfile('index.html');
});
app.get('/musician', function(req, res) {
    res.sendfile('musician.html');
});

app.listen(PORT);
