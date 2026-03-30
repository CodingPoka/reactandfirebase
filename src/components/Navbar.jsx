
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex bg-blue-600 text-white h-16 items-center justify-between px-10'>
        <div>
            <Link to="/" className='text-2xl font-bold'>React Firebase</Link>
        </div>
        <div className='flex gap-7 text-xl'>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/product">Product</Link>
            <Link to="/login" className='bg-blue-400 px-4 py-1 rounded-md'>Login</Link>
          
        </div>
    </div>
  )
}

export default Navbar