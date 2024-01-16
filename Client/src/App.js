//THIS IS WHERE WE PUT OUR COMPONENTS IN 
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import LoginSignup from './components/LoginSignup';
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
      
      <Router>
        <Routes>
      
          <Route index element={<Home />} />
          <Route exact path='/login' element={<LoginSignup/>}/>
        </Routes>
      </Router>    
    </div>
  )
}

export default App
