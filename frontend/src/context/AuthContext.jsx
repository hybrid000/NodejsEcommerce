import React, { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAuthStatus = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/check", {
        method: "GET",
        credentials: "include", 
      });

      console.log("Received response data:", response);

      if (response.ok) {
        const data = await response.json();

        if (data.isAuthenticated) {
          console.log("AuthContext://user logged in", data.username);
          setUser({ username: data.username });
          console.log("AuthContext://state updated set to", data.username);
        } else {
          console.log("AuthContext://user not logged in");
          setUser(null);
        }
      } else {
        console.error("Auth check failed with status:", response.status);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuthStatus();
  }, [fetchAuthStatus]);

  // Logout function
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/user/logout", {
        method: "GET",
        credentials: "include",
      });
      setUser(null); 
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, fetchAuthStatus, logout }}
    >
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
