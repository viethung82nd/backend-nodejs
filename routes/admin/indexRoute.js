const dashboardRoutes = require("./dashboardRoute");
const productRoutes = require("./productRoute");
const rolesRoutes = require("./roleRoute");
const productsCategoryRoutes = require("./products-categoryRoute");

module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoutes);
  app.use("/admin/products", productRoutes);
  app.use("/admin/products-category", productsCategoryRoutes);
  app.use("/admin/roles", rolesRoutes);
};
