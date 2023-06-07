const { v4: uuidv4 } = require("uuid");
const dynamoInstance = require("../helpers/db");
const validate = require("../helpers/validate");
const schema = require("../schemas/product.schema");

async function handler(event) {
  insertIntoDynamoDB(event);
}

async function insertIntoDynamoDB(event) {
  try {
    const productInfo = JSON.parse(event.body);
    const validateResult = validate(schema, productInfo);

    if (validateResult.errors) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: JSON.stringify(validateResult.errors),
        }),
      };
    }

    const productObj = { id: uuidv4(), ...productInfo };
    const { count } = productInfo;
    delete productObj?.count;

    const productTable = {
      TableName: process.env.PRODUCTS_TABLE,
      Item: productObj,
    };
    const productStockTable = {
      TableName: process.env.STOCKS_TABLE,
      Item: {
        product_id: productObj.id,
        count,
      },
    };

    await Promise.all([
      dynamoInstance.put(productTable).promise(),
      dynamoInstance.put(productStockTable).promise(),
    ]);

    return {
      statusCode: 201,
      body: JSON.stringify({ "Producto agregado exitosamente": productObj.id }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message),
    };
  }
}

module.exports = {
  handler,
  insertIntoDynamoDB,
};
