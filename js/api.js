import { TMDB_API_KEY, TMDB_BASE_URL } from './config.js';

async function tmdbFetch(endpoint, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', TMDB_API_KEY);
  url.searchParams.set('language', 'fr-FR');
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur API TMDB: ${response.status}`);
  }
  return response.json();
}

export async function fetchTrending() {
  const data = await tmdbFetch('/trending/movie/day');
  return data.results;
}

export async function fetchPopular() {
  const data = await tmdbFetch('/movie/popular');
  return data.results;
}

export async function fetchTopRated() {
  const data = await tmdbFetch('/movie/top_rated');
  return data.results;
}

export async function searchMovies(query) {
  const data = await tmdbFetch('/search/movie', { query });
  return data.results;
}

/**
 * Détails complets d'un film (genres, synopsis) — utilisé pour la modale.
 */
export async function fetchMovieDetails(id) {
  return tmdbFetch(`/movie/${id}`);
}
