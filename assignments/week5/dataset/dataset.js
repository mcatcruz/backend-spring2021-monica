const {performance} = require('perf_hooks');
let t0 = performance.now();

const fs = require('fs');

let dataset = fs.readFileSync('dataset.csv', 'utf-8');

// Converts each dataset row into an array. 
let lineArray = dataset.split('\n');
// This is the very first row of the dataset, which are the headings.
let dataHeadings = lineArray[0].split(',');
// Initiate objectArray, which will hold objects. Each object is a key-value pair of dataHeading: row entry.
let objectArray = [];

// This loop goes through the entire dataset, creates objects out of each data entry, and then pushes each object into objectArray. 
// Output is an array of objects.
// Note: Alternatively, can store data in json so that this doesn't have to run all the time. This would be ideal for massive datasets, bc running this loop to create objects every time will affect the program's efficiency.
for (let i = 0; i < lineArray.length; i++) {
    objectArray.push(convertEntry(lineArray[i], dataHeadings));
}

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

// QUESTION 1: What are the most common and least common types of incidents that are open/active?
// NOTE: Ignore any non-active/open entries, ignore any that have "Supplement" in their Report Type Description.

/* 
{
    open/active:
    {
        battery: 193
        missing adult: 9
    }

}
*/

// Removes information/empty space that is irrelevant to Question 1 from the array.
objectArray.pop();
objectArray.shift();

// (Initiate a counter variable?) This is an object to hold all counts.
let resultsObject = {};


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
        // ***** Checks if Resolution object has a property of the current object's subcategory 
        if (resultsObject[resolutionName].hasOwnProperty(subcategoryName)) {
            // Why are we adding 1?
            resultsObject[resolutionName][subcategoryName] += 1;
        } else {
            // No resolutionName with that specific subcategoryName property, so we would create a new resolutionName with a subcategoryName property inside resultsObject.
            resultsObject[resolutionName][subcategoryName] = 1;
        }

    } else {
        // If there is no Resolution object by that name, then create an object for it.
        resultsObject[resolutionName] = {};
        // Also create a property for this object with the current object's subcategory and assign a 1.
        resultsObject[resolutionName][subcategoryName] = 1;
    }
}
console.log('What are the most and least common types of incidents that are open or active?');

for (let resolution in resultsObject) {
    let openHighest = 0;
    let openHighestName = '';
    let openLowest = null;
    let openLowestName = '';

    console.log('\n' + resolution.toUpperCase());

    for (let property in resultsObject[resolution]) {
        let tally = resultsObject[resolution][property];
        if (openLowest === null) {
            openLowest = tally;
            openLowestName = property;
        }
        if (tally < openLowest) {
            openLowest = tally;
            openLowestName = property;
        }
        if (tally > openHighest) {
            openHighest = tally;
            openHighestName = property;
        }
    }
    console.log(`The highest is: ${openHighestName}: ${openHighest}`);
    console.log(`The lowest is: ${openLowestName}: ${openLowest}`);

    for (let property in resultsObject[resolution]) {
        let tally = resultsObject[resolution][property];
        if (openHighest === tally && openHighestName !== property) {
            console.log(`The highest is ${property}: ${tally}`);
        }
        if (openLowest === tally && openLowestName !== property) {
            console.log(`The lowest is ${property}: ${tally}`);
        }
    }   
}    


// QUESTION 1 END

// QUESTION 2: What day of the week (on average) is the most active? What hour (on average) for the week?

// Incident Time and Incident Day of Week

let dayCounter = {
    'Sunday': 0,
    'Monday': 0,
    'Tuesday': 0,
    'Wednesday': 0,
    'Thursday': 0,
    'Friday': 0,
    'Saturday': 0
};

let hourCounter = [];

objectArray.forEach(function (entry) {
    let hour = parseInt(entry['Incident Time'].split(':')[0]);
    if (!hourCounter[hour]) {
        hourCounter[hour] = 1;
    } else {
        hourCounter[hour]++;
    }

    switch (entry['Incident Day of Week']){
        case 'Sunday':
            dayCounter.Sunday++;
            break;
        case 'Monday':
            dayCounter.Monday++;
            break;
        case 'Tuesday':
            dayCounter.Tuesday++;
            break;
        case 'Wednesday':
            dayCounter.Wednesday++;
            break;
        case 'Thursday':
            dayCounter.Thursday++;
            break;
        case 'Friday':
            dayCounter.Friday++;
            break;
        case 'Saturday':
            dayCounter.Saturday++;
            break;
    }
});

let highestCount = 0;
let highestDay;

for (let day in dayCounter) {
    if (dayCounter[day] > highestCount) {
        highestCount = dayCounter[day];
        highestDay = day;
    }
};

console.log(`The day with the most activity is ${highestDay}`);
// console.log(hourCounter);

let highestHour = Math.max(...hourCounter);
let highestIndex = hourCounter.indexOf(highestHour);

if (highestIndex >= 12) {
    console.log(`The most active hour of the day is ${highestIndex === 12 ? '12' : highestIndex - 12} PM.`);
} else {
    console.log.log(`The most active hour of the day is ${highestIndex === 0 ? '12' : highestIndex} AM.`);
}

// QUESTION 2: END

// QUESTION 3: Which neighborhood is the most active and least active? Supervisor district (with and without supplements)?

// Note: highestDistrictName is actually a numerical value that represents the 11 San Francisco districts..

let resultsQuestion3 = {};
let resultsQuestion3District = {};

for (let i = 0; i < objectArray.length; i++) {
    let entry = objectArray[i];
    if (resultsQuestion3.hasOwnProperty(entry['Analysis Neighborhood'])) {
        resultsQuestion3[entry['Analysis Neighborhood']] +=1;
    } else {
        resultsQuestion3[entry['Analysis Neighborhood']] = 1;
    }
    if (resultsQuestion3District.hasOwnProperty(entry['Supervisor District'])) {
        resultsQuestion3District[entry['Supervisor District']] += 1;
    } else {
        resultsQuestion3District[entry['Supervisor District']] = 1;
    }
}

let highestNeighborhoodCount = 0;
let highestNeighborhoodName;

for (let neighborhood in resultsQuestion3) {
    if (resultsQuestion3[neighborhood] > highestNeighborhoodCount) {
        highestNeighborhoodCount = resultsQuestion3[neighborhood];
        highestNeighborhoodName = neighborhood;
    }
}

let highestDistrict = 0;
let highestDistrictName;

for (let district in resultsQuestion3District) {
    if (resultsQuestion3District[district] > highestDistrict) {
        highestDistrict = resultsQuestion3District[district];
        highestDistrictName = district;
    }
}

console.log(`The neighborhood with the highest activity is the ${highestNeighborhoodName} with ${highestNeighborhoodCount} entries.`);
console.log(`The district with the highest activity is District ${highestDistrictName} with ${highestDistrict} entries.`);

//QUESTION 3:  END

// QUESTION 4: How many open/active vs. closed? Per Year? Per Month?

let activeClose = {};

for (let i = 0; i < objectArray.length; i++) {
    let entry = objectArray[i];
    const date = objectArray[i]['Incident Date'];
    const year = date.split('/')[0];

    if (!activeClose.hasOwnProperty(year)) {
        activeClose[year] = {};
    }
    if (activeClose[year].hasOwnProperty(entry['Resolution'])) {
        activeClose[year][entry['Resolution']] += 1;
    } else {
        activeClose[year][entry['Resolution']] = 1;
    }
}

for (let year in activeClose) {
    console.log(`For the year ${year}, we had ${activeClose[year]['Open or Active']} for Open or Active, and ${activeClose[year]['Cite or Arrest Adult']} for Cite or Arrest.`);
}

// QUESTION 5: What street has the most activity?

let streets = {};
for (let i = 0; i < objectArray.length; i++) {
    let entry = objectArray[i];
    let streetArray = entry['Intersection'].split('\\');
    streetArray = streetArray.map(function (street) {
        return stripSpace(street);
    });

    for (let i = 0; i < streetArray.length; i++) {
        let street = streetArray[i];
        // or if it starts with UNNAMED
        if (street === '' || street.includes('UNNAMED')) {
            continue;
        }
        if (streets.hasOwnProperty(street)) {
            streets[street] += 1;
        } else {
            streets[street] = 1;
        }
    }
}

let highestStreetCount;
let highestStreetName;

for (let street in streets) {
    if (!highestStreetCount) {
        highestStreetCount = streets[street];
    }
    if (streets[street] < highestStreetCount) {
        highestStreetCount = street[street];
        highestStreetName = street;
    }
}
console.log(`The street with the most police activity is ${highestStreetName} with a total of ${highestStreetCount} incidents.`)
console.log(streets['MISSION ST']);

//QUESTION 5: END

function stripSpace(text) {
    text = text.replace(/^ /g, '');
    text = text.replace(/ $/g, '');
    return text;
}

// Converts each dataset entry into an object.
function convertEntry(entry, titles) {
    let dataArray =  quoteFix(entry);
    let dataObject = {};
    let ignoredIndexes = [0, 5, 6, 9, 10, 11, 12, 13, 19, 20, 23, 24, 25, 26];
    titles.forEach(function (arrayElement, i) {
        if (ignoredIndexes.includes(i)) {
            return;
        }

        // Convert Incident Number value from string to number
        // Why are we doing this?
        if (i === 8 || i === 7) {
            dataObject[arrayElement] = parseInt(dataArray[i]);
            return;
        }
        dataObject[arrayElement] = dataArray[i];
    });
    return dataObject;
}

// The quotation marks in dataset.csv are causing bugs in our code. quoteFix() detects those quotation marks so that the entry can be reformatted.  
// Parameter: entry is a STRING.
function quoteFix(entry) {
    // Regex pattern for detecting quotation mark.
    let regex = /"/m;
    // Tests entry for quotation marks.
    let results = regex.test(entry);
    // Turns argument into an array. The elements are strings.
    let entryArray = entry.split(',');

    // Reformats entry if quotation marks are detected. 
    if (results) {
        // This will hold the fully reformatted entry.
        let entryWithoutQuotes = [];
        // closingQuoteIndex will hold the index of the closing quotation mark. Assigned -1 because indexes start at 0. 
        let closingQuoteIndex = -1;

        // Double for loop to detect the starting and closing quotation marks. 
        // This only works for one dataset entry. See line 12 for the loop that iterates through entire dataset.

        // Iterate through each element in entryArray. 
        for (let i = 0; i < entryArray.length; i++) {

            // **** If element is the ending quotation mark... 
            if (i <= closingQuoteIndex) {
                // ???
                i = closingQuoteIndex;
                // reset closingQuoteIndex to -1
                closingQuoteIndex = -1;
                continue;
            }
            // Assign current element to value.
            let value = entryArray[i];

            // Test if value is a quotation mark. This indicates a starting quotation mark.
            if (value[0] === '"') {
                // ***** Add element to completeString. completeString holds the fixed value in the end of scope.
                let completeString = value + ",";

                // Iterate through each element within entryArray, starting with the element AFTER the starting quotation mark. Note that the for loop starts at j = i+1. 
                // Goal: Find the ending quotation mark.
                for (let j = i + 1; j < entryArray.length; j++) {
                    // Assign current element to endingValue.
                    let endingValue = entryArray[j];

                    // Checks if endingValue is a quotation mark.
                    if (endingValue[endingValue.length - 1] === '"') {
                        // Concatenate endingValue to completeString.
                        // completeString += endingValue;
                        completeString = completeString + endingValue;
                        // Reeassign j to closingQuoteIndex. 
                        closingQuoteIndex = j;
                        break;
                    } else {
                        // If endingValue is not a quotation mark, concatenate it to completeString along with a comma. 
                        // Continue iterating through inner loop until ending quotation mark is detected.
                        completeString = completeString + endingValue + ",";
                    }
                }
                // Push completeString to entryWithoutQuotes. 
                // removeQuotes function will remove 0th-index element and final-index, which are both quotation marks. 
                entryWithoutQuotes.push(removeQuotes(completeString));
                // Add the following array elements until closing quote into a string. Push the complete string into an array.
            } else {
                // If argument is not a quotation mark, then push the argument into entryWithoutQuotes as is.
                entryWithoutQuotes.push(value);
            }
        }
        return entryWithoutQuotes;
    } else {
        // If argument does not contain any quotation marks (i.e. fails regex.test()), then split the argument into an array as is. 
        return entryArray;
    }
}

// This function removes the 0th-index and final-index elements. These are the starting and ending quotation marks. 
// Returns a STRING. 
function removeQuotes(text) {
    let textArray = text.split('');
    textArray.pop();
    textArray.shift();
    return textArray.join('');
}

let t1 = performance.now();

console.log(`This script took ${t1-t0} milliseconds to excute.`);
