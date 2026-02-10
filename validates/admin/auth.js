module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("warning", "Vui lòng nhập email!");
    res.redirect("/admin/auth/login");
    return;
  }
  if (!req.body.password) {
    req.flash("warning", "Vui lòng nhập password!");
    res.redirect("/admin/auth/login");
    return;
  }

  next();
};
