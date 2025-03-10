// Get cart elements
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
let cart = [];

// Function to update the cart display
function updateCartDisplay() {
  cartItemsContainer.innerHTML = '';

  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = parseFloat(item.price);
    total += itemTotal;

    // Create a container for each cart item
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');

    // Item details
    const itemDetails = document.createElement('p');
    itemDetails.innerText = `${item.product} | Color: ${item.color} | Mods: ${item.mods} | $${item.price}`;
    
    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.classList.add('btn');
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      updateCartDisplay();
    };

    cartItemDiv.appendChild(itemDetails);
    cartItemDiv.appendChild(removeBtn);
    cartItemsContainer.appendChild(cartItemDiv);
  });

  cartTotalDisplay.innerText = `Total: $${total.toFixed(2)}`;
}

// Add to cart event
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.getAttribute('data-product');
    const price = button.getAttribute('data-price');
    const colorSelectId = button.getAttribute('data-color-id');
    const modsSelectId = button.getAttribute('data-mods-id');

    const colorSelect = document.getElementById(colorSelectId);
    const modsSelect = document.getElementById(modsSelectId);

    const colorValue = colorSelect.value;
    const modsValue = modsSelect.value;

    // Adjust price based on mods if desired
    // Example: + $20 if "Both" is selected
    let finalPrice = parseFloat(price);
    if (modsValue === 'Back Buttons') {
      finalPrice += 10;
    } else if (modsValue === 'Click Triggers') {
      finalPrice += 10;
    } else if (modsValue === 'Both') {
      finalPrice += 20;
    }

    // Create a cart item object
    const cartItem = {
      product: product,
      price: finalPrice.toFixed(2),
      color: colorValue,
      mods: modsValue
    };

    // Add to cart array
    cart.push(cartItem);

    // Update cart display
    updateCartDisplay();
  });
});

// Simple checkout button
const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Proceeding to checkout (placeholder). In a real site, redirect to payment.');
});
