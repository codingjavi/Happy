import React, { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
const REGISTER_URL = '/register'; //to make api call to backend


function Register() {
  const userRef = useRef();
  const errRef = useRef();

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
    const result = USER_REGEX.text(user);
    console.log(result);
    console.log(user);

    setValidName(result);
  }, [user])

  //validating password
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

  return (
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
          <label htmlFor='password'>Password</label>
          <input 
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
          />
          <label htmlFor='matchPassword'>Confirm Password</label>
          <input
            type="password"
            id="matchPassword"
            value={matchPwd} 
            onChange={(e) => setMatchPwd(e.target.value)}
            required

          />
          <button>Register</button>
      </form>
    
    </section>
  )
}

export default Register
