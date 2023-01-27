import {Navigate, useLocation} from "react-router-dom";
import {auth} from "./request";
import React from "react";

const ProtectedRoute = ({children}) => {
    let location = useLocation();
    if (!auth.isAuthenticated()) {
        return <Navigate to="/signin" state={{from: location}}/>;
    }
    return children;
}

export default ProtectedRoute;
