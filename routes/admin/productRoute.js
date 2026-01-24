const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/productController");

router.get("/", controller.product);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.multiChangeStatus);
router.delete("/delete/:id", controller.delete);
router.get("/create", controller.create);
router.post("/create", controller.createPost);

module.exports = router;
