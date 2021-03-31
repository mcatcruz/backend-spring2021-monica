const fs = require('fs');

// TO-DO
// Detect what OS 

// Assigns command line arguments array to arguments variable.
const arguments = process.argv;

// Assigns third command line argument to variable called filename.
let filename = arguments[3];
let action = arguments[2];
let contents = arguments[4];
let char = 'utf-8';

// For the merge feature 
let filename2 = contents;
let mergedFilename = arguments[5];


// Checks if arguments[2] exists 
if (!filename) {
    console.log(`
    Welcome to my file reader! Please provide the file name you want to use after the command.

    Example:
            To read an existing file:   node filereader.js read myFile.txt
            To write a new file:        node filereader.js write newFile.txt
            To update an existing file: node filereader.js update myFile.txt
            To merge existing files:    node filereader.js merge file1.txt file2.txt mergedFile.txt
            To delete an existing file: node filereader.js delete myFile.txt
    `);
    return;
}
if (action === 'read') {
    // Checks if file exists.
    if (fs.existsSync(filename)) {
        // Read the file based on the argument in the command.
        let fileContents = fs.readFileSync(filename, char);
        console.log(fileContents);
    } else {
        console.log('File not found. Please check the file name.');
    }
} else if (action === 'write') {
    // Checking if the file already exists prevents accidentally overriding an important file.
    if (fs.existsSync(filename)) {
        console.log(`"${filename}" already exists. Please use a different file name.`)
    } else {
        fs.writeFileSync(filename, contents, char);
        console.log(`Finished writing the file ${filename}.`);
    }
} else if (action === 'update') {
    if (fs.existsSync(filename)) {
        fs.appendFileSync(filename, "\n" + contents, char);
    } else {
        // If file doesn't exist, then appendFileSync will create the file.
        console.log(`"${filename}" did not exist, so we created it for you.`)
        fs.appendFileSync(filename, contents, char);
    }
} else if (action === 'delete') {
    // 1. Check if file to delete exists.
    // 2. Use unlinkSync to delete the file.

} else if (action === 'merge') {
    if (fs.existsSync(filename) && fs.existsSync(filename2)) {
        // 1. Read the files.
        let fileContents = fs.readFileSync(filename, char);
        let fileContents2 = fs.readFileSync(filename2, char);
        // 2. Combine the files.
        let mergedContents = fileContents + "\n" + fileContents2;

        // 3. Create new file with merged contents inside.
        if (fs.existsSync(mergedFilename)) {
            console.log(`"${mergedFilename}" already exists.`);
        } else {
            fs.writeFileSync(mergedFilename, mergedContents, char);
            console.log('Mischief managed.');
        }
    } else {
        console.log('At least one of the files does not exist. Please double check.')
    }
}

// console.log(`You are currently running ${process.platform}`);

// Read the file based on the argument in the command. 
// let fileContents = fs.readFileSync(arguments[2], 'utf-8');

// console.log(fileContents);