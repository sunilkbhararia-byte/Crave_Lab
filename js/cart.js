// =========================================
// CraveLab - Cart Management
// =========================================

let cart = JSON.parse(localStorage.getItem('cravelab_cart') || '[]');

function saveCart() {
  localStorage.setItem('cravelab_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, size, quantity = 1) {
  const product = CRAVELAB_DATA.products.find(p => p.id === productId);
  if (!product) return;

  const resolvedSize = size || product.defaultSize;
  const price = product.prices[resolvedSize] || Object.values(product.prices)[0];
  const existingIdx = cart.findIndex(item => item.id === productId && item.size === resolvedSize);

  if (existingIdx >= 0) {
    cart[existingIdx].qty += quantity;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      emoji: product.emoji,
      image: product.image,
      size: resolvedSize,
      price: price,
      qty: quantity,
      category: product.category
    });
  }

  saveCart();
  showToast(`${product.emoji} ${product.name} added to cart!`, 'success');
  if (typeof renderShop === 'function') renderShop();
}

function removeFromCart(productId, size) {
  // First try direct cart-row removal (works for generated ids like ds1_<timestamp>)
  const byRowId = cart.some(item => item.id === productId);
  if (byRowId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    return;
  }

  // Fallback for legacy calls using base product id + size
  cart = cart.filter(item => !(item.productId === productId && item.size === size));
  saveCart();
}

function removeFromCartByIndex(index) {
  if (index < 0 || index >= cart.length) return;
  cart.splice(index, 1);
  saveCart();
}

function updateQty(productId, size, delta) {
  const idx = cart.findIndex(item => item.id === productId && item.size === size);
  if (idx < 0) return;
  cart[idx].qty = Math.max(0, cart[idx].qty + delta);
  if (cart[idx].qty === 0) cart.splice(idx, 1);
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  // Sync in-memory cart with latest localStorage writes from other scripts.
  cart = JSON.parse(localStorage.getItem('cravelab_cart') || '[]');

  // Repair legacy broken platter image paths from old data format.
  let changed = false;
  cart = cart.map(item => {
    if (item && item.productId === 'ds1' && item.image && item.image.includes('images/other desserts/')) {
      changed = true;
      return { ...item, image: 'dessert-platter.png' };
    }
    return item;
  });
  if (changed) {
    localStorage.setItem('cravelab_cart', JSON.stringify(cart));
  }

  const badge = document.getElementById('cartBadge');
  const count = getCartCount();
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  const cartItemsEl = document.getElementById('cartItems');
  const cartFooterEl = document.getElementById('cartFooter');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTotalEl = document.getElementById('cartTotal');

  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <a href="shop.html" class="btn-primary" style="margin-top:1rem;display:inline-flex;" onclick="toggleCart()">Start Shopping</a>
      </div>`;
    if (cartFooterEl) cartFooterEl.style.display = 'none';
  } else {
    cartItemsEl.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${item.image || 'dessert-platter.png'}" alt="${item.name}" onerror="this.onerror=null;this.src='dessert-platter.png';" style="width:50px;height:50px;object-fit:cover;border-radius:8px;"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-variant">${item.size || item.items || 'Custom Selection'}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="updateQty('${item.id}', '${item.size}', -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${item.id}', '${item.size}', 1)">+</button>
            <button class="cart-item-remove" onclick="removeFromCartByIndex(${index})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString()}</div>
      </div>
    `).join('');

    const subtotal = getCartTotal();
    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal.toLocaleString()}`;
    if (cartTotalEl) cartTotalEl.textContent = `₹${(subtotal + 50).toLocaleString()}`;
    if (cartFooterEl) cartFooterEl.style.display = 'block';
  }
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', updateCartUI);
