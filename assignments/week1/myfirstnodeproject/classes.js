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
    constructor(firstName, lastName, position, location, active = false, energyHours) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.location = location;
        this.active = active;
        this.energyHours = 16; // hours of energy
        this.checkValues();
        this.sayHello();
        // this.created();
    }

    // These are all methods 

    checkValues() {
        if (!(typeof this.active === 'boolean')) {
            console.log("This object has an improper active value!")
        }
        if (this.energyHours < 0) {
            this.energyHours = 0;
        } else if (this.energyHours > 24) {
            this.energyHours = 24;
        }
    }
    
    sayHello() {
        console.log(`Hello! My name is ${this.firstName}. I am a ${this.position} in ${this.location}. How are you doing today?`)
    }
    // created() {
    //     console.log("A new object is born!");
    // };

    doWork(hours) {
        if (!(Number.isNaN(parseInt(hours)))) {
            hours = parseInt(hours);
        } else {
            console.log('The value for hours is invalid. Can\'t assign work.');
            return;
        }

        if (this.energyHours - hours < 0) {
            console.log(`${this.firstName} does not have that much energy! They will work for ${this.energyHours} hours instead.`);

            // This keeps track of how many hours they can work
            hours = this.energyHours;

            // This reduces energyHours to zero bc they've used it all
            this.energyHours = 0;
        } else {
            this.energyHours = this.energyHours - hours;
        }
        console.log(`${this.firstName} works for ${hours} hours. They have ${this.energyHours} hours of energy left.`);
    }

    goToSleep(hours) {
        if (!(Number.isNaN(parseInt(hours)))) {
            hours = parseInt(hours);
        } else {
            console.log('The value for hours is invalid. Can\'t assign work.');
            return;
        }
        if (hours + this.energyHours > 24) {
            let maxSleepHours = 24 - this.energyHours;
            console.log(`${this.firstName} does not need to sleep for that long. They will sleep for ${maxSleepHours} hours instead.`);
            hours = maxSleepHours;
        }
        this.energyHours += hours
        console.log(`${this.firstName} goes to sleep for ${hours} hours. They have ${this.energyHours} hours of energy left.`);

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

let thirdStudent = new Student ("Carmela", "Soprano", "student", "New Jersey")
thirdStudent.doWork(4);

secondStudent.checkValues();

// console.log(myFirstFactoryObject);
// console.log(secondStudent);
// let myStringLiteral = `Hello, my name is ${thirdStudent.firstName}. How are you doing today?`;
// console.log(myStringLiteral);
// console.log(myFirstFactoryObject, secondStudent, thirdStudent);