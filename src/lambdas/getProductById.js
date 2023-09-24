"use strict";

const dynamoInstance = require("../helpers/db");
module.exports.handler = async (event) => {
  const { productId } = event.pathParameters;

  const productParams = {
    TableName: process.env.PRODUCTS_TABLE,
    Key: {
      id: productId,
    },
  };
  const productStockParams = {
    TableName: process.env.STOCKS_TABLE,
    Key: {
      product_id: productId,
    },
  };

  try {
    const product = await dynamoInstance.get(productParams).promise();
    const productStock = await dynamoInstance.get(productStockParams).promise();
    if (!product.Item) {
      throw new Error("Product not found");
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ ...product.Item, ...productStock.Item }),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
