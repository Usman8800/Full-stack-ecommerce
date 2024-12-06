import { useContext, useEffect, useState } from "react";
import { ShowContext } from "../context/ShowContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { assets, cartItem, updateCartItem, getCartAmount, productList } =
    useContext(ShowContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (productList.length > 0) {
      const tempData = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItem, productList]);

  return (
    <>
      <div className="flex gap-2 pl-10  pt-10 justify-start items-center">
        <div className="text-xl sm:text-2xl text-[#707070] font-bold uppercase">
          YOUR <span className="text-[#343434]">CART</span>
        </div>
        <div className="w-12 h-0.5 rounded-lg bg-[#414141]"></div>
      </div>

      {cartData.map((item, index) => {
        const productData = productList.find(
          (product) => product._id === item._id
        );

        return (
          <div key={index}>
            <div className="mb-6 mt-6">
              <div className=" w-full  border-t flex  justify-around py-6  items-center border-b ">
                <div className="flex gap-10">
                  <div>
                    <img className="w-20" src={productData.image[0]} alt="" />
                  </div>
                  <div>
                    <h1 className="text-xs sm:text-lg font-bold text-gray-600">
                      {productData.name}
                    </h1>
                    <div className="flex gap-6 items-center pt-3">
                      <span className="font-bold text-sm sm:text-base">
                        ${productData.price}
                      </span>
                      <span className="border bg-gray-100 px-4 py-1 text-sm sm:text-base text-gray-500">
                        {item.size}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateCartItem(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                    }
                    defaultValue={item.quantity}
                    className="w-10 h-6 px-1 py-1 sm:w-16 sm:h-8 sm:px-2 sm:py-2  mr-2 outline-none border border-[#a3a1a1] rounded-sm"
                    type="number"
                    placeholder="2"
                    name=""
                    id=""
                  />
                </div>
                <div>
                  <img
                    onClick={() => updateCartItem(item._id, item.size, 0)}
                    className="w-7 sm:w-5 cursor-pointer"
                    src={assets.bin_icon}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex justify-end mr-16 ml-10 mb-20">
        <div className="w-96">
          <div className="flex gap-2 pl-10 w-full pt-10 pb-4 justify-start items-center">
            <div className="text-lg sm:text-2xl text-[#707070]  font-bold uppercase">
              CART <span className="text-[#343434]">TOTALS</span>
            </div>
            <div className="w-12 h-0.5 rounded-lg bg-[#414141]"></div>
          </div>
          <div className="flex justify-between border-b p-2">
            <div className="font-semibold">Subtotal</div>
            <div className="font-semibold">${getCartAmount()}.00</div>
          </div>
          <div className="flex justify-between border-b p-2">
            <div className="font-semibold">Shipping Fee</div>
            <div className="font-semibold">$10.00</div>
          </div>
          <div className="flex justify-between border-b p-2">
            <div className="font-bold">Total</div>
            <div className="font-bold">
              ${getCartAmount() === 0 ? 0 : getCartAmount() + 10}.00
            </div>
          </div>
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/payment")}
              className="bg-black text-white  text-sm px-8  py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
