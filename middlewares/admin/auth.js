const Account = require("../../models/AccountModel");
const Role = require("../../models/roleModel");

module.exports.requireAuth = async (req, res, next) => {
  // 1. Kiểm tra nếu user đã login qua Passport (Google)
  if (req.isAuthenticated()) {
    res.locals.user = req.user; // Đẩy thông tin user ra biến local để dùng ở View (Pug/EJS)
    return next();
  }

  // 2. Nếu không có Passport Session, kiểm tra Token trong Cookie (Login thông thường)
  if (req.cookies.token) {
    const user = await Account.findOne({ token: req.cookies.token }).select(
      "-password",
    );

    if (user) {
      res.locals.user = user;
      const role = await Role.findOne({ _id: user.roleId });
      res.locals.role = role; // Đẩy thông tin role ra biến local
      return next();
    }
  }

  // 3. Nếu cả 2 đều không có, đá về trang Login
  res.redirect("/admin/auth/login");
};
