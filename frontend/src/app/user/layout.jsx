import { AuthProvider } from '@/contexts/AuthContext';
import React from 'react'

const Layout = ({children}) => {
  return (
    <AuthProvider>{children}</AuthProvider>
  )
}

export default Layout;