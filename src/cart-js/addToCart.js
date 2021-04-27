// Add To Cart

const cartItems = document.querySelector(".main-cart");

const addToCartDOM = (product) => {
  const { id, amount, name, price, image } = product;
  const newCartItemDOM = document.createElement("div");
  newCartItemDOM.setAttribute("data-id", id);
  newCartItemDOM.classList.add(
    "single-cart-item",
    "d-flex",
    "mt-5",
    "align-items-center"
  );

  newCartItemDOM.innerHTML = `
  <div style="max-width: 200px" class="col-5">
    <img
      class="cart-img"
      width="100%"
      src="${image}"
      alt=""
    />
  </div>
  <div class="details col-5">
    <h5 class="cart-item-name">${name}</h5>
    <h5 class="cart-item-price">
      $${price}
    </h5>
    <button class="btn remove-item">remove item</button>
  </div>
  <div class="cart-item-counter col-2 text-center">
    <button class="btn cart-item-increase" data-id="${id}">
      <i class="fas fa-chevron-up" data-id="${id}"></i>
    </button>
    <h3 class="cart-item-count" >${amount}</h3>
    <button class="btn cart-item-decrease" data-id="${id}">
      <i class="fas fa-chevron-down" data-id="${id}"></i>
    </button>
  </div>
  `;

  cartItems.appendChild(newCartItemDOM);
};

export { addToCartDOM };
