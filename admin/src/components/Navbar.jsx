import { useContext } from "react";
import { ContextAPI } from "../context/context";
import { Link } from "react-router";
import PropTypes from "prop-types";

const Navbar = ({ setToken }) => {
  const { assets } = useContext(ContextAPI);

  
  return (
    <>
      <div className="flex justify-between px-4 sm:px-20 py-2 items-center ">
        <img className="w-24 sm:w-36" src={assets.logo} alt="" />
        <Link
          onClick={()=>setToken('')}
          className="px-6 py-2 rounded-full text-base bg-gray-700 text-white hover:opacity-80 text-light "
        >
          Logout
        </Link>
      </div>
      <hr />
    </>
  );
};
Navbar.propTypes = {
  setToken: PropTypes.node.isRequired,
};

export default Navbar;
