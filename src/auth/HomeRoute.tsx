import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
export const HomeRoute = () => {
    const { token } = useAuth();
  
    // Check if the user is authenticated
    if (token) {
      // If  authenticated, redirect to the dashboard page
      return <Navigate to="/dashboard" />;
    }
  
    // If not authenticated we can show home page
    return <Navigate to="/" />;
  };