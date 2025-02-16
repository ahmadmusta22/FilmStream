import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Load favorites from localStorage
const loadFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];

// Save favorites to localStorage
const saveFavorites = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: loadFavorites(),
  },
  reducers: {
    initializeFavorites: (state) => {
      state.favorites = loadFavorites();
    },
    addToFavorites: (state, action) => {
      const movie = action.payload;
      const isAlreadyFavorite = state.favorites.some((fav) => fav.id === movie.id);

      if (!isAlreadyFavorite) {

        state.favorites.push(movie);
        saveFavorites(state.favorites);
        toast.success(`${movie.title} added to favorites!`);
      }
    },
    removeFromFavorites: (state, action) => {
      const id = action.payload;
      const movieToRemove = state.favorites.find((movie) => movie.id === id);

      if (movieToRemove) {

        state.favorites = state.favorites.filter((movie) => movie.id !== id);
        saveFavorites(state.favorites);
        toast.success(`${movieToRemove.title} removed from favorites!`);
      }
    },
  },
});

export const { initializeFavorites, addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
