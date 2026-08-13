# CinéMatch

Catalogue de films en Single Page Application (SPA) construit en JavaScript vanilla, dans l'esprit de TMDB. L'application affiche les films tendance et populaires, permet la recherche, et propose une fiche détaillée pour chaque film ainsi qu'une liste de favoris persistante.

Projet réalisé dans le cadre du module JS S10 — Akieni Academy.

## Aperçu

![Aperçu de CinéMatch](./screenshot.png)

## Fonctionnalités

### Fondamentaux
- Récupération des films tendance/populaires via l'API TMDB
- Grille responsive (CSS Grid) affichant affiche, titre, date de sortie et note moyenne
- Indicateur de chargement pendant l'appel réseau, message d'erreur en cas d'échec

### Interactivité
- Barre de recherche interrogeant l'endpoint `search/movie`, mise à jour de l'affichage en direct
- Badge de note coloré dynamiquement selon le score : vert (> 7), orange (5 à 7), rouge (< 5)

### Bonus
- Modale de détails au clic sur une carte : synopsis complet et genres, sans rechargement de page
- Favoris avec bouton "cœur", sauvegardés en `localStorage` et affichés dans un onglet dédié qui survit au rafraîchissement

## Stack technique

- HTML5 / CSS3 (Grid, Flexbox)
- JavaScript (ES6+, vanilla, aucun framework)
- [TMDB API](https://www.themoviedb.org/documentation/api) — nécessite une clé API gratuite

## Configuration

Cette API nécessite une clé, contrairement à celle de DevShop.

1. Crée un compte gratuit sur [themoviedb.org](https://www.themoviedb.org/)
2. Génère une clé API (v3 auth) dans les paramètres de ton compte
3. Renseigne-la dans `js/config.js` :

```js
export const TMDB_API_KEY = "TA_CLE_ICI";
```

⚠️ Ne commite jamais ta vraie clé API sur un repo public. Ajoute `js/config.js` à ton `.gitignore` et fournis un `js/config.example.js` à la place.

## Installation

```bash
git clone https://github.com/<ton-user>/cinematch.git
cd cinematch
```

Ouvrir `index.html` dans le navigateur, ou lancer un serveur local (requis car le projet utilise des modules ES6) :

```bash
npx serve .
```

## Structure du projet

```
cinematch/
├── index.html
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── api.js
│   ├── config.js
│   ├── state.js
│   ├── favorites.js
│   └── ui/
│       ├── renderMovies.js
│       ├── renderModal.js
│       └── domHelpers.js
└── README.md
```

## Auteur

Grâsty — Akieni Academy
