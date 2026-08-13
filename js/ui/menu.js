// Menu mobile simple. Commentaires en français et code simple.
var burger = document.getElementById("hamburger");
var tabs = document.getElementById("tabs");

if (burger && tabs) {
  // ouvrir/fermer le menu au clic
  burger.addEventListener("click", function () {
    var isOpen = tabs.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  // fermer le menu quand on clique sur un onglet
  tabs.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest(".tab") : null;
    if (t) tabs.classList.remove("open");
  });

  // fermer le menu si on agrandit la fenêtre
  window.addEventListener("resize", function () {
    if (window.innerWidth > 640) tabs.classList.remove("open");
  });
}

export {};
