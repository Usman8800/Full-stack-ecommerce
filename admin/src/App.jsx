import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ListItems from "./pages/ListItems";
import AddItem from "./pages/AddItem";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Layout component that includes the Navbar

// eslint-disable-next-line react-refresh/only-export-components
export const backend_url = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <Router>
          <Navbar setToken={setToken}/>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Wrap routes with Navbar in Layout */}
              <Route path="/listItems" element={<ListItems token={token} />} />
              <Route path="/addItems" element={<AddItem token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
              <Route path="/?" element={<Home token={token} />} />
            </Routes>
          </Suspense>
        </Router>
      )}
    </>
  );
};

export default App;
