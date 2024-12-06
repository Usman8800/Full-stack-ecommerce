//add product in cart

import user from "../models/userModel.js";

const addCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await user.findById(userId);
    let cartData = await userData.cartData;

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
 
    await user.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update user Cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    // Find the user by ID
    const userData = await user.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Get the user's cartData
    let cartData = userData.cartData || {};

    if (quantity === 0) {
      // Delete the specific size of the item if quantity is 0
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];

        // If the item no longer has any sizes, delete the item itself
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      // Update the cart if quantity is greater than 0
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }

    // Update the user document with the modified cartData
    await user.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.json({ success: false, message: error.message });
  }
};


//get user cart Data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await user.findById(userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addCart, updateCart, getUserCart };
