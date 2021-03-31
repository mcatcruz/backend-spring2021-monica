const fs = require('fs');

// // Read the file based on the argument in the command. 
// let fileContents = fs.readFileSync(arguments[2], 'utf-8');

// console.log(fileContents);

// Assigns command line arguments array to arguments variable.
const arguments = process.argv;

// Assigns third command line argument to variable called filename.
let filename = arguments[2];

// Checks if arguments[2] exists 
if (!filename) {
    console.log(`
    Welcome to my file reader! Please provide the file name you want to read after the command.

    Example:
            node filereader.js myFile.txt
    `);
    return;
}

// Checks if file exists.
if (fs.existsSync(filename)) {
    // Read the file based on the argument in the command.
    let fileContents = fs.readFileSync(filename, 'utf-8');
    console.log(fileContents);
} else {
    console.log('File not found. Please check the filename.');
}