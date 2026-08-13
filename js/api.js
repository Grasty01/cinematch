import { TMDB_API_KEY, TMDB_BASE_URL } from "./config.js";

// Connexion à l'API
async function tmdbFetch(endpoint, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", TMDB_API_KEY);
  url.searchParams.set("language", "fr-FR");
  for (var k in params) {
    if (Object.prototype.hasOwnProperty.call(params, k)) {
      url.searchParams.set(k, params[k]);
    }
  }

  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error("Erreur réseau lors de l'appel à TMDB");
  }

  if (!res.ok) {
    throw new Error(`Erreur TMDB: ${res.status}`);
  }

  return res.json();
}

export async function fetchTrending() {
  const data = await tmdbFetch("/trending/movie/day");
  return data.results;
}

export async function fetchPopular() {
  const data = await tmdbFetch("/movie/popular");
  return data.results;
}

export async function fetchTopRated() {
  const data = await tmdbFetch("/movie/top_rated");
  return data.results;
}

export async function searchMovies(query) {
  const data = await tmdbFetch("/search/movie", { query });
  return data.results;
}

export async function fetchMovieDetails(id) {
  return tmdbFetch(`/movie/${id}`);
}
