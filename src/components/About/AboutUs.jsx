// components/AboutUs.jsx

import React from 'react';
import './AboutUs.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';

function AboutUs() {
  return (
    <>
    <div className="about-us">
      <div className="container">
        <h2>About Us</h2>
        <p>Welcome to our Event Manager application. We are dedicated to providing you with the best platform to plan, organize, and manage your events with ease.</p>
        <p>Our team is committed to delivering an exceptional user experience, and we're constantly working on improving our services to meet your needs.</p>
        <Contact />
      </div>
    </div>
    </>
  );
}

export default AboutUs;
