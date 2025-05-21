# Order Processing Service Documentation

## Overview

This document describes the `OrderProcessor` module, a Node.js class that handles order processing. It performs pre-order checks and validations on the submitted order data and emits events to indicate the processing status (started, failed, or successful). The stock information is loaded from a `stock-list.json` file.

## Requirements

The `OrderProcessor` module should:

-  Export a class named `OrderProcessor` that inherits from `EventEmitter`.
-  Implement a `placeOrder` method that accepts order data as an argument.
-  Emit the following events:
   -  `PROCESSING_STARTED`: When `placeOrder` is called, with the `orderNumber` as an argument.
   -  `PROCESSING_FAILED`: If any pre-order checks fail, with an object containing `orderNumber`, `reason` (a string indicating the failure), and `itemId` (the ID of the failing item, if applicable). Possible reasons: `LINEITEMS_EMPTY`, `ITEM_NOT_FOUND`, `INVALID_QUANTITY`, `INSUFFICIENT_STOCK`.
   -  `PROCESSING_SUCCESS`: If all pre-order checks pass, with the `orderNumber` as an argument.
-  Load initial stock levels from a `stock-list.json` file.
-  Perform the following pre-order checks for each line item:
   -  Item exists in stock.
   -  Requested quantity is positive.
   -  Sufficient stock is available.
-  Fail the entire order if any line item fails a check.
-  Handle cases where the `lineItems` array in the order data is empty.

## Implementation Details

### `stock-list.json`

The stock information is stored in a JSON file named `stock-list.json`. The structure is an array of objects, where each object has an `id` (the item ID) and `stock` (the available quantity).

```json
[
	{ "id": 0, "stock": 4 },
	{ "id": 1, "stock": 12 },
	{ "id": 2, "stock": 2 },
	{ "id": 3, "stock": 6 },
	{ "id": 4, "stock": 0 },
	{ "id": 5, "stock": 3 }
]
```

### Code Explanation

1. **Dependencies:** The code imports the `EventEmitter` class and the `stock-list.json` file directly.
2. **`OrderProcessor` Class:**
   -  The `constructor` initializes the `availableStock` by calling `loadStockFromImport()`.
   -  **`loadStockFromImport()`:** This method reads the imported `stockList` array and creates an object `this.availableStock` where keys are item IDs and values are their stock levels.
   -  **`placeOrder(orderData)`:**
      -  Emits `PROCESSING_STARTED` with the `orderNumber`.
      -  Checks if `lineItems` is empty and emits `PROCESSING_FAILED` with the reason `LINEITEMS_EMPTY` if so.
      -  Iterates through each `item` in the `lineItems` array and performs pre-order checks:
         -  **Item Existence:** Checks if the `itemId` exists in `this.availableStock`.
         -  **Positive Quantity:** Checks if the `quantity` is greater than 0.
         -  **Sufficient Stock:** Checks if the requested `quantity` is less than or equal to the available stock for the `itemId`.
      -  If any check fails, it emits `PROCESSING_FAILED` with the appropriate `reason` and `itemId`, and sets `orderFailed` to `true`, breaking the loop.
      -  If all checks pass for all line items, it emits `PROCESSING_SUCCESS` with the `orderNumber`.
