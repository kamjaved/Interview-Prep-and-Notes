# Recipe Pagination Service Documentation

## Overview

This document describes the implementation of a Node.js Express service that fetches a list of recipes from a JSON file (`recipes.json`) and returns them in a paginated format. This allows clients to retrieve recipes in manageable chunks, improving performance and user experience, especially when dealing with a large number of recipes.

## Requirements

The service should:

-  Provide a GET route `/recipes` to fetch recipes.
-  Support optional query parameters for pagination:
   -  `page`: The desired page number (integer). Defaults to `1`.
   -  `limit`: The number of recipes to return per page (integer). Defaults to `3`.
-  Load recipe data from a `recipes.json` file located in the project root.
-  Return an array of recipe objects for the requested page and limit.

## Implementation Details

### `recipes.json`

The recipe data is stored in a JSON file named `recipes.json`. The structure of this file is an array of recipe objects, where each object has at least an `id` and a `name` property.

```json
[
	{ "id": 1, "name": "Crock Pot Roast" },
	{ "id": 2, "name": "Roasted Asparagus" },
	{ "id": 3, "name": "Curried Lentils and Rice" },
	{ "id": 4, "name": "Big Night Pizza" },
	{ "id": 5, "name": "Cranberry and Apple Stuffed Acorn Squash Recipe" },
	{ "id": 6, "name": "Mic's Yorkshire Puds" },
	{ "id": 7, "name": "Old-Fashioned Oatmeal Cookies" },
	{ "id": 8, "name": "Blueberry Oatmeal Squares" },
	{ "id": 9, "name": "Curried chicken salad" }
]
```
