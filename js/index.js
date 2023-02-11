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

const featuredDeck = document.querySelector(".featured-deck");

const loadProducts = async () => {
  const products = await fetchProductsAPI();
  if (products) {
    artStoreDestructure(products.records);
    const mainDisplay = destructuredProducts.filter((displayProduct) => {
      if (displayProduct) {
        return displayProduct.display === "yes";
      }
    });
    displayProducts(mainDisplay, featuredDeck);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  getDate();
});

export { loadProducts };
