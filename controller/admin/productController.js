const Products = require("../../models/productModel");

module.exports.product = async (req, res) => {
  const products = await Products.find({
    deleted: false,
  });

  console.log(products);
  res.render("admin/pages/products/index", {
    title: "Products",
    products: products,
  });
};
