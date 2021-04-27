import { getStoredProducts, setStoredProducts } from "../src/utils.js";
import { findSpecificProduct } from "../src/productDestructure.js";
import { addToCartDOM } from "../src/cart-js/addToCart.js";

const cartNavCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".main-cart");
const cartTotal = document.querySelector(".total-price");

let cart = getStoredProducts("cart");
const addToCartJS = (id) => {
  // checks if cart has item added, if not, searches for it from destructured array and makes new entry
  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    let product = findSpecificProduct(id);
    // As it creates new entry it adds a new property amount as 1
    product = { ...product, amount: 1 };
    cart = [...cart, product];

    // add item to DOM
    addToCartDOM(product);
  } else {
    const amount = updateItemCount(id);
    const items = [...cartItems.querySelectorAll(".cart-item-count")];
    const newAmount = items.find(
      (value) => value.parentElement.parentElement.dataset.id === id
    );
    newAmount.textContent = amount;
  }
  displayCartAmt();
  displayCartCount();

  // Add items local storage as cart
  setStoredProducts("cart", cart);
};

// Cart Item Count Setter
const displayCartAmt = () => {
  const cartNavCountValue = cart.reduce((total, items) => {
    return (total += items.amount);
  }, 0);
  cartNavCount.textContent = cartNavCountValue;
};

// Cart Total Price Setter
const displayCartCount = () => {
  const cartTotalValue = cart.reduce((total, items) => {
    return (total += items.price * items.amount);
  }, 0);
  cartTotal.textContent = `$${cartTotalValue.toFixed(2)}`;
};

// Add All Items To Dom
const displayCartItemsDOM = () => {
  cart.forEach((cartItems) => {
    addToCartDOM(cartItems);
  });
};

// Update Item Count
function updateItemCount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
  // return newAmt;
}
// Decrease Item Count
function decreaseItem(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });

  return newAmount;
  // return newAmt;
}

// remove Item
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

// All Button Functionality
function setupCartFunctionality() {
  cartItems.addEventListener("click", function (e) {
    const value = e.target;
    // Remove Item
    if (value.classList.contains("remove-item")) {
      const id = value.parentElement.parentElement.dataset.id;
      removeItem(id);
      value.parentElement.parentElement.remove();
    }

    // Increase item Value
    if (
      value.classList.contains("cart-item-increase") ||
      value.classList.contains("fa-chevron-up")
    ) {
      const id = value.dataset.id;
      const newAmt = updateItemCount(id);
      if (value.classList.contains("cart-item-increase")) {
        value.nextElementSibling.textContent = newAmt;
      }
      if (value.classList.contains("fa-chevron-up")) {
        value.parentElement.nextElementSibling.textContent = newAmt;
      }
    }

    // Decrease item Value
    if (
      value.classList.contains("cart-item-decrease") ||
      value.classList.contains("fa-chevron-down")
    ) {
      const id = value.dataset.id;
      const newAmt = decreaseItem(id);

      if (value.classList.contains("cart-item-decrease")) {
        if (newAmt === 0) {
          value.parentElement.parentElement.remove();
          removeItem(id);
        } else {
          value.previousElementSibling.textContent = newAmt;
        }
      }
      if (value.classList.contains("fa-chevron-down")) {
        if (newAmt === 0) {
          value.parentElement.parentElement.parentElement.remove();
          removeItem(id);
        } else {
          value.parentElement.previousElementSibling.textContent = newAmt;
        }
      }
    }
    displayCartAmt();
    displayCartCount();
    setStoredProducts("cart", cart);
  });
}

const init = () => {
  displayCartAmt();
  displayCartCount();
  displayCartItemsDOM();
  setupCartFunctionality();
};
init();

export { addToCartJS };
