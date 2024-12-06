import { useContext, useEffect, useState } from "react";
import { ShowContext } from "../context/ShowContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backend_url } = useContext(ShowContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backend_url + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("registered successfully");
        } else {
          toast.error("User already exists");
        }
      } else {
        const response = await axios.post(backend_url + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Welcome Back ! 😊 ");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex items-center justify-center h-full bg-white"
    >
      <div className="w-full max-w-md p-10 my-8 bg-white h-[500px] shadow-lg rounded-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          {currentState} <span className="text-gray-400">—</span>
        </h1>

        {/* Name Input */}
        <div className={currentState === "Sign Up" ? "block mb-4" : "hidden"}>
          <input
            onChange={(e) => setName(e.target.value)}
            required={currentState === "Sign Up"}
            type="text"
            id="name"
            value={name}
            placeholder="Name"
            className="w-full mt-1 p-2 border outline-none border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-400"
          />
        </div>
        {/* Email Input */}
        <div className="mb-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            id="email"
            value={email}
            placeholder="Email"
            className="w-full mt-1 p-2 border outline-none border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-400"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
            type="password"
            id="password"
            placeholder="Password"
            className="w-full mt-1 p-2 border outline-none border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-400"
          />
        </div>

        {/* Links */}
        <div className="flex justify-between text-sm text-gray-500 mb-6">
          <a href="/forgot-password" className="hover:underline cursor-pointer">
            Forgot your password?
          </a>
          {currentState === "Login" ? (
            <a
              onClick={() => setCurrentState("Sign Up")}
              className="hover:underline cursor-pointer"
            >
              Create account
            </a>
          ) : (
            <a
              onClick={() => setCurrentState("Login")}
              className="hover:underline cursor-pointer"
            >
              Login Here
            </a>
          )}
        </div>

        {/* Sign In Button */}
        <div className="flex justify-center">
          <button className="w-1/2 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition">
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
