import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { serverBase } from '../util/serverApi';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);

  function logout(e) {
    e.preventDefault();

    serverBase.post('logout', null, localStorage.getItem('token'))
    .then(data => {
      localStorage.clear();
      dispatch({type: 'LOGOUT'});
      Swal.fire(
        'Successfully Logout!',
        '',
        'success'
      );
      navigate('/login');
      console.log("Logout Success.");
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
      console.log(err);
    })

    // fetch('http://localhost:8081/api/logout', {
    //   method: 'POST',
    //   body: JSON.stringify(),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //   }
    // })
    // .then((response) => {
    //   if(response.ok) {
    //     return response.json();
    //   } else {
    //     throw new Error(response.status)
    //   }
    // })
    // .then(data => {
    //   localStorage.clear();
    //   dispatch({type: 'LOGOUT'});
    //   Swal.fire(
    //     'Successfully Logout!',
    //     '',
    //     'success'
    //   );
    //   navigate('/login');
    //   console.log("Logout Success.");
    // })
    // .catch(err => {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Something went wrong!'
    //   });
    //   console.log(err);
    // })
  }

  return (
    <div>
      { !isLogin
      ?
        <NavLink 
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:font-bold hover:bg-white hover:text-black mt-4 lg:mt-0" 
          to='/login'
        >
          Login
        </NavLink>
      :
        <NavLink 
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:font-bold hover:bg-white hover:text-black mt-4 lg:mt-0" 
          to='/login' 
          onClick={logout}
        >
          Logout
        </NavLink>
      }
    </div>
  );
}

export default Logout;
