const Product = require("../models/productModel");

module.exports = (objectPaging, count, query) => {
  if (query.page) {
    objectPaging.currentPage = parseInt(query.page);
  }

  objectPaging.skip = (objectPaging.currentPage - 1) * objectPaging.limits;

  const totalPage = Math.ceil(count / objectPaging.limits);
  objectPaging.totalPage = totalPage;

  return objectPaging;
};
