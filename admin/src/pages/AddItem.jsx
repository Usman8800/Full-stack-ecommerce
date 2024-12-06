import { useContext, useState } from "react";
import SidePanel from "../components/SidePanel";
import { ContextAPI } from "../context/context";
import axios from "axios";
import { backend_url } from "../App";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
const AddItem = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("Men");
  const [subCategory, setsubCategory] = useState("Topwear");
  const [price, setprice] = useState("");
  const [sizes, setsizes] = useState([]);
  const [bestSeller, setbestSeller] = useState(false);
  const { assets } = useContext(ContextAPI);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("bestSellers", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backend_url + "/api/product/addProduct",
        formData,
        { headers: { token } }
      );
      console.log(response);

      if (response.data.success === true) {
        toast.success(response.data.message);
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
        setdescription("");
        setname("");
        setprice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message )
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SidePanel />

      {/* Main Content Area */}
      <form onSubmit={onSubmitHandler} className="flex flex-col flex-1">
        {/* Form Section */}
        <main className="flex-grow p-6 overflow-auto">
          <div className="max-w-4xl bg-gray-50 rounded-md p-6">
            {/* Upload Image Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div className="flex gap-2">
                <label className="w-24" htmlFor="image1">
                  <img
                    className="w-full"
                    src={
                      !image1 ? assets.upload_area : URL.createObjectURL(image1)
                    }
                    alt=""
                  />
                  <input
                    type="file"
                    onChange={(e) => setImage1(e.target.files[0])}
                    id="image1"
                    hidden
                  />
                </label>
                <label className="w-24" htmlFor="image2">
                  <img
                    className="w-24"
                    src={
                      !image2 ? assets.upload_area : URL.createObjectURL(image2)
                    }
                    alt=""
                  />

                  <input
                    type="file"
                    id="image2"
                    hidden
                    onChange={(e) => setImage2(e.target.files[0])}
                  />
                </label>
                <label className="w-24" htmlFor="image3">
                  <img
                    className="w-24"
                    src={
                      !image3 ? assets.upload_area : URL.createObjectURL(image3)
                    }
                    alt=""
                  />
                  <input
                    type="file"
                    id="image3"
                    hidden
                    onChange={(e) => setImage3(e.target.files[0])}
                  />
                </label>
                <label className="w-24" htmlFor="image4">
                  <img
                    className="w-24"
                    src={
                      !image4 ? assets.upload_area : URL.createObjectURL(image4)
                    }
                    alt=""
                  />
                  <input
                    type="file"
                    id="image4"
                    hidden
                    onChange={(e) => setImage4(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            {/* Product Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                onChange={(e) => setname(e.target.value)}
                value={name}
                type="text"
                placeholder="Type here"
                className="w-full border border-gray-300 bg-gray-50 rounded-md p-2 outline-none"
              />
            </div>

            {/* Product Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                placeholder="Write content here"
                rows={4}
                className="w-full border bg-gray-50 border-gray-300 rounded-md p-2 outline-none"
              ></textarea>
            </div>

            {/* Product Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Product Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Category
                </label>
                <select
                  onChange={(e) => setcategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 outline-none bg-gray-50"
                >
                  <option>Men</option>
                  <option>Women</option>
                  <option>Kids</option>
                </select>
              </div>

              {/* Sub Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub Category
                </label>
                <select
                  onChange={(e) => setsubCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 outline-none bg-gray-50"
                >
                  <option>Topwear</option>
                  <option>Bottomwear</option>
                  <option>Accessories</option>
                </select>
              </div>

              {/* Product Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Price
                </label>
                <input
                  onChange={(e) => setprice(e.target.value)}
                  value={price}
                  type="number"
                  placeholder="25"
                  className="w-full border border-gray-300 bg-gray-50 rounded-md p-2 outline-none"
                />
              </div>
            </div>

            {/* Product Sizes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Sizes
              </label>
              <div className="flex gap-3">
                <div
                  onClick={() =>
                    setsizes((prev) =>
                      prev.includes("S")
                        ? prev.filter((item) => item !== "S")
                        : [...prev, "S"]
                    )
                  }
                >
                  <p
                    className={`${
                      sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    S
                  </p>
                </div>
                <div
                  onClick={() =>
                    setsizes((prev) =>
                      prev.includes("M")
                        ? prev.filter((item) => item !== "M")
                        : [...prev, "M"]
                    )
                  }
                >
                  <p
                    className={`${
                      sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    M
                  </p>
                </div>
                <div
                  onClick={() =>
                    setsizes((prev) =>
                      prev.includes("L")
                        ? prev.filter((item) => item !== "L")
                        : [...prev, "L"]
                    )
                  }
                >
                  <p
                    className={`${
                      sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    L
                  </p>
                </div>
                <div
                  onClick={() =>
                    setsizes((prev) =>
                      prev.includes("XL")
                        ? prev.filter((item) => item !== "XL")
                        : [...prev, "XL"]
                    )
                  }
                >
                  <p
                    className={`${
                      sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    XL
                  </p>
                </div>
                <div
                  onClick={() =>
                    setsizes((prev) =>
                      prev.includes("XXL")
                        ? prev.filter((item) => item !== "XXL")
                        : [...prev, "XXL"]
                    )
                  }
                >
                  <p
                    className={`${
                      sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    XXL
                  </p>
                </div>
              </div>
            </div>

            {/* Bestseller Checkbox */}
            <div className="mb-6 flex items-center space-x-2">
              <input
                onChange={(e) => setbestSeller(e.target.checked)} // Fixes the checkbox
                checked={bestSeller}
                type="checkbox"
                id="bestseller"
                className="w-4 h-4"
              />
              <label htmlFor="bestseller" className="text-sm text-gray-700">
                Add to Bestseller
              </label>
            </div>

            {/* Add Button */}
            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
              ADD
            </button>
          </div>
        </main>
      </form>
    </div>
  );
};

export default AddItem;

// 8:36:27
AddItem.propTypes = {
  token: PropTypes.string.isRequired,
};
