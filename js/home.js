// =========================================
// CraveLab - Home Page Script
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  renderTrendingProducts();
  renderTestimonials();
  highlightActiveNav();
});

function renderTrendingProducts() {
  const grid = document.getElementById('trendingGrid');
  if (!grid) return;

  const trending = CRAVELAB_DATA.products.filter(p => p.popular).slice(0, 4);

  grid.innerHTML = trending.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
  const firstPrice = Object.values(product.prices)[0];
  const firstSize = Object.keys(product.prices)[0];
  const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '☆' : '');

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="card-image">
        ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ''}
        <button class="wishlist-btn" onclick="toggleWishlistItem('${product.id}', this)"><i class="far fa-heart"></i></button>
        <img src="${product.image || 'images/placeholder.png'}" alt="${product.name}" style="width:100%;height:200px;object-fit:contain;border-radius:15px;background:white;">
      </div>
      <div class="card-body">
        <div class="card-category">${getCategoryName(product.category)}</div>
        <div class="card-name">${product.name}</div>
        <div class="card-desc">${product.desc}</div>
        <div class="card-rating">
          <span class="stars">${stars}</span>
          <span class="count">${product.rating} (${product.reviews})</span>
        </div>
        <div class="card-footer">
          <div class="card-price">
            ₹${firstPrice.toLocaleString()}
            <span class="original">${firstSize}</span>
          </div>
          <button class="btn-add-cart" onclick="addToCart('${product.id}')">
            <i class="fas fa-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  `;
}

function getCategoryName(catId) {
  const cat = CRAVELAB_DATA.categories.find(c => c.id === catId);
  return cat ? `${cat.emoji} ${cat.name}` : catId;
}

function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;

  grid.innerHTML = CRAVELAB_DATA.testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-rating">${'★'.repeat(t.rating)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.emoji}</div>
        <div class="author-info">
          <div class="name">${t.name}</div>
          <div class="occasion">🎂 ${t.occasion}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

function toggleWishlistItem(productId, btn) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  if (btn.classList.contains('active')) {
    icon.className = 'fas fa-heart';
    // Save to localStorage wishlist
    let wishlist = JSON.parse(localStorage.getItem('cravelab_wishlist') || '[]');
    if (!wishlist.includes(productId)) wishlist.push(productId);
    localStorage.setItem('cravelab_wishlist', JSON.stringify(wishlist));
    showToast('Added to wishlist ❤️', 'success');
  } else {
    icon.className = 'far fa-heart';
    let wishlist = JSON.parse(localStorage.getItem('cravelab_wishlist') || '[]');
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('cravelab_wishlist', JSON.stringify(wishlist));
    showToast('Removed from wishlist', 'info');
  }
}

function subscribeNewsletter(event) {
  event.preventDefault();
  const emailInput = event.target.querySelector('input[type="email"]');
  const email = emailInput.value.trim();
  if (!email) return;

  // Save subscription
  let subs = JSON.parse(localStorage.getItem('cravelab_subs') || '[]');
  if (subs.includes(email)) {
    showToast('You are already subscribed! 🎂', 'info');
    return;
  }
  subs.push(email);
  localStorage.setItem('cravelab_subs', JSON.stringify(subs));
  emailInput.value = '';
  showToast('Subscribed! Get ready for sweet deals 🍰', 'success');
}
