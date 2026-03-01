/**
 * main.js — Bakso Dhimas
 * Global logic: navbar, side drawer, smooth scroll, floating WA button, utilities.
 */

"use strict";

/* ============================================================
   UTILITIES
   ============================================================ */

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function generateWALink(menuName) {
  const text = encodeURIComponent(`Halo ${BRAND_NAME}, saya ingin pesan ${menuName}`);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

/* ============================================================
   NAVBAR — ACTIVE STATE & SCROLL
   ============================================================ */

function initActiveNavbar() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Desktop nav links
  document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
    const page = link.getAttribute("data-page");
    const isActive = currentPage === page || (currentPage === "" && page === "index.html");
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
  });

  // Side drawer items
  document.querySelectorAll(".side-drawer__item[data-page]").forEach((item) => {
    const page = item.getAttribute("data-page");
    const isActive = currentPage === page || (currentPage === "" && page === "index.html");
    item.classList.toggle("side-drawer__item--active", isActive);
  });
}

function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle("navbar-scrolled", window.scrollY > 50);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   SIDE DRAWER
   ============================================================ */

function initSideDrawer() {
  const hamburger  = document.getElementById("navHamburger");
  const drawer     = document.getElementById("sideDrawer");
  const overlay    = document.getElementById("drawerOverlay");
  const closeBtn   = document.getElementById("drawerClose");

  if (!hamburger || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add("is-open");
    overlay.classList.add("is-visible");
    document.body.classList.add("drawer-open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.classList.add("is-active");
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    document.body.classList.remove("drawer-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.classList.remove("is-active");
    hamburger.focus();
  }

  hamburger.addEventListener("click", () => {
    drawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
  });

  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  // Tutup drawer saat klik link di dalam drawer
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      // Beri sedikit delay agar navigasi bisa terjadi
      setTimeout(closeDrawer, 150);
    });
  });

  // Tutup dengan tombol Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer();
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ============================================================
   FLOATING WHATSAPP BUTTON
   ============================================================ */

function initFloatingWA() {
  const floatingBtn = document.getElementById("floatingWA");
  if (!floatingBtn) return;

  const generalText = encodeURIComponent(`Halo ${BRAND_NAME}, saya ingin bertanya tentang menu dan pemesanan.`);
  floatingBtn.href = `https://wa.me/${WA_NUMBER}?text=${generalText}`;
  floatingBtn.target = "_blank";
  floatingBtn.rel = "noopener noreferrer";

  const toggleVisibility = () => floatingBtn.classList.toggle("visible", window.scrollY > 300);
  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();
}

/* ============================================================
   SCROLL ANIMATION (Intersection Observer)
   ============================================================ */

function initScrollAnimation() {
  const els = document.querySelectorAll(".animate-on-scroll");
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  els.forEach((el) => observer.observe(el));
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initActiveNavbar();
  initNavbarScroll();
  initSideDrawer();
  initSmoothScroll();
  initFloatingWA();
  initScrollAnimation();
});