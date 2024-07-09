import React, { useState, useEffect } from 'react';
import EventCardWithUnregister from '../EventCard/EventCardWithUnRegister'; 
import './RegisteredEvents.css';
import { api_uri } from '../../config';

function RegisteredEvents({ userId = '' }) {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchRegisteredEvents();
    }
  }, [userId]);

  const fetchRegisteredEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${api_uri}/api/auth/registered-events/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch registered events');
      }
      const data = await response.json();
      setRegisteredEvents(data);
    } catch (error) {
      console.error('Error fetching registered events:', error);
    }
  };

  const handleUnregisterEvent = (eventId) => {
    setRegisteredEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
  };

  return (
    <div className="registered-events">
      <div className="container">
        <h1>Registered Events</h1>
        {registeredEvents.length === 0 ? (
          <p>No events registered yet.</p>
        ) : (
          <div className="event-list">
            {registeredEvents.map((event) => (
              <EventCardWithUnregister
                key={event._id}
                event={event}
                handleUnregisterEvent={handleUnregisterEvent}
                isAuthenticated={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisteredEvents;
