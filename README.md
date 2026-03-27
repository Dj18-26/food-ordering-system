# 🍔 FoodHub - Food Ordering System

A complete food ordering website with payment integration and PDF receipt generation.

## ✨ Features

### Frontend Features
- **Modern UI/UX** - Responsive design with HTML, CSS, and JavaScript
- **Menu Display** - 12+ food items across 5 categories (Burgers, Pizza, Sushi, Salads, Desserts)
- **Category Filtering** - Filter menu items by category
- **Shopping Cart** - Add/remove items, adjust quantities, real-time price calculation
- **Multiple Payment Methods**:
  - Credit/Debit Card
  - Razorpay (UPI/Card)
  - PayTM Wallet
  - Google Pay
  - PhonePe
  - Cash on Delivery
- **PDF Receipt Generation** - Automatic receipt creation with order details
- **Receipt Download** - Download receipts in PDF format
- **Backend Storage** - Store receipts on server

### Payment Integration
- Simulated payment processing for demo
- Razorpay integration ready (add your API key)
- Support for Indian payment methods (PayTM, GPay, PhonePe)
- Transaction ID tracking
- Payment success/failure handling

### Receipt Features
- Professional PDF receipt with:
  - Company branding
  - Order details
  - Customer information
  - Itemized bill with tax and delivery charges
  - Payment method and transaction ID
  - Terms and conditions

## 📁 Files Structure

```
order/
├── index.html              # Main HTML file
├── styles.css              # Stylesheet
├── script.js               # Main JavaScript logic
├── receipt-generator.js    # PDF receipt generation
├── payment-gateway.js      # Payment processing
├── backend-server.js       # Node.js backend server
├── package.json            # Backend dependencies
└── README.md               # This file
```

## 🚀 How to Use

### Frontend (No Setup Required)
1. Open `index.html` in any modern web browser
2. Browse the menu and add items to cart
3. Click on cart icon to view your order
4. Click "Checkout" button
5. Fill in customer details
6. Select payment method
7. Complete payment
8. Download PDF receipt

### Backend Server (Optional - For Receipt Storage)

If you want to store receipts on a server:

#### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

#### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

3. **Server will run on**: `http://localhost:3000`

#### API Endpoints

- **POST** `/api/save-receipt` - Upload receipt PDF
  - Parameters: `orderNumber`, `customerEmail`, `receipt` (file)
  
- **GET** `/api/orders` - Get all orders
  
- **GET** `/api/orders/:orderNumber` - Get specific order
  
- **GET** `/api/receipts/:filename` - Download receipt
  
- **GET** `/api/view-receipt/:filename` - View receipt in browser

## 🔧 Configuration

### Razorpay Setup (For Real Payments)

1. Sign up at [Razorpay](https://razorpay.com)
2. Get your API keys from Dashboard
3. Update `payment-gateway.js`:
   ```javascript
   key: 'YOUR_RAZORPAY_KEY_ID' // Replace with your key
   ```

### Enable Backend Integration

Update `script.js` function `sendReceiptToServer()` to call your backend:

```javascript
const response = await fetch('http://localhost:3000/api/save-receipt', {
    method: 'POST',
    body: formData
});
```

## 💰 Pricing (Indian Rupees)

All prices are in INR (₹):
- Burgers: ₹707 - ₹832
- Pizza: ₹1,082 - ₹1,332
- Sushi: ₹1,165 - ₹1,332
- Salads: ₹832 - ₹915
- Desserts: ₹582 - ₹665

## 🎨 Customization

### Change Colors
Edit `styles.css` variables:
- Primary color: `#ff6b35` (orange)
- Secondary color: `#f7931e` (light orange)

### Add Menu Items
Edit `script.js` - `menuItems` array:
```javascript
{
    id: 13,
    name: "Your Item",
    category: "category",
    price: 999,
    description: "Description",
    image: "image_url"
}
```

## 📱 Browser Support

- Chrome (Recommended)
- Firefox
- Safari
- Edge
- Opera

## 🔐 Security Notes

For production use:
1. Use HTTPS for all connections
2. Store API keys securely (environment variables)
3. Implement proper authentication
4. Use a real database (MongoDB/PostgreSQL)
5. Add input validation and sanitization
6. Implement CSRF protection
7. Add rate limiting

## 📊 Receipt Data Storage

Currently uses localStorage for demo. For production:
- Backend stores PDFs in cloud storage (AWS S3, Google Cloud)
- Database stores order metadata
- Email receipts to customers

## 🛠️ Troubleshooting

### PDF Not Downloading
- Check browser pop-up blocker
- Ensure jsPDF loads from CDN
- Check console for errors

### Payment Fails
- For demo, it's random (90% success rate)
- For real payments, check API keys
- Check internet connection

### Backend Not Starting
- Install Node.js
- Run `npm install`
- Check port 3000 is not in use

## 📞 Support

For issues or questions:
- Check browser console for errors
- Review code comments
- Test with different payment methods

## 🎯 Future Enhancements

- User authentication
- Order history
- Real-time order tracking
- Email notifications
- SMS integration
- Multiple restaurants
- Admin dashboard
- Inventory management

## 📄 License

MIT License - Free to use for personal and commercial projects

---

**Developed with ❤️ for food lovers!**
