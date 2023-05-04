import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { serverRoot } from '../util/serverApi';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [ userLogin, setUserLogin ] = useState({ username: "", password: ""});

  function handleChange(e) {
    e.preventDefault();
    setUserLogin(currUserLogin => {
        return { ...currUserLogin, [e.target.id]:e.target.value}
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    authenticateUser();
  }

  function authenticateUser() {
    serverRoot.post('login', userLogin)
    .then(data => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      dispatch({type: 'LOGIN'});

      if (location.state) {
          navigate(`${location.state.from.pathname}`)
      } else {
          navigate('/');
      }
      console.log("Login Success.");
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
      console.log(err);
    });

    // fetch('http://localhost:8081/login', {
    //   method: 'POST',
    //   body: JSON.stringify(userLogin),
    //   headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
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
    //   localStorage.setItem("token", data.token);
    //   localStorage.setItem("id", data.id);
    //   dispatch({type: 'LOGIN'});

    //   if (location.state) {
    //       navigate(`${location.state.from.pathname}`)
    //   } else {
    //       navigate('/');
    //   }
    //   console.log("Login Success.");
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
    <div className="ml-16 max-w-screen-md py-5 px-10">
      <div className="mb-10" id="header">
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Login to your account
        </h2>
        <p className="mt-2 text-sm hometext">
          Don't have an account yet? <span> </span>
          <NavLink to='/register' className="font-medium text-black hover:font-bold">
            Register
          </NavLink>
        </p>
      </div>
      <form className="mt-8 space-y-5 pr-52" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div className="my-5">
            <label htmlFor='email' className="sr-only">
              Username
            </label>
            <input
              onChange={handleChange}
              value={userLogin.username}
              id="username"
              name="username"
              type="username"
              className="rounded-md appearance-none relative self-center  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            />
          </div>
          <div className="my-5">
            <label htmlFor='password' className="sr-only">
              Password
            </label>
            <input
              onChange={handleChange}
              value={userLogin.password}
              id="password"
              name="password"
              type="password"
              className="my-5 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="submitButton my-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
