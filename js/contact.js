document.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById("animatedNumber");
    let number = 0;
    const target = 99;
    const duration = 5000;
    const stepTime = Math.floor(duration / target);

    const timer = setInterval(() => {
      number++;
      element.textContent = number;
      if (number >= target) {
        clearInterval(timer);
      }
    }, stepTime);
  });

  const scriptURL = 'https://script.google.com/macros/s/AKfycbzsR-E5PzyRwdtwhcuMAjAJNSO6Kh43oosmOGam76S7fGJnswf07AT3TQ_ByvXHZ0TISA/exec';
  const form = document.forms['submit-to-google-sheet'];
  const submitBtn = document.getElementById('submitBtn');
  const email = document.getElementById('email');
  const name = document.getElementById('name');
  const emailError = document.getElementById('emailError');
  const nameError = document.getElementById('nameError');
  const title = document.getElementById('contactTitle');
  const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const thxBlock = document.getElementById('thxBlock');

form.addEventListener('submit', e => {
    e.preventDefault();
  
    let valid = true;
  
    if (email.value.trim() === '') {
      emailError.style.display = 'block';
      emailInput.classList.add('error');
      valid = false;
    } else {
      emailError.style.display = 'none';
      emailInput.classList.remove('error');
    }
  
    if (name.value.trim() === '') {
      nameError.style.display = 'block';
      nameInput.classList.add('error');
      valid = false;
    } else {
      nameError.style.display = 'none';
      nameInput.classList.remove('error');
    }
  
    if (!valid) return;
  
    const formData = new FormData(form);
  
    submitBtn.disabled = true;
    [...form.elements].forEach(el => el.disabled = true);
  
    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => {
        console.log('Success!', response);
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        form.style.display = 'none';
        thxBlock.style.display = 'block';
        title.innerHTML = 'Thank <br> you';
      })
      .catch(error => {
        console.error('Error!', error.message);
        submitBtn.disabled = false;
        [...form.elements].forEach(el => el.disabled = false);
      });
  });
  