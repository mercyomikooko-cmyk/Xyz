// Excel Ventures — site behavior
// Compiled with tsc to dist/main.js (see tsconfig.json)
(function () {
    'use strict';
    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        }
        else {
            fn();
        }
    }
    /** Mobile nav toggle */
    function initNavToggle() {
        const toggle = document.querySelector('.nav-toggle');
        const links = document.querySelector('.nav-links');
        if (!toggle || !links)
            return;
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
    function initActiveLink() {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach((link) => {
            const href = link.getAttribute('href') || '';
            if (href === current || (current === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    /** Reveal elements as they scroll into view */
    function initScrollReveal() {
        const targets = document.querySelectorAll('.reveal');
        if (targets.length === 0)
            return;
        if (!('IntersectionObserver' in window)) {
            targets.forEach((el) => el.classList.add('in'));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        targets.forEach((el) => observer.observe(el));
    }
    /** Contact form: client-side validation + status message (no backend wired up) */
    function initContactForm() {
        const form = document.querySelector('#contact-form');
        const status = document.querySelector('.form-status');
        if (!form || !status)
            return;
        form.addEventListener('submit', (event) => {
            var _a, _b, _c;
            event.preventDefault();
            const name = (((_a = form.querySelector('#name')) === null || _a === void 0 ? void 0 : _a.value) || '').trim();
            const email = (((_b = form.querySelector('#email')) === null || _b === void 0 ? void 0 : _b.value) || '').trim();
            const message = (((_c = form.querySelector('#message')) === null || _c === void 0 ? void 0 : _c.value) || '').trim();
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
export {};
//# sourceMappingURL=main.js.map