function animateOfferBadge() {
  const badge = document.querySelector('.offer__img');
  if (!badge) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        badge.classList.add('animate-in');
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(badge);
}

function animateOfferList() {
  const offerList = document.querySelector('.offer__list');
  if (!offerList) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        offerList.classList.add('animate-in');
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(offerList);
}

function animateLetters(element, delayStart = 0) {
  const text = element.textContent.trim().replace(/\s+/g, ' ');
  element.innerHTML = '';
  const letters = Array.from(text);

  letters.forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    span.style.transition = 'opacity 0.3s ease';
    span.style.transitionDelay = `${delayStart + i * 50}ms`;
    element.appendChild(span);
  });

  setTimeout(() => {
    Array.from(element.children).forEach(span => {
      span.style.opacity = '1';
    });
  }, 50); 
}

function animateOfferTitlesAndDetails() {
  const titles = document.querySelectorAll('.offer__title');
  const details = document.querySelector('.offer__details');
  if (!titles.length || !details) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        titles.forEach((title, idx) => {
          animateLetters(title, idx * 500);
        });

        details.classList.add('animate');
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(titles[0]);
}

window.addEventListener('DOMContentLoaded', () => {
  animateOfferBadge();
  animateOfferList();
  animateOfferTitlesAndDetails();
});
