// Destructuring and cleaning up json data

import { getStoredProducts, setStoredProducts } from "./utils.js";

let destructuredProducts = getStoredProducts("allProducts");
const artStoreDestructure = (products) => {
  destructuredProducts = products.map((product) => {
    const {
      id,
      fields: { display, color, name, price, type, image: img },
    } = product;
    let image = "";
    if (price && name && img && img.length > 0) {
      image = img[0].thumbnails.large.url;
      return { display, id, color, name, price, type, image };
    }
  });
  setStoredProducts("allProducts", destructuredProducts);
};

const findSpecificProduct = (id) => {
  const filteredProduct = destructuredProducts.find(
    (singleProduct) => singleProduct.id === id
  );
  return filteredProduct;
};

export { destructuredProducts, artStoreDestructure, findSpecificProduct };
