import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../fiirebase';
import { Link } from 'react-router-dom';

const  Navbar = () => {

  const navRef = useRef()
    window.addEventListener('scroll' , ()=>{
    if(window.scrollY >= 80) navRef.current.classList.add('nav-dark')
    else navRef.current.classList.remove('nav-dark')
    })
  useEffect(()=>{},[])

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <Link to={'/'}><img src={logo} alt="Logo-netflix" /></Link>
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languaes</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="" className='icons' />
        <p>Childern</p>
        <img src={bell_icon} alt="" className='icons' />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_icon} alt=""  />

          <div className="dropdown">
            <p onClick={()=>{logout()}}>Sign out</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
