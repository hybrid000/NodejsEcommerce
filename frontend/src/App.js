import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignUp from "./components/Signup";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import UserCart from "./components/UserCart";
import Login from "./components/Login";
import UserOrders from "./components/UserOrders";
import UserWishlist from "./components/UserWishlist";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
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
