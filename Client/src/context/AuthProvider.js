//using the context API
import { createContext, useEffect, useState } from "react";

const defaultValue = {
    setAuth: () => {},
    auth: localStorage.getItem("token")
}; 

//MANAGES auth state for entire app
const AuthContext = createContext(defaultValue);
//context provides a way to pass data through components W OUT PROPS

//provider: provides data to our diffrent components
    //children: components in provider

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(defaultValue.auth);

    useEffect(() => {
        localStorage.setItem("token", auth);
    }, [auth]);

    const contextValue = {
        setAuth,
        auth
    };

    return (
        //where (components) we want to make the context available
        //value: value passed to compononent 
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;