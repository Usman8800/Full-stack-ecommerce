import { useContext } from "react";
import { ContextAPI } from "../context/context";
import { NavLink } from "react-router";

const SidePanel = () => {
  const { assets } = useContext(ContextAPI);

  return (
    <>
      <div className="w-[70px] md:w-[250px] flex justify-end pt-4 min-h-screen border-r">
        <div>
          <NavLink
            to="/addItems"
            className={({ isActive }) =>
              `flex gap-4 w-14 md:w-56 border border-gray-300 border-r-0 rounded pl-4 py-2 mt-4 ${
                isActive ? "bg-pink-100 border border-pink-500" : ""
              }`
            }
          >
            <img className="w-5" src={assets.add_icon} alt="" />
            <h1 className="hidden md:block font-sans text-sm">Add Items</h1>
          </NavLink>
          <NavLink
            to="/listItems"
            className={({ isActive }) =>
              `flex gap-4 w-14 md:w-56 border border-gray-300 border-r-0 rounded pl-4 py-2 mt-4 ${
                isActive ? "bg-pink-100 border border-pink-500" : ""
              }`
            }
          >
            <img className="w-5 opacity-85" src={assets.order_icon} alt="" />
            <h1 className="hidden md:block font-sans text-sm">List Items</h1>
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex gap-4 w-14 md:w-56 border border-gray-300 border-r-0 rounded pl-4 py-2 mt-4 ${
                isActive ? "bg-pink-100 border border-pink-500" : ""
              }`
            }
          >
            <img className="w-5 opacity-85" src={assets.order_icon} alt="" />
            <h1 className="hidden md:block font-sans text-sm">Orders</h1>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
