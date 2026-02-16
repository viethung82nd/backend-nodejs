const dashboardRoutes = require("./dashboardRoute");
const productRoutes = require("./productRoute");
const accountsRoutes = require("./accountsRoute");
const rolesRoutes = require("./roleRoute");
const productsCategoryRoutes = require("./products-categoryRoute");
const authRoutes = require("./authRoute");
const authMiddleware = require("../../middlewares/admin/auth");

module.exports = (app) => {
  app.use("/admin/dashboard", authMiddleware.requireAuth, dashboardRoutes);
  app.use("/admin/products", authMiddleware.requireAuth, productRoutes);
  app.use(
    "/admin/products-category",
    authMiddleware.requireAuth,
    productsCategoryRoutes,
  );
  app.use("/admin/roles", authMiddleware.requireAuth, rolesRoutes);
  app.use("/admin/accounts", authMiddleware.requireAuth, accountsRoutes);
  app.use("/admin/auth", authRoutes);
};
