import React, { useState, useEffect } from 'react';
import generatePageArray from '../util/pagination';
import { useSelector, useDispatch } from 'react-redux';

const Pagination = ({ totalPages, router }) => {
  const currentPage = useSelector(state => {
    if (router === 'order') {
      return state.orderPage;
    } else if (router === 'product') {
      return state.productPage;
    } else if (router === 'image') {
      return state.imagePage;
    } 
  });

  const [activePage, setActivePage] = useState(currentPage);
  const arrayPages = generatePageArray(currentPage, totalPages);
  const dispatch = useDispatch();

  const goToPage = (value) => {
    if (router === 'order') {
      if (value === ' ...') {
        dispatch({type: 'SET_PAGE', payload: 1});
      } else if (value === '... ') {
        dispatch({type: 'SET_PAGE', payload: totalPages});
      } else if (value === 'Prev') {
        dispatch({type: 'SET_PAGE', payload: currentPage-1});
      } else if (value === 'Next') {
        dispatch({type: 'SET_PAGE', payload: currentPage+1});
      } else {
        dispatch({type: 'SET_PAGE', payload: value});
      }
    } else if (router === 'product') {
      if (value === ' ...') {
        dispatch({type: 'SET_PAGE_PRODUCT', payload: 1});
      } else if (value === '... ') {
        dispatch({type: 'SET_PAGE_PRODUCT', payload: totalPages});
      } else if (value === 'Prev') {
        dispatch({type: 'SET_PAGE_PRODUCT', payload: currentPage-1});
      } else if (value === 'Next') {
        dispatch({type: 'SET_PAGE_PRODUCT', payload: currentPage+1});
      } else {
        dispatch({type: 'SET_PAGE_PRODUCT', payload: value});
      }
    } else if (router === 'image') {
      if (value === ' ...') {
        dispatch({type: 'SET_PAGE_IMAGE', payload: 1});
      } else if (value === '... ') {
        dispatch({type: 'SET_PAGE_IMAGE', payload: totalPages});
      } else if (value === 'Prev') {
        dispatch({type: 'SET_PAGE_IMAGE', payload: currentPage-1});
      } else if (value === 'Next') {
        dispatch({type: 'SET_PAGE_IMAGE', payload: currentPage+1});
      } else {
        dispatch({type: 'SET_PAGE_IMAGE', payload: value});
      }
    }
  }

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  return (
    <div className='mt-10'>
      <ul className='flex flex-row'>
        {arrayPages && arrayPages.map(i => (
          <li 
            key={i}
            className={`border border-2 rounded m-1 px-2 cursor-pointer text-base ${activePage === i && 'font-bold border-black'}`} 
            onClick={() => goToPage(i)}
          >
            {i}
          </li>
        ))}
      </ul>     
    </div>
  );
}

export default Pagination;
