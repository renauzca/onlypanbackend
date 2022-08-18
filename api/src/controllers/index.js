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
<<<<<<< HEAD
}; 
=======
};
>>>>>>> 7dd1fec86e391870666062e8ab0e128bee152bc0
