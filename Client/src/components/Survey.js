import React, { useState, useContext } from 'react'
import Checkbox from './Checkbox';
import surveyData from '../data/surveyData';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import Navbar from './Navbar';

//keep track of the weakneeses counts(heart, lungs , splee, ...)
//just calculate and give the vitamins and store
    //send the score to the backend where to calculates & STORES which ones the user needs
    //once we get to that page we use a get request to get all the vitamins

//create a vitamin component where we just use the same component for all the vitamins just change the data

function Survey() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const EVAL_URL = '/api/eval';
    //maybe create a context where i can make the setResults function available to certain components
    const [results, setResults] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    //using map to create an array of components(checkboxes) we can display
    const surveyElements = surveyData.map((item, index) => {
        return <Checkbox key={index} index={index} question={item.question} organ={item.organ} handleCheck={handleChange}/>
    })

    //maybe each question has a corr index
    //maybe time (for loop)
    function handleChange(index) {
        console.log(index)
        console.log(results)
        
        setResults((prev) => {
            const newRes = [...prev];
            newRes[index] = newRes[index] === 1 ? 0 :1;
            return newRes;
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        //send results to backend to calculate vitamins needed axios post request
        console.log(auth.accessToken);
        //wait for api call to return response then redirect
        try {
            const response = await axios({ 
                method: 'post', 
                url: '/api/eval', 
                headers: { 'Authorization': 'Bearer ' + auth.accessToken, 'Content-Type': 'application/json' },
                data : JSON.stringify([results]),
                withCredentials:true
            })
            /*this api call doesn work with Authorization headers
            const response = await axios.post(EVAL_URL, 
                JSON.stringify({results}),
                {
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': 'Bearer ' +  auth.accessToken
                    }
                }
            ); */
            //what to do with data
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
        }
        //when we redirect it also has to make an api to make sure USER IS AUTHORIZED
        //redirect to results page
        navigate('/results');
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <Navbar />
            {surveyElements}

            <button>Submit</button>

        </form>
    )
}

export default Survey
