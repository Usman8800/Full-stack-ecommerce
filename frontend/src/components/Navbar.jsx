import CartIcon from "../assets/frontend_assets/cart_icon.png";
import SearchIcon from "../assets/frontend_assets/search_icon.png";
import ProfileIcon from "../assets/frontend_assets/profile_icon.png";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { ShowContext } from "../context/ShowContext";
const Navbar = () => {
  const [visible, setvisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItem,
  } = useContext(ShowContext);
  const Logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
    
  };

  const handleSearchIconClick = () => {
    setShowSearch(true); // Open the search bar
    navigate("/collection"); // Navigate to the collection page
  };

  return (
    <>
      <div className="flex justify-around items-center py-6 border-b-2 border-gray-300">
        <img className="xs:w-24 w-36  cursor-none" src={assets.logo} alt="" />
        <div className="hidden md:flex gap-10 font-medium">
          <NavLink
            to={"/"}
            className="text-base cursor-pointer flex flex-col gap-1 items-center"
          >
            HOME
            <hr className="w-3/4 border-none h-[2px] bg-gray-700 hidden " />
          </NavLink>
          <NavLink
            to={"/collection"}
            className="textbase cursor-pointer flex flex-col gap-1 items-center"
          >
            COLLECTION
            <hr className="w-3/4 border-none h-[2px] bg-gray-700 hidden " />
          </NavLink>
          <NavLink
            to={"/about"}
            className="text-base cursor-pointer flex flex-col gap-1 items-center"
          >
            ABOUT
            <hr className="w-3/4 border-none h-[2px] bg-gray-700 hidden " />
          </NavLink>
          <NavLink
            to={"/contact"}
            className="text-base cursor-pointer flex flex-col gap-1 items-center"
          >
            CONTACT
            <hr className="w-3/4 border-none h-[2px] bg-gray-700 hidden " />
          </NavLink>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex gap-6 items-center">
            {/* Search Icon */}
            <img
              onClick={handleSearchIconClick} // Handle search click
              className="w-6 cursor-pointer"
              src={SearchIcon}
              alt="search"
            />
            <div className="group relative ">
              <img
                onClick={() => (token ? null : navigate("/login"))}
                className="w-6 cursor-pointer"
                src={ProfileIcon}
                alt="Profile"
              />
              {token && (
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-gray-50 shadow-2xl text-gray-500 rounded">
                    <p className="cursor-pointer hover:text-black font-semibold">
                      My profile
                    </p>
                    <p onClick={()=>navigate('/order')} className="cursor-pointer hover:text-black font-semibold">
                      Orders
                    </p>
                    <p
                      onClick={Logout}
                      className="cursor-pointer hover:text-black font-semibold"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
            <Link to={"/cart"} className="relative">
              <img className="w-6 cursor-pointer" src={CartIcon} alt="cart" />
              <p className="absolute right-[-5px] bottom-[-7px] w-5 leading-4 bg-black text-white aspect-square rounded-full text-[10px]  font-bold flex items-center justify-center">
                {getCartCount()}
              </p>
            </Link>
          </div>
          <img
            onClick={() => setvisible(true)}
            src={assets.menu_icon}
            className="w-6 cursor-pointer md:hidden"
            alt=""
          />

          {/* Sidebar menu for small screen */}
          <div
            className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
              visible ? `w-full` : `w-0`
            }`}
          >
            <div className="flex flex-col text-gray-600">
              <div
                onClick={() => setvisible(false)}
                className="flex gap-4 p-3 pt-6 items-center"
              >
                <img
                  src={assets.cross_icon}
                  className="w-6 rotate-180"
                  alt=""
                />
                <p>Back</p>
              </div>
              <NavLink
                onClick={() => setvisible(false)}
                className="py-2 text-xl pl-6 border"
                to="/"
              >
                HOME
              </NavLink>
              <NavLink
                onClick={() => setvisible(false)}
                className="py-2 text-xl pl-6 border"
                to="/collection"
              >
                COLLECTION
              </NavLink>
              <NavLink
                onClick={() => setvisible(false)}
                className="py-2 text-xl pl-6 border"
                to="/about"
              >
                ABOUT
              </NavLink>
              <NavLink
                onClick={() => setvisible(false)}
                className="py-2 text-xl pl-6 border"
                to="/contact"
              >
                CONTACT
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
