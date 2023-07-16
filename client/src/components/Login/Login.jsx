import React, { useState } from 'react'
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {

    const [isalert, setIsAlert] = useState(false);
    const [loadMsg,setLoadMsg] = useState('LOGIN');
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

    const loginUser = async (e) => {
        e.preventDefault();
        setLoadMsg('PROCESSING...');
        const { name, password } = user;

        const res = await fetch('https://meet-slot-booking-backend.vercel.app/user/login', {
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
            setLoadMsg('LOGIN');
            setIsAlert(true);
            // window.alert('Empty fields or Invalid credentials');
            console.log("Login failed");
            console.log(res.status);
            console.log(data);
        } else if (res.status !== 400) {
            setLoadMsg('LOGIN');
            // window.alert("Login successful");
            console.log("Login successful");
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("jwtoken", data.token);
            navigate('/');
            console.log(data._id);
            console.log(res.status);
            console.log(data);
        }
    };

    const closeAlertbar = () => {
        setIsAlert(false);
    }
    return (
        <>
            {isalert && <span id="alert">Empty fields or Invalid credentials ! &nbsp;&nbsp;&nbsp;<button id="closeAlert" onClick={closeAlertbar}>Close</button></span>}
            <nav id="register_nav">
                <h1>GDSC Meet Slot Bookings</h1>
            </nav>
            <div className="login_box">
                <h2 align="center">Login</h2>
                <br />
                <label><i>Name</i></label>
                <input type="text" name="name" placeholder='Enter name' onChange={handleChange} />
                <br />
                <label><i>Password</i></label>
                <input type="password" name="password" placeholder='Enter password' onChange={handleChange} />
                <br /><br />
                <button id="register_btn" onClick={loginUser}><b>{loadMsg}</b></button>
                <br />
                <span>Don't have an account? <NavLink to='/register'>Register here</NavLink></span>
            </div>
        </>
    )
}

export default Login
