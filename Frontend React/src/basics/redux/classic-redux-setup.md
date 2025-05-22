Let’s quickly refresh the **classic Redux (non-Toolkit)** setup in a React app, exactly the way you used it — with `redux`, `react-redux`, `redux-thunk`, and structured with `types.js`, `reducers`, and `actions`.

---

## ⚙️ Step-by-Step Classic Redux Setup

---

### 🔹 1. Install Required Packages

```bash
npm install redux react-redux redux-thunk axios
```

---

### 🔹 2. Create Folder Structure (Example)

```
/src
  /_actions
    productActions.js
    types.js
  /_reducers
    index.js       ← uses combineReducers
    productReducer.js
  /components
    ViewProducts.js
  store.js         ← creates store
  App.js
```

---

## 🧱 Breakdown with Code

---

### ✅ `types.js` – All Action Types

```js
// /_actions/types.js
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';
```

---

### ✅ `productActions.js` – Action Creator with Thunk

```js
// /_actions/productActions.js
import axios from 'axios';
import * as types from './types';

export const getAllProducts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/products/getAll');

		dispatch({
			type: types.GET_ALL_PRODUCTS,
			payload: res.data.data,
		});
	} catch (err) {
		dispatch({
			type: types.PRODUCT_ERROR,
			payload: err.message,
		});
	}
};
```

---

### ✅ `productReducer.js` – State Update Logic

```js
// /_reducers/productReducer.js
import * as types from './../_actions/types';

const initialState = {
	allProducts: [],
	loading: true,
	error: {},
	filtered: null,
};

export default function productReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case types.GET_ALL_PRODUCTS:
			return {
				...state,
				allProducts: payload,
				loading: false,
			};

		case types.PRODUCT_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};

		default:
			return state;
	}
}
```

---

### ✅ `index.js` – Combine All Reducers

```js
// /_reducers/index.js
import { combineReducers } from 'redux';
import productReducer from './productReducer';

export default combineReducers({
	products: productReducer,
});
```

---

### ✅ `store.js` – Setup Store with Thunk Middleware

```js
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './_reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
```

---

### ✅ `App.js` – Wrap App in `<Provider>`

```jsx
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ViewProducts from './components/ViewProducts';

function App() {
	return (
		<Provider store={store}>
			<ViewProducts />
		</Provider>
	);
}
```

---

## 🧑‍🎨 `ViewProducts.js` – Connect to Redux

```jsx
// /components/ViewProducts.js
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProducts } from '../_actions/productActions';

const ViewProducts = ({
	product: { allProducts, loading },
	getAllProducts,
}) => {
	useEffect(() => {
		getAllProducts();
	}, [getAllProducts]);

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : (
				allProducts.map((prod) => <p key={prod.id}>{prod.name}</p>)
			)}
		</div>
	);
};

ViewProducts.propTypes = {
	getAllProducts: PropTypes.func.isRequired,
	product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	product: state.products, // because we used products: productReducer
});

export default connect(mapStateToProps, { getAllProducts })(ViewProducts);
```

---

## 🔄 How Data Flows

1. **Component Mounts** → `getAllProducts()` called
2. **Thunk Action** fires → makes `axios` request
3. **Dispatch** sends `{ type: GET_ALL_PRODUCTS, payload }`
4. **Reducer** updates state based on action
5. **Component** re-renders with new props via `mapStateToProps`

---

## ✅ Summary

| Part              | Purpose                              |
| ----------------- | ------------------------------------ |
| `types.js`        | Centralized action strings           |
| `actions`         | Handle side-effects (API) + dispatch |
| `reducers`        | Update state based on action         |
| `combineReducers` | Combine modular state logic          |
| `store.js`        | Create global store w/ middleware    |
| `connect()`       | Inject props and actions             |

---
