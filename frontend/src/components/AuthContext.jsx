import React, { createContext, useState, useEffect, useCallback } from "react";
 import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



 const fetchAuthStatus = useCallback(async () => {
   try {
     console.log("fetching auth status");

     const response = await axios.get("http://localhost:5000/auth/check", {
       withCredentials: true, // Include credentials (cookies) with the request
     });

     if (response.status === 200) {
       const data = response.data;

       if (data.isAuthenticated) {
         console.log("user logged in", data.username);
         setUser({ username: data.username });
         console.log("state updated set to", data.username);
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
