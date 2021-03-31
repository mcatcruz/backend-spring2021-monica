let arguments = process.argv;
//console.log(arguments);

let request = arguments[2];

if (request === 'hello') {
    console.log('howdy!');
} else if (request === 'weather') {
    console.log('look outside the window!');
} else {
    console.log('beg pardon?');
}