//THIS IS WHERE WE PUT OUR COMPONENTS IN 
import React, { useState, useEffect } from 'react'
import Home from './components/Home'
function App() {

  /*
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])*/


  return (
    <div>
      <Home />
    </div>
  )
}

export default App
