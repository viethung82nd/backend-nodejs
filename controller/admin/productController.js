const Products = require("../../models/productModel");
const filterStatusHelper = require("../../helpers/filterStatus");

module.exports.product = async (req, res) => {
  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  if (req.query.keyword) {
    find.title = {
      $regex: req.query.keyword,
      $options: "i", // i = ignore case
    };
  }

  const products = await Products.find(find);

  res.render("admin/pages/products/index", {
    title: "Products",
    products: products,
    filterStatus: filterStatusHelper(req.query),
    keyword: req.query.keyword,
  });
};
