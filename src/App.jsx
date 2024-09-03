import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AddEmployee from './components/AddEmployee/AddEmployee';
import ShowEmployee from './components/ShowEmployee/ShowEmployee';

const App= ()=> {

  return (
    <>
    <Router>
      <Routes>
        <Route path="" element={<AddEmployee/>} />
        <Route path="" element={<ShowEmployee/>} />

      </Routes>
    </Router>
    
    </>
  )
}

export default App
