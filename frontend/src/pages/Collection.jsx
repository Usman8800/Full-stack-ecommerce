/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* @eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { assets, products } from "../assets/frontend_assets/assets";
import Cards from "../components/Cards";
import { ShowContext } from "../context/ShowContext";
const Collection = () => {
  const [showfilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [subCategory, setSubCategory] = useState([]);
  const { search, showSearch , productList } = useContext(ShowContext);
  const [card, setCard] = useState([]);
  useEffect(() => {
    setCard(productList);
  }, []);
  const toggleCatogries = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const subToggleCatogries = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = productList.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Update the card state
    setCard(productCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch , productList]);

  const sortProduct = () => {
    let filterProductCopy = card.slice();

    switch (sortType) {
      case "low-high":
        setCard(filterProductCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setCard(filterProductCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProduct();
  }, [sortType]);
  return (
    <>
      {/* make them flex */}
      <div className="flex flex-col md:flex-row mt-6">
        <div className="w-full md:w-[20%]">
          <div
            onClick={() => setShowFilter(!showfilter)}
            className=" flex gap-3  items-center text-xl font-bold pb-6"
          >
            FILTERS
            <img
              className={`h-3 md:hidden transition-all ease-out ${
                showfilter ? `rotate-90` : ""
              }`}
              src={assets.dropdown_icon}
              alt=""
            />
          </div>
          <div
            className={`p-4 border border-gray-400 mb-8 ${
              showfilter ? "" : "hidden md:block"
            }`}
          >
            <h1 className="font-bold">CATEGORIES</h1>
            <div className="flex gap-3">
              <input type="checkbox" value={"Men"} onChange={toggleCatogries} />{" "}
              Men
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value={"Women"}
                onChange={toggleCatogries}
              />{" "}
              Women
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value={"Kids"}
                onChange={toggleCatogries}
              />{" "}
              kids
            </div>
          </div>
          <div
            className={`p-4 border border-gray-400 mb-8 ${
              showfilter ? "" : "hidden md:block"
            }`}
          >
            <h1 className="font-bold">TYPE</h1>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value={"Topwear"}
                onChange={subToggleCatogries}
              />{" "}
              Topwear
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value={"Bottomwear"}
                onChange={subToggleCatogries}
              />{" "}
              Bottomwear
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                value={"Winterwear"}
                onChange={subToggleCatogries}
              />{" "}
              Winterwear
            </div>
          </div>
          <div></div>
        </div>
        <div className=" w-full md:w-[80%] ">
          <div>
            <div className="flex flex-col md:flex-row justify-between px-4">
              <div className="flex gap-2 justify-center items-center">
                <div className="text-xl sm:text-3xl text-[#707070] font-bold uppercase">
                  ALL <span className="text-[#343434]">COLLECTIONS</span>
                </div>
                <div className="w-12 h-0.5 rounded-lg bg-[#414141]"></div>
              </div>
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="outline-none mt-5 md:mt-0 px-3 py-3"
              >
                <option value="relavant">Sort by : Relavant</option>
                <option value="low-high">Sort by : Low to High</option>
                <option value="high-low">Sort by : High to Low</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center gap-x-20 mt-8 flex-wrap">
            {card.map((e, index) => (
              <div key={index}>
                <Cards
                  id={e._id}
                  price={e.price}
                  image={e.image[0]}
                  name={e.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
