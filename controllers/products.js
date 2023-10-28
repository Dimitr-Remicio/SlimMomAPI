const Products = require("../schemas/products.js");


const listProducts = async () => {
  try {
      const data = await Products.find({categories: 'cereals'});
    return data;
  } catch (error) {
    console.error("database error:", error);
  }
};


module.exports = {
  listProducts,
};