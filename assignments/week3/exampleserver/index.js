// require will allow you to use the express package
const express = require('express');

// "run" the express package.
const app = express();

// connect express package to the HTTP package. Allows Express serrver to understand HTTP requests.
    // Using the Server class to create 
const http = require('http').Server(app);

const port = 3000; // Most common "development" port is 8080.

// Provide the port number to listen to for Express.
http.listen(port);
console.log('Running Express Server on ' + port + ". Use CTRL+C to stop the server.");

// Set up Express Routes 
// Static route: When requested, you are directed to a file.
// .use() takes two arguments
    // The address you want to access and the filepath or folder where you will be taken to
        // '/' - single forward slash refers to the root (http://localhost:3000/)
app.use('/', express.static('public_html/'));

app.use('/secretwebsite', express.static('public_html/secret'));

// POST routes
    // GET can only receive data. 
    // POST can send and receive data.
    // Will handle the request from the front-end.
    app.post('/submitNumber', function(request, response) {
        response.send('Mischief managed.');
    });