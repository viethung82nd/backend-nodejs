const dashboardRoutes = require("./dashboardRoute");
const productRoutes = require("./productRoute");
const accountsRoutes = require("./accountsRoute");
const rolesRoutes = require("./roleRoute");
const productsCategoryRoutes = require("./products-categoryRoute");
const authRoutes = require("./authRoute");

module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoutes);
  app.use("/admin/products", productRoutes);
  app.use("/admin/products-category", productsCategoryRoutes);
  app.use("/admin/roles", rolesRoutes);
  app.use("/admin/accounts", accountsRoutes);
  app.use("/admin/auth", authRoutes);
};
