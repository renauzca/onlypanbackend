require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize = new Sequelize("postgresql://postgres:Xw5StqivQYYOOLZQIqUH@containers-us-west-22.railway.app:6493/railway", {
        logging: false,
        native: false,
      });

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  User,
  Product,
  Type,
  Order,
  Review,
  OrderProducts,
  Cart,
  ProductCart,
  Favorite,
} = sequelize.models;

User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

Product.belongsToMany(Cart, { through: ProductCart });
Cart.belongsToMany(Product, { through: ProductCart });

Product.belongsToMany(Order, { through: OrderProducts });
Order.belongsToMany(Product, { through: OrderProducts });

User.belongsToMany(Product, { through: Favorite });
Product.belongsToMany(User, { through: Favorite });

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

Product.belongsToMany(Type, { through: 'type' });
Type.belongsToMany(Product, { through: 'type' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
