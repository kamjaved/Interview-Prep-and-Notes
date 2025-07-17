const EventEmitter = require('events');

class SmartDevice extends EventEmitter {
	constructor(modal, name) {
		super();
		this.name = name;
		this.modal = modal;
	}

	reportStatus(name, modal) {
		this.emit('STATUS_CHANGED', name, modal);
		console.log(`DEVICE ${name} OF MODAL ${modal} IS REPORTING`);
	}
}

class SmarWatch extends SmartDevice {
	constructor(name, modal) {
		super(name, modal);
	}

	setHeartMonitor(bpm, name, modal) {
		this.emit('HEARTBEAT_START', bpm, name, modal);
	}
}

const realmeWatch = new SmarWatch();

realmeWatch.on('STATUS_CHANGED', (name, modal) => {
	console.log({ NAME: name, MODAL: modal });
});

realmeWatch.on('HEARTBEAT_START', (bpm, name, modal) => {
	console.log(
		`${name + ' ' + modal} Smart Watch Started Heart Moniter at ${bpm}: BPM`
	);
});

realmeWatch.reportStatus('Realme', 'EVO');
realmeWatch.setHeartMonitor('312', 'Realme', 'EVO');
