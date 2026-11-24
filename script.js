// 1. MENU BUTTON - changes page without reloading
const menuBtn = document.querySelector('#menu-btn');
const mainNav = document.querySelector('#main-nav');
if (menuBtn && mainNav) {
  menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', mainNav.classList.contains('nav-open'));
  });
}

// 2. PROJECT FILTER - changes page without reloading
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.card');
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach((card) => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// 3. FORM VALIDATION - no alert(), errors in the page
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    let hasError = false;
    const fields = ['name', 'email', 'message'];
    fields.forEach((id) => {
      const input = document.querySelector('#' + id);
      const error = document.querySelector('#' + id + '-error');
      let bad = false;
      if (id === 'email') { bad = !input.value.includes('@'); }
      else { bad = !input.value.trim(); }
      if (bad) { error.hidden = false; input.setAttribute('aria-invalid', 'true'); hasError = true; }
      else { error.hidden = true; input.setAttribute('aria-invalid', 'false'); }
    });
    if (hasError) { event.preventDefault(); }
  });
  // Clear error when user fixes it
  ['name', 'email', 'message'].forEach((id) => {
    const input = document.querySelector('#' + id);
    const error = document.querySelector('#' + id + '-error');
    if (input && error) {
      input.addEventListener('input', () => {
        if (input.value.trim()) { error.hidden = true; input.setAttribute('aria-invalid', 'false'); }
      });
    }
  });
}

// 4. API FETCH - Bonus, live joke
const jokeBox = document.querySelector('#joke-box');
const jokeBtn = document.querySelector('#joke-btn');
if (jokeBox && jokeBtn) {
  jokeBtn.addEventListener('click', () => {
    jokeBox.textContent = 'Loading...';
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then((r) => r.json())
      .then((data) => { jokeBox.textContent = data.setup + ' ' + data.punchline; })
      .catch(() => { jokeBox.textContent = 'Could not load a joke. Please try again.'; });
  });
}