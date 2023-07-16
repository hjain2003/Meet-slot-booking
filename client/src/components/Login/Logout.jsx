import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/user/logout', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) {
        const error = new Error(res.error);
        throw error;
      } else {
        navigate('/login');
        localStorage.removeItem('userId');
        localStorage.removeItem('jwtoken');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const confirmLogout = () => {
    const result = window.confirm('Are you sure you want to logout?');
    if (result) {
      handleLogout();
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    confirmLogout();
  }, []);

  return <></>;
};

export default Logout;
