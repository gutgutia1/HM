import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Services/Auth/Login';
import { Link, useNavigate } from 'react-router-dom';
function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate =useNavigate()
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Hindusthan Malleables</div>
        {token ? ( <div className="hidden md:flex space-x-4">
        <Link to="/dashboard" className='block text-white p-2 cursor-pointer' >Home</Link>
          <div className='block text-white p-2 cursor-pointer' onClick={()=>dispatch(logout(navigate))}>
            Logout
          </div> </div>
          ): <div className="hidden md:flex space-x-4">
        <a href="/" className="block text-white p-2">Home</a>
            <a href="/login" className="block text-white p-2">Login</a>
            {/* <a href="#" className="text-white">Services</a>
            <a href="#" className="text-white">Contact</a> */}
        </div>}
        <div className="md:hidden">
            <button className="text-white" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
            </button>
        </div>
        </div>
        {isMenuOpen && (
          token ? (<div className="md:hidden">
          <Link to="/dashboard" className='block text-white p-2 cursor-pointer' >Home</Link>
          <button onClick={()=>dispatch(logout(navigate))} className='block text-white p-2 cursor-pointer' >
            Logout
          </button>
          
  
      </div>) : <div className="md:hidden">
          <a href="/" className="block text-white p-2">Home</a>
          <a href="/login" className="block text-white p-2">Login</a>
          {/* <a href="#" className="block text-white p-2">Services</a>
          <a href="#" className="block text-white p-2">Contact</a> */}
      </div>
        )}
  </nav>
  )
}

export default Navbar