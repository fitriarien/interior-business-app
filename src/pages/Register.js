import React, { useState, useEffect } from 'react';
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
  const [isShown, setIsShown] = useState(false);
  const [username, setUsername] = useState('');
  const [isValidUname, setIsValidUname] = useState(false);
  const [password, setPassword] = useState('');
  const [isValidPass, setIsValidPass] = useState(false);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const regexUname = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    setIsValidUname(regexUname.test(username));
    const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    setIsValidPass(regexPassword.test(password));
    const regex = /([a-zA-Z0-9]+(?:[._+-][a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*[.][a-zA-Z]{2,})/;
    setIsValid(regex.test(email));
  }, [username, password, email]);

  function handleUname(e) {
    setUsername(e.target.value);
  };

  function handlePassword(e) {
    setPassword(e.target.value);
  };

  function handleEmail(e) {
    setEmail(e.target.value);
  };

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
      username: username,
      password: password,
      role: "admin",
      name: userRegist.name,
      email: email,
      contact: userRegist.contact,
      address: userRegist.address
    })
    .then(data => {
      if (data === 410) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Username has already been used. Please change the username!'
        });
      } else if (data === 411) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Username. Please re-enter the username!'
        });
      } else if (data === 412) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Password. Please re-enter the password!'
        });
      } else if (data === 413) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Email. Please re-enter the email!'
        });
      } else if (data === 414) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Username & Password. Please re-enter the username & password!'
        });
      } else if (data === 415) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Email & Password. Please re-enter the email & password!'
        });
      } else if (data === 416) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Username & Email. Please re-enter the username & email!'
        });
      } else if (data === 417) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Username, Email & Password. Please re-enter the username, email & password!'
        });
      } else {
        localStorage.setItem("token", data.token )
        navigate('/login');
        console.log("Register success.");
      }
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

  function showRequirements() {
    setIsShown(true);
  }

  function closeRequirements() {
    setIsShown(false);
  }

  return (
    <div className="ml-16 max-w-screen-md py-5 px-10">
      <div className="mb-5" id="header">
        <h2 className="mt-4 text-3xl font-bold text-gray-900 ">
          Register your account 
        </h2>
        <p className="mt-2 text-sm hometext">
          Already have an account? <span> </span>
          <NavLink to='/login' className="font-medium text-black hover:font-bold">
            Login
          </NavLink>
        </p>
      </div>
      {!isShown ?
        <button onClick={showRequirements} className='py-1 underline text-white text-sm'>
          Show Requirements
        </button>
      :
        <button onClick={closeRequirements} className='py-1 underline text-white text-sm'>
          Close Requirements
        </button>
      }
      {isShown && 
        <div className='bg-white border rounded p-2 opacity-70 mr-40'>
          {/* <p className='py-1 text-black text-sm'>Requirements</p> */}
          <p className='py-1 text-black text-sm'>
            Username contains at least one uppercase letter, one lowercase letter, and one digit, and is at least 6 characters long.
          </p>
          <p className='py-1 text-black text-sm'>
            Password contains at least one uppercase letter, one lowercase letter, one digit, and one special characters of #?!@$%^&*- and is at least 8 characters long.
          </p>
        </div>
      }

      <form className="mt-px space-y-6 pr-52" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          <div className="my-5">
            <label htmlFor='name' className="sr-only">
              Username
            </label>
            <input
              onChange={handleUname}
              value={username}
              id="username"
              name="name"
              type="text"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            />
            {!isValidUname && username && <p className='text-white text-sm'>Invalid username</p>}
          </div>
          <div className="my-5">
            <label htmlFor='email' className="sr-only">
              Email
            </label>
            <input
              onChange={handleEmail}
              value={email}
              id="email"
              name="email"
              type="text"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
            {!isValid && email && <p className='text-white text-sm'>Invalid Email</p>}
          </div>
          <div className="my-5">
            <label htmlFor='password' className="sr-only">
              Password
            </label>
            <input
              onChange={handlePassword}
              value={password}
              id="password"
              name="password"
              type="password"
              className="mt-5 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
            {!isValidPass && password && <p className='text-white text-sm mb-5'>Invalid Password</p>}
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
