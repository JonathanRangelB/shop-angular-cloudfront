"use strict";

const createProduct = require("./createProduct");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" }); // Configura la región de AWS
const sns = new AWS.SNS();
const topicArn = "arn:aws:sns:us-east-2:904597884993:createProductTopic";

exports.handler = async function (event) {
  let statusCode = 200;
  let body = "Exito";
  let shouldSendEmail = true;

  try {
    event.Records.forEach((record) => {
      createProduct.insertIntoDynamoDB(record).catch(() => {
        statusCode = 400;
        body = `Error durante la insercion para el elemento: ${record}`;
        shouldSendEmail = false;
      });
    });
    // const item = JSON.parse(event.Records[0].body);
    // console.log(item.title);
    if (shouldSendEmail) {
      const params = {
        TopicArn: topicArn,
        Message: `Los productos agregados son: ${event.Records.map((v) => {
          const { title, price, count } = JSON.parse(v.body);
          return `\nTitle: ${title}, Price: ${price}, Stock:  ${count}`;
        })}`,
        Subject: "Nuevos productos agregados",
      };
      await sns.publish(params).promise();
    }
  } catch (error) {
    statusCode = 500;
    body = JSON.stringify(error);
  }
  return {
    statusCode,
    body,
  };
};
