import React, {useContext} from 'react'
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';

const LOGOUT_URL = '/logout';

function Navbar() {
  const { auth, setAuth } = useContext(AuthContext);
  const handleSignOut = async() => {
  localStorage.removeItem('token'); // Remove JWT from local storage
  /*
  try {
    const response = await axios({ 
        method: 'post', 
        url: LOGOUT_URL, 
        headers: { 'Authorization': 'Bearer ' + auth.accessToken, 'Content-Type': 'application/json' },
            
    })
    
    console.log(response);

    } catch(err) {
        // Handle error
        if (err.response) {
            // The request was made and the server responded with a status code
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', err.message);
        }
    };*/
  }
return (
  <nav className='navbar'>
    <h1>Happy Health</h1>
    <h2>
      <span style={{ cursor: 'pointer' }} onClick={handleSignOut}>
        Sign out
      </span>
    </h2>
  </nav>
)
}

export default Navbar
