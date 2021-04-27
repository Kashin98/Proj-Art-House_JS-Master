// Get Item and Set Item

const setStoredProducts = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

const getStoredProducts = (item) => {
  let storedProducts = localStorage.getItem(item);
  if (storedProducts) {
    storedProducts = JSON.parse(localStorage.getItem(item));
  } else {
    storedProducts = [];
  }
  return storedProducts;
};

const getDate = () => {
  const date = document.getElementById("date");
  const dateObject = new Date();
  date.textContent = dateObject.getFullYear();
};

export { getStoredProducts, setStoredProducts, getDate };
