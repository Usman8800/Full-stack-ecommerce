import SidePanel from "../components/SidePanel";
import { useContext } from "react";
import { ContextAPI } from "../context/context";
import axios from "axios";
import PropTypes from "prop-types";
import { backend_url } from "../App";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
const Orders = ({ token }) => {
  const { assets } = useContext(ContextAPI);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backend_url + "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchOrders();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-[20%]">
          <SidePanel />
        </div>
        <div className="w-[80%]">
          <div className="pr-8 py-8 w-full">
            <h1 className="font-bold text-gray-600 text-base">Order Page</h1>
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex w-full flex-wrap gap-3 justify-between items-center border-2 p-6 mt-6"
              >
                <div className=" w-[16%] flex items-center justify-center">
                  <img src={assets.parcel_icon} alt="" />
                </div>
                <div className=" w-[16%]">
                  <div className="pb-2 text-gray-800 font-bold">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return (
                          <p key={index}>
                            {item.name} X {item.quantity}{" "}
                            <span>{item.size}</span>{" "}
                          </p>
                        );
                      } else {
                        <p key={index}>
                          {item.name} X {item.quantity} <span>{item.size}</span>{" "}
                          ,
                        </p>;
                      }
                    })}
                  </div>
                  <h1 className="pb-2 text-gray-800 font-bold">
                    {order.address.firstName + " " + order.address.lastName}
                  </h1>
                  <h1 className="pb-1 text-gray-800 ">
                    {order.address.street + ","}
                  </h1>
                  <h1 className="pb-1 text-gray-800">
                    {order.address.city + "," + order.address.state}
                  </h1>
                  <h1 className="pb-1 text-gray-800">
                    {order.address.country + "," + order.address.zipcode}
                  </h1>
                  <h1 className="pb-1 text-gray-800">{order.address.phone}</h1>
                </div>
                <div className=" w-[16%]">
                  <h1 className="pb-2 text-gray-800 font-bold">
                    Item: {order.items.length}
                  </h1>
                  <h1 className="pb-1 text-gray-800">
                    Method: {order.paymentMethod}
                  </h1>
                  <h1 className="pb-1 text-gray-800">
                    Payment : {order.payment ? "Done" : "Pending"}
                  </h1>
                  <h1 className="pb-1 text-gray-800">
                    Date : {new Date(order.date).toLocaleDateString()}
                  </h1>
                </div>
                <div className=" w-[16%]">${order.amount}</div>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="p-2 outline-none w-[16%]"
                >
                  <option>Order Placed</option>
                  <option>Packing</option>
                  <option>Shipped</option>
                  <option>Out of Delivery</option>
                  <option>Delivered</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

Orders.propTypes = {
  token: PropTypes.string.isRequired,
};
export default Orders;
