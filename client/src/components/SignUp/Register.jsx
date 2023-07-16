import React, { useState } from 'react'
import './Register.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {

    const[isalert,setIsAlert] = useState(false);
    const [isalertfail,setIsAlertFail] = useState(false);
    const [buttonValue, setButtonValue] = useState('REGISTER');
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        password: "",
        hated: ""
    })

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUser((prevState)=>({
            ...prevState,
            [name]: value
        }));
    }

    const PostData = async (e) => {
        setButtonValue('PROCESSING...')
        e.preventDefault();
        const { name, password , hated} = user;
    
        const res = await fetch("http://localhost:5000/user/register", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            password,
            hated
          })
        });
    
        const data = await res.json();
    
        if (res.status === 422) {
            // window.alert("Empty fields or User already exists");
            setIsAlertFail(true);
            console.log("Registration failed")
            console.log(res.status);
            setButtonValue('REGISTER');
        }
        else if (res.status !== 422) {
          setButtonValue('REGISTER');
            setIsAlert(true);
          console.log("Registration successfull");
          console.log(res.status);
          console.log(data);
        //   navigate('/login');
        }
      };

      const closeAlertbar = ()=>{
        setIsAlert(false);
      }
      const closefailedAlertbar = ()=>{
        setIsAlertFail(false);
      }
  return (
    <>
      {isalertfail && <span id="alert">Empty fields or UserName taken ! &nbsp;&nbsp;&nbsp;<button id="closeAlert" onClick={closefailedAlertbar}>Close</button></span>}
        <nav id="register_nav">
          <h1>GDSC Meet Slot Bookings</h1>
        </nav>
        <div className="register_box">
            <h2 align="center">Register</h2>
            <br />
            <label><i>Name</i></label>
            <input type="text" name="name" placeholder='Enter "YOUR" name' onChange={handleChange}/>
            <br />
            <label><i>Password</i></label>
            <input type="password" name="password" placeholder='Dhanka password rakhna' onChange={handleChange} />
            <br />
            <label><i>The person u hate the most in GDSC</i></label>
            <input type="password" name="hated" placeholder='This field will be hashed'  onChange={handleChange}/>
            <br /><br />
            <button id="register_btn" onClick={PostData}><b>{buttonValue}</b></button>
            <br />
            <span>Already have an account? <NavLink to='/login'>Login here</NavLink></span>
        </div>
        <div className="alert_container">
        {isalert && <span id="alert">Registration Complete! Plz Log In &nbsp;&nbsp;&nbsp;<button id="closeAlert" onClick={closeAlertbar}>Close</button></span>}
        </div>
    </>
  )
}

export default Register
