# 🚀 Quick Setup Guide - FoodHub

## Option 1: Frontend Only (Simplest)

### Just Open and Use!
1. **Double-click** `index.html` to open in browser
2. That's it! Start ordering food! ✅

**Features Available:**
- ✅ Browse menu
- ✅ Add to cart
- ✅ Checkout with payment simulation
- ✅ Download PDF receipt (stored locally)

---

## Option 2: Full Setup with Backend

### Step 1: Install Node.js
Download from: https://nodejs.org/

### Step 2: Install Dependencies
Open Command Prompt/Terminal in the project folder:
```bash
npm install
```

### Step 3: Start Backend Server
```bash
npm start
```

Server runs on: http://localhost:3000

### Step 4: Open Website
Open `index.html` in browser

**Features Available:**
- ✅ Everything from Option 1
- ✅ Backend receipt storage
- ✅ Order management API
- ✅ File upload support

---

## 🎯 Testing the System

### Test Order Flow:
1. **Add Items**: Click "Add to Cart" on any menu item
2. **View Cart**: Click cart icon (top right)
3. **Checkout**: Fill customer form
4. **Select Payment**: Choose any method (Card, UPI, COD, etc.)
5. **Place Order**: Click button
6. **Payment Processing**: Wait 2 seconds
7. **Success**: Order confirmed!
8. **Download Receipt**: Click green download button

### Payment Methods Tested:
- ✅ **Card** - Simulated payment (90% success rate)
- ✅ **Razorpay** - Opens Razorpay UI (needs API key for real payments)
- ✅ **PayTM/GPay/PhonePe** - Simulated instant success
- ✅ **Cash on Delivery** - Instant confirmation

---

## 🔍 Verify It Works

### Check Receipt Downloaded:
- Look in your Downloads folder for: `FoodHub_Receipt_ORD[timestamp].pdf`
- Open PDF to see professional receipt

### Check Local Storage (Backend Simulation):
1. Open Browser DevTools (F12)
2. Go to Application tab
3. Check Local Storage
4. Look for `foodhub_receipts`

### Check Backend Server (if running):
Visit: http://localhost:3000/api/orders
- Shows all orders in JSON format

---

## 💡 Pro Tips

### For Demo Purposes:
- Use **Cash on Delivery** for instant success
- Card payments have 10% failure rate (realistic simulation)
- All prices in Indian Rupees (₹)

### Customize:
- Edit menu items in `script.js`
- Change colors in `styles.css`
- Modify receipt template in `receipt-generator.js`

---

## ❓ Common Issues

### "Payment Failed"
- Try again (random failure simulation)
- Or use Cash on Delivery

### "PDF Not Downloading"
- Allow pop-ups in browser
- Try Chrome/Firefox

### "Backend Port Already in Use"
- Close other apps using port 3000
- Or change PORT in `backend-server.js`

---

## 🎉 You're Ready!

The system is fully functional out of the box. No complex setup needed for basic usage!

**Enjoy ordering food! 🍕🍔🥗**
