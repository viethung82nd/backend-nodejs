const Products = require("../../models/productModel");
const filterStatusHelper = require("../../helpers/filterStatus");
const pagingHelper = require("../../helpers/paging");
const Product = require("../../models/productModel");
const mongoose = require("mongoose");

// admin/products
module.exports.product = async (req, res) => {
  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  //search
  if (req.query.keyword) {
    find.title = {
      $regex: req.query.keyword,
      $options: "i", // i = ignore case
    };
  }
  //end search

  //paging
  const count = await Product.countDocuments(find);

  let objectPaging = pagingHelper(
    {
      currentPage: 1,
      limits: 4,
    },
    count,
    req.query,
  );
  //end paging

  const products = await Products.find(find)
    .sort({ position: "desc" })
    .limit(objectPaging.limits)
    .skip(objectPaging.skip);

  res.render("admin/pages/products/index", {
    title: "Products",
    products: products,
    filterStatus: filterStatusHelper(req.query),
    keyword: req.query.keyword,
    paging: objectPaging,
  });
};

//admin/products/change-status
module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;

  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
  res.redirect("/admin/products");
};

//admin/products/change-multi
module.exports.multiChangeStatus = async (req, res) => {
  const idsArray = req.body.ids.split(",").map((id) => id.trim());

  const type = req.body.type;
  if (type == "change-position") {
    for (const item of idsArray) {
      const [id, position] = item.split("-");
      await Product.updateOne({ _id: id }, { position: parseInt(position) });
      req.flash("success", "Cập nhật vị trí sản phẩm thành công");
    }
  } else {
    idsArray.forEach(async (element) => {
      switch (type) {
        case "active":
          await Product.updateOne({ _id: element }, { status: "active" });
          req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
          break;
        case "inactive":
          await Product.updateOne({ _id: element }, { status: "inactive" });
          req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
          break;
        case "delete":
          await Product.updateOne({ _id: element }, { deleted: true });
          req.flash("success", "Xóa sản phẩm thành công");
          break;
      }
    });
  }

  res.redirect("/admin/products");
};

//admin/products/delete
module.exports.delete = async (req, res) => {
  await Product.updateOne({ _id: req.params.id }, { deleted: true });
  res.redirect("/admin/products");
};

//admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create");
};

//admin/products/createPost
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);

  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  }
  const newProduct = new Product(req.body);

  await newProduct.save();
  res.redirect("/admin/products");
};
