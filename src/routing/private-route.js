import {useAuthContext} from "../context/auth-context";
import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";

export function PrivateRoute({ element, requiredRole }) {
    const { isAuthenticated, hasRole } = useAuthContext();
    const [isAuthorized, setIsAuthorized] = useState(true);

    useEffect(() => {
        setIsAuthorized(isAuthenticated() && hasRole(requiredRole));
    }, []);


    return isAuthorized? element : <Navigate to="/login" />;
}