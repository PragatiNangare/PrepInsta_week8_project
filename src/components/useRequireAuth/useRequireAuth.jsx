// hooks/useRequireAuth.jsx
import { useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const useRequireAuth = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    navigate('/SignUp');
  }

  return null;
};

export default useRequireAuth;
