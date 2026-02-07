const Products = require("../../models/productModel");
const filterStatusHelper = require("../../helpers/filterStatus");
const pagingHelper = require("../../helpers/paging");
const ProductsCategory = require("../../models/productsCategoryModel");
const mongoose = require("mongoose");

// admin/products-category
module.exports.index = async (req, res) => {
  const find = { deleted: false };

  function buildTree(categories, parentId = "") {
    let result = [];

    categories.forEach((item) => {
      if (item.parentId === parentId) {
        const children = buildTree(categories, item._id.toString());

        if (children.length > 0) {
          item.children = children;
        }
        result.push(item);
      }
    });

    return result;
  }

  const records = await ProductsCategory.find(find);

  const newRecords = buildTree(records);

  res.render("admin/pages/products-category/index", {
    title: "Products Category",
    records: newRecords,
  });
};

// admin/products-category/create
module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  };
  function buildTree(categories, parentId = "") {
    let result = [];

    categories.forEach((item) => {
      if (item.parentId === parentId) {
        const children = buildTree(categories, item._id.toString());
        if (children.length > 0) {
          item.children = children;
        }
        result.push(item);
      }
    });

    return result;
  }

  const records = await ProductsCategory.find(find);

  const newRecords = buildTree(records);

  res.render("admin/pages/products-category/create", {
    records: newRecords,
  });
};

// admin/products-category/createPost
module.exports.createPost = async (req, res) => {
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countProducts = await ProductsCategory.countDocuments();
    req.body.position = countProducts + 1;
  }

  const newProduct = new ProductsCategory(req.body);
  await newProduct.save();
  res.redirect("/admin/products-category");
};
