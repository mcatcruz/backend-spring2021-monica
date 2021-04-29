// Allows us to use mongoose
const mongoose = require('mongoose');

// Credentials and lcoation for our Mongo database
const databaseConnect = 'mongodb+srv://exampleUser:icqxYJqXDVOURhKq@cluster0.9wbes.mongodb.net/example_database?retryWrites=true&w=majority';

// Settings and options for Mongoose connection
const options = {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
};

// Connect to database (see Mongoose documentation). Test for errors. 
mongoose.connect(databaseConnect, options, function (error) {
    if (error) {
        console.log('Uh-oh! ' + error);
    } else {
        console.log('Connected to MongoDB Atlas!');
    }
});

// Object representing the MongoDB connection.
let db = mongoose.connection;

// Log MongoDB errors to the console.
db.on('error', console.error.bind(console, 'Mongo Error!'));

// Provide Mongoose with a copy of Promise class.
mongoose.Promise = global.Promise;

// Schema describes how MongoDB documents should look like, including properties and values.
let Schema = mongoose.Schema;
let ourSchema = new Schema ({
    food: String,
    location: String
});

// Mongoose Model describes where to save documents and how the document should look like based on a specific schema.
let exampleModel = new mongoose.model('example_collections', ourSchema);


// CRUD OPERATIONS 

// Creating our first Document, we provide an object to fulfill schema reqs.
let firstDocument = new exampleModel ({
    location: 'Park Merced',
    food: 'Oatmeal'
});

// Saving our first Document, callback fxn checking for errors or console logs success.
firstDocument.save(function (error) {
    if (error) {
        console.log('Failed to save document ' + error);
    } else {
        console.log('Document saved!');
    }
});

// Searches the exampleModel with a specified ID and updates that documents with values from second argument (output: object).
exampleModel.findByIdAndUpdate('6086f8d949259ce0c579c76b', {location: 'Excelsior'}, function (error, results) {
        if (error) {
            console.log('Failed to update: ' + error);
        } else {
            console.log('Updated successfully, here is the old copy: ' + results);
        }
});

exampleModel.findByIdAndDelete('6086f89d6d1d97e0af8cc471', function(error, results) {
    if (error) {
        console.log('Failed to delete ' + error);
    } else {
        console.log ('Deleted successfully' + results);
    }
});

// Searches the collection for matching documents based on find()'s first argument. Returns an array of matching documents.
exampleModel.find({food: 'Oatmeal'}, function (error, results) {
    if (error) {
        console.log('Failed to find: ' + error);
    } else {
        console.log('Found the following: ' + results);
    }
});