import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BsChevronDown } from 'react-icons/bs';
import { Button } from 'bootstrap';
import { useState } from 'react';

function Header({ isAuthenticated, username, onLogout }) {
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState('/');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const handleNavLinkClick = (path) => {
    setActiveLink(path);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
                    <li className="nav-item"><Link to="/Browse" className="nav-link">Explore Events</Link></li>
                )}
                {isAuthenticated && (
                  <li className="nav-item"><Link to="/BrowseEvent" className="nav-link">Browse Events</Link></li>
                )}
                {!isAuthenticated && (
                <li className="nav-item"><Link to="/AboutUs" className="nav-link">About Us</Link></li>
                )}
                <li className="nav-item"><Link to="/CreateEvent" className="nav-link">Create Event</Link></li>
                {!isAuthenticated && (
                  <li className="nav-item">
                    <Link to="/SignUp" className="nav-link">Sign Up</Link>
                  </li>
                )}
                {isAuthenticated && (
                  <li className='nav-item'>
                    <Link to="/RegisteredEvents" className='nav-link'>Registered Events</Link>
                  </li>
                )}
                {isAuthenticated && (
                  <>
                    <li className="nav-item">
                      <div className="username" onClick={toggleDropdown}>Welcome, {username} <BsChevronDown /> </div>
                      {dropdownOpen && (
                          <div className="dropdown-content">
                            <button onClick={handleLogout}>Logout</button>
                          </div>
                        )}
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
