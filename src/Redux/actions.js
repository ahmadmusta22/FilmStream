// import { toast } from 'react-toastify'; // Import toast from React Toastify

// // Action to initialize favorites from localStorage
// export const initializeFavorites = () => {
//   return (dispatch) => {
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     dispatch({
//       type: 'INITIALIZE_FAVORITES',
//       payload: favorites,
//     });
//   };
// };

// // Action to add a movie to favorites
// export const addToFavorites = (movie) => {
//   return (dispatch) => {
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);

//     if (isAlreadyFavorite) {
//       console.log('Movie already in favorites');
//       toast.error(`${movie.title} is already in favorites!`);
//     } else {
//       favorites.push(movie);
//       localStorage.setItem('favorites', JSON.stringify(favorites));
//       dispatch({
//         type: 'ADD_TO_FAVORITES',
//         payload: movie,
//       });
//       console.log('Movie added to favorites');
//       toast.success(`${movie.title} added to favorites!`);
//     }
//   };
// };

// export const removeFromFavorites = (id) => {
//   return (dispatch) => {
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     const movieToRemove = favorites.find((movie) => movie.id === id);

//     if (!movieToRemove) {
//       console.log('Movie not found');
//       toast.error('Movie not found in favorites!');
//     } else {
//       const updatedFavorites = favorites.filter((movie) => movie.id !== id);
//       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//       dispatch({
//         type: 'REMOVE_FROM_FAVORITES',
//         payload: updatedFavorites,
//       });
//       console.log('Movie removed from favorites');
//       toast.success(`${movieToRemove.title} removed from favorites!`);
//     }
//   };
// };




