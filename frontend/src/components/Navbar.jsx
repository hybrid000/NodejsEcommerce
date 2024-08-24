import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import '../styles/stylemain.css'
const Navbar = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav id="layer1">
      <div className="part1">
        <Link to="/">
          <img
            src="/resources/logo6.png"
            className="logoimg"
            alt="logo of site"
          />
        </Link>
      </div>
      <div className="part2">
        <form action="/search" method="POST" className="search">
          <input
            type="search"
            name="search"
            className="search-field"
            placeholder="Search Product, Brand"
          />
          <button type="submit" className="searchbtn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="part3">
        <div className="login-signup">
          {user ? (
            <p>
              <Link to="/user/profile">
                <i className="fa-solid fa-user fa-lg"></i>
                {user.username}
              </Link>
            </p>
          ) : (
            <p>
              <i className="fa-solid fa-user fa-lg"></i>
              <Link to="/user/login" className="ls">
                Login
              </Link>{" "}
              or
              <Link to="/user/signup" className="ls">
                Sign Up
              </Link>
            </p>
          )}
        </div>
        <div className="wish-order-cart">
          <Link to="/user/orders" className="cc">
            <i className="fa-solid fa-bag-shopping fa-xl"></i>
            &nbsp; Orders
          </Link>
          <Link to="/user/cart" className="cc">
            <i className="fa-solid fa-cart-shopping fa-xl"></i>
            &nbsp; Cart
          </Link>
          <Link to="/user/wishlist" className="cc">
            <i className="fa-regular fa-heart fa-xl"></i>
            &nbsp; Wishlist
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
