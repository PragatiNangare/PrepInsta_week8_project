import React, { useState, useEffect } from 'react';

function RegisteredEvents({ userId }) {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    fetchRegisteredEvents();
  }, [userId]);

  const fetchRegisteredEvents = async () => {
    try {
      const response = await fetch(`/api/auth/registered-events/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch registered events');
      }
      const data = await response.json();
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
