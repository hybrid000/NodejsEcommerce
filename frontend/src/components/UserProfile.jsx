import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css"; // Import CSS file

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/profile", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          console.error("Failed to fetch user data");
          navigate("/user/login"); // Redirect to login if user data is not available
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/user/login"); // Redirect to login on error
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/user/logout", {
        method: "GET",
        credentials: "include",
      });
      navigate("/"); // Redirect to login after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <head>
        <title>{username}</title>
      </head>
      <body>
        <div id="layer1">
          <a href="/">
            <img
              src="/resources/logo6.png"
              className="logoimg"
              alt="logo of site"
            />
          </a>
        </div>
        <div className="div">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <i className="fa-solid fa-angles-left"></i>Go Back
          </a>
        </div>
        <div className="main-container">
          <div className="username">
            <img src="/resources/userProfile.gif" alt="" className="user" />
            <p>
              {username}
              <br />
              <a href="/user/profile/update">
                <i className="fa-solid fa-pencil"></i>Edit profile
              </a>
              <br />
              <button onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
              </button>
            </p>
          </div>
          <div className="block">
            <a href="/user/orders" className="block-container">
              My Orders
            </a>
            <a href="/user/wishlist" className="block-container">
              My Wishlist
            </a>
            <a href="/user/cart" className="block-container">
              My Cart
            </a>
          </div>
        </div>
      </body>
    </>
  );
};

export default UserProfile;
