// =========================================
// CraveLab - Product Data & Configuration
// =========================================

const CRAVELAB_DATA = {

  // Google Sheets Web App URL
  // REPLACE THIS with your deployed Google Apps Script Web App URL
  SHEETS_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',

  categories: [
    { id: 'cakes', name: 'Cakes', emoji: '🎂' },
    { id: 'pastries', name: 'Pastries', emoji: '🍰' },
    { id: 'donuts', name: 'Donuts', emoji: '🍩' },
    { id: 'croissants', name: 'Croissants & Puffs', emoji: '🥐' },
    { id: 'brownies', name: 'Brownies', emoji: '🍫' },
    { id: 'desserts', name: 'Other Desserts', emoji: '🍨' },
  ],

  products: [
    // ---- CAKES ----
    { id: 'c1', category: 'cakes', name: 'Chocolate Truffle Cake', emoji: '🎂', desc: 'Rich dark chocolate truffle with silky ganache layers. A chocoholic\'s dream come true.', prices: { '250g': 250, '500g': 450, '1kg': 900 }, nutrition: { '250g': { protein: 12.5, carbs: 112.5, fats: 50 }, '500g': { protein: 25, carbs: 225, fats: 100 }, '1kg': { protein: 50, carbs: 450, fats: 200 } }, defaultSize: '250g', ingredients: ['Flour', 'Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Cream', 'Cocoa Powder'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.9, reviews: 128, badge: 'Bestseller', eggless: false, popular: true, image: 'chocolate-truffle-cake.png' },
    { id: 'c2', category: 'cakes', name: 'Black Forest Cake', emoji: '🎂', desc: 'Classic German Black Forest with layers of chocolate sponge, whipped cream and cherries.', prices: { '250g': 230, '500g': 420, '1kg': 850 }, nutrition: { '250g': { protein: 10, carbs: 100, fats: 37.5 }, '500g': { protein: 20, carbs: 200, fats: 75 }, '1kg': { protein: 40, carbs: 400, fats: 150 } }, defaultSize: '250g', ingredients: ['Flour', 'Chocolate', 'Cherries', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews: 95, badge: null, eggless: false, popular: true, image: 'black-forest-cake.png' },
    { id: 'c3', category: 'cakes', name: 'White Forest Cake', emoji: '🍰', desc: 'Delicate white chocolate with fluffy cream layers and sweet strawberry filling.', prices: { '250g': 240, '500g': 440, '1kg': 880 }, nutrition: { '250g': { protein: 10, carbs: 105, fats: 40 }, '500g': { protein: 20, carbs: 210, fats: 80 }, '1kg': { protein: 40, carbs: 420, fats: 160 } }, defaultSize: '250g', ingredients: ['Flour', 'White Chocolate', 'Strawberries', 'Cream', 'Sugar'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.7, badge: null, eggless: false, popular: false, image: 'white-forest-cake.png' },
    { id: 'c4', category: 'cakes', name: 'Pineapple Cake', emoji: '🍍', desc: 'Fresh pineapple chunks layered between soft vanilla sponge with whipped cream.', prices: { '250g': 220, '500g': 400, '1kg': 800 }, nutrition: { '250g': { protein: 7.5, carbs: 95, fats: 35 }, '500g': { protein: 15, carbs: 190, fats: 70 }, '1kg': { protein: 30, carbs: 380, fats: 140 } }, defaultSize: '250g', ingredients: ['Flour', 'Pineapple', 'Cream', 'Sugar', 'Butter', 'Vanilla'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.6, reviews: 67, badge: null, eggless: true, popular: false, image: 'pineapple-cake.png' },
    { id: 'c5', category: 'cakes', name: 'Butterscotch Cake', emoji: '🎂', desc: 'Sweet butterscotch flavored cake with crunchy praline bits and butterscotch sauce drizzle.', prices: { '250g': 230, '500g': 420, '1kg': 850 }, nutrition: { '250g': { protein: 10, carbs: 105, fats: 45 }, '500g': { protein: 20, carbs: 210, fats: 90 }, '1kg': { protein: 40, carbs: 420, fats: 180 } }, defaultSize: '250g', ingredients: ['Flour', 'Butterscotch', 'Caramel', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs', 'Nuts'], rating: 4.7, reviews: 84, badge: null, eggless: false, popular: false, image: 'butterscotch-cake.png' },
    { id: 'c6', category: 'cakes', name: 'Red Velvet Cake', emoji: '❤️', desc: 'Velvety red cake with cream cheese frosting — elegant, rich, and absolutely irresistible.', prices: { '250g': 350, '500g': 700, '1kg': 1400 }, nutrition: { '250g': { protein: 12.5, carbs: 112.5, fats: 55 }, '500g': { protein: 25, carbs: 225, fats: 110 }, '1kg': { protein: 50, carbs: 450, fats: 220 } }, defaultSize: '250g', ingredients: ['Flour', 'Cocoa', 'Red Food Coloring', 'Cream Cheese', 'Butter', 'Buttermilk'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.9, reviews: 72, badge: 'Trending', eggless: false, popular: true, image: 'red-velvet-cake.png' },
    { id: 'c7', category: 'cakes', name: 'Coffee / Mocha Cake', emoji: '☕', desc: 'Espresso-infused layers with mocha cream — the perfect pick-me-up dessert.', prices: { '250g': 320, '500g': 650, '1kg': 1300 }, nutrition: { '250g': { protein: 12.5, carbs: 110, fats: 50 }, '500g': { protein: 25, carbs: 220, fats: 100 }, '1kg': { protein: 50, carbs: 440, fats: 200 } }, defaultSize: '250g', ingredients: ['Flour', 'Espresso', 'Cocoa', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews:56, badge: null, eggless: false, popular: false, image: 'coffee-mocha-cake.png' },
    { id: 'c8', category: 'cakes', name: 'Caramel Crunch Cake', emoji: '🍮', desc: 'Layers of caramel-soaked sponge with crispy caramel crunch and salted caramel drizzle.', prices: { '250g': 330, '500g': 680, '1kg': 1350 }, nutrition: { '250g': { protein: 12.5, carbs: 120, fats: 60 }, '500g': { protein: 25, carbs: 240, fats: 120 }, '1kg': { protein: 50, carbs: 480, fats: 240 } }, defaultSize: '250g', ingredients: ['Flour', 'Caramel', 'Sugar', 'Butter', 'Cream', 'Salt'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.7, reviews:48, badge: null, eggless: false, popular: false, image: 'caramel-crunch-cake.png' },
    { id: 'c9', category: 'cakes', name: 'Chocolate Almond Cake', emoji: '🍫', desc: 'Dark chocolate cake studded with toasted almonds and almond praline cream layers.', prices: { '250g': 340, '500g': 700, '1kg': 1400 }, nutrition: { '250g': { protein: 17.5, carbs: 112.5, fats: 65 }, '500g': { protein: 35, carbs: 225, fats: 130 }, '1kg': { protein: 70, carbs: 450, fats: 260 } }, defaultSize: '250g', ingredients: ['Flour', 'Dark Chocolate', 'Almonds', 'Cream', 'Butter', 'Sugar'], allergens: ['Gluten', 'Dairy', 'Eggs', 'Tree Nuts'], rating: 4.8, reviews: 61, badge: null, eggless: false, popular: false, image: 'chocolate-almond-cake.png' },
    { id: 'c11', category: 'cakes', name: 'Chocolate Mud Cake', emoji: '🍫', desc: 'Dense, fudgy chocolate mud cake — intensely chocolatey with a moist, gooey center.', prices: { '250g': 380, '500g': 780, '1kg': 1550 }, nutrition: { '250g': { protein: 15, carbs: 120, fats: 62.5 }, '500g': { protein: 30, carbs: 240, fats: 125 }, '1kg': { protein: 60, carbs: 480, fats: 250 } }, defaultSize: '250g', ingredients: ['Flour', 'Dark Chocolate', 'Butter', 'Cocoa', 'Coffee', 'Eggs', 'Cream'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.9, reviews:91, badge: 'Must Try', eggless: false, popular: true, image: 'chocolate-mud-cake.png' },
    { id: 'c12', category: 'cakes', name: 'Dutch Chocolate Cake', emoji: '🍫', desc: 'Dutch-processed cocoa gives this cake an extra deep, smooth chocolate flavor.', prices: { '250g': 400, '500g': 800, '1kg': 1600 }, nutrition: { '250g': { protein: 15, carbs: 117.5, fats: 60 }, '500g': { protein: 30, carbs: 235, fats: 120 }, '1kg': { protein: 60, carbs: 470, fats: 240 } }, defaultSize: '250g', ingredients: ['Flour', 'Dutch Cocoa', 'Butter', 'Cream', 'Sugar', 'Eggs'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews: 77, badge: 'Premium', eggless: false, popular: true, image: 'dutch-chocolate-cake.png' },
    { id: 'c13', category: 'cakes', name: 'KitKat Cake', emoji: '🍫', desc: 'Surrounded by KitKat fingers, filled with chocolate cream — a crunchy showstopper.', prices: { '250g': 450, '500g': 900, '1kg': 1800 }, nutrition: { '250g': { protein: 12.5, carbs: 125, fats: 65 }, '500g': { protein: 25, carbs: 250, fats: 130 }, '1kg': { protein: 50, carbs: 500, fats: 260 } }, defaultSize: '250g', ingredients: ['Flour', 'KitKat', 'Chocolate', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs', 'Nuts'], rating: 4.9, reviews: 155, badge: 'Fan Fave', eggless: false, popular: true, image: 'kitkat-cake.png' },
    { id: 'c14', category: 'cakes', name: 'Oreo Cake', emoji: '🍪', desc: 'Crushed Oreo cookies throughout the batter with Oreo cream cheese frosting on top.', prices: { '250g': 400, '500g': 800, '1kg': 1600 }, nutrition: { '250g': { protein: 12.5, carbs: 122.5, fats: 62.5 }, '500g': { protein: 25, carbs: 245, fats: 125 }, '1kg': { protein: 50, carbs: 490, fats: 250 } }, defaultSize: '250g', ingredients: ['Flour', 'Oreo Cookies', 'Cream Cheese', 'Butter', 'Sugar'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.9, reviews: 183, badge: 'Bestseller', eggless: false, popular: true, image: 'oreo-cake.png' },
    { id: 'c15', category: 'cakes', name: 'Nutella Cake', emoji: '🍫', desc: 'Swirled with layers of Nutella hazelnut spread — indulgent and perfectly nutty.', prices: { '250g': 480, '500g': 950, '1kg': 1900 }, nutrition: { '250g': { protein: 15, carbs: 125, fats: 75 }, '500g': { protein: 30, carbs: 250, fats: 150 }, '1kg': { protein: 60, carbs: 500, fats: 300 } }, defaultSize: '250g', ingredients: ['Flour', 'Nutella', 'Hazelnut', 'Chocolate', 'Cream', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs', 'Tree Nuts'], rating: 4.9, reviews: 212, badge: 'Premium', eggless: false, popular: true, image: 'nutella-cake.png' },
    { id: 'c16', category: 'cakes', name: 'Ferrero Rocher Cake', emoji: '🎁', desc: 'Topped with whole Ferrero Rocher chocolates — the ultimate luxury dessert cake.', prices: { '250g': 500, '500g': 1000, '1kg': 2000 }, nutrition: { '250g': { protein: 15, carbs: 120, fats: 70 }, '500g': { protein: 30, carbs: 240, fats: 140 }, '1kg': { protein: 60, carbs: 480, fats: 280 } }, defaultSize: '250g', ingredients: ['Flour', 'Ferrero Rocher', 'Chocolate', 'Hazelnut', 'Cream', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs', 'Tree Nuts'], rating: 5.0, reviews: 98, badge: 'Luxury', eggless: false, popular: true, image: 'ferrero-rocher-cake.png' },
    { id: 'c17', category: 'cakes', name: 'Rasmalai Cake', emoji: '🍮', desc: 'Indian fusion — saffron & cardamom sponge with malai cream and rasmalai pieces.', prices: { '250g': 450, '500g': 900, '1kg': 1800 }, nutrition: { '250g': { protein: 15, carbs: 105, fats: 45 }, '500g': { protein: 30, carbs: 210, fats: 90 }, '1kg': { protein: 60, carbs: 420, fats: 180 } }, defaultSize: '250g', ingredients: ['Flour', 'Milk', 'Saffron', 'Cardamom', 'Cream', 'Rasmalai', 'Sugar'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews: 74, badge: 'Fusion', eggless: true, popular: true, image: 'rasmalai-cake.png' },
    { id: 'c18', category: 'cakes', name: 'Fruit Cake', emoji: '🍰', desc: 'Traditional fruit cake loaded with candied fruits, nuts, and a touch of spice.', prices: { '250g' : 350, '500g': 650, '1kg': 1250}, nutrition: { '250g': { protein: 10, carbs: 125, fats: 37.5 }, '500g': { protein: 20, carbs: 250, fats: 75 }, '1kg': { protein: 40, carbs: 500, fats: 150 } }, defaultSize: '250g', ingredients: ['Flour', 'Mixed Fruits', 'Nuts', 'Spices', 'Butter', 'Sugar'], allergens: ['Gluten', 'Dairy', 'Eggs', 'Tree Nuts'], rating: 4.5, reviews: 34, badge: null, eggless: false, popular: false, image: 'fruit-cake.png' },
    { id: 'c19', category: 'cakes', name: 'Fondant Designer Cake', emoji: '🎨', desc: 'Premium fondant cake with designer details.', prices: { '1kg': 2200 }, defaultSize: '1kg', ingredients: ['Flour', 'Fondant', 'Cream', 'Sugar'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.9, badge: 'Designer', eggless: false, popular: true, image: 'cakes/fondant-designer-cake.png' },
    { id: 'c21', category: 'cakes', name: 'Theme Cake', emoji: '🎢', desc: 'Cake with theme-based decoration and carvings.', prices: { '1kg': 2500 }, nutrition: { '1kg': { protein: 55, carbs: 500, fats: 280 } }, defaultSize: '1kg', ingredients: ['Flour', 'Cream', 'Sugar', 'Fondant'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews: 29, badge: 'Special', eggless: false, popular: true, image: 'cakes/theme-cake.png' },
    { id: 'c22', category: 'cakes', name: 'Tier Cake', emoji: '🎂', desc: 'Multi-tier cake for weddings and grand events.', prices: { '1kg': 3500 }, nutrition: { '1kg': { protein: 60, carbs: 560, fats: 320 } }, defaultSize: '1kg', ingredients: ['Flour', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 5.0, reviews: 18, badge: 'Premium', eggless: false, popular: true, image: 'cakes/tier-cake.png' },

    // ---- PASTRIES ----
    { id: 'p1', category: 'pastries', name: 'Chocolate Pastry', emoji: '🍰', desc: 'Moist chocolate sponge with chocolate ganache and decorative chocolate shavings.', prices: { 'Per Piece': 90 }, nutrition: { 'Per Piece': { protein: 5, carbs: 45, fats: 20 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Chocolate', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews: 67, badge: null, eggless: false, popular: true, image: 'chocolate-pastry.png' },
    { id: 'p2', category: 'pastries', name: 'Black Forest Pastry', emoji: '🍰', desc: 'Miniature Black Forest delight with cherry topping and chocolate curl garnish.', prices: { 'Per Piece': 80 }, nutrition: { 'Per Piece': { protein: 4, carbs: 40, fats: 15 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Chocolate', 'Cherries', 'Cream', 'Sugar'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.7, reviews: 42, badge: null, eggless: false, popular: false, image: 'black-forest-pastry.png' },
    { id: 'p3', category: 'pastries', name: 'Butterscotch Pastry', emoji: '🍰', desc: 'Soft butterscotch sponge with butterscotch cream and crunchy praline crumbles.', prices: { 'Per Piece': 85 }, nutrition: { 'Per Piece': { protein: 4, carbs: 42, fats: 18 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Butterscotch', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.6, reviews: 38, badge: null, eggless: false, popular: false, image: 'butterscotch-pastry.png' },
    { id: 'p4', category: 'pastries', name: 'Red Velvet Pastry', emoji: '❤️', desc: 'Individual serving of our famous red velvet with cream cheese frosting and red crumbles.', prices: { 'Per Piece': 130 }, nutrition: { 'Per Piece': { protein: 5, carbs: 45, fats: 22 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Cocoa', 'Cream Cheese', 'Red Coloring', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.9, reviews: 91, badge: 'Popular', eggless: false, popular: true, image: 'red-velvet-pastry.png' },
    { id: 'p5', category: 'pastries', name: 'Ferrero Rocher Pastry', emoji: '🎁', desc: 'Luxury pastry topped with a whole Ferrero Rocher chocolate and hazelnut cream.', prices: { 'Per Piece': 150 }, nutrition: { 'Per Piece': { protein: 6, carbs: 48, fats: 26 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Ferrero Rocher', 'Hazelnut Cream', 'Chocolate'], allergens: ['Gluten', 'Dairy', 'Eggs', 'Tree Nuts'], rating: 5.0, reviews: 44, badge: 'Premium', eggless: false, popular: true, image: 'ferrero-rocher-pastry.png' },
    { id: 'p6', category: 'pastries', name: 'Fresh Fruit Pastry', emoji: '🍓', desc: 'Light vanilla sponge topped with fresh seasonal fruits and glaze.', prices: { 'Per Piece': 120 }, nutrition: { 'Per Piece': { protein: 3, carbs: 38, fats: 14 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Fresh Fruits', 'Cream', 'Vanilla', 'Sugar'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.7, reviews: 55, badge: null, eggless: true, popular: false, image: 'fresh-fruit-pastry.png' },
    { id: 'p7', category: 'pastries', name: 'Rainbow Pastry', emoji: '🌈', desc: 'Six colorful sponge layers — a visual delight and vanilla-flavored treat.', prices: { 'Per Piece': 140 }, nutrition: { 'Per Piece': { protein: 4, carbs: 46, fats: 18 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Food Colors', 'Cream', 'Vanilla', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews: 63, badge: 'Instagram Hit', eggless: true, popular: true, image: 'rainbow-pastry.png' },
    { id: 'p8', category: 'pastries', name: 'Pineapple Pastry', emoji: '🍍', desc: 'Pineapple-flavoured pastry with tropical notes.', prices: { 'Per Piece': 80 }, nutrition: { 'Per Piece': { protein: 3, carbs: 38, fats: 14 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Pineapple', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.6, reviews: 42, badge: null, eggless: false, popular: false, image: 'pineapple-pastry.png' },
    { id: 'p9', category: 'pastries', name: 'Vanilla Cream Pastry', emoji: '🍆', desc: 'Soft pastry filled with smooth vanilla cream.', prices: { 'Per Piece': 75 }, nutrition: { 'Per Piece': { protein: 4, carbs: 40, fats: 16 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Vanilla', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.5, reviews: 38, badge: null, eggless: false, popular: false, image: 'vanilla-cream-pastry.png' },
    { id: 'p10', category: 'pastries', name: 'Strawberry Pastry', emoji: '🍓', desc: 'Bright strawberry pastry with fresh jam and cream.', prices: { 'Per Piece': 100 }, nutrition: { 'Per Piece': { protein: 4, carbs: 42, fats: 16 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Strawberries', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.7, reviews: 48, badge: null, eggless: false, popular: false, image: 'strawberry-pastry.png' },
    { id: 'p11', category: 'pastries', name: 'Blueberry Pastry', emoji: '🋶', desc: 'Tart blueberry pastry with juicy berry filling.', prices: { 'Per Piece': 130 }, nutrition: { 'Per Piece': { protein: 4, carbs: 43, fats: 17 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Blueberries', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.6, reviews: 44, badge: null, eggless: false, popular: false, image: 'blueberry-pastry.png' },
    { id: 'p12', category: 'pastries', name: 'Coffee / Mocha Pastry', emoji: '☕', desc: 'Mocha-infused pastry with coffee cream.', prices: { 'Per Piece': 110 }, nutrition: { 'Per Piece': { protein: 5, carbs: 44, fats: 20 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Coffee', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews: 58, badge: null, eggless: false, popular: true, image: 'coffee-pastry.png' },
    { id: 'p13', category: 'pastries', name: 'Choco Crunch Pastry', emoji: '🍫', desc: 'Crunchy topped chocolate pastry with cocoa glaze.', prices: { 'Per Piece': 120 }, nutrition: { 'Per Piece': { protein: 5, carbs: 48, fats: 22 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Chocolate', 'Crunchies', 'Cream', 'Sugar', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.9, reviews: 67, badge: 'Crunchy', eggless: false, popular: true, image: 'choco-crunch-pastry.png' },
    // ---- DONUTS ----
    { id: 'd1', category: 'donuts', name: 'Classic Donut', emoji: '🍩', desc: 'Soft classic donut with sugar glaze.', prices: { 'Per Piece': 60 }, nutrition: { 'Per Piece': { protein: 4, carbs: 32, fats: 12 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Sugar', 'Yeast', 'Butter', 'Egg', 'Milk'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.5, reviews: 88, badge: null, eggless: false, popular: false, image: 'classic-donut.png' },
    { id: 'd2', category: 'donuts', name: 'Sugar Glazed Donut', emoji: '🍩', desc: 'Sweet sugar coated donut for everyday cravings.', prices: { 'Per Piece': 70 }, nutrition: { 'Per Piece': { protein: 4, carbs: 34, fats: 12 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Sugar', 'Yeast', 'Butter', 'Egg', 'Milk'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.4, reviews: 65, badge: null, eggless: false, popular: false, image: 'sugar-glazed-donut.png' },
    { id: 'd3', category: 'donuts', name: 'Chocolate Glazed Donut', emoji: '🍫', desc: 'Fluffy donut dipped in rich chocolate glaze.', prices: { 'Per Piece': 90 }, nutrition: { 'Per Piece': { protein: 5, carbs: 36, fats: 16 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Chocolate', 'Sugar', 'Yeast', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.7, reviews: 112, badge: 'Popular', eggless: false, popular: true, image: 'chocolate-glazed-donut.png' },
    { id: 'd4', category: 'donuts', name: 'Strawberry Glazed Donut', emoji: '🍓', desc: 'Bright strawberry glaze topping for freshness.', prices: { 'Per Piece': 90 }, nutrition: { 'Per Piece': { protein: 4, carbs: 36, fats: 15 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Strawberry', 'Sugar', 'Yeast', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.6, reviews: 58, badge: null, eggless: false, popular: false, image: 'strawberry-glazed-donut.png' },
    { id: 'd5', category: 'donuts', name: 'Caramel Glazed Donut', emoji: '🍮', desc: 'Caramel drizzle on soft, golden donut.', prices: { 'Per Piece': 95 }, nutrition: { 'Per Piece': { protein: 4, carbs: 38, fats: 16 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Caramel', 'Butter', 'Sugar', 'Yeast'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.6, reviews: 54, badge: null, eggless: false, popular: false, image: 'caramel-glazed-donut.png' },
    { id: 'd6', category: 'donuts', name: 'Vanilla Cream Donut', emoji: '🍆', desc: 'Filled with vanilla cream and sprinkled on top.', prices: { 'Per Piece': 100 }, nutrition: { 'Per Piece': { protein: 5, carbs: 40, fats: 18 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Vanilla', 'Cream', 'Sugar', 'Yeast', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.7, reviews: 63, badge: null, eggless: false, popular: true, image: 'vanilla-cream-donut.png' },
    { id: 'd7', category: 'donuts', name: 'Chocolate Cream Filled Donut', emoji: '🍫', desc: 'Rich chocolate cream stuffed donut.', prices: { 'Per Piece': 120 }, nutrition: { 'Per Piece': { protein: 6, carbs: 42, fats: 20 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Chocolate', 'Cream', 'Sugar', 'Yeast', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews: 74, badge: null, eggless: false, popular: true, image: 'chocolate-cream-filled-donut.png' },
    { id: 'd8', category: 'donuts', name: 'Custard Filled Donut', emoji: '🍮', desc: 'Creamy vanilla custard core donut.', prices: { 'Per Piece': 110 }, nutrition: { 'Per Piece': { protein: 5, carbs: 40, fats: 18 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Custard', 'Milk', 'Sugar', 'Yeast'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.7, reviews: 67, badge: null, eggless: false, popular: false, image: 'custard-filling-donut.png' },
    { id: 'd9', category: 'donuts', name: 'Strawberry Filled Donut', emoji: '🍓', desc: 'Filled with fresh strawberry compote.', prices: { 'Per Piece': 120 }, nutrition: { 'Per Piece': { protein: 5, carbs: 42, fats: 19 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Strawberry Jam', 'Cream', 'Sugar', 'Yeast'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews: 82, badge: null, eggless: false, popular: true, image: 'strawberry-filled-donut.png' },
    { id: 'd10', category: 'donuts', name: 'Blueberry Filled Donut', emoji: '🋶', desc: 'Bursting with blueberry filling in each bite.', prices: { 'Per Piece': 130 }, nutrition: { 'Per Piece': { protein: 5, carbs: 44, fats: 19 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Blueberries', 'Cream', 'Sugar', 'Yeast'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.7, reviews: 69, badge: null, eggless: false, popular: false, image: 'blueberry-filled-donut.png' },
    { id: 'd11', category: 'donuts', name: 'Nutella Filled Donut', emoji: '🍫', desc: 'Pillowy soft donut generously filled with Nutella hazelnut cream inside.', prices: { 'Per Piece': 150 }, nutrition: { 'Per Piece': { protein: 6, carbs: 46, fats: 22 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Nutella', 'Hazelnut', 'Sugar', 'Yeast', 'Butter'], allergens: ['Gluten', 'Dairy', 'Eggs', 'Tree Nuts'], rating: 4.9, reviews: 143, badge: 'Bestseller', eggless: false, popular: true, image: 'nutella-filled-donut.png' },

    // ---- CROISSANTS ----
    { id: 'cr1', category: 'croissants', name: 'Butter Croissant', emoji: '🥐', desc: 'Flaky, buttery classic French croissant — perfectly laminated and golden baked.', prices: { 'Per Piece': 80 }, nutrition: { 'Per Piece': { protein: 5, carbs: 28, fats: 18 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Butter', 'Yeast', 'Milk', 'Sugar', 'Salt'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.7, reviews: 98, badge: null, eggless: false, popular: true, image: 'butter-crossiant.png' },
    { id: 'cr2', category: 'croissants', name: 'Chocolate Croissant', emoji: '🍫', desc: 'Pain au chocolat — buttery croissant dough rolled around dark chocolate batons.', prices: { 'Per Piece': 120 }, nutrition: { 'Per Piece': { protein: 6, carbs: 32, fats: 20 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Dark Chocolate', 'Butter', 'Yeast', 'Milk', 'Sugar'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews: 121, badge: 'Trending', eggless: false, popular: true, image: 'chocolate-crossiant.png' },
    { id: 'cr3', category: 'croissants', name: 'Cheese Croissant', emoji: '🧀', desc: 'Savory croissant filled with melted cheese — perfect for a snack or light meal.', prices: { 'Per Piece': 130 }, nutrition: { 'Per Piece': { protein: 7, carbs: 30, fats: 22 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Cheese', 'Butter', 'Yeast', 'Milk', 'Salt'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.6, reviews: 67, badge: null, eggless: false, popular: false, image: 'cheese-crossiant.png' },
    { id: 'cr4', category: 'croissants', name: 'Almond Croissant', emoji: '🌰', desc: 'Twice-baked croissant filled with almond frangipane and topped with flaked almonds.', prices: { 'Per Piece': 150 }, nutrition: { 'Per Piece': { protein: 7, carbs: 32, fats: 24 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Almonds', 'Almond Paste', 'Butter', 'Yeast', 'Sugar'], allergens: ['Gluten', 'Dairy', 'Eggs', 'Tree Nuts'], rating: 4.9, reviews: 84, badge: 'Specialty', eggless: false, popular: true, image: 'almond-crossiant.png' },

    // ---- BROWNIES ----
    { id: 'b1', category: 'brownies', name: 'Chocolate Fudge Brownie', emoji: '🍫', desc: 'Dense, fudgy classic brownie with a crinkly top and gooey center — the original.', prices: { 'Per Piece': 100 }, nutrition: { 'Per Piece': { protein: 6, carbs: 44, fats: 24 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Dark Chocolate', 'Butter', 'Sugar', 'Eggs', 'Cocoa'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews: 167, badge: 'Classic', eggless: false, popular: true, image: 'chocolate-fudge-brownie.png' },
    { id: 'b2', category: 'brownies', name: 'Walnut Brownie', emoji: '🌰', desc: 'Classic fudge brownie loaded with crunchy walnut pieces throughout.', prices: { 'Per Piece': 130 }, nutrition: { 'Per Piece': { protein: 7, carbs: 46, fats: 27 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Chocolate', 'Walnuts', 'Butter', 'Sugar', 'Eggs'], allergens: ['Gluten', 'Dairy', 'Eggs', 'Tree Nuts'], rating: 4.7, reviews: 94, badge: null, eggless: false, popular: true, image: 'walnut-brownie.png' },
    { id: 'b3', category: 'brownies', name: 'Oreo Brownie', emoji: '🍪', desc: 'Fudge brownie with crushed Oreo cookies baked in and Oreo pieces on top.', prices: { 'Per Piece': 140 }, nutrition: { 'Per Piece': { protein: 6, carbs: 48, fats: 25 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Chocolate', 'Oreo', 'Butter', 'Sugar', 'Eggs'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.9, reviews: 134, badge: 'Fan Fave', eggless: false, popular: true, image: 'oreo-brownie.png' },
    { id: 'b4', category: 'brownies', name: 'Caramel Brownie', emoji: '🍮', desc: 'Swirled with salted caramel — the perfect balance of sweet, salty, and chocolatey.', prices: { 'Per Piece': 140 }, nutrition: { 'Per Piece': { protein: 6, carbs: 49, fats: 26 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Chocolate', 'Caramel', 'Sea Salt', 'Butter', 'Sugar'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.8, reviews: 89, badge: null, eggless: false, popular: false, image: 'caramel-brownie.png' },
    { id: 'b5', category: 'brownies', name: 'Chocolate Almond Brownie', emoji: '🍫', desc: 'Fudgy brownie loaded with crushed almonds and chocolate chips.', prices: { 'Per Piece': 150 }, nutrition: { 'Per Piece': { protein: 7, carbs: 50, fats: 28 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Chocolate', 'Almonds', 'Butter', 'Sugar', 'Eggs'], allergens: ['Gluten', 'Dairy', 'Eggs', 'Tree Nuts'], rating: 4.9, reviews: 80, badge: null, eggless: false, popular: true, image: 'chocolate-almond-brownie.png' },
    { id: 'b6', category: 'brownies', name: 'Lava / Melting Brownie', emoji: '🌋', desc: 'Warm brownie with a molten chocolate center that flows when you cut into it.', prices: { 'Per Piece': 180 }, nutrition: { 'Per Piece': { protein: 6, carbs: 52, fats: 30 } }, defaultSize: 'Per Piece', ingredients: ['Flour', 'Dark Chocolate', 'Butter', 'Sugar', 'Eggs', 'Cream'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 5.0, reviews: 201, badge: 'Must Try', eggless: false, popular: true, image: 'lava-melting-brownie.png' },

    // ---- OTHER DESSERTS ----
    { id: 'ds1', category: 'desserts', name: 'Dessert Platter', emoji: '🍴', desc: 'A curated assortment of mini desserts — perfect for sharing at parties and events.', prices: { 'Per Platter': 790 }, nutrition: { 'Per Platter': { protein: 18, carbs: 105, fats: 48 } }, defaultSize: 'Per Platter', ingredients: ['Various Desserts', 'Seasonal Fruits', 'Cream', 'Chocolate'], allergens: ['Gluten', 'Dairy', 'Eggs', 'Nuts'], rating: 4.9, reviews: 55, badge: 'Party Pick', eggless: false, popular: true, image: 'dessert-platter.png' },
    { id: 'ds2', category: 'desserts', name: 'Belgian Waffles', emoji: '🪇', desc: 'Crispy outside, fluffy inside — served with cream, fresh berries, and maple syrup.', prices: { 'Per Serving': 180 }, nutrition: { 'Per Serving': { protein: 8, carbs: 52, fats: 28 } }, defaultSize: 'Per Serving', ingredients: ['Flour', 'Eggs', 'Butter', 'Milk', 'Vanilla', 'Berries', 'Cream'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.7, reviews: 88, badge: null, eggless: false, popular: true, image: 'waffles.png' },
    { id: 'ds3', category: 'desserts', name: 'Brownie with Ice Cream', emoji: '🍨', desc: 'Warm fudge brownie served with a scoop of vanilla ice cream and chocolate sauce.', prices: { 'Per Serving': 220 }, nutrition: { 'Per Serving': { protein: 8, carbs: 60, fats: 34 } }, defaultSize: 'Per Serving', ingredients: ['Brownie', 'Vanilla Ice Cream', 'Chocolate Sauce', 'Cream'], allergens: ['Gluten', 'Dairy', 'Eggs'], rating: 4.9, reviews: 177, badge: 'Combo Deal', eggless: false, popular: true, image: 'brownie-with-icecream.png' },
    { id: 'ds4', category: 'desserts', name: 'Chocolate Mousse', emoji: '🍮', desc: 'Airy, silky chocolate mousse in a glass — elegant and light yet deeply chocolatey.', prices: { 'Per Cup': 150 }, nutrition: { 'Per Cup': { protein: 7, carbs: 26, fats: 18 } }, defaultSize: 'Per Cup', ingredients: ['Dark Chocolate', 'Cream', 'Eggs', 'Sugar', 'Vanilla'], allergens: ['Dairy', 'Eggs'], rating: 4.8, reviews: 64, badge: null, eggless: false, popular: false, image: 'chocolate-mousse.png' },
  ],

  calorieData: {
    'Chocolate Truffle Cake (250g)': { calories: 900 },
    'Chocolate Truffle Cake (500g)': { calories: 1800 },
    'Chocolate Truffle Cake (1kg)': { calories: 3600 },
    'Black Forest Cake (250g)': { calories: 750 },
    'Black Forest Cake (500g)': { calories: 1500 },
    'Black Forest Cake (1kg)': { calories: 3000 },
    'White Forest Cake (250g)': { calories: 700 },
    'White Forest Cake (500g)': { calories: 1400 },
    'White Forest Cake (1kg)': { calories: 2800 },
    'Pineapple Cake (250g)': { calories: 650 },
    'Pineapple Cake (500g)': { calories: 1300 },
    'Pineapple Cake (1kg)': { calories: 2600 },
    'Butterscotch Cake (250g)': { calories: 800 },
    'Butterscotch Cake (500g)': { calories: 1600 },
    'Butterscotch Cake (1kg)': { calories: 3200 },
    'Red Velvet Cake (250g)': { calories: 850 },
    'Red Velvet Cake (500g)': { calories: 1700 },
    'Red Velvet Cake (1kg)': { calories: 3400 },
    'Coffee / Mocha Cake (250g)': { calories: 800 },
    'Coffee / Mocha Cake (500g)': { calories: 1600 },
    'Coffee / Mocha Cake (1kg)': { calories: 3200 },
    'Caramel Crunch Cake (250g)': { calories: 900 },
    'Caramel Crunch Cake (500g)': { calories: 1800 },
    'Caramel Crunch Cake (1kg)': { calories: 3600 },
    'Chocolate Almond Cake (250g)': { calories: 950 },
    'Chocolate Almond Cake (500g)': { calories: 1900 },
    'Chocolate Almond Cake (1kg)': { calories: 3800 },
    'Chocolate Mud Cake (250g)': { calories: 1000 },
    'Chocolate Mud Cake (500g)': { calories: 2000 },
    'Chocolate Mud Cake (1kg)': { calories: 4000 },
    'Dutch Chocolate Cake (250g)': { calories: 950 },
    'Dutch Chocolate Cake (500g)': { calories: 1900 },
    'Dutch Chocolate Cake (1kg)': { calories: 3800 },
    'KitKat Cake (250g)': { calories: 1100 },
    'KitKat Cake (500g)': { calories: 2200 },
    'KitKat Cake (1kg)': { calories: 4400 },
    'Oreo Cake (250g)': { calories: 1050 },
    'Oreo Cake (500g)': { calories: 2100 },
    'Oreo Cake (1kg)': { calories: 4200 },
    'Nutella Cake (250g)': { calories: 1100 },
    'Nutella Cake (500g)': { calories: 2200 },
    'Nutella Cake (1kg)': { calories: 4400 },
    'Ferrero Rocher Cake (250g)': { calories: 1200 },
    'Ferrero Rocher Cake (500g)': { calories: 2400 },
    'Ferrero Rocher Cake (1kg)': { calories: 4800 },
    'Rasmalai Cake (250g)': { calories: 800 },
    'Rasmalai Cake (500g)': { calories: 1600 },
    'Rasmalai Cake (1kg)': { calories: 3200 },
    'Fondant Designer Cake (1kg)': { calories: 1800 },
    'Theme Cake (1kg)': { calories: 2000 },
    'Tier Cake (1kg)': { calories: 2100 },
    'Chocolate Pastry': { calories: 250 },
    'Black Forest Pastry': { calories: 220 },
    'Butterscotch Pastry': { calories: 240 },
    'Pineapple Pastry': { calories: 200 },
    'Red Velvet Pastry': { calories: 260 },
    'Vanilla Cream Pastry': { calories: 210 },
    'Strawberry Pastry': { calories: 220 },
    'Fresh Fruit Pastry': { calories: 180 },
    'Blueberry Pastry': { calories: 220 },
    'Coffee / Mocha Pastry': { calories: 240 },
    'Rainbow Pastry': { calories: 260 },
    'Choco Crunch Pastry': { calories: 270 },
    'Ferrero Rocher Pastry': { calories: 300 },
    'Classic Donut': { calories: 220 },
    'Sugar Glazed Donut': { calories: 250 },
    'Chocolate Glazed Donut': { calories: 270 },
    'Strawberry Glazed Donut': { calories: 260 },
    'Caramel Glazed Donut': { calories: 280 },
    'Vanilla Cream Donut': { calories: 290 },
    'Chocolate Cream Filled Donut': { calories: 300 },
    'Custard Filled Donut': { calories: 280 },
    'Strawberry Filled Donut': { calories: 270 },
    'Blueberry Filled Donut': { calories: 270 },
    'Nutella Filled Donut': { calories: 320 },
    'Butter Croissant': { calories: 230 },
    'Chocolate Croissant': { calories: 270 },
    'Cheese Croissant': { calories: 300 },
    'Almond Croissant': { calories: 320 },
    'Chocolate Fudge Brownie': { calories: 280 },
    'Walnut Brownie': { calories: 320 },
    'Oreo Brownie': { calories: 300 },
    'Caramel Brownie': { calories: 310 },
    'Chocolate Almond Brownie': { calories: 330 },
    'Lava / Melting Brownie': { calories: 350 },
    'Belgian Waffles': { calories: 350 },
    'Brownie with Ice Cream': { calories: 500 },
    'Chocolate Mousse': { calories: 300 },
    'Fruit Cake (250g)': { calories: 650 },
    'Fruit Cake (500g)': { calories: 1300 },
    'Fruit Cake (1kg)': { calories: 2600 },
  },

  // CraveWise dessert recommendations by calorie range
  cravewiseRecs: {
    low: ['Fresh Fruit Pastry', 'Chocolate Mousse', 'Butter Croissant', 'Classic Glazed Donut'],
    medium: ['Belgian Waffles', 'Chocolate Pastry', 'Red Velvet Pastry', 'Chocolate Almond Cake'],
    high: ['Ferrero Rocher Cake', 'KitKat Cake', 'Nutella Cake', 'Lava Brownie', 'Dessert Platter'],
  },

  moods: [
    { id: 'happy', name: 'Happy', emoji: '😊', message: 'Bright, cheerful desserts to match your sunny mood.', recommendations: ['Red Velvet Cake', 'Strawberry Pastry', 'Chocolate Mousse'] },
    { id: 'sad', name: 'Sad', emoji: '😢', message: 'Comforting treats to brighten your day when you need it most.', recommendations: ['Chocolate Mousse', 'Hot Chocolate Cake', 'Chocolate Mud Cake'] },
    { id: 'romantic', name: 'Romantic', emoji: '💕', message: 'Sweet, indulgent treats for a dreamy date night.', recommendations: ['Chocolate Truffle Cake', 'Red Velvet Pastry', 'Chocolate Mousse'] },
    { id: 'energetic', name: 'Energetic', emoji: '⚡', message: 'Bold, exciting flavors to fuel your adventurous spirit.', recommendations: ['Rainbow Pastry', 'Caramel Crunch Cake', 'Lava / Melting Brownie'] },
    { id: 'cozy', name: 'Cozy', emoji: '🤗', message: 'Warm, comforting treats for a calm, relaxing day.', recommendations: ['Butter Croissant', 'Hot Chocolate Cake', 'Belgian Waffles'] },
    { id: 'celebratory', name: 'Celebratory', emoji: '🎉', message: 'Festive desserts made for celebrations and special moments.', recommendations: ['Ferrero Rocher Cake', 'KitKat Cake', 'Dessert Platter'] },
    { id: 'adventurous', name: 'Adventurous', emoji: '🌍', message: 'Bold and exciting flavors for your adventurous palate.', recommendations: ['Rainbow Pastry', 'Caramel Crunch Cake', 'Lava / Melting Brownie'] },
    { id: 'nostalgic', name: 'Nostalgic', emoji: '🥲', message: 'Classic desserts that feel like home and sweet memories.', recommendations: ['Black Forest Cake', 'Fruit Cake', 'Chocolate Almond Cake'] },
    { id: 'stressed', name: 'Stressed', emoji: '😌', message: 'Calming sweets to help you unwind and feel better.', recommendations: ['Chocolate Mousse', 'Chocolate Mud Cake', 'Fresh Fruit Pastry'] },
    { id: 'grateful', name: 'Grateful', emoji: '🙏', message: 'Special treats to share and express your appreciation.', recommendations: ['Ferrero Rocher Cake', 'Dessert Platter', 'Chocolate Truffle Cake'] },
  ],

  // Dessert Platter Customization Items
  plattersItems: {
    cupcakes: [
      { id: 'cup-choc', name: 'Chocolate Cupcake', price: 90 },
      { id: 'cup-van', name: 'Vanilla Cupcake', price: 80 },
      { id: 'cup-bs', name: 'Butterscotch Cupcake', price: 90 },
      { id: 'cup-straw', name: 'Strawberry Cupcake', price: 100 },
      { id: 'cup-truffle', name: 'Chocolate Truffle Cupcake', price: 110 },
      { id: 'cup-mocha', name: 'Coffee / Mocha Cupcake', price: 110 }
    ],
    macarons: [
      { id: 'mac-van', name: 'Vanilla Macaron', price: 70 },
      { id: 'mac-choc', name: 'Chocolate Macaron', price: 80 },
      { id: 'mac-straw', name: 'Strawberry Macaron', price: 80 },
      { id: 'mac-blue', name: 'Blueberry Macaron', price: 90 },
      { id: 'mac-coffee', name: 'Coffee Macaron', price: 90 },
      { id: 'mac-pist', name: 'Pistachio Macaron', price: 100 },
      { id: 'mac-caramel', name: 'Salted Caramel Macaron', price: 100 },
      { id: 'mac-rasp', name: 'Raspberry Macaron', price: 100 }
    ],
    cheesecake: [
      { id: 'cake-blue', name: 'Blueberry Cheesecake', price: 180, unit: 'per slice' },
      { id: 'cake-choc', name: 'Chocolate Cheesecake', price: 170, unit: 'per slice' },
      { id: 'cake-straw', name: 'Strawberry Cheesecake', price: 180, unit: 'per slice' },
      { id: 'cake-oreo', name: 'Oreo Cheesecake', price: 190, unit: 'per slice' }
    ],
    jars: [
      { id: 'jar-choc', name: 'Chocolate Jar', price: 120, volume: '120 ml' },
      { id: 'jar-oreo', name: 'Oreo Jar', price: 130, volume: '120 ml' },
      { id: 'jar-kitkat', name: 'KitKat Jar', price: 140, volume: '120 ml' },
      { id: 'jar-nutella', name: 'Nutella Jar', price: 150, volume: '120 ml' }
    ]
  },

  // Default Dessert Platter Contents
  plattersDefault: {
    'cup-choc': 1,
    'cup-straw': 1,
    'mac-van': 1,
    'mac-pist': 1,
    'mac-rasp': 1,
    'cake-blue': 1,
    'jar-nutella': 1
  },

  // CraveWise dessert recommendations by calorie range
  cravewiseRecs: {
    low: ['Fresh Fruit Pastry', 'Chocolate Mousse', 'Butter Croissant', 'Classic Glazed Donut'],
    medium: ['Belgian Waffles', 'Chocolate Pastry', 'Red Velvet Pastry', 'Chocolate Almond Cake'],
    high: ['Ferrero Rocher Cake', 'KitKat Cake', 'Nutella Cake', 'Lava Brownie', 'Dessert Platter'],
  },

  moods: [
    { id: 'happy', name: 'Happy', emoji: '😊', message: 'Bright, cheerful desserts to match your sunny mood.', recommendations: ['Red Velvet Cake', 'Strawberry Pastry', 'Chocolate Mousse'] },
    { id: 'sad', name: 'Sad', emoji: '😢', message: 'Comforting treats to brighten your day when you need it most.', recommendations: ['Chocolate Mousse', 'Hot Chocolate Cake', 'Chocolate Mud Cake'] },
    { id: 'romantic', name: 'Romantic', emoji: '💕', message: 'Sweet, indulgent treats for a dreamy date night.', recommendations: ['Chocolate Truffle Cake', 'Red Velvet Pastry', 'Chocolate Mousse'] },
    { id: 'energetic', name: 'Energetic', emoji: '⚡', message: 'Bold, exciting flavors to fuel your adventurous spirit.', recommendations: ['Rainbow Pastry', 'Caramel Crunch Cake', 'Lava / Melting Brownie'] },
    { id: 'cozy', name: 'Cozy', emoji: '🤗', message: 'Warm, comforting treats for a calm, relaxing day.', recommendations: ['Butter Croissant', 'Hot Chocolate Cake', 'Belgian Waffles'] },
    { id: 'celebratory', name: 'Celebratory', emoji: '🎉', message: 'Festive desserts made for celebrations and special moments.', recommendations: ['Ferrero Rocher Cake', 'KitKat Cake', 'Dessert Platter'] },
    { id: 'adventurous', name: 'Adventurous', emoji: '🌍', message: 'Bold and exciting flavors for your adventurous palate.', recommendations: ['Rainbow Pastry', 'Caramel Crunch Cake', 'Lava / Melting Brownie'] },
    { id: 'nostalgic', name: 'Nostalgic', emoji: '🥲', message: 'Classic desserts that feel like home and sweet memories.', recommendations: ['Black Forest Cake', 'Fruit Cake', 'Chocolate Almond Cake'] },
    { id: 'stressed', name: 'Stressed', emoji: '😌', message: 'Calming sweets to help you unwind and feel better.', recommendations: ['Chocolate Mousse', 'Chocolate Mud Cake', 'Fresh Fruit Pastry'] },
    { id: 'grateful', name: 'Grateful', emoji: '🙏', message: 'Special treats to share and express your appreciation.', recommendations: ['Ferrero Rocher Cake', 'Dessert Platter', 'Chocolate Truffle Cake'] },
  ],

  // Dessert Platter Customization Items
  plattersItems: {
    cupcakes: [
      { id: 'cup-choc', name: 'Chocolate Cupcake', price: 90 },
      { id: 'cup-van', name: 'Vanilla Cupcake', price: 80 },
      { id: 'cup-bs', name: 'Butterscotch Cupcake', price: 90 },
      { id: 'cup-straw', name: 'Strawberry Cupcake', price: 100 },
      { id: 'cup-truffle', name: 'Chocolate Truffle Cupcake', price: 110 },
      { id: 'cup-mocha', name: 'Coffee / Mocha Cupcake', price: 110 }
    ],
    macarons: [
      { id: 'mac-van', name: 'Vanilla Macaron', price: 70 },
      { id: 'mac-choc', name: 'Chocolate Macaron', price: 80 },
      { id: 'mac-straw', name: 'Strawberry Macaron', price: 80 },
      { id: 'mac-blue', name: 'Blueberry Macaron', price: 90 },
      { id: 'mac-coffee', name: 'Coffee Macaron', price: 90 },
      { id: 'mac-pist', name: 'Pistachio Macaron', price: 100 },
      { id: 'mac-caramel', name: 'Salted Caramel Macaron', price: 100 },
      { id: 'mac-rasp', name: 'Raspberry Macaron', price: 100 }
    ],
    cheesecake: [
      { id: 'cake-blue', name: 'Blueberry Cheesecake', price: 180, unit: 'per slice' },
      { id: 'cake-choc', name: 'Chocolate Cheesecake', price: 170, unit: 'per slice' },
      { id: 'cake-straw', name: 'Strawberry Cheesecake', price: 180, unit: 'per slice' },
      { id: 'cake-oreo', name: 'Oreo Cheesecake', price: 190, unit: 'per slice' }
    ],
    jars: [
      { id: 'jar-choc', name: 'Chocolate Jar', price: 120, volume: '120 ml' },
      { id: 'jar-oreo', name: 'Oreo Jar', price: 130, volume: '120 ml' },
      { id: 'jar-kitkat', name: 'KitKat Jar', price: 140, volume: '120 ml' },
      { id: 'jar-nutella', name: 'Nutella Jar', price: 150, volume: '120 ml' }
    ]
  },

  // Default Dessert Platter Contents
  plattersDefault: {
    'cup-choc': 1,
    'cup-straw': 1,
    'mac-van': 1,
    'mac-pist': 1,
    'mac-rasp': 1,
    'cake-blue': 1,
    'jar-nutella': 1
  }
};

// Make available globally
window.CRAVELAB_DATA = CRAVELAB_DATA;
