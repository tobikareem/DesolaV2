import { useEffect } from "react";
import authService from "../../services/authService";

const RedirectToLogin: React.FC = () => {
  useEffect(() => {
    authService.signIn();
  }, []);

  return <div>Redirecting to login...</div>; 
};

export default RedirectToLogin;
