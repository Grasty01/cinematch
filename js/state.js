const FAV_STORAGE_KEY = 'cinematch_favorites';

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Favoris corrompus dans le localStorage, réinitialisation.', err);
    return [];
  }
}

export const state = {
  currentTab: 'trending',   // trending | popular | top_rated | favorites
  movies: [],                // résultats affichés pour l'onglet actif
  searchTerm: '',
  favorites: loadFavorites(),
};

export function persistFavorites() {
  localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(state.favorites));
}
