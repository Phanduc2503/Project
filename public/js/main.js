// ===== WOOFY MAIN JS =====

// Mobile Menu Toggle
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Close mobile menu on link click
document.addEventListener('DOMContentLoaded', function() {
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobileMenu')?.classList.remove('open');
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      item.classList.toggle('active');
    });
  });

  // Breed filtering on Breeds page
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortSelect = document.getElementById('sortSelect');

  if (searchInput) searchInput.addEventListener('keyup', filterBreeds);
  if (categoryFilter) categoryFilter.addEventListener('change', filterBreeds);
  if (sortSelect) sortSelect.addEventListener('change', sortBreeds);

  // Remove "No image" placeholders after page load
  document.querySelectorAll('img[onerror]').forEach(img => {
    img.addEventListener('error', function() {
      this.src = 'https://via.placeholder.com/600x400?text=No+Image';
    });
  });
});

// Breed filtering functions
function filterBreeds() {
  const search = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const category = document.getElementById('categoryFilter')?.value || '';
  const cards = document.querySelectorAll('.breed-card[data-name]');

  cards.forEach(card => {
    const name = card.dataset.name || '';
    const cat = card.dataset.category || '';
    const matchSearch = name.includes(search);
    const matchCategory = !category || cat === category;
    card.style.display = matchSearch && matchCategory ? '' : 'none';
  });
}

function sortBreeds() {
  const sort = document.getElementById('sortSelect')?.value;
  const grid = document.getElementById('breedGrid');
  if (!sort || !grid) return;

  const cards = Array.from(grid.querySelectorAll('.breed-card[data-name]'));
  cards.sort((a, b) => {
    if (sort === 'name') return (a.dataset.name || '').localeCompare(b.dataset.name || '');
    if (sort === 'name-desc') return (b.dataset.name || '').localeCompare(a.dataset.name || '');
    if (sort === 'life') return (parseFloat(b.dataset.life) || 0) - (parseFloat(a.dataset.life) || 0);
    return 0;
  });

  cards.forEach(card => grid.appendChild(card));
}

// Toast notification system
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `${icons[type] || ''} ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}