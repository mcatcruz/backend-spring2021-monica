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

// This loop goes through the entire dataset, creates objects out of each data entry, and then pushes each object into objectArray. Output is an array of objects.
for (let i = 0; i < lineArray.length; i++) {
    objectArray.push(convertEntry(lineArray[i], dataHeadings));
}

// lines to test, 45, 5002, 6100

// let testTitles = [0, 1, 2, 3, 4, 5, 6, 7, 8]
// let testString = '0, 1, 2, "3, 4", 5, 6, 7, 8';


console.log(objectArray[6100])
// 5/4 - still encountering same issue from 5/3?



















// Converts each dataset entry into an object.
function convertEntry(entry, titles) {
    let dataArray =  quoteFix(entry);
    let dataObject = {};
    let ignoredIndexes = [0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 19, 20, 23, 24, 25, 26];
    titles.forEach(function (arrayElement, i) {
        if (ignoredIndexes.includes(i)) {
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
                let completeString = value + ", ";

                // Iterate through each element within entryArray, starting with the element AFTER the starting quotation mark. Note that the for loop starts at j = i+1. 
                // Goal: Find the ending quotation mark.
                for (let j= i +1; j < entryArray.length; j++) {
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

console.log(`This script took ${t1-t0} milliseconds to excute.`)
