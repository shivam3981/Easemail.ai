import React from 'react'
import Navbar from './Navbar';
import { AuthProvider } from '@/contexts/AuthContext';

const Layout = ({ children }) => {
    return (
        <>
            <AuthProvider>
                <Navbar />
                {children}
            </AuthProvider>
        </>
    )
}

export default Layout;