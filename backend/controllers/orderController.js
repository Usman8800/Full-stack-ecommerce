// PLacing Order using COD method

import orderModel from "../models/orderModel.js";
import user from "../models/userModel.js";
import Stripe from "stripe";

//global variables
const currency = "inr";
const deliveryCharge = 10;

//gateway initializing

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PlaceOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "COD",
      payment: false,
      address,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await user.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "order placed",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Placing order using Stripe

const PlaceOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      address,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if(success === 'true'){
      await orderModel.findByIdAndUpdate(orderId , {payment:'true'})
      await user.findByIdAndUpdate(userId , {cartData:{}})
      res.json({success:true  })
    }else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  } catch (error) {
      console.log(error)
      res.json({success:false , message : error.message})
  }
};

//Placing order using RazorPay

const PlaceOrderRazorPay = async (req, res) => {};

//all orders data for admin panel

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//user order data from fronend

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update order status from admin panel
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  PlaceOrder,
  PlaceOrderRazorPay,
  PlaceOrderStripe,
  allOrders,
  userOrders,
  updateOrderStatus,
  verifyStripe,
};
