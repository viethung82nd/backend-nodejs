const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("../../controller/admin/productController");
const storageMulter = require("../../helpers/storageMulter");

const upload = multer({ storage: storageMulter });

router.get("/", controller.product);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.multiChangeStatus);
router.delete("/delete/:id", controller.delete);
router.get("/create", controller.create);
router.post("/create", upload.single("thumbnail"), controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.single("thumbnail"), controller.editPatch);

module.exports = router;
