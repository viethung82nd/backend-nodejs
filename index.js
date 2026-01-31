const express = require("express");
const routeAdmin = require("./routes/admin/indexRoute");
const route = require("./routes/client/indexRoute");
const methodOverride = require("method-override");
var flash = require("express-flash");
const database = require("./config/database");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");

require("dotenv").config();
(async () => {
  await database.connect();
})();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

//Flash library
app.use(cookieParser("viethung"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//End Flash library

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));

route(app);
routeAdmin(app);
module.exports = app;

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
