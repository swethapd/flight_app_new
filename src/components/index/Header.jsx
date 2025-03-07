import React, { useEffect } from "react";
import "./Header.css";
import SearchForm from "./SearchForm";
import { useNavigate } from "react-router";

const Header = () => {
  let navigate = useNavigate();

  // Retrieve the user's first name from localStorage
  const firstName = localStorage.getItem('mailId');
  console.log(firstName)

  // const [mailId, setmailId] = useState(""); // state to hold the mailId

  useEffect(() => {
    const storedmailId = localStorage.getItem("mailId"); // Retrieve mailId from localStorage
    // if (storedmailId) {
    //   setmailId(storedmailId); // Set the mailId state
    // }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("mailId"); // Optional: Remove the first name on logout
    navigate("/login");
  };
  const mailIdFirstLetter = firstName ? firstName.charAt(0).toUpperCase() : "";
  return (
    <>
      <header className="flex">
        <img 
          src="https://d12lchh0gjjhot.cloudfront.net/qa/uploadFiles/portalLogo/414_1729072841_portal_logo.svg" height="50px" width="200px" alt="imagelogo"
        />
        {
          localStorage.getItem('mailId') &&  <div className="flex">
            
          <p id='logo'>{mailIdFirstLetter}</p> 
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
