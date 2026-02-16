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

module.exports.permissionsPatch = async (req, res) => {
  const permissionsArray = JSON.parse(req.body.permissions);
  for (const item of permissionsArray) {
    await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
  }
  res.redirect("/admin/roles/permissions");
};
