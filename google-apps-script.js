// =========================================
// CraveLab - Google Apps Script Code
// Copy this entire file into Google Apps Script
// (Extensions → Apps Script in Google Sheets)
// Then deploy as Web App with access: Anyone
// =========================================

// ---- CONFIGURATION ----
// Make sure your Google Sheet has these tabs/sheets:
// 1. "Orders"
// 2. "Contacts"
// 3. "BakeSessions"
// 4. "Subscribers"

const SPREADSHEET_ID = '1U73WbokFvTg1Xi4hhzA07E-FegQaKLVmIczbMmQcSRE'; // Replace with your Google Sheet ID

// Order Sheet Headers
const ORDER_HEADERS = [
  'Order ID', 'Customer Name', 'Email', 'Phone', 'Address',
  'Items', 'Subtotal', 'Delivery', 'Discount', 'Total',
  'Delivery Date', 'Time Slot', 'Payment Method',
  'Promo Code', 'Notes', 'Status', 'Timestamp'
];

// Contact Sheet Headers
const CONTACT_HEADERS = [
  'Name', 'Email', 'Phone', 'Subject', 'Message', 'Rating', 'Timestamp'
];

// Bake Session Headers
const BAKE_HEADERS = [
  'Booking ID', 'Name', 'Email', 'Phone', 'Difficulty',
  'Sessions Count', 'Location', 'Dessert', 'Experience',
  'Notes', 'Status', 'Timestamp'
];

// Subscriber Headers
const SUBSCRIBER_HEADERS = ['Email', 'Subscribed At'];

// ---- MAIN HANDLER ----
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetType = data.sheetType;

    let result;
    switch (sheetType) {
      case 'Order':
        result = saveOrder(data);
        break;
      case 'UpdateStatus':
        result = updateOrderStatus(data.orderId, data.status);
        break;
      case 'Contact':
        result = saveContact(data);
        break;
      case 'BakeSession':
        result = saveBakeSession(data);
        break;
      case 'Subscriber':
        result = saveSubscriber(data.email);
        break;
      default:
        result = { success: false, message: 'Unknown sheet type' };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const action = e.parameter.action;

  try {
    let result;
    switch (action) {
      case 'ping':
        result = { success: true, message: 'CraveLab Sheets Connected!' };
        break;
      case 'getOrders':
        result = getOrders();
        break;
      case 'getStats':
        result = getStats();
        break;
      default:
        result = { success: true, message: 'CraveLab API Running' };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ---- ORDER FUNCTIONS ----
function saveOrder(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Orders');

  // Create sheet if doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Orders');
    sheet.appendRow(ORDER_HEADERS);
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, ORDER_HEADERS.length);
    headerRange.setBackground('#F4A7B9');
    headerRange.setFontWeight('bold');
    headerRange.setFontColor('#2C2118');
    sheet.setFrozenRows(1);
  }

  const row = [
    data.orderId || '',
    data.customerName || '',
    data.email || '',
    data.phone || '',
    data.address || '',
    data.items || '',
    data.subtotal || 0,
    data.deliveryCharge || 50,
    data.discount || 0,
    data.total || 0,
    data.deliveryDate || '',
    data.deliverySlot || '',
    data.paymentMethod || '',
    data.promoCode || '',
    data.notes || '',
    data.status || 'pending',
    data.timestamp || new Date().toISOString()
  ];

  sheet.appendRow(row);

  // Auto-resize columns
  sheet.autoResizeColumns(1, ORDER_HEADERS.length);

  // Color code by status
  const lastRow = sheet.getLastRow();
  const statusCell = sheet.getRange(lastRow, 16);
  colorCodeStatus(statusCell, data.status || 'pending');

  return { success: true, message: 'Order saved', orderId: data.orderId };
}

function updateOrderStatus(orderId, newStatus) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Orders');
  if (!sheet) return { success: false, message: 'Orders sheet not found' };

  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === orderId) {
      sheet.getRange(i + 1, 16).setValue(newStatus);
      colorCodeStatus(sheet.getRange(i + 1, 16), newStatus);
      return { success: true, message: 'Status updated' };
    }
  }
  return { success: false, message: 'Order not found' };
}

function getOrders() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Orders');
  if (!sheet) return { orders: [] };

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { orders: [] };

  const orders = data.slice(1).map(row => ({
    orderId: row[0],
    customer: { firstName: (row[1] || '').split(' ')[0], lastName: (row[1] || '').split(' ').slice(1).join(' '), email: row[2], phone: row[3], address: row[4] },
    items: [],
    total: row[9],
    deliveryDate: row[10],
    deliverySlot: row[11],
    paymentMethod: row[12],
    status: row[15],
    timestamp: row[16]
  }));

  return { orders, total: orders.length };
}

function getStats() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Orders');
  if (!sheet) return { totalOrders: 0, revenue: 0 };

  const data = sheet.getDataRange().getValues();
  const orders = data.slice(1);
  const revenue = orders.reduce((sum, row) => sum + (parseFloat(row[9]) || 0), 0);

  return {
    totalOrders: orders.length,
    revenue: revenue,
    pendingOrders: orders.filter(r => r[15] === 'pending').length
  };
}

// ---- CONTACT FUNCTIONS ----
function saveContact(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Contacts');

  if (!sheet) {
    sheet = ss.insertSheet('Contacts');
    sheet.appendRow(CONTACT_HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, CONTACT_HEADERS.length);
    headerRange.setBackground('#A67B5B');
    headerRange.setFontWeight('bold');
    headerRange.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    `${data.firstName || ''} ${data.lastName || ''}`.trim(),
    data.email || '',
    data.phone || '',
    data.subject || '',
    data.message || '',
    data.rating || '',
    data.timestamp || new Date().toISOString()
  ]);

  sheet.autoResizeColumns(1, CONTACT_HEADERS.length);
  return { success: true, message: 'Contact saved' };
}

// ---- BAKE SESSION FUNCTIONS ----
function saveBakeSession(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('BakeSessions');

  if (!sheet) {
    sheet = ss.insertSheet('BakeSessions');
    sheet.appendRow(BAKE_HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, BAKE_HEADERS.length);
    headerRange.setBackground('#C9A88A');
    headerRange.setFontWeight('bold');
    headerRange.setFontColor('#2C2118');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    data.bookingId || '',
    data.name || '',
    data.email || '',
    data.phone || '',
    data.difficulty || '',
    data.sessions ? data.sessions.length : 1,
    data.location || '',
    data.template || 'Custom Upload',
    data.experience || '',
    data.notes || '',
    'Booked',
    data.timestamp || new Date().toISOString()
  ]);

  sheet.autoResizeColumns(1, BAKE_HEADERS.length);
  return { success: true, message: 'Session booked' };
}

// ---- SUBSCRIBER ----
function saveSubscriber(email) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Subscribers');

  if (!sheet) {
    sheet = ss.insertSheet('Subscribers');
    sheet.appendRow(SUBSCRIBER_HEADERS);
    sheet.setFrozenRows(1);
  }

  // Check for duplicate
  const data = sheet.getDataRange().getValues();
  const exists = data.some(row => row[0] === email);
  if (!exists) {
    sheet.appendRow([email, new Date().toISOString()]);
  }

  return { success: true, duplicate: exists };
}

// ---- UTILITY ----
function colorCodeStatus(cell, status) {
  const colors = {
    pending: { bg: '#FFF3E0', text: '#E65100' },
    confirmed: { bg: '#E3F2FD', text: '#1565C0' },
    preparing: { bg: '#F3E5F5', text: '#6A1B9A' },
    out_for_delivery: { bg: '#E8F5E9', text: '#1B5E20' },
    delivered: { bg: '#E8F5E9', text: '#2E7D32' },
    cancelled: { bg: '#FFEBEE', text: '#C62828' },
  };
  const color = colors[status] || { bg: '#FFFFFF', text: '#000000' };
  cell.setBackground(color.bg);
  cell.setFontColor(color.text);
  cell.setFontWeight('bold');
}

// ---- EMAIL NOTIFICATION (Optional) ----
function sendOrderConfirmationEmail(orderData) {
  try {
    const subject = `🎂 CraveLab Order Confirmed - ${orderData.orderId}`;
    const body = `
      Dear ${orderData.customerName},
      
      Thank you for your order at CraveLab! 🍰
      
      Order ID: ${orderData.orderId}
      Total: ₹${orderData.total}
      Delivery Date: ${orderData.deliveryDate}
      
      We'll prepare your delicious desserts fresh just for you!
      
      Best,
      Team CraveLab
      hello@cravelab.in
    `;

    MailApp.sendEmail(orderData.email, subject, body);
  } catch (err) {
    Logger.log('Email error: ' + err.toString());
  }
}

/*
=================================================
HOW TO DEPLOY:
=================================================
1. Open Google Sheets → New spreadsheet
2. Name it "CraveLab Orders"
3. Go to Extensions → Apps Script
4. Delete default code, paste this entire script
5. Replace 'YOUR_SPREADSHEET_ID_HERE' with your Sheet ID
   (Found in the URL: docs.google.com/spreadsheets/d/SPREADSHEET_ID/...)
6. Click Deploy → New deployment
7. Type: Web App
8. Execute as: Me
9. Who has access: Anyone
10. Click Deploy → Copy the Web App URL
11. Paste URL in CraveLab Admin Panel → Settings → Sheets URL
12. Also update CRAVELAB_DATA.SHEETS_URL in js/data.js

SHEET TABS CREATED AUTOMATICALLY:
- Orders (all customer orders)
- Contacts (contact form submissions)  
- BakeSessions (baking session bookings)
- Subscribers (newsletter subscribers)
=================================================
*/
