// Excel Ventures — site behavior
// Compiled with tsc to dist/main.js (see tsconfig.json)

(function (): void {
  'use strict';

  function onReady(fn: () => void): void {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /** Mobile nav toggle */
  function initNavToggle(): void {
    const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
    const links = document.querySelector<HTMLUListElement>('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen ? '\u2715' : '\u2630';
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '\u2630';
      });
    });
  }

  /** Highlight the current page in the nav */
  function initActiveLink(): void {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll<HTMLAnchorElement>('.nav-links a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href === current || (current === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /** Reveal elements as they scroll into view */
  function initScrollReveal(): void {
    const targets = document.querySelectorAll<HTMLElement>('.reveal');
    if (targets.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /** Contact form: client-side validation + status message (no backend wired up) */
  function initContactForm(): void {
    const form = document.querySelector<HTMLFormElement>('#contact-form');
    const status = document.querySelector<HTMLElement>('.form-status');
    if (!form || !status) return;

    form.addEventListener('submit', (event: SubmitEvent) => {
      event.preventDefault();

      const name = (form.querySelector<HTMLInputElement>('#name')?.value || '').trim();
      const email = (form.querySelector<HTMLInputElement>('#email')?.value || '').trim();
      const message = (form.querySelector<HTMLTextAreaElement>('#message')?.value || '').trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        status.textContent = 'Please fill in every field before sending.';
        return;
      }
      if (!emailPattern.test(email)) {
        status.textContent = 'That email address doesn\u2019t look right.';
        return;
      }

      status.textContent = `Thank you, ${name}. Your enquiry has been noted — we\u2019ll reply within 1 business day.`;
      form.reset();
    });
  }

  onReady(() => {
    initNavToggle();
    initActiveLink();
    initScrollReveal();
    initContactForm();
  });
})();
