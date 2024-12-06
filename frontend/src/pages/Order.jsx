/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShowContext } from "../context/ShowContext";
import axios from "axios";

const Order = () => {
  const { backend_url, token } = useContext(ShowContext);

  const [orderData, setorderData] = useState([]);

  const getUserOrders = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backend_url + "/api/order/userOrders",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        let allorderItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allorderItem.push(item);
          });
        });
        setorderData(allorderItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, [token]);
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row gap-2 items-center mb-4 mx-4 sm:mx-10 mt-10">
        <div className="text-lg sm:text-xl lg:text-2xl text-[#707070] font-bold uppercase">
          MY <span className="text-[#343434]">ORDERS</span>
        </div>
        <div className="w-12 h-0.5 rounded-lg bg-[#414141]"></div>
      </div>

      {/* Orders Section */}
      <div className="max-w-screen-xl mx-auto mb-10 px-4 sm:px-6 lg:px-8">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row justify-between border-b border-t py-4 sm:py-6 my-6 items-center gap-4"
          >
            {/* Product Info */}
            <div className="flex gap-3 items-center w-full lg:w-[425px]">
              <div className="flex-shrink-0">
                <img
                  className="w-20 sm:w-24 lg:w-28 rounded-md object-cover"
                  src={item.image[0]}
                  alt={item.name}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <h1 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
                  {item.name}
                </h1>
                <h1 className="flex flex-wrap gap-2 text-gray-600 font-semibold text-xs sm:text-sm lg:text-base">
                  <span>${item.price}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Size: {item.size}</span>
                </h1>
                <h1 className="text-gray-400 text-xs sm:text-sm">
                  <span className="text-gray-800 font-medium">Date: </span>
                  {new Date(item.date).toDateString()}
                </h1>
                <h1 className="text-gray-400 text-xs sm:text-sm">
                  <span className="text-gray-800 font-medium">Payment: </span>
                  {item.paymentMethod}
                </h1>
              </div>
            </div>

            {/* Order Status */}
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="text-gray-800">{item.status}</div>
            </div>

            {/* Track Order */}
            <div>
              <button
                onClick={getUserOrders}
                className="px-4 sm:px-6 py-2 bg-gray-100 hover:bg-gray-200 text-sm sm:text-base border rounded-md"
              >
                Track order
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Order;
