import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import * as jwt_decode from "jwt-decode";


const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwt_decode.jwtDecode(token);
        setIsAuthenticated(true);
        if (decodedToken.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Token decoding failed", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !isAdmin) {
    navigate("/"); 
    return null; 
  }

  return children;
};

export default PrivateRoute;
