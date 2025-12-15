import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user && user?.roles?.includes("ROLE_SELLER");
    const location = useLocation();

    // 1. Handle Public Pages (Login/Register)
    if (publicPage) {
        return user ? <Navigate to="/" /> : <Outlet />
    }

    // 2. Handle Admin/Seller Pages
    if (adminOnly) {
        // If they are not Admin and not Seller, block them
        if (!isAdmin && !isSeller) {
            return <Navigate to="/"/>
        }

        // Specific logic for Sellers
        if (isSeller && !isAdmin) {
            const sellerAllowedPaths = ["/admin/orders", "/admin/products"];
            const sellerAllowed = sellerAllowedPaths.some(path => 
                location.pathname.startsWith(path)
            );
            if (!sellerAllowed) {
                return <Navigate to="/" replace />
            }
        }
        
        // If allowed, render the admin page
        return <Outlet />;
    }

    // 3. Handle Standard User Pages (Checkout, Profile)
    // For these pages, we just need to know if the user is logged in.
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;