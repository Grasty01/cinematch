import { fetchMovieDetails } from '../api.js';
import { isFavorite, toggleFavorite } from '../favorites.js';
import { el, backdropUrl } from './domHelpers.js';

const modal = document.getElementById('modal');
const banner = document.getElementById('modal-banner');
const closeBtn = document.getElementById('modal-close-btn');

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

export function closeModal() {
  modal.style.display = 'none';
}

/**
 * Récupère les détails complets d'un film (genres, synopsis) et remplit la modale.
 * @param {number} movieId
 * @param {function} onFavToggle - callback appelé après changement des favoris
 */
export async function openModal(movieId, onFavToggle) {
  modal.style.display = 'flex';
  document.getElementById('modal-title').textContent = 'Chargement...';
  document.getElementById('modal-tags').innerHTML = '';
  document.getElementById('modal-overview').textContent = '';
  banner.style.backgroundImage = 'none';

  try {
    const movie = await fetchMovieDetails(movieId);

    banner.style.backgroundImage = `
      linear-gradient(180deg, rgba(24,27,35,0.3) 0%, rgba(24,27,35,1) 95%),
      url(${backdropUrl(movie.backdrop_path)})
    `;

    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-overview').textContent =
      movie.overview || 'Aucun synopsis disponible.';

    const tags = document.getElementById('modal-tags');
    tags.innerHTML = '';
    movie.genres.forEach((genre) => {
      tags.append(el('span', { class: 'modal-tag' }, [genre.name]));
    });
    tags.append(
      el('span', { class: 'modal-tag' }, [`${Math.floor(movie.runtime / 60)}h${String(movie.runtime % 60).padStart(2, '0')}`]),
      el('span', { class: 'modal-tag' }, [movie.release_date?.slice(0, 4) || '—'])
    );

    const favBtn = document.getElementById('modal-fav-btn');
    const refreshFavBtn = () => {
      const active = isFavorite(movie.id);
      favBtn.textContent = active ? '♥ Retirer des favoris' : '♡ Ajouter aux favoris';
    };
    refreshFavBtn();
    favBtn.onclick = () => {
      toggleFavorite(movie);
      refreshFavBtn();
      onFavToggle();
    };
  } catch (err) {
    console.error(err);
    document.getElementById('modal-title').textContent = 'Erreur';
    document.getElementById('modal-overview').textContent =
      'Impossible de charger les détails de ce film.';
  }
}
