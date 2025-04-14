document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.images);
  const videos = Array.from(document.querySelectorAll("video"));
  const total = images.length + videos.length;
  let loaded = 0;

  if (total === 0) {
    hidePreloader();
    return;
  }

  const updateProgress = () => {
    loaded++;
    const percent = Math.round((loaded / total) * 100);
    document.querySelector(".loader__line-inner").style.width = `${percent}%`;
    document.querySelector(".loader__percent-number").textContent = `${percent}`;
    if (loaded === total) {
      setTimeout(hidePreloader, 500);
    }
  };

  images.forEach((img) => {
    const clone = new Image();
    clone.onload = clone.onerror = updateProgress;
    clone.src = img.src;
  });

  videos.forEach((video) => {
    if (video.readyState >= 2) {
      updateProgress();
    } else {
      video.addEventListener("loadeddata", updateProgress, { once: true });
      video.addEventListener("error", updateProgress, { once: true });
    }
  });

  function hidePreloader() {
    const preloader = document.querySelector(".loader");
    preloader.style.transition = "opacity 0.5s";
    preloader.style.opacity = 0;
    document.body.classList.remove("no-scroll");
    setTimeout(() => preloader.remove(), 500);
  }
});
