'use strict';

// simple express server
console.log("starting server...");
var express = require('express');
var app = express();
var router = express.Router();

app.use('/static', express.static('public'));

app.get('/', function(req, res) {
    res.sendfile('index.html');
});
// app.get('/hi', function(req, res) {
//     res.sendfile('some.html');
// });

app.listen(5000);
