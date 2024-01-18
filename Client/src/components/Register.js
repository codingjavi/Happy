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
  return (
    <div>
      
    </div>
  )
}

export default Register
