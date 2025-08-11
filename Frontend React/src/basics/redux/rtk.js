import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//STEP-1 productAPI.js
export const getAllProducts = createAsyncThunk(
	'products/getAll', // path name

	async () => {
		try {
			// fetch the data
		} catch (error) {
			// handle error
		}
	}
);

// STEP-2 productSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts } from './productAPI.js';

const prodcutSlice = createSlice({
	name: 'prodcuts', // unique name
	initialState: {
		allProducts: [],
		loading: true,
		error: {},
	},

	reducers: {},

	extraReducers: (builder) => {
		// pending case
		builder.addCase(getAllProducts.pending, (state, action) => {
			state.loading = true;
		});
		// fulfilled case
		builder.addCase(getAllProducts.fulfilled, (state, action) => {
			state.loading = false;
			state.allProducts = action.payload;
		});
		// rejected case
		builder.addCase(getAllProducts.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error;
		});
	},
});
//  STEP-3 export reducer
export default productSlice.reducer;


// STEP-4 Configure Store
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice.js';

const store = configureStore({
	reducer: {
		products: productReducer,
	},
});

export default store;