// Loads in the array with all entry objects.
const dataset = require("./dataset.js");
let objectArray = dataset.objectArray;

// QUESTION 1: What are the most common and least common types of incidents that are open/active?
// NOTE: Ignore any non-active/open entries, ignore any that have "Supplement" in their Report Type Description.

console.log("What is the most common and least common type of incident that are open/active?");

/* 
{
    open/active:
    {
        battery: 193
        missing adult: 9
    }

}
*/




// Skip any objects with the word "Supplement" to avoid duplicates.
let supplementRegex = /[sS]upplement/m

// Goal of this loop is to count each most common: Which is the most common incident with open cases?
// 1. Iterate through each object in objectArray. 
for (let i = 0; i < objectArray.length; i++) {
    // 2. Assign current object to a variable.
    let entryObject = objectArray[i];
    // 3. Check if the object contains the word supplement.
    if (supplementRegex.test(entryObject['Report Type Description'])) {
        continue;
    }
    // 4. Assign current object values to variables
    let resolutionName = entryObject['Resolution'];
    let subcategoryName = entryObject['Incident Category'];

    // 5. Check if there is an object that represents a Resolution
    if (resultsObject.hasOwnProperty(resolutionName)) {
        // Checks if Resolution object has a property of the current object's subcategory 
        if (resultsObject[resolutionName].hasOwnProperty(subcategoryName)) {
            // If subcategory exists, then increment by 1
            resultsObject[resolutionName][subcategoryName] += 1;
        } else {
            // No resolutionName with that specific subcategoryName property, so we would create a new resolutionName with a subcategoryName property inside resultsObject and assign it 1 to start the count.
            resultsObject[resolutionName][subcategoryName] = 1;
        }

    } else {
        // If there is no Resolution object by that name, then create an object for it.
        resultsObject[resolutionName] = {};
        // Also create a property for this object with the current object's subcategory and assign a 1.
        resultsObject[resolutionName][subcategoryName] = 1;
    }
}

// Iterate through each element in resultsObject (element is an object)...
for (let resolution in resultsObject) {
    // Initiate counter variables
    let openHighest = 0;
    let openHighestName = '';
    let openLowest = null;
    let openLowestName = '';

    console.log('\n' + resolution.toUpperCase());

    // Iterate through each Resolution...
    for (let count in resultsObject[resolution]) {
        // Assign the resolution count to tally variable
        let tally = resultsObject[resolution][count];
        if (openLowest === null) {
            openLowest = tally;
            openLowestName = count;
        }
        // Compare tally variable to next value to determine the lowest count.
        if (tally < openLowest) {
            openLowest = tally;
            openLowestName = count;
        }
        if (tally > openHighest) {
            openHighest = tally;
            openHighestName = count;
        }
    }

    // Print results
    console.log(`The highest is: ${openHighestName}: ${openHighest}`);
    console.log(`The lowest is: ${openLowestName}: ${openLowest}`);

    // Display any tied highest and lowest counts that match the current highest and lowest.
    for (let count in resultsObject[resolution]) {
        let tally = resultsObject[resolution][count];
        if (openHighest === tally && openHighestName !== count) {
            console.log(`Tied for highest is ${count}: ${tally}`);
        }
        if (openLowest === tally && openLowestName !== count) {
            console.log(`Tied for lowest is ${count}: ${tally}`);
        }
    }   
}    


// QUESTION 1 END



