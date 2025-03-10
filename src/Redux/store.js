import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';


const store = configureStore({
  reducer: {
    favorites: favoritesReducer, 
  },
  devTools: process.env.NODE_ENV !== 'production', 
});

export default store;



