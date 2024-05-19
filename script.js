// Add event listeners to "Add to Cart" buttons on product.html
const buyButtons = document.querySelectorAll('.buy-button');

buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.closest('tr');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const quantity = parseInt(product.querySelector('.quantity').value);

    // Get cart from localStorage or initialize if not present
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }

    // Store the updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  });
});

// Function to update the cart display on checkout.html
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const subtotalElement = document.getElementById('subtotal');
  const taxElement = document.getElementById('tax');
  const totalElement = document.getElementById('total');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;

  cartItems.innerHTML = ''; // Clear the cart display

    cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} (₱${item.price}) x ${item.quantity}`;
    cartItems.appendChild(listItem);
    subtotal += item.price * item.quantity;
  });

  const tax = subtotal * 0.02;
  const total = subtotal + tax;

  subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
  taxElement.textContent = `₱${tax.toFixed(2)}`;
  totalElement.textContent = `₱${total.toFixed(2)}`;
}

// Place order event handler
const placeOrderButton = document.getElementById('placeOrder');
placeOrderButton.addEventListener('click', () => {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const addressInput = document.getElementById('address');

  if (nameInput.value && emailInput.value && addressInput.value) {
    alert('Order placed successfully!');
    // Clear the cart and personal information fields
    localStorage.removeItem('cart');
    updateCart(); // Clear the cart display
    nameInput.value = '';
    emailInput.value = '';
    addressInput.value = '';
  } else {
    alert('Please fill in all required fields.');
  }
});

// Clear cart event handler
const clearCartButton = document.getElementById('clearCart');
clearCartButton.addEventListener('click', () => {
  localStorage.removeItem('cart');
  updateCart(); // Clear the cart display
});

// Ensure the cart is updated on page load (for checkout.html)
if (document.getElementById('cartItems')) {
  updateCart();
}