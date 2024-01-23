import React, { useState } from 'react'
import Checkbox from './Checkbox';

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
    const surveyElements = 

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
        
    }

    return (
    //need to encapsulate this
    //improvement tip: make all of these checkboxes components    
    <form onSubmit={handleSubmit}>
        <Checkbox
            handleCheck={handleChange}
            organ="gastro"
        />
        <br />
        {/** 
        <label htmlFor='heart-1'> Do you get shortness of breath? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='heart'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you have a speech impediment? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='heart'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Are you an athlete? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='heart'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Does you family have a history with heart disease? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='heart'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Have you recently been in an accident or had surgery? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='heart'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you have frequent headaches? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='heart'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you suffer from PTSD or any sort of trauma? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='heart'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='immune-1'> Do you frequently get sick? </label>
        <input 
            type='checkbox'
            id='immune-1'
            name='immune'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you get frequent aches and pains? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='immune'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you cosume alot of unhealthy/fast food? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='immune'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you drink alcohol or smoke? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='immune'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Are your fingers, feet, nose, and ears always cold? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='immune'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Are your wounds slow to heal? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='immune'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you brush your teeth regularly but still have bad breath? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='gastro'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you regularly have diarrhea or constipation? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='gastro'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you have IBS? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='gastro'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you get frequent heartburn? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='gastro'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you feel bloated and have alot of gas? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='gastro'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you vomit frequently? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='gastro'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you have anziety? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='kalmz'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Are you depressed? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='kalmz'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Are you stressed? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='kalmz'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Does you back hurt? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='kalmz'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you have low self-esteem? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='kalmz'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Have a hard time controlling your emotions? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='kalmz'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you have a hard time sleeping? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='kalmz'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you have a hard time concetrating on things? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='kalmz'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Are you experiencing excessive weight gain? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='thryroid'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Low blood pressure? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='thyroid'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you have dry skin or hair loss? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='thyroid'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do your hands get really shaky? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='thyroid'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Painful menstrual periods? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='thyroid'
            onChange={handleChange}
        />
        <br />
        <label htmlFor='heart-1'> Do you get really nervous? </label>
        <input 
            type='checkbox'
            id='heart-1'
            name='thyroid'
            onChange={handleChange}
        />
        <br />*/}
        <button>Submit</button>

    </form>
    )
}

export default Survey
