import { useContext, useEffect, useState } from "react";
import { ShowContext } from "../context/ShowContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, showSearch, setSearch, setShowSearch } =
    useContext(ShowContext);

  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <>
      <div className="border-t border-b text-center bg-gray-50 mb-3">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-lg w-3/4 sm:w-1/2">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 outline-none bg-inherit text-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <img src={assets.search_icon} className="w-4 " alt="" />
        </div>
        <img
          src={assets.cross_icon}
          className="inline w-3 cursor-pointer"
          onClick={() => setShowSearch(false)}
          alt=""
        />
      </div>
    </>
  ) : null;
};

export default SearchBar;
