import React, { useRef, useEffect, useState, useContext } from 'react'
import Navbar from './Navbar'
import AuthContext from '../context/AuthProvider';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import '../static/Dashboard.css' //we do have to import it

/*
{first ? (
    <section>
        <h1>Success!</h1>
        <p>
            <a href="#">Sign In</a>
        </p>
    </section>
) : (
    
)}
*/

function Dashboard() {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    

    if(!auth.hasOwnProperty('user')){
        return <Navigate replace to="/login" />;
    } else {
        return (
            <body>
                <Navbar />
                <h1>Welcome to Happy Health {auth.user}</h1>

                <div class = "eval">     
                    <img class = "eval_pic" src="assets/images/eval.jpg" alt="none" />
                    <h2><Link to = "/survey"> Get evaluated here!</Link></h2>
                    <p>By taking a quick survey we can immediately see what vitamins will be best for you</p>
                </div> 
               
                
                <div class = "check">
                    <img class = "check_pic" src="assets/images/vitamins.jpg" alt="none" />
                    <h2><a href="{{ url_for('results') }}"> Check your vitamins here!</a> </h2>
                    <p>Keep track of you vitamins here</p>
                </div>
                
            </body>
    )
    }
    
}

export default Dashboard


