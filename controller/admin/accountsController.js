const Account = require("../../models/AccountModel");
const Role = require("../../models/roleModel");
const md5 = require("md5");

module.exports.index = async (req, res) => {
  const records = await Account.find({ deleted: false });

  for (const record of records) {
    const role = await Role.findOne({
      deleted: false,
      _id: record.roleId,
    });
    record.role = role;
  }
  res.render("admin/pages/accounts/index", { accounts: records });
};
module.exports.create = async (req, res) => {
  const records = await Role.find({ deleted: false });
  res.render("admin/pages/accounts/create", { records: records });
};
module.exports.createPost = async (req, res) => {
  const emailExisted = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExisted) {
    req.flash("danger", "Tài khoản đã tồn tại");
    res.redirect("/admin/accounts/create");
  } else {
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);
    await record.save();
    req.flash("success", "Tạo tài khoản thành công");

    res.redirect("/admin/accounts");
  }
};
