import React, { useState, useEffect } from 'react';

function RegisteredEvents({ userId = '' }) {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  console.log(userId);

  useEffect(() => {
    if (userId) {
      fetchRegisteredEvents();
    }
  }, [userId]);


  const fetchRegisteredEvents = async () => {
    try {
      console.log('Fetching registered events');
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5500/api/auth/registered-events/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch registered events');
      }
      const data = await response.json();
      console.log(data); // Log the response data
      setRegisteredEvents(data);
    } catch (error) {
      console.error('Error fetching registered events:', error);
    }
  };
  return (
    <div className="registered-events">
      <h2>Registered Events</h2>
      {registeredEvents.length === 0 ? (
        <p>No events registered yet.</p>
      ) : (
        <ul>
          {registeredEvents.map(event => (
            <li key={event._id}>{event.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RegisteredEvents;
