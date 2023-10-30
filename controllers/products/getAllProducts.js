const  basedir  = global;
const { Product } = require(`../../schemas/products`);


const getAllProducts = async (req, res, next) => {
    const result = await Product.find(); 
    res.json(result)
    
};


module.exports = getAllProducts;
