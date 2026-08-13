import { state } from '../state.js';
import { isFavorite, toggleFavorite } from '../favorites.js';
import { el, scoreClass, formatYear, posterUrl, backdropUrl } from './domHelpers.js';

const grid = document.getElementById('movies-grid');
const loader = document.getElementById('loader');
const errorBox = document.getElementById('error-box');
const emptyBox = document.getElementById('empty-box');

export function showLoader() {
  loader.style.display = 'block';
  errorBox.style.display = 'none';
  emptyBox.style.display = 'none';
  grid.innerHTML = '';
}

export function showError() {
  loader.style.display = 'none';
  errorBox.style.display = 'block';
  emptyBox.style.display = 'none';
  grid.innerHTML = '';
}

/**
 * Remplit le hero avec le premier film de la liste passée (film tendance n°1).
 */
export function renderHero(movie, onDetailsClick, onFavClick) {
  const hero = document.getElementById('hero');
  hero.style.backgroundImage = `
    linear-gradient(180deg, rgba(11,12,16,0.2) 0%, rgba(11,12,16,1) 95%),
    linear-gradient(90deg, rgba(11,12,16,0.95) 20%, rgba(11,12,16,0.2) 70%),
    url(${backdropUrl(movie.backdrop_path)})
  `;

  document.getElementById('hero-title').textContent = movie.title;

  const ratingBadge = document.getElementById('hero-rating');
  ratingBadge.textContent = movie.vote_average.toFixed(1);
  ratingBadge.className = `rating-badge ${scoreClass(movie.vote_average)}`;

  document.getElementById('hero-info').textContent =
    `${formatYear(movie.release_date)} · Note ${movie.vote_average.toFixed(1)}/10`;

  document.getElementById('hero-overview').textContent =
    movie.overview ? `${movie.overview.slice(0, 220)}${movie.overview.length > 220 ? '...' : ''}` : '';

  const detailsBtn = document.getElementById('hero-details-btn');
  detailsBtn.onclick = () => onDetailsClick(movie.id);

  const favBtn = document.getElementById('hero-fav-btn');
  const refreshFavBtn = () => {
    const active = isFavorite(movie.id);
    favBtn.textContent = active ? '♥ Favoris' : '♡ Favoris';
    favBtn.classList.toggle('active', active);
  };
  refreshFavBtn();
  favBtn.onclick = () => {
    toggleFavorite(movie);
    refreshFavBtn();
    onFavClick();
  };
}

function buildCard(movie, onOpenModal, onFavToggle) {
  const favBtn = el('button', { class: `poster-fav${isFavorite(movie.id) ? ' active' : ''}` }, [
    isFavorite(movie.id) ? '♥' : '♡',
  ]);
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
    favBtn.textContent = isFavorite(movie.id) ? '♥' : '♡';
    favBtn.classList.toggle('active', isFavorite(movie.id));
    onFavToggle();
  });

  const card = el('div', { class: 'poster-card' }, [
    el('div', {
      class: 'poster',
      style: `background-image:url(${posterUrl(movie.poster_path)})`,
    }, [
      favBtn,
      el('span', { class: `score ${scoreClass(movie.vote_average)}` }, [movie.vote_average.toFixed(1)]),
    ]),
    el('div', { class: 'poster-info' }, [
      el('h3', {}, [movie.title]),
      el('div', { class: 'meta' }, [`${formatYear(movie.release_date)}`]),
    ]),
  ]);

  card.addEventListener('click', () => onOpenModal(movie.id));
  return card;
}

/**
 * Affiche la grille de films pour l'onglet actif. Affiche l'état "vide" si besoin.
 */
export function renderGrid(movies, onOpenModal, onFavToggle) {
  loader.style.display = 'none';
  errorBox.style.display = 'none';
  grid.innerHTML = '';

  if (movies.length === 0) {
    emptyBox.style.display = 'block';
    return;
  }

  emptyBox.style.display = 'none';
  const fragment = document.createDocumentFragment();
  movies.forEach((movie) => fragment.append(buildCard(movie, onOpenModal, onFavToggle)));
  grid.append(fragment);
}
