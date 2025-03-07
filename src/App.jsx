
import { useNavigate } from "react-router";
import SearchForm from "./components/index/SearchForm";
import { useEffect } from "react";


function App() {
  const navigate = useNavigate();



  useEffect(() => {
    if(!localStorage.getItem('mailId')){
      navigate("/login");
    }
  },[])
  return (
    <>

  <SearchForm />
    </>
  )
}

export default App