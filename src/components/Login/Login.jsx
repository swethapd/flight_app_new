import { useState } from "react";
import React from "react";
import axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(username, password);

    // Simple validation checks
    if (!username || !password) {
      setError("Username and Password are required.");
      return;
    }

    // Reset error message if validation passes
    setError("");

    // Sending login request
    try {
      const response = await axios.post(
        "http://localhost/my_project/php/read.php",
        {
          username,
          password,
        }
      );

      console.log("Response:", response);

      // Check response for success status
      if (response.data.status === "success") {
        // localStorage.setItem('username', username);
        navigate("/header");
      } else {
        setError("Invalid Username or Password.");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Something went wrong, please try again.");
    }
  };
  // localStorage.setItem('FirstName', 'Swetha')

  return (
    <div className="parent">
      <form id="two" onSubmit={handleSubmit}>
        <h2 id="sign">Login</h2>
        <input
          type="text"
          placeholder="Enter Username"
          className="space"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Enter Password"
          className="space"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        {error && (
          <p className="error" style={{ color: "red", fontSize: "small" }}>
            {error}
          </p>
        )}

        <input type="submit" className="btn"></input>
        <p id="account">
          don't have an account?<Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;