const HomeHub = require('./HomeHub');
const { SmartLight, SmartThermostat } = require('./SmartDevice');

const centralHub = new HomeHub('Central Hub'); // Added a name for clarity in logs

const smartLightForCentralHub = new SmartLight('CHSL001', 'Philips Hue', 50); // Correctly initialized
const thermoStatForCentralHub = new SmartThermostat(
	'CHST001',
	'Nest Thermostat',
	18
); // Correctly initialized

centralHub.connectDevice(smartLightForCentralHub);
centralHub.connectDevice(thermoStatForCentralHub);

console.log(`\n--- Controlling Smart Light  --- CENTRAL HUB`);
smartLightForCentralHub.setBrightness(89);
smartLightForCentralHub.setBrightness(10); // Another change
smartLightForCentralHub.setBrightness(105); // Error case

console.log('\n--- Controlling Smart Thermostat --- CENTRAL HUB');
thermoStatForCentralHub.setTemperature(21); // No heating mode
thermoStatForCentralHub.setTemperature(28); // Heating mode active
thermoStatForCentralHub.setTemperature(24); // Back to normal

//-----------PRIMARY HUB (EXPERIMENTAL)------------------
//----creating  a new instance just checking------

const primaryHub = new HomeHub('Primary Hub');

const smartLightForPrimaryHub = new SmartLight('PHSL001', 'Philips Eva', 47); // Correctly initialized
const thermoStatForPrimaryHub = new SmartThermostat(
	'PHST001',
	'Rusk Thermostat',
	19
); // Correctly initialized

primaryHub.connectDevice(smartLightForPrimaryHub);
primaryHub.connectDevice(thermoStatForPrimaryHub);

console.log('\n--- Controlling Smart Light --- PRIMARY HUB');

smartLightForPrimaryHub.setBrightness(75);
smartLightForPrimaryHub.setBrightness(120); // Error case

console.log('\n--- Controlling Smart Thermostat --- PRIMARY HUB');

thermoStatForPrimaryHub.setTemperature(20); // No heating mode
thermoStatForPrimaryHub.setTemperature(28); // Heating mode active
thermoStatForPrimaryHub.setTemperature(24); // Back to normal
