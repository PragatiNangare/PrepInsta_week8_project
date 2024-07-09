// App.jsx
import React, { useState ,useEffect} from 'react';
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
import Browse from './components/Browse/Browse';
import Contact from './components/Contact/Contact';
import RegisteredEvents from './components/RegisteredEvents/RegisteredEvents';
import { api_uri } from './config';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId]= useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token validity
      fetch(`${api_uri}/api/auth/verify-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Token verification failed');
        })
        .then(data => {
          setIsAuthenticated(true);
          setUsername(data.username);
          setUserId(data.userId);
        })
        .catch(error => {
          console.error('Token verification error:', error);
          setIsAuthenticated(false);
        });
    }
  }, []);

  const handleLogin = async (userData) => {
    localStorage.setItem('token', userData.token);
    setIsAuthenticated(true);
    setUsername(userData.username); 
    setUserId(userData.id);
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('userId', userData.id)
};


const handleLogout = () => {
  localStorage.removeItem('token');
  setIsAuthenticated(false);
  setUsername('');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userId');
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
            <Route path='/Browse' element={<Browse isAuthenticated={isAuthenticated} username={username} onLogin={handleLogin} />} />
            <Route path='/RegisteredEvents' element={<RegisteredEvents userId={userId} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;