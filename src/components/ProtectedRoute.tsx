import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

interface JWTPayload {
  id: string;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      // Client-side expiry check
      try {
        const decoded = jwtDecode<JWTPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setIsChecking(false);
          return;
        }

        // Token exists and not expired
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token decode error:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();

    // Check every 5 seconds for expired token
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode<JWTPayload>(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        } catch (error) {
          console.error("Token decode error in interval:", error);
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
