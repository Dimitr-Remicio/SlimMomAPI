const { Schema, model } = require("mongoose");

const daySchema = new Schema(
  {
    date: {
      type: Date,
    },
    productsId: [{
      type: Schema.Types.ObjectId,
      ref: "Product",
    }],
    sumId: { type: Schema.Types.ObjectId, ref: "Summary" },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    weight: {
      type: Number,
      default: 0,
    },
    calories: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);
const DaySchema = model("Day", daySchema);

module.exports = DaySchema;
