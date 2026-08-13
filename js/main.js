import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  searchMovies,
} from "./api.js";
import "./ui/menu.js";
import { state } from "./state.js";
import {
  showLoader,
  showError,
  renderGrid,
  renderHero,
} from "./ui/renderMovies.js";
import { openModal } from "./ui/renderModal.js";

var tabsContainer = document.getElementById("tabs");
var sectionTitle = document.getElementById("section-title");
var searchInput = document.getElementById("search-input");
var retryBtn = document.getElementById("retry-btn");

// Les tendances
var TAB_LABELS = {
  trending: "Tendances cette semaine",
  popular: "Populaires en ce moment",
  top_rated: "Les mieux notés",
  favorites: "Mes favoris",
};

var TAB_FETCHERS = {
  trending: fetchTrending,
  popular: fetchPopular,
  top_rated: fetchTopRated,
};

function handleOpenModal(movieId) {
  openModal(movieId, refreshCurrentView);
}

function handleFavToggle() {
  // Je vérifie vérifie si on est sur l'onglet favoris
  if (state.currentTab === "favorites") {
    refreshCurrentView();
  }
}

/**
 * Charge et affiche l'onglet actif.
 */
async function refreshCurrentView() {
  sectionTitle.textContent = TAB_LABELS[state.currentTab];

  // Onglet favoris : on lit directement le localStorage.
  if (state.currentTab === "favorites") {
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
  state.searchTerm = "";
  searchInput.value = "";

  var tabs = document.querySelectorAll(".tab");
  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    if (tab.getAttribute("data-tab") === tabName) tab.classList.add("active");
    else tab.classList.remove("active");
  }

  refreshCurrentView();
}

async function handleSearch(query) {
  state.searchTerm = query;

  if (query.trim() === "") {
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

// Charge les données initiales : hero (tendance n°1) + grille de tendances.
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

// clic sur onglet
tabsContainer.addEventListener("click", function (e) {
  var el = e.target;
  while (el && !el.classList.contains("tab")) el = el.parentNode;
  if (el && el.getAttribute) {
    var name = el.getAttribute("data-tab");
    if (name) selectTab(name);
  }
});

var searchTimeout;
searchInput.addEventListener("input", function (e) {
  clearTimeout(searchTimeout);
  var value = e.target.value;
  searchTimeout = setTimeout(function () {
    handleSearch(value);
  }, 350);
});

retryBtn.addEventListener("click", function () {
  if (state.searchTerm) {
    handleSearch(state.searchTerm);
  } else {
    refreshCurrentView();
  }
});

init();
