import { IMAGE_BASE_URL, BACKDROP_BASE_URL } from '../config.js';

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'class') {
      node.className = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      node.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    node.append(child instanceof Node ? child : document.createTextNode(child));
  });

  return node;
}

/**
 * Détermine la classe de couleur du badge de note selon le cahier des charges :
 * vert si > 7, orange si entre 5 et 7, rouge si < 5.
 */
export function scoreClass(rating) {
  if (rating > 7) return 'green';
  if (rating >= 5) return 'orange';
  return 'red';
}

export function formatYear(dateStr) {
  return dateStr ? dateStr.slice(0, 4) : '—';
}

export function posterUrl(path) {
  return path ? `${IMAGE_BASE_URL}${path}` : '';
}

export function backdropUrl(path) {
  return path ? `${BACKDROP_BASE_URL}${path}` : '';
}
