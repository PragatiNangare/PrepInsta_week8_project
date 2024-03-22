// components/SignUp.jsx

import React, { useState } from 'react';
import './SignUp.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { api_uri } from '../../config';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
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
    const response= await fetch(`${api_uri}/api/auth/register`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data= await response.json();
    console.log(data);
    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
    });
    
  };

  return (
    <>
    <div className="signup">
      <div className="container">
        <h1>Sign Up</h1><br/>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
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
          <button type="submit">Sign Up</button>
        </form><br/>
        <p>Already registered? <Link to='/Login'>Login Here</Link></p>
      </div>
    </div>
    </>
  );
}

export default SignUp;
