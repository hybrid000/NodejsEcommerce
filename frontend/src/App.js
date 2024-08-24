import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignUp from "./pages/Signup";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import UserCart from "./pages/UserCart";
import Login from "./pages/Login";
import UserOrders from "./pages/UserOrders";
import UserWishlist from "./pages/UserWishlist";

import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
  
      <Router>
        <AppContent />
      </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/user/login", "/user/signup", "/user/profile"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route
          path="/user/orders"
          element={
            <ProtectedRoute>
              <UserOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/cart"
          element={
            <ProtectedRoute>
              <UserCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/wishlist"
          element={
            <ProtectedRoute>
              <UserWishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<ProductList />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
