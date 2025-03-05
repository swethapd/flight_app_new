import React from 'react';
import './home.css';
import SearchForm from './SearchForm';
import { useNavigate } from "react-router";

const Header = () => {
  let navigate = useNavigate();

  // Retrieve the user's first name from localStorage
  const firstName = localStorage.getItem('firstName');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('firstName'); // Optional: Remove the first name on logout
    navigate("/login");
  };

  return (
    <>
      <header className='flex'>
        <img
          src="https://i.pinimg.com/474x/51/9d/ef/519deff8ef33ab663eaa22bad6b12926.jpg"
          alt="logo"
        />
        <form onSubmit={handleSubmit}>
          <div className='flex'>
            <p id='logo'>{firstName ? firstName : 'S'}</p> {/* Display first name or default 'S' */}
            <button type="submit" id="headerbutton">Logout</button>
          </div>
        </form>
      </header>
      <SearchForm />
    </>
  );
}

export default Header;
