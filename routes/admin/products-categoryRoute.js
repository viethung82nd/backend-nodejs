const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("../../controller/admin/productsCategoryController");
const uploadToCloud = require("../../middlewares/admin/uploadToCloud");
const upload = multer();

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadToCloud.cloud,
  controller.createPost,
);

module.exports = router;
