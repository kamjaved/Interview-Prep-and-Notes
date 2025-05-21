class Vehicle {
	constructor(name) {
		this.name = name;
	}

	startEngine() {
		console.log(`The engine of ${this.name} is starting...`);
	}
}

class Car extends Vehicle {
	constructor(name, modal) {
		super(name);
		this.modal = modal;
	}

	startEngine() {
		super.startEngine();
		console.log(`${this.name} Model: ${this.modal} is ready to drive!`);
	}
}

class Motercycle extends Vehicle {
	constructor(name, type) {
		super(name);
		this.type = type;
	}

	startEngine() {
		console.log(
			`Kicking the starter for ${this.name}...its ${this.type} type bike.`
		);
		super.startEngine();
	}
}

module.exports = {
	Vehicle,
	Car,
	Motercycle,
};
