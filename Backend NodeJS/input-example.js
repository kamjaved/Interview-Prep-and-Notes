// Make process.stdin readable in a non-blocking way
process.stdin.setEncoding('utf8'); // Important: tells Node.js to interpret input as UTF-8 strings

console.log('Please enter your name:');

// Listen for 'data' events from standard input
process.stdin.on('data', (input) => {
	const name = input.trim(); // .trim() removes leading/trailing whitespace, including the newline from Enter

	if (name.toLowerCase() === 'exit') {
		console.log('Exiting program.');
		process.exit(); // Exit the Node.js process
	} else if (name) {
		console.log(`Hello, ${name}!`);
		console.log('Type "exit" to quit.');
	} else {
		console.log('Please enter a valid name.');
	}
});

console.log('EVENT NAMES STDIN', process.stdin.eventNames());
console.log('EVENT NAMES STDOUT', process.stdout.eventNames());
console.log('EVENT NAMES STDERR', process.stderr.eventNames());

// Listen for 'end' eventconsole.log('EVENT NAMES STDOUT', process.stdout.eventNames());

process.stdin.on('end', () => {
	console.log('\nEnd of input received. Goodbye!');
});

// Listen for 'SIGINT' (Ctrl+C) for graceful exit
process.on('SIGINT', () => {
	console.log('\nCtrl+C detected. Exiting gracefully.');
	process.exit(0); // Exit with success code
});
