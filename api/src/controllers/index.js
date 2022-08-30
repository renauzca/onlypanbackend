const json = require("../jsonData");
const jwt = require("jsonwebtoken");
const auth = require("../routes/User/auth");
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

const addUser = async (req, res) => {
  let admin = await User.findAll({ where: { rol: "admin" } });
  if (admin.length === 0) {
    try {
      User.create({
        image:
          "https://th.bing.com/th/id/OIP.DfGkWFqoP4UZ7BYCCTetIAAAAA?w=180&h=180&c=7&r=0&o=5&pid=1.7",
        name: "admin",
        password: "admin",
        email: "onlypanarg1999@gmail.com",
        rol: "admin",
      });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  addProductDB,
  addUser,
};
