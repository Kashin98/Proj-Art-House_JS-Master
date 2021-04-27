import { airtableAPIKey } from "../src/fetchProducts.js";
import "../src/cart-js/toggleNavbar.js";
import "../src/cart-js/addToCart.js";
import "../src/setupCart.js";
import { addToCartJS } from "../src/setupCart.js";
import { getDate } from "../src/utils.js";

// SINGLE PRODUCT JS
const loading = document.querySelector(".page-loading");
const hero = document.querySelector(".single-product");
const headingTitle = document.querySelector(".product-title");
const pageTitle = document.getElementById("page-title");

window.addEventListener("DOMContentLoaded", async function () {
  loading.style.display = "none";
  getDate();
  hero.addEventListener("click", (e) => {
    if (e.target.classList.contains("buy-item")) {
      addToCartJS(e.target.dataset.id);
    }
  });

  const urlID = window.location.search
    .slice(4, window.location.search.length)
    .trim();
  try {
    const singleProductData = await fetch(
      `https://api.airtable.com/v0/appSeAhOv8fD8Eajo/Art/${urlID}?api_key=${airtableAPIKey}`
    );
    if (singleProductData.status >= 200 && singleProductData.status <= 299) {
      const singleProduct = await singleProductData.json();
      // Destructuring data
      const {
        id,
        fields: { color, name, price, image: img, description, artist },
      } = singleProduct;
      const image = img[0].thumbnails.large.url;

      //Creating Product Profile
      hero.insertAdjacentHTML(
        "afterbegin",
        `
      <!-- image -->
        <article class="align-self-center single-product-img col-6 m-3 text-center">
          <img class="single-product-img " width="100%" src="${image}" alt="" />
        </article>

        <!-- Details -->
        <article class="col-5 product-details py-4">
          <h2 class="product-name text-capitalize py-1">${name}</h2>
          <h4 class="artist  py-2">By ${artist}</h4>
          <h5 class="product-price py-3">$ ${price}</h5>
          <div class=" pb-2">
            <span style="background-color: ${color[0]}" class="dot"></span>
            <span style="background-color: ${color[1]}" class="dot"></span>
          </div>
          <p class="product-description pt-4">
            ${description}
          </p>
          <button class="btn btn-dark buy-item my-3" data-id="${id}">Add to Cart</button>
        </article>`
      );

      headingTitle.textContent = name;
      pageTitle.textContent = `${name.toUpperCase()} - Art House`;
    } else {
      hero.innerHTML = `
      <div class="text-center">
        <h3>SOMETHING WENT WRONG, PLEASE TRY AGAIN</h3>
        <h3>ERROR ${singleProductData.status} - ${singleProductData.statusText}</h3>        
      </div>
      `;
    }
  } catch (error) {
    console.log(error);
  }
});
