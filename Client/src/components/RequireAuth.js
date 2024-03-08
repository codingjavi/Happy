import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    //Outlet: child components protected by this require Auth
    //if user has accessToken then they can access this component
    return (
        auth?.accessToken
            ? 
                <Outlet />
            :    
                <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;