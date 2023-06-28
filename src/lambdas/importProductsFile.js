"use strict";

const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
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
      body: JSON.stringify(url),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify("An error has occurred: \t " + error?.message),
    };
  }
};
