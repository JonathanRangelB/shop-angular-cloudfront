const products = require("./src/assets/products.json");

module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(products, null, 2),
  };
};
