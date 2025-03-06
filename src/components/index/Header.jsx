import React, { useEffect } from "react";
import "./home.css";
import SearchForm from "./SearchForm";
import { useNavigate } from "react-router";

const Header = () => {
  let navigate = useNavigate();

  // Retrieve the user's first name from localStorage
  const firstName = localStorage.getItem('username');
  console.log(firstName)

  // const [username, setUsername] = useState(""); // state to hold the username

  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // Retrieve username from localStorage
    // if (storedUsername) {
    //   setUsername(storedUsername); // Set the username state
    // }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username"); // Optional: Remove the first name on logout
    navigate("/login");
  };
  const usernameFirstLetter = firstName ? firstName.charAt(0).toUpperCase() : "";
  return (
    <>
      <header className="flex">
        <img
          src="https://i.pinimg.com/474x/51/9d/ef/519deff8ef33ab663eaa22bad6b12926.jpg"
          alt="logo"
        />
        {
          localStorage.getItem('username') &&           <div className="flex">
            
          <p id='logo'>{usernameFirstLetter}</p> 
          <button onClick={handleLogout} id="headerbutton">
            Logout
          </button>
        </div>
        }

      </header>
    </>
  );
};

export default Header;
