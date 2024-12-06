import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: Array,
  category: String,
  subCategory: String,
  sizes: Array,
  bestSellers: Boolean,
  date: Number,
});
const productCatlog = mongoose.model("product" , productSchema)

export default productCatlog

