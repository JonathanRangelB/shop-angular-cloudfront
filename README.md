# Shop Angular Cloudfront

Angular version: ~12.

Repo maintainers:

- [Sergey Gultyayev](https://github.com/gultyayev)

## The purpose

The repository was created to have an Angular version of e-shop for EPAM NodeJS AWS course. At the same time we strive to make this repository follows best practices so it may be used as a starter for new projects with all the necessary toolings already set up.

## NodeJS AWS course integration

All the necessary API endpoints are in the environments files `environment.ts` (for dev builds). Also it contains feature flags to enable/disable endpoints invocations from within the app so to ensure that you don't get errors for not implemented API endpoints.

## Contribution

Create an issue with the detailed description of the improvement/issue.

If you would like to help implementing some feature, you should ask the maintainers for approval so to ensure that the feature is desired in the repository and no efforts go wasted.

## Get up and running

Prerequisites: NodeJS v14.20.x and higher

Follow the steps:

- git clone
- npm i
- ng serve

## Task 2

S3 website (index html) [HERE](https://shop-angular-cloudfront3850.s3.us-east-2.amazonaws.com/index.html)
FrontCloud [HERE](https://d33qx0l55b7uyl.cloudfront.net/)
Swagger [HERE](https://k74k9eskp6.execute-api.us-east-2.amazonaws.com/swagger)

## Task 3

Endpoints created:

- Get all products [GET](https://k74k9eskp6.execute-api.us-east-2.amazonaws.com/products)
- Get product by ID [GET](https://k74k9eskp6.execute-api.us-east-2.amazonaws.com/products/dbb935ca-81c3-4647-a392-5f18c91973a4)

## Task 4

Changes on endpoints:

- Get all products [GET](https://k74k9eskp6.execute-api.us-east-2.amazonaws.com/products)
- Get product by ID [GET](https://k74k9eskp6.execute-api.us-east-2.amazonaws.com/products/dbb935ca-81c3-4647-a392-5f18c91973a4)
- Create new product [POST](https://k74k9eskp6.execute-api.us-east-2.amazonaws.com/products)

now the products are being stored on dynamoDB instead a plain JSON file.
using [AJV](https://ajv.js.org/) to make validations on new products creation, mandatory should have "title", "price", "count", "description"
