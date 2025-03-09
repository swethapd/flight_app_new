import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [mailId, setMailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(mailId, password);

    // Simple validation checks
    if (!mailId || !password) {
      setError("mailId and Password are required.");
      return;
    }

    // Reset error message if validation passes
    setError("");

    // Sending login request
    try {
      const response = await axios.post(
        "http://localhost/my_project/php/login.php",
        {
          mailId,
          password,
        }
      );

      console.log("Response:", response);

      // Check response for success status
      if (response.data.status === "success") {
        localStorage.setItem('mailId', mailId);
        navigate("/");
      } else {
        setError("Invalid mailId or Password.");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Something went wrong, please try again.");
    }
  };
  // localStorage.setItem('FirstName', 'Swetha')

  useEffect(() => {
    if(localStorage.getItem('mailId')){
      navigate("/");
    }
  },[])
  return (
    <>
    <div className="parent">
      <form id="two" onSubmit={handleSubmit}>
        <h2 id="sign">Login</h2>
        <input
          type="text"
          placeholder="Enter mailId"
          className="space"
          value={mailId}
          onChange={(e) => setMailId(e.target.value)}
        ></input>
        <input
          type="password"
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
          Don't have an account?<Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
    </>
  );
};

export default Login;
