/**
 * home.js — Bakso Dhimas
 * Logic khusus halaman index.html:
 * render 4 menu populer ke #previewGrid.
 *
 * Bergantung pada: data.js (MENUS, WA_NUMBER, BRAND_NAME)
 * Tidak bergantung pada menu.js atau fungsi eksternal lain.
 */

"use strict";

/* ============================================================
   UTILITIES (inline agar tidak bergantung urutan load)
   ============================================================ */

function _formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

/* ============================================================
   RENDER PREVIEW CARD
   ============================================================ */

/**
 * Buat card preview menu untuk halaman index.
 * @param {Object} menu
 * @param {number} index - untuk animation delay
 * @returns {HTMLElement}
 */
function createPreviewCard(menu, index) {
  const col = document.createElement("div");
  // Tidak pakai animate-on-scroll agar tidak tersembunyi saat observer belum jalan
  col.className = "col-12 col-sm-6 col-lg-3";
  col.style.opacity = "0";
  col.style.transform = "translateY(24px)";
  col.style.transition = `opacity 0.5s ease ${index * 120}ms, transform 0.5s ease ${index * 120}ms`;

  const card = document.createElement("article");
  card.className = "menu-card h-100";

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

  const badge = document.createElement("span");
  badge.className = `badge menu-card__badge ${menu.badgeClass}`;
  badge.textContent = menu.badge;

  imgWrapper.appendChild(img);
  imgWrapper.appendChild(badge);

  // Card body
  const body = document.createElement("div");
  body.className = "menu-card__body";

  const cat = document.createElement("span");
  cat.className = "menu-card__category";
  cat.textContent = menu.category;

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
  price.textContent = _formatRupiah(menu.price);

  const actions = document.createElement("div");
  actions.className = "menu-card__actions";

  const btnDetail = document.createElement("a");
  btnDetail.href = `detail.html?id=${menu.id}`;
  btnDetail.className = "btn btn-outline-primary btn-sm";
  btnDetail.textContent = "Lihat Detail";
  btnDetail.setAttribute("aria-label", `Lihat detail ${menu.name}`);

  const btnWA = document.createElement("a");
  const waText = encodeURIComponent(
    `Halo ${BRAND_NAME}, saya ingin pesan ${menu.name}`
  );
  btnWA.href = `https://wa.me/${WA_NUMBER}?text=${waText}`;
  btnWA.className = "btn btn-wa btn-sm";
  btnWA.target = "_blank";
  btnWA.rel = "noopener noreferrer";
  btnWA.setAttribute("aria-label", `Pesan ${menu.name} via WhatsApp`);
  const waIcon = document.createElement("i");
  waIcon.className = "bi bi-whatsapp me-1";
  btnWA.appendChild(waIcon);
  btnWA.appendChild(document.createTextNode("Pesan"));

  actions.appendChild(btnDetail);
  actions.appendChild(btnWA);

  footer.appendChild(price);
  footer.appendChild(actions);

  body.appendChild(cat);
  body.appendChild(title);
  body.appendChild(desc);
  body.appendChild(footer);

  card.appendChild(imgWrapper);
  card.appendChild(body);
  col.appendChild(card);

  return col;
}

/* ============================================================
   RENDER PREVIEW GRID
   ============================================================ */

function renderPreviewGrid() {
  const grid = document.getElementById("previewGrid");
  if (!grid) return;

  // Ambil 4 menu populer; jika kurang dari 4, ambil dari awal
  const popular = MENUS.filter((m) => m.isPopular).slice(0, 4);
  const toRender = popular.length >= 4 ? popular : MENUS.slice(0, 4);

  toRender.forEach((menu, index) => {
    grid.appendChild(createPreviewCard(menu, index));
  });

  // Trigger animasi setelah elemen masuk DOM
  // requestAnimationFrame memastikan browser sudah paint sekali dulu
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      grid.querySelectorAll(".col-12").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderPreviewGrid();
});