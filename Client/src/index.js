import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider'; //provides context to our app
//import './styles/tailwind.css';
  //provider makes sure all components have access to provided value
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AuthProvider>
      <App />
    </AuthProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
/* 
notes: 
fix login and registering styling like dave

add section for all the vitamins
  previous viatmins section
buying functionality (add vitamin to cart?) - stripe or paypal
  #buy
  #handling buying and sending (Stripe)
  #page for add to cart and check out 
  #email for confitmation

or just have link redirection

maybe refresh token database filter thing

fix styling



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