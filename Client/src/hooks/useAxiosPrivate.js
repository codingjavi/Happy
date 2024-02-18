//to attach interceptors(like event listeners) to axios instance
    //gotta also remove them too (or else too much)
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        //if a request doesn't have an authorization header
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            //if token expired then we're in async
            async (error) => {
                //gettins last request and making sure it was an expired token error
                //(403 forbidden)
                const prevRequest = error?.config;
                //prevRequenst.set makes sure we dont get loops of 403 and make sure we already sent this
                if (error?.reponse?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    //sending request against but NEW ACCESSTOKEN
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        
        //gotta remove interceptors so -> CLEAN UP FUNCTION!!!!
        return () => {
            axiosPrivate.interceptors.response.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;