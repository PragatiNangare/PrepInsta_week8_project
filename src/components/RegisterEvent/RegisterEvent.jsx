// components/RegisterEvent.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './RegisterEvent.css'; // Import CSS for styling
import { api_uri } from '../../config';

function RegisterEvent() {
  const { eventId } = useParams(); // Get the eventId from the URL params
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api_uri}/api/events/register/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // Log the response from the backend
      // Optionally, you can show a success message or redirect the user after successful registration
    } catch (error) {
      console.error('Error registering for event:', error);
      // Handle errors or display error messages to the user
    }
  };

  return (
    <div className="register-event">
      <h2>Register for Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Your Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterEvent;
