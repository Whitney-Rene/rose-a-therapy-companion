//imports React's state management and side effect hooks
import { useState, useEffect } from 'react';  
//import components from React Router to define routes
import { Route, Routes } from 'react-router-dom'; //'Switch' has been replaced with 'Routes'

//imports functions and components
import HomePage from './components/HomePage';
import RequestBouquet from './components/RequestBouquet';
import NavBar from './components/NavBar';
import EntryForm from './components/EntryForm';
import Login from './components/Login';
import './App.css'


function App() {

  return (

    <div className='App'>
      
      <NavBar />

      <div className='content'>

        <Routes> {/* component of react-router */}
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/request" element={<RequestBouquet />} />
          <Route path="/create/form/:entry_type" element={<EntryForm />} />
        </Routes>
        
      </div>

    </div>

  )
};

export default App
