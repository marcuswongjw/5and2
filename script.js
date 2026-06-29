const menuItems = [
    {
        id: 1,
        name: "Classic Chocolate Cake",
        category: "cakes",
        price: 35.00,
        emoji: "🎂",
        description: "Rich, moist chocolate cake with ganache frosting. Perfect for any celebration!",
        serves: "8-10 people"
    },
    {
        id: 2,
        name: "Red Velvet Cake",
        category: "cakes",
        price: 38.00,
        emoji: "🍰",
        description: "Classic red velvet with cream cheese frosting. A crowd favorite!",
        serves: "8-10 people"
    },
    {
        id: 3,
        name: "Chocolate Chip Cookies",
        category: "cookies",
        price: 12.00,
        emoji: "🍪",
        description: "Crispy edges, chewy center. Box of 12 freshly baked cookies.",
        serves: "12 pieces"
    },
    {
        id: 4,
        name: "Matcha Cookies",
        category: "cookies",
        price: 15.00,
        emoji: "🍵",
        description: "Premium Japanese matcha cookies with white chocolate chips.",
        serves: "12 pieces"
    },
    {
        id: 5,
        name: "Sourdough Bread",
        category: "bread",
        price: 8.00,
        emoji: "🍞",
        description: "Artisan sourdough with crispy crust and soft interior.",
        serves: "1 loaf"
    },
    {
        id: 6,
        name: "Banana Bread",
        category: "bread",
        price: 10.00,
        emoji: "🍌",
        description: "Moist banana bread made with ripe bananas and walnuts.",
        serves: "1 loaf"
    },
    {
        id: 7,
        name: "Butter Croissants",
        category: "pastries",
        price: 18.00,
        emoji: "🥐",
        description: "Flaky, buttery croissants baked fresh daily. Set of 4.",
        serves: "4 pieces"
    },
    {
        id: 8,
        name: "Cinnamon Rolls",
        category: "pastries",
        price: 22.00,
        emoji: "🫓",
        description: "Soft cinnamon rolls with cream cheese glaze. Set of 6.",
        serves: "6 pieces"
    }
];

let cart = [];

// Display menu items
function displayMenu(items) {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <div class="item-image">${item.emoji}</div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="description">${item.description}</p>
                <p style="color: #636e72; font-size: 0.9rem;">${item.serves}</p>
                <p class="price">$${item.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Filter items
function filterItems(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (category === 'all') {
        displayMenu(menuItems);
    } else {
        const filtered = menuItems.filter(item => item.category === category);
        displayMenu(filtered);
    }
}

// Add to cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...item, quantity: 1});
    }
    
    updateCart();
    showNotification(`${item.name} added to cart!`);
}

// Update cart display
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.emoji} ${item.name}</h4>
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Quantity controls
function increaseQuantity(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(i => i.id !== itemId);
    }
    updateCart();
}

// Toggle cart sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const modal = document.getElementById('order-modal');
    const orderDetails = document.getElementById('order-details');
    
    let orderHTML = '<div class="order-summary">';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        orderHTML += `
            <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #dfe6e9;">
                <p><strong>${item.emoji} ${item.name}</strong> x ${item.quantity}</p>
                <p style="color: #636e72;">$${itemTotal.toFixed(2)}</p>
            </div>
        `;
    });
    
    orderHTML += `
        <div style="font-size: 1.2rem; font-weight: bold; margin-top: 1rem;">
            Total: $${total.toFixed(2)}
        </div>
        <div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 10px;">
            <p><strong>Pickup Information:</strong></p>
            <p>📍 Block 123, Ang Mo Kio Ave 3</p>
            <p>⏰ Pickup time: Please arrange via WhatsApp</p>
            <p>⚠️ Please order 2 days in advance</p>
        </div>
    </div>`;
    
    orderDetails.innerHTML = orderHTML;
    modal.classList.add('active');
    toggleCart(); // Close cart
}

// Close modal
function closeModal() {
    document.getElementById('order-modal').classList.remove('active');
}

// Send to WhatsApp
function sendToWhatsApp() {
    let message = 'Hi! I would like to order:%0A%0A';
    let total = 0;
    
    cart.forEach(item => {
        message += `${item.emoji} ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}%0A`;
        total += item.price * item.quantity;
    });
    
    message += `%0ATotal: $${total.toFixed(2)}%0A%0A`;
    message += 'Please let me know the pickup details. Thank you! 🙏';
    
    const phoneNumber = '6512345678'; // Replace with your WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    closeModal();
}

// Show notification
function showNotification(message) {
    // Simple notification
    alert(message);
}

// Initialize
displayMenu(menuItems);