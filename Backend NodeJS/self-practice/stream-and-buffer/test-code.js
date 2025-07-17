// 1. From a string (with encoding)
const buf1 = Buffer.from('Hello, Node.js!', 'utf8'); // UTF-8 is default if not specified
console.log('Buffer from string:', buf1); //Buffer from string: <Buffer 48 65 6c 6c 6f 2c 20 4e 6f 64 65 2e 6a 73 21>
console.log('Buffer to string:', buf1.toString('utf8')); // Buffer to string: Hello, Node.js!

// 2. From an array of bytes
const buf2 = Buffer.from([72, 101, 108, 108, 111]); // ASCII for 'Hello'
console.log('Buffer from array:', buf2); // Buffer from array: <Buffer 48 65 6c 6c 6f>
console.log('Buffer to string (ASCII):', buf2.toString('ascii')); // Buffer to string (ASCII): Hello

// 3. Allocate a buffer of a specific size (filled with zeros by default for safety)
const buf3 = Buffer.alloc(10); // Allocates 10 bytes, initialized to 0
console.log('Allocated buffer (zero-filled):', buf3); //Allocated buffer (zero-filled): <Buffer 00 00 00 00 00 00 00 00 00 00>
buf3.write('Node'); // Write a string into the buffer
console.log('Allocated buffer after writing:', buf3); // Allocated buffer after writing: <Buffer 4e 6f 64 65 00 00 00 00 00 00>
console.log('Allocated buffer to string:', buf3.toString()); //Allocated buffer to string: Node

// 4. Allocate an uninitialized buffer (faster, but potentially contains old memory data)
// Use with caution: you must completely overwrite its contents before using sensitive data.
const buf4 = Buffer.allocUnsafe(10);
console.log('Unsafe allocated buffer (random data):', buf4); //Unsafe allocated buffer (random data): <Buffer 00 00 00 00 00 00 00 00 00 00>

console.log('///////////////////////////////////////////////////////');

const message = 'Node.js Buffers are cool!';
const buffer = Buffer.from(message, 'utf8');

console.log('Original Buffer:', buffer);
console.log('Buffer length:', buffer.length, 'bytes');
console.log('Buffer as string:', buffer.toString('utf8'));

// Access individual bytes (like an array)
console.log('First byte (ASCII of N):', buffer[0]); // Should be 78

// Modify a byte
buffer[0] = 72; // Change 'N' (78) to 'H' (72)
console.log('Buffer after modifying first byte:', buffer.toString('utf8'));

// Slice a portion
const slicedBuffer = buffer.slice(0, 4); // Get 'Hell'
console.log('Sliced buffer:', slicedBuffer.toString('utf8'));

// Copy to another buffer
const targetBuf = Buffer.alloc(10);
buffer.copy(targetBuf, 0, 0, 10); // Copy "s. Bu" from 'buffer' into 'targetBuf'
console.log('Copied buffer content:', targetBuf.toString('utf8'));
