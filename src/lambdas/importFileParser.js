"use strict";

let csv = require("csv-parser");
const AWS = require("aws-sdk");
module.exports.handler = (event) => {
  try {
    const s3 = new AWS.S3({ region: "us-east-2" });
    const sqs = new AWS.SQS({ region: "us-east-2" });
    const queueUrl =
      "https://sqs.us-east-2.amazonaws.com/904597884993/catalogItemsQueue";
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
      const s3Stream = s3.getObject(params).createReadStream();

      s3Stream
        .pipe(
          csv({
            separator: ",",
            mapValues: ({ header, _, value }) => {
              if (header === "price") {
                return parseFloat(value); // Columna 'edad' como número
              } else if (header === "count") {
                return Number(value); // Columna 'peso' como flotante
              } else {
                return value; // Columnas restantes sin cambios
              }
            },
          })
        )
        .on("data", async (data) => {
          // Envia a SQS cada row leido del archivo CSV
          const sendMessageParams = {
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify(data),
            DelaySeconds: 2,
          };
          await sqs.sendMessage(sendMessageParams).promise();
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
          await s3.deleteObject(params).promise();
          console.log("Object deleted successfully");
          s3Stream.destroy();
        });
    }
    return { statusCode: 200, body: "File import process completed" };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
