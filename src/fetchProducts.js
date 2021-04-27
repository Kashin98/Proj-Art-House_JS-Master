// Fetch products from API
const airtableAPIKey = "keyfOSK7FIFH5EqpH";
const allProductsAPI = `https://api.airtable.com/v0/appSeAhOv8fD8Eajo/Art/?api_key=${airtableAPIKey}`;

const fetchProductsAPI = async () => {
  const response = await fetch(allProductsAPI).catch((err) => console.log(err));
  if (response) {
    return response.json();
  }
  return response;
};

export default fetchProductsAPI;
export { airtableAPIKey };
