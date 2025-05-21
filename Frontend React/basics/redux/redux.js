// ---index.js---

import { combineReducers } from 'redux'
import productReducer from './productReducer.js'

export default combineReducers({
  prodcuts: productReducer
})

// --store.js
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index.js'
import thunk from 'redux-thunk'

const store= createStore(
  rootReducer,
  composeWithDevTool(applyMiddleware(thunk))
)

export default store;

// --- App.js

import React from 'react'
import Provider from 'react-redux'
import store from './redux/store.js'

const App = () => {
  return (
    <Provider store={store}>
      <div>App</div>
    </Provider>
  )
}

export default App;

// --- types.js

const VIEW_PRODUCT='VIEW_PRODCUTS';

// --- productAction.js

export const getAllProdcuts = ()=> async (dispatch)=>{
  try {
    const res= await axios.get('v1/api/products') 
    dispatch({
      type: VIEW_PRODUCT,
      payload:res.data;
    })
    
  } catch (error) {
     console.log(Error);
  }

}