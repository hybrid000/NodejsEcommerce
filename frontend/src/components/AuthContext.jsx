import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect running");
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/check-auth", {
          method: "GET",
          credentials: "include",
        });

        console.log("fetched login status");

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched user login status:", data); // Log data
          setUser(data.user);
        } else {
          console.log("not logged it");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading ? children : <div>Loading...</div>}{" "}
      {/* Optional loading state */}
    </AuthContext.Provider>
  );
};
