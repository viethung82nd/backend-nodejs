const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/authController");
const validate = require("../../validates/admin/auth");
const passport = require("../../config/passport");

router.get("/login", controller.login);
router.post("/login", validate.loginPost, controller.loginPost);
router.get("/logout", controller.logout);

// Bấm login google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/admin/auth/login",
  }),
  (req, res) => {
    res.redirect("/admin/dashboard");
  },
);
module.exports = router;
