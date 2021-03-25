let handmadeObject = {
    firstName: "Monica",
    lastName: "Cruz",
    position: "Student",
    location: "San Francisco",
    active: true,
    doWork: function () {
        console.log(this.firstName + "is now working!");
    }
 };

class Student {
    constructor(firstName, lastName, position, location, active = false) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.location = location;
        this.active = active;
        this.checkValues();
        this.created();
    }

    // These are all methods 

    checkValues() {
        if (!(typeof this.active === 'boolean')) {
            console.log("This object has an improper active value!")
        }
    }

    created() {
        console.log("A new object is born!");
    };

    doWork(hours) {
        console.log(`${this.firstName} works for ${hours} hours.`);
    }

    goToSleep(hours) {
        console.log(`${this.firstName} goes to sleep for ${hours} hours.`);
    }
}

let myFirstFactoryObject = new Student("Tommy", "Darmody", "student", "Atlantic City", true);
let secondStudent = new Student("Ada", "Shelby", " student", "London");

// secondStudent.lastName = 'Shelby';
// secondStudent.firstName = 'Ada';

// secondStudent.nonExistingProperty = 10; // better to add this property as part of constructor method than using dot notation to prevent inconsistencies.

myFirstFactoryObject.doWork(5);
secondStudent.doWork(20);
secondStudent.goToSleep(2);

console.log(myFirstFactoryObject);
console.log(secondStudent);

let myStringLiteral = `Hello, my name is ${secondStudent.firstName}. How are you doing today?`;

console.log(myStringLiteral);

console.log(myFirstFactoryObject, secondStudent);