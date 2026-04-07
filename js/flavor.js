// =========================================
// CraveLab - Flavor Profile Meter & Texture Map
// =========================================

const FLAVOR_PROFILES = {
  sweet: { label: 'Sweet', color: '#F4A7B9', icon: '🍬', products: ['Rasmalai Cake', 'Butterscotch Cake', 'Caramel Specialty Cake', 'Rainbow Pastry'] },
  rich: { label: 'Rich', color: '#A67B5B', icon: '🍫', products: ['Chocolate Truffle Cake', 'Nutella Cake', 'Ferrero Rocher Cake', 'Dutch Chocolate Cake'] },
  fruity: { label: 'Fruity', color: '#C9A88A', icon: '🍓', products: ['Pineapple Cake', 'Fresh Fruit Pastry', 'Strawberry Filled Donut', 'Pineapple Coconut Cake'] },
  intense: { label: 'Intense', color: '#2C2118', icon: '⚡', products: ['Chocolate Mud Cake', 'Lava / Melting Brownie', 'Coffee / Mocha Cake', 'Chocolate Fudge Brownie'] },
  nutty: { label: 'Nutty', color: '#fbbf24', icon: '🌰', products: ['Almond Croissant', 'Walnut Brownie', 'Chocolate Almond Cake', 'Ferrero Rocher Cake'] },
  creamy: { label: 'Creamy', color: '#a78bfa', icon: '🍦', products: ['Chocolate Mousse', 'Brownie with Ice Cream', 'Vanilla Cream Pastry', 'Caramel Crunch Cake'] },
};

const TEXTURE_PREFERENCES = [
  { id: 'fluffy', label: '☁️ Fluffy', icon: '☁️' },
  { id: 'fudgy', label: '🍫 Fudgy', icon: '🍫' },
  { id: 'crunchy', label: '💎 Crunchy', icon: '💎' },
  { id: 'creamy', label: '🌊 Creamy', icon: '🌊' },
  { id: 'layered', label: '📚 Layered', icon: '📚' },
  { id: 'gooey', label: '🌋 Gooey', icon: '🌋' },
  { id: 'airy', label: '🎈 Airy', icon: '🎈' },
  { id: 'dense', label: '🏋️ Dense', icon: '🏋️' },
  { id: 'flaky', label: '🍂 Flaky', icon: '🍂' },
];

let selectedTextures = [];
let flavorChart = null;
let previewChart = null;

function openFlavorProfile() {
  const modal = document.getElementById('flavorModal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderFlavorSliders();
  renderTextureGrid();
  resetFlavorResult();
}

function closeFlavorModal() {
  const modal = document.getElementById('flavorModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function renderFlavorSliders() {
  const container = document.getElementById('flavorSliders');
  if (!container) return;

  container.innerHTML = Object.entries(FLAVOR_PROFILES).map(([key, prof]) => `
    <div class="flavor-slider-row">
      <span class="flavor-slider-label">${prof.icon} ${prof.label}</span>
      <input type="range" min="1" max="10" value="5" id="slider_${key}"
        oninput="document.getElementById('val_${key}').textContent = this.value; updatePreviewChart()"/>
      <span class="flavor-val" id="val_${key}">5</span>
    </div>
  `).join('');
}

function renderTextureGrid() {
  const container = document.getElementById('textureGrid');
  if (!container) return;

  container.innerHTML = TEXTURE_PREFERENCES.map(t => `
    <div class="texture-chip" id="tex_${t.id}" onclick="toggleTexture('${t.id}', this)">
      ${t.icon} ${t.label.replace(t.icon + ' ', '')}
    </div>
  `).join('');
}

function toggleTexture(id, el) {
  el.classList.toggle('selected');
  const idx = selectedTextures.indexOf(id);
  if (idx >= 0) selectedTextures.splice(idx, 1);
  else selectedTextures.push(id);
}

function resetFlavorResult() {
  const step1 = document.getElementById('flavorStep1');
  const result = document.getElementById('flavorResult');
  if (step1) step1.style.display = 'block';
  if (result) result.style.display = 'none';
  selectedTextures = [];
}

function updatePreviewChart() {
  if (!previewChart) return;
  const values = Object.keys(FLAVOR_PROFILES).map(k => {
    const el = document.getElementById(`slider_${k}`);
    return el ? parseInt(el.value) : 5;
  });
  previewChart.data.datasets[0].data = values;
  previewChart.update();
}

function initPreviewChart() {
  const canvas = document.getElementById('flavorPreviewChart');
  if (!canvas) return;

  const labels = Object.values(FLAVOR_PROFILES).map(p => `${p.icon} ${p.label}`);
  const colors = Object.values(FLAVOR_PROFILES).map(p => p.color);
  const data = [7, 6, 5, 4, 6, 8]; // Sample preview data

  previewChart = new Chart(canvas, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: 'rgba(244, 167, 185, 0.2)',
        borderColor: '#F4A7B9',
        borderWidth: 2,
        pointBackgroundColor: colors,
        pointBorderColor: '#fff',
        pointRadius: 5,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          min: 0, max: 10,
          ticks: { display: false },
          grid: { color: 'rgba(166, 123, 91, 0.15)' },
          pointLabels: { font: { size: 11, family: 'Poppins' }, color: '#2C2118' }
        }
      }
    }
  });
}

function generateFlavorProfile() {
  const values = Object.keys(FLAVOR_PROFILES).map(k => {
    const el = document.getElementById(`slider_${k}`);
    return el ? parseInt(el.value) : 5;
  });

  // Find top 2 flavors
  const sorted = Object.keys(FLAVOR_PROFILES).map((k, i) => ({ key: k, val: values[i] }))
    .sort((a, b) => b.val - a.val);

  const topFlavor = FLAVOR_PROFILES[sorted[0].key];
  const secondFlavor = FLAVOR_PROFILES[sorted[1].key];

  // Get recommendations
  const recs = [...new Set([...topFlavor.products, ...secondFlavor.products])].slice(0, 6);

  const step1 = document.getElementById('flavorStep1');
  const result = document.getElementById('flavorResult');
  if (step1) step1.style.display = 'none';
  if (result) {
    result.style.display = 'block';
    result.innerHTML = `
      <div class="flavor-result-card">
        <div class="modal-logo" style="margin-bottom:1rem;">
          <div class="icon">${topFlavor.icon}</div>
          <h2 style="font-size:1.3rem;">Your Flavor Profile: <span style="color:var(--pink)">${topFlavor.label} + ${secondFlavor.label}</span></h2>
          <p>Based on your preferences, here are your perfect CraveLab matches!</p>
        </div>
        <canvas id="flavorResultChart" height="220"></canvas>
        ${selectedTextures.length > 0 ? `
          <div style="margin:1rem 0;">
            <h4 style="font-size:0.88rem;color:var(--espresso);margin-bottom:0.5rem;">Your Texture Preferences:</h4>
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
              ${selectedTextures.map(t => {
                const tex = TEXTURE_PREFERENCES.find(tx => tx.id === t);
                return tex ? `<span style="padding:0.3rem 0.7rem;background:rgba(244,167,185,0.1);border-radius:20px;font-size:0.78rem;font-weight:600;">${tex.label.replace(tex.icon + ' ', '')}</span>` : '';
              }).join('')}
            </div>
          </div>
        ` : ''}
        <h4 style="font-size:0.9rem;color:var(--espresso);margin:1rem 0 0.5rem;">🎯 Recommended For You:</h4>
        <div class="recommended-desserts">
          ${recs.map(rec => `<div class="rec-dessert-pill">🍰 ${rec}</div>`).join('')}
        </div>
        <div style="margin-top:1.5rem;display:flex;gap:0.8rem;">
          <button class="btn-primary" style="flex:1;justify-content:center;" onclick="closeFlavorModal(); window.location.href='shop.html'">
            <i class="fas fa-shopping-bag"></i> Shop My Picks
          </button>
          <button class="btn-secondary" onclick="resetFlavorResult()" style="flex:0.5;justify-content:center;">Retry</button>
        </div>
      </div>
    `;

    // Draw result radar chart
    const canvas = document.getElementById('flavorResultChart');
    if (canvas && window.Chart) {
      new Chart(canvas, {
        type: 'radar',
        data: {
          labels: Object.values(FLAVOR_PROFILES).map(p => `${p.icon} ${p.label}`),
          datasets: [{
            data: values,
            backgroundColor: 'rgba(244, 167, 185, 0.25)',
            borderColor: '#F4A7B9',
            borderWidth: 2,
            pointBackgroundColor: Object.values(FLAVOR_PROFILES).map(p => p.color),
            pointBorderColor: '#fff',
            pointRadius: 5,
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              min: 0, max: 10,
              ticks: { display: false },
              grid: { color: 'rgba(166, 123, 91, 0.15)' },
              pointLabels: { font: { size: 10, family: 'Poppins' }, color: '#2C2118' }
            }
          }
        }
      });
    }
  }
}

// Initialize preview chart on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('flavorPreviewChart')) {
    initPreviewChart();
  }
});
