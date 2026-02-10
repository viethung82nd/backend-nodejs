const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/authController");
const validate = require("../../validates/admin/auth");

router.get("/login", controller.login);
router.post("/login", validate.loginPost, controller.loginPost);

module.exports = router;
