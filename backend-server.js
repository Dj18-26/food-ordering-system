// Simple Node.js Express Backend Server for Receipt Storage
// Install dependencies: npm install express multer cors body-parser

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create receipts directory if it doesn't exist
const receiptsDir = path.join(__dirname, 'receipts');
if (!fs.existsSync(receiptsDir)) {
    fs.mkdirSync(receiptsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, receiptsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `receipt-${uniqueSuffix}.pdf`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// In-memory database (use MongoDB/PostgreSQL in production)
let orders = [];

// API Endpoint: Save receipt
app.post('/api/save-receipt', upload.single('receipt'), (req, res) => {
    try {
        const { orderNumber, customerEmail } = req.body;
        const receiptFile = req.file;

        if (!receiptFile) {
            return res.status(400).json({ error: 'No receipt file uploaded' });
        }

        // Create order record
        const order = {
            id: orders.length + 1,
            orderNumber: orderNumber,
            customerEmail: customerEmail,
            receiptPath: receiptFile.path,
            receiptFilename: receiptFile.filename,
            uploadedAt: new Date().toISOString(),
            size: receiptFile.size
        };

        // Store in database
        orders.push(order);

        console.log(`Receipt saved: ${orderNumber} - ${receiptFile.filename}`);

        res.json({
            success: true,
            message: 'Receipt saved successfully',
            data: {
                orderNumber: orderNumber,
                receiptUrl: `/api/receipts/${receiptFile.filename}`,
                uploadedAt: order.uploadedAt
            }
        });
    } catch (error) {
        console.error('Error saving receipt:', error);
        res.status(500).json({ error: 'Failed to save receipt' });
    }
});

// API Endpoint: Get all orders
app.get('/api/orders', (req, res) => {
    res.json({
        success: true,
        count: orders.length,
        orders: orders
    });
});

// API Endpoint: Get specific order
app.get('/api/orders/:orderNumber', (req, res) => {
    const order = orders.find(o => o.orderNumber === req.params.orderNumber);
    
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
        success: true,
        order: order
    });
});

// API Endpoint: Download receipt
app.get('/api/receipts/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(receiptsDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Receipt not found' });
    }

    res.download(filePath, filename);
});

// API Endpoint: View receipt in browser
app.get('/api/view-receipt/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(receiptsDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Receipt not found' });
    }

    res.sendFile(filePath);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 FoodHub Backend Server running on http://localhost:${PORT}`);
    console.log(`📁 Receipts stored in: ${receiptsDir}`);
    console.log('\nAvailable endpoints:');
    console.log(`  POST /api/save-receipt - Upload receipt`);
    console.log(`  GET /api/orders - Get all orders`);
    console.log(`  GET /api/orders/:orderNumber - Get specific order`);
    console.log(`  GET /api/receipts/:filename - Download receipt`);
    console.log(`  GET /api/view-receipt/:filename - View receipt in browser`);
});

module.exports = app;
