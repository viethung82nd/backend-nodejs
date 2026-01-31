const Product = require("../../models/productModel");

module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      deleted: false,
    }).sort({ position: "desc" });

    const newProducts = products.map((item) => {
      const price = item.price || 0;
      const discount = item.discountPercentage || 0;

      item.priceNew = (price - (price * discount) / 100).toFixed(0);

      return item;
    });

    res.render("client/pages/products/index", {
      title: "Products Page",
      products: newProducts,
    });
  } catch (err) {
    console.error("❌ Products error:", err);
    res.status(500).send("Internal Server Error");
  }
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
