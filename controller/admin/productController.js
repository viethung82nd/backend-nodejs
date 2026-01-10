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
    req.query
  );
  //end paging

  const products = await Products.find(find)
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
  res.redirect("/admin/products");
};

//admin/products/change-multi
module.exports.multiChangeStatus = async (req, res) => {
  const idsArray = req.body.ids.split(",").map((id) => id.trim());
  idsArray.forEach(async (element) => {
    await Product.updateOne({ _id: element }, { status: req.body.type });
  });

  res.redirect("/admin/products");
};

//admin/products/delete
module.exports.delete = async (req, res) => {
  await Product.updateOne({ _id: req.params.id }, { deleted: true });
  res.redirect("/admin/products");
};
