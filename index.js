const express = require("express");
const route = require("./routes/client/indexRoute");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

route(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
