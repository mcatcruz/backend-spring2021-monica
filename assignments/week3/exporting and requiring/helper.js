function factor(num1, num2) {
    let total = 0;
    for (let i = num1; i <=num2; i++) {
        total += i;
    }
    console.log(`The factorial for ${num1} and ${num2} is ${total}.`);
    return total;
}

function add(num1, num2) {
    return num1 + num2;
}

//Keeps password secure 
let superSecretPassword = '123456'

module.exports = {
    factorial: factor,
    add,
    password: superSecretPassword
}