const fs = require('fs');
let dataset = fs.readFileSync('dataset.csv', 'utf-8');
let lineArray = dataset.split('\n');

let dataHeadings = lineArray[0].split(',');

// Irrelevant information
let ignoredIndexes = [0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 19, 20, 23, 24, 25, 26];
console.log(convertEntry(lineArray[5002]));





















// Makes each entry from the dataset readable.
function convertEntry(entry) {
    let dataArray = entry.split(',');
    let dataObject = {};
    dataHeadings.forEach(function (arrayElement, i) {
        if (ignoredIndexes.includes(i)) {
            return;
        }
        dataObject[arrayElement] = dataArray[i];
    });
    return dataObject;
}

// As it is, the quotation marks in the data entries are causing bugs in our code. This function detects those quotation marks.  
function quoteFix(entry) {
    let regex = /"/m;
    let results = regex.test(entry);

    if (results) {
        let entryArray = entry.split(',');
        let entryWithoutQuotes = [];

        for (let i = 0; i < entryArray.length; i++) {
            if (entryArray[i][0] === '"') {
                // Add the following array elements until closing quote into a string. Push the complete string into an array.
            } else {
                entryWithoutQuotes.push(entryArray[i]);
            }
        }
    } else {
        return entry;
    }
}
