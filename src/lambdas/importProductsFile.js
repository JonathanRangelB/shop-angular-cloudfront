"use strict";

const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
  },
});

var s3 = new AWS.S3();

module.exports.handler = async (event) => {
  const { name } = event.queryStringParameters;
  const bucket = process.env.BUCKET_DATA_NAME;

  const params = {
    Bucket: bucket,
    Key: `uploaded/${name}`,
    Expires: 60,
    ContentType: "text/csv",
  };

  try {
    const url = s3.getSignedUrl("putObject", params);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "text/csv",
        "Access-Control-Allow-Methods": "PUT",
      },
      body: JSON.stringify(url),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify("An error has occurred: \t " + error?.message),
    };
  }
};
