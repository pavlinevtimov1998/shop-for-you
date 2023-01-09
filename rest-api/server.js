const express = require("express");
const dotenv = require("dotenv");

dotenv.config({
  path: __dirname + "/config.env",
});

const config = require("./config/config");
const router = require("./router");
const expressConfig = require("./config/express");
const { initDB } = require("./config/database");

async function startServer() {
  const app = express();

  await initDB(config.DB_URL);

  expressConfig(app, express);

  app.use("/api", router);

  // app.use("*", (req, res) => {
  //   res.sendFile(__dirname + "/public/index.html");
  // });

  app.listen(config.PORT, () =>
    console.log(`Server listening on port ${config.PORT}...`)
  );
}

startServer();
