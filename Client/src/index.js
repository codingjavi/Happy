import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider'; //provides context to our app
//import './styles/tailwind.css';
  //provider makes sure all components have access to provided value
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
/* 
REFRESH TOKEN FUNC WORKS
  NOW TRY TO FILTER ARRAY TO ONLY KEEP ONES THAT IT NEEDS LIKE IN GITHUB
  ALSO sign out and other api calls aren't working weird



ITS APPENING THE CHARS ONE BY ONE INSTEAD OF ENTIRE REFRESHTOKEN
trying to fix postgres models errors
create the postgresql url to connect
STORING REFRESHTOKEN IN COOKIE AND USING THAT TO GET REFRESHTOKEN
DEBUG REFRESH TOKEN THING - (just want one refresh token)
CRAETE REFRESH API(), fix the navigate(from) thing in login
USE useAxiosPrivate wherever you need to make an API CALL with JWT (does refresh token)
  if users cookie expires then it redirects them back to login to re authenticate (usually a day long)

trying to make refresh token functianlity to work (maybe isAuth) - 
  MAKE REFRESH TOKEN API CALL 
making sure refresh doesn't reset our tokens and take us out to login page


*/