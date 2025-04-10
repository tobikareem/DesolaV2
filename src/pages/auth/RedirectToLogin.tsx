import { useEffect } from "react";
import authService from "../../services/authService";
import LoadingScreen from "../../components/layout/LoadingScreen";

const RedirectToLogin: React.FC = () => {
  useEffect(() => {
    authService.signIn();
  }, []);

  return <LoadingScreen message={"Redirecting..."}/>; 
};

export default RedirectToLogin;
