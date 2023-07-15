import React from 'react'
import './Register.css';
import { NavLink } from 'react-router-dom';

const Register = () => {
  return (
    <>
        <div className="register_box">
            <h2 align="center">Register</h2>
            <br />
            <label><i>Name</i></label>
            <input type="text" name="name" placeholder='Enter "YOUR" name'/>
            <br />
            <label><i>Password</i></label>
            <input type="password" name="password" placeholder='Dhanka password rakhna' />
            <br />
            <label><i>The person u hate the most in GDSC</i></label>
            <input type="password" name="hated" placeholder='This field will be hashed' />
            <br /><br />
            <button id="register_btn">REGISTER</button>
            <br />
            <span>Already have an account? <NavLink to='/login'>Login here</NavLink></span>
        </div>
    </>
  )
}

export default Register
