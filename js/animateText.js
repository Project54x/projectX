document.addEventListener("DOMContentLoaded", () => {
    const animateTextElements = document.querySelectorAll('.animate-text');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.8 
    });
  
    animateTextElements.forEach(el => observer.observe(el));
  });
  