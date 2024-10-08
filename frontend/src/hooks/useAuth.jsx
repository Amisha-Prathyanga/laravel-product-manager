import { useEffect, useState } from "react";

// Custom hook to manage authentication
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      const expirationTime = localStorage.getItem("tokenExpiration");

      if (token && expirationTime) {
        const currentTime = Date.now();
        if (currentTime >= parseInt(expirationTime, 10)) {
          // Token has expired
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          setIsAuthenticated(false);
        } else {
          // Token is valid
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return [isAuthenticated, setIsAuthenticated];
};

export default useAuth;
