import {useAuthContext} from "../context/auth-context";
import {Navigate, Route} from "react-router-dom";

export function PrivateRoute({ element, requiredRole, ...rest }) {
    const { isAuthenticated, hasRole } = useAuthContext();

    const isAuthorized = isAuthenticated() && (!requiredRole || hasRole(requiredRole));

    return isAuthorized ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
}