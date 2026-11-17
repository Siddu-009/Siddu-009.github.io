const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = '☰';
}));

document.querySelectorAll('.skill-tabs button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.skill-tabs .selected')?.classList.remove('selected');
    button.classList.add('selected');
    const filter = button.dataset.filter;
    document.querySelectorAll('.skill-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();


// Subtle pointer parallax for the hero illustration (disabled on touch/reduced-motion devices).
const heroArt = document.querySelector('.hero-art');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroArt && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  heroArt.addEventListener('pointermove', (event) => {
    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroArt.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
  });
  heroArt.addEventListener('pointerleave', () => {
    heroArt.style.transform = '';
  });
}

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
if ('IntersectionObserver' in window && sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => navObserver.observe(section));
}
