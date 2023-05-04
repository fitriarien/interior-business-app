import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';

const Navbar = () => {
  return (
    <nav className="navbar hometext py-6 sm:px-6 md:px-8 lg:px-28 flex items-center justify-between flex-wrap">
      <div className='text-white flex text-3xl px-5'>
        <h1 className='font-bold'>in</h1>
        <h2>studio</h2>
      </div>
      <ul className="flex">
        <li className="mr-6">
          <NavLink 
            className="text-white hover:font-bold" 
            to='/' 
            style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
          >
            Home
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink
            className="text-white hover:font-bold" 
            to='/product' 
            style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
          >
            Products
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink 
            className="text-white hover:font-bold" 
            to='/image' 
            tyle={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
          >
            Images
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink 
            className="text-white hover:font-bold" 
            to='/order' 
            style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
          >
            Update Order
          </NavLink>
        </li>
      </ul>
      <Logout />
    </nav>
  );
}

export default Navbar;
