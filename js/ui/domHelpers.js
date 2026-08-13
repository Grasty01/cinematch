import { IMAGE_BASE_URL, BACKDROP_BASE_URL } from "../config.js";

export function el(tag, attrs, children) {
  if (!attrs) attrs = {};
  if (!children) children = [];

  var node = document.createElement(tag);

  for (var key in attrs) {
    if (!Object.prototype.hasOwnProperty.call(attrs, key)) continue;
    var value = attrs[key];
    if (key === "class") {
      node.className = value;
    } else if (key.indexOf("on") === 0 && typeof value === "function") {
      var eventName = key.slice(2).toLowerCase();
      node.addEventListener(eventName, value);
    } else {
      node.setAttribute(key, value);
    }
  }

  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    if (child instanceof Node) node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }

  return node;
}

/**
 * Détermine la classe de couleur du badge de note selon le cahier des charges :
 * vert si > 7, orange si entre 5 et 7, rouge si < 5.
 */
export function scoreClass(rating) {
  if (rating > 7) return "green";
  if (rating >= 5) return "orange";
  return "red";
}

export function formatYear(dateStr) {
  return dateStr ? dateStr.slice(0, 4) : "—";
}

export function posterUrl(path) {
  if (path) return `${IMAGE_BASE_URL}${path}`;

  // Placeholder SVG data URI quand il n'y a pas d'affiche.
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='500' height='750'>" +
    "<rect fill='%2320232D' width='100%' height='100%'/>" +
    "<text x='50%' y='50%' fill='%23FFFFFF' font-size='24' text-anchor='middle' dominant-baseline='middle'>Aucune image</text>" +
    "</svg>";

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function backdropUrl(path) {
  return path ? `${BACKDROP_BASE_URL}${path}` : "";
}
