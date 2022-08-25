const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { addProductDB, addUserDB } = require("./src/controllers/index.js");

conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    await addProductDB();
    await addUserDB();
    console.log("%s listening at 3001");
  });
});
