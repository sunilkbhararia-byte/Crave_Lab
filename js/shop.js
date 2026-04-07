// =========================================
// CraveLab - Shop Page Script
// =========================================

let currentCategory = 'all';
let currentSort = 'default';
let filteredProducts = [...CRAVELAB_DATA.products];
let localReviews = JSON.parse(localStorage.getItem('cravelab_reviews') || '{}');

document.addEventListener('DOMContentLoaded', () => {
  renderShop();
  checkHashCategory();
});

function checkHashCategory() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const catEl = document.querySelector(`.filter-tab[onclick*="filterCategory('${hash}"`);
    if (catEl) {
      catEl.click();
    } else {
      // Check if it's a product ID — open modal
      const product = CRAVELAB_DATA.products.find(p => p.id === hash);
      if (product) openProductModal(hash);
    }
  }
}

function renderShop() {
  const main = document.getElementById('shopMain');
  if (!main) return;

  let products = [...CRAVELAB_DATA.products];

  // Category filter
  if (currentCategory !== 'all') {
    products = products.filter(p => p.category === currentCategory);
  }

  // Dietary filters
  const egglessFilter = document.getElementById('filterEggless');
  const popularFilter = document.getElementById('filterPopular');
  if (egglessFilter && egglessFilter.checked) products = products.filter(p => p.eggless);
  if (popularFilter && popularFilter.checked) products = products.filter(p => p.popular);

  // Price range
  const minPrice = parseInt(document.getElementById('priceMin')?.value || 0);
  const maxPrice = parseInt(document.getElementById('priceMax')?.value || 9999);
  products = products.filter(p => {
    const firstPrice = Object.values(p.prices)[0];
    return firstPrice >= minPrice && firstPrice <= maxPrice;
  });

  // Sort
  if (currentSort === 'price-asc') {
    products.sort((a, b) => Object.values(a.prices)[0] - Object.values(b.prices)[0]);
  } else if (currentSort === 'price-desc') {
    products.sort((a, b) => Object.values(b.prices)[0] - Object.values(a.prices)[0]);
  } else if (currentSort === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'popular') {
    products.sort((a, b) => b.reviews - a.reviews);
  }

  filteredProducts = products;

  if (currentCategory === 'all') {
    // Group by category
    let html = '';
    CRAVELAB_DATA.categories.forEach(cat => {
      const catProducts = products.filter(p => p.category === cat.id);
      if (catProducts.length === 0) return;
      html += `
        <section class="shop-section" id="${cat.id}">
          <div class="shop-section-header">
            <h2 class="shop-section-title">
              <span class="emoji">${cat.emoji}</span> ${cat.name}
            </h2>
            <span class="shop-section-count">${catProducts.length} items</span>
          </div>
          <div class="products-grid">
            ${catProducts.map(p => createShopProductCard(p)).join('')}
          </div>
        </section>
      `;
    });
    main.innerHTML = html || '<p style="text-align:center;padding:3rem;color:var(--gray);">No products match your filters.</p>';
  } else {
    const cat = CRAVELAB_DATA.categories.find(c => c.id === currentCategory);
    main.innerHTML = `
      <section class="shop-section" id="${currentCategory}">
        <div class="shop-section-header">
          <h2 class="shop-section-title">
            <span class="emoji">${cat?.emoji || ''}</span> ${cat?.name || currentCategory}
          </h2>
          <span class="shop-section-count">${products.length} items</span>
        </div>
        <div class="products-grid">
          ${products.length > 0
            ? products.map(p => createShopProductCard(p)).join('')
            : '<p style="color:var(--gray);padding:2rem;">No products match your filters.</p>'
          }
        </div>
      </section>
    `;
  }
}

function createShopProductCard(product) {
  const firstPrice = Object.values(product.prices)[0];
  const firstSize = Object.keys(product.prices)[0];
  const stars = '★'.repeat(Math.floor(product.rating));
  const reviews = localReviews[product.id] || [];
  const totalReviews = product.reviews + reviews.length;
  const cartQty = getCartQty(product.id);
  const isCake = product.category === 'cakes';

  const defaultTextures = {
    cakes: { soft: 70, creamy: 65, rich: 60 },
    pastries: { flaky: 75, buttery: 65, tender: 55 },
    donuts: { soft: 70, sweet: 60, airy: 50 },
    croissants: { flaky: 80, buttery: 70, layered: 60 },
    brownies: { fudgy: 75, chewy: 60, crisp: 45 },
    desserts: { smooth: 70, rich: 60, delicate: 50 }
  };

  const textureValues = product.texture || defaultTextures[product.category] || { smooth: 60, creamy: 50, crisp: 40 };
  const openProductDetails = product.category === 'desserts';

  let buttonHtml;
    if (cartQty > 0) {
      buttonHtml = `<button class="btn-add-cart in-cart" onclick="openProductModal('${product.id}')">
        <i class="fas fa-shopping-bag"></i> ${cartQty}
      </button>`;
    } else {
      buttonHtml = `<button class="btn-add-cart" onclick="openProductModal('${product.id}')">
        <i class="fas fa-plus"></i> ${openProductDetails ? 'View Details' : 'Add'}
      </button>`;
  }

  return `
    <div class="product-card" id="card_${product.id}">
      <div class="card-image" onclick="openProductModal('${product.id}')" style="cursor:pointer;">
        ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ''}
        ${product.eggless ? '<span class="card-badge" style="left:auto;right:12px;background:var(--mocha);">🥚 Eggless</span>' : ''}
        <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlistBtn('${product.id}', this)"><i class="far fa-heart"></i></button>
        <img src="${product.image || 'images/placeholder.png'}" alt="${product.name}" style="width:100%;height:250px;object-fit:contain;border-radius:15px;background:white;">
      </div>
      <div class="card-body">
        <div class="card-category">${getCategoryLabel(product.category)}</div>
        <div class="card-name" onclick="openProductModal('${product.id}')" style="cursor:pointer;">${product.name}</div>
        <div class="flavour-meter">
          <h5 style="font-size:0.78rem;margin:0 0 0.3rem;font-weight:800;color:var(--espresso);">Flavour Meter</h5>
          <div class="flavour-row">
            <span>Sweet</span>
            <span>${product.sweet || 50}%</span>
          </div>
          <div class="bar"><div style="width:${product.sweet || 50}%"></div></div>
          <div class="flavour-row">
            <span>Rich</span>
            <span>${product.rich || 50}%</span>
          </div>
          <div class="bar"><div style="width:${product.rich || 50}%"></div></div>
        </div>
        <div class="texture-map">
          <h5 style="font-size:0.75rem;margin:0.4rem 0 0.2rem;color:var(--mocha);font-weight:700;">Texture Map</h5>
          <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
            ${Object.keys(textureValues).map(key => `<span class="texture-chip" style="font-size:0.72rem;padding:0.2rem 0.5rem;margin-top:0.2rem;">${key.charAt(0).toUpperCase() + key.slice(1)}</span>`).join('')}
          </div>
        </div>
        <div class="card-rating">
          <span class="stars">${stars}</span>
          <span class="count">${product.rating} (${totalReviews})</span>
        </div>
        <div class="card-footer">
          <div class="card-price">
            ₹${firstPrice.toLocaleString()}
            <span class="original">${firstSize}</span>
          </div>
          ${buttonHtml}
        </div>
      </div>
    </div>
  `;
}

function getCategoryLabel(catId) {
  const cat = CRAVELAB_DATA.categories.find(c => c.id === catId);
  return cat ? `${cat.emoji} ${cat.name}` : catId;
}

function filterCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderShop();
}

function sortProducts(val) {
  currentSort = val;
  renderShop();
}

function applyFilters() {
  renderShop();
}

// ---- Product Modal ----
function openProductModal(productId) {
  // Check if it's the dessert platter
  if (productId === 'ds1') {
    openPlattersModal();
    return;
  }

  const product = CRAVELAB_DATA.products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('productModal');
  const content = document.getElementById('productModalContent');
  if (!modal || !content) return;

  const sizes = Object.entries(product.prices);
  const reviews = [...(localReviews[productId] || [])];

  content.innerHTML = `
    <div class="product-modal-grid">
      <div class="product-modal-img">
        <img src="${product.image || 'images/placeholder.png'}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;border-radius:0;">
      </div>
      <div class="product-modal-info">
        ${product.badge ? `<span style="display:inline-block;padding:0.2rem 0.7rem;background:var(--pink);color:white;border-radius:20px;font-size:0.72rem;font-weight:700;margin-bottom:0.5rem;">${product.badge}</span>` : ''}
        <h2>${product.name}</h2>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:0.5rem;">
          <span style="color:#fbbf24;">${'★'.repeat(Math.floor(product.rating))}</span>
          <span style="font-size:0.8rem;color:var(--gray);">${product.rating} (${product.reviews + reviews.length} reviews)</span>
          ${product.eggless ? '<span style="font-size:0.75rem;background:rgba(166,123,91,0.1);color:var(--mocha);padding:0.2rem 0.6rem;border-radius:20px;font-weight:600;">🥚 Eggless</span>' : ''}
        </div>

        <p class="product-desc">${product.desc}</p>

        ${sizes.length > 1 ? `
          <div class="form-group" style="margin-bottom:1rem;">
            <label style="font-size:0.82rem;font-weight:700;color:var(--espresso);display:block;margin-bottom:0.4rem;">Select Size / Variant</label>
            <div class="size-selector">
              ${sizes.map(([size, price], i) => `
                <button class="size-btn ${i === 0 ? 'selected' : ''}" onclick="selectSize(this, '${product.id}', '${size}', ${price})">
                  ${size}<br/><span style="font-size:0.72rem;">₹${price.toLocaleString()}</span>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="product-modal-price" id="modalPrice">₹${Object.values(product.prices)[0].toLocaleString()}</div>

        <div style="display:flex;gap:0.8rem;margin-bottom:1.2rem;">
          <button class="btn-primary" style="flex:1;justify-content:center;font-size:0.85rem;" onclick="addToCartFromModal('${product.id}')">
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </button>
          <button class="btn-icon" onclick="toggleWishlistModal('${product.id}', this)" style="border:1.5px solid rgba(166,123,91,0.3);border-radius:var(--radius-sm);width:42px;">
            <i class="far fa-heart"></i>
          </button>
        </div>

        <!-- Ingredients -->
        <div class="ingredients-section">
          <h4>🌿 Ingredients</h4>
          <div class="ingredient-tags">
            ${product.ingredients.map(i => `<span class="ingredient-tag">${i}</span>`).join('')}
          </div>
        </div>

        <!-- Allergens -->
        <div class="ingredients-section" style="margin-top:0.8rem;">
          <h4>⚠️ Allergens</h4>
          <div class="ingredient-tags">
            ${product.allergens.map(a => `<span class="allergen-tag">⚠️ ${a}</span>`).join('')}
          </div>
          <div class="allergen-warning">
            <i class="fas fa-info-circle"></i>
            May contain traces of other allergens. Please inform us of any allergies.
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Track selected size
  modal.dataset.currentProduct = productId;
  modal.dataset.currentSize = Object.keys(product.prices)[0];
  modal.dataset.currentPrice = Object.values(product.prices)[0];
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function selectSize(btn, productId, size, price) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const modal = document.getElementById('productModal');
  const priceEl = document.getElementById('modalPrice');
  if (modal) {
    modal.dataset.currentSize = size;
    modal.dataset.currentPrice = price;
  }
  if (priceEl) priceEl.textContent = `₹${price.toLocaleString()}`;
}

function addToCartFromModal(productId) {
  const modal = document.getElementById('productModal');
  const size = modal?.dataset.currentSize;
  addToCart(productId, size);
  closeProductModal();
}

function toggleWishlistBtn(productId, btn) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  if (btn.classList.contains('active')) {
    icon.className = 'fas fa-heart';
    let wishlist = JSON.parse(localStorage.getItem('cravelab_wishlist') || '[]');
    if (!wishlist.includes(productId)) wishlist.push(productId);
    localStorage.setItem('cravelab_wishlist', JSON.stringify(wishlist));
    showToast('Added to wishlist ❤️', 'success');
  } else {
    icon.className = 'far fa-heart';
    let wishlist = JSON.parse(localStorage.getItem('cravelab_wishlist') || '[]');
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('cravelab_wishlist', JSON.stringify(wishlist));
  }
}

function toggleWishlistModal(productId, btn) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  if (btn.classList.contains('active')) {
    icon.className = 'fas fa-heart';
    icon.style.color = '#f44336';
    showToast('Added to wishlist ❤️', 'success');
  } else {
    icon.className = 'far fa-heart';
    icon.style.color = '';
  }
}

// ---- Review Modal ----
function openReviewModal(productId, productName) {
  const modal = document.getElementById('reviewModal');
  document.getElementById('reviewProductId').value = productId;
  document.getElementById('reviewProductName').textContent = productName;
  if (modal) modal.classList.add('active');
}

function closeReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (modal) modal.classList.remove('active');
}

function submitReview() {
  const productId = document.getElementById('reviewProductId').value;
  const name = document.getElementById('reviewName').value.trim();
  const text = document.getElementById('reviewText').value.trim();
  const ratingEl = document.querySelector('input[name="rating"]:checked');

  if (!name || !text || !ratingEl) {
    showToast('Please fill all fields and select a rating', 'error');
    return;
  }

  const review = {
    name,
    text,
    rating: parseInt(ratingEl.value),
    date: new Date().toLocaleDateString('en-IN')
  };

  if (!localReviews[productId]) localReviews[productId] = [];
  localReviews[productId].push(review);
  localStorage.setItem('cravelab_reviews', JSON.stringify(localReviews));

  closeReviewModal();
  showToast('Review submitted! Thank you 🌟', 'success');

  // Refresh product modal if open
  const productModal = document.getElementById('productModal');
  if (productModal && productModal.classList.contains('active')) {
    openProductModal(productId);
  }
}

function getCartQty(productId) {
  return cart.reduce((total, item) => item.id === productId ? total + item.qty : total, 0);
}

// =====================================
// DESSERT PLATTER CUSTOMIZATION
// =====================================

let plattersSelection = {};

function openPlattersModalFull() {
  const modal = document.getElementById('plattersModal');
  if (!modal) return;
  modal.classList.add('active');
  initializePlattersModal();
}

function closePlattersModal() {
  const modal = document.getElementById('plattersModal');
  if (!modal) return;
  modal.classList.remove('active');
}

function initializePlattersModal() {
  // Start with no items selected until the user chooses them
  plattersSelection = {};
  renderPlattersModal();
}

function renderPlattersModal() {
  const modal = document.getElementById('plattersModalContent');
  if (!modal) return;

  const { cupcakes, macarons, cheesecake, jars } = CRAVELAB_DATA.plattersItems;

  const renderSection = (title, items, sectionId) => {
    return `
      <div class="platter-section">
        <h3 class="platter-section-title">${title}</h3>
        <div class="platter-items-list">
          ${items.map(item => {
            const qty = plattersSelection[item.id] || 0;
            const unit = item.unit ? ` <span style="font-size:0.75rem;color:var(--gray);"> ${item.unit}</span>` : '';
            const volume = item.volume ? ` <span style="font-size:0.75rem;color:var(--gray);">${item.volume}</span>` : '';
            return `
              <div class="platter-item">
                <label class="platter-item-info" style="display:flex;align-items:flex-start;gap:0.6rem;cursor:pointer;">
                  <input type="checkbox" ${qty > 0 ? 'checked' : ''} onchange="togglePlattersItem('${item.id}', this.checked)" style="margin-top:0.15rem;width:16px;height:16px;accent-color:var(--pink);" />
                  <span>
                    <span class="platter-item-name" style="display:block;">${item.name}${unit}${volume}</span>
                    <span class="platter-item-price">₹${item.price.toLocaleString()}</span>
                  </span>
                </label>
                <div class="platter-item-controls" style="display:flex;align-items:center;gap:0.5rem;opacity:${qty > 0 ? '1' : '0.55'};">
                  <button class="platter-btn-remove" onclick="removePlattersItem('${item.id}')" ${qty === 0 ? 'disabled' : ''}>−</button>
                  <span class="platter-qty">${qty}</span>
                  <button class="platter-btn-add" onclick="addPlattersItem('${item.id}')">+</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  };

  const totalPrice = calculatePlattersPrice();
  const platterProduct = CRAVELAB_DATA.products.find(p => p.id === 'ds1');
  const platterImage = platterProduct?.image || 'dessert-platter.png';
  const basePrice = platterProduct ? Object.values(platterProduct.prices)[0] : totalPrice;
  const ratingStars = '★'.repeat(Math.floor(platterProduct?.rating || 4));

  modal.innerHTML = `
    <div class="platter-opening product-modal-grid">
      <div class="product-modal-img platter-opening-img">
        <img src="${platterImage}" alt="${platterProduct?.name || 'Dessert Platter'}" style="width:100%;height:100%;object-fit:cover;" onerror="this.onerror=null;this.src='dessert-platter.png';" />
      </div>
      <div class="product-modal-info platter-opening-info">
        <span style="display:inline-block;padding:0.2rem 0.7rem;background:var(--pink);color:white;border-radius:20px;font-size:0.72rem;font-weight:700;margin-bottom:0.5rem;">🍽️ Customize Your Dessert Platter</span>
        <h2>${platterProduct?.name || 'Dessert Platter'}</h2>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:0.5rem;">
          <span style="color:#fbbf24;">${ratingStars}</span>
          <span style="font-size:0.8rem;color:var(--gray);">${platterProduct ? `${platterProduct.rating} (${platterProduct.reviews} reviews)` : '4.8 (50 reviews)'}</span>
        </div>
        <p class="product-desc">${platterProduct?.desc || 'Create a custom dessert platter by choosing your favorite mini desserts.'}</p>
        <div class="platter-info-meta">
          <div><strong>Base Price:</strong> ₹${basePrice.toLocaleString()}</div>
          <div><strong>Allergens:</strong> ${platterProduct?.allergens?.join(', ') || 'Gluten, Dairy'}</div>
          <div><strong>Ingredients:</strong> ${platterProduct?.ingredients?.join(', ') || 'Assorted Desserts'}</div>
        </div>
      </div>
    </div>

    <div class="platter-default-checkbox">
      <label>
        <input type="checkbox" onchange="toggleDefaultPlatter(this.checked)" ${Object.keys(plattersSelection).length > 0 ? 'checked' : ''} />
        Default Dessert Platter
      </label>
    </div>

    <div class="platter-content">
      ${renderSection('🧁 Cupcakes', cupcakes, 'cupcakes')}
      ${renderSection('🥐 Macarons', macarons, 'macarons')}
      ${renderSection('🍰 Cheesecake', cheesecake, 'cheesecake')}
      ${renderSection('🍛 Mini Jars (120 ml)', jars, 'jars')}
    </div>

    <div class="platter-default-option">
      <button class="btn-default-platter" onclick="setDefaultPlatter()" style="background:rgba(244,167,185,0.1);border:1.5px solid rgba(244,167,185,0.3);color:var(--pink);padding:0.8rem;border-radius:var(--radius-sm);width:100%;font-weight:600;cursor:pointer;transition:all 0.3s;margin-bottom:1rem;">
        ↻ Reset to Default Platter
      </button>
    </div>

    <div class="platter-summary">
      <div class="platter-items-summary">
        <h4>Your Selection:</h4>
        <div class="platter-selected-items">
          ${Object.entries(plattersSelection)
            .filter(([id, qty]) => qty > 0)
            .map(([id, qty]) => {
              const item = findPlattersItemById(id);
              if (!item) return '';
              return `<div class="platter-selected-item">✓ ${item.name} × ${qty}</div>`;
            })
            .join('') || '<p style="margin:0;color:var(--gray);">No platter items selected yet. Please add items above to build your platter.</p>'}
        </div>
      </div>
      <div class="platter-total">
        <span>Total Price:</span>
        <span class="platter-price-amount">₹${totalPrice.toLocaleString()}</span>
      </div>
    </div>

    <div style="padding:0 1.5rem 1.5rem;display:flex;gap:0.8rem;flex-wrap:wrap;">
      <button class="btn-primary" style="flex:1;justify-content:center;" onclick="addPlattersToCart()">
        <i class="fas fa-shopping-bag"></i> Add to Cart
      </button>
      <button class="btn-secondary" style="flex:1;justify-content:center;" onclick="closePlattersModal()">
        Cancel
      </button>
    </div>
  `;
}

function findPlattersItemById(id) {
  const { cupcakes, macarons, cheesecake, jars } = CRAVELAB_DATA.plattersItems;
  const all = [...cupcakes, ...macarons, ...cheesecake, ...jars];
  return all.find(item => item.id === id);
}

function addPlattersItem(itemId) {
  if (!plattersSelection[itemId]) {
    plattersSelection[itemId] = 0;
  }
  plattersSelection[itemId]++;
  renderPlattersModal();
}

function togglePlattersItem(itemId, checked) {
  if (checked) {
    if (!plattersSelection[itemId] || plattersSelection[itemId] < 1) {
      plattersSelection[itemId] = 1;
    }
  } else {
    delete plattersSelection[itemId];
  }
  renderPlattersModal();
}

function removePlattersItem(itemId) {
  if (plattersSelection[itemId] && plattersSelection[itemId] > 0) {
    plattersSelection[itemId]--;
    if (plattersSelection[itemId] === 0) {
      delete plattersSelection[itemId];
    }
  }
  renderPlattersModal();
}

function toggleDefaultPlatter(checked) {
  if (checked) {
    plattersSelection = JSON.parse(JSON.stringify(CRAVELAB_DATA.plattersDefault));
  } else {
    plattersSelection = {};
  }
  renderPlattersModal();
}

function setDefaultPlatter() {
  plattersSelection = JSON.parse(JSON.stringify(CRAVELAB_DATA.plattersDefault));
  renderPlattersModal();
}

function calculatePlattersPrice() {
  let total = 0;
  Object.entries(plattersSelection).forEach(([id, qty]) => {
    const item = findPlattersItemById(id);
    if (item) {
      total += item.price * qty;
    }
  });
  return total;
}

function addPlattersToCart() {
  const platterProduct = CRAVELAB_DATA.products.find(p => p.id === 'ds1');
  const selectedItems = Object.entries(plattersSelection)
    .filter(([id, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = findPlattersItemById(id);
      return `${item.name} (×${qty})`;
    })
    .join(', ');

  if (Object.values(plattersSelection).every(qty => qty === 0)) {
    showToast('Please add at least one item to the platter', 'error');
    return;
  }

  const price = calculatePlattersPrice();
  const cart = JSON.parse(localStorage.getItem('cravelab_cart') || '[]');

  cart.push({
    id: 'ds1_' + Date.now(),
    productId: 'ds1',
    name: 'Dessert Platter',
    items: selectedItems,
    qty: 1,
    price: price,
    image: platterProduct?.image || 'dessert-platter.png'
  });

  localStorage.setItem('cravelab_cart', JSON.stringify(cart));
  showToast('Dessert Platter added to cart! 🥳', 'success');
  closePlattersModal();
  updateCartBadge();
  if (typeof updateCartUI === 'function') updateCartUI();
  if (typeof renderShop === 'function') renderShop();
}

// Export to global scope
window.openPlattersModal = openPlattersModalFull;
window.closePlattersModal = closePlattersModal;
window.addPlattersItem = addPlattersItem;
window.removePlattersItem = removePlattersItem;
window.setDefaultPlatter = setDefaultPlatter;
window.addPlattersToCart = addPlattersToCart;
