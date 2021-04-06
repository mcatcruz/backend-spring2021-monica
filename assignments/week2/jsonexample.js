const fs = require('fs');

// Can only hold one object per JSON file. 
// The way around this is to store objects within a main object.
fs.writeFileSync('myJSON.json', '', 'utf-8');

let myObject = {
    aString: "this is a string",
    aNumber: 100,
    aBoolean: true,
    anObject: {
        anotherNumber: 1,
        anotherString: "bai"
    },
    aFunction: function() {
        console.log('howdy');
    }
}
console.log(myObject);

let convertedObject = JSON.stringify(myObject);

fs.writeFileSync('myJSON.json', convertedObject, 'utf-8');

// READING JSON
let fileContents = fs.readFileSync('myJSON.json', 'utf-8');

let readObject = JSON.parse(fileContents); 

console.log(typeof readObject); // this will return a JS object
console.log(readObject); // this will not return the function because you can't save functions in JSON.
console.log(readObject.anObject.anotherNumber); // Accessing objects within main object is similar to using dot notation to access object properties. Expected output: 1