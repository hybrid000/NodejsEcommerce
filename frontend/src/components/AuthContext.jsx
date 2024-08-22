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

      if (response.ok) {
        const data = await response.json();

        if (data.isAuthenticated) {
          setUser({ username: data.username });
        } else {
          setUser(null);
        }
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

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
