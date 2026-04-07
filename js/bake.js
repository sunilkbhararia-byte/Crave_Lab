// =========================================
// CraveLab - BakeYourOwnCake Script
// =========================================

let currentStep = 1;
let selectedDifficulty = null;
let selectedLocation = 'kitchen';
let uploadedImage = null;
let selectedTemplate = null;
let sessionBookings = [];

const GUIDES = {
  basics: {
    title: '📖 Baking Basics',
    content: `
      <h2>Baking Basics Guide</h2>
      <p style="color:var(--gray);margin-bottom:1.5rem;">Master the fundamentals of baking before you begin.</p>
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div style="padding:1rem;background:var(--cream);border-radius:var(--radius-sm);">
          <h4 style="font-size:0.9rem;margin-bottom:0.3rem;">🥣 Essential Equipment</h4>
          <p style="font-size:0.82rem;color:var(--gray);">Mixing bowls, electric mixer, cake pans (6", 8"), oven thermometer, cooling rack, offset spatula, bench scraper.</p>
        </div>
        <div style="padding:1rem;background:var(--cream);border-radius:var(--radius-sm);">
          <h4 style="font-size:0.9rem;margin-bottom:0.3rem;">🌡️ Temperature Matters</h4>
          <p style="font-size:0.82rem;color:var(--gray);">Always use room temperature butter and eggs. Preheat oven 15 min before. Use an oven thermometer for accuracy.</p>
        </div>
        <div style="padding:1rem;background:var(--cream);border-radius:var(--radius-sm);">
          <h4 style="font-size:0.9rem;margin-bottom:0.3rem;">📏 Measuring Tips</h4>
          <p style="font-size:0.82rem;color:var(--gray);">Use a kitchen scale for precision. Spoon flour into measuring cups, level with a straight edge — never pack it.</p>
        </div>
        <div style="padding:1rem;background:var(--cream);border-radius:var(--radius-sm);">
          <h4 style="font-size:0.9rem;margin-bottom:0.3rem;">🔄 Mixing Method</h4>
          <p style="font-size:0.82rem;color:var(--gray);">Cream butter and sugar until light and fluffy (3-5 min). Add eggs one at a time. Alternate dry and wet ingredients.</p>
        </div>
      </div>
      <button class="btn-primary" style="width:100%;justify-content:center;margin-top:1.5rem;" onclick="document.getElementById('guideModal').classList.remove('active')">Got It! Let's Bake 🎂</button>
    `
  },
  frosting: {
    title: '🎨 Frosting & Decoration',
    content: `
      <h2>Frosting & Decoration Guide</h2>
      <p style="color:var(--gray);margin-bottom:1.5rem;">Create beautiful finishes for your cakes.</p>
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div style="padding:1rem;background:var(--cream);border-radius:var(--radius-sm);">
          <h4 style="font-size:0.9rem;margin-bottom:0.3rem;">🧁 Buttercream Types</h4>
          <p style="font-size:0.82rem;color:var(--gray);">American BC (simple), Swiss Meringue BC (silky), Italian Meringue BC (stable) — choose based on occasion and weather.</p>
        </div>
        <div style="padding:1rem;background:var(--cream);border-radius:var(--radius-sm);">
          <h4 style="font-size:0.9rem;margin-bottom:0.3rem;">🍫 Ganache Ratios</h4>
          <p style="font-size:0.82rem;color:var(--gray);">Drip ganache: 1:1 chocolate to cream. Truffle: 2:1 chocolate to cream. Glaze: 1:2 chocolate to cream.</p>
        </div>
        <div style="padding:1rem;background:var(--cream);border-radius:var(--radius-sm);">
          <h4 style="font-size:0.9rem;margin-bottom:0.3rem;">🎂 Crumb Coat</h4>
          <p style="font-size:0.82rem;color:var(--gray);">Always apply a thin crumb coat first and refrigerate for 30 min before the final layer. This locks in crumbs.</p>
        </div>
      </div>
      <button class="btn-primary" style="width:100%;justify-content:center;margin-top:1.5rem;" onclick="document.getElementById('guideModal').classList.remove('active')">Got It! 🎨</button>
    `
  },
  layered: {
    title: '🎂 Layered Cakes Guide',
    content: `
      <h2>Layered Cakes Guide</h2>
      <p style="color:var(--gray);margin-bottom:1.5rem;">Build stunning multi-layer cakes with confidence.</p>
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div style="padding:1rem;background:rgba(244,167,185,0.08);border-radius:var(--radius-sm);border:1px solid rgba(244,167,185,0.2);">
          <h4 style="font-size:0.9rem;">⚠️ Session Required</h4>
          <p style="font-size:0.82rem;color:var(--gray);">This is an intermediate to advanced topic covered in our baking sessions. Book a Medium or Hard session to learn these techniques hands-on!</p>
        </div>
        <div style="padding:1rem;background:var(--cream);border-radius:var(--radius-sm);">
          <h4 style="font-size:0.9rem;margin-bottom:0.3rem;">📐 Leveling</h4>
          <p style="font-size:0.82rem;color:var(--gray);">Always level each layer with a serrated knife or cake leveler before stacking. Chilled cakes are easier to work with.</p>
        </div>
      </div>
      <button class="btn-primary" style="width:100%;justify-content:center;margin-top:1.5rem;" onclick="goToStep(1); document.getElementById('guideModal').classList.remove('active')">Book a Session 🎂</button>
    `
  },
  chocolate: {
    title: '🍫 Chocolate Work Guide',
    content: `
      <h2>Chocolate Work Guide</h2>
      <p style="color:var(--gray);margin-bottom:1.5rem;">Master the art of working with chocolate.</p>
      <div style="padding:1rem;background:rgba(244,167,185,0.08);border-radius:var(--radius-sm);border:1px solid rgba(244,167,185,0.2);margin-bottom:1rem;">
        <h4 style="font-size:0.9rem;">⚠️ Session Required</h4>
        <p style="font-size:0.82rem;color:var(--gray);">Advanced chocolate work is taught in our Hard/Professional baking sessions.</p>
      </div>
      <button class="btn-primary" style="width:100%;justify-content:center;margin-top:1rem;" onclick="goToStep(1); document.getElementById('guideModal').classList.remove('active')">Book a Session 🍫</button>
    `
  }
};

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    showToast('File too large. Max 5MB.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage = e.target.result;
    document.getElementById('previewImg').src = uploadedImage;
    document.getElementById('uploadPreview').style.display = 'block';
    document.getElementById('uploadZone').style.display = 'none';
    selectedTemplate = null;
  };
  reader.readAsDataURL(file);
}

function setupBakeAuthListeners() {
  // Auth listeners can be added here if needed in the future
}

// Initialize Bake auth listeners
document.addEventListener('DOMContentLoaded', setupBakeAuthListeners);

function handleDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add('dragging');
}

function handleDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove('dragging');
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    const fakeEvent = { target: { files: [file] } };
    handleImageUpload(fakeEvent);
  }
}

function resetUpload() {
  uploadedImage = null;
  selectedTemplate = null;
  document.getElementById('uploadPreview').style.display = 'none';
  document.getElementById('uploadZone').style.display = 'block';
  document.getElementById('uploadInput').value = '';
}

function selectTemplate(name) {
  selectedTemplate = name;
  uploadedImage = null;
  document.getElementById('uploadPreview').style.display = 'none';
  document.getElementById('uploadZone').style.display = 'block';
  document.querySelectorAll('.texture-chip').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.texture-chip').forEach(c => {
    if (c.getAttribute('onclick') && c.getAttribute('onclick').includes(name)) {
      c.classList.add('selected');
    }
  });
  showToast(`Template selected: ${name}`, 'success');
}

function proceedToStep2() {
  if (!uploadedImage && !selectedTemplate) {
    showToast('Please upload an image or select a template!', 'error');
    return;
  }

  goToStep(2);
  runAIAnalysis();
}

function runAIAnalysis() {
  const loading = document.getElementById('aiAnalysisLoading');
  const result = document.getElementById('aiAnalysisResult');
  const progressBar = document.getElementById('aiProgressBar');
  const step2Next = document.getElementById('step2Next');

  loading.style.display = 'block';
  result.style.display = 'none';
  step2Next.disabled = true;

  // Simulate AI analysis
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 25;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      // Show results
      setTimeout(() => {
        loading.style.display = 'none';
        result.style.display = 'block';
        step2Next.disabled = false;

        // AI result text
        const dessertName = selectedTemplate || 'your uploaded dessert';
        const titleEl = document.getElementById('aiResultTitle');
        const descEl = document.getElementById('aiResultDesc');

        titleEl.textContent = `Analysis of: ${dessertName}`;
        descEl.textContent = `Based on AI analysis, this dessert requires intermediate baking skills with layering, frosting, and decoration techniques. We recommend 2 sessions for best results. However, if you're a complete beginner, starting with 1 Easy session is a great way to build confidence!`;

        // Auto-suggest medium difficulty
        selectDifficulty('medium', document.getElementById('diffMedium'));
      }, 300);
    }
    progressBar.style.width = progress + '%';
  }, 300);
}

function selectDifficulty(level, card) {
  selectedDifficulty = level;
  document.querySelectorAll('.difficulty-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  document.getElementById('step2Next').disabled = false;

  // Generate sessions for step 3
  const sessions = { easy: 1, medium: 2, hard: 3 };
  sessionBookings = Array.from({ length: sessions[level] }, (_, i) => ({
    session: i + 1,
    date: '',
    time: ''
  }));

  const total = document.getElementById('sessionTotal');
  if (total) total.textContent = `₹${sessions[level] * 499}`;
}

function selectLocation(loc, card) {
  selectedLocation = loc;
  document.querySelectorAll('#locKitchen, #locOnline').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}

function goToStep(step) {
  // Validate step 4
  if (step === 5) {
    const name = document.getElementById('bakeName').value.trim();
    const phone = document.getElementById('bakePhone').value.trim();
    const email = document.getElementById('bakeEmail').value.trim();
    if (!name || !phone || !email) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    renderBookingSummary();
  }

  // Update panels
  for (let i = 1; i <= 5; i++) {
    const panel = document.getElementById(`bakeStep${i}`);
    const indicator = document.getElementById(`stepIndicator${i}`);
    if (panel) panel.classList.toggle('active', i === step);
    if (indicator) {
      indicator.classList.remove('active', 'done');
      if (i === step) indicator.classList.add('active');
      else if (i < step) indicator.classList.add('done');
    }
    const line = document.getElementById(`line${i}`);
    if (line) line.classList.toggle('done', i < step);
  }

  currentStep = step;

  // Render session booking UI
  if (step === 3) renderSessionBookings();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderSessionBookings() {
  const container = document.getElementById('sessionBookings');
  if (!container) return;

  const sessions = selectedDifficulty === 'easy' ? 1 : selectedDifficulty === 'medium' ? 2 : 3;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 3);

  let html = '';
  for (let i = 1; i <= sessions; i++) {
    const minDate = new Date(tomorrow);
    if (i > 1) minDate.setDate(minDate.getDate() + (i - 1) * 7);
    const minDateStr = minDate.toISOString().split('T')[0];

    html += `
      <div style="background:var(--cream);border-radius:var(--radius);padding:1.5rem;margin-bottom:1rem;">
        <h4 style="margin-bottom:1rem;font-size:0.95rem;color:var(--espresso);">Session ${i} of ${sessions}</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <div class="form-group">
            <label>Preferred Date</label>
            <input type="date" id="sessionDate${i}" min="${minDateStr}" onchange="updateSessionData(${i})" style="background:white;"/>
          </div>
          <div class="form-group">
            <label>Preferred Time</label>
            <select id="sessionTime${i}" onchange="updateSessionData(${i})" style="background:white;">
              <option value="">Select time</option>
              <option value="09:00">9:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="18:00">6:00 PM</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}

function updateSessionData(i) {
  const date = document.getElementById(`sessionDate${i}`)?.value;
  const time = document.getElementById(`sessionTime${i}`)?.value;
  if (sessionBookings[i - 1]) {
    sessionBookings[i - 1].date = date;
    sessionBookings[i - 1].time = time;
  }
}

function renderBookingSummary() {
  const summary = document.getElementById('bookingSummary');
  if (!summary) return;

  const name = document.getElementById('bakeName').value;
  const phone = document.getElementById('bakePhone').value;
  const email = document.getElementById('bakeEmail').value;
  const experience = document.getElementById('bakeExperience').value;
  const notes = document.getElementById('bakeNotes').value;
  const sessions = selectedDifficulty === 'easy' ? 1 : selectedDifficulty === 'medium' ? 2 : 3;

  summary.innerHTML = `
    <h4 style="font-size:0.95rem;margin-bottom:1rem;color:var(--espresso);">📋 Booking Summary</h4>
    <div style="display:grid;gap:0.5rem;font-size:0.85rem;">
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--gray);">Dessert:</span><span style="font-weight:600;">${selectedTemplate || 'Custom Upload'}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--gray);">Difficulty:</span><span style="font-weight:600;text-transform:capitalize;">${selectedDifficulty || 'Medium'}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--gray);">Sessions:</span><span style="font-weight:600;">${sessions} session(s)</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--gray);">Location:</span><span style="font-weight:600;">${selectedLocation === 'kitchen' ? '🏪 CraveLab Kitchen' : '💻 Online'}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--gray);">Name:</span><span style="font-weight:600;">${name}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--gray);">Email:</span><span style="font-weight:600;">${email}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--gray);">Experience:</span><span style="font-weight:600;text-transform:capitalize;">${experience}</span></div>
      ${notes ? `<div style="display:flex;justify-content:space-between;"><span style="color:var(--gray);">Notes:</span><span style="font-weight:600;max-width:200px;text-align:right;">${notes}</span></div>` : ''}
    </div>
  `;
}

function submitBakeBooking() {
  if (!isLoggedIn()) {
    showToast('Please login to book your cake.', 'error');
    openLoginModal();
    return;
  }

  if (!document.getElementById('termsCheck').checked) {
    showToast('Please agree to the Terms & Conditions', 'error');
    return;
  }

  const user = getCurrentUser();
  const bookingId = 'CL-BAKE-' + Date.now().toString().slice(-6);
  const bookingData = {
    type: 'bake_session',
    bookingId,
    userId: user?.email || user?.name || 'unknown',
    status: 'pending',
    name: document.getElementById('bakeName').value,
    phone: document.getElementById('bakePhone').value,
    email: document.getElementById('bakeEmail').value,
    difficulty: selectedDifficulty,
    location: selectedLocation,
    sessions: sessionBookings,
    template: selectedTemplate || 'Custom Upload',
    image: uploadedImage ? 'Uploaded Image' : null,
    timestamp: new Date().toISOString()
  };

  // Save locally
  let bookings = JSON.parse(localStorage.getItem('cravelab_bake_bookings') || '[]');
  bookings.push(bookingData);
  localStorage.setItem('cravelab_bake_bookings', JSON.stringify(bookings));

  // Send to Google Sheets
  sendToGoogleSheets({ ...bookingData, sheetType: 'BakeSession' });

  // Show success
  document.getElementById('bookingId').textContent = `Booking ID: ${bookingId}`;
  document.getElementById('bookingSuccessModal').classList.add('active');
}

function openReadyMadeModal() {
  const modal = document.getElementById('readyMadeModal');
  if (!modal) return;
  const flavorSelect = document.getElementById('readyMadeFlavor');
  const sizeSelect = document.getElementById('readyMadeSize');
  if (flavorSelect) flavorSelect.value = '';
  if (sizeSelect) sizeSelect.value = '500g';
  modal.classList.add('active');
}

function closeReadyMadeModal() {
  document.getElementById('readyMadeModal')?.classList.remove('active');
}

function confirmReadyMadeOrder() {
  const flavorSelect = document.getElementById('readyMadeFlavor');
  const sizeSelect = document.getElementById('readyMadeSize');
  const flavor = flavorSelect?.value;
  const size = sizeSelect?.value || '500g';

  if (!flavor) {
    showToast('Please select a cake flavor before continuing.', 'error');
    return;
  }

  closeReadyMadeModal();
  addToCart(flavor, size, 1);
  addReadyMadeCustomizationFee();
  window.location.href = 'checkout.html';
}

function addReadyMadeCustomizationFee() {
  if (typeof cart === 'undefined') return;
  const existingFee = cart.find(item => item.id === 'customization_fee');
  if (existingFee) return;

  cart.push({
    id: 'customization_fee',
    name: 'Customization Fee',
    emoji: '🛠️',
    image: "images/customization.png",
    size: '',
    price: 499,
    qty: 1,
    category: 'fee'
  });

  saveCart();
}

function openGuide(type) {
  const guide = GUIDES[type];
  if (!guide) return;
  const modal = document.getElementById('guideModal');
  document.getElementById('guideContent').innerHTML = guide.content;
  modal.classList.add('active');
}

function closeGuideModal() {
  document.getElementById('guideModal').classList.remove('active');
}

function sendToGoogleSheets(data) {
  // Send to Google Sheets Web App
  const url = CRAVELAB_DATA.SHEETS_URL;
  if (!url || url.includes('YOUR_SCRIPT_ID')) return;

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).catch(err => console.log('Sheets sync skipped:', err));
}
