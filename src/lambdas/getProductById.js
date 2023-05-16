"use strict";

const dynamoInstance = require("../helpers/db");
module.exports.handler = async (event, context) => {
  console.info("EVENT\n" + JSON.stringify(event, null, 2));
  console.log(context.logStreamName);
  const { productId } = event.pathParameters;
  try {
    const product = await dynamoInstance
      .get({
        TableName: process.env.PRODUCTS_TABLE,
        Key: {
          id: productId,
        },
      })
      .promise();
    const productStock = await dynamoInstance.get({
      TableName: process.env.STOCKS_TABLE,
      Key: {
        product_id: productId,
      },
    });
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
