const Role = require("../../models/roleModel");
const Account = require("../../models/AccountModel");
const md5 = require("md5");

module.exports.login = async (req, res) => {
  res.render("admin/pages/auth/login");
};

module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  const emailExisted = await Account.findOne({
    deleted: false,
    email: email,
  });

  if (!emailExisted) {
    req.flash("warning", "Email không tồn tại");
    res.redirect("/admin/auth/login");
    return;
  }

  if (md5(password) != emailExisted.password) {
    req.flash("warning", "Sai password");
    res.redirect("/admin/auth/login");
    return;
  }
  if (emailExisted.status == "inactive") {
    req.flash("warning", "Tài khoản đã bị khóa");
    res.redirect("/admin/auth/login");
    return;
  }

  res.cookie("token", emailExisted.token);
  res.redirect("/admin/dashboard");
};
