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
      // The first five numbers should be between 1 and 59.
      // The last number can only be between 1 and 35.

function randomize(min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
}

function checkForRepeats(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; i < array.length; i++) {
      if (array[i] === array[j]) {
        array[i] = randomize(1, 59);
      }
    }
  }
}

function checkForNull(array) {
  for (let i = 0; i < 5; i++) {
    if (array[i] === null) {
      array[i] = randomize(1, 59);
    }
  }
}
function quizLotto() {
  // 1. Need an array for the final random numbers.
  let finalArray = [null, null, null, null, null];
  // 2. Need a tracking variable - this will be reassigned as one of the numbers in finalArray.
  let number = 0;
  // 3. Use a loop to assign a random number.
  for (let i = 0; i < 5; i++) {
    let randomLottoNumber = randomize(1, 59);
    if (number !== randomLottoNumber) {
      number = randomLottoNumber;
      finalArray[i] = number;
    }
  }
  // 4. Check that finalArray[0] through finalArray[4] doesn't contain null.
  checkForNull(finalArray);
  // 5. Check that finalArray[0] through finalArray[4] doesn't contain repeats.
  checkForRepeats(finalArray);

  // 5. Push the powerball number to finalArray.
  let powerball = randomize(1, 35);
  finalArray.push(powerball);
  // 6. Return finalArray;
  return finalArray;
  }
console.log(quizLotto());
