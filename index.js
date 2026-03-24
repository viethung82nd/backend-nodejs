// const express = require("express");
// const routeAdmin = require("./routes/admin/indexRoute");
// const route = require("./routes/client/indexRoute");
// const methodOverride = require("method-override");
// var flash = require("express-flash");
// const database = require("./config/database");
// const bodyParser = require("body-parser");
// var cookieParser = require("cookie-parser");
// var session = require("express-session");

// require("dotenv").config();
// (async () => {
//   await database.connect();
// })();

// const app = express();
// const port = process.env.PORT;

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(methodOverride("_method"));

// //Flash library
// app.use(cookieParser("viethung"));
// app.use(session({ cookie: { maxAge: 60000 } }));
// app.use(flash());
// //End Flash library

// app.set("views", `${__dirname}/views`);
// app.set("view engine", "pug");
// app.use(express.static(`${__dirname}/public`));

// route(app);
// routeAdmin(app);

// module.exports = app;

const express = require("express");
const routeAdmin = require("./routes/admin/indexRoute");
const route = require("./routes/client/indexRoute");
const methodOverride = require("method-override");
const flash = require("express-flash");
const database = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(cookieParser("viethung"));
app.use(
  session({
    secret: "mySecretKey", // bắt buộc
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 giờ
    },
  }),
);

app.use(flash());

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));

// tinymce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce")),
);
// end tinymce

// 🚀 CONNECT DB → RỒI MỚI GẮN ROUTE
(async () => {
  try {
    await database.connect();
    console.log("✅ MongoDB connected");

    route(app);
    routeAdmin(app);

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Cannot connect to MongoDB", error);
  }
})();
