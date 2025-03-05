
import {useState} from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Header from './components/index/Header'
// import SearchForm from './components/index/SearchForm'
import Login from './components/Login/Login';
// import Signup from './components/Signup/Signup'
import { useNavigate } from "react-router";


function App() {
  const navigate = useNavigate();

  if(typeof window !== undefined && localStorage.getItem('userName')){
    console.log('sfjd')
    navigate("/login");
  }
  return (
    <>
     {/* <Header/> */}
    <h1>Hello</h1>
     <button onClick={() => { navigate("/login");}}>Submit</button>
    </>
  )
}

export default App