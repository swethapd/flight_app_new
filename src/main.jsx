import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import SearchForm from './components/index/SearchForm.jsx'
import Header from './components/index/Header.jsx'
import RecordList from './components/index/RecordList.jsx'
import EditRecord from './components/index/EditRecord.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/header" element={<Header />} />
      <Route path="/searchform" element={<SearchForm/>}/>
      <Route path="/RecordList" element={<RecordList/>} />
      <Route path="/edit/:id" element={<EditRecord/>} /> {/* This is the dynamic route */}
    </Routes>
  </BrowserRouter>
)
