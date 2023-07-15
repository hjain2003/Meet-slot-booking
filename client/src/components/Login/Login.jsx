import React from 'react'
import './Login.css';
import { NavLink } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login_box">
            <h2 align="center">Login</h2>
            <br />
            <label><i>Name</i></label>
            <input type="text" name="name" placeholder='Enter name'/>
            <br />
            <label><i>Password</i></label>
            <input type="password" name="password" placeholder='Enter password' />
            <br /><br />
            <button id="register_btn">LOGIN</button>
            <br />
            <span>Don't have an account? <NavLink to='/register'>Register here</NavLink></span>
        </div>
  )
}

export default Login
