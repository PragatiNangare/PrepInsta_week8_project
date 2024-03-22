import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header({ isAuthenticated, username, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/'); 
  };

  return (
    <header className="header">
      <div className="containerr">
        <div className="header-content">
          <Link to="/" className="brand">Event Manager</Link>
          <div className="header-right">
            <nav className="nav">
              <ul className="nav-list">
              {!isAuthenticated && (
                    <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                )}
                {isAuthenticated && (
                  <li className="nav-item"><Link to="/BrowseEvent" className="nav-link">Browse Events</Link></li>
                )}
                <li className="nav-item"><Link to="/AboutUs" className="nav-link">About Us</Link></li>
                <li className="nav-item"><Link to="/CreateEvent" className="nav-link">Create Event</Link></li>
                {!isAuthenticated && (
                  <li className="nav-item">
                    <Link to="/SignUp" className="nav-link">Sign Up</Link>
                  </li>
                )}
                {isAuthenticated && (
                  <>
                    <li className="nav-item">
                      <button onClick={handleLogout} className="nav-button">Logout</button>
                    </li>
                    <li className="nav-item">
                      <div className="username">Welcome, {username}</div>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
