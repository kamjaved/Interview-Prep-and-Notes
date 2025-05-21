const fs = require('fs');
const { Transform } = require('stream');
const path = require('path'); // Node.js module to handle file paths

// --- Configuration ---
const INPUT_FILE = 'input.log';
const OUTPUT_DIR = 'output';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'anonymized_log.log'); // Combines path for output
const SEARCH_PATTERN = /secret/gi; // 'g' for global (all occurrences), 'i' for case-insensitive
const REPLACEMENT_STRING = 'ANONYMIZED';

// --- Custom Transform Stream: LogAnonymizer ---
// This stream will take chunks of data, replace patterns, and push them out.
class LogAnonymizer extends Transform {
	constructor(options) {
		super(options); // Call parent Transform constructor
		this.remaining = ''; // Buffer to handle partial matches across chunks
	}

	// _transform is called for each incoming chunk of data
	_transform(chunk, encoding, callback) {
		// 1. Convert Buffer chunk to string, and prepend any remaining data from last chunk
		const data = this.remaining + chunk.toString('utf8');

		// 2. Perform the replacement
		let transformedData = data.replace(SEARCH_PATTERN, REPLACEMENT_STRING);

		// 3. Handle potential partial matches at the end of the current chunk
		// If the replacement string is longer than the search pattern, or if a pattern
		// starts at the very end of a chunk and continues into the next, we need to
		// be careful not to cut off a match. For this simple example, we assume
		// 'secret' won't be split across chunks. For complex regex, this is harder.
		// For now, let's keep it simple and just push the transformed data.
		// A more robust solution might need to check if the end of 'data' is a partial match.
		this.remaining = ''; // Reset remaining as we've processed all of 'data'

		// 4. Push the transformed data (as a Buffer) to the next stream in the pipeline
		this.push(Buffer.from(transformedData, 'utf8')); // Push a Buffer

		// 5. Call the callback to signal that this chunk is processed
		callback();
	}

	// _flush is called once all incoming chunks have been processed
	// It's used to push any final remaining data (e.g., if a partial match was left in this.remaining)
	_flush(callback) {
		if (this.remaining.length > 0) {
			this.push(Buffer.from(this.remaining, 'utf8'));
		}
		callback();
	}
}

// --- Main execution ---
console.log(
	`Starting log anonymization from "${INPUT_FILE}" to "${OUTPUT_FILE}"...`
);

// 1. Create a Readable Stream for the input file
const readStream = fs.createReadStream(INPUT_FILE, {
	encoding: 'utf8',
	highWaterMark: 16 * 1024,
}); // Read in 16KB chunks
readStream.on('error', (err) => {
	console.error(`Error reading input file: ${err.message}`);
	process.exit(1);
});

// 2. Create an instance of our custom Transform Stream
const anonymizer = new LogAnonymizer();

// 3. Create a Writable Stream for the output file
const writeStream = fs.createWriteStream(OUTPUT_FILE, { encoding: 'utf8' });
writeStream.on('error', (err) => {
	console.error(`Error writing output file: ${err.message}`);
	process.exit(1);
});

// 4. Pipe the streams together!
// ReadStream -> TransformStream -> WriteStream
readStream
	.pipe(anonymizer) // Data flows from readStream into anonymizer's _transform method
	.pipe(writeStream); // Transformed data from anonymizer flows into writeStream

// --- Event Listeners for Completion ---
writeStream.on('finish', () => {
	console.log('\nAnonymization complete!');
	console.log(`Transformed log saved to: ${OUTPUT_FILE}`);
});

console.log('Processing...');

// Note: For a truly robust anonymizer handling arbitrary regex and large files,
// managing `this.remaining` (to catch partial matches across chunk boundaries)
// can become quite complex. This example provides a basic conceptual understanding.
