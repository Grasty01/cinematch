import { state, persistFavorites } from "./state.js";

// Retourne vrai si l'id est dans les favoris
export function isFavorite(id) {
  for (var i = 0; i < state.favorites.length; i++) {
    if (state.favorites[i].id === id) return true;
  }
  return false;
}

// Ajoute ou retire un film des favoris
export function toggleFavorite(movie) {
  if (isFavorite(movie.id)) {
    var newFav = [];
    for (var i = 0; i < state.favorites.length; i++) {
      if (state.favorites[i].id !== movie.id) newFav.push(state.favorites[i]);
    }
    state.favorites = newFav;
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
