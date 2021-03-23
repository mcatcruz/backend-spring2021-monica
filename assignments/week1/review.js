// Variables are used to hold data
var myFirstVariable = 'Hello world!';
let myFirstVariable = null;

//A variable that doesn;t change once you have assigned a value
const myFirstConstVariable = null;

// I  cannot write the following line as it will break the script. Constant variable can only be assigned once and NOT reassigned.
//myFirstconstVariable = 9;


//Data Types
1000;
'1000 is not a number!';
'<p>This looks like HTML, but it is just a string to Javascript</p>'
true;
false;

//Arrays & Objects
let myArray = [];
let myArray2 = new Array(10);

myArray[0] = 'hello';
myArray[1000] = 'goodbye';

let myObject = [];
let myObject2 = new Object();

// Comparison Operators - These will return Booleans
// == compares and COERCES VALUES if different datatypes
// === compares values AND datatypes
// > or >=
// < or <=
// || or !==

// Mathematical Operators
// +, -, /, *, %

// If statements
if (false) {}
if (false) {} else {}

// this will short-circuit once condition is met
if (false) {} else if (false) {} else if (false) {} else if (false) {} 

// multiple if statements without 'else' will run even if condition is already met by the first if statement
if (false) {} 
if (false) {}

if (false) {} else if (false) {} else ()

// Loops

// Similar as an if statement, but once done, will run again if condition is true.
while (false) {};

do {} while (false);

for (let i=0; i < 10; i++) {};

// Functions

let actualPiNumber = Math.PI;

function myFunction() {

}

myFunction();

let a = 100;
let b = a;
let c = b;
let d = c;

var z = myFunction;
var y = z;
var x = y;

// Test if we can pass function definitions when we use "Traditional" function definition.
x();

function myFunction2(myFirstParam) {
    myFirstParam;
    return null;
 }

myFunction2('Hello world!');
myFunction2('goodbye world!');