document.addEventListener("DOMContentLoaded", () => {
    const images = Array.from(document.images);
    const total = images.length;
    let loaded = 0;
  
    if (total === 0) {
      hidePreloader();
    }
  
    images.forEach((img) => {
      const clone = new Image();
      clone.onload = clone.onerror = () => {
        loaded++;
        const percent = Math.round((loaded / total) * 100);
        document.querySelector(".loader__line-inner").style.width = `${percent}%`;
        document.querySelector(".loader__percent-number").textContent = `${percent}`;
        if (loaded === total) {
          setTimeout(hidePreloader, 500); 
        }
      };
      clone.src = img.src;
    });
  
    function hidePreloader() {
      const preloader = document.querySelector(".loader");
      preloader.style.transition = "opacity 0.5s";
      preloader.style.opacity = 0;
      document.body.classList.remove("no-scroll");
      setTimeout(() => preloader.remove(), 500);
    }
  });
  