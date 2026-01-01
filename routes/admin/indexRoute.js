const dashboardRoutes = require("./dashboardRoute");

module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoutes);
};
