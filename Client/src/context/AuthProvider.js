//using the context API
import { createContext, useEffect, useState } from "react";



//MANAGES auth state for entire app
const AuthContext = createContext({});
//context provides a way to pass data through components W OUT PROPS

//provider: provides data to our diffrent components
    //children: components in provider

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    return (
        //where (components) we want to make the context available
        //value: value passed to compononent 
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;