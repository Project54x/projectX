const imgs = document.querySelectorAll('.partnership__img');

imgs.forEach((img, index) => {
  const basePos = getBasePosition(index);

  if (basePos.top !== undefined) img.style.top = `${basePos.top}px`;
  if (basePos.left !== undefined) img.style.left = `${basePos.left}px`;
  if (basePos.bottom !== undefined) img.style.bottom = `${basePos.bottom}px`;
  if (basePos.right !== undefined) img.style.right = `${basePos.right}px`;

  img.dataset.baseTop = basePos.top;
  img.dataset.baseLeft = basePos.left;
  img.dataset.baseBottom = basePos.bottom;
  img.dataset.baseRight = basePos.right;

  animateAroundBase(img);
  animateVisuals(img);
  animateZIndex(img);
});

function getBasePosition(index) {
  const width = window.innerWidth;

  if (width > 1919) {
    return [
      { top: 155, left: 300 },
      { top: 123, right: 637 },
      { top: 277, right: 97 },
      { bottom: 283, left: -58 },
      { bottom: 272, left: 492 },
      { top: 392, right: 722 },
      { bottom: 120, right: 360 },
      { bottom: 234, right: -144 }
    ][index] || {};
  } else if (width > 1439) {
    return [
        { top: 32, left: 67 },
        { top: 0, right: 593 },
        { top: 154, right: 155 },
        { bottom: 192, left: -58 },
        { bottom: 181, left: 346 },
        { top: 269, right: 529 },
        { bottom: 33, right: 393 },
        { bottom: 142, right: -109 }
    ][index];
  }else if (width > 1023) {
    return [
        { top: 327, left: 148 },
        { bottom: 190, right: 124 },
        { top: 0, left: 215 },
        { top: 314, right: 145 },
        { bottom: 190, left: 95 },
        { top: 228, left: 19 },
        { top: 485, right: -93 },
        { top: 128, right: 48 }
    ][index];
  } else if (width > 577) {
    return [
        { top: 371, left: 168 },
        { bottom: 180, right: 79 },
        { top: 128, left: 218 },
        { top: 338, right: 0 },
        { bottom: 180, left: 30 },
        { top: 297, left: 72 },
        { top: 485, right: -28 },
        { bottom: 335, left: 255 }
    ][index];
  } else if (width > 429) {
    return [
        { top: 296, left: 63 },
        { bottom: 217, right: 40 },
        { top: 130, left: 63 },
        { top: 239, right: 16 },
        { bottom: 151, left: 38 },
        { top: 254, left: 8 },
        { top: 355, right: -20 },
        { bottom: 287, left: 158 }
    ][index];
  } else {
    return [
        { top: 296, left: 63 },
        { bottom: 217, right: -15 },
        { top: 151, left: 38 },
        { top: 239, right: -39 },
        { bottom: 151, left: 38 },
        { top: 254, left: 8 },
        { top: 355, right: -75 },
        { bottom: 287, left: 158 }
    ][index];
  }
}

function animateAroundBase(el) {
  const baseTop = parseFloat(el.dataset.baseTop);
  const baseLeft = parseFloat(el.dataset.baseLeft);
  const baseBottom = parseFloat(el.dataset.baseBottom);
  const baseRight = parseFloat(el.dataset.baseRight);
  const depth = Math.random();
  const move = 80 + depth * 100;

  gsap.to(el, {
    top: baseTop !== undefined ? `${baseTop + (Math.random() - 0.5) * move}px` : undefined,
    left: baseLeft !== undefined ? `${baseLeft + (Math.random() - 0.5) * move}px` : undefined,
    bottom: baseBottom !== undefined ? `${baseBottom + (Math.random() - 0.5) * move}px` : undefined,
    right: baseRight !== undefined ? `${baseRight + (Math.random() - 0.5) * move}px` : undefined,
    duration: 1.5 + Math.random() * 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

function animateVisuals(el) {
  const depth = Math.random();
  const opacity = 0.3 + depth * 0.6;

  gsap.to(el, {
    opacity,
    duration: 1.5 + Math.random() * 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });
}

function animateZIndex(el) {
  setInterval(() => {
    const newZ = Math.floor(Math.random() * 100);
    el.style.zIndex = newZ;

    if (newZ > 30) {
      el.style.filter = 'grayscale(1)';
      el.style.opacity = '1';

      gsap.to(el, {
        scale: 1,
        duration: 1,
        ease: "power2.out"
      });
    } else {
      el.style.filter = 'grayscale(1) blur(2px)';
      el.style.opacity = '1';

      gsap.to(el, {
        scale: 0.85,
        duration: 1,
        ease: "power2.out"
      });
    }
  }, 3000 + Math.random() * 3000);
}

window.on('resize', () => {
    imgs.forEach((img, index) => {
        const basePos = getBasePosition(index);
    
        if (basePos.top !== undefined) img.style.top = `${basePos.top}px`;
        if (basePos.left !== undefined) img.style.left = `${basePos.left}px`;
        if (basePos.bottom !== undefined) img.style.bottom = `${basePos.bottom}px`;
        if (basePos.right !== undefined) img.style.right = `${basePos.right}px`;
    
        img.dataset.baseTop = basePos.top;
        img.dataset.baseLeft = basePos.left;
        img.dataset.baseBottom = basePos.bottom;
        img.dataset.baseRight = basePos.right;
    });
    }
);