/**
 * detail.js — Bakso Dhimas
 * Logic halaman detail menu: ambil ID dari URL, render detail, generate WA link.
 */

"use strict";

/* ============================================================
   GET MENU BY ID
   ============================================================ */

/**
 * Ambil ID dari URL query string.
 * @returns {number|null}
 */
function getMenuIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  return isNaN(id) ? null : id;
}

/**
 * Cari menu dari MENUS array berdasarkan ID.
 * @param {number} id
 * @returns {Object|undefined}
 */
function findMenuById(id) {
  return MENUS.find((menu) => menu.id === id);
}

/* ============================================================
   RENDER: NOT FOUND
   ============================================================ */

/**
 * Tampilkan pesan "menu tidak ditemukan" di container.
 * @param {HTMLElement} container
 */
function renderNotFound(container) {
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "text-center py-5";

  const icon = document.createElement("div");
  icon.className = "mb-4";
  icon.innerHTML = `<i class="bi bi-emoji-frown" style="font-size:5rem; color:var(--primary);"></i>`;

  const title = document.createElement("h2");
  title.className = "fw-bold mb-3";
  title.textContent = "Menu Tidak Ditemukan";

  const msg = document.createElement("p");
  msg.className = "text-muted mb-4";
  msg.textContent =
    "Menu yang kamu cari tidak tersedia. Mungkin sudah habis atau ID tidak valid.";

  const btnBack = document.createElement("a");
  btnBack.href = "menu.html";
  btnBack.className = "btn btn-primary btn-lg me-2";
  btnBack.innerHTML = `<i class="bi bi-arrow-left me-2"></i>Kembali ke Menu`;

  const btnHome = document.createElement("a");
  btnHome.href = "index.html";
  btnHome.className = "btn btn-outline-secondary btn-lg";
  btnHome.innerHTML = `<i class="bi bi-house me-2"></i>Beranda`;

  wrapper.appendChild(icon);
  wrapper.appendChild(title);
  wrapper.appendChild(msg);
  wrapper.appendChild(btnBack);
  wrapper.appendChild(btnHome);
  container.appendChild(wrapper);
}

/* ============================================================
   RENDER: DETAIL PAGE
   ============================================================ */

/**
 * Render detail menu ke halaman.
 * @param {Object} menu
 * @param {HTMLElement} container
 */
function renderMenuDetail(menu, container) {
  container.innerHTML = "";

  // Breadcrumb
  const breadcrumbNav = document.createElement("nav");
  breadcrumbNav.setAttribute("aria-label", "breadcrumb");
  breadcrumbNav.className = "mb-4";
  breadcrumbNav.innerHTML = `
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="index.html">Beranda</a></li>
      <li class="breadcrumb-item"><a href="menu.html">Menu</a></li>
      <li class="breadcrumb-item active" aria-current="page">${menu.name}</li>
    </ol>
  `;
  container.appendChild(breadcrumbNav);

  // Row 2 kolom
  const row = document.createElement("div");
  row.className = "row g-4 align-items-start";

  // ---- Kolom Kiri: Gambar ----
  const colImg = document.createElement("div");
  colImg.className = "col-12 col-lg-6";

  const imgWrapper = document.createElement("div");
  imgWrapper.className = "detail-img-wrapper";

  const img = document.createElement("img");
  img.src = menu.image;
  img.alt = menu.name;
  img.className = "detail-img";
  img.onerror = function () {
    this.src =
      "https://via.placeholder.com/800x600/C62828/ffffff?text=Bakso+Dhimas";
  };

  const badge = document.createElement("span");
  badge.className = `badge detail-badge ${menu.badgeClass}`;
  badge.textContent = menu.badge;

  imgWrapper.appendChild(img);
  imgWrapper.appendChild(badge);
  colImg.appendChild(imgWrapper);

  // ---- Kolom Kanan: Info ----
  const colInfo = document.createElement("div");
  colInfo.className = "col-12 col-lg-6";

  const detailBody = document.createElement("div");
  detailBody.className = "detail-body";

  // Kategori
  const category = document.createElement("span");
  category.className = "detail-category";
  category.textContent = menu.category;

  // Nama menu
  const title = document.createElement("h1");
  title.className = "detail-title";
  title.textContent = menu.name;

  // Harga
  const priceWrapper = document.createElement("div");
  priceWrapper.className = "detail-price-wrapper";
  const price = document.createElement("span");
  price.className = "detail-price";
  price.textContent = formatRupiah(menu.price);
  const perPorsi = document.createElement("span");
  perPorsi.className = "detail-per-porsi";
  perPorsi.textContent = "/ porsi";
  priceWrapper.appendChild(price);
  priceWrapper.appendChild(perPorsi);

  // Divider
  const hr = document.createElement("hr");
  hr.className = "detail-divider";

  // Deskripsi panjang
  const descLabel = document.createElement("h6");
  descLabel.className = "detail-section-label";
  descLabel.textContent = "Deskripsi";

  const desc = document.createElement("p");
  desc.className = "detail-desc";
  desc.textContent = menu.longDescription;

  // Info box
  const infoBox = buildInfoBox(menu);

  // CTA buttons
  const ctaWrapper = document.createElement("div");
  ctaWrapper.className = "detail-cta";

  const btnWA = document.createElement("a");
  btnWA.href = generateWALink(menu.name);
  btnWA.target = "_blank";
  btnWA.rel = "noopener noreferrer";
  btnWA.className = "btn btn-wa btn-lg w-100 mb-2";
  btnWA.setAttribute("aria-label", `Pesan ${menu.name} via WhatsApp`);
  btnWA.innerHTML = `<i class="bi bi-whatsapp me-2"></i>Pesan via WhatsApp`;

  const btnBack = document.createElement("a");
  btnBack.href = "menu.html";
  btnBack.className = "btn btn-outline-primary w-100";
  btnBack.innerHTML = `<i class="bi bi-arrow-left me-2"></i>Lihat Menu Lain`;

  ctaWrapper.appendChild(btnWA);
  ctaWrapper.appendChild(btnBack);

  detailBody.appendChild(category);
  detailBody.appendChild(title);
  detailBody.appendChild(priceWrapper);
  detailBody.appendChild(hr);
  detailBody.appendChild(descLabel);
  detailBody.appendChild(desc);
  detailBody.appendChild(infoBox);
  detailBody.appendChild(ctaWrapper);
  colInfo.appendChild(detailBody);

  row.appendChild(colImg);
  row.appendChild(colInfo);
  container.appendChild(row);

  // Related menus
  const related = buildRelatedMenus(menu);
  if (related) container.appendChild(related);
}

/**
 * Buat info box (100% sapi, tanpa pengawet, dll).
 * @param {Object} menu
 * @returns {HTMLElement}
 */
function buildInfoBox(menu) {
  const box = document.createElement("div");
  box.className = "detail-info-box mb-4";

  const items = [
    { icon: "bi-check-circle-fill", text: "100% Daging Sapi Segar" },
    { icon: "bi-check-circle-fill", text: "Tanpa Pengawet Buatan" },
    { icon: "bi-check-circle-fill", text: "Harga Ramah Mahasiswa" },
  ];

  items.forEach(({ icon, text }) => {
    const item = document.createElement("div");
    item.className = "detail-info-item";

    const ico = document.createElement("i");
    ico.className = `bi ${icon} text-success me-2`;

    const span = document.createElement("span");
    span.textContent = text;

    item.appendChild(ico);
    item.appendChild(span);
    box.appendChild(item);
  });

  return box;
}

/**
 * Buat section menu terkait (kategori sama).
 * @param {Object} currentMenu
 * @returns {HTMLElement|null}
 */
function buildRelatedMenus(currentMenu) {
  const related = MENUS.filter(
    (m) => m.category === currentMenu.category && m.id !== currentMenu.id
  ).slice(0, 3);

  if (related.length === 0) return null;

  const section = document.createElement("section");
  section.className = "related-section mt-5";

  const heading = document.createElement("h3");
  heading.className = "related-heading mb-4";
  heading.textContent = "Menu Serupa";

  const row = document.createElement("div");
  row.className = "row g-3";

  related.forEach((menu) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-4";

    const card = document.createElement("div");
    card.className = "related-card";

    const img = document.createElement("img");
    img.src = menu.image;
    img.alt = menu.name;
    img.className = "related-card__img";
    img.loading = "lazy";
    img.onerror = function () {
      this.src =
        "https://via.placeholder.com/300x200/C62828/ffffff?text=Bakso+Dhimas";
    };

    const body = document.createElement("div");
    body.className = "related-card__body";

    const name = document.createElement("h6");
    name.className = "related-card__name";
    name.textContent = menu.name;

    const price = document.createElement("span");
    price.className = "related-card__price";
    price.textContent = formatRupiah(menu.price);

    const link = document.createElement("a");
    link.href = `detail.html?id=${menu.id}`;
    link.className = "stretched-link";
    link.setAttribute("aria-label", `Lihat detail ${menu.name}`);

    body.appendChild(name);
    body.appendChild(price);
    card.appendChild(img);
    card.appendChild(body);
    card.appendChild(link);
    col.appendChild(card);
    row.appendChild(col);
  });

  section.appendChild(heading);
  section.appendChild(row);
  return section;
}

/* ============================================================
   UPDATE DOCUMENT TITLE & META
   ============================================================ */

function updatePageMeta(menu) {
  document.title = `${menu.name} — ${BRAND_NAME}`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", menu.description);
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("detailContent");
  if (!container) return;

  const id = getMenuIdFromURL();
  if (id === null) {
    renderNotFound(container);
    return;
  }

  const menu = findMenuById(id);
  if (!menu) {
    renderNotFound(container);
    return;
  }

  renderMenuDetail(menu, container);
  updatePageMeta(menu);
});
