const json = require("../jsonData");

const { Product } = require("../db");

const addProductDB = async () => {
  try {
    let product = await Product.findAll();
    if (product.length === 0) {
      await Product.bulkCreate(json.panes);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addProductDB,
};
