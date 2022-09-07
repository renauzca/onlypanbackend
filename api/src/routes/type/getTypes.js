const { Product } = require("../../db");

const getTypes = async (req, res) => {
  try {
    const product = await Product.findAll();
    const productType = product.map(t=> t.dataValues.type)
    const allProduct = new Set(productType)
    let all = []
    
    for (const item of allProduct) {
      all.push(item)
    }
    
    res.send(all)
  } catch (error) {
    res.status(404).send(error)
  }
};

module.exports = {
  getTypes,
};
