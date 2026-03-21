import React, { useState, useEffect } from 'react'
import Button from './Button'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('accessToken')
    setIsLoggedIn(!!token)
  }, [location]) // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    
    <>
    <nav className='navbar container pt-3 pb-3 align-items-start'>
    <Link className='navbar-brand text-info' to={isLoggedIn ? '/dashboard' : '/'}>
         StockLens
       </Link> 
       <div>
           {isLoggedIn ? (
             <>
               <Button text='Dashboard' class="btn-outline-info" url='/dashboard' />
               &nbsp;
               <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
             </>
           ) : (
             <>
               <Button text='Login' class="btn-outline-info" url='/login' />
               &nbsp;
               <Button text='Register' class="btn-info" url='/register' />
             </>
           )}
       </div>
    </nav>
    </>
  )
}

export default Header