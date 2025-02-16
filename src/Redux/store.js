import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
 // Ensure this path is correct

const store = configureStore({
  reducer: {
    favorites: favoritesReducer, // ✅ Correct
  },
  devTools: process.env.NODE_ENV !== 'production', // ✅ Moved outside reducer
});

export default store;



