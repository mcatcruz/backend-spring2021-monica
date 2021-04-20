// THIS IS THE BACKEND CODE 
// DO NOT USE 'name' as variable name when using Node. 

const express = require('express');
const fs = require('fs');
const task = require('./Task.js');
const app = express();
const http = require('http').Server(app);
const port = 3000;
const char = 'utf-8';

http.listen(port);

console.log('Express server is now running on port ' + port);

// Storing the task object and filename in variables.
let tasks;
let taskFileName = 'tasks.json';

// Prepare JSON tasks file
if (fs.existsSync(taskFileName)) {
    // Read file
    let fileContents = fs.readFileSync(taskFileName, char);
    // Convert JSON to actual JS Objects.
    tasks = JSON.parse(fileContents);
    // TO-DO: Write code that converts generic Objects into Task Objects.

    // Convert the JS object from JSON to proper Task Objects.
    convertedObjects = [];
    
    tasks.incomplete.forEach(function (jsonTask) {
        let newTaskObject = new task.Task();
        convertedObjects.push(newTaskObject.jsonConvert(jsonTask));
    });
    tasks.incomplete = convertedObjects;
} else {
    // Create a task Object when file does not exist...
    tasks = {
        incomplete: []
    }
    // ...write task object to filename.
    fs.writeFileSync(taskFileName, JSON.stringify(tasks), char);
}

console.log(tasks.incomplete);

// Body Parser (see documentation: https://github.com/expressjs/body-parser )
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));

// Routes

// The default route for when a visitor requests the URL without a file path.
app.use('/', express.static('public_html/'));

// POST Handler for adding a new task.
app.post('/add-task', function(req, res) {
    let taskData = req.body;
    // TO-DO: detect if there is actual text in text property.
    // Create a Task Object based on the data received from front-end.
    let taskObject = new task.Task(taskData.text, taskData.priority, taskData.dueDate);

    // Store new Task Object into the tasks incomplete array.
    tasks.incomplete.push(taskObject);

    // "Update" the json file.
    saveFile();

    // Send a response to the front-end.
    res.send({error: null});

});

// POST Handler for getting all tasks.
app.post('/get-tasks', function(req, res) {
    // Filter completed or deleted tasks.
    let incompleteArray = tasks.incomplete.filter(function (task) {
        console.log(task);
        // If the task has a deleted or completed date, it fails the filter test.
        if (task.isDeleted() || task.isCompleted()) {
            return false;
        } else {
            return true;
        }
    });
    // Build an object holding all the Task objects that passed the filter test.
    let responseObject = {
        incomplete: incompleteArray
    };
    // Send responseObject back to the front-end.
    res.send(responseObject);
});

// POST Handler for deleting a single task.
app.post('delete-task', function(req, res) {
    let id = req.body.id;
    
    // Iterate through each element in task array. Find matching ID.
    for (let i=0; i < tasks.incomplete.length; i++) {
        if (tasks.incomplete[i].id === id) {
            // If ID matches, then mark the Task Object as deleted.
            tasks.incomplete[i].markDeleted();
            break;
        }
    }
    // Send a message to front-end.
    res.send({});
});


// TO-DO: Find a way to delay multiple calls of this function.

// The saveFile function will convert task Object into JSON and save it to filename.
function saveFile() {
    let json = JSON.stringify(tasks);
    fs.writeFileSync(taskFileName, json, char);
}