import express from "express";
import {
  PlaceOrder,
  PlaceOrderRazorPay,
  PlaceOrderStripe,
  allOrders,
  userOrders,
  updateOrderStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/Auth.js";
const orderRouter = express.Router();

//admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

//payment features

orderRouter.post("/place", authUser, PlaceOrder);
orderRouter.post("/stripe", authUser, PlaceOrderStripe);
orderRouter.post("/razorpay", authUser, PlaceOrderRazorPay);

//user features

orderRouter.post("/userOrders", authUser, userOrders);

//verify stripe

orderRouter.post('/verifyStripe',authUser , verifyStripe)
export default orderRouter;
