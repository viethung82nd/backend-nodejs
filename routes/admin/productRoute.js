const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("../../controller/admin/productController");
const uploadToCloud = require("../../middlewares/admin/uploadToCloud");
const upload = multer();

router.get("/", controller.product);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.multiChangeStatus);
router.delete("/delete/:id", controller.delete);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadToCloud.cloud,
  controller.createPost,
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadToCloud.cloud,
  controller.editPatch,
);
router.get("/detail/:id", controller.detail);

module.exports = router;
