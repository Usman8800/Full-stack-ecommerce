import stripe from "../assets/frontend_assets/stripe_logo.png";
import razorpay from "../assets/frontend_assets/razorpay_logo.png";
import { useContext, useState } from "react";
import { ShowContext } from "../context/ShowContext";
import { toast } from "react-toastify";
import axios from "axios";
const DeliveryAndPayment = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backend_url,
    token,
    cartItem,
    setCartItem,
    getCartAmount,
    productList,
  } = useContext(ShowContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              productList.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount(),
      };
      switch (method) {
        case "cod": {
          const response = await axios.post(
            backend_url + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItem({});
            navigate("/order");
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case "stripe": {
          const responseStripe = await axios.post(
            backend_url + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
            console.log(responseStripe.data);
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:flex-row gap-8 justify-center items-start pt-10 pb-[90px] px-4"
      >
        {/* Delivery Information */}
        <div className="w-full lg:w-1/2 pt-1 lg:pt-14">
          <div className="flex gap-2 items-center mb-4">
            <div className="text-md sm:text-xl lg:text-2xl text-[#707070] font-bold uppercase">
              DELIVERY <span className="text-[#343434]">INFORMATION</span>
            </div>
            <div className="w-12 h-0.5 rounded-lg bg-[#414141]"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First name"
              className="border p-2 rounded-md outline-none"
              required
            />
            <input
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last name"
              className="border p-2 rounded-md outline-none"
              required
            />
            <input
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
              type="email"
              placeholder="Email address"
              className="border p-2 rounded-md outline-none col-span-1 sm:col-span-2"
              required
            />
            <input
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
              type="text"
              placeholder="Street"
              className="border p-2 rounded-md outline-none col-span-1 sm:col-span-2"
              required
            />
            <input
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
              className="border p-2 rounded-md outline-none"
              required
            />
            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State"
              className="border p-2 rounded-md outline-none"
              required
            />
            <input
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="text"
              placeholder="Zipcode"
              className="border p-2 rounded-md outline-none"
              required
            />
            <input
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
              className="border p-2 rounded-md outline-none"
              required
            />
            <input
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
              type="text"
              placeholder="Phone"
              className="border p-2 rounded-md outline-none col-span-1 sm:col-span-2"
              required
            />
          </div>
        </div>

        {/* Cart Totals */}
        <div className="w-full lg:w-1/3 pt-1 lg:pt-14">
          <div className="flex gap-2 items-center mb-4">
            <div className="text-lg sm:text-xl lg:text-2xl text-[#707070] font-bold uppercase">
              CART <span className="text-[#343434]">TOTALS</span>
            </div>
            <div className="w-12 h-0.5 rounded-lg bg-[#414141]"></div>
          </div>
          <div className="p-4 border rounded-md shadow-md">
            <div className="flex justify-between border-b py-1 items-center mb-4">
              <span className="text-[#343434] font-medium">Subtotal</span>
              <span className="text-[#707070]">$188.00</span>
            </div>
            <div className="flex justify-between border-b py-1 items-center mb-4">
              <span className="text-[#343434] font-medium">Shipping Fee</span>
              <span className="text-[#707070]">$10.00</span>
            </div>
            <div className="flex justify-between items-center border-b py-1 font-bold text-[#343434] mb-4">
              <span>Total</span>
              <span>$198.00</span>
            </div>
            <div>
              <h3 className="font-bold mb-2">Payment Method</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div
                  onClick={() => setMethod("stripe")}
                  className="cursor-pointer flex items-center gap-2 border rounded-md px-4 py-1 w-full sm:w-auto"
                >
                  <span
                    className={`w-4 h-4 ${
                      method === "stripe" ? "bg-green-400" : "bg-white"
                    }  rounded-full mr-2`}
                  ></span>
                  <img className="w-14" src={stripe} alt="Stripe" />
                </div>
                <div
                  onClick={() => {
                    setMethod("razorpay");
                    toast.error(
                      "Razorpay is currently unavailable due to technical issues."
                    );
                  }}
                  className="cursor-pointer flex items-center gap-2 border rounded-md px-4 py-1.5 w-full sm:w-auto"
                >
                  <span
                    className={`w-4 h-4 ${
                      method === "razorpay" ? "bg-green-400" : "bg-white"
                    }  rounded-full mr-2`}
                  ></span>
                  <img className="w-24" src={razorpay} alt="Razorpay" />
                </div>
                <div
                  onClick={() => setMethod("cod")}
                  className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:shadow-md w-full sm:w-auto"
                >
                  <span className="flex items-center">
                    <span
                      className={`w-4 h-4 ${
                        method === "cod" ? "bg-green-400" : "bg-white"
                      }  rounded-full mr-2`}
                    ></span>
                    <span className="text-gray-700 font-medium">
                      Cash on Delivery
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <button
                type="submit"
                className="mt-4 w-full sm:w-1/2 bg-black text-white p-2 rounded-sm"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DeliveryAndPayment;
