import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';
import { api_uri } from '../../config';

function EventCard({ event, handleRegisterEvent, isAuthenticated }) {
  const { _id, title, description, date, time, location, category } = event;
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistration = async () => {
    if (!isAuthenticated) {
      console.log('User not authenticated. Redirecting to login page...');
      // Handle unauthenticated user (e.g., redirect to login page)
      return;
    }

    try {
      const response = await fetch(`${api_uri}/api/auth/register-event/${_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setIsRegistered(true); // Update button state to indicate registration
      } else {
        console.error('Error registering for event:', response.statusText);
        // Handle registration error
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      // Handle network error
    }
  };

  return (
    <div className="event-card">
      <div className="event-info">
        <h2>{title}</h2>
        <p>{description}</p>
        <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Category:</strong> {category}</p>
      </div>
      {isRegistered ? (
        <button className="registered-button" disabled>Registered</button>
      ) : (
        <button className="register-button" onClick={handleRegistration}>Register</button>
      )}
    </div>
  );
}

export default EventCard;
