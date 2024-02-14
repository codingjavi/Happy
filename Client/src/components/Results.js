import React, { useState, useEffect, useContext } from 'react'
import axios from '../api/axios'
import Navbar from './Navbar'
import AuthContext from '../context/AuthProvider';
import Vitamins from './Vitamins';

function Results() {
    const [vitamins, setVitamins] = useState();
    const {auth} = useContext(AuthContext);
    console.log(auth)

    useEffect(() => {
        console.log("GETTING")
        const fetchVitamins = async () => {
            try {
                const response = await axios({ 
                    method: 'get', 
                    url: '/api/results', 
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'), 'Content-Type': 'application/json' }
                        
                })
                setVitamins(response.data.vitamins);
                console.log(response.data.vitamins);
            } catch(err) {
                console.log(err);
            }
        }
        
        fetchVitamins();
    }, []);
    console.log(vitamins)
    
    const vitaminElements = vitamins ? vitamins.map(item => {
        return <Vitamins vitamin={item.vitamin} data={item.data} description={item.description} />
    }) : null;
    //make a component for each vitamin

    return (
        <div>
            <Navbar />
            {vitaminElements || "Take our Survey!"}
        </div>
    )
}

export default Results
