function stripSpace(text) {
    text = text.replace(/^ /g, '');
    text = text.replace(/ $/g, '');
    return text
}

// Converts each dataset entry into an object.
// Parameters: entry is a string and titles is a an array.
// Returns: dataObject, an object where the keys are titles[i]
function convertEntry(entry, titles) {
    // Call quoteFix to remove any existing quotation marks from entry. Returns an array.
    let dataArray =  quoteFix(entry);
    // Initiate an empty object.
    let dataObject = {};
    // Initiate an array of numbers.
    // Each number represents the index of irrelevant titles.
    let ignoredIndexes = [0, 5, 6, 9, 10, 12, 13, 19, 20, 23, 24, 25, 26];
    // Iterate through titles array. For each title in titles...
    // Parameters: title is a string within titles array. i is the iterator.
    titles.forEach(function (title, i) {
        // Check if i matches with any of the number elements in ignoredIndexes.
        if (ignoredIndexes.includes(i)) {
            return;
        }
        // Create dataObject key-value pairs. 
        // Keys are each title within titles array. 
        // Values are elements (strings) from dataArray
        dataObject[title] = dataArray[i];
    });
    return dataObject;
}

// The quotation marks in dataset.csv are causing bugs in our code. quoteFix() detects those quotation marks so that the entry can be reformatted.  
// Parameter: entry is a STRING.
// Returns: array of strings.
function quoteFix(entry) {
    // Regex pattern for detecting quotation mark.
    let regex = /"/m;
    // Tests entry for quotation marks.
    let entryTestedForQuotationMarks = regex.test(entry);

    // Reformats entry if quotation marks are detected. 
    if (entryTestedForQuotationMarks) {
        // Turns argument into an array. The elements are strings.
        let entryArray = entry.split(',');
        // Initiate an empty array that will hold the fully reformatted entry.
        let entryReformatted = [];
        // closingQuoteIndex will hold the index of the closing quotation mark. Assigned -1 because indices start at 0. 
        let closingQuoteIndex = -1;

        // Double for-loop to detect the starting and closing quotation marks. 
        // This only works for one dataset entry. Note that still need to loop through the entire dataset.

        // Iterate through each element in entryArray. 
        for (let i = 0; i < entryArray.length; i++) {

            // If ending quotation mark is detected... 
            if (i <= closingQuoteIndex) {
                // ...assign i to closingQuoteIndex. 
                i = closingQuoteIndex;
                // reset closingQuoteIndex to -1
                closingQuoteIndex = -1;
                continue;
            }
            // Test if current element is a quotation mark. This indicates a starting quotation mark.
            if (entryArray[0] === '"') {
                // Assign the element to completeString. completeString holds the fixed value in the end of scope.
                let completeString = entryArray[i] + ",";

                // Iterate through each element within entryArray, starting with the element AFTER the starting quotation mark. Note that the for-loop starts at j = i+1. 
                // Goal: Find the ending quotation mark.
                for (let j = i + 1; j < entryArray.length; j++) {

                    // Checks if endingValue is a quotation mark.
                    if (entryArray[j][entryArray[j].length - 1] === '"') {
                        // Concatenate endingValue to completeString.
                        // completeString += endingValue;
                        completeString = completeString + entryArray[j];
                        // Reeassign j to closingQuoteIndex. 
                        closingQuoteIndex = j;
                        break;
                    } else {
                        // If entryArray[j] is not a quotation mark, concatenate it to completeString along with a comma. 
                        // Continue iterating through inner loop until ending quotation mark is detected.
                        completeString = completeString + endingValue + ",";
                    }
                }
                // Push completeString to entryWithoutQuotes. 
                // removeQuotes function will remove 0th-index element and final-index, which are both quotation marks. 
                entryReformatted.push(removeQuotes(completeString));
                // Add the following array elements until closing quote into a string. Push the complete string into an array.
            } else {
                // If argument is not a quotation mark, then push the argument into entryReformatted as is.
                entryReformatted.push(entryArray[i]);
            }
        }
        return entryReformatted;
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

module.exports = {
    stripSpace,
    convertEntry
}