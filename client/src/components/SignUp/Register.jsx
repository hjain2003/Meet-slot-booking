import React, { useState } from 'react'
import './Register.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {

    const[isalert,setIsAlert] = useState(false);

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
            console.log("Registration failed")
            console.log(res.status);
        }
        else if (res.status !== 422) {
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
  return (
    <>
        {isalert && <span id="alert">Registration successfull ! Plz Log In &nbsp;&nbsp;&nbsp;<button id="closeAlert" onClick={closeAlertbar}>Close</button></span>}
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
            <button id="register_btn" onClick={PostData}>REGISTER</button>
            <br />
            <span>Already have an account? <NavLink to='/login'>Login here</NavLink></span>
        </div>
    </>
  )
}

export default Register
