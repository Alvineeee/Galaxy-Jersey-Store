// order.js

// Function to validate the form
function validateForm(event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const jersey = document.getElementById('jersey').value;
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;

    // Simple validation checks
    if (!name || !email || !jersey || !size || quantity <= 0) {
        alert("Please fill out all fields correctly.");
        event.preventDefault(); // Prevent form submission
        return false;
    }
    
    // Confirmation message
    alert(`Thank you, ${name}! Your order for ${quantity} ${size} ${jersey} will be processed shortly.`);
    return true; // Allow form submission
}

// Event listener for the form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.order-form form');
    form.addEventListener('submit', validateForm);
});
