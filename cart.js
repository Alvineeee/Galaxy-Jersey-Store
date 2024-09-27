// cart.js

// Define prices for jerseys
const jerseyPrices = {
    "Football Jersey": 5000, // Price in KES
    "Basketball Jersey": 6000,
    "Soccer Jersey": 4500,
    "Baseball Jersey": 5500
};

// Function to initialize the cart
function initializeCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Function to update the cart in local storage
function updateCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add an item to the cart
function addToCart(jersey, size, quantity) {
    const cart = initializeCart();
    const existingItem = cart.find(item => item.jersey === jersey && item.size === size);
    
    if (existingItem) {
        existingItem.quantity += quantity; // Increase quantity if the item already exists
    } else {
        const price = jerseyPrices[jersey] || 0; // Get price from the object
        cart.push({ jersey, size, quantity, price }); // Add price to the cart item
    }
    
    updateCart(cart);
    alert(`${quantity} ${size} ${jersey} added to the cart!`);
}

// Function to remove an item from the cart
function removeFromCart(jersey, size) {
    let cart = initializeCart();
    cart = cart.filter(item => !(item.jersey === jersey && item.size === size)); // Remove the item
    updateCart(cart);
    alert(`${jersey} (${size}) removed from the cart!`);
}

// Function to display the cart
function displayCart() {
    const cart = initializeCart();
    const cartDisplay = document.querySelector('.cart-display');
    cartDisplay.innerHTML = ''; // Clear previous cart display

    if (cart.length === 0) {
        cartDisplay.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.quantity} ${item.size} ${item.jersey} - KES ${item.price * item.quantity}</p>
            <button onclick="removeFromCart('${item.jersey}', '${item.size}')">Remove</button>
        `;
        cartDisplay.appendChild(cartItem);
    });
}

// Function to checkout
function checkout() {
    const cart = initializeCart();
    if (cart.length === 0) {
        alert('Your cart is empty. Add items to the cart before checking out.');
        return;
    }

    let orderSummary = 'Your Order:\n';
    cart.forEach(item => {
        orderSummary += `${item.quantity} ${item.size} ${item.jersey} - KES ${item.price * item.quantity}\n`;
    });
    
    alert(orderSummary + 'Thank you for your order!');
    localStorage.removeItem('cart'); // Clear the cart after checkout
    displayCart(); // Refresh cart display
}

// Event listener for displaying the cart on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});

// Example usage: Call addToCart on form submission
document.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    const jersey = document.getElementById('jersey').value;
    const size = document.getElementById('size').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    
    addToCart(jersey, size, quantity);
    displayCart(); // Update cart display after adding item
});
