/* ================================================
   Mohamed Ibrahim Mohamed · Portfolio
   Language engine: data-en / data-ar attributes
   ================================================ */
'use strict';

// ── STATE ──────────────────────────────────────
let lang   = localStorage.getItem('mim-lang') || 'en';
let isOpen = false;

// ── BOOT ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyLang(lang);
  initBar();
  initReveal();
  initSpine();
  initBars();
  initScroll();
});

// ── LANGUAGE ENGINE ────────────────────────────
/*
  Strategy: every translatable node carries data-en and data-ar.
  applyLang() walks all [data-en] elements and writes the correct
  attribute value into innerHTML (supports embedded HTML like <em>).
  The HTML element gets lang= and dir= for font/RTL switching via CSS.
  No visibility hacks. No !important wars. Pure JS text swap.
*/
window.setLang = function(l) {
  if (l === lang) return;
  lang = l;
  localStorage.setItem('mim-lang', l);
  applyLang(l);
  if (isOpen) closeNav();
};

function applyLang(l) {
  // 1. Switch HTML direction & lang (drives all CSS RTL rules)
  document.documentElement.lang = l;
  document.documentElement.dir  = l === 'ar' ? 'rtl' : 'ltr';

  // 2. Page title
  document.title = l === 'ar'
    ? 'محمد إبراهيم محمد — باحث · إذاعي · مربٍّ'
    : 'Mohamed Ibrahim Mohamed — Researcher · Broadcaster · Educator';

  // 3. Swap all translatable elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + l);
    if (text !== null) el.innerHTML = text;
  });

  // 4. Spine dot labels (data-label attribute used by CSS ::after)
  document.querySelectorAll('.sdot').forEach(dot => {
    const label = dot.getAttribute('data-' + l);
    if (label) dot.setAttribute('data-label', label);
  });

  // 5. Active lang buttons
  document.getElementById('btn-en').classList.toggle('active', l === 'en');
  document.getElementById('btn-ar').classList.toggle('active', l === 'ar');

  // 6. Re-trigger skill bars in case layout changed
  setTimeout(retriggerBars, 200);
}

// ── TOPBAR ─────────────────────────────────────
function initBar() {
  const bar = document.getElementById('bar');
  window.addEventListener('scroll', () => {
    bar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

window.toggleNav = function() { isOpen ? closeNav() : openNav(); };
window.closeNav  = function() {
  isOpen = false;
  document.getElementById('drop').classList.remove('open');
  document.getElementById('ham').setAttribute('aria-expanded','false');
};
function openNav() {
  isOpen = true;
  document.getElementById('drop').classList.add('open');
  document.getElementById('ham').setAttribute('aria-expanded','true');
}
document.addEventListener('click', e => {
  if (!isOpen) return;
  if (!document.getElementById('bar').contains(e.target)) closeNav();
});

// ── REVEAL ON SCROLL ───────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.rv');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => io.observe(el));
}

// ── SPINE NAVIGATION ───────────────────────────
function initSpine() {
  const dots = document.querySelectorAll('.sdot');
  const ids  = ['hero','journey','research','experience','education','skills','contact'];
  const secs = ids.map(id => document.getElementById(id)).filter(Boolean);

  // set initial labels from current lang
  dots.forEach(dot => {
    const lbl = dot.getAttribute('data-' + lang);
    if (lbl) dot.setAttribute('data-label', lbl);
  });

  // click → scroll
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const sec = document.getElementById(dot.dataset.sec);
      if (sec) smoothTo(sec);
    });
  });

  // active dot on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        dots.forEach(d => d.classList.toggle('active', d.dataset.sec === id));
      }
    });
  }, { threshold: 0.35 });
  secs.forEach(s => io.observe(s));
}

// ── SKILL BARS ─────────────────────────────────
function initBars() {
  const fills = document.querySelectorAll('.sbar-fill');
  if (!fills.length) return;
  fills.forEach(f => { f.style.width = '0'; });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = (e.target.dataset.w || '0') + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  fills.forEach(f => io.observe(f));
}

function retriggerBars() {
  document.querySelectorAll('.sbar-fill').forEach(f => {
    const rect = f.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      f.style.width = (f.dataset.w || '0') + '%';
    }
  });
}

// ── SMOOTH SCROLL ──────────────────────────────
function initScroll() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    smoothTo(target);
    if (isOpen) closeNav();
  });
}

function smoothTo(el) {
  const barH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--bar-h'), 10
  ) || 62;
  const top = el.getBoundingClientRect().top + window.scrollY - barH;
  window.scrollTo({ top, behavior: 'smooth' });
}