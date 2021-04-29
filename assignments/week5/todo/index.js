// THIS IS THE BACKEND CODE 
// DO NOT USE 'name' as variable name when using Node.

// mongo-sanitize is for removing potential query code from front-end input.
const sanitize = require('mongo-sanitize'); 
const mongoose = require('mongoose');
const task = require('./Task.js');
const credentials = require('./credentials.js');
const char = 'utf-8';

// These are for connecting to Express
const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = 3000;
http.listen(port);
console.log('Express server is now running on port ' + port);

// Connect to MongoDB Atlas
mongoose.connect(credentials.dbUrl, credentials.dbOptions, function(error) {
    if (error) {
        console.log('Failed to connect to MongoDB: ' + error);
    } else {
        console.log('Connected to MongoDB!');
    }
});

// MongoDB Connection object, error binding, and setting Promises
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'We had a Mongo Error: '));
mongoose.Promise = global.Promise;

// Our MongoDB document format
const Schema = mongoose.Schema;
let taskSchema = Schema ({
    text: String,
    priority: Number,
    dueDate: String,
    // Test if we can save objects that "look" like Date objects
    dateCreated: String,
    dateDeleted: String,
    dateCompleted: String
});

// Attaching the Task class to all database documents when loaded into JS.
taskSchema.loadClass(task.Task);

let TodoModel = new mongoose.model('tasks', taskSchema);

// Body Parser (see documentation: https://github.com/expressjs/body-parser )
// Ensures we receive values from front-end properly.
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));

// Routes

// The default route for when a visitor requests the URL without a file path.
app.use('/', express.static('public_html/'));

// POST Handler for adding a new task.
app.post('/add-task', function(req, res) {
    let taskData = req.body;

    // Build new Mongoose object.
    let newTask = new TodoModel ({
        dateCompleted: null,
        dateDeleted: null,
        dateCreated: new Date()
    });

    // Run Mongoose object methods from the Task class
    newTask.setText(sanitize(taskData.text));
    newTask.setPriority(taskData.priority);
    newTask.setDueDate(taskData.dueDate);
    newTask.save(function (error) {
        if (error) {
            console.log('MongoDB did not save new task: ' + error);
            res.sendStatus(500);
        } else {
            // Send a response to the front-end.
            res.send({error: null});
        }
    })
});

// POST Handler for getting all tasks. 
app.post('/get-tasks', function(req, res) {
    // Find objects from MongoDB. Callback function returns a results array.
    TodoModel.find({dateDeleted: null, dateCompleted: null}, function (error, results) {
        if (error) {
            console.log('Failed to find documents: ' + error);
            res.sendStatus(500);
        } else {
            // Build an object holding all the Task objects that passed the filter test.
            console.log(results)
            // Create an object to send to the front-end
            let responseObject = {
                incomplete: results
            };
            // Send responseObject back to the front-end.
            res.send(responseObject);
        }
    });
});

// POST Handler for completing a task.
app.post('/complete-task', function (req, res) {
    let _id = req.body.id;
    // {_id: _id} refers to finding a key named "_id" in MongoDB. The value is 'req.body.id', which was assigned to the variable "_id" in line 95.

    // Find the document with the specified ID...
    TodoModel.find({_id: _id}, function (error, results) {
        if (error) {

        } else {
            //... and mark it complete.
            results[0].markCompleted();
            results[0].save(function (error) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    // Send a message to front-end.
                    res.send({});
                }
            });
        }
    });
});

// POST Handler for deleting a single task.
app.post('/delete-task', function(req, res) {
    let _id = req.body.id;
    
    TodoModel.find({_id: _id}, function (error, results) {
        if (error) {

        } else {
            // Mark found document as deleted by giving the dateDeleted a value.
            results[0].markDeleted();
            results[0].save(function (error) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    // Send message to front-end.
                    res.send({});
                }
            });
        }
    });
});

// POST Handler for updating an existing task.
app.post('/update-task', function (req, res) {
    let _id = req.body.id;
    let updates = req.body;

    // Search for document with specific ID...
    TodoModel.find({_id: _id}, function (error, results) {
        if (error) {

        } else {
            // ...and update all values using Task setters.
            // Test if we 0 results from database.
            results[0].setText(sanitize(updates.text));
            results[0].setPriority(updates.priority);
            results[0].setDueDate(updates.dueDate);
            results[0].save(function (error) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    res.send({});
                }
            });
        }
    });
});

   // This code is not secure! It makes it easier to code inject as the data does directly from front-end to database.
   // TodoModel.findByIdAndUpdate(_id, updates, function (error, results) {
   //    if (error) {
   //       console.log("Something happened updating a document: " + error);
   //    } else {
   //       console.log("Updated document, previous version: " + results)
   //    }
   // });

