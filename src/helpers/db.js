const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
});

const db = new AWS.DynamoDB.DocumentClient();
module.exports = db;
