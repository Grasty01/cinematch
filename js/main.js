import { fetchTrending, fetchPopular, fetchTopRated, searchMovies } from './api.js';
import { state } from './state.js';
import { showLoader, showError, renderGrid, renderHero } from './ui/renderMovies.js';
import { openModal } from './ui/renderModal.js';

const tabsContainer = document.getElementById('tabs');
const sectionTitle = document.getElementById('section-title');
const searchInput = document.getElementById('search-input');
const retryBtn = document.getElementById('retry-btn');

const TAB_LABELS = {
  trending: 'Tendances cette semaine',
  popular: 'Populaires en ce moment',
  top_rated: 'Les mieux notés',
  favorites: 'Mes favoris',
};

const TAB_FETCHERS = {
  trending: fetchTrending,
  popular: fetchPopular,
  top_rated: fetchTopRated,
};

function handleOpenModal(movieId) {
  openModal(movieId, refreshCurrentView);
}

function handleFavToggle() {
  // Si on est sur l'onglet favoris, il faut re-rendre la grille immédiatement.
  if (state.currentTab === 'favorites') {
    refreshCurrentView();
  }
}

/**
 * Charge (ou relit depuis le state pour les favoris) et affiche l'onglet actif.
 */
async function refreshCurrentView() {
  sectionTitle.textContent = TAB_LABELS[state.currentTab];

  // Onglet favoris : pas d'appel API, on lit directement le localStorage.
  if (state.currentTab === 'favorites') {
    state.movies = state.favorites;
    renderGrid(state.movies, handleOpenModal, handleFavToggle);
    return;
  }

  showLoader();
  try {
    const fetcher = TAB_FETCHERS[state.currentTab];
    const movies = await fetcher();
    state.movies = movies;
    renderGrid(movies, handleOpenModal, handleFavToggle);
  } catch (err) {
    console.error(err);
    showError();
  }
}

function selectTab(tabName) {
  state.currentTab = tabName;
  state.searchTerm = '';
  searchInput.value = '';

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });

  refreshCurrentView();
}

async function handleSearch(query) {
  state.searchTerm = query;

  if (query.trim() === '') {
    refreshCurrentView();
    return;
  }

  sectionTitle.textContent = `Résultats pour "${query}"`;
  showLoader();
  try {
    const results = await searchMovies(query);
    renderGrid(results, handleOpenModal, handleFavToggle);
  } catch (err) {
    console.error(err);
    showError();
  }
}

/**
 * Charge les données initiales : hero (tendance n°1) + grille de tendances.
 */
async function init() {
  showLoader();
  try {
    const trending = await fetchTrending();
    state.movies = trending;

    if (trending.length > 0) {
      renderHero(trending[0], handleOpenModal, handleFavToggle);
    }

    renderGrid(trending, handleOpenModal, handleFavToggle);
  } catch (err) {
    console.error(err);
    showError();
  }
}

// --- Événements ---

tabsContainer.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab');
  if (tab) selectTab(tab.dataset.tab);
});

let searchTimeout;
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  const value = e.target.value;
  searchTimeout = setTimeout(() => handleSearch(value), 350);
});

retryBtn.addEventListener('click', () => {
  if (state.searchTerm) {
    handleSearch(state.searchTerm);
  } else {
    refreshCurrentView();
  }
});

init();
