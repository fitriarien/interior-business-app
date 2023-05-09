import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Product = () => {
  const dispatch = useDispatch();
  dispatch({type: 'SET_PAGE_PRODUCT', payload: 1});

  return (
    <div className='text-black px-5 py-2 text-left mx-24'>
      <NavLink 
        to='/product/add' 
        className='hover:font-bold mx-2 py-2 px-2 border-b-2 border-black' 
        style={({ isActive }) => ({ fontWeight: isActive && "bold" })}
      >
        Add Product
      </NavLink> 
      <NavLink 
        to='/product/update' 
        className='hover:font-bold mx-2 py-2 px-2 border-b-2 border-black' 
        style={({ isActive }) => ({ fontWeight: isActive && "bold" })}
      >
        Update Product
      </NavLink>
      <Outlet />
    </div>
  );
}

export default Product;
