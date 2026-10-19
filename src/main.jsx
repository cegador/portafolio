import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { buildAnims } from './anims.js';

// Animaciones SVG de las tarjetas
const anims = buildAnims();
document.querySelectorAll('[data-anim]').forEach((el) => {
  const node = anims['anim' + el.dataset.anim];
  if (node) createRoot(el).render(node);
});

// Estilos hover declarados en el atributo style-hover
document.querySelectorAll('[style-hover]').forEach((el) => {
  const base = el.getAttribute('style') || '';
  const hover = el.getAttribute('style-hover');
  el.addEventListener('mouseenter', () => el.setAttribute('style', base + ';' + hover));
  el.addEventListener('mouseleave', () => el.setAttribute('style', base));
});

// Efecto de profundidad al hacer scroll
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reduce.matches) {
  document.querySelectorAll('svg').forEach((s) => s.pauseAnimations && s.pauseAnimations());
}
let raf = 0;
function applyDepth() {
  raf = 0;
  const on = !reduce.matches;
  const vh = window.innerHeight;
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (!on) { el.style.transform = ''; el.style.opacity = ''; return; }
    const top = el.getBoundingClientRect().top;
    const t = Math.min(Math.max((top - vh * 0.6) / (vh * 0.35), 0), 1);
    const e = t * t * (3 - 2 * t);
    el.style.transformOrigin = '50% 0%';
    el.style.willChange = 'transform, opacity';
    el.style.transform = e ? 'perspective(2400px) rotateX(-' + (e * 10).toFixed(2) + 'deg) translateY(' + (e * 40).toFixed(1) + 'px)' : 'none';
    el.style.opacity = (1 - e * 0.6).toFixed(3);
  });
}
const onScroll = () => { if (!raf) raf = requestAnimationFrame(applyDepth); };
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();
