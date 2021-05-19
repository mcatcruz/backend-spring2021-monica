// Loads array that contains entry objects
const dataset = require('./dataset.js');
let objectArray = dataset.objectArray;

// QUESTION 3: Which neighborhood is the most active? The least active? Supervisor district? (with and without supplements)
console.log('Which neighborhood is the most active? The least active? Supervisor district?');

// Initialize objects that will hold results.
let resultsQuestion3 = {};
let resultsQuestion3District = {};

// Interate through each entry object...
for (let i = 0; i < objectArray.length; i++) {
    // Assign each entry object to this variable:
    let entry = objectArray[i];
    // Check if results object has neighborhood property
    if (resultsQuestion3.hasOwnProperty(entry['Analysis Neighborhood'])) {
        // Increment by 1 if the property exists
        var neighborhood = entry['Analysis Neighborhood'];
        resultsQuestion3[neighborhood] += 1;
    } else; {
        // Otherwise, assign the property a 1 to start the count.
        resultsQuestion3[neighborhood] = 1;
    }

    if (resultsQuestion3District.hasOwnProperty(entry['Supervisor District'])) {
        resultsQuestion3District[entry['Supervisor District']] += 1;
    } else {
        resultsQuestion3District[entry['Supervisor Districtr']] = 1;
    }
}

// Track the highest neighborhood count
let highestNeighborhoodCount = 0;
let highestNeighborhoodName;

for (let neighborhood in resultsQuestion3) {
    // Compare districts to each other to determine highest count
    if (resultsQuestion3[neighborhood] > highestNeighborhoodCount) {
        highestNeighborhoodCount = resultsQuestion3[neighborhood];
        highestNeighborhoodCount = neighborhood;
    }
}

// Track the highest neighborhood count
let highestDistrictCount = 0;
let highestDistrictName;

for (let district in resultsQuestion3District) {
    // Compare districts to each other to determine highest count
    if (resultsQuestion3[district] > highestDistrictCount) {
        highestDistrictCount = resultsQuestion3[district];
        highestDistrictName = district;
    }
}

// Print results
console.log(`The neighborhood with the highest activity is ${highestNeighborhoodName} with ${highestNeighborhoodCount} entries.`);
console.log(`The district with the highest activity is ${highestDistrictName} with ${highestDistrict} entries.`);

// QUESTION 3: END