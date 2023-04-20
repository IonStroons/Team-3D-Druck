const port = 3000;

// Load express module
var express = require('express');

// Create a router instance
var router = express.Router();

// Create an express instance
var app = express();

var path = require('path');

app.use(express.static(path.resolve('./public')));

var server = app.listen(port);

console.log(`Server is running on http://localhost:${port}`);