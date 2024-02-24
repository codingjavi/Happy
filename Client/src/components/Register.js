import React, { useRef, useState, useEffect, useContext } from 'react'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
//regex: how we're validating user and password
  //[]: start with lower case or upper case a - z
  //2nd []: can be followed by upper or lower a -z and 0-9 or - _
  //{}: has to have 4 - 23 chars
//password:
  //(): has to have atleast one lowercase
  //(): has to heve atleast one upper case
  //(): has to have one of these special characters
  //{}: 9 - 24 chars long
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/api/register'; //to make api call to backend


function Register() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  //where we validate user name
    //when user change function runs again
  useEffect(() => {
    //True if valid False if not
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);

    setValidName(result);
  }, [user])

  //validating password (when change password of confirm password both will be checked for validation)
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);    //boolean checking if password valid
    const match = pwd === matchPwd;
    setValidMatch(match);   //boolean checking if passwords match
  }, [pwd, matchPwd])

  //reseting error message if user changes their input (bc they read it)
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    //if button enabled w JS hack then check again
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if(!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log(JSON.stringify({user, pwd}));

    try {
      //making api call to backend
          //if backend expecting user & pwd then leave like that
          //else: ({userName: user, password:pwd})
              //userName & password is what the API is expecting
      console.log(JSON.stringify({user, pwd}))
      const response = await axios.post(REGISTER_URL, 
          JSON.stringify({user, pwd}),
          {
              //saying the request is in JSON format
              headers: { 'Content-Type': 'application/json'}, 
              withCredentials: true
          }
      );
      console.log("response: "+ response);
      //? : avoiding errors: if response is not null then check data if data is null and so on.
          //if any are null then accessToken = undefined
      const accessToken = response?.data?.accessToken;

      //roles(made up) for the node.js backend (might not for us)
      const roles = response?.data?.roles;
        
      //SETTING AUTH (auth provider)
      //storing in global auth object
      //STORING ALL OF USERS INFO
          //to conditionally render components, manage user sessions, control access to certain routes
      setUser('');
      setPwd('');
      setAuth({ user, pwd, roles, accessToken})
      //setSuccess(true);
      //to authenticate
      navigate('/login');
    } catch (err) {
        if(!err?.response) {
            setErrMsg('No Server Response')
        } else if (err.response?.status === 409) {
            setErrMsg('Username Taken');
        } else {
            setErrMsg('Registration Failed');
        }
        //setting focus on error display - so screen reader can read the information
            //assertive so announced immediatly
        errRef.current.focus();
      }


  }

  return (
    <>
      {success ? (
          <section>
              <h1>Success!</h1>
              <p>
                  <a href="#">Sign In</a>
              </p>
          </section>
      ) : (
        <section>
          {/* if errMsg truthy then errmsg css which displays it
              else: put it offscreen (not entirly out of document)
              aria-live="assertive": when put focus on errRef then ANNOUNCED THROUGH SCREEN READER
          */}
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
              <label htmlFor='username'>
                Username
                {/*CHECK MARK if valid username */}
                <span className={validName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                {/*X if not valid */}
                <span className={validName || !user ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes}/>
                </span>
              </label>
              {/*
              aria-invalid: shows invalid if "true", show true if validName is false (so not a valid username given)
              aria-describedby: describes input field can put requirements screen reader can read out
              onFocus: when user clicks on input field the event handler runs (set userFocus to True)
              onBlur: when user clicks OUT on input field then event handler runs
              */}
              <input 
                  type="text"
                  id="username"
                  ref={userRef}
                  value={user}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby='uidnote'
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
              />
              {/* show instructions conditional */}
              <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>


              {/*never going to set focus on password, just tab to it*/ }
              <label htmlFor='password'>
                Password
                <span className={validPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !user ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes}/>
                </span>
              </label>
              {/* MAY NOT NEED VALUE HERE!!!! */}
              <input 
                  type="password"
                  id="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby='pwdnote'
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
              />
              <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                {/* using aria-label: so screen reader can read description */}
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>


              <label htmlFor='confirm_pwd'>
                Confirm Password
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes}/>
                </span>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                value={matchPwd} 
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby='confirmnote'
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p id='confirmnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>


              <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
          </form>
          <p>
            Already registered? <br />
            <span className='line'>
              <Link to ="/login"> Sign In </Link>
            </span>
          </p>
        
        </section>
    )}
    </>
  )
}

export default Register
