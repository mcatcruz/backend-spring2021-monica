// Loads in the array with all entry objects.
const dataset = require("./dataset.js");
let objectArray = dataset.objectArray;

// QUESTION 2: What day of the week (on average) is the most active? What hour (on average) for the week is the most active?
// Incident Time and Incident Day of Week

console.log('What day of the week (on average) is the most active? What hour (on average) for the week is the most active?');

// Initiate an object that will hold the tally for each day
let dayCounter = {
    'Sunday': 0,
    'Monday': 0,
    'Tuesday': 0,
    'Wednesday': 0,
    'Thursday': 0,
    'Friday': 0,
    'Saturday': 0
};


// Initiate an empty array that will hold the count for every hour in a 24hr period. The index will represent the hour.
let hourCounter = [];

// Iterate through each element in the array (the element is an object)...
objectArray.forEach(function (entry) {

    // Assign value of Incident Time to the following variable:
    let hour = parseInt(entry['Incident Time'].split(':')[0]);

    // If the hour does not exist, then create it and assign 1.
    if (!hourCounter[hour]) {
        hourCounter[hour] = 1;
    } else {
        // Otherwise increment by 1.
        hourCounter[hour]++;
    }

    // Get the value of day of the week and match to a case. This will increment the Day in our Day count object.
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

// Initiate counter variable to determine most common Day
let highestCount = 0;
let highestDay;

// Compare each tally to each other to determine highest count.
for (let day in dayCounter) {
    if (dayCounter[day] > highestCount) {
        highestCount = dayCounter[day];
        highestDay = day;
    }
};


// Print results
console.log(`The day with the most activity is ${highestDay}`);

// Find the highest count value and assign it to the following variable:
let highestHour = Math.max(...hourCounter);
let highestIndex = hourCounter.indexOf(highestHour);

// Print results.
if (highestIndex >= 12) {
    console.log(`The most active hour of the day is ${highestIndex === 12 ? '12' : highestIndex - 12} PM.`);
} else {
    console.log.log(`The most active hour of the day is ${highestIndex === 0 ? '12' : highestIndex} AM.`);
}

// QUESTION 2: END