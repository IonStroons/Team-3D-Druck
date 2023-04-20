// Load express module
var express = require('express');

// Create a router instance
var router = express.Router();

// Create an express instance
var app = express();

var path = require('path');

app.use(express.static(path.resolve('./public')));

var server = app.listen(3000);