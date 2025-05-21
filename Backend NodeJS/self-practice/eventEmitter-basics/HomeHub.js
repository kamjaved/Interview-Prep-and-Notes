const { eventEnums } = require('./SmartDevice');

class HomeHub {
	constructor(name) {
		this.name = name; // Correctly initializes the hub's name
	}

	connectDevice(device) {
		// 'device' is already an EventEmitter (SmartLight or SmartThermostat instance).
		/* NOTE: Since we are using traditional function not arrow func for the listner even that was causing alittle glitch
     we expect to log Hub name nor device name but in console we were getting devicename like 
     '[Philips Hue - Hub]' instead of '[Central Hub - Hub]'
     [Nest Thermostat - Hub] instead of '[Central Hub - Hub]' so to fix this we either have to bind this or 
     use arrow function so i have used arrow one to fix this */

		//---LEAVING OLD CODE FOR REFREANCE

		// device.on(eventEnums.STATUS_CHANGED, function (id, deviceName, msg) {
		// 	console.log(
		// 		`[${this.name} - Hub] ${deviceName} (${id}) is triggered & ${msg}`
		// 	);
		// });

		device.on(eventEnums.STATUS_CHANGED, (id, deviceName, msg) => {
			console.log(
				`[${this.name}] ${deviceName} (${id}) is triggered & ${msg}`
			);
		});

		device.on(eventEnums.BRIGHTNESS_CHNAGES, (id, name, newBrightness) => {
			console.log(
				`[${this.name}] ${name} (${id}) brightness changed to ${newBrightness} lumens`
			);
		});

		device.on(eventEnums.INVALID_BRIGHNESS, (id, name, newBrightness) => {
			console.log(
				`[Error:] brightness should be between 1-100 lumens. Given Value is ${newBrightness} lumens`
			);
		});
		device.on(eventEnums.TEMPERATURE_CHANGED, (id, name, newTemp) => {
			console.log(
				`[${this.name}] ${name} (${id}) temperature changed to ${newTemp} °C`
			);
		});

		device.on(eventEnums.HEATING_MODE_ACTIVE, (id, name, newTemp) => {
			console.log(
				`[${this.name}] ${name} (${id}) heating mode activated at ${newTemp}°C`
			);
		});
	}
}

module.exports = HomeHub;
