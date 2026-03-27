// PDF Generation Library (using jsPDF)
// This will be loaded from CDN in HTML

class ReceiptGenerator {
    constructor() {
        this.jsPDF = null;
    }

    // Initialize jsPDF library
    async initialize() {
        if (typeof window.jspdf !== 'undefined') {
            this.jsPDF = window.jspdf.jsPDF;
            return true;
        }
        
        // Load jsPDF from CDN
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => {
                this.jsPDF = window.jspdf.jsPDF;
                resolve(true);
            };
            script.onerror = () => reject(new Error('Failed to load jsPDF'));
            document.head.appendChild(script);
        });
    }

    // Generate PDF receipt
    async generateReceipt(orderData) {
        await this.initialize();

        const doc = new this.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        let yPos = margin;

        // Header - Company Info
        doc.setFillColor(255, 107, 53);
        doc.rect(0, 0, pageWidth, 40, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.text('🍔 FoodHub', pageWidth / 2, yPos + 15, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Phoenix Mall, Kalyani Nagar, Pune, Maharashtra 411001', pageWidth / 2, yPos + 25, { align: 'center' });
        doc.text('Phone: +91 9172121002 | Email: DJFoodHub@gmail.com', pageWidth / 2, yPos + 30, { align: 'center' });

        // Receipt Title
        yPos += 50;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('ORDER RECEIPT', pageWidth / 2, yPos, { align: 'center' });

        // Order Details Box
        yPos += 15;
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 35, 3, 3);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Order Number:', margin + 5, yPos + 10);
        doc.setFont('helvetica', 'normal');
        doc.text(`#${orderData.orderNumber}`, margin + 40, yPos + 10);

        doc.setFont('helvetica', 'bold');
        doc.text('Order Date:', margin + 100, yPos + 10);
        doc.setFont('helvetica', 'normal');
        doc.text(orderData.date, margin + 125, yPos + 10);

        doc.setFont('helvetica', 'bold');
        doc.text('Payment Method:', margin + 5, yPos + 20);
        doc.setFont('helvetica', 'normal');
        doc.text(this.formatPaymentMethod(orderData.paymentMethod), margin + 35, yPos + 20);

        doc.setFont('helvetica', 'bold');
        doc.text('Payment Status:', margin + 100, yPos + 20);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40, 167, 69);
        doc.text('PAID', margin + 130, yPos + 20);
        doc.setTextColor(0, 0, 0);

        // Customer Information
        yPos += 45;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Customer Information', margin, yPos);
        
        yPos += 10;
        doc.setFillColor(248, 249, 250);
        doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 25, 3, 3, 'F');
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Name: ${orderData.customerName}`, margin + 5, yPos + 8);
        doc.text(`Email: ${orderData.customerEmail}`, margin + 5, yPos + 14);
        doc.text(`Phone: ${orderData.customerPhone}`, margin + 5, yPos + 20);
        doc.text(`Address: ${orderData.deliveryAddress}`, margin + 5, yPos + 26);

        // Order Items Table
        yPos += 45;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Order Details', margin, yPos);

        yPos += 10;
        const tableStartY = yPos;
        
        // Table Header
        doc.setFillColor(255, 107, 53);
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        
        const colWidths = [70, 25, 35, 35];
        const headers = ['Item', 'Price', 'Quantity', 'Total'];
        let xPos = margin;
        
        headers.forEach((header, index) => {
            doc.rect(xPos, yPos, colWidths[index], 10, 'F');
            doc.text(header, xPos + 3, yPos + 6);
            xPos += colWidths[index];
        });

        // Table Rows
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        yPos += 10;

        orderData.items.forEach((item, index) => {
            const rowHeight = 10;
            
            // Alternate row colors
            if (index % 2 === 0) {
                doc.setFillColor(250, 250, 250);
                doc.rect(margin, yPos, pageWidth - (margin * 2), rowHeight, 'F');
            }

            doc.text(item.name.substring(0, 25), margin + 3, yPos + 6);
            doc.text(`₹${item.price.toLocaleString('en-IN')}`, margin + 73, yPos + 6);
            doc.text(item.quantity.toString(), margin + 98, yPos + 6, { align: 'right' });
            doc.text(`₹${(item.price * item.quantity).toLocaleString('en-IN')}`, margin + 133, yPos + 6, { align: 'right' });
            
            yPos += rowHeight;
        });

        // Subtotal, Tax, Delivery Fee, Total
        const summaryStartX = pageWidth - margin - 60;
        yPos += 5;

        doc.setFont('helvetica', 'bold');
        doc.text('Subtotal:', summaryStartX, yPos + 5);
        doc.setFont('helvetica', 'normal');
        doc.text(`₹${orderData.subtotal.toLocaleString('en-IN')}`, pageWidth - margin, yPos + 5, { align: 'right' });
        
        yPos += 8;
        doc.setFont('helvetica', 'bold');
        doc.text('Tax (5%):', summaryStartX, yPos + 5);
        doc.setFont('helvetica', 'normal');
        doc.text(`₹${orderData.tax.toLocaleString('en-IN')}`, pageWidth - margin, yPos + 5, { align: 'right' });
        
        yPos += 8;
        doc.setFont('helvetica', 'bold');
        doc.text('Delivery Fee:', summaryStartX, yPos + 5);
        doc.setFont('helvetica', 'normal');
        doc.text(`₹${orderData.deliveryFee.toLocaleString('en-IN')}`, pageWidth - margin, yPos + 5, { align: 'right' });
        
        // Grand Total
        yPos += 12;
        doc.setFillColor(255, 107, 53);
        doc.rect(summaryStartX, yPos, 60, 12, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('TOTAL:', summaryStartX + 3, yPos + 8);
        doc.text(`₹${orderData.total.toLocaleString('en-IN')}`, pageWidth - margin - 2, yPos + 8, { align: 'right' });

        // Footer
        yPos += 30;
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.text('Thank you for your order!', pageWidth / 2, yPos, { align: 'center' });
        doc.text('Your delicious food is being prepared.', pageWidth / 2, yPos + 5, { align: 'center' });
        doc.text('For any queries, please contact us at +1 (555) 123-4567', pageWidth / 2, yPos + 10, { align: 'center' });
        doc.text('www.foodhub.com', pageWidth / 2, yPos + 15, { align: 'center' });

        // Terms and Conditions
        yPos += 20;
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        
        yPos += 8;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Terms & Conditions apply. This is a computer-generated receipt.', pageWidth / 2, yPos, { align: 'center' });
        doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, pageWidth / 2, yPos + 4, { align: 'center' });

        // Save PDF
        doc.save(`FoodHub_Receipt_${orderData.orderNumber}.pdf`);
        
        return doc;
    }

    // Format payment method name
    formatPaymentMethod(method) {
        const methods = {
            'card': 'Credit/Debit Card',
            'cash': 'Cash on Delivery',
            'paypal': 'PayPal',
            'razorpay': 'Razorpay',
            'paytm': 'PayTM',
            'gpay': 'Google Pay',
            'phonepe': 'PhonePe'
        };
        return methods[method] || method;
    }

    // Download PDF to backend (simulated - in real app, send to server)
    async downloadToBackend(orderData, pdfBlob) {
        // In a real application, you would upload the PDF to your server
        // For now, we'll simulate it with localStorage
        
        const reader = new FileReader();
        
        return new Promise((resolve, reject) => {
            reader.onload = function(event) {
                const pdfBase64 = event.target.result.split(',')[1];
                
                // Store in localStorage (in real app, send to server via API)
                const receiptData = {
                    orderNumber: orderData.orderNumber,
                    customerName: orderData.customerName,
                    customerEmail: orderData.customerEmail,
                    total: orderData.total,
                    date: orderData.date,
                    items: orderData.items,
                    pdfBase64: pdfBase64,
                    timestamp: new Date().toISOString()
                };
                
                // Get existing receipts or initialize empty array
                let receipts = JSON.parse(localStorage.getItem('foodhub_receipts') || '[]');
                receipts.push(receiptData);
                localStorage.setItem('foodhub_receipts', JSON.stringify(receipts));
                
                console.log('Receipt stored in backend (localStorage):', receiptData);
                resolve(receiptData);
            };
            
            reader.onerror = reject;
            reader.readAsDataURL(pdfBlob);
        });
    }
}

// Create global instance
window.receiptGenerator = new ReceiptGenerator();
