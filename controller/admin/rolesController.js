const Role = require("../../models/roleModel");

module.exports.index = async (req, res) => {
  const find = { deleted: false };
  const records = await Role.find(find);
  res.render("admin/pages/roles/index", { records: records });
};

module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {});
};

module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  record.save();
  res.redirect("/admin/roles");
};

module.exports.permissions = async (req, res) => {
  const find = { deleted: false };
  const records = await Role.find(find);
  res.render("admin/pages/roles/permissions", { records: records });
};
