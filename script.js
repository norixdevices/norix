const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !expanded);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement && window.matchMedia('(max-width: 600px)').matches) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
      menuButton.focus();
    }
  });
}

const sectionLinks = [...document.querySelectorAll('#primary-nav a[href^="#"]')];
const linkedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (linkedSections.length && 'IntersectionObserver' in window) {
  const sectionLinkObserver = new IntersectionObserver((entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;

    sectionLinks.forEach((link) => {
      if (link.hash === `#${current.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.1, 0.4, 0.75] });

  linkedSections.forEach((section) => sectionLinkObserver.observe(section));
}

const year = document.querySelector('#currentYear');
if (year) year.textContent = String(new Date().getFullYear());

const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');
if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const subject = `NORIX enquiry from ${formData.get('name')}`;
    const body = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Phone: ${formData.get('phone')}`,
      '',
      'Enquiry:',
      formData.get('message'),
    ].join('\n');
    formStatus.dataset.state = 'ready';
    formStatus.textContent = 'Your email app should open with a draft. Review it and send it to complete your enquiry.';
    window.location.href = `mailto:Norixdevices@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const revealItems = [...document.querySelectorAll('[data-reveal]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else if (revealItems.length) {
  try {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    document.documentElement.classList.add('motion-ready');
    revealItems.forEach((item) => revealObserver.observe(item));
  } catch {
    document.documentElement.classList.remove('motion-ready');
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
}
