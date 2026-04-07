# 🍰 CraveLab – Custom Dessert Personalization Platform

> "A creative dessert platform where customers design their own treats, powered by AI and delivered with love."

---

## 🌐 Project Overview

**CraveLab** is a fully responsive, multi-page e-commerce + customization website for a dessert brand. It includes:
- Full product catalog with 50+ desserts
- AI-powered features (MoodMuse, CraveWise, Flavor Profile Meter)
- Custom cake baking session booking (BakeYourOwnCake)
- Google Sheets-backed Admin Panel
- Cart, checkout, and order management
- My Account with order history and wishlist

---

## 📁 File Structure

```
📦 CraveLab/
├── index.html              ← Home Page
├── about.html              ← About Us
├── shop.html               ← Shop (all products with filters)
├── bake.html               ← BakeYourOwnCake (interactive 5-step)
├── cravewise.html          ← CraveWise (calorie + AI recs)
├── moodmuse.html           ← MoodMuse (mood-based AI recommender)
├── contact.html            ← Contact + FAQ
├── checkout.html           ← Cart checkout flow
├── account.html            ← My Account (orders, wishlist, profile)
├── admin.html              ← Admin Panel
├── google-apps-script.js   ← Copy to Google Apps Script
│
├── css/
│   ├── style.css           ← Global styles + variables
│   ├── home.css            ← Home page styles
│   ├── shop.css            ← Shop page styles
│   └── pages.css           ← All other pages + Admin styles
│
└── js/
    ├── data.js             ← All product data, moods, calorie data
    ├── cart.js             ← Cart management + localStorage
    ├── auth.js             ← Login/Register + navbar + search
    ├── flavor.js           ← Flavor Profile Meter + Texture Map
    ├── home.js             ← Home page rendering
    ├── shop.js             ← Shop page + product modal + reviews
    ├── bake.js             ← BakeYourOwnCake 5-step wizard
    └── admin.js            ← Admin panel + charts + data mgmt
```

---

## 📄 Pages & Routes

| Page | URL | Description |
|------|-----|-------------|
| Home | `index.html` | Hero, trending products, features, testimonials |
| About | `about.html` | Brand story, team, values, hygiene standards |
| Shop | `shop.html` | Full menu with category filters, sort, sidebar |
| BakeYourOwnCake | `bake.html` | 5-step baking session booking with AI |
| CraveWise | `cravewise.html` | Calorie calculator + AI dessert recs |
| MoodMuse | `moodmuse.html` | Mood-based AI dessert recommender |
| Contact | `contact.html` | Contact form + FAQ + WhatsApp |
| Checkout | `checkout.html` | Full checkout with payment options |
| Account | `account.html` | Orders, wishlist, profile, addresses |
| Admin | `admin.html` | Full admin dashboard (password protected) |

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Warm Ivory/Cream | `#FFF8F0` | Primary background |
| Dusty Rose Pink | `#F4A7B9` | CTA buttons, highlights |
| Warm Mocha Brown | `#A67B5B` | Branding, icons |
| Caramel Beige | `#C9A88A` | Secondary elements, hover |
| Deep Espresso Brown | `#2C2118` | Headings, footer |

---

## 🔧 Key Features

### 🛒 E-Commerce
- 50+ products across 6 categories (Cakes, Pastries, Donuts, Croissants, Brownies, Desserts)
- Size variants with dynamic pricing
- Cart management (localStorage-based)
- Checkout with delivery date/slot selection
- Promo codes: `CRAVELAB10`, `SWEET20`, `FIRSTORDER`
- Order tracking in My Account

### 🤖 AI Features
- **MoodMuse**: 10 moods × occasion/flavor/budget filters → personalized recommendations
- **CraveWise**: Mifflin-St Jeor BMR calculator + macro breakdown + dessert budget
- **Flavor Profile Meter**: Radar chart with 6 flavor dimensions + texture map

### 🎂 BakeYourOwnCake
- 5-step wizard: Upload → AI Analysis → Difficulty → Book → Confirm
- 3 difficulty levels (Easy/Medium/Hard = 1/2/3 sessions)
- Location: CraveLab Kitchen or Online
- Google Sheets booking sync

### 🛡️ Admin Panel
- URL: `admin.html`
- **Default Login**: username: `admin`, password: `cravelab2025`
- Dashboard with KPI stats + Charts (Chart.js)
- Order management with status updates
- Customer database, contact messages, reviews
- Analytics charts (revenue, top products, weekday trends)
- Google Sheets real-time sync

### 📊 Google Sheets Integration
- Orders → "Orders" sheet
- Contact forms → "Contacts" sheet
- Baking sessions → "BakeSessions" sheet
- Newsletter → "Subscribers" sheet

---

## 🚀 Google Sheets Setup

1. Create a new Google Sheet
2. Copy content of `google-apps-script.js` into Apps Script
3. Replace `YOUR_SPREADSHEET_ID_HERE` with your Sheet ID
4. Deploy as Web App (Execute as: Me, Access: Anyone)
5. Copy the Web App URL
6. In Admin Panel → Settings → Paste URL
7. Also update `CRAVELAB_DATA.SHEETS_URL` in `js/data.js`

---

## 💾 Data Storage

| Data Type | Storage |
|-----------|---------|
| Cart items | `localStorage: cravelab_cart` |
| Orders | `localStorage: cravelab_orders` + REST API `tables/orders` |
| User auth | `localStorage: cravelab_user` |
| Wishlist | `localStorage: cravelab_wishlist` |
| Reviews | `localStorage: cravelab_reviews` |
| Bake bookings | `localStorage: cravelab_bake_bookings` |
| Mood history | `localStorage: cravelab_mood_history` |
| Google Sheets | All order + contact data via Apps Script |

### REST API Tables
- `tables/orders` – Order records with full details
- `tables/bake_sessions` – Baking session bookings

---

## 🧩 Product Categories & Count

| Category | Products |
|----------|----------|
| 🎂 Cakes | 18 |
| 🍰 Pastries | 7 |
| 🍩 Donuts | 5 |
| 🥐 Croissants | 4 |
| 🍫 Brownies | 5 |
| 🍨 Other Desserts | 5 |
| **Total** | **44** |

---

## 🔑 Admin Credentials

| Field | Value |
|-------|-------|
| URL | `/admin.html` |
| Username | `admin` |
| Password | `cravelab2025` |

> ⚠️ Change these in Admin → Settings before going live!

---

## 📱 Responsive Breakpoints

- Desktop: 1280px+ (full layout)
- Tablet: 768px–1024px (2-column)
- Mobile: <768px (single column, hamburger nav)

---

## 🎯 Features Implemented

- [x] Multi-page responsive website
- [x] Full product catalog with 44+ items
- [x] Cart with localStorage persistence
- [x] Login/Register/Guest checkout modal
- [x] Flavor Profile Meter + Texture Map (Radar Chart)
- [x] MoodMuse AI recommender (10 moods)
- [x] CraveWise calorie calculator
- [x] BakeYourOwnCake 5-step wizard
- [x] Product details modal with ingredients & allergens
- [x] Customer reviews & ratings system
- [x] Admin panel with Google Sheets sync
- [x] Checkout with multiple payment options
- [x] Promo code system
- [x] My Account (orders, wishlist, bake sessions, profile)
- [x] FAQ page (integrated in Contact)
- [x] Newsletter subscription
- [x] Toast notifications
- [x] Search overlay
- [x] Wishlist
- [x] Contact form
- [x] Google Apps Script backend

## 🔮 Recommended Next Steps

- [ ] Integrate real payment gateway (Razorpay/PayU/Stripe)
- [ ] Add product images from CDN or upload
- [ ] Implement real OTP-based phone login
- [ ] Add push notifications for order updates
- [ ] Integrate real AI API (Gemini/GPT) for MoodMuse
- [ ] Deploy on custom domain www.cravelab.in
- [ ] Add Google Analytics tracking
- [ ] Implement SEO meta tags for all pages

---

## 📞 Business Info

- **Brand**: CraveLab
- **Domain**: www.cravelab.in
- **Email**: hello@cravelab.in
- **Phone**: +91 98765 43210
- **Location**: Vijayawada, Andhra Pradesh, India
