// class = blueprint for making objects
// constructor() = function that runs whenever a new object is instantiated
class Vehicle {
    constructor(make, model, year, mileageMiles, topSpeedMph) {
        this.make = make;
        this.model = model;
        if (typeof year !== 'number') {
            console.log('The year value should be a number. Please check this value.');
        }
        this.year = year;
        this.lastService = new Date();
        this.mileageMiles = mileageMiles;
        this.topSpeedMph = topSpeedMph;
    }
    // Custom methods can be made inside classes. These will be given to ALL objects that are instantiated by this class.
    service() {
        console.log('Fixing vehicle');
    }
}

// Classes can be further customized by extending. Bicycle is based on the vehicle.
// super() calls the PARENT's constructor method. MUST be the first in the child's constructor. 
class Bicycle extends Vehicle {
    constructor(make, model, year, type, mileageMiles, serial, gears) {
        super(make, model, year, mileageMiles, null);
        this.type = type;
        this.serial = serial;
        this.gears = gears;

    }

    // When custom methods in the child class have the same name as the parent's, the parent's custom method is overriden.
    service() {
        console.log('Fixing bicycle.');
    } 
}

class ElectricBicycle extends Bicycle {
    constructor(make, model, year, type, mileageMiles, serial, gears, kWh, topSpeedMph) {
        super(make, model, year, type, mileageMiles, serial, gears);
        this.kWh = kWh;
        this.topSpeedMph = topSpeedMph;
    }
    service() {
        console.log('Fixing e-bike.')
    }
}

class ElectricCar extends Vehicle {
    constructor(make, model, year, type, empg, mileageMiles, kWh, topSpeedMph, vin) {
        super(make, model, year, mileageMiles, topSpeedMph);
        this.type = type;
        this.empg = empg;
        this.kWh = kWh;
        this.vin = vin;
        this.currentCharge;
    }
}

class Car extends Vehicle {
    constructor(make, model, year, type, mpg, mileageMiles, tankSizeGallons, topSpeedMph, vin) {
        super(make, model, year, mileageMiles, topSpeedMph);
        this.type = type;
        this.mpg = mpg;
        this.vin = vin;
        this.tankSizeGallons = tankSizeGallons;
        this.currentFuel = tankSizeGallons;
    }
    travel(miles) {
        // Figures out how much fuel we will use based on how far we want to go.
        let fuelUsage = miles/this.mpg;

        // Ensures that current gas tank is sufficient for travel.
        if (miles > this.currentFuel * this.mpg) {
            console.log(`You've gone too far! Fuel tank is empty from traveling ${this.currentFuel * this.mpg} miles.`);
        
            // Because we can't go as far as requested, we will only go as far as the tank allows. 
            fuelUsage = this.currentFuel;
            miles = this.currentFuel * this.mpg;
        }

        // Modify the current fuel and total mileage of this car.
        this.currentFuel = this.currentFuel - fuelUsage;
        this.mileageMiles = this.mileageMiles + miles;

        console.log(`${this.make + " " + this.model} goes on a ${miles} mile trip!`);
    }

    refuel(gallons) {
        // Detects free space remaining in gas tank.
        let freeSpace = this.tankSizeGallons - this.currentFuel;

        // Ensures that we do not overfill the tank.
        if (gallons > freeSpace) {
            console.log(`That's too much fuel! Topped up the tank instead. ${this.make} ${this.model} was filled with ${freeSpace} gallons of gas.`);

            // Replace the requested amount with the maximum amount that can be added.
            gallons = freeSpace;
        }

        // Update the car's current fuel.
        this.currentFuel = this.currentFuel + gallons;
        console.log(`${this.make} ${this.model} was refueled with ${gallons} gallons of gas.`);
    }

    // Getters and setters are methods that allow us to quickly modify properties without directly modifying each property. 
    getFuel() {
        console.log(`${this.make} ${this.model} has ${this.currentFuel} gallons of gas.`);
    }
}

let car1 = new Car('Honda', 'Accord', 2010, 'sedan', 35, 110000, 14, 120, 'herpderp');

let car2 = new ElectricCar('Tesla', 'S', '2021', 'sedan', 112, 50, 80, 155, 'derpherp');

let bicycle1 = new Bicycle('Schwinn', 'Stingray', 2003, 'cruiser', 20000, 'something', 8 )

let bicycle2 = new Bicycle('Kona', 'Unit', 2014, 'mountain', 1000, 'flugle', 11, 1.4, 55);

// console.log(car1, car2, bicycle1, bicycle2);

//bicycle1.service();
//bicycle2.service();
//car1.service();
//car2.service();

console.log(car1);
car1.travel(1000000);
console.log(car1);
car1.refuel(1000);
car1.travel(140);
console.log(car1); 
car1.refuel(2);
console.log(car1);

let car3 = new Car('Kia', 'Sorento', 2011, 'SUV', 30, 135000, 18, 110, 'somesuch');

car3.travel(200);
car3.getFuel();
car3.travel(10);
car3.getFuel();
car3.refuel(2);
car3.getFuel();
car3.service();

// BAD IDEA to directly modify properties. USE methods/getters/setters instead.
// For example: car3.currentFuel = 1000;