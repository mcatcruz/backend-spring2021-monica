// Loads array with all entry objects. Also include functions file.
const dataset = require('./dataset.js');
const dsFunctions = require('./dataset-functions.js');
let objectArray = dataset.objectArray;

// QUESTION 5: What street has the most activity?
console.log('What street has the most activity?')

// Initialize an empty object and store in streets variable. The key-value pair will be the streetname : number the streetname appears in the dataset.
let streets = {};

// Iterate through each object inside objectArray...
for (let i = 0; i < objectArray.length; i++) {
    // Get values of streets from each object.
    let entry = objectArray[i]; // entry is the key-value pair
    let streetArray = entry['Intersection'].split('\\'); // This is where the value is extracted and stored in an array.
    // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array. 
    // Specifically, the callback function will remove spaces around each street name.
    streetArray = streetArray.map(function (street) {
        return dsFunctions.stripSpace(street);
    });

    // Iterate through elements of streetArray...
    for (let i = 0; i < streetArray.length; i++) {
        // Assign streetArray[i] to street variable. Note: streetArray[i] is a string?
        let street = streetArray[i];

        // Check if the street is empty or if it starts with UNNAMED. If so, skip it.
        if (street === '' || street.includes('UNNAMED')) {
            continue;
        }
        // Check if streets object has the street in it using .hasOwnProperty()
        if (streets.hasOwnProperty(street)) {
            // If it does, then increase count by 1.
            streets[street] += 1;
        } else {
            // Otherwise, create the property and assign it 1 (this starts the count for that property).
            streets[street] = 1;
        }
    }
}

// Hold the highest number value for a street.
let highestStreetCount = 0;
let highestStreetName;

// Go through each street in streets object
for (let street in streets) {
    // Check if current street value count is higher than the highest count
    if (streets[street] > highestStreetCount) {
        highestStreetCount = streets[street];
        highestStreetName = street;
    }
}

// Print results.
console.log(`The street with the most police activity is ${highestStreetName} with a total of ${highestStreetCount} incidents.`);

//QUESTION 5: END