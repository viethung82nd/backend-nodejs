const Product = require("../../models/productModel");

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  });

  console.log(products);

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
