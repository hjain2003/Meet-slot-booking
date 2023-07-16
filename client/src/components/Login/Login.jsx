import React, { useState } from 'react'
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {

    const [isalert, setIsAlert] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const loginUser = async () => {
        // e.preventDefault();

        const { name, password } = user;

        const res = await fetch('http://localhost:5000/user/login', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password
            })
        });

        const data = await res.json();

        if (res.status === 400) {
            setIsAlert(true);
            console.log("Login failed");
            console.log(res.status);
            console.log(data);
        } else if (res.status !== 400) {
            window.alert("Login successful");
            console.log("Login successful");
            navigate('/');
            console.log(data._id);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("jwtoken", data.token);
            console.log(res.status);
            console.log(data);
        }
    };

    const closeAlertbar = () => {
        setIsAlert(false);
    }
    return (
        <>
            {isalert && <span id="alert">Login failed ! &nbsp;&nbsp;&nbsp;<button id="closeAlert" onClick={closeAlertbar}>Close</button></span>}

            <div className="login_box">
                <h2 align="center">Login</h2>
                <br />
                <label><i>Name</i></label>
                <input type="text" name="name" placeholder='Enter name' onChange={handleChange} />
                <br />
                <label><i>Password</i></label>
                <input type="password" name="password" placeholder='Enter password' onChange={handleChange} />
                <br /><br />
                <button id="register_btn" onClick={loginUser}>LOGIN</button>
                <br />
                <span>Don't have an account? <NavLink to='/register'>Register here</NavLink></span>
            </div>
        </>
    )
}

export default Login
