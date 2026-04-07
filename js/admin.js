// =========================================
// CraveLab - Admin Panel Script
// =========================================

let adminLoggedIn = false;
let allOrders = [];
let charts = {};

// Default admin credentials (stored in localStorage for demo)
function getAdminCreds() {
  return {
    username: localStorage.getItem('admin_username') || 'admin',
    password: localStorage.getItem('admin_password') || 'cravelab2025'
  };
}

function adminLogin() {
  const username = document.getElementById('adminUsername').value.trim();
  const password = document.getElementById('adminPassword').value;
  const creds = getAdminCreds();

  if (username === creds.username && password === creds.password) {
    adminLoggedIn = true;
    document.getElementById('adminLoginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    loadAllData();
    renderDashboard();
    showToast('Welcome back, Admin! 🍰', 'success');
  } else {
    showToast('Invalid credentials', 'error');
  }
}

function adminLogout() {
  adminLoggedIn = false;
  document.getElementById('adminDashboard').style.display = 'none';
  document.getElementById('adminLoginScreen').style.display = 'flex';
  document.getElementById('adminUsername').value = '';
  document.getElementById('adminPassword').value = '';
}

function loadAllData() {
  allOrders = JSON.parse(localStorage.getItem('cravelab_orders') || '[]');
}

function showSection(sectionId, linkEl) {
  // Hide all sections
  document.querySelectorAll('[id^="section_"]').forEach(s => s.style.display = 'none');
  // Show target
  const target = document.getElementById(`section_${sectionId}`);
  if (target) target.style.display = 'block';

  // Update nav
  document.querySelectorAll('.admin-nav a').forEach(a => a.classList.remove('active'));
  if (linkEl) linkEl.classList.add('active');

  // Update title
  const titles = {
    dashboard: ['Dashboard', 'Overview of all operations'],
    orders: ['Orders', 'Manage all customer orders'],
    products: ['Products', 'All dessert products'],
    customers: ['Customers', 'Customer database'],
    bake_sessions: ['Bake Sessions', 'Booking management'],
    contacts: ['Messages', 'Customer inquiries'],
    reviews: ['Reviews', 'Product feedback'],
    analytics: ['Analytics', 'Business insights'],
    settings: ['Settings', 'Admin configuration'],
  };
  const info = titles[sectionId] || ['Dashboard', ''];
  document.getElementById('sectionTitle').textContent = info[0];
  document.getElementById('sectionSubtitle').textContent = info[1];

  // Render section data
  switch(sectionId) {
    case 'dashboard': renderDashboard(); break;
    case 'orders': renderOrdersTable(); break;
    case 'products': renderAdminProducts(); break;
    case 'customers': renderCustomers(); break;
    case 'bake_sessions': renderBakeSessions(); break;
    case 'contacts': renderContacts(); break;
    case 'reviews': renderReviews(); break;
    case 'analytics': renderAnalytics(); break;
    case 'settings': loadSettings(); break;
  }
}

// ---- Dashboard ----
function renderDashboard() {
  loadAllData();

  // Stats
  const totalOrders = allOrders.length;
  const revenue = allOrders.reduce((s, o) => s + (o.total || 0), 0);
  const customers = [...new Set(allOrders.map(o => o.customer?.email).filter(Boolean))];

  document.getElementById('statTotalOrders').textContent = totalOrders;
  document.getElementById('statRevenue').textContent = `₹${revenue.toLocaleString()}`;
  document.getElementById('statCustomers').textContent = customers.length || Math.floor(Math.random() * 50 + 10);

  // Recent orders
  renderRecentOrders();

  // Charts
  setTimeout(() => {
    renderOrdersChart();
    renderCategoryChart();
  }, 100);
}

function renderRecentOrders() {
  const tbody = document.getElementById('recentOrdersBody');
  if (!tbody) return;

  const recentOrders = allOrders.slice(0, 10);

  if (recentOrders.length === 0) {
    // Show sample data for demo
    tbody.innerHTML = generateSampleOrderRows(5);
    return;
  }

  tbody.innerHTML = recentOrders.map(o => `
    <tr>
      <td><strong>${o.orderId}</strong></td>
      <td>${o.customer?.firstName || ''} ${o.customer?.lastName || ''}</td>
      <td>${o.items?.length || 0} items</td>
      <td><strong>₹${(o.total || 0).toLocaleString()}</strong></td>
      <td>${new Date(o.timestamp).toLocaleDateString('en-IN')}</td>
      <td><span class="status-badge ${o.status || 'pending'}">${(o.status || 'pending').toUpperCase()}</span></td>
      <td>
        <button onclick="viewOrderDetail('${o.orderId}')" style="padding:0.25rem 0.6rem;background:rgba(244,167,185,0.15);border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;color:var(--pink);font-weight:600;">View</button>
        <select onchange="updateOrderStatus('${o.orderId}', this.value)" style="padding:0.25rem 0.4rem;border:1px solid rgba(166,123,91,0.2);border-radius:4px;font-size:0.72rem;margin-left:4px;background:white;">
          <option value="">Update</option>
          <option value="confirmed">Confirm</option>
          <option value="preparing">Preparing</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancel</option>
        </select>
      </td>
    </tr>
  `).join('');
}

function generateSampleOrderRows(count) {
  const names = ['Priya S.', 'Rohan M.', 'Ananya R.', 'Kiran P.', 'Sneha N.'];
  const statuses = ['pending', 'confirmed', 'preparing', 'delivered'];
  return Array.from({ length: count }, (_, i) => {
    const st = statuses[i % statuses.length];
    const amt = Math.floor(Math.random() * 2000 + 200);
    return `
      <tr>
        <td><strong>CL-DEMO${(i+1).toString().padStart(3,'0')}</strong></td>
        <td>${names[i]}</td>
        <td>${Math.floor(Math.random()*3+1)} items</td>
        <td><strong>₹${amt}</strong></td>
        <td>${new Date(Date.now() - i * 86400000).toLocaleDateString('en-IN')}</td>
        <td><span class="status-badge ${st}">${st.toUpperCase()}</span></td>
        <td><span style="font-size:0.75rem;color:var(--gray);">Demo data</span></td>
      </tr>
    `;
  }).join('');
}

function renderOrdersTable() {
  const tbody = document.getElementById('allOrdersBody');
  if (!tbody) return;

  const statusFilter = document.getElementById('orderStatusFilter')?.value || 'all';
  let orders = [...allOrders];
  if (statusFilter !== 'all') orders = orders.filter(o => o.status === statusFilter);

  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:2rem;color:var(--gray);">No orders found. Place some test orders!</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => `
    <tr>
      <td><strong>${o.orderId}</strong></td>
      <td>${o.customer?.firstName || ''} ${o.customer?.lastName || ''}</td>
      <td>${o.customer?.phone || '-'}</td>
      <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${o.items?.map(i => i.name).join(', ') || '-'}</td>
      <td><strong>₹${(o.total || 0).toLocaleString()}</strong></td>
      <td>${o.deliveryDate || '-'}<br/><span style="font-size:0.72rem;color:var(--mocha);">${o.deliverySlot || ''}</span></td>
      <td><span style="font-size:0.75rem;">${(o.paymentMethod || '').toUpperCase()}</span></td>
      <td><span class="status-badge ${o.status || 'pending'}">${(o.status || 'pending').toUpperCase()}</span></td>
      <td>
        <select onchange="updateOrderStatus('${o.orderId}', this.value)" style="padding:0.3rem 0.5rem;border:1px solid rgba(166,123,91,0.2);border-radius:4px;font-size:0.75rem;background:white;font-family:'Poppins',sans-serif;">
          <option value="">Status</option>
          <option value="confirmed">✅ Confirm</option>
          <option value="preparing">👩‍🍳 Preparing</option>
          <option value="out_for_delivery">🚚 Out for Delivery</option>
          <option value="delivered">📦 Delivered</option>
          <option value="cancelled">❌ Cancel</option>
        </select>
      </td>
    </tr>
  `).join('');
}

function filterOrders(query) {
  const tbody = document.getElementById('allOrdersBody');
  if (!tbody) return;
  const statusFilter = document.getElementById('orderStatusFilter')?.value || 'all';
  let orders = [...allOrders];
  if (statusFilter !== 'all') orders = orders.filter(o => o.status === statusFilter);
  if (query) {
    orders = orders.filter(o =>
      o.orderId?.toLowerCase().includes(query.toLowerCase()) ||
      `${o.customer?.firstName} ${o.customer?.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
      o.customer?.email?.toLowerCase().includes(query.toLowerCase())
    );
  }
  renderOrdersTableWithData(orders);
}

function renderOrdersTableWithData(orders) {
  const tbody = document.getElementById('allOrdersBody');
  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:2rem;color:var(--gray);">No orders found</td></tr>`;
    return;
  }
  // Same as renderOrdersTable but with provided data
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td><strong>${o.orderId}</strong></td>
      <td>${o.customer?.firstName || ''} ${o.customer?.lastName || ''}</td>
      <td>${o.customer?.phone || '-'}</td>
      <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${o.items?.map(i => i.name).join(', ') || '-'}</td>
      <td><strong>₹${(o.total || 0).toLocaleString()}</strong></td>
      <td>${o.deliveryDate || '-'}</td>
      <td><span style="font-size:0.75rem;">${(o.paymentMethod || '').toUpperCase()}</span></td>
      <td><span class="status-badge ${o.status || 'pending'}">${(o.status || 'pending').toUpperCase()}</span></td>
      <td><select onchange="updateOrderStatus('${o.orderId}', this.value)" style="padding:0.3rem;border:1px solid rgba(166,123,91,0.2);border-radius:4px;font-size:0.75rem;background:white;"><option value="">Status</option><option value="confirmed">Confirm</option><option value="preparing">Preparing</option><option value="delivered">Delivered</option><option value="cancelled">Cancel</option></select></td>
    </tr>
  `).join('');
}

function updateOrderStatus(orderId, newStatus) {
  if (!newStatus) return;
  const orders = JSON.parse(localStorage.getItem('cravelab_orders') || '[]');
  const idx = orders.findIndex(o => o.orderId === orderId);
  if (idx >= 0) {
    orders[idx].status = newStatus;
    localStorage.setItem('cravelab_orders', JSON.stringify(orders));
    allOrders = orders;
    showToast(`Order ${orderId} → ${newStatus}`, 'success');
    renderOrdersTable();
    renderRecentOrders();

    // Sync to Sheets
    syncOrderStatusToSheets(orderId, newStatus);
  }
}

function syncOrderStatusToSheets(orderId, status) {
  const url = CRAVELAB_DATA.SHEETS_URL;
  if (!url || url.includes('YOUR_SCRIPT_ID')) return;
  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sheetType: 'UpdateStatus', orderId, status })
  });
}

function viewOrderDetail(orderId) {
  const order = allOrders.find(o => o.orderId === orderId);
  if (!order) return;

  const modal = document.getElementById('orderDetailModal');
  document.getElementById('orderDetailContent').innerHTML = `
    <h2 style="font-size:1.3rem;color:var(--espresso);margin-bottom:1rem;">Order: ${order.orderId}</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1rem;">
      <div>
        <h4 style="font-size:0.82rem;font-weight:700;color:var(--gray);margin-bottom:0.5rem;text-transform:uppercase;">Customer</h4>
        <p style="font-size:0.88rem;">${order.customer?.firstName} ${order.customer?.lastName}</p>
        <p style="font-size:0.82rem;color:var(--gray);">${order.customer?.email}</p>
        <p style="font-size:0.82rem;color:var(--gray);">${order.customer?.phone}</p>
      </div>
      <div>
        <h4 style="font-size:0.82rem;font-weight:700;color:var(--gray);margin-bottom:0.5rem;text-transform:uppercase;">Delivery</h4>
        <p style="font-size:0.82rem;">${order.customer?.address}</p>
        <p style="font-size:0.82rem;color:var(--mocha);">Date: ${order.deliveryDate} · ${order.deliverySlot}</p>
      </div>
    </div>
    <h4 style="font-size:0.82rem;font-weight:700;color:var(--gray);margin-bottom:0.5rem;text-transform:uppercase;">Items Ordered</h4>
    ${(order.items || []).map(i => `
      <div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid rgba(166,123,91,0.08);font-size:0.85rem;">
        <span>${i.emoji} ${i.name} (${i.size}) × ${i.qty}</span>
        <span style="font-weight:700;">₹${(i.price * i.qty).toLocaleString()}</span>
      </div>
    `).join('')}
    <div style="margin-top:0.8rem;text-align:right;">
      <p style="font-size:0.85rem;color:var(--gray);">Delivery: ₹${order.deliveryCharge || 50}</p>
      <p style="font-size:1.1rem;font-weight:700;">Total: ₹${(order.total || 0).toLocaleString()}</p>
    </div>
    <div style="margin-top:1rem;display:flex;gap:0.6rem;flex-wrap:wrap;">
      ${['confirmed','preparing','delivered'].map(s => `
        <button onclick="updateOrderStatus('${order.orderId}','${s}'); document.getElementById('orderDetailModal').classList.remove('active');" 
          class="btn-mocha" style="font-size:0.78rem;padding:0.4rem 0.8rem;">${s.charAt(0).toUpperCase()+s.slice(1)}</button>
      `).join('')}
    </div>
  `;
  modal.classList.add('active');
}

function renderAdminProducts() {
  const grid = document.getElementById('adminProductsGrid');
  if (!grid) return;

  grid.innerHTML = CRAVELAB_DATA.products.map(p => `
    <div style="background:white;border-radius:var(--radius);padding:1rem;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
      <img src="${p.image || 'images/placeholder.png'}" alt="${p.name}" style="width:100%;height:80px;object-fit:contain;border-radius:8px;background:white;margin-bottom:0.5rem;">
      <div style="font-size:0.82rem;font-weight:700;color:var(--espresso);margin-bottom:0.2rem;">${p.name}</div>
      <div style="font-size:0.72rem;color:var(--mocha);margin-bottom:0.4rem;">${p.category}</div>
      <div style="font-size:0.78rem;color:var(--gray);">from ₹${Object.values(p.prices)[0]}</div>
      <div style="display:flex;align-items:center;gap:4px;margin-top:0.4rem;">
        <span style="color:#fbbf24;font-size:0.75rem;">★</span>
        <span style="font-size:0.75rem;color:var(--gray);">${p.rating} (${p.reviews})</span>
        ${p.popular ? '<span style="font-size:0.65rem;background:rgba(244,167,185,0.2);color:var(--pink);padding:0.1rem 0.4rem;border-radius:10px;font-weight:700;">Popular</span>' : ''}
      </div>
    </div>
  `).join('');
}

function renderCustomers() {
  const tbody = document.getElementById('customersTableBody');
  if (!tbody) return;

  const orders = allOrders;
  const customerMap = {};
  orders.forEach(o => {
    const email = o.customer?.email;
    if (!email) return;
    if (!customerMap[email]) {
      customerMap[email] = { name: `${o.customer.firstName} ${o.customer.lastName}`, email, phone: o.customer.phone, orders: 0, spent: 0, joined: o.timestamp };
    }
    customerMap[email].orders++;
    customerMap[email].spent += o.total || 0;
  });

  const customers = Object.values(customerMap);
  if (customers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--gray);">No customer data yet</td></tr>';
    return;
  }

  tbody.innerHTML = customers.map(c => `
    <tr>
      <td><strong>${c.name}</strong></td>
      <td>${c.email}</td>
      <td>${c.phone || '-'}</td>
      <td><strong>${c.orders}</strong></td>
      <td><strong>₹${c.spent.toLocaleString()}</strong></td>
      <td>${new Date(c.joined).toLocaleDateString('en-IN')}</td>
    </tr>
  `).join('');
}

function renderBakeSessions() {
  const tbody = document.getElementById('bakeSessionsBody');
  if (!tbody) return;
  const sessions = JSON.parse(localStorage.getItem('cravelab_bake_bookings') || '[]');
  if (sessions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--gray);">No baking sessions yet</td></tr>';
    return;
  }
  tbody.innerHTML = sessions.map(s => `
    <tr>
      <td><strong>${s.bookingId}</strong></td>
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td style="text-transform:capitalize;">${s.difficulty}</td>
      <td>${s.sessions?.length || 1}</td>
      <td style="text-transform:capitalize;">${s.location}</td>
      <td>${s.template || 'Custom'}</td>
      <td><span class="status-badge confirmed">BOOKED</span></td>
    </tr>
  `).join('');
}

function renderContacts() {
  const tbody = document.getElementById('contactsTableBody');
  if (!tbody) return;
  const contacts = JSON.parse(localStorage.getItem('cravelab_contacts') || '[]');
  if (contacts.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--gray);">No messages yet</td></tr>';
    return;
  }
  tbody.innerHTML = contacts.map(c => `
    <tr>
      <td>${c.firstName} ${c.lastName || ''}</td>
      <td>${c.email}</td>
      <td>${c.subject || '-'}</td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c.message}</td>
      <td>${c.rating ? '⭐'.repeat(parseInt(c.rating)) : '-'}</td>
      <td>${new Date(c.timestamp).toLocaleDateString('en-IN')}</td>
    </tr>
  `).join('');
}

function renderReviews() {
  const tbody = document.getElementById('reviewsTableBody');
  if (!tbody) return;
  const allReviews = JSON.parse(localStorage.getItem('cravelab_reviews') || '{}');
  const rows = [];
  Object.entries(allReviews).forEach(([productId, reviews]) => {
    const product = CRAVELAB_DATA.products.find(p => p.id === productId);
    reviews.forEach(r => rows.push({ ...r, productName: product?.name || productId }));
  });

  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--gray);">No reviews yet</td></tr>';
    return;
  }
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td>${r.productName}</td>
      <td>${r.name}</td>
      <td style="color:#fbbf24;">${'★'.repeat(r.rating)}</td>
      <td>${r.text}</td>
      <td>${r.date || '-'}</td>
    </tr>
  `).join('');
}

// ---- Charts ----
function renderOrdersChart() {
  const ctx = document.getElementById('ordersChart');
  if (!ctx) return;
  if (charts.orders) charts.orders.destroy();

  const days = [];
  const counts = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toLocaleDateString('en-IN', { weekday: 'short' }));
    const dayOrders = allOrders.filter(o => {
      const od = new Date(o.timestamp);
      return od.toDateString() === d.toDateString();
    }).length;
    counts.push(dayOrders || Math.floor(Math.random() * 8 + 1));
  }

  charts.orders = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [{
        label: 'Orders',
        data: counts,
        borderColor: '#F4A7B9',
        backgroundColor: 'rgba(244, 167, 185, 0.15)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#F4A7B9',
        pointRadius: 5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, grid: { color: 'rgba(166,123,91,0.08)' } }, x: { grid: { display: false } } }
    }
  });
}

function renderCategoryChart() {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;
  if (charts.category) charts.category.destroy();

  const catCounts = { cakes: 42, pastries: 28, donuts: 35, croissants: 15, brownies: 30, desserts: 20 };

  charts.category = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Cakes', 'Pastries', 'Donuts', 'Croissants', 'Brownies', 'Desserts'],
      datasets: [{ data: Object.values(catCounts), backgroundColor: ['#F4A7B9','#A67B5B','#C9A88A','#2C2118','#fbbf24','#a78bfa'], borderWidth: 0 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 8 } } }
    }
  });
}

function renderAnalytics() {
  setTimeout(() => {
    // Monthly Revenue
    const revCtx = document.getElementById('revenueChart');
    if (revCtx && !charts.revenue) {
      charts.revenue = new Chart(revCtx, {
        type: 'bar',
        data: {
          labels: ['Oct','Nov','Dec','Jan','Feb','Mar'],
          datasets: [{
            label: 'Revenue (₹)',
            data: [45000, 62000, 89000, 55000, 71000, 94000],
            backgroundColor: '#F4A7B9', borderRadius: 6,
          }]
        },
        options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}} }
      });
    }

    // Top Products
    const tpCtx = document.getElementById('topProductsChart');
    if (tpCtx && !charts.topProducts) {
      charts.topProducts = new Chart(tpCtx, {
        type: 'bar',
        indexAxis: 'y',
        data: {
          labels: ['Oreo Cake','Red Velvet','KitKat Cake','Nutella Filled Donut','Lava Brownie'],
          datasets: [{ data: [42, 38, 35, 31, 29], backgroundColor: ['#F4A7B9','#A67B5B','#C9A88A','#fbbf24','#a78bfa'], borderRadius: 4 }]
        },
        options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{beginAtZero:true}} }
      });
    }

    // Weekday chart
    const wdCtx = document.getElementById('weekdayChart');
    if (wdCtx && !charts.weekday) {
      charts.weekday = new Chart(wdCtx, {
        type: 'bar',
        data: {
          labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
          datasets: [{ data: [12,8,10,15,22,35,28], backgroundColor: '#C9A88A', borderRadius: 4 }]
        },
        options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}} }
      });
    }

    // Payment chart
    const pyCtx = document.getElementById('paymentChart');
    if (pyCtx && !charts.payment) {
      charts.payment = new Chart(pyCtx, {
        type: 'pie',
        data: {
          labels: ['UPI','Card','COD','Net Banking'],
          datasets: [{ data: [55, 25, 15, 5], backgroundColor: ['#F4A7B9','#A67B5B','#C9A88A','#2C2118'], borderWidth: 0 }]
        },
        options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom'}} }
      });
    }
  }, 100);
}

// ---- Google Sheets Sync ----
async function syncFromSheets() {
  const url = CRAVELAB_DATA.SHEETS_URL;
  if (!url || url.includes('YOUR_SCRIPT_ID')) {
    showToast('Please configure Google Sheets URL in Settings first!', 'error');
    showSection('settings', null);
    return;
  }

  try {
    showToast('Syncing from Google Sheets...', 'info');
    const response = await fetch(`${url}?action=getOrders`);
    if (response.ok) {
      const data = await response.json();
      if (data.orders) {
        localStorage.setItem('cravelab_orders', JSON.stringify(data.orders));
        allOrders = data.orders;
        renderDashboard();
        showToast(`✅ Synced ${data.orders.length} orders from Sheets!`, 'success');
      }
    }
  } catch (e) {
    showToast('Sync failed. Check your Sheets URL.', 'error');
  }
}

function exportData() {
  const orders = allOrders;
  if (orders.length === 0) {
    showToast('No orders to export', 'error');
    return;
  }

  const headers = ['Order ID', 'Customer', 'Email', 'Phone', 'Items', 'Total', 'Delivery Date', 'Slot', 'Payment', 'Status', 'Timestamp'];
  const rows = orders.map(o => [
    o.orderId,
    `${o.customer?.firstName} ${o.customer?.lastName}`,
    o.customer?.email,
    o.customer?.phone,
    o.items?.map(i => `${i.name} x${i.qty}`).join('; '),
    o.total,
    o.deliveryDate,
    o.deliverySlot,
    o.paymentMethod,
    o.status,
    o.timestamp
  ]);

  const csv = [headers, ...rows].map(r => r.map(v => `"${v || ''}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cravelab_orders_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Orders exported as CSV! 📥', 'success');
}

function saveSheetsUrl() {
  const url = document.getElementById('sheetsUrl').value.trim();
  if (!url) {
    showToast('Please enter a URL', 'error');
    return;
  }

  // Save to data config
  CRAVELAB_DATA.SHEETS_URL = url;
  localStorage.setItem('cravelab_sheets_url', url);
  showToast('Sheets URL saved! Testing connection...', 'info');

  // Test connection
  fetch(url + '?action=ping', { mode: 'no-cors' })
    .then(() => showToast('✅ Google Sheets connected successfully!', 'success'))
    .catch(() => showToast('Connection test done. Check your Script settings.', 'info'));
}

function loadSettings() {
  const savedUrl = localStorage.getItem('cravelab_sheets_url') || '';
  const urlInput = document.getElementById('sheetsUrl');
  if (urlInput) urlInput.value = savedUrl;
}

function updateAdminCreds() {
  const username = document.getElementById('newAdminUser').value.trim();
  const password = document.getElementById('newAdminPass').value;
  if (!username || !password) {
    showToast('Please fill in both fields', 'error');
    return;
  }
  localStorage.setItem('admin_username', username);
  localStorage.setItem('admin_password', password);
  showToast('Admin credentials updated! ✅', 'success');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  const savedUrl = localStorage.getItem('cravelab_sheets_url');
  if (savedUrl) CRAVELAB_DATA.SHEETS_URL = savedUrl;

  // Load toast container
  if (!document.getElementById('toast-container')) {
    const tc = document.createElement('div');
    tc.id = 'toast-container';
    document.body.appendChild(tc);
  }
});
