const EventEmitter = require('events');

const eventEnums = {
	STATUS_CHANGED: 'statusChange',
	BRIGHTNESS_CHNAGES: 'brightnessChnaged',
	INVALID_BRIGHNESS: 'invalidBrightness',
	TEMPERATURE_CHANGED: 'temperatureChanged',
	HEATING_MODE_ACTIVE: 'heatingModeActive',
};

class SmartDevice extends EventEmitter {
	constructor(id, name) {
		super();
		this.id = id;
		this.name = name;
	}

	reportStatus() {
		this.emit(
			eventEnums.STATUS_CHANGED,
			this.id,
			this.name,
			'Device is reporting status'
		);
	}
}

class SmartLight extends SmartDevice {
	constructor(id, name, brightness) {
		super(id, name);
		this.brightness = brightness;
	}

	setBrightness(newBrightness) {
		if (newBrightness > 0 && newBrightness < 100) {
			this.brightness = newBrightness;
			this.emit(
				eventEnums.BRIGHTNESS_CHNAGES,
				this.id,
				this.name,
				newBrightness
			);
			super.reportStatus();
		} else {
			this.emit(
				eventEnums.INVALID_BRIGHNESS,
				this.id,
				this.name,
				newBrightness
			);
		}
	}
}

class SmartThermostat extends SmartDevice {
	constructor(id, name, targetTemperarture) {
		super(id, name);
		this.targetTemperarture = targetTemperarture;
	}

	setTemperature(newTemp) {
		this.targetTemperarture = newTemp;

		this.emit(eventEnums.TEMPERATURE_CHANGED, this.id, this.name, newTemp);
		super.reportStatus();

		if (newTemp > 25) {
			{
				this.emit(
					eventEnums.HEATING_MODE_ACTIVE,
					this.id,
					this.name,
					newTemp
				);
			}
		}
	}
}

module.exports = {
	SmartDevice,
	SmartLight,
	SmartThermostat,
	eventEnums,
};
