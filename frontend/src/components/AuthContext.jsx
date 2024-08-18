// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // Function to check if the user is authenticated
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/checkAuth', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsAuthenticated(true);
                    setUsername(data.username);
                } else {
                    setIsAuthenticated(false);
                    setUsername(null);
                }
            } catch (error) {
                console.error('Auth check failed', error);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, username }}>
            {children}
        </AuthContext.Provider>
    );
};
