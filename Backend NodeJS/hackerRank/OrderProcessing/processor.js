// processor.js
const EventEmitter = require('events');
const stockList = require('./stock-list.json'); // Import the JSON file

class OrderProcessor extends EventEmitter {
	constructor() {
		super();
		this.availableStock = this.loadStockFromImport();
	}

	loadStockFromImport() {
		const stock = {};
		stockList.forEach((item) => {
			stock[item.id] = item.stock;
		});
		return stock;
	}

	placeOrder(orderData) {
		this.emit('PROCESSING_STARTED', orderData.orderNumber);
		const { orderNumber, lineItems } = orderData;

		if (!lineItems || lineItems.length === 0) {
			this.emit('PROCESSING_FAILED', {
				orderNumber,
				reason: 'LINEITEMS_EMPTY',
				itemId: null,
			});
			return;
		}

		let orderFailed = false;

		for (const item of lineItems) {
			const { itemId, quantity } = item;

			if (!this.availableStock.hasOwnProperty(itemId)) {
				this.emit('PROCESSING_FAILED', {
					orderNumber,
					reason: 'ITEM_NOT_FOUND',
					itemId,
				});
				orderFailed = true;
				break;
			}

			if (quantity <= 0) {
				this.emit('PROCESSING_FAILED', {
					orderNumber,
					reason: 'INVALID_QUANTITY',
					itemId,
				});
				orderFailed = true;
				break;
			}

			if (this.availableStock[itemId] < quantity) {
				this.emit('PROCESSING_FAILED', {
					orderNumber,
					reason: 'INSUFFICIENT_STOCK',
					itemId,
				});
				orderFailed = true;
				break;
			}
		}

		if (!orderFailed) {
			this.emit('PROCESSING_SUCCESS', orderNumber);
			// In a real application, you would proceed with deducting stock and finalizing the order here
		}
	}
}

module.exports = OrderProcessor;
