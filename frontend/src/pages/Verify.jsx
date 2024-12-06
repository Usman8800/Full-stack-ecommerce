/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { ShowContext } from "../context/ShowContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Verify = () => {
  const { navigate, token, setCartItem, backend_url } = useContext(ShowContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backend_url + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItem({});
        navigate("/order");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);
  return <div>Verify</div>;
};

export default Verify;
