// Home.jsx
import React, { useEffect, useState } from 'react';
import './Home.css'; 
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import featureImage1 from './feature11.png'; 
import featureImage2 from './feature1.png';
import featureImage3 from './feature3.png';
import { Link } from 'react-router-dom';

function Home() {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  return (
    <>
        <div className="home">
        <div className="hero">
            <div className="message">
            <h1>Welcome to our Event Management App</h1>
            <p>Plan, organize, and manage your events with ease!</p>
            <Link to="/BrowseEvent" className="btn">Browse Events</Link>
            </div>
        </div>
        <div className="features">
            <h1 style={{marginBottom:'40px'}}>Explore Features</h1>
            <div className="containerf">
            <div className="feature">
                <img src={featureImage1} alt="Feature 1" />
                <h2>Easy Event Creation</h2>
                <p>Create events in minutes with our intuitive interface.</p>
            </div>
            <div className="feature">
                <img src={featureImage2} alt="Feature 2" />
                <h2>Discover Events</h2>
                <p>Find upcoming events based on your interests and preferences.</p>
            </div>
            <div className="feature">
                <img src={featureImage3} alt="Feature 3" />
                <h2>Join Events</h2>
                <p>Register for events you're interested in attending.</p>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}

export default Home;
