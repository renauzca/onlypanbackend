const { Type } = require("../../db");
const json = require("../../jsonData");

const getTypes = async (req, res) => {
  try {
    const product = json.panes;
    const productType = product.map(t=> t.type)
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
