// MATRIX TEXT

const elements = document.querySelectorAll('.hero__details-text');
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=<>?';

function randomChar() {
  return characters[Math.floor(Math.random() * characters.length)];
}

function revealText(element) {
  const original = element.textContent;
  const length = original.length;
  let frame = 0;
  const totalFrames = 30; 

  element.textContent = original.split('').map(() => randomChar()).join('');
  element.style.opacity = '0.8';

  const randomDelays = Array.from({ length }, () =>
    Math.floor(Math.random() * totalFrames)
  );

  const interval = setInterval(() => {
    let output = '';
    let done = true;

    for (let i = 0; i < length; i++) {
      if (frame >= randomDelays[i]) {
        output += original[i];
      } else {
        output += randomChar();
        done = false;
      }
    }

    element.textContent = output;

    if (done) {
      clearInterval(interval);
    }

    frame++;
  }, 80); 
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      setTimeout(() => {
        el.style.opacity = '1';
        revealText(el);
      }, index * 1800); 
      obs.unobserve(el); 
    }
  });
}, {
  threshold: 0.3 
});

elements.forEach(el => {
  el.style.opacity = '0'; 
  observer.observe(el);
});

// SCROLLING FRAMES

const frame = document.getElementById("frame");
const overlay = document.querySelector(".hero__video-overlay");
const heroSection = document.querySelector(".hero");
const totalFrames = 201;

let currentFrame = 1;
let ticking = false;
let previousScrollTop = window.scrollY;

function updateFrame(index) {
  frame.src = `frames/MAIN_ANIM (${index}).webp`;
}

function updateOverlay(frameIndex) {
  const fadeOutStart = 1;
  const fadeOutEnd = 60;
  const secondAppearStart = 150;
  const secondAppearEnd = 200;

  if (frameIndex < fadeOutStart) {
    overlay.style.opacity = "1";
    overlay.style.height = "50%";
    return;
  }

  if (frameIndex >= fadeOutStart && frameIndex <= fadeOutEnd) {
    const progress = (frameIndex - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    const reverse = 1 - progress;
    overlay.style.opacity = `${reverse}`;
    overlay.style.height = `${reverse * 50}%`;
    return;
  }

  if (frameIndex > fadeOutEnd && frameIndex < secondAppearStart) {
    overlay.style.opacity = "0";
    overlay.style.height = "0%";
    return;
  }

  if (frameIndex >= secondAppearStart && frameIndex <= secondAppearEnd) {
    const progress = (frameIndex - secondAppearStart) / (secondAppearEnd - secondAppearStart);
    overlay.style.opacity = `${progress}`;
    overlay.style.height = `${progress * 100}%`;
    return;
  }

  overlay.style.opacity = "0";
  overlay.style.height = "0%";
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      const maxScroll = Math.max(heroHeight - window.innerHeight - 100, 1);

      const heroRect = heroSection.getBoundingClientRect();
      const isInView = heroRect.top < window.innerHeight && heroRect.bottom > 0;

      if (!isInView) {
        if (currentFrame !== 201) {
          currentFrame = 201;
          updateFrame(currentFrame);
        }
        overlay.style.opacity = "0";
        overlay.style.height = "0%";
        ticking = false;
        return;
      }

      const scrollFraction = Math.min(scrollTop / maxScroll, 1);
      const frameIndex = Math.max(1, Math.floor(scrollFraction * totalFrames));

      if (scrollTop < previousScrollTop && heroRect.top < window.innerHeight) {
        overlay.style.transition = "opacity 0.5s, height 0.5s";
        overlay.style.opacity = "1";
        overlay.style.height = "50%";
      }

      if (frameIndex !== currentFrame) {
        currentFrame = frameIndex;
        updateFrame(currentFrame);
      }

      updateOverlay(frameIndex);

      previousScrollTop = scrollTop;
      ticking = false;
    });

    ticking = true;
  }
}


window.addEventListener("scroll", onScroll);
window.addEventListener("touchmove", onScroll); 
window.addEventListener("resize", onScroll); 

const fixedOverlay = document.querySelector('.hero__video-overlay.hero__mob');

window.addEventListener('scroll', () => {
  const rect = heroSection.getBoundingClientRect();
  if(fixedOverlay) {
    if (rect.top <= 0 && rect.bottom >= 200) {
      fixedOverlay.style.display = 'block';
    } else {
      fixedOverlay.style.display = 'none';
    }
  }
});



// ANIMATED TEXT
function animateLettersInLine(lineElement, delayStart = 0) {
  const text = lineElement.textContent;
  lineElement.innerHTML = '';
  const letters = Array.from(text); 

  const letterDelay = 50;

  letters.forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    span.style.transition = 'opacity 0.2s ease';
    lineElement.appendChild(span);

    setTimeout(() => {
      span.style.opacity = '1';
    }, delayStart + i * letterDelay);
  });

  return letters.length * letterDelay;
}


function observeAndAnimate() {
  const leftTop = document.querySelector('.hero__animated-left .line-top');
  const leftBottom = document.querySelector('.hero__animated-left .line-bottom');
  const rightTop = document.querySelector('.hero__animated-right .line-top');
  const rightBottom = document.querySelector('.hero__animated-right .line-bottom');

  let hasAnimated = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;

        const pauseBetweenLines = 150;

        const t1 = animateLettersInLine(leftBottom, 0);
        const t2 = animateLettersInLine(leftTop, t1 + pauseBetweenLines);
        const t3 = animateLettersInLine(rightBottom, t1 + t2 + pauseBetweenLines);
        animateLettersInLine(rightTop, t1 + t2 + t3 + pauseBetweenLines);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(document.querySelector('.hero__animated'));
}

window.addEventListener('DOMContentLoaded', observeAndAnimate);
