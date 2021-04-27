// Global Imports
import "../src/cart-js/toggleNavbar.js";
import "../src/cart-js/addToCart.js";
import {
  destructuredProducts,
  artStoreDestructure,
} from "../src/productDestructure.js";
import fetchProductsAPI from "../src/fetchProducts.js";
import displayProducts from "../src/displayProducts.js";
import { getDate } from "../src/utils.js";

const loading = document.querySelector(".page-loading");
const productDeck = document.querySelector(".product-deck");

const loadProducts = async () => {
  const products = await fetchProductsAPI();
  if (products) {
    artStoreDestructure(products.records);
    displayProducts(destructuredProducts, productDeck);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  loading.style.display = "none";
  loadProducts();
  getDate();
});

// -------------Product filters-------------
// Search Bar
const searchBar = document.getElementById("search");

searchBar.addEventListener("keyup", (e) => {
  const productTitles = productDeck.querySelectorAll(".card-title");
  productTitles.forEach((item) => {
    const searchValue = e.target.value.trim().toLowerCase();
    const productName = item.textContent.toLowerCase();
    const itemCategory = item.parentElement.parentElement.dataset.type
      .trim()
      .toLowerCase();

    // Made sure that search bar will filter category and title, this makes my filter btns slightly redundant, but it's a nice setup.
    if (
      productName.includes(searchValue) ||
      itemCategory.includes(searchValue)
    ) {
      item.parentElement.parentElement.style.display = "block";

      // Price Filter defaults back to 100 so it doesn't show old values while other filters are used
      priceFilter.value = 100;
      priceFilterValueDisplay.innerText = 100;
    } else {
      item.parentElement.parentElement.style.display = "none";
    }
  });
});

// Button Filter
const filterBtns = document.querySelectorAll(".btn-filter");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productCard = productDeck.querySelectorAll(".product-card");
    const btnValue = btn.textContent.trim().toLowerCase();
    productCard.forEach((item) => {
      const itemCategory = item.dataset.type.trim().toLowerCase();
      if (btnValue === "all") {
        console.log();
        item.style.display = "block";

        // Price Filter defaults back to 100 so it doesn't show old values while other filters are used
        priceFilter.value = 100;
        priceFilterValueDisplay.innerText = 100;
      } else {
        if (btnValue === itemCategory) {
          item.style.display = "block";
          priceFilter.value = 100;
          priceFilterValueDisplay.innerText = 100;
        } else {
          item.style.display = "none";
        }
      }
    });
  });
});

// Price Filter
const priceFilter = document.querySelector(".price-filter");
const priceFilterValueDisplay = document.getElementById("price-display");

priceFilter.addEventListener("input", (e) => {
  const priceValue = parseInt(e.target.value);
  priceFilterValueDisplay.innerText = priceValue;
  const productPrice = productDeck.querySelectorAll(".card-price");
  productPrice.forEach((price) => {
    const eachPriceValue = parseInt(price.textContent);
    if (priceValue >= eachPriceValue) {
      price.parentElement.parentElement.parentElement.style.display = "block";
    } else {
      price.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
});
