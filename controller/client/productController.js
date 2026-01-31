const Product = require("../../models/productModel");

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  const newProducts = products.map((item) => {
    item.priceNew = (
      item.price -
      (item.price * item.discountPercentage) / 100
    ).toFixed(0);
    return item;
  });

  res.render("client/pages/products/index", {
    title: "Products Page",
    products: newProducts,
  });
};

module.exports.detail = async (req, res) => {
  const find = {
    deleted: false,
    status: "active",
    slug: req.params.slug,
  };

  const product = await Product.findOne(find);

  res.render("client/pages/products/detail", { product: product });
};
