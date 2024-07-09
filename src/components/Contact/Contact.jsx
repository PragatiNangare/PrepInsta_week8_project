import React, { useState } from 'react';
import '../Contact/Contact.css';

import { api_uri } from '../../config';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const contactData = {
      name,
      email,
      subject,
      message,
    };

    try {
      const response = await fetch(`${api_uri}/api/auth/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        alert('Message sent successfully');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message');
    }
  };

  return (
    <>
      <div className="contact container">
        <div className="banner">
          <div className="item">
            <h4>Address</h4>
            <p>Mumbai, Maharashtra</p>
          </div>
          <div className="item">
            <h4>Call Us</h4>
            <p>Call Us: +91-321-1111111</p>
          </div>
          <div className="item">
            <h4>Mail Us</h4>
            <p>events@gmail.com</p>
          </div>
        </div>
        <div className="banner">
          <div className="item">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119888.34355222118!2d72.78198835083283!3d18.958278150811607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6a505627b29%3A0x75b7e2db1bfb63c1!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625842153427!5m2!1sen!2sin"
            style={{ border: 0, width: "100%", height: "450px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          </div>
          <div className="item">
            <form onSubmit={handleSendMessage}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                rows={10}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className='button'>Send</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
