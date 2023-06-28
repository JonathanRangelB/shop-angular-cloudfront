const generatePolicyDocument = (effect, resource) => ({
  Version: "2012-10-17",
  Statement: [
    {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: [resource],
    },
  ],
});

const generateResponse = (principalId, effect, resource) => ({
  principalId,
  policyDocument: generatePolicyDocument(effect, resource),
});

module.exports.handler = (event, _, callback) => {
  const { headers, routeArn } = event;

  const authToken = headers?.authorization?.split("Basic ")[1];

  if (!authToken) {
    console.log("ERROR");
    return callback(null, generateResponse("Foo", "Deny", routeArn));
  }

  const decodedToken = Buffer.from(authToken, "base64").toString();
  const [user, password] = decodedToken.split(":");

  if (process.env[user] !== password) {
    console.log("ERROR");
    return callback(null, generateResponse("Foo", "Deny", routeArn));
  }

  console.log(
    "SUCCESS",
    JSON.stringify(generateResponse("test", "Allow", routeArn), null, 2)
  );
  return callback(null, generateResponse("Foo", "Allow", routeArn));
};
