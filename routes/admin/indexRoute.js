const dashboardRoutes = require("./dashboardRoute");
const productRoutes = require("./productRoute");

module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoutes);
  app.use("/admin/products", productRoutes);
};
