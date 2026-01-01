const express = require("express");
const routeAdmin = require("./routes/admin/indexRoute");
const route = require("./routes/client/indexRoute");
const database = require("./config/database");

require("dotenv").config();
database.connect();

const app = express();
const port = process.env.PORT;
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
