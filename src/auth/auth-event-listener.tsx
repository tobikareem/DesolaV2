import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SESSION_VALUES } from '../utils/constants';
import { CustomStorage } from '../utils/customStorage';

const storage = new CustomStorage();

/**
 * Auth Event Listener Component
 * Handles global auth events and responds appropriately
 */
const AuthEventListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRequired = () => {
      toast.info("Your session has expired. Please sign in again.", {
        autoClose: 5000,
        toastId: "auth-required"
      });

      const currentPath = window.location.pathname;
      if (currentPath !== '/' && !currentPath.includes('/reset')) {
        storage.setItem(SESSION_VALUES.postLoginRedirectUrl, currentPath);
      }

      storage.removeItem(SESSION_VALUES.azure_isAuthenticated);
      
      navigate('/');
    };

    window.addEventListener('auth:interactive-required', handleAuthRequired);

    // Cleanup
    return () => {
      window.removeEventListener('auth:interactive-required', handleAuthRequired);
    };
  }, [navigate]);

  return null;
};

export default AuthEventListener;