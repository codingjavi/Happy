import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                //get new access token
                console.log("PERSISTING")
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            //always runs finally (prevents ENDLESS ERROR LOOP)
            finally {
                isMounted && setIsLoading(false);
            }
        }

        //only run if user doesnt have access token
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    
        return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`is loading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>  {/* loading or show child components */}
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;
