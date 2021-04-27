// Toggle navbar
const cartIcon = document.querySelector(".shopping-cart");
const cartSidebar = document.querySelector(".cart-setup");
const cartClose = document.querySelector(".cart-close-btn");
const content = document.querySelector(".content");

cartIcon.parentElement.addEventListener("click", () => {
  cartSidebar.classList.add("show-cart");
});

cartClose.addEventListener("click", () => {
  cartSidebar.classList.remove("show-cart");
});

content.addEventListener("click", () => {
  if (cartSidebar.classList.contains("show-cart")) {
    cartSidebar.classList.remove("show-cart");
  }
});
