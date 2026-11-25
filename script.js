/* ==========================================================
   Vishesh Maurya - Portfolio
   script.js  (all the behaviour lives here)

   1. Dark / Light theme button
   2. Fade-in animation when you scroll + skill bars filling
   3. Highlight the menu link of the section you are viewing
   ========================================================== */


/* ---------- 1. THEME BUTTON ---------- */
const themeButton = document.getElementById('themeToggle');
const htmlTag = document.documentElement;

themeButton.addEventListener('click', function () {
  // Check which theme is on right now
  const isDark = htmlTag.getAttribute('data-theme') === 'dark';

  // Switch to the other theme (CSS reads data-theme to change colours)
  htmlTag.setAttribute('data-theme', isDark ? 'light' : 'dark');

  // Change the button icon
  themeButton.textContent = isDark ? '🌙' : '☀️';
});


/* ---------- 2. SCROLL REVEAL + SKILL BARS ---------- */
// This watcher tells us when an element comes into the screen
const watcher = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      // Add the class "visible" -> CSS fades the element in
      entry.target.classList.add('visible');

      // If this element has a skill bar, fill it to its percentage
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) {
        setTimeout(function () {
          fill.style.width = fill.getAttribute('data-width') + '%';
        }, 200);
      }
    }
  });
}, { threshold: 0.15 });

// Start watching every element that has the class "reveal"
document.querySelectorAll('.reveal').forEach(function (element) {
  watcher.observe(element);
});


/* ---------- 3. MENU HIGHLIGHT WHILE SCROLLING ---------- */
const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
  // Find which section we are currently inside
  let currentId = '';
  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 200) {
      currentId = section.id;
    }
  });

  // Make that section's menu link brighter
  menuLinks.forEach(function (link) {
    if (link.getAttribute('href') === '#' + currentId) {
      link.style.color = 'var(--text)';
    } else {
      link.style.color = '';
    }
  });
});
