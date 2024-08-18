import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Ensure cookies are sent
      });

      if (response.ok) {
        navigate("/"); // Redirect to home or another protected route
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div id="layer1">
        <Link to="/">
          <img
            src="/resources/logo6.png"
            className="logoimg"
            alt="logo of site"
          />
        </Link>
      </div>

      <div id="mainbox">
        <h2>Login</h2>
        <p className="login-line">
          Get access to your Orders, Wishlist and More
        </p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="box">
            <i className="fa fa-envelope fa-xl"></i>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="box">
            <i className="fa-solid fa-key fa-xl"></i>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="reme-forgot">
            <Link to="#" className="forgopass">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="button">
            <i className="fa-solid fa-arrow-right-to-bracket ">&nbsp;</i>
            Login
          </button>
        </form>

        <div className="login-signup">
          <b>Don't have an account?</b>
          <Link to="/user/signup" className="text signup-link">
            <b>Create one now</b>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
