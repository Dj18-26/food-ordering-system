// Menu Data with Indian Rupee prices
const menuItems = [
    {
        id: 1,
        name: "Classic Burger",
        category: "burger",
        price: 80,
        description: "Juicy beef patty with lettuce, tomato, and special sauce",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"
    },
    {
        id: 2,
        name: "Cheese Burger",
        category: "burger",
        price: 100,
        description: "Double cheese with premium beef and pickles",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400"
    },
    {
        id: 3,
        name: "Margherita Pizza",
        category: "pizza",
        price: 120,
        description: "Fresh tomatoes, mozzarella, and basil",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400"
    },
    {
        id: 4,
        name: "Pepperoni Pizza",
        category: "pizza",
        price: 150,
        description: "Loaded with pepperoni and mozzarella cheese",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400"
    },
    {
        id: 5,
        name: "Salmon Sushi Roll",
        category: "sushi",
        price: 160,
        description: "Fresh salmon with avocado and cucumber",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400"
    },
    {
        id: 6,
        name: "California Roll",
        category: "sushi",
        price: 180,
        description: "Crab, avocado, and cucumber wrapped in rice",
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400"
    },
    {
        id: 7,
        name: "Caesar Salad",
        category: "salad",
        price: 100,
        description: "Crisp romaine lettuce with parmesan and croutons",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400"
    },
    {
        id: 8,
        name: "Greek Salad",
        category: "salad",
        price: 110,
        description: "Fresh vegetables with feta cheese and olives",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400"
    },
    {
        id: 9,
        name: "Chocolate Cake",
        category: "dessert",
        price: 70,
        description: "Rich chocolate cake with ganache frosting",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400"
    },
    {
        id: 10,
        name: "Tiramisu",
        category: "dessert",
        price: 80,
        description: "Classic Italian dessert with coffee and mascarpone",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400"
    },
    {
        id: 11,
        name: "Veggie Burger",
        category: "burger",
        price: 90,
        description: "Plant-based patty with fresh vegetables",
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400"
    },
    {
        id: 12,
        name: "BBQ Chicken Pizza",
        category: "pizza",
        price: 140,
        description: "Grilled chicken with BBQ sauce and red onions",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
    }
];

// Authentication state
const AUTH_USERS_KEY = 'foodhub_users';
const AUTH_CURRENT_USER_KEY = 'foodhub_current_user';

function getStoredUsers() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '[]');
    } catch {
        return [];
    }
}

function storeUsers(users) {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_CURRENT_USER_KEY));
    } catch {
        return null;
    }
}

function setCurrentUser(user) {
    localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(user));
    updateAuthUI();
}

function clearCurrentUser() {
    localStorage.removeItem(AUTH_CURRENT_USER_KEY);
    updateAuthUI();
}

function updateAuthUI() {
    const user = getCurrentUser();
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const userNameDisplay = document.getElementById('userNameDisplay');

    if (user) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        welcomeMessage.style.display = 'inline-block';
        userNameDisplay.textContent = user.name || user.email;
    } else {
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        welcomeMessage.style.display = 'none';
        userNameDisplay.textContent = '';
    }
}

function showAuthPanel(panel) {
    document.getElementById('loginForm').style.display = panel === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = panel === 'register' ? 'block' : 'none';
    document.getElementById('switchToLogin').classList.toggle('active', panel === 'login');
    document.getElementById('switchToRegister').classList.toggle('active', panel === 'register');
    document.getElementById('authTitle').textContent = panel === 'login' ? 'Login' : 'Register';
}

function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
    showAuthPanel('login');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

function requireLogin() {
    const user = getCurrentUser();
    if (!user) {
        showNotification('Please login or register to continue.');
        openAuthModal();
        return false;
    }
    return true;
}

function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value;

    if (!name || !email || !password) {
        alert('Please fill all registration fields.');
        return;
    }

    const users = getStoredUsers();

    if (users.some(u => u.email === email)) {
        alert('A user with this email already exists. Please login.');
        showAuthPanel('login');
        return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    storeUsers(users);
    setCurrentUser(newUser);
    closeAuthModal();
    showNotification('Registration successful, you are now logged in.');

    document.getElementById('registerForm').reset();
}

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        alert('Please enter your login credentials.');
        return;
    }

    const users = getStoredUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert('Invalid email or password.');
        return;
    }

    setCurrentUser(user);
    closeAuthModal();
    showNotification('Login successful.');
    document.getElementById('loginForm').reset();
}

function logoutUser() {
    clearCurrentUser();
    showNotification('You have been logged out.');
}

// Shopping Cart
let cart = [];

// Store current order data
let currentOrder = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadMenuItems('all');
    setupCategoryFilter();
    updateCartDisplay();
    updateAuthUI();

    document.getElementById('loginBtn').addEventListener('click', openAuthModal);
    document.getElementById('logoutBtn').addEventListener('click', logoutUser);

    // Initialize payment gateway
    if (window.paymentGateway) {
        window.paymentGateway.initialize();
    }
});

// Format price in Indian Rupees
function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

// Load menu items to the grid
function loadMenuItems(category) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const menuItemHTML = `
            <div class="menu-item" data-category="${item.category}">
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-footer">
                        <span class="price">${formatPrice(item.price)}</span>
                        <button class="add-to-cart" onclick="addToCart(${item.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        menuGrid.innerHTML += menuItemHTML;
    });
}

// Setup category filter functionality
function setupCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            loadMenuItems(category);
        });
    });
}

// Add item to cart
function addToCart(itemId) {
    if (!requireLogin()) {
        return;
    }

    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCartDisplay();
    showNotification('Item added to cart!');
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <p>Add some delicious items!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${formatPrice(item.price)}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update total price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(totalPrice);
}

// Update item quantity in cart
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartDisplay();
        }
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    updateCartDisplay();
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

// Handle payment method change
function handlePaymentMethodChange() {
    const paymentMethod = document.getElementById('payment').value;
    const paymentDetails = document.getElementById('paymentDetails');
    const transactionInfo = document.getElementById('transactionInfo');
    
    if (paymentMethod && paymentMethod !== 'cash') {
        paymentDetails.style.display = 'block';
        transactionInfo.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; color: #ff6b35;">
                <div class="spinner" style="width: 20px; height: 20px; border: 3px solid #ff6b35; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <span>Ready to process ${formatPaymentMethodName(paymentMethod)} payment...</span>
            </div>
        `;
    } else {
        paymentDetails.style.display = 'none';
    }
}

// Format payment method name
function formatPaymentMethodName(method) {
    const names = {
        'card': 'Card',
        'razorpay': 'Razorpay',
        'paytm': 'PayTM',
        'gpay': 'Google Pay',
        'phonepe': 'PhonePe',
        'cash': 'Cash on Delivery'
    };
    return names[method] || method;
}

// Checkout process
function checkout() {
    if (!requireLogin()) {
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty! Please add some items before checkout.');
        return;
    }

    toggleCart();
    
    // Populate order summary
    const orderSummary = document.getElementById('orderSummary');
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    orderSummary.innerHTML = cart.map(item => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span>${item.name} x ${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('') + `
        <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 2px solid #ddd; font-weight: bold;">
            <span>Total:</span>
            <span>${formatPrice(totalPrice)}</span>
        </div>
    `;

    // Show checkout modal
    document.getElementById('checkoutModal').classList.add('active');
}

// Close checkout modal
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// Process order
async function processOrder(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment').value;

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05; // 5% tax
    const deliveryFee = 50; // Fixed delivery fee
    const total = subtotal + tax + deliveryFee;

    // Generate order number
    const orderNumber = 'ORD' + Date.now();

    // Disable place order button
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Processing...';

    try {
        // Prepare order details for payment
        const orderDetails = {
            orderNumber: orderNumber,
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            deliveryAddress: address,
            items: cart,
            subtotal: subtotal,
            tax: tax,
            deliveryFee: deliveryFee,
            total: total
        };

        // Process payment
        showNotification('Processing payment... Please wait');
        const paymentResult = await window.paymentGateway.processPayment(total, paymentMethod, orderDetails);

        if (paymentResult.success) {
            // Payment successful
            console.log('Payment successful:', paymentResult);

            // Update transaction info display
            const paymentDetails = document.getElementById('paymentDetails');
            const transactionInfo = document.getElementById('transactionInfo');
            paymentDetails.style.display = 'block';
            transactionInfo.innerHTML = `
                <div style="background: #d4edda; padding: 10px; border-radius: 5px; border-left: 4px solid #28a745;">
                    <strong style="color: #155724;">✓ Payment Successful!</strong><br>
                    <span style="color: #155724;">Transaction ID: ${paymentResult.transactionId}</span><br>
                    <span style="color: #155724;">Method: ${formatPaymentMethodName(paymentMethod)}</span>
                </div>
            `;

            // Wait a moment before showing success
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Store current order data for receipt generation
            currentOrder = {
                orderNumber: orderNumber,
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                deliveryAddress: address,
                paymentMethod: paymentMethod,
                transactionId: paymentResult.transactionId,
                items: cart.map(item => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                subtotal: subtotal,
                tax: tax,
                deliveryFee: deliveryFee,
                total: total,
                date: new Date().toLocaleString('en-IN'),
                timestamp: new Date().toISOString()
            };

            // Close checkout modal and show success modal
            closeCheckout();
            
            document.getElementById('orderNumber').textContent = orderNumber;
            document.getElementById('successModal').classList.add('active');

            // Clear cart
            cart = [];
            updateCartDisplay();

            // Reset form
            document.getElementById('checkoutForm').reset();

            showNotification('Order placed successfully! Download your receipt.');
        }
    } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed: ' + error.message + '\nPlease try again or select a different payment method.');
        
        // Re-enable place order button
        placeOrderBtn.disabled = false;
        placeOrderBtn.textContent = 'Place Order';
    }
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
    currentOrder = null; // Clear order data
}

// Download receipt as PDF
async function downloadReceipt() {
    if (!currentOrder) {
        alert('No order data available. Please place an order first.');
        return;
    }

    try {
        showNotification('Generating your receipt...');
        
        // Generate PDF receipt
        const doc = await window.receiptGenerator.generateReceipt(currentOrder);
        
        // Convert to blob
        const pdfBlob = doc.output('blob');
        
        // Store in backend (localStorage for demo)
        await window.receiptGenerator.downloadToBackend(currentOrder, pdfBlob);
        
        showNotification('Receipt downloaded successfully!');
        
        // Optionally, you can also send to server here
        // sendReceiptToServer(currentOrder, pdfBlob);
        
    } catch (error) {
        console.error('Receipt generation error:', error);
        alert('Failed to generate receipt. Please try again.');
    }
}

// Send receipt to backend server (example function)
async function sendReceiptToServer(orderData, pdfBlob) {
    // In a real application, you would send this to your backend API
    const formData = new FormData();
    formData.append('orderNumber', orderData.orderNumber);
    formData.append('customerEmail', orderData.customerEmail);
    formData.append('receipt', pdfBlob, `receipt_${orderData.orderNumber}.pdf`);
    
    try {
        const response = await fetch('/api/save-receipt', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            console.log('Receipt saved to server');
        }
    } catch (error) {
        console.error('Failed to save receipt to server:', error);
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 4000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const checkoutModal = document.getElementById('checkoutModal');
    const successModal = document.getElementById('successModal');

    if (event.target === checkoutModal) {
        closeCheckout();
    }
    if (event.target === successModal) {
        closeSuccessModal();
    }
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
