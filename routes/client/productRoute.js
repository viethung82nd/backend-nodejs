const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/productController");
router.get("/", controller.index);

module.exports = router;
