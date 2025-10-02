import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthService';
import { refreshToken } from '../services/AuthService';

const ProtectedRoute = () => {
  const { isLoggedIn, setAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoggedIn()) {
        try {
          const { accessToken } = await refreshToken();
          setAccessToken(accessToken);
          console.log('Auth guard: Refresh succeeded, allowing access');
        } catch (err) {
          console.log('Auth guard: Refresh failed, redirecting to login');
          navigate('/');
        }
      }
    };
    checkAuth();
  }, [isLoggedIn, setAccessToken, navigate]);

  return isLoggedIn() ? <Outlet /> : null; // Or loading spinner
};

export default ProtectedRoute;