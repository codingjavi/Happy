import React from 'react'

function Checkbox(props) {
  return (
    <div>
        <label htmlFor='box'> Do you get leg pains? </label>
        <input 
            type='checkbox'
            id='box'
            name={props.organ}
            onChange={props.handleCheck}
        />
        <br />
    </div>
  )
}

export default Checkbox
