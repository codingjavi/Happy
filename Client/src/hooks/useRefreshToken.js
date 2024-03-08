import axios from "../api/axios";
import useAuth from "./useAuth";


const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios({ 
            method: 'get', 
            url: '/refresh', 
            withCredentials:true
        })
        
        /*
        const response = await axios.get('/refresh', {
            withCredentials: true
        });*/

        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken}
        });

        //calls function when request fails(bc expired) so returns this new accessToken
        return response.data.accessToken;
    }

    return refresh;
};

export default useRefreshToken;