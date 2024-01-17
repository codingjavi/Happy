import React, { useRef, useEffect, useState } from 'react';

function Login() {
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
        //BC duh they're chainging it so remove it
    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    //e = event(passed if by default)
    const handleSubmit = async (e) => {
        //page doesnt reload when submit
        e.preventDefault();
        setSuccess(true)
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
                {/*never going to set focus on password*/ }
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