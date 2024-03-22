// components/BrowseEvents.jsx

import React, { useState, useEffect } from 'react';
import './BrowseEvent.css';
import EventCard from '../EventCard/EventCard'; // Assuming you have a separate component for EventCard
import { api_uri } from '../../config';
import RegisteredEvents from '../RegisteredEvents/RegisteredEvents';

function BrowseEvents({ isAuthenticated, username, onLogin }) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showRegisteredEvents, setShowRegisteredEvents] = useState(false); 

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${api_uri}/api/auth/events`);
      console.log('Response:', response);
      const data = await response.json();
      console.log('Data:', data);
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterEvents(e.target.value, categoryFilter); // Fix: Use e.target.value directly instead of searchTerm
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
    filterEvents(searchTerm, e.target.value);
  };

  const filterEvents = (searchTerm, category) => {
    let filtered = events;
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter(event => event.category === category);
    }
    setFilteredEvents(filtered);
  };

  const toggleRegisteredEvents = () => {
    setShowRegisteredEvents(!showRegisteredEvents);
  };

  const handleRegisterEvent = async (eventId) => {
    try {
      const response = await fetch(`${api_uri}/api/auth/register-event/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
        },
      });
      if (response.ok) {
        console.log("In handleRegisterEvent");
      } else {
        // Handle registration error
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  console.log('isAuthenticated in Login:', isAuthenticated);
  console.log('username in Login:', username);

  return (
    <>
      <div className="browse-events">
        <div className="container">
          <h1>Browse Events</h1>
          <div className="filter-options">
            <input className='search'
              type="text"
              placeholder="Search Events"
              value={searchTerm}
              onChange={handleSearch}
            />
            <select onChange={handleCategoryFilter}>
              <option value="">All Categories</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Networking">Networking</option> {/* New category */}
              <option value="Art Exhibition">Art Exhibition</option> {/* New category */}
              <option value="Retreat">Retreat</option> {/* New category */}
              {/* Add more options based on your categories */}
            </select>
          </div>
          <div className="event-list">
            {filteredEvents.map(event => (
              <EventCard key={event._id} event={event} handleRegisterEvent={handleRegisterEvent} isAuthenticated={isAuthenticated} />

            ))}
          </div>
          {isAuthenticated && (
          <button className="viewEvents" onClick={toggleRegisteredEvents}>
            {showRegisteredEvents ? 'Hide Registered Events' : 'View Registered Events'}
          </button>
          )}
          {showRegisteredEvents && (
            <RegisteredEvents isAuthenticated={isAuthenticated} />
          )}
        </div>
      </div>
    </>
  );
}

export default BrowseEvents;
