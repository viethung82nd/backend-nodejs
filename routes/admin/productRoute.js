const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/productController");

router.get("/", controller.product);
router.patch("/change-status/:status/:id", controller.changeStatus);

module.exports = router;
