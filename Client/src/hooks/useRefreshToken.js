import axios from "../api/axios";
import useAuth from "./useAuth";


const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken}
        });

        //calls function when request fails(bc expired) so returns this new accessToken
        return response.data.accessToken;
    }

    return refresh;
};

export default useRefreshToken;