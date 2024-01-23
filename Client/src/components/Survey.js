import React, { useState } from 'react'
import Checkbox from './Checkbox';
import surveyData from '../data/surveyData';

//keep track of the weakneeses counts(heart, lungs , splee, ...)
//just calculate and give the vitamins and store
    //send the score to the backend where to calculates & STORES which ones the user needs
    //once we get to that page we use a get request to get all the vitamins

//create a vitamin component where we just use the same component for all the vitamins just change the data

function Survey() {
    //maybe create a context where i can make the setResults function available to certain components
    const [results, setResults] = useState({
        heart : 0,
        immune : 0,
        thyroid : 0,
        spleen : 0,
        kalmz : 0,
        gastro : 0
    });

    //using map to create an array of components(checkboxes) we can display
    const surveyElements = surveyData.map(item => {
        return <Checkbox question={item.question} organ={item.organ} handleCheck={handleChange}/>
    })

    function handleChange(event) {
        console.log(results)
        const name = event.target.name;
        setResults((prev) => {
            return {
                ...prev,
                [name] : prev[name] + (event.target.checked ? 1 : -1)
            }
            
        })
        
    }

    function handleSubmit(event) {
        //send results to backend to calculate vitamins needed

        //redirect to results page
        
    }

    return (
        <form onSubmit={handleSubmit}>
            {surveyElements}

            <button>Submit</button>

        </form>
    )
}

export default Survey
