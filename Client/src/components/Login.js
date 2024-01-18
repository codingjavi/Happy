import React, { useRef, useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';//authContext not provider like index
import axios from '../api/axios';

//uri for backedn api
const LOGIN_URL = '/auth';

function Login() {

    //loading in setAuth from AuthProvider
        //to store STORING users authentication status and other info
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    //make this into an object?
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        //set focus on the first input (input goes to the element in focus)
        //set focus in input: ref= {userRef}
        userRef.current.focus();
    
    }, [])

    //resets the error msg when user CHANGES usernname or password
        //BC they're chainging it so remove it
    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    //where the api functionality is
    //e = event(passed if by default)
    const handleSubmit = async (e) => {
        //page doesnt reload when submit
        e.preventDefault();

        try {
            //making api call to backend
                //if backend expecting user & pwd then leave like that
                //else: ({userName: user, password:pwd})
                    //userName & password is what the API is expecting
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({user, pwd}),
                {
                    //saying the request is in JSON format
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            //? : avoiding errors: if response is not null then check data if data is null and so on.
                //if any are null then accessToken = undefined
            const accessToken = response?.data?.accessToken;

            //roles(made up) for the node.js backend (might not for us)
            const roles = response?.data?.roles;
              
            //SETTING AUTH (auth provider)
            //storing in global auth object
            //STORING ALL OF USERS INFO
                //to conditionally render components, manage user sessions, control access to certain routes
            setAuth({ user, pwd, roles, accessToken});
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {      //400 = missing info
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            //setting focus on error display - so screen reader can read the information
                //assertive so announced immediatly
            errRef.current.focus();
        }
        //axios: will throw an error if there is one, so dont have to fetch to check
            //also dont have to convert the response to JSON (axios does that)
        
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Logged In!</h1>
                </section>
            ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                />
                {/*never going to set focus on password, just tab to it*/ }
                <label htmlFor='password'>Password</label>
                <input 
                    type="password"
                    id="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account? <br />
                <span className='line'>
                    {/* Route link here for register */}
                </span>
            </p>
        </section>
            )}
        </>
    );
}

export default Login;