import React, { useRef, useEffect, useState } from 'react';
//import AuthContext from '../context/AuthProvider';//authContext not provider like index
import axios from '../api/axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../static/Login.module.css';
import useAuth from '../hooks/useAuth';

//uri for backedn api
const LOGIN_URL = '/login';

function Login(props) {

    //loading in setAuth from AuthProvider
        //to store STORING users authentication status and other info
    //const { auth, setAuth } = useContext(AuthContext);
    const { setAuth, persist, setPersist } = useAuth();
    //hold reference to DOM element or value. changes to it DONT TRIGGER RE-RENDER and values stay the same if RENDER
    const userRef = useRef();
    const errRef = useRef();

    //taking the user to where they wanted to go
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    //make this into an object?
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('');
    //const [success, setSuccess] = useState(false);

    useEffect(() => {
        //console.log(auth)
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

            //USER TOKEN: keep it at cookie or local storage
                //When your app would like to retrieve data from API, append the token to request header every time. You can decrypt the token from backend middleware as logged in user or not.
            const accessToken = response?.data?.accessToken;
            console.log(accessToken);

            //roles(made up) for the node.js backend (might not for us)
            const roles = response?.data?.roles;
              
            //SETTING AUTH (auth provider)
            //storing in global auth object
            //STORING ALL OF USERS INFO
                //to conditionally render components, manage user sessions, control access to certain routes
            setAuth({ user, pwd, roles, accessToken });
            //localStorage.setItem("accessToken", accessToken)
            
            setUser('');
            setPwd('');
            //console.log(auth)
            console.log(from);
            //maybe change this
            navigate(from, { replace: true });
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

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (
        <>
            <h1 className={styles.h1}>Happy Health</h1>
        <section className={styles.login}>
            <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">{errMsg}</p>
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
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            </form>
            <p>
                Need an Account? <br />
                <span className='line'>
                    <Link to = "/register"> Click Here!</Link>
                </span>
            </p>
        </section>
            
        </>
    );
}

export default Login;