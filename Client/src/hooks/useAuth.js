import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

//custom hook that makes using AuthContext easier

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}
export default useAuth;