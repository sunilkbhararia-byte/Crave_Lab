const order = JSON.parse(localStorage.getItem('currentOrder'));

if (!order) {
  document.body.innerHTML = '<h2 style="text-align:center;margin-top:40px;">No active order</h2>';
  throw new Error('No current order in localStorage');
}

// Show Order ID
const orderIdEl = document.getElementById('orderId');
if (orderIdEl) orderIdEl.innerText = 'Order ID: ' + order.orderId;

// 📦 Show ordered items
const itemsContainer = document.getElementById('orderItems');
if (itemsContainer) {
  if (order.items && order.items.length > 0) {
    order.items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <span>${item.name}</span>
        <span>× ${item.qty}</span>
      `;
      itemsContainer.appendChild(div);
    });
  } else {
    itemsContainer.innerHTML = '<p style="color: #777;">No items in this order</p>';
  }
}

// 🎉 Confetti flag
let confettiTriggered = false;

function fireConfetti() {
  const duration = 1500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });

    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function updateTracking() {
  const now = Date.now();
  const orderTimestamp = typeof order.timestamp === 'string' ? Date.parse(order.timestamp) : order.timestamp;
  const diff = (now - orderTimestamp) / 1000;

  let stage = 1;
  let statusText = '🧾 Order Placed';
  let etaText = 'Your order has been placed successfully!';

  if (diff >= 10 && diff < 80) {
    stage = 2;
    statusText = '👨‍🍳 Preparing your cake...';
    const remaining = Math.max(1, Math.ceil(80 - diff));
    etaText = 'Preparing now • ' + remaining + ' sec left';
  } else if (diff >= 80 && diff < 120) {
    stage = 3;
    statusText = '🚚 Out for delivery';
    const remaining = Math.max(1, Math.ceil(120 - diff));
    etaText = 'Out for delivery soon • ' + remaining + ' sec left';
  } else if (diff >= 120) {
    stage = 4;
    statusText = '✅ Delivered';
    etaText = 'Delivered — enjoy your cake! 🎉';

    if (!confettiTriggered) {
      fireConfetti();
      confettiTriggered = true;
    }
  }

  document.getElementById('currentStatus').innerText = statusText;
  document.getElementById('eta').innerText = etaText;

  for (let i = 1; i <= 4; i++) {
    let step = document.getElementById('step' + i);
    if (!step) continue;
    if (i <= stage) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  }
}

// Start tracking with smooth animation
let lastFrameTime = Date.now();

function animateTracking() {
  updateTracking();
  requestAnimationFrame(animateTracking);
}

updateTracking();
animateTracking();
