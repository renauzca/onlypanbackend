const json = require("../jsonData");

const { Product, User } = require("../db");

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

const addUserDB = async(req, res) => {
  try {
    let user = await User.findAll();
    user&await User.bulkCreate(json.users)
  } catch (error) {
    res.status(400).send({msg:error})
  }
}

module.exports = {
  addProductDB,
  addUserDB
};
