import { state, persistFavorites } from './state.js';

export function isFavorite(id) {
  return state.favorites.some((movie) => movie.id === id);
}

/**
 * Ajoute ou retire un film des favoris selon son état actuel.
 * On ne stocke que les champs nécessaires à l'affichage de la carte.
 */
export function toggleFavorite(movie) {
  if (isFavorite(movie.id)) {
    state.favorites = state.favorites.filter((m) => m.id !== movie.id);
  } else {
    state.favorites.push({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    });
  }
  persistFavorites();
}
