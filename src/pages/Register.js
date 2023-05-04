import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { serverRoot } from '../util/serverApi';

const Register = () => {
  const navigate = useNavigate();

  const [userRegist, setUserRegist] = useState({
    username: "",
    password: "",
    role: "admin",
    name: "",
    email: "",
    contact: "",
    address: ""
  });

  function handleChange(e) {
    const { id, value } = e.target;

    setUserRegist(currState => {
      return { ...currState, [ id ]: value };
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(userRegist);
    createAccount();
  }

  function createAccount() {
    serverRoot.post('register', {
      username: userRegist.username,
        password: userRegist.password,
        role: "admin",
        name: userRegist.name,
        email: userRegist.email,
        contact: userRegist.contact,
        address: userRegist.address
    })
    .then(data => {
      localStorage.setItem("token", data.token )
      navigate('/login');
      console.log("Register success.");
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
      console.log(err);
    });
    
    // fetch('http://localhost:8081/register', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     username: userRegist.username,
    //     password: userRegist.password,
    //     role: "admin",
    //     name: userRegist.name,
    //     email: userRegist.email,
    //     contact: userRegist.contact,
    //     address: userRegist.address
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
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
    //   localStorage.setItem("token", data.token )
    //   navigate('/login');
    //   console.log("Register success.");
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
          Register your account 
        </h2>
        <p className="mt-2 text-sm hometext">
          Already have an account? <span> </span>
          <NavLink to='/login' className="font-medium text-black hover:font-bold">
            Login
          </NavLink>
        </p>
      </div>
      <form className="mt-8 space-y-6 pr-52" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          <div className="my-5">
            <label htmlFor='name' className="sr-only">
              Username
            </label>
            <input
              onChange={handleChange}
              value={userRegist.username}
              id="username"
              name="name"
              type="text"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            />
          </div>
          <div className="my-5">
            <label htmlFor='email' className="sr-only">
              Email
            </label>
            <input
              onChange={handleChange}
              value={userRegist.email}
              id="email"
              name="email"
              type="email"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div className="my-5">
            <label htmlFor='password' className="sr-only">
              Password
            </label>
            <input
              onChange={handleChange}
              value={userRegist.password}
              id="password"
              name="password"
              type="password"
              className="my-5 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div className="my-5">
            <label htmlFor='name' className="sr-only">
              Name
            </label>
            <input
              onChange={handleChange}
              value={userRegist.name}
              id="name"
              name="name"
              type="text"
              className="my-5 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Your Name"
            />
          </div>
          <div className="my-5">
            <label htmlFor='name' className="sr-only">
              Address
            </label>
            <input
              onChange={handleChange}
              value={userRegist.address}
              id="address"
              name="address"
              type="text"
              className="my-5 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Your Address"
            />
          </div>
          <div className="my-5">
            <label htmlFor='name' className="sr-only">
              Phone Number
            </label>
            <input
              onChange={handleChange}
              value={userRegist.contact}
              id="contact"
              name="contact"
              type="text"
              className="my-5 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Your Phone Number"
            />
          </div>
          <button
            type="submit"
            className="submitButton my-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
