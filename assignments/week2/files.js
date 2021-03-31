// Ensures that the js file can read and write files
const fs = require('fs');

// Holds the terminal's command line arguments in an array. THESE ARE NOT FUNCTION ARGUMENTS.
console.log(process.argv);

// Four actions when it comes to files: CRUD (Create, Read, Update, Delete)
// CRUD operations do not ask permission prior to performing the action.

// Create a file using Node FS module. writeFileSync will replace existing files with same name.
fs.writeFileSync("new_file.txt", "Hello world", "utf-8");

let myCode = `
console.log('How are you doing?');

console.log(100*100);
`;

// argument order: filename, contents, character set.
fs.writeFileSync('javascriptcode.js', myCode, "utf-8");
console.log('Finished creating files');

// Read Files with Node FS

// argument order: filename, character set.
let fileContents = fs.readFileSync('new_file.txt', 'utf-8');
console.log(`This is the new_file.txt being logged to the console: ${fileContents}`);

let veggieEssay = fs.readFileSync('veggie_essay.txt', 'utf-8');

// Code to detect how many words are in veggieEssay.
let veggieEssayArray = veggieEssay.split(' ');
console.log(`The essay has ${veggieEssayArray.length} words.`);

// Reads booleans.js hoping that it will read it as an actual boolean.
let tryingToReadDataTypes = fs.readFileSync('booleans.js', 'utf-8');
// Anythihng external to JS will automatically be imported as a string.
console.log(typeof tryingToReadDataTypes);