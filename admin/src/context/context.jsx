/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import PropTypes from "prop-types";
import { assets } from "../assets/admin_assets/assets";
export const ContextAPI = createContext();

const ContextProvider = ({ children }) => {
  const value = {
    assets,
  };
  return <ContextAPI.Provider value={value}>{children}</ContextAPI.Provider>;
};
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
