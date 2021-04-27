import { addToCartJS } from "./setupCart.js";

const displayProducts = (mainProduct, element) => {
  element.innerHTML = mainProduct
    .map((product) => {
      const { id, name, price, type, image } = product;
      return `<div style="max-width: 600px" class="card product-card" data-type="${type}">
                <div class="card img">
                  <img
                    src="${image}"
                    alt="${name}"
                    class="card-img-top"
                  />
                  <div class="card-icons d-flex flex-row">
                    <a href="singleProduct.html?id=${id}" class="card-fa mx-3"
                      ><i class="fas fa-search"></i
                    ></a>
                    <button class="card-fa-btn mx-3" data-id="${id}"
                      ><i class="fas fa-shopping-cart buy-item" data-id="${id}"></i
                    ></button>
                  </div>
                </div>
                <div class="card-body text-center">
                  <h5 class="card-title">${name}</h5>
                  <p class="card-text">&dollar; <span class="card-price">${price}</span></p>
                </div>
              </div>
`;
    })
    .join("");
  element.addEventListener("click", (e) => {
    const value = e.target;
    if (
      value.classList.contains("card-fa-btn") ||
      value.classList.contains("buy-item")
    ) {
      addToCartJS(value.dataset.id);
    }
  });
};

export default displayProducts;
