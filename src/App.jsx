// App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import AboutUs from './components/About/AboutUs';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import CreateEvent from './components/CreateEvent/CreateEvent';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BrowseEvents from './components/BrowseEvents/BrowseEvent';
import Contact from './components/Contact/Contact';
import RegisteredEvents from './components/RegisteredEvents/RegisteredEvents';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = async (userData) => {
    localStorage.setItem('token', userData.token);
    setIsAuthenticated(true);
    setUsername(userData.username); 
    localStorage.setItem('isAuthenticated', true);
};


const handleLogout = () => {
  localStorage.removeItem('token');
  setIsAuthenticated(false);
  setUsername('');
  localStorage.removeItem('isAuthenticated');

};


  console.log('isAuthenticated:', isAuthenticated);
  console.log('username:', username);

  return (
    <div className='wrapper'>
      <div className="main-content">
        <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} username={username}  onLogout={handleLogout} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path='/AboutUs' element={<AboutUs />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path="*" element={<NotFound />} />
            <Route path='/SignUp' element={<SignUp />} />
            {/* Pass isAuthenticated, username, handleLogin, and handleLogout as props to Login component */}
            <Route path='/Login' element={<Login isAuthenticated={isAuthenticated} username={username} onLogin={handleLogin} />} />
            <Route path='/CreateEvent' element={<CreateEvent isAuthenticated={isAuthenticated} />} />
            <Route path='/BrowseEvent' element={<BrowseEvents isAuthenticated={isAuthenticated} username={username} onLogin={handleLogin} />} />
        
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;