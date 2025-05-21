const { Vehicle, Car, Motercycle } = require('./Vehicle');

const myVehicle = new Vehicle('TRUCK');
myVehicle.startEngine();

const myCar = new Car('TATA', 'SAFARI');
myCar.startEngine();

const myBike = new Motercycle('HARLEY', 'CRUSER');
myBike.startEngine();
