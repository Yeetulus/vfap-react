import {useAuthContext} from "../context/auth-context";
import {Navigate} from "react-router-dom";

export function PrivateRoute({ element, requiredRole }) {
    const { isAuthenticated, hasRole } = useAuthContext();

    const isAuthorized = isAuthenticated() && hasRole(requiredRole);

    return isAuthorized? element : <Navigate to="/login" />;
}