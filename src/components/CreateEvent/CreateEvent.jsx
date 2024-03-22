import React, { useState } from 'react';
import './CreateEvent.css';
import { api_uri } from '../../config';
import { Link } from 'react-router-dom';
import bokeh from './bokeh.png';

function CreateEvent({ isAuthenticated }) {
  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh', backgroundImage: `url(${bokeh})`,
      backgroundSize: 'cover', backgroundRepeat: 'no-repeat', zIndex : '-1' }}>
      <div style={{ textAlign: 'center' }}>
          <h2>You need to sign up to create an event. <Link to="/SignUp">Sign Up</Link></h2>
      </div>
      </div>
    );
}
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    capacity: '',
    registrationDeadline: '',
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
    try {
        const token = localStorage.getItem('token'); 

        if (!token) {
            console.error('Authorization token is missing');
            return; 
        }

        const response = await fetch(`${api_uri}/api/auth/createEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log(data);

        setFormData({
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            category: '',
            capacity: '',
            registrationDeadline: ''
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <>
      <div className="event-creation">
        <div className="background-image"></div>
        <div className="container-form">
          <h1>Create Event</h1><br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Enter Event Title:</label><br/>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Event Title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Enter Event Description:</label>
              <textarea
                id="description"
                name="description"
                placeholder="Event Description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="date">Enter Event Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                placeholder="Event Date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Enter Event Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                placeholder="Event Time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Enter Event Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Event Location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Enter Event Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="Event Category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="capacity">Enter Event Capacity:</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                placeholder="Event Capacity"
                value={formData.capacity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="registrationDeadline">Enter Registration Deadline:</label>
              <input
                type="date"
                id="registrationDeadline"
                name="registrationDeadline"
                placeholder="Registration Deadline"
                value={formData.registrationDeadline}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Create Event</button>
          </form><br />
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
