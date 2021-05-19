// Loads array that contains entry objects
const dataset = require('./dataset.js');
let objectArray = dataset.objectArray;

// QUESTION 4: How many open/active vs. closed? Per Year? Per Month?
console.log('How many open/active vs. closed? Per Year? Per Month?');

// Create object that will hold reusults.
let activeClose = {};

// Iterate through each entry object...
for (let i = 0; i < objectArray.length; i++) {
    // Assign specific values to the following variables:
    let entry = objectArray[i];
    const date = entry['Incident Date'];
    const year = date.split('/')[0];

    // Check if year value exists
    if (!activeClose.hasOwnProperty(year)) {
        // If year value does not exist, then create an empty object for that year.
        activeClose[year] = {};
    }

    // If the current entry object's year has a property of the Resolution of that entry object... 
    if (activeClose[year].hasOwnProperty(entry['Resolution'])) {
        // then add 1 to the existing value for that resolution.
        activeClose[year][entry['Resolution']] += 1;
    } else {
        // otherwise, create a resolution property and assign 1 to start the count.
        activeClose[year][entry['Resolution']] = 1;
    }
}

// Print the results for each year.
for (let year in activeClose) {
    console.log(`For the year ${year}, we had ${activeClose[year]['Open or Active']} for Open or Active cases, and ${activeClose[year]['Cite or Arrest Adult']} for Cite or Arrest.`);
}

// QUESTiON 4: END