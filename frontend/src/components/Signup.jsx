import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/signup.css";

function SignUp() {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const serializedFormData = Object.fromEntries(formData.entries()); // Serialize form data

    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(serializedFormData), // Stringify serialized form data
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.error || {}); // Set error messages to state
      } else {
        setSuccess(true); // Indicate success
        setErrors({});
        window.location.href = "/"; // Redirect on success
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ network: "A network error occurred." });
    }
  };

  const renderErrors = () => {
    return Object.keys(errors).map((key) => (
      <p key={key} className="error-message">
        {errors[key]}
      </p>
    ));
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <div id="layer1">
        <a href="/">
          <img
            src="/resources/logo6.png"
            className="logoimg"
            alt="logo of site"
          />
        </a>
      </div>

      <div id="mainbox">
        <h2>Registration</h2>
        {success && (
          <p className="success-message">
            Registration successful! Redirecting...
          </p>
        )}
        <div id="error-container">{renderErrors()}</div>{" "}
        {/* Container for error messages */}
        <form id="register-form" onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="input-field">
            <i className="fa-solid fa-user-large fa-xl"></i>
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="input-field">
            <i className="fa fa-envelope fa-xl"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-field">
            <i className="fa-solid fa-key fa-xl"></i>
            <input
              type="password"
              name="password"
              className="password"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="input-field">
            <i className="fa-solid fa-key fa-xl"></i>
            <input
              type="password"
              name="confirmPassword"
              className="password"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="checkbox-text">
            <input type="checkbox" id="termcon" name="termcon" required />
            &nbsp;I agree to all terms and conditions.
          </div>

          <button type="submit" className="button">
            <i className="fa-solid fa-user-plus"> &nbsp;</i>Sign Up
          </button>
        </form>
        <div className="login-signup">
          <b>Already a member?</b>
          <a href="/user/login" className="text login-link">
            <b> Login Now</b>
          </a>
        </div>
      </div>
    </>
  );
}

export default SignUp;
