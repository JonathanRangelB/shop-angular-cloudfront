const ProductSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    price: { type: "number" },
    count: { type: "integer", minimum: 1, maximum: 1000 },
    description: { type: "string" },
  },
  required: ["title", "price", "count", "description"],
  additionalProperties: true,
};

module.exports = ProductSchema;
