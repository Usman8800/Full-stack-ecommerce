import { v2 as cloudinary } from "cloudinary";
import productCatlog from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSellers,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3 , image4].filter(
      (item) => item !== undefined
    );

    let imageURL = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestSellers: bestSellers === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imageURL,
      date: Date.now(),
    };

    console.log(productData);
    const product = new productCatlog(productData);
    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const listProducts = async (req, res) => {
  try {
    const allProducts = await productCatlog.find({});
    res.json({
      success: true,
      allProducts,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const removeProduct = async (req, res) => {
  try {
    await productCatlog.findByIdAndDelete(req.body.id)
    res.json({
      success:true,message : "removed Successfuly"
    })
  } catch (error) {
      console.log(error)
      res.json({
        succes:true,
        message:error.message
      })
  }
};
const singleProduct = async (req, res) => {
  try {
      const {productId} = req.body;
      const product = await productCatlog.findById(productId);
      res.json({
        success:true,
        product
      })
  } catch (error) {
      console.log(error)
      res.json({
        success:true,message:error.message
      })
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
