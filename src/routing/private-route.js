import {useAuthContext} from "../context/auth-context";
import {Navigate} from "react-router-dom";

export function PrivateRoute({ element, requiredRole, ...rest }) {
    const { isAuthenticated, hasRole } = useAuthContext();

    const isAuthorized = isAuthenticated() && (!requiredRole || hasRole(requiredRole));

    return isAuthorized ? element : <Navigate to="/login" />;
}