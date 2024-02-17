import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

//custom hook that makes using AuthContext easier

const useAuth = () => {
    return useContext(AuthContext);
}
export default useAuth;