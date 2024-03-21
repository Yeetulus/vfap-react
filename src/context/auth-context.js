import {createContext, useContext, useEffect, useState} from "react";
import {post} from "../api/api";
import {accessTokenName, refreshTokenName} from "../utils/tokens";
import {errorType, showSnackbar, successType} from "../utils/snackbar-display";
import {useNavigate} from "react-router-dom";
import {admin, librarian} from "../utils/roles";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const userId= "userId";
export const userRole = "userRole";

export function AuthProvider({children}) {

    const [authenticated, setAuthenticated] = useState(false);
    const [role, setRole] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem(accessTokenName);
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                setAuthenticated(false);
                setRole(undefined);
                localStorage.removeItem(userId);
                localStorage.removeItem(userRole);
                localStorage.removeItem(refreshTokenName);
                localStorage.removeItem(accessTokenName);
            } else {
                setAuthenticated(true);
                setRole(localStorage.getItem(userRole));
            }
        }
    });
    const isAuthenticated = () =>{
        return authenticated && authenticated === true && role !== undefined;
    }
    const hasRole = (requiredRole) => {
        return role !== undefined && requiredRole === role;
    }

    const authSuccess = (data) => {
        localStorage.setItem(userId, data.user_id);
        localStorage.setItem(refreshTokenName, data.refresh_token);
        localStorage.setItem(accessTokenName, data.access_token);
        localStorage.setItem(userRole, data.role);

        setAuthenticated(true);
        setRole(data.role);

        showSnackbar("Logged in", successType);
        navigateToPage(data.role);
    }

    const navigateToPage = (role) => {
        if (role === librarian){
            navigate("/librarian");
        } else if (role === admin) {
            navigate("/admin");
        } else {
            navigate("/");
        }
    }

    const login = (email, password) =>{
        const url = "auth/login/authenticate";
        const body = {
            email: email,
            password: password
        };
        const response = (data) => {
            authSuccess(data);
        }
        const error = (error) => {
            console.error(error);
            showSnackbar("Incorrect login input", errorType);
        }
        post(url, {}, body, false, response, error);
    }

    const logout = () => {

        setAuthenticated(false);
        setRole(undefined);
        localStorage.removeItem(userId);
        localStorage.removeItem(userRole);
        localStorage.removeItem(refreshTokenName);
        localStorage.removeItem(accessTokenName);
        navigate("/login");
    }

    return(
        <AuthContext.Provider value={{
            authenticated,
            setAuthenticated,
            role,
            setRole,
            isAuthenticated,
            hasRole,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext);
}