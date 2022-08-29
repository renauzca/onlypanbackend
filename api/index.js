const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { addProductDB } = require("./src/controllers/index.js");

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, async () => {
    await addProductDB();
    console.log("%s listening at 3001");
  });
});
