// Menu Data with Indian Rupee prices
const menuItems = [
    {
        id: 1,
        name: "Classic Burger",
        category: "burger",
        price: 749,
        description: "Juicy beef patty with lettuce, tomato, and special sauce",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"
    },
    {
        id: 2,
        name: "Cheese Burger",
        category: "burger",
        price: 832,
        description: "Double cheese with premium beef and pickles",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400"
    },
    {
        id: 3,
        name: "Margherita Pizza",
        category: "pizza",
        price: 1082,
        description: "Fresh tomatoes, mozzarella, and basil",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400"
    },
    {
        id: 4,
        name: "Pepperoni Pizza",
        category: "pizza",
        price: 1249,
        description: "Loaded with pepperoni and mozzarella cheese",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400"
    },
    {
        id: 5,
        name: "Salmon Sushi Roll",
        category: "sushi",
        price: 1332,
        description: "Fresh salmon with avocado and cucumber",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400"
    },
    {
        id: 6,
        name: "California Roll",
        category: "sushi",
        price: 1165,
        description: "Crab, avocado, and cucumber wrapped in rice",
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400"
    },
    {
        id: 7,
        name: "Caesar Salad",
        category: "salad",
        price: 832,
        description: "Crisp romaine lettuce with parmesan and croutons",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400"
    },
    {
        id: 8,
        name: "Greek Salad",
        category: "salad",
        price: 915,
        description: "Fresh vegetables with feta cheese and olives",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400"
    },
    {
        id: 9,
        name: "Chocolate Cake",
        category: "dessert",
        price: 582,
        description: "Rich chocolate cake with ganache frosting",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400"
    },
    {
        id: 10,
        name: "Tiramisu",
        category: "dessert",
        price: 665,
        description: "Classic Italian dessert with coffee and mascarpone",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400"
    },
    {
        id: 11,
        name: "Veggie Burger",
        category: "burger",
        price: 707,
        description: "Plant-based patty with fresh vegetables",
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400"
    },
    {
        id: 12,
        name: "BBQ Chicken Pizza",
        category: "pizza",
        price: 1332,
        description: "Grilled chicken with BBQ sauce and red onions",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
    }
];

// Shopping Cart
let cart = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadMenuItems('all');
    setupCategoryFilter();
    updateCartDisplay();
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

// Checkout process
function checkout() {
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
function processOrder(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    // Generate random order number
    const orderNumber = Math.floor(Math.random() * 1000000);

    // Close checkout modal and show success modal
    closeCheckout();
    
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('successModal').classList.add('active');

    // Clear cart
    cart = [];
    updateCartDisplay();

    // Reset form
    document.getElementById('checkoutForm').reset();

    // Log order details (in a real app, this would be sent to a server)
    console.log('Order Details:', {
        customer: { name, email, phone, address },
        payment: payment,
        items: cart,
        orderNumber: orderNumber
    });
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
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
