const json = require("../jsonData");

const { Product } = require("../db");

const addProductDB = async () => {
  try {
    await Product.bulkCreate(json.panes);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addProductDB,
}; 
