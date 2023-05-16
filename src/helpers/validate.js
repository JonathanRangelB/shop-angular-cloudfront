const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true });

const validate = (schema, data) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) console.log(ajv.errorsText(validate.errors, { separator: "\n" }));
  return valid
    ? data
    : { errors: ajv.errorsText(validate.errors, { separator: "\n" }) };
};

module.exports = validate;
