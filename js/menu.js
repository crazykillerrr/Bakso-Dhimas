/**
 * menu.js — Bakso Dhimas
 * Render semua menu dari data.js ke halaman menu.html.
 */

"use strict";

/* ============================================================
   CARD FACTORY
   ============================================================ */

/**
 * Buat elemen card menu secara programatik (tanpa innerHTML berlebihan).
 * @param {Object} menu - Data menu dari MENUS array
 * @returns {HTMLElement} Bootstrap card element
 */
function createMenuCard(menu) {
  // Wrapper kolom — col-6 di mobile agar 2 kolom, col-md-6, col-lg-4 di desktop
  const col = document.createElement("div");
  col.className = "col-6 col-md-6 col-lg-4 animate-on-scroll";

  // Card
  const card = document.createElement("article");
  card.className = "menu-card h-100";
  card.setAttribute("data-category", menu.category);

  // Image wrapper
  const imgWrapper = document.createElement("div");
  imgWrapper.className = "menu-card__img-wrapper";

  const img = document.createElement("img");
  img.src = menu.image;
  img.alt = menu.name;
  img.className = "menu-card__img";
  img.loading = "lazy";
  img.onerror = function () {
    this.src =
      "https://via.placeholder.com/600x400/C62828/ffffff?text=Bakso+Dhimas";
  };

  // Badge
  const badge = document.createElement("span");
  badge.className = `badge menu-card__badge ${menu.badgeClass}`;
  badge.textContent = menu.badge;

  imgWrapper.appendChild(img);
  imgWrapper.appendChild(badge);

  // Card body
  const body = document.createElement("div");
  body.className = "menu-card__body";

  const category = document.createElement("span");
  category.className = "menu-card__category";
  category.textContent = menu.category;

  const title = document.createElement("h3");
  title.className = "menu-card__title";
  title.textContent = menu.name;

  const desc = document.createElement("p");
  desc.className = "menu-card__desc";
  desc.textContent = menu.description;

  // Footer
  const footer = document.createElement("div");
  footer.className = "menu-card__footer";

  const price = document.createElement("span");
  price.className = "menu-card__price";
  price.textContent = formatRupiah(menu.price);

  const btnWrapper = document.createElement("div");
  btnWrapper.className = "menu-card__actions";

  const btnDetail = document.createElement("a");
  btnDetail.href = `detail.html?id=${menu.id}`;
  btnDetail.className = "btn btn-outline-primary btn-sm";
  btnDetail.textContent = "Lihat Detail";
  btnDetail.setAttribute("aria-label", `Lihat detail ${menu.name}`);

  const btnWA = document.createElement("a");
  btnWA.href = generateWALink(menu.name);
  btnWA.className = "btn btn-wa btn-sm";
  btnWA.target = "_blank";
  btnWA.rel = "noopener noreferrer";
  btnWA.setAttribute("aria-label", `Pesan ${menu.name} via WhatsApp`);

  // WA icon
  const waIcon = document.createElement("i");
  waIcon.className = "bi bi-whatsapp me-1";
  btnWA.appendChild(waIcon);
  btnWA.appendChild(document.createTextNode("Pesan"));

  btnWrapper.appendChild(btnDetail);
  btnWrapper.appendChild(btnWA);
  footer.appendChild(price);
  footer.appendChild(btnWrapper);

  body.appendChild(category);
  body.appendChild(title);
  body.appendChild(desc);
  body.appendChild(footer);

  card.appendChild(imgWrapper);
  card.appendChild(body);
  col.appendChild(card);

  return col;
}

/* ============================================================
   FILTER
   ============================================================ */

/**
 * Render menu ke container berdasarkan kategori filter.
 * @param {string} activeCategory - "all" atau nama kategori
 */
function renderMenus(activeCategory = "all") {
  const container = document.getElementById("menuGrid");
  if (!container) return;

  const filtered =
    activeCategory === "all"
      ? MENUS
      : MENUS.filter((m) => m.category === activeCategory);

  // Clear container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "col-12 text-center py-5";
    empty.innerHTML = `<p class="text-muted">Tidak ada menu dalam kategori ini.</p>`;
    container.appendChild(empty);
    return;
  }

  filtered.forEach((menu, index) => {
    const card = createMenuCard(menu);
    // Mulai dari invisible, animasi via inline style + rAF
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `opacity 0.4s ease ${index * 70}ms, transform 0.4s ease ${index * 70}ms`;
    container.appendChild(card);
  });

  // Double rAF: pastikan browser sudah layout sebelum trigger animasi
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      container.querySelectorAll(".col-6, .col-12").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
  });
}

/* ============================================================
   FILTER BUTTONS
   ============================================================ */

/**
 * Ambil semua kategori unik dari MENUS.
 * @returns {string[]}
 */
function getCategories() {
  return ["all", ...new Set(MENUS.map((m) => m.category))];
}

/**
 * Buat tombol filter kategori secara dinamis.
 */
function initFilterButtons() {
  const filterContainer = document.getElementById("categoryFilter");
  if (!filterContainer) return;

  const categories = getCategories();

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = `btn btn-filter ${cat === "all" ? "active" : ""}`;
    btn.textContent = cat === "all" ? "Semua Menu" : cat;
    btn.dataset.category = cat;
    btn.setAttribute("aria-pressed", cat === "all" ? "true" : "false");

    btn.addEventListener("click", function () {
      // Update active state
      filterContainer.querySelectorAll(".btn-filter").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      this.classList.add("active");
      this.setAttribute("aria-pressed", "true");

      renderMenus(this.dataset.category);
    });

    filterContainer.appendChild(btn);
  });
}

/* ============================================================
   SEARCH
   ============================================================ */

function initSearch() {
  const searchInput = document.getElementById("menuSearch");
  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    const container = document.getElementById("menuGrid");
    if (!container) return;

    // Reset filter button
    document.querySelectorAll(".btn-filter").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    const allBtn = document.querySelector('[data-category="all"]');
    if (allBtn) {
      allBtn.classList.add("active");
      allBtn.setAttribute("aria-pressed", "true");
    }

    const filtered = MENUS.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.category.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query)
    );

    while (container.firstChild) container.removeChild(container.firstChild);

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "col-12 text-center py-5";
      empty.innerHTML = `<p class="text-muted fs-5">Menu "<strong>${query}</strong>" tidak ditemukan.</p>`;
      container.appendChild(empty);
      return;
    }

    filtered.forEach((menu, index) => {
      const card = createMenuCard(menu);
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = `opacity 0.4s ease ${index * 70}ms, transform 0.4s ease ${index * 70}ms`;
      container.appendChild(card);
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        container.querySelectorAll(".col-6, .col-12").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initFilterButtons();
  renderMenus();
  initSearch();
});