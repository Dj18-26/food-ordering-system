// Payment Gateway Integration
class PaymentGateway {
    constructor() {
        this.supportedMethods = ['card', 'razorpay', 'paytm', 'gpay', 'phonepe', 'cash'];
    }

    // Initialize payment gateway
    async initialize() {
        console.log('Payment gateway initialized');
    }

    // Process payment
    async processPayment(amount, method, orderDetails) {
        console.log(`Processing payment of ₹${amount} via ${method}`);

        switch(method) {
            case 'card':
                return await this.processCardPayment(amount, orderDetails);
            case 'razorpay':
                return await this.processRazorpay(amount, orderDetails);
            case 'paytm':
                return await this.processPaytm(amount, orderDetails);
            case 'gpay':
                return await this.processGPay(amount, orderDetails);
            case 'phonepe':
                return await this.processPhonePe(amount, orderDetails);
            case 'cash':
                return await this.processCashOnDelivery(amount, orderDetails);
            default:
                throw new Error('Unsupported payment method');
        }
    }

    // Card Payment (Simulated)
    async processCardPayment(amount, orderDetails) {
        // In a real application, integrate with Stripe/PayPal
        return new Promise((resolve, reject) => {
            // Simulate payment processing
            setTimeout(() => {
                const success = Math.random() > 0.1; // 90% success rate simulation
                
                if (success) {
                    resolve({
                        success: true,
                        transactionId: 'TXN' + Date.now(),
                        message: 'Payment successful',
                        method: 'card'
                    });
                } else {
                    reject(new Error('Payment failed. Please try again.'));
                }
            }, 2000);
        });
    }

    // Razorpay Integration
    async processRazorpay(amount, orderDetails) {
        return new Promise((resolve, reject) => {
            // Check if Razorpay is loaded
            if (typeof Razorpay === 'undefined') {
                // Load Razorpay SDK
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => this.openRazorpay(amount, orderDetails, resolve, reject);
                document.head.appendChild(script);
            } else {
                this.openRazorpay(amount, orderDetails, resolve, reject);
            }
        });
    }

    openRazorpay(amount, orderDetails, resolve, reject) {
        const options = {
            key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            name: 'FoodHub',
            description: 'Food Order Payment',
            order_id: orderDetails.orderNumber,
            handler: function(response) {
                resolve({
                    success: true,
                    transactionId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                    message: 'Payment successful',
                    method: 'razorpay'
                });
            },
            prefill: {
                name: orderDetails.customerName,
                email: orderDetails.customerEmail,
                contact: orderDetails.customerPhone
            },
            theme: {
                color: '#ff6b35'
            }
        };

        try {
            const rzp = new Razorpay(options);
            rzp.on('payment.failed', function(response) {
                reject(new Error(response.error.description));
            });
            rzp.open();
        } catch (error) {
            // Fallback to simulated payment for demo
            console.warn('Razorpay not configured, using simulated payment');
            this.processCardPayment(amount, orderDetails).then(resolve).catch(reject);
        }
    }

    // PayTM Integration (Simulated)
    async processPaytm(amount, orderDetails) {
        return new Promise((resolve, reject) => {
            // In production, integrate with PayTM API
            setTimeout(() => {
                resolve({
                    success: true,
                    transactionId: 'PAYTM' + Date.now(),
                    message: 'Payment successful via PayTM',
                    method: 'paytm'
                });
            }, 2000);
        });
    }

    // Google Pay Integration (Simulated)
    async processGPay(amount, orderDetails) {
        return new Promise((resolve, reject) => {
            // In production, integrate with Google Pay API
            setTimeout(() => {
                resolve({
                    success: true,
                    transactionId: 'GPAY' + Date.now(),
                    message: 'Payment successful via Google Pay',
                    method: 'gpay'
                });
            }, 2000);
        });
    }

    // PhonePe Integration (Simulated)
    async processPhonePe(amount, orderDetails) {
        return new Promise((resolve, reject) => {
            // In production, integrate with PhonePe API
            setTimeout(() => {
                resolve({
                    success: true,
                    transactionId: 'PHONEPE' + Date.now(),
                    message: 'Payment successful via PhonePe',
                    method: 'phonepe'
                });
            }, 2000);
        });
    }

    // Cash on Delivery
    async processCashOnDelivery(amount, orderDetails) {
        return new Promise((resolve) => {
            resolve({
                success: true,
                transactionId: 'COD' + Date.now(),
                message: 'Cash on Delivery selected',
                method: 'cash'
            });
        });
    }

    // Verify payment status
    async verifyPayment(transactionId, orderId) {
        // In production, verify with payment gateway
        return {
            verified: true,
            status: 'completed',
            amount: orderData.total
        };
    }
}

// Create global instance
window.paymentGateway = new PaymentGateway();
