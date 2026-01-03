const Products = require("../../models/productModel");

module.exports.product = async (req, res) => {
  const filterStatus = [
    {
      name: "All",
      status: "",
      class: "",
    },
    {
      name: "Active",
      status: "active",
      class: "",
    },
    {
      name: "Inactive",
      status: "inactive",
      class: "",
    },
  ];

  if (req.query.status) {
    const index = filterStatus.findIndex(
      (item) => item.status == req.query.status
    );
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => item.status == "");
    filterStatus[index].class = "active";
  }

  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const products = await Products.find(find);

  res.render("admin/pages/products/index", {
    title: "Products",
    products: products,
    filterStatus: filterStatus,
  });
};
