/* script.js */
const toggleButton = document.getElementById('darkModeToggle');
const body = document.body;

// Load theme preference from localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}

// Toggle dark mode
if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });
}
