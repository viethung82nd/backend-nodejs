const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/accountsController");
const multer = require("multer");

const uploadToCloud = require("../../middlewares/admin/uploadToCloud");
const upload = multer();

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("avatar"),
  uploadToCloud.cloud,
  controller.createPost,
);

module.exports = router;
