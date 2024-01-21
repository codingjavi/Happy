import React, { useRef, useEffect, useState, useContext } from 'react'
import Navbar from './Navbar'
import AuthContext from '../context/AuthProvider';
import { useNavigate, Navigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    

    if(!auth.hasOwnProperty('user')){
        return <Navigate replace to="/login" />;
    } else {
        return (
        <div>
            <Navbar />
        
            <h1>Welcome {auth.user}</h1>

        </div>
    )
    }
    
}

export default Dashboard
