// const Product = require("../models/User");
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// const ProductSchema = mongoose.Schema({
//   name: String,
//   details: String,
//   image: String,
//   price: String,
// });

const CompanySchema = mongoose.Schema({
  name: String,
  // products: [ProductSchema],
});

module.exports = mongoose.model("Company", CompanySchema);
