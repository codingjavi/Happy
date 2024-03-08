import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        

        const verifyRefreshToken = async () => {
            try {
                //get new access token
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            //always runs finally (prevents ENDLESS ERROR LOOP)
            finally {
                setIsLoading(false);
            }
        }

        //only run if user doesnt have access token
        //sets to false if we do have an accessToken to begin with
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    
        
    }, [])

    return (
        <> 
            {isLoading ? <p>Loading...</p> : <Outlet />}
        </>
    )
}

export default PersistLogin;
