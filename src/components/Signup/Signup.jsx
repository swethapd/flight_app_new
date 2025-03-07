import React, { use, useEffect } from 'react';
import axios from 'axios';
// import './'
import "./signup.css"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const Signup = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate= useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = { username: '', email: '', password: '' };

    // Username validation
    if (!username) {
    formErrors.username='Username is required';
    }
    else if(username.length < 3)
    {
          formErrors.username = 'Username must be at least 3 characters long';
    
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (password.length < 8) {
      formErrors.password = 'Password must be at least 8 characters long';
    } 
    else if (!/[A-Za-z]/.test(password) || !/\d/.test(password) || !/[A-Z]/.test(password)) {
      formErrors.password = 'Password must contain at least one uppercase letter and both letters and numbers';
    }
  

    // If there are errors, update state and prevent submission
    if (formErrors.username || formErrors.email || formErrors.password) {
      setErrors(formErrors);
      return;
    }

    setErrors({ username: '', email: '', password: '' }); // Clear previous errors

    // Submit form data if validation passes
    try {
      const response = await axios.post('http://localhost/my_project/php/signUp.php', {
        username,
        email,
        password,
      });
      console.log('Response:', response.data);
      navigate('/login'); // Redirect on successful form submission
    } catch (error) {
      console.error('Error during form submission:', error);
    }


    alert ("Congratulations! you have successfully signed up...");
    // console.log(username, email, password);

  };



return (
  <>
    <div className="parent">
      <form id="two" onSubmit={handleSubmit}>
        <h2 id="sign">Signup</h2>
        <input type="text" placeholder='Enter Username' className='space'
          value={username} onChange={(e) => setUsername(e.target.value)}></input>
           {errors.username && <p className="error" style={{color: 'red', fontSize:'small'}}>{errors.username}</p>} {/* Display username error */}

        <input type="email" placeholder='Enter email' className='space'
          value={email} onChange={(e) => setEmail(e.target.value)}></input>
           {errors.email && <p className="error" style={{color: 'red', fontSize:'small'}}>{errors.email}</p>} {/* Display email error */}

        <input type="password" placeholder='Enter Password' className='space'
          value={password} onChange={(e) => setPassword(e.target.value)}></input>
           {errors.password && <p className="error" style={{color: 'red', fontSize:'small'}}>{errors.password}</p>} {/* Display password error */}

        <input type="submit" className='btn'></input>
        <p><Link to='/Login'>already an user</Link></p>
      </form>
    </div>
  </>
)
}

export default Signup