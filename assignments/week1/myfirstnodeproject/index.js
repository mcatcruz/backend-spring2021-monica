const _ = require("lodash");

let jsRandom = Math.floor((Math.random() * 100) + 1);

let _Random = _.random(1,100);

let combinedArray = [1, 2, 3] + [4, 5, 6];

let combined_Array = _.concat([1, 2, 3], [4,5,6])

console.log(combinedArray);
console.log(combined_Array);