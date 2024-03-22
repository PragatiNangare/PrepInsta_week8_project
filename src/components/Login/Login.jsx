// Login.jsx
import React, { useState } from 'react';
import './Login.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom'; 
import { api_uri } from '../../config';

function Login({ isAuthenticated, username, onLogin }) {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await fetch(`${api_uri}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      onLogin(data);
      const user = {
        userId: data.id, 
        username: data.username, 
      };

      console.log('user:', user);
      console.log('main userID', user.userId);
  
      localStorage.setItem('user', JSON.stringify(user));
    
      console.log('userData:', data); 
      navigate('/BrowseEvent', { state: { userId: data.id } }); 
    } else {
      alert('Login error: Invalid email or password');
    }
  };
  

  console.log('isAuthenticated in Login:', isAuthenticated);
  console.log('username in Login:', username);

  return (
    <>
      <div className="login">
        <div className="container">
          <h1>Login</h1><br />
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Login</button>
          </form><br />
          <p>Don't have an account? <Link to='/signup'>Sign Up Here</Link></p>
        </div>
      </div>
    </>
  );
}

export default Login;
