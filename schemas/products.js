const { Schema, model } = require("mongoose");

const product = new Schema(
  {
    categories: {
      type: String,
    },
    weight: {
      type: Number,
    },
    title: {
      type: String,
    },
    calories: {
      type: String,
    },
    groupBloodNotAllowed: [Boolean],
  },
  { versionKey: false, timestamps: true }
);
const ProductSchema = model("Product", product);

module.exports = ProductSchema;
