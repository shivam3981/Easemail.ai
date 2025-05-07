'use client';
import { useRouter } from "next/navigation";
import { createContext, useState, useContext } from "react";
import axios from "axios"; // Missing import for axios

// Set axios to include credentials with all requests
axios.defaults.withCredentials = true;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const router = useRouter();

    const [currentUser, setCurrentUser] = useState(
        typeof window !== 'undefined' ? localStorage.getItem("user") : null
    );

    const [loggedIn, setLoggedIn] = useState(currentUser !== null);

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
        setLoggedIn(false);
        router.push("/login");
    };

    return (
        <AppContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                loggedIn,
                setLoggedIn,
                logout,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Use default export for the hook
const useAppContext = () => useContext(AppContext);
export default useAppContext;