const OrderProcessor = require('./processor');

const orderProcessor = new OrderProcessor();

orderProcessor.on('PROCESSING_STARTED', (orderNumber) => {
	console.log('-------------START------------');

	console.log(`Pre Order Checks Running for ${orderNumber}`);
});

orderProcessor.on('PROCESSING_FAILED', (failureData) => {
	console.log(`Failed Order`);

	console.log(`- OrderNumber: ${failureData.orderNumber}`);

	console.log(`- Reason: ${failureData.reason}`);

	console.log(`- ItemId: ${failureData.itemId}`);

	console.log('-------------END------------');
});

orderProcessor.on('PROCESSING_SUCCESS', (orderNumber) => {
	console.log(`Pre Order Checks Passed for ${orderNumber}`);
	console.log('-------------END------------');
});

console.log('EVENT NAMES', orderProcessor.eventNames());

console.log('AVILABLE STOCKS', orderProcessor.availableStock);

//TEST EXAMPLE-1
/* this itemId 5 doesn't have quantity 4 so it will trigger 'PROCESSING_FAILED' event with 
   'INSUFFICIENT_STOCK' Reason
  */
orderProcessor.placeOrder({
	orderNumber: 'OD2323',

	lineItems: [
		{
			itemId: 3,

			quantity: 4,
		},

		{
			itemId: 5,

			quantity: 4,
		},
	],
});

// TEST EXAMPLE-2
/* this order will pass as there are valid stock details it will only check preCheck condition and passed
 */
orderProcessor.placeOrder({
	orderNumber: 'OD2324',

	lineItems: [
		{
			itemId: 2,

			quantity: 1,
		},

		{
			itemId: 0,

			quantity: 1,
		},
	],
});

// TEST-EXAMPLE-3

/*this itemId 6 is not avialble expetc to trigger 'PROCESSING_FAILED' event with 
       'ITEM_NOT_FOUND' Reason
  */
orderProcessor.placeOrder({
	orderNumber: 'OD2325',

	lineItems: [
		{
			itemId: 6,

			quantity: 1,
		},

		{
			itemId: 0,

			quantity: 1,
		},
	],
});
