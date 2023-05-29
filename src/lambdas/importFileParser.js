"use strict";

let csv = require("csv-parser");
const AWS = require("aws-sdk");
module.exports.handler = async (event) => {
  try {
    const s3 = new AWS.S3({ region: "us-east-2" });
    const records = event.Records;
    const recordsLength = records.length;

    const bucket = process.env.BUCKET_DATA_NAME;
    if (recordsLength === 0) {
      console.log("No records to process");
      throw new Error();
    }
    for (const record of records) {
      console.log(`Processing File: ${record.s3.object.key}`);
      const params = {
        Bucket: bucket,
        Key: record.s3.object.key,
      };
      console.log(params);
      const s3Stream = s3.getObject(params).createReadStream();

      s3Stream
        .pipe(csv({ separator: "," }))
        .on("data", (data) => {
          console.log(data);
        })
        .on("end", async () => {
          console.log(`Copying from ${bucket}/${record.s3.object.key}`);
          await s3
            .copyObject({
              Bucket: bucket,
              CopySource: `${bucket}/${record.s3.object.key}`,
              Key: record.s3.object.key.replace("uploaded", "parsed"),
            })
            .promise();
          console.log(params);
          await s3.deleteObject(params).promise();
          console.log("Object deleted successfully");
          s3Stream.destroy();
        });
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
