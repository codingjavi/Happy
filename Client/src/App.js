//THIS IS WHERE WE PUT OUR COMPONENTS IN 
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Survey from './components/Survey';
import Results from './components/Results';
import Navbar from './components/Navbar';
import RequiredAuth from './components/RequireAuth';
import useToken from './components/useToken';
import PersistLogin from './components/PersistLogin';

function App() {
  const { token, setToken } = useToken();

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
          <Route exact path='/login' element={<Login setToken={setToken}/>}/>
          <Route exact path='/register' element={<Register/>}/>
          
          {/* protect routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequiredAuth />}>
              <Route exact path='/dashboard' element={<Dashboard />}/>
              <Route exact path='/survey' element={<Survey />} />
              <Route exact path='/results' element={<Results />} />
            </Route>
          </Route>
        </Routes>
      </Router>    
    </div>
  )
}



export default App
