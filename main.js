// Grace & Glamour — shared behaviour
(function () {
    'use strict';

    const WA_NUMBER = '26776146451';
    const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    const enquiry = (name) => waLink(`Hi Grace & Glamour! I'm interested in the ${name}. Is it available?`);
    const products = window.GG_PRODUCTS || [];
    const CATS = { gold: 'Gold Sets', crystal: 'Crystal & Gemstone', pearl: 'Pearls', wig: 'Wigs' };

    try { sessionStorage.setItem('gg-seen', '1'); } catch (e) { /* private mode */ }

    // Generic WhatsApp links: <a data-wa="message">
    document.querySelectorAll('[data-wa]').forEach((a) => {
        a.href = waLink(a.dataset.wa || "Hi Grace & Glamour! I'd like to place an order.");
        a.target = '_blank';
        a.rel = 'noopener';
    });

    // Footer year
    document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

    // Header shadow + mobile menu
    const header = document.querySelector('.site-header');
    const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const menuBtn = document.querySelector('.menu-btn');
    const setMenu = (open) => {
        document.body.classList.toggle('menu-open', open);
        document.body.classList.toggle('locked', open);
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', open);
            menuBtn.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
        }
    };
    if (menuBtn) {
        menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
        document.querySelectorAll('.overlay-nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
        window.matchMedia('(min-width: 960px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });
    }

    // Card / item markup
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const enquireLink = (p) => `<a class="text-link" href="${enquiry(p.name)}" target="_blank" rel="noopener">Enquire <i class="fa-solid fa-arrow-right"></i></a>`;

    // Home: featured rail
    const rail = document.querySelector('[data-rail]');
    if (rail) {
        const ids = (rail.dataset.rail || '').split(',');
        rail.innerHTML = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean).map((p) => `
            <article class="card">
                <div class="card-img"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy" decoding="async"></div>
                <h3>${esc(p.name)}</h3>
                <p>${esc(p.desc)}</p>
                ${enquireLink(p)}
            </article>`).join('');
        const step = () => (rail.querySelector('.card')?.offsetWidth || 300) + 24;
        document.querySelector('[data-rail-prev]')?.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
        document.querySelector('[data-rail-next]')?.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
    }

    // Shop pages: gallery, filters, lightbox
    const gallery = document.querySelector('[data-gallery]');
    if (gallery) {
        const group = gallery.dataset.gallery; // 'jewellery' or 'wig'
        const list = products.filter((p) => (group === 'wig' ? p.cat === 'wig' : p.cat !== 'wig'));
        let visible = list.slice();

        gallery.innerHTML = list.map((p, i) => `
            <article class="item" data-cat="${p.cat}">
                <button class="item-img" type="button" data-i="${i}" aria-label="View ${esc(p.name)} larger">
                    <img src="${p.img}" width="${p.w}" height="${p.h}" alt="${esc(p.name)} — ${esc(p.desc)}" loading="lazy" decoding="async">
                </button>
                <span class="cat" style="display:block;margin-top:1.6rem">${CATS[p.cat]}</span>
                <h3 style="margin-top:.6rem">${esc(p.name)}</h3>
                <p>${esc(p.desc)}</p>
                ${enquireLink(p)}
            </article>`).join('');

        const items = [...gallery.querySelectorAll('.item')];
        const countEl = document.querySelector('[data-count]');
        const filterBtns = [...document.querySelectorAll('[data-filter]')];

        const applyFilter = (f) => {
            visible = [];
            items.forEach((el, i) => {
                const show = f === 'all' || el.dataset.cat === f;
                el.hidden = !show;
                if (show) visible.push(list[i]);
            });
            filterBtns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.filter === f));
            if (countEl) countEl.textContent = `Showing ${visible.length} ${visible.length === 1 ? 'piece' : 'pieces'}`;
            if (history.replaceState) history.replaceState(null, '', f === 'all' ? location.pathname : `#${f}`);
        };
        filterBtns.forEach((b) => b.addEventListener('click', () => applyFilter(b.dataset.filter)));
        const initial = location.hash.slice(1);
        applyFilter(filterBtns.some((b) => b.dataset.filter === initial) ? initial : 'all');

        // Lightbox
        const lb = document.querySelector('.lightbox');
        if (lb && typeof lb.showModal === 'function') {
            const lbImg = lb.querySelector('img');
            const lbName = lb.querySelector('h3');
            const lbDesc = lb.querySelector('p');
            const lbLink = lb.querySelector('a');
            let idx = 0;
            const show = (n) => {
                idx = (n + visible.length) % visible.length;
                const p = visible[idx];
                lbImg.src = p.img;
                lbImg.alt = p.name;
                lbName.textContent = p.name;
                lbDesc.textContent = p.desc;
                lbLink.href = enquiry(p.name);
            };
            gallery.addEventListener('click', (e) => {
                const btn = e.target.closest('.item-img');
                if (!btn) return;
                const p = list[+btn.dataset.i];
                show(visible.indexOf(p));
                lb.showModal();
                document.body.classList.add('locked');
            });
            lb.addEventListener('close', () => document.body.classList.remove('locked'));
            lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
            lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
            lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
            lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-inner')) lb.close(); });
            lb.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') show(idx - 1);
                if (e.key === 'ArrowRight') show(idx + 1);
            });
        }
    }

    // Contact form → opens WhatsApp with the message pre-filled
    const form = document.querySelector('[data-wa-form]');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const d = new FormData(form);
            const lines = [
                `Hi Grace & Glamour! My name is ${d.get('name')}.`,
                `I'm interested in: ${d.get('interest')}.`,
                d.get('message') ? `${d.get('message')}` : '',
                d.get('phone') ? `You can reach me on ${d.get('phone')}.` : ''
            ].filter(Boolean);
            window.open(waLink(lines.join('\n')), '_blank', 'noopener');
        });
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        reveals.forEach((el) => io.observe(el));
    } else {
        reveals.forEach((el) => el.classList.add('in'));
    }
})();
