const FAV_STORAGE_KEY = "cinematch_favorites";

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error(
      "Favoris corrompus dans le localStorage, réinitialisation.",
      err,
    );
    return [];
  }
}

export const state = {
  currentTab: "trending",
  movies: [],
  searchTerm: "",
  favorites: loadFavorites(),
};

export function persistFavorites() {
  localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(state.favorites));
}
