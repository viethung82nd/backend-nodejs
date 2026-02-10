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

  // sort
  let sortQuery = { position: -1 }; // default

  if (req.query.sort) {
    const [field, order] = req.query.sort.split("-");
    sortQuery = {
      [field]: order === "asc" ? 1 : -1,
    };
  }
  // end sort

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
    .sort(sortQuery)
    .limit(objectPaging.limits)
    .skip(objectPaging.skip);

  res.render("admin/pages/products/index", {
    title: "Products",
    products: products,
    filterStatus: filterStatusHelper(req.query),
    keyword: req.query.keyword,
    paging: objectPaging,
    sort: req.query.sort,
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
    for (const element of idsArray) {
      switch (type) {
        case "active":
          await Product.updateOne({ _id: element }, { status: "active" });
          break;
        case "inactive":
          await Product.updateOne({ _id: element }, { status: "inactive" });
          break;
        case "delete":
          await Product.updateOne({ _id: element }, { deleted: true });
          break;
      }
    }
    if (type === "delete") {
      req.flash("success", "Xóa sản phẩm thành công");
    } else {
      req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
    }
  }

  res.redirect("/admin/products");
};

//admin/products/delete
module.exports.delete = async (req, res) => {
  await Product.updateOne({ _id: req.params.id }, { deleted: true });
  req.flash("success", "Xóa sản phẩm thành công");
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

//admin/products/edit
module.exports.edit = async (req, res) => {
  const find = {
    deleted: false,
    _id: req.params.id,
  };
  const product = await Product.findOne(find);
  res.render("admin/pages/products/edit", {
    product: product,
  });
};

//admin/products/edit
module.exports.editPatch = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  await Product.updateOne({ _id: req.params.id }, req.body);

  // ✅ redirect đúng route
  res.redirect(`/admin/products/edit/${req.params.id}`);
};

//admin/products/detail
module.exports.detail = async (req, res) => {
  const find = {
    deleted: false,
    _id: req.params.id,
  };
  const product = await Product.findOne(find);
  console.log(product);
  res.render("admin/pages/products/detail", { product: product });
};
