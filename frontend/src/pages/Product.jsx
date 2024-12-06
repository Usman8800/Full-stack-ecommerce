/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShowContext } from "../context/ShowContext";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { addToCart , productList } = useContext(ShowContext);
  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState("");
  const fetchProductData = async () => {
    const foundProduct = productList.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, productList]);
  if (!productData) {
    return <div>Loading...</div>; // Display loading or a placeholder while productData is null
  }
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row gap-4 px-4">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 justify-center flex flex-col lg:flex-row gap-4 mt-10 items-center lg:items-start">
          <img
            src={productData.image[0]}
            alt="thumbnail"
            className="w-24 h-28 lg:w-28 lg:h-32 object-cover"
          />
          <img
            src={productData.image[0]}
            alt="main"
            className="w-full lg:w-[60%] object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 mt-10">
          {/* Product Title */}
          <h1 className="text-xl lg:text-2xl font-semibold text-center lg:text-left">
            {productData.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center justify-center lg:justify-start mt-2">
            <span className="text-red-500 font-bold text-lg">★★★★★</span>
            <span className="text-gray-500 ml-2">(122)</span>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold mt-4 text-center lg:text-left">
            ${productData.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 mt-2 text-center lg:text-left">
            {productData.description}
          </p>

          {/* Select Size */}
          <div className="mt-6 text-center lg:text-left">
            <h3 className="text-lg font-semibold">Select Size</h3>
            <div className="flex justify-center lg:justify-start gap-4 mt-2">
              {productData.sizes.map((size) => (
                <button
                  onClick={() => setSize(size)}
                  key={size}
                  className="px-4 py-2 border border-gray-300 rounded hover:border-black focus:border-black focus:outline-none"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="text-center lg:text-left">
            <button
              onClick={() => addToCart(productData._id, size)}
              className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
            >
              ADD TO CART
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-sm text-gray-600 text-center lg:text-left">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-8 px-4 lg:px-16">
        {/* Tabs */}
        <div className="flex justify-center lg:justify-start gap-8 border-b-2 pb-2">
          <button className="text-black font-semibold border-b-2 border-black">
            Description
          </button>
          <button className="text-gray-500 hover:text-black">
            Reviews (122)
          </button>
        </div>

        {/* Description Content */}
        <div className="mt-4">
          <p className="text-gray-700 text-sm lg:text-base">
            {productData.description}
          </p>
          <p className="text-gray-700 text-sm lg:text-base mt-4">
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <div className="flex gap-2 justify-center items-center">
            <div className="text-xl sm:text-3xl text-[#707070] font-bold uppercase">
              Related <span className="text-[#343434]">Products</span>
            </div>
            <div className="w-12 h-0.5 rounded-lg bg-[#414141]"></div>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-center gap-6 mt-6 mb-2">
            {/* Product Cards */}
            <RelatedProducts
              category={productData.category}
              subCategory={productData.subCategory}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
