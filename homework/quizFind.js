// Create a function called quizFind().
// 1. Parameters: array, element to search for.
// 2. Output:
    // If the element is within the array: return index of the second parameter
    // If the element is not within the array: return -1
// 3. quizFind() should work with any data type

function quizFind(array, element) {
    // 1. Need a tracking variable
    let indexOfElement = 0;
    // 2. Need to iterate through the array
    for (let i = 0; i < array.length; i++) {
      // 3. If element is found, set this equal to the tracking variable.
      if (array[i] === element) {
        // 4. Return the tracking variable.
        return indexOfElement = i;
      }
    }
    return -1;
}

// console.log(quizFind([3, 4, 10], 10));
// console.log(quizFind([1, 1, 0, 3, 5], 6));
// console.log(quizFind(['apple','dog','banana'], 'dog')); //expected output: 1
// console.log(quizFind([true, false, 'three', 70, 'none'], 6)); //expected output: -1

// Create a function called quizLotto().
// 1. Parameters: none.
// 2. Output: return an array of 6 numbers.
      // The first five numbers should be between 1 and 59. They cannot repeat.
      // The last number can only be between 1 and 35.

// Helper Functions
// Creates an array of numbers to be shuffled.
function createArray(maxNumber) {
  let numbersArray = [];
  for (let i = 1; i < maxNumber + 1; i++) {
    numbersArray.push(i);
  }
  return numbersArray;
}

// Using Fisher-Yates shuffle to ensure no numbers are repeated.
function randomize(max) {
  let array = createArray(max);
  // In each iteration, a random value (randomNumber) is chosen, then swapped with the current interation (i).
  for (let i = array.length-1; i > 0; i--) {
    let randomNumber = Math.floor(Math.random() * i);
    let temp = array[i];
    array[i] = array[randomNumber];
    array[randomNumber] = temp;
  }
  return array;
}
// End of Helper Functions

function quizLotto() {
  // 1. Need an array for the final random numbers.
  let finalArray = [];
  // 2. Need a tracking variable to temporarily assign the number that will be pushed into finalArray.
  let number = null;
  // 3. Randomize numbers for the first five numbers and for the sixth number.
  const lotto = randomize(59);
  const powerball = randomize(35);
  // 4. Use a loop to add numbers to finalArray.
  for (let i = 0; i < 6; i++) {
    if (i < 5) {
      number = lotto[i];
      finalArray.push(number);
    } else {
      number = powerball[i];
      finalArray.push(number);
    }
  }
  // 5. Return finalArray;
  return finalArray;
  }
console.log(quizLotto());
console.log(quizLotto());
console.log(quizLotto());
console.log(quizLotto());
