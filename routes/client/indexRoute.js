const productRoutes = require("./productRoute");
const homeRoutes = require("./homeRoute");

module.exports = (app) => {
  app.use("/", homeRoutes);
  app.use("/products", productRoutes);
};
