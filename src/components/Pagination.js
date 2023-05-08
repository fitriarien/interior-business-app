import React, { useState, useEffect } from 'react';
import generatePageArray from '../util/pagination';
import { useSelector, useDispatch } from 'react-redux';

const Pagination = ({ totalPages }) => {
  const currentPage = useSelector(state => state.pageRed);
  const [activePage, setActivePage] = useState(currentPage);
  const arrayPages = generatePageArray(currentPage, totalPages);
  const dispatch = useDispatch();

  const goToPage = (value) => {
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
