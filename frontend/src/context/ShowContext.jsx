/* eslint-disable react-hooks/exhaustive-deps */
/* @eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
export const ShowContext = createContext();

const ShowContextProvider = (props) => {
  const currency = "$";
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const DeliveryFee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItem, setCartItem] = useState({});
  const [productList, setProductList] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size.");
      return;
    }
    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);
    if (token) {
      try {
        await axios.post(
          backend_url + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        toast.success("item added");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const updateCartItem = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItem);
  
    // Handle deletion if quantity is 0
    if (quantity === 0) {
      // Delete from local state
      if (cartData[itemId]) {
        delete cartData[itemId][size];
  
        // If no sizes remain for the item, delete the item itself
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
      setCartItem(cartData);
    } else {
      // Update cart in local state
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
      setCartItem(cartData);
    }
  
    // Update the backend
    if (token) {
      try {
        await axios.post(
          backend_url + "/api/cart/update", // Same update route
          { itemId, size, quantity },
          { headers: { token } }
        );
  
        if (quantity === 0) {
          toast.success("Item removed from cart");
        } else {
          toast.success("Cart updated");
        }
      } catch (error) {
        console.error("Error updating cart in backend:", error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };
  
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backend_url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItem(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = productList.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(
        backend_url + "/api/product/listProducts"
      );
      console.log(response.data.allProducts);
      if (response.data.success) {
        setProductList(response.data.allProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);
  const value = {
    currency,
    DeliveryFee,
    search,
    showSearch,
    setSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
    getCartCount,
    assets,
    updateCartItem,
    getCartAmount,
    backend_url,
    productList,
    token,
    setToken,
    navigate,
  };

  return (
    <ShowContext.Provider value={value}>{props.children}</ShowContext.Provider>
  );
};

// Define PropTypes for validation
ShowContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ShowContextProvider;
