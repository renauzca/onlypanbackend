const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { addProductDB } = require("./src/controllers/index.js");

conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    await addProductDB();
    console.log("Productos agregados a db");
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
