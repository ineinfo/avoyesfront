// AuthContext.js
"use client"
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import LoadingSpinner from '@/components/Loading';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ id: null });
    const [loading, setLoading] = useState(true); // Add loading state
    const router = useRouter();

    useEffect(() => {
        // Simulate checking for the 'id' cookie
        const cookieId = Cookies.get('id');

        if (cookieId) {
            // Set the auth id state if the cookie exists
            setAuth({ id: cookieId });
            setLoading(false);
        } else {
            // Redirect to login if the cookie does not exist
            router.push('/login');
        }

        // Set loading to false once the check is done
    }, [router]);

    // Show Loading component while the app is checking for the cookie
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook for easier access to the context
export const useAuth = () => {
    return useContext(AuthContext);
};

