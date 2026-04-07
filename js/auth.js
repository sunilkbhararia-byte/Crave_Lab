// =========================================
// CraveLab - Auth & Toast Utilities
// =========================================

// ---- Toast Notifications ----
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✅', error: '❌', info: '🍰' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.info}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ---- Auth Functions ----
let currentUser = JSON.parse(localStorage.getItem('cravelab_user') || 'null');

function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabs = document.querySelectorAll('.modal-tab');

  if (tab === 'login') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    tabs[0].classList.add('active');
    tabs[1].classList.remove('active');
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    tabs[0].classList.remove('active');
    tabs[1].classList.add('active');
  }
}

function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showToast('Please fill in all fields', 'error');
    return;
  }

  // Demo login — In production, validate against backend
  const user = { name: email.split('@')[0], email: email, type: 'user' };
  localStorage.setItem('cravelab_user', JSON.stringify(user));
  currentUser = user;
  closeLoginModal();
  showToast(`Welcome back, ${user.name}! 🍰`, 'success');
  updateAuthUI();
}

function doRegister() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = '+91' + document.getElementById('regPhone').value.trim();
  const password = document.getElementById('regPassword').value;

  if (!name || !email || !phone || !password) {
    showToast('Please fill in all fields', 'error');
    return;
  }

  if (!/^\d{10}$/.test(document.getElementById('regPhone').value.trim())) {
    showToast('Please enter a valid 10-digit phone number', 'error');
    return;
  }

  const user = { name, email, phone, type: 'user' };
  localStorage.setItem('cravelab_user', JSON.stringify(user));
  currentUser = user;
  closeLoginModal();
  showToast(`Account created! Welcome, ${name}! 🎂`, 'success');
  updateAuthUI();
}

function continueAsGuest() {
  const guestUser = { name: 'Guest', email: '', type: 'guest' };
  localStorage.setItem('cravelab_user', JSON.stringify(guestUser));
  currentUser = guestUser;
  closeLoginModal();
  showToast('Continuing as guest. Happy shopping! 🍰', 'info');
  updateAuthUI();
}

function logout() {
  localStorage.removeItem('cravelab_user');
  currentUser = null;
  updateAuthUI();
  showToast('Logged out successfully', 'info');
  window.location.href = 'index.html';
}

function isLoggedIn() {
  const user = JSON.parse(localStorage.getItem('cravelab_user') || 'null');
  return user && user.type && user.type !== 'guest';
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('cravelab_user') || 'null');
}

function routeOrderTracking() {
  currentUser = JSON.parse(localStorage.getItem('cravelab_user') || 'null');

  if (currentUser && currentUser.type !== 'guest') {
    window.location.href = 'account.html#orders';
  } else {
    // redirect to homepage login flow with a query flag
    window.location.href = 'index.html?showLogin=1';
  }
}

function updateAuthUI() {
  const loginBtn = document.querySelector('.btn-login');
  if (!loginBtn) return;

  if (currentUser && currentUser.type !== 'guest') {
    loginBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
    loginBtn.onclick = () => { window.location.href = 'account.html'; };
  } else if (currentUser && currentUser.type === 'guest') {
    loginBtn.innerHTML = `<i class="fas fa-user-circle"></i> Guest`;
    loginBtn.onclick = openLoginModal;
  } else {
    loginBtn.innerHTML = `<i class="fas fa-user"></i> Login`;
    loginBtn.onclick = openLoginModal;
  }
}

// ---- Modal overlay click to close ----
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('showLogin') === '1') {
    if (typeof openLoginModal === 'function') {
      openLoginModal();
    }
  }

  // Close modal on overlay click - REMOVED to avoid duplicate close methods

  // ESC to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => {
        m.classList.remove('active');
        document.body.style.overflow = '';
      });
      const cartSidebar = document.getElementById('cartSidebar');
      const cartOverlay = document.getElementById('cartOverlay');
      if (cartSidebar) cartSidebar.classList.remove('open');
      if (cartOverlay) cartOverlay.classList.remove('active');
    }
  });
});

// ---- Navbar Scroll ----
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});

// ---- Hamburger Nav ----
function toggleNav() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (navLinks) navLinks.classList.toggle('open');
  if (hamburger) hamburger.classList.toggle('open');
}

// ---- Search Functions ----
function openSearch() {
  const modal = document.getElementById('searchModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const input = document.getElementById('searchInput');
      if (input) input.focus();
    }, 100);
  }
}

function closeSearch() {
  const modal = document.getElementById('searchModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function performSearch(query) {
  const resultsEl = document.getElementById('searchResults');
  if (!resultsEl) return;

  if (!query.trim()) {
    resultsEl.innerHTML = '<p style="text-align:center;color:var(--gray);padding:1rem;">Type to search...</p>';
    return;
  }

  const results = CRAVELAB_DATA.products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.desc.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  if (results.length === 0) {
    resultsEl.innerHTML = '<p style="text-align:center;color:var(--gray);padding:1rem;">No results found. Try a different search.</p>';
    return;
  }

  resultsEl.innerHTML = results.map(p => {
    const firstPrice = Object.values(p.prices)[0];
    return `
      <div class="search-result-item" onclick="goToProduct('${p.id}')">
        <img class="icon" src="${p.image || 'images/placeholder.png'}" alt="${p.name}">
        <div class="info">
          <h4>${p.name}</h4>
          <p>${p.category.charAt(0).toUpperCase() + p.category.slice(1)} · from ₹${firstPrice}</p>
        </div>
        <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${p.id}'); closeSearch();">Add</button>
      </div>
    `;
  }).join('');
}

function goToProduct(productId) {
  closeSearch();
  window.location.href = `shop.html#${productId}`;
}

function openWishlist() {
  showToast('Wishlist feature — login to save favorites! 💖', 'info');
}
