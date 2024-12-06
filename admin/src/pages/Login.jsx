import { useState } from "react";
import axios from "axios";
import { backend_url } from "../App";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backend_url + "/api/user/admin", {
        email,
        password,
      });

      if(response.data.success){  
        setToken(response.data.token)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 flex flex-col justify-center  rounded-lg shadow-md w-full max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm font-bold focus:outline-none focus:ring-gray-500  focus:border-gray-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm font-bold focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gray-900 hover:opacity-90 text-white font-bold rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  setToken : PropTypes.func.isRequired
}
export default Login;
