// Imports the performance object. Tracks time it takes for script to execute.
const {performance} = require('perf_hooks');
// Time in milliseconds store in t0 for later calculation.
let t0 = performance.now();
// Imports fs package so that we can read dataset.csv
const fs = require('fs');

// Get our function in dataset-functions.js file
const dsFunctions = require('./dataset-functions.js');





// Initiate objectArray, which will hold objects. This is where all converted objects will be pushed into.
let objectArray = [];

// If JSON exists... 
    // Note: Storing dataset.csv in json avoids line 27-38 from running every time. This would be ideal for massive datasets, bc running this loop to create objects will affect the program's efficiency.
if (fs.existsSync('dataset.json')) {
    // Read the JSON file
    let jsonSave = fs.readFileSync('dataset.json', 'utf-8');
    // Parse into an object
    let convertedToObject = JSON.parse(jsonSave);
    // Get the array inside convertedToObject and store it in objectArray.
    objectArray = convertedToObject.dataset;
} else {
    // Get ENTIRE string from dataset.csv
    let dataset = fs.readFileSync('dataset.csv', 'utf-8');
    // Converts each dataset row into an array. 
    let lineArray = dataset.split('\n');
    // This is the very first row of the dataset, which are the headings.
    let dataHeadings = lineArray[0].split(',');
    // This loop goes through the entire dataset, creates objects out of each data entry, and then pushes each object into objectArray. 
    // Output is an array of objects.
    for (let i = 0; i < lineArray.length; i++) {
        objectArray.push(dsFunctions.convertEntry(lineArray[i], dataHeadings));
    }
}

// Removes information/empty space that is irrelevant to Question 1 from the array.
objectArray.pop();
objectArray.shift();

// Create an object to save as a JSON file.
let objectToSaveAsJson = {
    dataset: objectArray
}
// Stringify objectToSaveAsJson.
let stringToSaveAsJson = JSON.stringify(objectToSaveAsJson);
// Save stringToSaveAsJson as a JSON file.
fs.writeFileSync('dataset.json', stringToSaveAsJson, 'utf-8');

// (Initiate a counter variable?) This is an object to hold all counts.
let resultsObject = {};

// lines to test, 45, 5002, 6100

// This nested loop detects duplicate incidents. It will prevent us from counting the same incident twice, thus preventing inaccurate data analysis. 
// let stopAll = false;
// for (let i = 0; i < objectArray.length; i++) {
//     if (stopAll) {
//         break;
//     }
//     for (let e = 0; i < objectArray.length; e++) {
//         // Prevents nested loop from comparing itself to itself.
//         if (i === e) {
//             continue;
//         }

//         if (objectArray[i]['Incident ID'] === objectArray[e]['Incident ID']) {
//             console.log('FOUND DUPLICATE: i = ' + i + ', e = ' + e);
//             console.log(objectArray[i], objectArray[e]);
//             stopAll = true;
//             break;
//         }
//     }
// }

// Stores time in milliseconds it took for program to execute for later calculation. 
let t1 = performance.now();
console.log(`This script took ${t1-t0} milliseconds to excute.`);

module.exports = {
    objectArray
}

