const track = document.getElementById("carouselTrack");
const dotsContainer = document.getElementById("carouselDots");
const items = track.querySelectorAll(".carousel-item");
let current = 0;
const visibleCount = () =>
  window.innerWidth <= 560 ? 1 : window.innerWidth <= 900 ? 2 : 3;

function buildDots() {
  dotsContainer.innerHTML = "";
  const total = Math.ceil(items.length / visibleCount());
  for (let i = 0; i < total; i++) {
    const d = document.createElement("button");
    d.className = "dot" + (i === current ? " active" : "");
    d.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(d);
  }
}

function goTo(index) {
  const vc = visibleCount();
  const maxIndex = Math.ceil(items.length / vc) - 1;
  current = Math.min(index, maxIndex);
  const itemW = items[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${current * vc * (itemW + 16)}px)`;
  dotsContainer
    .querySelectorAll(".dot")
    .forEach((d, i) => d.classList.toggle("active", i === current));
}

buildDots();
window.addEventListener("resize", () => {
  current = 0;
  buildDots();
  goTo(0);
});
setInterval(() => {
  const total = Math.ceil(items.length / visibleCount());
  goTo((current + 1) % total);
}, 8000);

/* ===== Menu hambúrguer (mobile) ===== */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("menu-principal");

function setMenu(open) {
  navMenu.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

navToggle.addEventListener("click", () =>
  setMenu(navToggle.getAttribute("aria-expanded") !== "true"),
);
navMenu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => setMenu(false)),
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) setMenu(false);
});