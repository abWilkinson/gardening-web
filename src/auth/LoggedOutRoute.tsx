import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
export const LoggedOutRoute = () => {
    const { token } = useAuth();
  
    // Check if the user is authenticated
    if (token) {
      // If authenticated go to home page
      return <Navigate to="/dashboard" />;
    }
  
    // If not authenticated, render the child routes
    return <Outlet />;
  };