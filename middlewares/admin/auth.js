const Account = require("../../models/AccountModel");
const Role = require("../../models/roleModel");

module.exports.requireAuth = async (req, res, next) => {
  try {
    // 1. Kiểm tra token trong cookie
    if (req.cookies?.token) {
      const user = await Account.findOne({ token: req.cookies.token }).select(
        "-password",
      );

      if (user) {
        res.locals.user = user;

        const role = await Role.findById(user.roleId);
        res.locals.role = role;

        return next();
      }
    }

    // 2. Nếu không có token → redirect login
    return res.redirect("/admin/auth/login");
  } catch (error) {
    console.error(error);
    return res.redirect("/admin/auth/login");
  }
};
