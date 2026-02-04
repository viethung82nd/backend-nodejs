var slug = require("mongoose-slug-updater");
var mongoose = require("mongoose");
mongoose.plugin(slug);

const productsCategorySchema = new mongoose.Schema(
  {
    title: String,
    parentId: {
      type: String,
      default: "",
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
      type: Boolean,
      default: false,
    },
    slug: { type: String, slug: "title", unique: true },
  },
  { timestamps: true },
);

const ProductsCategory = mongoose.model(
  "ProductsCategory",
  productsCategorySchema,
  "categories",
);

module.exports = ProductsCategory;
