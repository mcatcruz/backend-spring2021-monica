const express = require('express');
const fs = require('fs');
const task = require('./Task.js');

const app = express();

const http = require('http').Server(app);

const port = 3000;

const char = 'utf-8';

http.listen(port);

console.log('Express server is now running on port ' + port);

let tasks;
let taskFileName = tasks.json;

// Prepare JSON tasks file
if (fs.existsSync(taskFileName)) {
    let fileContents = fs.readFileSync(taskFileName, char);
    tasks = JSON.parse(fileContents);
} else {
    tasks = {
        incomplete: [],
        completed: [],
        deleted: []
    }

    fs.writeFileSync(taskFileName, JSON.stringify(tasks), char);
}

// Body Parser
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', express.static('public_html/'));