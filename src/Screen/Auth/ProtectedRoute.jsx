import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('farmerToken');

    if (!token) {
        const isRegistered = localStorage.getItem('isFarmerRegistered');
        if (isRegistered) {
            return <Navigate to="/farmer/login" replace />;
        } else {
            return <Navigate to="/farmer/signup" replace />;
        }
    }
    return children;
};

export default ProtectedRoute;
