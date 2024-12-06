import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
const Loader = lazy(() => import("./components/Loader"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./pages/Cart"));
const Collection = lazy(() => import("./pages/Collection"));
const Contact = lazy(() => import("./pages/Contact"));
const DeliveryAndPayment = lazy(() => import("./pages/DeliveryAndPayment"));
const Login = lazy(() => import("./pages/Login"));
const Order = lazy(() => import("./pages/Order"));
const Product = lazy(() => import("./pages/Product"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Verify = lazy(() => import("./pages/Verify"));
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
      <Suspense fallback={<Loader />}>
        <div className="px-4">
          <ToastContainer/>
          <Navbar />
          <SearchBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={<DeliveryAndPayment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order" element={<Order />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
          <Footer/>
        </div>
      </Suspense>
  );
};

export default App;
