import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Image = () => {
  return (
    <div className='text-black px-5 py-2 text-left mx-24'>
      <NavLink 
        to='/image/upload' 
        className='hover:font-bold mx-2 py-2 px-2 border-b-2 border-black' 
        style={({ isActive }) => ({ fontWeight: isActive && "bold" })}
      >
        Upload Image
      </NavLink> 
      <NavLink 
        to='/image/delete' 
        className='hover:font-bold mx-2 py-2 px-2 border-b-2 border-black' 
        style={({ isActive }) => ({ fontWeight: isActive && "bold" })}
      >
        Delete Image
      </NavLink>
      <Outlet />
    </div>
  );
}

export default Image;
