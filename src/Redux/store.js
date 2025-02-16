// import { applyMiddleware, createStore } from 'redux';
// import { combineReducers } from 'redux';
// import favoritesReducer from './favoritesReducer';
// import { thunk } from 'redux-thunk';


// const rootReducer = combineReducers({
//   favorites: favoritesReducer, // favorites reducer
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    
    devTools: process.env.NODE_ENV !== 'production', 
  },
});

export default store;



