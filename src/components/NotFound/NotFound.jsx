// Error.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from './error.png';

function NotFound() {
  return (
    <div style={{textAlign:'center'}}>
      <img src={errorImage} alt="404 Error" style={{height: '400px', borderRadius: '20%' }}/><br/>
      <h1 style={{margin:'20px', fontWeight: 'bold', fontSize: '20px'}}>Uh Oh. Page Not Found</h1><br/>
      <p>Sorry, the page you are looking for doesn't exist or has been moved.</p><br/>
      Go to<button style={{border:'none', backgroundColor: '#658EAA', margin:'20px'}}><Link to={'/'} className='LinkData'style={{ textDecoration: 'none', color: 'white' }}> Home</Link></button>
    </div>
  );
}

export default NotFound;
