import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';
import { api_uri } from '../../config';

function EventCardWithUnregister({ event, handleUnregisterEvent, isAuthenticated }) {
  const navigate = useNavigate();
  const { _id, title, description, date, time, location, category } = event;

  const handleUnregistration = async () => {
    if (!isAuthenticated) {
      console.log('User not authenticated. Redirecting to login page...');
      navigate('/Login');
      return;
    }

    try {
      const response = await fetch(`${api_uri}/api/auth/unregister-event/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        handleUnregisterEvent(_id);
      } else {
        console.error('Error unregistering for event:', response.statusText);
      }
    } catch (error) {
      console.error('Error unregistering for event:', error);
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
      <button  onClick={handleUnregistration}>Unregister</button>
    </div>
  );
}

export default EventCardWithUnregister;
