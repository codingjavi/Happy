import React, { useState, useEffect, useContext } from 'react'
import axios from '../api/axios'
import Navbar from './Navbar'
import AuthContext from '../context/AuthProvider';


function Results() {
    const [vitamin, setVitamins] = useState();
    const {auth} = useContext(AuthContext);
    console.log(auth)

    useEffect(() => {
        const fetchVitamins = async () => {
            try {
                const response = await axios({ 
                    method: 'get', 
                    url: '/api/results', 
                    headers: { 'Authorization': 'Bearer ' + auth.accessToken, 'Content-Type': 'application/json' }
                        
                })
                setVitamins(response.data.vitamins);
                console.log(response.data.vitamins);
            } catch(err) {
                console.log(err);
            }
        }
        
        fetchVitamins();
    }, []);

    //make a component for each vitamin

    return (
        <div>
            <Navbar />
        </div>
    )
}

export default Results
