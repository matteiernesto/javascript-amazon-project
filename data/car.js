// The Car Object
class Car {
    // Fields
    #defaultSpeed = 70;
    #topSpeed = 200;
    #isMoving;
    #brand;
    #model;
    #speed = 0;
    #isTrunkOpen; // True = open, False = closed

    // Basic constructor that takes in all the parameters needed
    constructor(brand, model, speed){
        this.#brand = brand;
        this.#model = model;
        this.#speed = this.#checkSpeed(speed);
    }

    // Sets the top speed - procedure
    setTopSpeed(topSpeed){
        this.#topSpeed = topSpeed;
    }

    // Check if the speed is between 0 and 200 - function
    #checkSpeed(speed){
        // If the speed is not valid, I'll return a default value
        return speed >= 0 && speed <= this.#topSpeed ? speed : this.#defaultSpeed;
    }

    // Displays the internal state of the object - procedure
    displayInfo(){
        console.log(`${this.#brand} ${this.#model}, ${this.#speed} km/h, trunk open ${this.#isTrunkOpen}`);
    }

    // Increases the speed of the car - procedure
    go(){
        this.#speed+=5;
        this.#isMoving = true;
    }

    // Decreases the speed of the car - procedure
    break(){
        this.#speed-=5;
        this.#isMoving = false;
    }

    // Opens the trunk - procedure
    openTrunk(){
        if(!this.#isMoving) this.#isTrunkOpen = true;
    }

    // Closes the trunk - procedure
    closeTrunk(){
        this.#isTrunkOpen = false;
    }
}

// The RaceCar Object
class RaceCar extends Car {
    // Fields
    #acceleration;

    // Basic constructor that takes in the parameter of the specified class and the ones of the super class
    constructor(brand, model, speed, acceleration){
        super(brand,model,speed);
        this.#acceleration = acceleration;
    }

    // Increases the acceleration of 5 and sets the top speed to 300 - procedure
    go(){
        this.#acceleration+=5;
        super.setTopSpeed(300);
    }
}

// Create 2 new car objects
let car1 = new Car('Toyota','Corolla',700);
let car2 = new Car('Tesla','Model 3',220);

// Log the two
console.log(car1)
console.log(car2)

// Decrease and increase the speed
car1.go()
car2.break()

// Open and close the trunk
car1.closeTrunk()
car2.openTrunk()

// Display the information about this cars
car1.displayInfo()
car2.displayInfo()

// Creates a new RaceCar
let raceCar = new RaceCar('McLaren','F1',200,20);